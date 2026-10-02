# UrsuStudiO - sitio de landing pages

Proyecto en **Vite + React + Tailwind CSS v4 + GSAP (ScrollTrigger)**, con modo
claro/oscuro y una paleta suavizada de la bandera de Bolivia (rojo, amarillo,
verde) usada en el intro y como acentos.

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo, http://localhost:5173
npm run build     # build de producción -> carpeta dist/
npm run preview   # previsualizar el build
```

## Estructura

```
src/
  components/
    Hero.jsx              # Intro de cortina + logo animado + preview de 2 proyectos
    ProjectsParallax.jsx  # 3 columnas con parallax (izq/der suben, centro baja)
    InnovativeText.jsx    # "DISEÑOS INNOVADORES" con efecto especial en la O
    About.jsx             # Sección "Nosotros"
    ProjectsSection.jsx   # Grilla de 2 columnas con todos los proyectos
    Contact.jsx           # 4 contactos con animación de texto al hover
    Footer.jsx            # Footer con reveal tipo cortina + nav
    ThemeToggle.jsx        # Botón de modo claro/oscuro (íconos de lucide-react)
  data/
    projects.js           # <- EDITA AQUÍ tus proyectos (título, imagen, link a demo)
  utils/splitChars.js     # divide texto en letras para las animaciones
  context/
    ThemeContext.jsx       # estado de tema + animación de círculo (View Transitions API)
```

## Cómo agregar tus proyectos

1. Coloca tus imágenes en `public/projects/` (cualquier formato: jpg, png, webp, svg).
2. Edita `src/data/projects.js` y actualiza `title`, `tag`, `image` y `demo`
   (el link al que se redirige al hacer click).
3. El **Hero** siempre muestra los primeros 2 proyectos del arreglo como
   "últimos proyectos". Ordénalos como quieras en el archivo.

## Paleta de colores

Definida en `src/index.css` dentro de `@theme`:

- `--color-rojo`: `#C23B2E`
- `--color-amarillo`: `#E3B23C`
- `--color-verde`: `#2F6B4F`
- `--color-ink` / `--color-paper`: base para texto/fondo

Disponibles como utilidades Tailwind: `bg-rojo`, `text-verde`, `border-amarillo`, etc.

## Notas sobre las animaciones

- El intro (logo + cortina) se reproduce una vez al cargar la página.
- Las animaciones de scroll usan `ScrollTrigger` con `scrub` para el parallax
  y `start: "top 80-90%"` para los reveals - puedes ajustar estos valores en
  cada componente si quieres que aparezcan antes o después.
- Se respeta `prefers-reduced-motion` a nivel global (ver `index.css`).
