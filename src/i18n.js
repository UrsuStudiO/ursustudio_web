// Idioma de la página: se lee de <html lang="..."> (es en "/" y en en "/en/").
export const LANG =
  typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "es";

const dict = {
  es: {
    ids: { projects: "proyectos", about: "nosotros", contact: "contacto" },
    nav: { projects: "Proyectos", about: "Nosotros", contact: "Contacto" },
    all: "Todos",
    latest: "Últimos proyectos (demos de muestra)",
    aboutTitle: "Nosotros",
    aboutKicker: "Bienvenidos al estudio",
    aboutText:
      "En UrsuStudiO creamos landing pages exclusivas que transforman visitas en clientes. Partimos de estructuras visuales optimizadas que adaptamos por completo a tu negocio: diseñamos cada detalle, tipografía y movimiento para reflejar la esencia de tu marca. El resultado es una experiencia web rápida, memorable y estratégicamente enfocada en hacer crecer tu negocio.",
    bullets: [
      "✓ Diseño 100% Exclusivo",
      "✓ Velocidad de Carga Ultra Rápida",
      "✓ Experiencias Visuales Fluídas",
      "✓ Optimización",
    ],
    projectsTitle: "Proyectos",
    projectsIntro:
      "Trabajamos con una mirada completa: estrategia, diseño y tecnología avanzan juntos en cada proyecto. Pasamos por distintos rubros para no repetir fórmulas ni caer en atajos, porque cada marca merece una solución propia. Los siguientes proyectos son demostraciones diseñadas para previsualizar el resultado final.",
    contactTitle: "Hablemos de tu proyecto",
    email: "Correo",
    rights: "Landing pages.",
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
  },
  en: {
    ids: { projects: "projects", about: "about", contact: "contact" },
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    all: "All",
    latest: "Latest projects (sample demos)",
    aboutTitle: "About us",
    aboutKicker: "Welcome to the studio",
    aboutText:
      "At UrsuStudiO we create exclusive landing pages that turn visitors into customers. We start from optimized visual structures and fully adapt them to your business: we design every detail, typeface and motion to reflect the essence of your brand. The result is a fast, memorable web experience strategically focused on growing your business.",
    bullets: [
      "✓ 100% Custom Design",
      "✓ Ultra-Fast Loading Speed",
      "✓ Smooth Visual Experiences",
      "✓ Optimization",
    ],
    projectsTitle: "Projects",
    projectsIntro:
      "We take a complete approach: strategy, design and technology move forward together in every project. We work across different industries so we never repeat formulas or take shortcuts, because every brand deserves its own solution. The projects below are demos designed to preview the final result (the demo sites are in Spanish).",
    contactTitle: "Let's talk about your project",
    email: "Email",
    rights: "Landing pages.",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
};

export const t = dict[LANG];
