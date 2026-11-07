import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../gsapSetup";
import { markMonogram, splitToChars } from "../utils/splitChars";
import Navbar from "./Navbar";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

export default function Hero({ projects }) {
  const introRef = useRef(null);
  const flagRef = useRef(null);
  const introColsRef = useRef([]);
  const introWordRef = useRef(null);
  const counterRef = useRef(null);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const wordmark2Ref = useRef(null);
  const heroSectionRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  // 2 proyectos al azar en cada visita (con 50 webs no caben todas aquí)
  const featured = useMemo(() => [...projects].sort(() => Math.random() - 0.5).slice(0, 2), [projects]);

  useFitText(introWordRef);
  useFitText(wordmark2Ref);

  useLayoutEffect(() => {
    let cancelled = false;
    const ctx = gsap.context(() => {
      const chars = splitToChars(introWordRef.current);
      const goldIdx = markMonogram(chars, "gold");
      const goldChars = goldIdx.map((i) => chars[i]);
      const restChars = chars.filter((_, i) => !goldIdx.includes(i));
      const goldClips = goldChars.map((c) => c.parentElement);
      const cols = introColsRef.current;

      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%" });
      gsap.set(restChars, { opacity: 0 });
      gsap.set(flagRef.current, { scaleX: 0 });
      gsap.set(cols, { yPercent: 100 });

      const wm2Chars = splitToChars(wordmark2Ref.current);
      markMonogram(wm2Chars);
      gsap.set(wm2Chars, { yPercent: 120, rotateX: 70, transformOrigin: "50% 100%" });
      gsap.set(navRef.current, { yPercent: -120, opacity: 0 });
      gsap.set(cardsRef.current, { clipPath: "inset(0% 0% 100% 0%)" });

      // Posición para que U, S y O queden juntas ("USO") en el centro de la palabra
      const usoOffsets = () => {
        const word = introWordRef.current;
        const total = goldClips.reduce((w, c) => w + c.offsetWidth, 0);
        let x = (word.offsetWidth - total) / 2;
        return goldClips.map((c) => {
          const dx = x - c.offsetLeft;
          x += c.offsetWidth;
          return dx;
        });
      };

      const play = () => {
        if (cancelled) return;
        ctx.add(() => {
          const counter = { v: 0 };
          const offsets = usoOffsets();
          gsap.set(goldClips, { x: (i) => offsets[i] });

          const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
            onComplete: () => setIntroDone(true),
          });

          // 1) Aparece el monograma USO en dorado
          tl.to(goldChars, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.1)
            .to(counter, {
              v: 100,
              duration: 2.7,
              ease: "power2.inOut",
              onUpdate: () => (counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0")),
            }, 0)
            // 2) USO se abre y aparecen las letras que faltan: UrsuStudiO
            .to(goldClips, { x: 0, duration: 0.9, ease: "power3.inOut" }, 0.95)
            .to(restChars, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.7, stagger: 0.035, ease: "power3.out" }, 1.1)
            // 3) Bajo el nombre se dibuja una línea fina con los colores de Bolivia
            .to(flagRef.current, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 1.75)
            .to(cols, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power3.inOut" }, 2.1)
            // 4) Salida: el nombre sube y las columnas se retiran escalonadas
            .to(chars, { yPercent: -130, duration: 0.5, stagger: 0.025, ease: "power3.in" }, 2.95)
            .to([counterRef.current, flagRef.current], { opacity: 0, duration: 0.3 }, 2.95)
            .set(introRef.current.querySelectorAll("[data-solid]"), { autoAlpha: 0 }, 3.35)
            .to(cols, { yPercent: -100, duration: 0.85, stagger: 0.07, ease: "power4.inOut" }, 3.35);

          // Reveal hero content right as the curtain lifts
          tl.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.75");

          cardsRef.current.forEach((card) => {
            tl.to(card, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" }, "-=0.55");
          });

          tl.to(
            wm2Chars,
            { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: "power3.out" },
            "-=0.35"
          );
        });
      };

      // Espera la tipografía (máx. 800 ms) para medir bien el ancho de cada letra
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(() =>
        requestAnimationFrame(play)
      );
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[var(--bg)]"
    >
      {/* Intro curtain: en un portal a <body> para quedar por encima del navbar fijo
          (dentro del Pin sticky su z-index no le ganaría) */}
      {createPortal(
        <div
          ref={introRef}
          className="fixed inset-0 z-[60] flex items-center justify-center px-3 md:px-6"
          style={{
            perspective: "1200px",
            pointerEvents: introDone ? "none" : "auto",
            visibility: introDone ? "hidden" : "visible",
          }}
          aria-hidden={introDone}
        >
          <div data-solid className="absolute inset-0 bg-ink" />
          <div className="absolute inset-0 grid grid-cols-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} ref={(el) => (introColsRef.current[i] = el)} className="bg-ink h-full" />
            ))}
          </div>
          <div className="relative flex flex-col items-center w-full">
            <div
              ref={introWordRef}
              className="font-display font-semibold text-white leading-none text-center gold-shadow"
            >
              UrsuStudiO
            </div>
            {/* Rojo, amarillo y verde: el guiño a Bolivia */}
            <div
              ref={flagRef}
              aria-hidden="true"
              className="mt-6 md:mt-10 flex h-[3px] w-28 md:w-44 overflow-hidden rounded-full"
            >
              <span className="flex-1 bg-rojo" />
              <span className="flex-1 bg-amarillo" />
              <span className="flex-1 bg-verde" />
            </div>
          </div>
          <span
            ref={counterRef}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-display text-white/80 text-sm md:text-base tabular-nums"
          >
            000
          </span>
        </div>,
        document.body
      )}

      {/* Real hero content, revealed as the curtain lifts */}
      <div className="relative z-10 flex flex-col min-h-[100svh]">
        <Navbar navRef={navRef} />
        {/* Espacio que ocupa el navbar fijo */}
        <div className="h-[85px] shrink-0" aria-hidden="true" />

        <div className="flex-1 flex flex-col px-3 md:px-6 pb-10 md:pb-14">
          <div className="grid grid-cols-2 gap-2 md:gap-4 w-full h-[62vh] md:h-[72vh]">
            {featured.map((p, i) => (
              <a
                key={p.id}
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative block h-full overflow-hidden border border-[var(--border)]"
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between gap-3">
                  <p className="text-white text-sm md:text-base font-medium">{p.title}</p>
                  <p className="hidden md:block text-white/70 text-xs">{p.category}</p>
                </div>
              </a>
            ))}
          </div>

          <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center whitespace-nowrap p-4">
            {t.latest}
          </p>

          <h1
            ref={wordmark2Ref}
            className="font-display font-semibold leading-[0.85] text-[var(--fg)] text-center whitespace-nowrap mt-6 md:mt-10"
          >
            UrsuStudiO
          </h1>
        </div>
      </div>
    </section>
  );
}
