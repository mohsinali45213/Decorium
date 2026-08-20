"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, LucideIcon } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface LuxuryDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  labelPrefix?: string;
  icon?: LucideIcon;
  widthClassName?: string;
  align?: "left" | "right";
  mobileIconOnly?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function LuxuryDropdown({
  options,
  value,
  onChange,
  placeholder = "SELECT",
  labelPrefix = "",
  icon: Icon,
  widthClassName = "w-52 sm:w-60",
  align = "right",
  mobileIconOnly = false,
  className = "",
  buttonClassName = "",
}: LuxuryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? `${labelPrefix}${selectedOption.label}`
    : placeholder;

  return (
    <div ref={dropdownRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={displayLabel}
        title={displayLabel}
        className={`${buttonClassName || "h-10 rounded-md border-[#c4c7c7]/65 dark:border-[#2e2e2e]"} ${
          mobileIconOnly
            ? `size-10 px-0 justify-center md:w-auto md:px-3.5 md:justify-between ${widthClassName}`
            : `${widthClassName} px-3.5 justify-between`
        } btn-luxury btn-luxury-outline border font-label-caps text-label-caps text-[10px] uppercase tracking-wider flex items-center gap-2 cursor-pointer outline-none transition-all duration-300 group`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="size-4 shrink-0 transition-colors" />}
          <span className={`truncate ${mobileIconOnly ? "hidden md:inline" : ""}`}>{displayLabel}</span>
        </div>
        <ChevronDown
          className={`size-3.5 shrink-0 transition-transform duration-300 ${
            mobileIconOnly ? "hidden md:block" : ""
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute ${
              align === "right" ? "right-0" : "left-0"
            } top-full mt-1.5 z-50 ${widthClassName} bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border border-[#c4c7c7]/65 dark:border-[#2e2e2e] rounded-xl shadow-2xl p-1 space-y-0.5`}
          >
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left font-label-caps text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold"
                      : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="size-3.5 shrink-0 ml-2" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
