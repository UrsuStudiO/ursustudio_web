import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";

export default function ProjectsSection({ projects }) {
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [category, setCategory] = useState("Todos");
  const firstFilter = useRef(true);

  const categories = useMemo(
    () => ["Todos", ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const filtered = useMemo(
    () =>
      category === "Todos"
        ? projects
        : projects.filter((p) => p.category === category),
    [projects, category]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = splitToChars(titleRef.current);
      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%", opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const cards = gridRef.current.querySelectorAll("[data-card]");
    if (firstFilter.current) {
      firstFilter.current = false;
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
      return;
    }
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }
    );
  }, [category]);

  return (
    <section id="proyectos" className="px-4 md:px-10 py-16 md:py-24 border-t border-[var(--border)]">
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] w-full text-[var(--fg)] text-center uppercase whitespace-nowrap mb-8 md:mb-10"
        style={{ fontSize: "clamp(2.4rem, 10vw, 8rem)" }}
      >
        Proyectos
      </h2>

      <p className="w-full mt-6 md:mt-8 text-[var(--fg)]/70 leading-relaxed">
        Trabajamos con una mirada completa: estrategia, diseño y tecnología
        avanzan juntos en cada proyecto. Pasamos por distintos rubros para no
        repetir fórmulas ni caer en atajos, porque cada marca merece una
        solución propia. Los siguientes proyectos son demostraciones diseñadas para previsualizar el resultado final.
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 md:mt-14 border-b border-[var(--border)] pb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-sm md:text-base font-display transition-opacity cursor-pointer ${
              category === c
                ? "opacity-100 border-b border-[var(--fg)]"
                : "opacity-45 hover:opacity-80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-14 md:mt-16"
      >
        {filtered.map((p) => (
          <a
            key={p.id}
            data-card
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--border)]">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="flex items-baseline justify-between mt-3">
              <h3 className="font-display font-medium text-lg">{p.title}</h3>
              <span className="text-xs text-[var(--fg)]/50">{p.tag}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
