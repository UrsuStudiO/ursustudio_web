import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsapSetup";
import { CONTACTS } from "./Contact";

const NAV = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

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
        className="bg-ink text-paper dark:bg-[var(--bg-soft)] px-4 md:px-10 pt-10 pb-8"
      >
        <nav className="flex flex-wrap gap-x-8 gap-y-3 pb-10 border-b border-white/15 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:opacity-70 transition-opacity">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-10">
          <div className="flex flex-col gap-3 order-2 md:order-1">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                {c.label} - {c.value}
              </a>
            ))}
          </div>

          <div className="order-2 md:order-1">
            <p
              className="font-display font-semibold leading-none text-right"
              style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}
            >
              UrsuStudiO
            </p>
            <p className="text-right text-xs opacity-50 mt-3">
              © {new Date().getFullYear()} - Landing pages.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
