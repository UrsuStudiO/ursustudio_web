// Edita aquí tus proyectos.
//
// alt          -> descripción de la imagen (importante para SEO y accesibilidad)
// en           -> traducción al inglés de category, tag y alt
const projects = [
  {
    id: "01",
    title: "Altavista",
    category: "Bienes raíces",
    tag: "Catálogo Inmobiliario · Landing Page",
    image: "/projects/proyecto-1.webp",
    alt: "Landing page para inmobiliaria Altavista con catálogo de propiedades",
    demo: "https://altavista-phi.vercel.app/",
    en: {
      category: "Real estate",
      tag: "Real Estate Catalog · Landing Page",
      alt: "Landing page for the Altavista real estate agency with a property catalog",
    },
  },
  {
    id: "02",
    title: "Bloque",
    category: "Moda",
    tag: "Ropa de Diseño · Landing Page",
    image: "/projects/proyecto-2.webp",
    alt: "Landing page para la marca de ropa de diseño Bloque",
    demo: "https://bloque-nine.vercel.app/",
    en: {
      category: "Fashion",
      tag: "Designer Clothing · Landing Page",
      alt: "Landing page for the designer clothing brand Bloque",
    },
  },
  {
    id: "03",
    title: "Nova Run",
    category: "Moda",
    tag: "Calzado de Autor · Landing Page",
    image: "/projects/proyecto-3.webp",
    alt: "Landing page para la marca de calzado deportivo Nova Run",
    demo: "https://novarun-ruddy.vercel.app/",
    en: {
      category: "Fashion",
      tag: "Signature Footwear · Landing Page",
      alt: "Landing page for the Nova Run sneaker brand",
    },
  },
  {
    id: "04",
    title: "Terra Crema",
    category: "Belleza",
    tag: "Cosmética & Cuidado · Landing Page",
    image: "/projects/proyecto-4.webp",
    alt: "Landing page para la marca de cosmética y cuidado personal Terra Crema",
    demo: "https://terra-crema.vercel.app/",
    en: {
      category: "Beauty",
      tag: "Cosmetics & Care · Landing Page",
      alt: "Landing page for the Terra Crema cosmetics and personal care brand",
    },
  },
  {
    id: "05",
    title: "Cafe Ritual",
    category: "Bebidas",
    tag: "Café de Especialidad · Landing Page",
    image: "/projects/proyecto-5.webp",
    alt: "Landing page para la marca de café de especialidad Cafe Ritual",
    demo: "https://ritualcafe-one.vercel.app/",
    en: {
      category: "Beverages",
      tag: "Specialty Coffee · Landing Page",
      alt: "Landing page for the specialty coffee brand Cafe Ritual",
    },
  },
  {
    id: "06",
    title: "Salon Imperia",
    category: "Eventos",
    tag: "Espacio para Eventos · Landing Page 3D",
    image: "/projects/proyecto-6.webp",
    alt: "Landing page 3D para el espacio de eventos Salon Imperia",
    demo: "https://salonimperia.vercel.app/",
    en: {
      category: "Events",
      tag: "Event Venue · 3D Landing Page",
      alt: "3D landing page for the Salon Imperia event venue",
    },
  },
];

// Devuelve el proyecto con los textos en el idioma pedido ("es" o "en").
export function localize(p, lang) {
  return lang === "en" ? { ...p, ...p.en } : p;
}

export default projects;
