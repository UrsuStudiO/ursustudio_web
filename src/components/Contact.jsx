import { useRef } from "react";
import { gsap } from "../gsapSetup";

export const CONTACTS = [
  { label: "Correo", value: "ursustudio.contact@gmail.com", href: "mailto:ursustudio.contact@gmail.com" },
  { label: "WhatsApp", value: "+591 625 39291", href: "https://wa.me/59162539291" },
  { label: "LinkedIn", value: "/ursustudio", href: "https://www.linkedin.com/in/jwcn94363338a/" },
  { label: "GitHub", value: "/ursustudio", href: "https://github.com/UrsuStudiO" },
];

function RollLink({ item }) {
  const wrapRef = useRef(null);

  const onEnter = () => {
    gsap.to(wrapRef.current, { yPercent: -50, duration: 0.45, ease: "power3.out" });
  };
  const onLeave = () => {
    gsap.to(wrapRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out" });
  };

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group block py-6 border-t border-[var(--border)] first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0"
    >
      <div className="px-4 md:px-6">
        <p className="text-xs uppercase tracking-wide text-[var(--fg)]/40 mb-3 font-display">
          {item.label}
        </p>
        <div className="overflow-hidden h-[1.6em]">
          <div ref={wrapRef}>
            <p className="text-base md:text-lg font-medium leading-[1.6em]">{item.value}</p>
            <p className="text-base md:text-lg font-medium leading-[1.6em] text-rojo">
              {item.value}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contacto" className="px-4 md:px-6 py-16 md:py-24 border-t border-[var(--border)]">
      <h2
        className="font-display font-semibold px-2 md:px-0 mb-10 text-center uppercase whitespace-nowrap"
        style={{ fontSize: "clamp(1.1rem, 5.5vw, 3.4rem)" }}
      >
        Hablemos de tu proyecto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[var(--border)]">
        {CONTACTS.map((c) => (
          <RollLink key={c.label} item={c} />
        ))}
      </div>
    </section>
  );
}
