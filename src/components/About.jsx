import { useLayoutEffect, useRef } from "react";
import { gsap } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

export default function About() {
  const ref = useRef(null);
  const titleRef = useRef(null);
  useFitText(titleRef);

  useLayoutEffect(() => {
    // El telón (galería) sube y deja ver esta sección fija por detrás.
    // Las animaciones arrancan cuando el telón ya dejó ver ~60% de la pantalla.
    const holder = ref.current.closest("[data-reveal-holder]") || ref.current;
    const scrollTrigger = {
      trigger: holder,
      start: () => `top+=${Math.round(window.innerHeight * 0.6)} top`,
      invalidateOnRefresh: true,
    };

    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger,
      });

      const chars = splitToChars(titleRef.current);
      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%", opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={t.ids.about}
      ref={ref}
      className="min-h-[100svh] flex flex-col justify-center px-3 md:px-6 py-16 md:py-24 border-t border-[var(--border)]"
    >
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] text-[var(--fg)] text-center uppercase mb-8 md:mb-10"
      >
        {t.aboutTitle}
      </h2>
      <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center whitespace-nowrap">
        {t.aboutKicker}
      </p>
      <p
        className="w-full text-[var(--fg)] leading-relaxed"
        style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.65rem)" }}
      >
        {t.aboutText}
      </p>
      <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm uppercase tracking-wider font-medium text-[var(--fg)]/70">
        {t.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}
