import { useLayoutEffect, useRef } from "react";
import { gsap } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";
import { useQuote } from "../context/QuoteContext";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

// Dorado de marca en la barra superior y en el relleno del botón

// Paquetes sin precio: cada uno abre el formulario de cotización con su nombre ya elegido.
export default function Plans() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const { openQuote } = useQuote();
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
      gsap.from("[data-plan]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-plans]", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={t.ids.plans}
      ref={sectionRef}
      className="px-3 md:px-6 py-16 md:py-24 border-t border-[var(--border)]"
    >
      <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center">
        {t.plansKicker}
      </p>
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] text-[var(--fg)] text-center uppercase mb-8 md:mb-10"
      >
        {t.plansTitle}
      </h2>
      <p className="w-full mt-6 md:mt-8 text-[var(--fg)]/70 leading-relaxed">{t.plansIntro}</p>

      <div data-plans className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
        {t.plans.map((plan, i) => {
          return (
            <article
              key={plan.name}
              data-plan
              className="group relative flex flex-col border border-[var(--line-strong)] overflow-hidden"
            >
              <span aria-hidden="true" className="h-1.5 bg-oro" />
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-semibold uppercase tracking-tight text-2xl md:text-3xl">
                    {plan.name}
                  </h3>
                  <span className="font-display text-sm text-[var(--fg)]/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-[var(--fg)]/70 leading-relaxed">{plan.tagline}</p>

                <ul className="mt-8 space-y-3 text-sm md:text-base">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 border-b border-[var(--border)] pb-3">
                      <span aria-hidden="true" className="text-[var(--fg)]/50">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-xs uppercase tracking-wide text-[var(--fg)]/50 font-display">
                  {t.plansExample} {plan.examples}
                </p>

                <button
                  type="button"
                  onClick={() => openQuote(plan.name)}
                  className="relative mt-8 flex items-center justify-between overflow-hidden border border-[var(--line-strong)] px-5 py-4 font-display font-semibold uppercase tracking-wide text-sm group/cta cursor-pointer text-left"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-oro translate-y-full group-hover/cta:translate-y-0 group-focus-visible/cta:translate-y-0 transition-transform duration-500 ease-out"
                  />
                  <span className="relative transition-colors duration-500 group-hover/cta:text-ink">
                    {t.plansCta}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative text-lg transition-all duration-500 group-hover/cta:rotate-45 group-hover/cta:text-ink"
                  >
                    ↗
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-sm uppercase tracking-wide text-[var(--fg)]/50 font-display">
          {t.plansExtrasTitle}
        </span>
        {t.plansExtras.map((x) => (
          <span key={x} className="text-sm border border-[var(--border)] rounded-full px-3 py-1 text-[var(--fg)]/75">
            + {x}
          </span>
        ))}
      </div>
    </section>
  );
}
