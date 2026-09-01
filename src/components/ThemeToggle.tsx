import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export type ThemeMode = "dark" | "light" | "system";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("bbm_theme") as ThemeMode;
    return saved || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("bbm_theme", theme);

    const applyTheme = (mode: ThemeMode) => {
      root.classList.remove("dark", "light");
      if (mode === "system") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(systemDark ? "dark" : "light");
      } else {
        root.classList.add(mode);
      }
    };

    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <div className="flex items-center bg-hacker-card border border-hacker-border p-1 rounded-lg text-xs font-mono">
      <button
        onClick={() => setTheme("dark")}
        className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
          theme === "dark"
            ? "bg-hacker-amber text-black font-bold"
            : "text-hacker-muted hover:text-white"
        }`}
        title="Dark Hacker Theme"
      >
        <Moon size={13} />
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
          theme === "light"
            ? "bg-hacker-amber text-black font-bold"
            : "text-hacker-muted hover:text-white"
        }`}
        title="Light Theme"
      >
        <Sun size={13} />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
          theme === "system"
            ? "bg-hacker-amber text-black font-bold"
            : "text-hacker-muted hover:text-white"
        }`}
        title="Match System OS Theme"
      >
        <Laptop size={13} />
        <span className="hidden sm:inline">System</span>
      </button>
    </div>
  );
};
