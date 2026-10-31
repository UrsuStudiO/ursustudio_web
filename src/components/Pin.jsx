import { useLayoutEffect, useRef } from "react";

// Mantiene su contenido "pegado" (sticky) mientras otra sección sube por
// encima como un telón. Si el contenido es más alto que la pantalla, primero
// hace scroll normal y se detiene cuando llega a su parte final
// (en el Hero: cuando aparece completo "UrsuStudiO").
export default function Pin({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const set = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  return (
    <div ref={ref} className="sticky z-0">
      {children}
    </div>
  );
}
