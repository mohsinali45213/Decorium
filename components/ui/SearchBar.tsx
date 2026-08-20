"use client";

import { Search, X } from "lucide-react";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  maxWidthClassName?: string;
  onClear?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search materials...",
  className = "",
  inputClassName = "",
  maxWidthClassName = "max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl",
  onClear,
}: SearchBarProps) {
  const handleClear = () => {
    onChange("");
    if (onClear) onClear();
  };

  return (
    <div className={`relative flex-1 ${maxWidthClassName} min-w-0 group ${className}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5d5f5f] dark:text-[#8e8e8e] group-focus-within:text-[#1c1b1b] dark:group-focus-within:text-[#f4f0ef] transition-colors pointer-events-none">
        <Search className="size-4" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-10 pl-8 md:pl-9 pr-7 md:pr-9 bg-transparent border border-[#c4c7c7]/65 dark:border-[#2e2e2e] focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] rounded-md font-body-sm text-xs md:text-body-sm text-[#1c1b1b] dark:text-[#f4f0ef] transition-colors outline-none placeholder:text-[#5d5f5f]/60 truncate ${inputClassName}`}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] p-1 cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
