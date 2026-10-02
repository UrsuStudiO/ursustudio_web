import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 ${className}`}
      style={{ borderColor: "var(--line-strong)" }}
    >
      <span className="relative block h-4 w-4">
        <Sun
          size={16}
          strokeWidth={1.25}
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
            color: "var(--text)",
          }}
        />
        <Moon
          size={16}
          strokeWidth={1.25}
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
            color: "var(--text)",
          }}
        />
      </span>
    </button>
  );
}
