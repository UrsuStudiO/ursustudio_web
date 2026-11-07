import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import LangSwitch from "./LangSwitch";
import Wordmark from "./Wordmark";
import { t } from "../i18n";

const NAV_LINKS = [
  { label: t.nav.projects, href: `#${t.ids.projects}` },
  { label: t.nav.about, href: `#${t.ids.about}` },
  { label: t.nav.contact, href: `#${t.ids.contact}` },
];

// Navbar fijo arriba, siempre visible; al bajar toma fondo difuminado.
// Va en un portal a <body> porque el Hero está dentro de un contenedor sticky
// (Pin) y ahí la galería que sube como telón lo taparía.
// `navRef` es para la animación de entrada del Hero (GSAP mueve el <nav>).
export default function Navbar({ navRef }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setSolid(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return createPortal(
    <header
      className={`fixed top-0 inset-x-0 z-[55] transition-[background-color,border-color] duration-500 ease-out border-b ${
        solid ? "bg-[var(--bg)]/75 backdrop-blur-md border-[var(--border)]" : "border-transparent"
      }`}
    >
      <nav ref={navRef} className="flex items-center justify-between px-6 md:px-12 py-6 opacity-0">
        <span className="font-display font-semibold tracking-tight text-lg">
          <Wordmark />
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
    </header>,
    document.body
  );
}
