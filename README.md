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
    Hero.jsx              # Intro (bandera en columnas) + 2 proyectos al azar
    ProjectsParallax.jsx  # 3 columnas con parallax (izq/der suben, centro baja)
    About.jsx             # Sección "Nosotros"
    ProjectsSection.jsx   # Grilla de 2 columnas con todos los proyectos
    Contact.jsx           # correo grande con relleno al hover
    Footer.jsx            # Footer con reveal tipo cortina + nav
    ThemeToggle.jsx        # Botón de modo claro/oscuro (íconos de lucide-react)
  data/
    projects.js           # <- EDITA AQUÍ tus proyectos (título, imagen, link a demo)
  utils/splitChars.js     # divide texto en letras para las animaciones
  context/
    ThemeContext.jsx       # estado de tema + animación de círculo (View Transitions API)
```

## Cómo agregar tus proyectos

1. Pon la captura en `public/projects/<slug>.webp` (WebP, menos de 150 KB, 1920x1080).
   El slug es el nombre en minúsculas con guiones: "Nova Run" -> `nova-run.webp`.
2. Agrega una línea en `src/data/projects.js`:

```js
{ name: "Nova Run", category: { es: "Moda", en: "Fashion" }, url: "https://..." },
```

El hero muestra 2 proyectos al azar en cada visita y la galería parallax como mucho 9,
así la portada no crece aunque tengas 50 webs. La grilla de "Proyectos" sí los lista todos.

## Oso (cambio de tema)

- Al cambiar entre modo claro y oscuro, el modo nuevo entra al frente con la forma del
  oso desde el centro de la pantalla (ver `ThemeContext.jsx` e `index.css`).
  Es el único lugar donde se usa el oso.
- `public/bear-face.png`: oso con los calados de ojos, nariz y boca (se ve la página a través).
- `public/bear-mask.png`: silueta rellena que tapa esos huecos al final de la animación.
- `public/logo.png` es el original en alta resolución (no se usa en la página).

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

## Efecto de telón (scroll)

- `src/App.jsx` arma dos etapas: (1) el Hero queda fijo (`components/Pin.jsx`) cuando aparece completo
  "UrsuStudiO" y la galería de proyectos sube encima como un telón; (2) el telón sigue subiendo y deja ver
  "Nosotros" fijo por detrás. Es solo CSS `position: sticky`, sin librerías.
- El enlace del menú a "Nosotros" se maneja con JS (ver `goToAbout` en `App.jsx`) para caer ya con la sección revelada.
- Si cambias el orden de las secciones, ten en cuenta que `About` depende del contenedor `data-reveal-holder`.

## Títulos a todo el ancho

`src/hooks/useFitText.js` ajusta el tamaño de la fuente para que cada título ocupe el ancho completo de la
pantalla. Para que otro título lo use: `const ref = useRef(null); useFitText(ref);` y pon `ref` en el título.

## Contacto

Solo el correo. Se cambia en `EMAIL` dentro de `src/components/Contact.jsx` (también lo usa el footer).

## Idiomas (español / inglés)

- Español en `/` e inglés en `/en/`. Hay un selector **ES / EN** en la barra superior.
- Los textos de la página están en `src/i18n.js` (uno para cada idioma).
- Cada proyecto en `src/data/projects.js` tiene un bloque `en: { ... }` con su traducción.
- El idioma se toma de `<html lang>`: `index.html` (es) y `en/index.html` (en).

## Scroll suave

Usa [Lenis](https://lenis.darkroom.engineering/) (`npm i lenis`), iniciado en `src/App.jsx` y sincronizado con GSAP.

## SEO

- Metadatos, Open Graph y datos estructurados están en `index.html` y `en/index.html`.
- `public/sitemap.xml` y `public/robots.txt` son archivos estáticos.
- Imagen para compartir en redes: `public/og-image.jpg` (1200x630).
- **Cuando tengas dominio propio** cambia la URL en 4 archivos: `index.html`, `en/index.html`,
  `public/sitemap.xml` y `public/robots.txt`.
- Pasos en Google Search Console: agregar propiedad, verificar, enviar `sitemap.xml`
  y pedir indexación de `/` y `/en/`.
