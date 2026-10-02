// Divide el texto de un elemento en spans por letra, envueltos en un span
// "line-clip" que recorta el overflow (necesario para el efecto de cortina).
// No depende del plugin de pago SplitText de GSAP.
export function splitToChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const chars = [];
  [...text].forEach((ch) => {
    const clip = document.createElement("span");
    clip.className = "line-clip";
    const inner = document.createElement("span");
    inner.className = "char";
    inner.textContent = ch === " " ? "\u00A0" : ch;
    clip.appendChild(inner);
    el.appendChild(clip);
    chars.push(inner);
  });
  return chars;
}
