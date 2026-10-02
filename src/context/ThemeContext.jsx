import { createContext, useContext, useLayoutEffect, useState, useCallback, useRef } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "ursustudio-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const originRef = useRef({ x: "50%", y: "50%" });

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback((event) => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

    if (event?.clientX != null) {
      originRef.current = { x: `${event.clientX}px`, y: `${event.clientY}px` };
    }

    const supportsViewTransitions = typeof document.startViewTransition === "function";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (supportsViewTransitions && !prefersReducedMotion) {
      document.documentElement.style.setProperty("--reveal-x", originRef.current.x);
      document.documentElement.style.setProperty("--reveal-y", originRef.current.y);
      const transition = document.startViewTransition(() => {
        setTheme(next);
      });
      transition.ready.then(() => {
        const endRadius = Math.hypot(window.innerWidth, window.innerHeight);
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${originRef.current.x} ${originRef.current.y})`,
              `circle(${endRadius}px at ${originRef.current.x} ${originRef.current.y})`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(next);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
