import { useLayoutEffect, useRef, useMemo } from "react"; // 1. Importa useMemo
import { gsap, ScrollTrigger } from "../gsapSetup";

function distribute(projects) {
  const cols = [[], [], []];
  projects.forEach((p, i) => cols[i % 3].push(p));
  return cols.map((c) => (c.length ? c : projects));
}

export default function ProjectsParallax({ projects }) {
  const sectionRef = useRef(null);
  const colRefs = useRef([]);

  // 2. Desordena los proyectos de forma segura y constante por renderizado
  const randomizedProjects = useMemo(() => {
    if (!projects) return [];
    // Como mucho 9 imágenes: la galería es decorativa y no debe crecer con el catálogo
    return [...projects].sort(() => Math.random() - 0.5).slice(0, 9);
  }, [projects]); // Solo cambia si la lista original de proyectos cambia

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const directions = [-1, 0.5, -1];
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.to(col, {
          yPercent: 14 * directions[i],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3. Pasa la lista aleatoria a la función distribuidora
  const cols = distribute(randomizedProjects);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[var(--bg-soft)] shadow-[0_0_40px_rgba(0,0,0,0.16)] px-3 md:px-6 py-20 md:py-28 min-h-[100svh] flex items-center"
    >
      <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
        {cols.map((col, i) => (
          <div
            key={i}
            ref={(el) => (colRefs.current[i] = el)}
            className={`flex flex-col gap-3 md:gap-6 ${i === 1 ? "mt-16 md:mt-28" : ""
              }`}
          >
            {col.map((p, j) => (
              <div
                key={`${p.id}-${j}`}
                className="relative aspect-[3/4] overflow-hidden border border-[var(--border)]"
              >
                <img
                  src={p.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
