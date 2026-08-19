"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex size-10 items-center justify-center rounded-full border border-[#e5e2e1] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef] transition-colors ${className}`}
      >
        <span className="size-4.5 block opacity-0" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#e5e2e1] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#1f1f1f] transition-all duration-300 ${
        showLabel ? "px-4 py-2" : "size-10"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="size-[18px] transition-transform duration-300 rotate-0 hover:rotate-45" strokeWidth={1.5} />
      ) : (
        <Moon className="size-[18px] transition-transform duration-300 -rotate-12 hover:rotate-0" strokeWidth={1.5} />
      )}
      {showLabel && (
        <span className="font-raleway text-body-sm uppercase tracking-wider">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
