// Edita aquí tus webs. Solo tres datos por proyecto:
//
// name      -> nombre de la marca demo
// category  -> rubro en español e inglés
// url       -> link a la demo en Vercel
//
// La imagen se toma sola de /public/projects/<slug>.webp
// (slug = nombre en minúsculas con guiones, ej. "Nova Run" -> nova-run.webp).
const projects = [
  { name: "Altavista", category: { es: "Bienes raíces", en: "Real estate" }, url: "https://altavista-phi.vercel.app/" },
  { name: "Bloque", category: { es: "Moda", en: "Fashion" }, url: "https://bloque-nine.vercel.app/" },
  { name: "Nova Run", category: { es: "Moda", en: "Fashion" }, url: "https://novarun-ruddy.vercel.app/" },
  { name: "Terra Crema", category: { es: "Belleza", en: "Beauty" }, url: "https://terra-crema.vercel.app/" },
  { name: "Cafe Ritual", category: { es: "Bebidas", en: "Beverages" }, url: "https://ritualcafe-one.vercel.app/" },
  { name: "Salon Imperia", category: { es: "Eventos", en: "Events" }, url: "https://salonimperia.vercel.app/" },
];

const slug = (s) => s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/\s+/g, "-");

// Proyectos con el rubro en el idioma pedido ("es" o "en") e imagen resuelta.
export function getProjects(lang) {
  return projects.map((p, i) => ({
    id: String(i + 1).padStart(2, "0"),
    title: p.name,
    category: p.category[lang],
    image: `/projects/${slug(p.name)}.webp`,
    alt: `${p.name} · landing page ${p.category[lang]}`,
    demo: p.url,
  }));
}
