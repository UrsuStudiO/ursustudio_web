import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";
import ThemeToggle from "./ThemeToggle";
import LangSwitch from "./LangSwitch";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

const NAV_LINKS = [
  { label: t.nav.projects, href: `#${t.ids.projects}` },
  { label: t.nav.about, href: `#${t.ids.about}` },
  { label: t.nav.contact, href: `#${t.ids.contact}` },
];

export default function Hero({ projects }) {
  const introRef = useRef(null);
  const introBgRed = useRef(null);
  const introBgSecond = useRef(null);
  const introWordRef = useRef(null);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const cardImgRef = useRef([]);
  const wordmark2Ref = useRef(null);
  const heroSectionRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  useFitText(introWordRef);
  useFitText(wordmark2Ref);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = splitToChars(introWordRef.current);

      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%" });
      gsap.set(introBgSecond.current, { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => setIntroDone(true),
      });

      tl.to(chars, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.055,
      })
        .to(
          introBgSecond.current,
          { yPercent: 0, duration: 0.7, ease: "power3.inOut" },
          "-=0.15"
        )
        .to(introRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.25,
        });

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
        <div ref={introBgRed} className="absolute inset-0 bg-rojo" />
        <div ref={introBgSecond} className="absolute inset-0 bg-verde" />
        <div
          ref={introWordRef}
          className="relative font-display font-semibold text-white leading-none text-center"
        >
          UrsuStudiO
        </div>
      </div>

      {/* Real hero content, revealed as the curtain lifts */}
      <div className="relative z-10 flex flex-col min-h-[100svh]">
        <nav
          ref={navRef}
          className="flex items-center justify-between px-6 md:px-12 py-6 opacity-0"
        >
          <span className="font-display font-semibold tracking-tight text-lg">
            UrsuStudiO
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[var(--fg)]/80 hover:text-[var(--fg)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex-1 flex flex-col px-3 md:px-6 pb-10 md:pb-14">
          <div className="grid grid-cols-2 gap-2 md:gap-4 w-full h-[62vh] md:h-[72vh]">
            {projects.slice(-2).map((p, i, filteredArray) => {
              const originalIndex = projects.length - filteredArray.length + i;
              return (
                <a
                  key={p.id}
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  ref={(el) => (cardsRef.current[originalIndex] = el)} // Guardará en [2] y [3]
                  className="group relative block h-full overflow-hidden border border-[var(--border)]"
                >
                  <img
                    ref={(el) => (cardImgRef.current[originalIndex] = el)} // Guardará en [2] y [3]
                    src={p.image}
                    alt={p.alt || p.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm md:text-base font-medium">
                      {p.title}
                    </p>
                  </div>
                </a>
              );
            })}
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
