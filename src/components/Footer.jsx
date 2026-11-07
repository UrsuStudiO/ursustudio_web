import { useLayoutEffect, useRef } from "react";
import { gsap } from "../gsapSetup";
import { EMAIL } from "./Contact";
import Wordmark from "./Wordmark";
import { useQuote } from "../context/QuoteContext";
import { useFitText } from "../hooks/useFitText";
import { t } from "../i18n";

const NAV = [
  { label: t.nav.projects, href: `#${t.ids.projects}` },
  { label: t.nav.about, href: `#${t.ids.about}` },
  { label: t.nav.contact, href: `#${t.ids.contact}` },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const wordRef = useRef(null);
  const { openQuote } = useQuote();
  useFitText(wordRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={panelRef}
        className="bg-ink text-paper dark:bg-[var(--bg-soft)] px-3 md:px-6 pt-10 pb-6"
      >
        <nav className="flex flex-wrap gap-x-8 gap-y-3 pb-10 border-b border-white/15 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:opacity-70 transition-opacity">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-8">
          <button
            type="button"
            onClick={() => openQuote()}
            className="text-left text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {EMAIL}
          </button>
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} - {t.rights}
          </p>
        </div>

        <p
          ref={wordRef}
          className="font-display font-semibold leading-[0.8] text-center"
        >
          <Wordmark tone="bright" />
        </p>
      </div>
    </footer>
  );
}
