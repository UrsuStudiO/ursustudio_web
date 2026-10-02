import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../gsapSetup";
import { splitToChars } from "../utils/splitChars";

export default function About() {
  const ref = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = splitToChars(titleRef.current);
      gsap.set(chars, { yPercent: 130, rotateX: 70, transformOrigin: "50% 100%", opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="px-4 md:px-10 py-16 md:py-24 border-t border-[var(--border)]"
    >
      <h2
        ref={titleRef}
        className="font-display font-semibold leading-[0.9] w-full text-[var(--fg)] text-center uppercase whitespace-nowrap mb-8 md:mb-10"
        style={{ fontSize: "clamp(2.4rem, 10vw, 8rem)" }}
      >
        Nosotros
      </h2>
      <p className="text-sm uppercase tracking-wide text-[var(--fg)]/50 mb-4 font-display text-center whitespace-nowrap">
        Bienvenidos al estudio
      </p>
      <p
        className="w-full text-[var(--fg)] leading-relaxed"
        style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.65rem)" }}
      >
        En UrsuStudiO creamos landing pages exclusivas que transforman visitas en clientes. 
        Partimos de estructuras visuales optimizadas que adaptamos por completo a tu negocio: 
        diseñamos cada detalle, tipografía y movimiento para reflejar la esencia de tu marca. 
        El resultado es una experiencia web rápida, memorable y estratégicamente enfocada en 
        hacer crecer tu negocio.
      </p>
      <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm uppercase tracking-wider font-medium text-[var(--fg)]/70">
        <li>✓ Diseño 100% Exclusivo</li>
        <li>✓ Velocidad de Carga Ultra Rápida</li>
        <li>✓ Experiencias Visuales Fluídas</li>
        <li>✓ Optimización</li>
      </ul>
    </section>
  );
}
