import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../gsapSetup";
import { EMAIL } from "./Contact";
import { t } from "../i18n";

// Clave pública de Web3Forms (hecha para ir en el navegador: solo permite
// enviar mensajes a ursustudio.contact@gmail.com, no da acceso a la cuenta).
const WEB3FORMS_KEY = "c3b2103a-0c7a-4af4-a70f-4dc2461e7078";

const field =
  "w-full bg-transparent border-b border-[var(--line-strong)] py-3 text-base text-[var(--fg)] placeholder:text-[var(--fg)]/35 outline-none focus:border-[var(--accent)] transition-colors";
const label = "block text-xs uppercase tracking-wide text-[var(--fg)]/50 font-display";

// Formulario de cotización en una ventana: se envía sin salir de la página.
export default function QuoteModal({ plan, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  // Entrada animada, foco en el primer campo, Escape para cerrar
  useEffect(() => {
    const previous = document.activeElement;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      panelRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
    firstFieldRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // lo llenan los bots, no las personas
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${t.quote.subject}: ${data.plan || t.quote.planNone}`,
          from_name: "UrsuStudiO web",
          ...data,
        }),
      });
      const json = await res.json();
      setStatus(json.success ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative w-full md:max-w-xl max-h-[92svh] overflow-y-auto bg-[var(--bg)] text-[var(--fg)] border border-[var(--line-strong)] px-6 md:px-10 pt-8 pb-8 md:py-10"
      >
        <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-1.5 bg-oro" />
        <button
          type="button"
          onClick={onClose}
          aria-label={t.quote.close}
          className="absolute top-4 right-4 grid place-items-center size-10 rounded-full border border-[var(--line-strong)] hover:bg-oro hover:border-oro hover:text-ink transition-colors cursor-pointer"
        >
          ✕
        </button>

        {status === "done" ? (
          <div className="py-10 text-center">
            <p className="font-display font-semibold uppercase tracking-tight text-4xl md:text-5xl">
              {t.quote.successTitle}
            </p>
            <p className="mt-4 text-[var(--fg)]/70 leading-relaxed">{t.quote.successText}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 border border-[var(--line-strong)] px-6 py-3 font-display font-semibold uppercase tracking-wide text-sm hover:bg-oro hover:border-oro hover:text-ink transition-colors cursor-pointer"
            >
              {t.quote.close}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="pr-12">
              <h2 id="quote-title" className="font-display font-semibold uppercase tracking-tight text-3xl md:text-4xl">
                {t.quote.title}
              </h2>
              <p className="mt-3 text-[var(--fg)]/70 leading-relaxed">{t.quote.intro}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="block">
                <span className={label}>{t.quote.name}</span>
                <input ref={firstFieldRef} name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>{t.quote.email}</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="block">
                <span className={label}>{t.quote.plan}</span>
                <select name="plan" defaultValue={plan} className={`${field} cursor-pointer`}>
                  <option value="" className="bg-[var(--bg)]">{t.quote.planNone}</option>
                  {t.plans.map((p) => (
                    <option key={p.name} value={p.name} className="bg-[var(--bg)]">
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={label}>{t.quote.phone}</span>
                <input name="whatsapp" type="tel" autoComplete="tel" className={field} />
              </label>
            </div>

            <label className="block">
              <span className={label}>{t.quote.message}</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.quote.messagePh}
                className={`${field} resize-none`}
              />
            </label>

            {/* Trampa para bots: invisible para las personas */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

            {status === "error" && (
              <p role="alert" className="text-sm text-[#E5484D]">
                {t.quote.error}{" "}
                <a href={`mailto:${EMAIL}`} className="underline">
                  {EMAIL}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-between bg-oro text-ink px-6 py-4 font-display font-semibold uppercase tracking-wide text-sm hover:brightness-110 transition disabled:opacity-60 cursor-pointer"
            >
              {status === "sending" ? t.quote.sending : t.quote.send}
              <span aria-hidden="true" className="text-lg">↗</span>
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
