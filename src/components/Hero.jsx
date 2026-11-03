import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";
import Navbar from "./Navbar";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

export default function Hero({ projects }) {
  const introRef = useRef(null);
  const introBgSecond = useRef(null);
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
    const ctx = gsap.context(() => {
      const chars = splitToChars(introWordRef.current);
      const cols = introColsRef.current;
      const counter = { v: 0 };

      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%" });
      gsap.set(introBgSecond.current, { yPercent: 100 });
      gsap.set(cols, { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => setIntroDone(true),
      });

      // 1) El nombre entra letra por letra
      tl.to(chars, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.05 }, 0.1)
        .to(counter, {
          v: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => (counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        }, 0)
        // 2) Pasan los colores de la bandera: amarillo y luego verde en columnas escalonadas
        .to(introBgSecond.current, { yPercent: 0, duration: 0.65, ease: "power3.inOut" }, 1.0)
        .to(cols, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power3.inOut" }, 1.35)
        // 3) Salida: el nombre sube y las columnas verdes se retiran
        .to(chars, { yPercent: -130, duration: 0.5, stagger: 0.025, ease: "power3.in" }, 2.2)
        .to(counterRef.current, { opacity: 0, duration: 0.3 }, 2.2)
        .set(introRef.current.querySelectorAll("[data-solid]"), { autoAlpha: 0 }, 2.6)
        .to(cols, { yPercent: -100, duration: 0.85, stagger: 0.07, ease: "power4.inOut" }, 2.6);

      // Reveal hero content right as the curtain lifts
      tl.fromTo(
        navRef.current,
        { yPercent: -120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.75"
      );

      cardsRef.current.forEach((card) => {
        tl.fromTo(
          card,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" },
          "-=0.55"
        );
      });

      const wm2Chars = splitToChars(wordmark2Ref.current);
      gsap.set(wm2Chars, { yPercent: 120, rotateX: 70, transformOrigin: "50% 100%" });
      tl.to(
        wm2Chars,
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: "power3.out" },
        "-=0.35"
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[var(--bg)]"
    >
      {/* Intro curtain */}
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
        <div data-solid className="absolute inset-0 bg-rojo" />
        <div data-solid ref={introBgSecond} className="absolute inset-0 bg-amarillo" />
        <div className="absolute inset-0 grid grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} ref={(el) => (introColsRef.current[i] = el)} className="bg-verde h-full" />
          ))}
        </div>
        <div className="relative flex flex-col items-center w-full">
          <div
            ref={introWordRef}
            className="font-display font-semibold text-white leading-none text-center"
          >
            UrsuStudiO
          </div>
        </div>
        <span
          ref={counterRef}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-display text-white/80 text-sm md:text-base tabular-nums"
        >
          000
        </span>
      </div>

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
