import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./gsapSetup";
import Hero from "./components/Hero";
import Pin from "./components/Pin";
import ProjectsParallax from "./components/ProjectsParallax";
import About from "./components/About";
import ProjectsSection from "./components/ProjectsSection";
import Plans from "./components/Plans";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { getProjects } from "./data/projects";
import { LANG, t } from "./i18n";
import { ThemeProvider } from "./context/ThemeContext";
import { QuoteProvider } from "./context/QuoteContext";

const projects = getProjects(LANG);

// "Nosotros" queda fijo detrás del telón, así que el ancla normal (#nosotros)
// caería en la galería. Este scroll lleva al punto donde ya se ve completo.
function aboutTop() {
  const holder = document.querySelector("[data-reveal-holder]");
  if (!holder) return null;
  return holder.getBoundingClientRect().top + window.scrollY + window.innerHeight;
}

function Page() {
  useEffect(() => {
    // Scroll suave (Lenis) sincronizado con GSAP/ScrollTrigger
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Clic en enlaces internos (#proyectos, #nosotros, #contacto)
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      e.preventDefault();
      if (id === t.ids.about) {
        const top = aboutTop();
        if (top !== null) lenis.scrollTo(top);
        return;
      }
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el);
    };
    document.addEventListener("click", onClick);

    // Si entran directo a /#nosotros
    let timer;
    if (window.location.hash === `#${t.ids.about}`) {
      timer = setTimeout(() => {
        const top = aboutTop();
        if (top !== null) lenis.scrollTo(top, { immediate: true });
      }, 300);
    }

    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] min-h-screen">
      {/* Etapa 1: el Hero se queda quieto y la galería sube encima como un telón */}
      <div className="relative z-10">
        <Pin>
          <Hero projects={projects} />
        </Pin>
        <ProjectsParallax projects={projects} />
      </div>

      {/* Etapa 2: el telón sigue subiendo y deja ver "Nosotros" fijo por detrás */}
      <div data-reveal-holder className="relative" style={{ marginTop: "-100svh" }}>
        <div className="sticky top-0 z-0 bg-[var(--bg)]">
          <About />
        </div>
        <div style={{ height: "100svh" }} aria-hidden="true" />
      </div>

      <ProjectsSection projects={projects} />
      <Plans />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QuoteProvider>
        <Page />
      </QuoteProvider>
    </ThemeProvider>
  );
}
