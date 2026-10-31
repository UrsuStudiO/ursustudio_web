import { useLayoutEffect } from "react";
import { ScrollTrigger } from "../gsapSetup";

// Ajusta el tamaño de la fuente para que el texto ocupe TODO el ancho
// disponible de su contenedor (sin saltos de línea). Se recalcula al cambiar
// el tamaño de la pantalla y cuando terminan de cargar las fuentes.
export function useFitText(ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el && el.parentElement;
    if (!el || !parent) return;

    el.style.whiteSpace = "nowrap";
    el.style.width = "max-content";
    el.style.maxWidth = "none";
    el.style.marginInline = "auto";

    let last = 0;
    let raf = 0;

    const fit = () => {
      const cs = getComputedStyle(parent);
      const avail =
        parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (!(avail > 0)) return;

      el.style.fontSize = "100px";
      const w = el.offsetWidth;
      if (!(w > 0)) return;

      let size = (100 * avail) / w;
      el.style.fontSize = `${size}px`;
      // Segunda pasada: corrige redondeos para no desbordar nunca
      const w2 = el.offsetWidth;
      if (w2 > avail) size *= avail / w2;
      size = Math.floor(size * 10) / 10;
      el.style.fontSize = `${size}px`;

      if (Math.abs(size - last) > 0.2) {
        last = size;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    const onFonts = () => requestAnimationFrame(fit);
    if (document.fonts) {
      document.fonts.ready.then(onFonts);
      document.fonts.addEventListener("loadingdone", onFonts);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (document.fonts) document.fonts.removeEventListener("loadingdone", onFonts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
