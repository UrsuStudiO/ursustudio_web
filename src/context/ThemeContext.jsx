import { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback, useRef } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);
const STORAGE_KEY = "ursustudio-theme";
// bear-face.png conserva los calados de ojos, nariz y boca; bear-mask.png es la
// silueta rellena que tapa esos huecos al final. Las dos miden 512x519.
const BEAR_IMAGES = ["/bear-face.png", "/bear-mask.png"];
const BEAR_RATIO = 519 / 512;

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Tamaño y posición de la máscara para un oso de `size` px centrado en pantalla
function bearFrame(size) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    size: `${size}px ${size * BEAR_RATIO}px`,
    pos: `${w / 2 - size / 2}px ${h / 2 - (size * BEAR_RATIO) / 2}px`,
  };
}

// Ritmo del oso: aparece rápido, crece despacio un momento (para que se vea su
// cara) y al final se expande hasta cubrir todo. Las esquinas del PNG son
// transparentes, por eso termina tan grande.
function bearSizes() {
  const small = Math.min(window.innerWidth, window.innerHeight);
  const end = Math.hypot(window.innerWidth, window.innerHeight) * 3.2;
  return { small, end };
}

// Cambio de tema con View Transitions: la página nueva (con sus colores reales,
// fotos incluidas) aparece DENTRO del oso, por encima de la vieja, así la pantalla
// nunca queda toda negra o blanca. Como las fotos son iguales en los dos temas,
// mientras el oso es chico lo de adentro va "en rayos X": blanco y negro y
// aclarado (hacia modo claro) u oscurecido (hacia modo oscuro), así el oso se ve
// como una figura por encima de las imágenes. Al expandirse recupera el color. La máscara usa dos capas: el oso con su cara calada y la silueta rellena, que
// crece más tarde y cierra los huecos antes del final (sin parpadeo).
function bearViewTransition(next, apply) {
  const transition = document.startViewTransition(apply);
  return transition.ready
    .then(() => {
      const { small, end } = bearSizes();
      const xray =
        next === "light"
          ? "grayscale(1) brightness(1.55) contrast(0.55)"
          : "grayscale(1) brightness(0.45) contrast(1.15)";
      const kf = (face, solid, extra = {}) => {
        const f = bearFrame(face);
        const s = bearFrame(solid);
        const size = `${f.size}, ${s.size}`;
        const pos = `${f.pos}, ${s.pos}`;
        return { maskSize: size, WebkitMaskSize: size, maskPosition: pos, WebkitMaskPosition: pos, ...extra };
      };
      document.documentElement.animate(
        [
          kf(0, 0, { filter: xray, easing: "cubic-bezier(0.2, 0.9, 0.3, 1)" }),
          kf(small * 0.35, 0, { filter: xray, offset: 0.3, easing: "linear" }),
          kf(small * 0.5, 0, { filter: xray, offset: 0.6, easing: "cubic-bezier(0.7, 0, 0.9, 0.6)" }),
          kf(end, end, { filter: "grayscale(0) brightness(1) contrast(1)" }),
        ],
        // "forwards" mantiene la máscara grande hasta que termina la transición
        { duration: 1200, fill: "forwards", pseudoElement: "::view-transition-new(root)" }
      );
      return transition.finished;
    })
    .catch(() => {});
}

// Respaldo para navegadores sin View Transitions: capas fijas, por encima de todo,
// pintadas con el fondo del tema nuevo y recortadas con la forma del oso.
// 1) el oso crece desde el centro y por sus ojos, nariz y boca se ve la página,
// 2) antes de tapar la pantalla la silueta rellena cierra esos huecos,
// 3) se cambia el tema debajo y las capas se desvanecen.
function bearOverlayTransition(next, apply) {
  const frame = (size) => {
    const { size: box, pos } = bearFrame(size);
    return { maskSize: box, WebkitMaskSize: box, maskPosition: pos, WebkitMaskPosition: pos };
  };

  const layers = ["face", "solid"].map((kind) => {
    const el = document.createElement("div");
    el.className = `bear-transition bear-transition--${kind}`;
    el.dataset.to = next;
    el.setAttribute("aria-hidden", "true");
    Object.assign(el.style, frame(0));
    document.body.appendChild(el);
    return el;
  });
  const [face, solid] = layers;

  const { small, end } = bearSizes();
  const keyframes = [
    { ...frame(0), easing: "cubic-bezier(0.2, 0.9, 0.3, 1)" },
    { ...frame(small * 0.35), offset: 0.3, easing: "linear" },
    { ...frame(small * 0.5), offset: 0.6, easing: "cubic-bezier(0.7, 0, 0.9, 0.6)" },
    frame(end),
  ];
  const timing = { duration: 1200, fill: "forwards" };
  const grow = face.animate(keyframes, timing);
  solid.animate(keyframes, timing);
  // La silueta rellena entra justo cuando el oso empieza a expandirse
  solid.animate([{ opacity: 0 }, { opacity: 0, offset: 0.62 }, { opacity: 1, offset: 0.8 }, { opacity: 1 }], timing);

  const fadeOut = () =>
    Promise.all(
      layers.map((el) => el.animate({ opacity: [1, 0] }, { duration: 350, easing: "ease-out", fill: "forwards" }).finished)
    );

  return grow.finished
    .then(() => {
      apply();
      // Un cuadro para que el navegador pinte el tema nuevo antes de destapar
      return new Promise((r) => requestAnimationFrame(r));
    })
    .then(fadeOut)
    .finally(() => layers.forEach((el) => el.remove()));
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const busy = useRef(false);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Precarga las máscaras para que el primer cambio no salga vacío
  useEffect(() => {
    BEAR_IMAGES.forEach((src) => (new Image().src = src));
  }, []);

  const toggleTheme = useCallback(() => {
    if (busy.current) return;
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const apply = () => {
      const root = document.documentElement;
      root.classList.add("theme-swap");
      flushSync(() => setTheme(next));
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-swap")));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    busy.current = true;
    const run =
      typeof document.startViewTransition === "function"
        ? bearViewTransition(next, apply)
        : bearOverlayTransition(next, apply);
    run.finally(() => (busy.current = false));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
