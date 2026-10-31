import { LANG } from "../i18n";

function Item({ code, href, label }) {
  if (LANG === code) {
    return (
      <span aria-current="true" className="font-semibold">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      hrefLang={code}
      lang={code}
      className="text-[var(--fg)]/60 hover:text-[var(--fg)] transition-colors"
    >
      {label}
    </a>
  );
}

export default function LangSwitch() {
  return (
    <div className="flex items-center gap-2 text-sm font-display">
      <Item code="es" href="/" label="ES" />
      <span className="opacity-30">/</span>
      <Item code="en" href="/en/" label="EN" />
    </div>
  );
}
