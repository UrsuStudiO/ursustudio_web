import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

// Preguntas frecuentes en acordeón: una abierta a la vez.
export default function Faq() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [open, setOpen] = useState(0);
  useFitText(titleRef);

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
      gsap.utils.toArray("[data-faq]").forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Al abrir/cerrar cambia la altura de la página: se recalculan los ScrollTrigger
  const onPanelResize = (e) => {
    if (e.propertyName === "grid-template-rows") ScrollTrigger.refresh();
  };

  return (
    <section
      id={t.ids.faq}
      ref={sectionRef}
      className="px-3 md:px-6 py-16 md:py-24 border-t border-[var(--border)]"
    >
      <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center">
        {t.faqKicker}
      </p>
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] text-[var(--fg)] text-center uppercase mb-10 md:mb-14"
      >
        {t.faqTitle}
      </h2>

      <ul className="border-t border-[var(--line-strong)]">
        {t.faq.map((item, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          return (
            <li key={item.q} data-faq className="border-b border-[var(--line-strong)]">
              <h3>
                <button
                  type="button"
                  id={`${id}-q`}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group w-full flex items-center justify-between gap-6 text-left px-1 md:px-4 py-6 md:py-8 cursor-pointer"
                >
                  <span className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-display text-xs md:text-sm text-[var(--fg)]/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display font-semibold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors"
                      style={{ fontSize: "clamp(1.05rem, 2.4vw, 2rem)" }}
                    >
                      {item.q}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 grid place-items-center size-10 md:size-14 rounded-full border border-current text-[var(--fg)] text-xl md:text-2xl transition-all duration-500 ${
                      isOpen ? "rotate-45 bg-oro border-oro text-ink" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={`${id}-a`}
                role="region"
                aria-labelledby={`${id}-q`}
                onTransitionEnd={onPanelResize}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-9 md:pl-[4.5rem] pr-12 md:pr-24 pb-7 md:pb-9 text-[var(--fg)]/70 leading-relaxed max-w-4xl">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
