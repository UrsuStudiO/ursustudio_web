// Idioma de la página: se lee de <html lang="..."> (es en "/" y en en "/en/").
export const LANG =
  typeof document !== "undefined" && document.documentElement.lang === "en" ? "en" : "es";

const dict = {
  es: {
    ids: { projects: "proyectos", about: "nosotros", plans: "paquetes", faq: "preguntas", contact: "contacto" },
    nav: { projects: "Proyectos", about: "Nosotros", contact: "Contacto" },
    all: "Todos",
    latest: "Proyectos destacados (demos de muestra)",
    aboutTitle: "Nosotros",
    aboutKicker: "Bienvenidos al estudio",
    aboutText:
      "En UrsuStudiO, estudio de diseño web en Bolivia, creamos páginas web y landing pages exclusivas que transforman visitas en clientes. Partimos de estructuras visuales optimizadas que adaptamos por completo a tu negocio: diseñamos cada detalle, tipografía y movimiento para reflejar la esencia de tu marca. El resultado es una experiencia web rápida, memorable y estratégicamente enfocada en hacer crecer tu negocio.",
    bullets: [
      "✓ Diseño 100% Exclusivo",
      "✓ Velocidad de Carga Ultra Rápida",
      "✓ Experiencias Visuales Fluídas",
      "✓ Optimización",
    ],
    projectsTitle: "Proyectos",
    projectsIntro:
      "Trabajamos con una mirada completa: estrategia, diseño y tecnología avanzan juntos en cada proyecto. Diseñamos páginas web para negocios de distintos rubros, sin repetir fórmulas ni caer en atajos, porque cada marca merece una solución propia. Los siguientes proyectos son demostraciones diseñadas para previsualizar el resultado final.",
    plansKicker: "Servicios",
    plansTitle: "Paquetes",
    plansIntro:
      "Cada proyecto se cotiza según lo que necesites. Estos paquetes son un punto de partida: elige el que más se parezca a tu idea y lo ajustamos a tu marca.",
    plansCta: "Cotizar",
    plansExample: "Como",
    plansExtrasTitle: "Extras",
    plansExtras: ["Idioma adicional", "Secciones extra", "Redacción de textos", "Mockups y fotos", "Mantenimiento mensual", "Entrega urgente"],
    plans: [
      {
        name: "Esencial",
        tagline: "Para presentar tu negocio y empezar a recibir clientes.",
        features: ["Landing de 4 a 5 secciones", "Animaciones de entrada", "Adaptada a celular", "Botón o formulario de contacto", "Optimizada para Google"],
        examples: "Bloque, Terra Crema",
      },
      {
        name: "Dinámica",
        tagline: "Para marcas que quieren destacar con movimiento.",
        features: ["Todo lo de Esencial", "Scroll animado y parallax", "Galerías y más secciones", "Transiciones entre secciones", "Modo claro y oscuro"],
        examples: "Altavista, Cafe Ritual",
      },
      {
        name: "Premium 3D",
        tagline: "Para lanzamientos y marcas que quieren impactar.",
        features: ["Todo lo de Dinámica", "Efectos 3D", "Secuencias con scroll (scrub)", "Versión en 2 idiomas", "Animaciones a medida"],
        examples: "Salon Imperia, Nova Run",
      },
    ],
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Preguntas",
    faq: [
      {
        q: "¿Cuánto tarda en estar lista mi página web?",
        a: "Depende del tamaño del proyecto. Una landing page sencilla se entrega más rápido; una con scroll animado, parallax o efectos 3D lleva más tiempo. Antes de empezar te damos un plazo claro según lo que necesites.",
      },
      {
        q: "¿Cuánto cuesta una landing page o una página web?",
        a: "Cada proyecto se cotiza según lo que incluya: cantidad de secciones, tipo de animaciones (scroll, parallax, 3D) e idiomas. Cuéntanos tu idea y te enviamos una cotización sin compromiso.",
      },
      {
        q: "¿Qué necesito para empezar?",
        a: "Tu logo, una idea de lo que quieres comunicar y, si tienes, fotos de tu negocio o producto. Si te falta algo, te orientamos para armarlo.",
      },
      {
        q: "¿Se ve bien en celulares?",
        a: "Sí. Cada página se diseña pensando primero en el celular y se optimiza para cargar rápido, incluso con animaciones.",
      },
      {
        q: "¿Puedo pedir cambios durante el proceso?",
        a: "Sí. Revisamos el diseño contigo en cada etapa y hacemos los ajustes necesarios antes de publicar.",
      },
      {
        q: "¿Incluye dominio y hosting?",
        a: "Te ayudamos a publicar tu página y a conectar tu propio dominio (por ejemplo, tunegocio.com). Te explicamos las opciones y sus costos antes de empezar.",
      },
      {
        q: "¿Trabajan con clientes fuera de Bolivia?",
        a: "Sí. Trabajamos de forma remota con negocios de cualquier país, en español o en inglés.",
      },
      {
        q: "¿Los proyectos del portafolio son de clientes reales?",
        a: "Son demostraciones de marcas ficticias para que veas distintos estilos y efectos. Tu página se diseña desde cero para tu marca.",
      },
    ],
    quote: {
      title: "Cotiza tu proyecto",
      intro: "Cuéntanos qué necesitas y te respondemos a tu correo con una propuesta.",
      name: "Nombre",
      email: "Correo",
      plan: "Paquete",
      planNone: "Aún no lo sé",
      phone: "WhatsApp (opcional)",
      message: "¿Qué necesitas?",
      messagePh: "Ej.: una landing para mi cafetería con menú, fotos y ubicación",
      send: "Enviar",
      sending: "Enviando…",
      subject: "Cotización",
      successTitle: "¡Gracias!",
      successText: "Recibimos tu mensaje. Te responderemos pronto a tu correo.",
      error: "No se pudo enviar. Intenta de nuevo o escríbenos a",
      close: "Cerrar",
    },
    contactTitle: "Hablemos de tu proyecto",
    email: "Correo",
    rights: "Diseño de páginas web y landing pages · Bolivia.",
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
  },
  en: {
    ids: { projects: "projects", about: "about", plans: "packages", faq: "faq", contact: "contact" },
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    all: "All",
    latest: "Featured projects (sample demos)",
    aboutTitle: "About us",
    aboutKicker: "Welcome to the studio",
    aboutText:
      "At UrsuStudiO, a Latin America-based web design studio, we create custom landing pages and websites that turn visitors into customers. We start from optimized visual structures and fully adapt them to your business: we design every detail, typeface and motion to reflect the essence of your brand. The result is a fast, memorable web experience strategically focused on growing your business.",
    bullets: [
      "✓ 100% Custom Design",
      "✓ Ultra-Fast Loading Speed",
      "✓ Smooth Visual Experiences",
      "✓ Optimization",
    ],
    projectsTitle: "Projects",
    projectsIntro:
      "We take a complete approach: strategy, design and technology move forward together in every project. We design websites for businesses across many industries, worldwide and in US-friendly time zones, never repeating formulas or taking shortcuts, because every brand deserves its own solution. The projects below are demos designed to preview the final result (the demo sites are in Spanish).",
    plansKicker: "Services",
    plansTitle: "Packages",
    plansIntro:
      "Every project is quoted based on what you need. These packages are a starting point: pick the one closest to your idea and we'll tailor it to your brand.",
    plansCta: "Get a quote",
    plansExample: "Like",
    plansExtrasTitle: "Add-ons",
    plansExtras: ["Extra language", "Extra sections", "Copywriting", "Mockups and photos", "Monthly maintenance", "Rush delivery"],
    plans: [
      {
        name: "Essential",
        tagline: "To present your business and start getting customers.",
        features: ["4 to 5 section landing page", "Entrance animations", "Mobile-ready", "Contact button or form", "Optimized for Google"],
        examples: "Bloque, Terra Crema",
      },
      {
        name: "Dynamic",
        tagline: "For brands that want to stand out with motion.",
        features: ["Everything in Essential", "Animated scroll and parallax", "Galleries and more sections", "Section transitions", "Light and dark mode"],
        examples: "Altavista, Cafe Ritual",
      },
      {
        name: "Premium 3D",
        tagline: "For launches and brands that want to make an impact.",
        features: ["Everything in Dynamic", "3D effects", "Scroll-driven sequences (scrub)", "2-language version", "Custom animations"],
        examples: "Salon Imperia, Nova Run",
      },
    ],
    faqKicker: "Frequently asked questions",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How long does it take to build my website?",
        a: "It depends on the size of the project. A simple landing page is delivered faster; one with animated scroll, parallax or 3D effects takes longer. Before we start, you get a clear timeline based on what you need.",
      },
      {
        q: "How much does a landing page or website cost?",
        a: "Every project is quoted based on what it includes: number of sections, type of animations (scroll, parallax, 3D) and languages. Tell us your idea and we'll send you a free, no-obligation quote.",
      },
      {
        q: "What do I need to get started?",
        a: "Your logo, an idea of what you want to communicate and, if you have them, photos of your business or product. If something is missing, we'll help you put it together.",
      },
      {
        q: "Will it look good on mobile?",
        a: "Yes. Every page is designed mobile-first and optimized to load fast, even with animations.",
      },
      {
        q: "Can I request changes along the way?",
        a: "Yes. We review the design with you at every stage and make the necessary adjustments before launch.",
      },
      {
        q: "Are domain and hosting included?",
        a: "We help you publish your page and connect your own domain (for example, yourbusiness.com). We explain the options and their costs before we start.",
      },
      {
        q: "Do you work with clients outside Latin America?",
        a: "Yes. We work remotely with businesses in any country, in English or Spanish, in US-friendly time zones.",
      },
      {
        q: "Are the portfolio projects from real clients?",
        a: "They are demos for fictional brands that show different styles and effects. Your page is designed from scratch for your brand.",
      },
    ],
    quote: {
      title: "Get a quote",
      intro: "Tell us what you need and we'll reply to your email with a proposal.",
      name: "Name",
      email: "Email",
      plan: "Package",
      planNone: "Not sure yet",
      phone: "WhatsApp (optional)",
      message: "What do you need?",
      messagePh: "E.g. a landing page for my coffee shop with menu, photos and location",
      send: "Send",
      sending: "Sending…",
      subject: "Quote request",
      successTitle: "Thank you!",
      successText: "We got your message and will reply to your email soon.",
      error: "It couldn't be sent. Please try again or email us at",
      close: "Close",
    },
    contactTitle: "Let's talk about your project",
    email: "Email",
    rights: "Custom landing page and website design.",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
};

export const t = dict[LANG];
