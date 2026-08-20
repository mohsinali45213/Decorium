"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/Button";

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
      <Button
        variant="icon"
        size="icon"
        aria-label="Toggle theme"
        className={`opacity-50 ${className}`}
      >
        <span className="size-4.5 block" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="icon"
      size={showLabel ? "md" : "icon"}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
      icon={isDark ? Sun : Moon}
      iconPosition="left"
    >
      {showLabel && (isDark ? "Light" : "Dark")}
    </Button>
  );
}
