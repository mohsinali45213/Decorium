"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface AdminNavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function AdminNavbar({ searchQuery = "", onSearchChange }: AdminNavbarProps) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [internalQuery, setInternalQuery] = useState(searchQuery);

  const queryValue = onSearchChange ? searchQuery : internalQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalQuery(val);
    onSearchChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && queryValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(queryValue.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] px-8 flex items-center justify-between sticky top-0 bg-[#fdf8f8]/95 dark:bg-[#121212]/95 backdrop-blur-md z-20 transition-all duration-300 ease-in-out">
      
      {/* Dedicated Admin Search Input */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" strokeWidth={1.75} />
          <input
            type="text"
            value={queryValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search catalog products, categories, specs (Press Enter)..."
            className="w-full pl-10 pr-4 py-2 font-body-sm text-body-sm bg-[#f7f3f2] dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-lg focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] placeholder-[#5d5f5f] dark:placeholder-[#8e8e8e] uppercase tracking-wider text-[11px] transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      {/* Right Controls: Theme Toggle, Help & Documentation, Admin User Menu */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Button
          variant="icon"
          size="icon"
          aria-label="Help & Documentation"
          icon={HelpCircle}
        />

        <div className="h-5 w-px bg-[#c4c7c7]/40 dark:bg-[#2e2e2e]" />

        {/* Dedicated Admin Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-4 cursor-pointer group focus:outline-none px-2 py-1.5 rounded-lg hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80 transition-colors duration-300"
          >
            <div className="size-8 rounded-full overflow-hidden border border-[#c4c7c7]/40 dark:border-[#2e2e2e] relative shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Admin Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] block leading-none tracking-wider">
                Studio Admin
              </span>
            </div>
            <ChevronDown className="size-3.5 text-[#5d5f5f] dark:text-[#8e8e8e] ml-1 group-hover:translate-y-0.5 transition-transform duration-300 ease-in-out" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-4 w-60 bg-[#fdf8f8] dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-xl shadow-xl p-3.5 z-50 animate-fadeIn text-left font-label-caps text-label-caps uppercase text-xs space-y-1">
              <div className="px-3 py-2 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <span className="block font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">Curator Portal</span>
                <span className="text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] lowercase">admin@decorium.com</span>
              </div>
              <Link
                href="/admin"
                className="block w-full text-left px-3 py-2 hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg transition-colors duration-300"
              >
                Portal Dashboard
              </Link>
              <Link
                href="/"
                className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors duration-300"
              >
                Exit Admin Portal
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
