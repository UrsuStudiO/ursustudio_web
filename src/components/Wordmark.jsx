// "UrsuStudiO" con el monograma USO (las mayúsculas) en dorado.
// tone="auto" se oscurece en modo claro; tone="bright" es para fondos siempre oscuros.
export default function Wordmark({ tone = "auto" }) {
  const gold = tone === "bright" ? "gold" : "gold-auto";
  return (
    <>
      <span className={gold}>U</span>rsu<span className={gold}>S</span>tudi<span className={gold}>O</span>
    </>
  );
}
