import { useRef } from "react";
import { t } from "../i18n";
import { useFitText } from "../hooks/useFitText";

export const EMAIL = "ursustudio.contact@gmail.com";

export default function Contact() {
  const titleRef = useRef(null);
  useFitText(titleRef);

  return (
    <section
      id={t.ids.contact}
      className="px-3 md:px-6 py-16 md:py-28 border-t border-[var(--border)]"
    >
      <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center">
        {t.email}
      </p>
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] text-[var(--fg)] text-center uppercase mb-10 md:mb-14"
      >
        {t.contactTitle}
      </h2>

      <a
        href={`mailto:${EMAIL}`}
        className="group relative flex items-center justify-between gap-4 md:gap-8 overflow-hidden border-y border-[var(--line-strong)] px-4 md:px-8 py-7 md:py-12"
      >
        {/* Relleno que sube desde abajo al pasar el cursor */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-rojo translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ease-out"
        />
        <span
          className="relative font-display font-semibold tracking-tight text-[var(--fg)] group-hover:text-white group-focus-visible:text-white transition-colors duration-500 break-all"
          style={{ fontSize: "clamp(1.05rem, 4.6vw, 4.5rem)" }}
        >
          {EMAIL}
        </span>
        <span
          aria-hidden="true"
          className="relative shrink-0 grid place-items-center size-11 md:size-20 rounded-full border border-current text-[var(--fg)] group-hover:text-white group-focus-visible:text-white group-hover:rotate-45 transition-all duration-500 text-xl md:text-4xl"
        >
          ↗
        </span>
      </a>
    </section>
  );
}
