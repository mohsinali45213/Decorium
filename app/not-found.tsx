"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] px-6 sm:px-12 md:px-16 pt-8 pb-12 transition-colors duration-300 select-none">
      
      {/* Header */}
      <header className="flex items-center justify-between w-full max-w-[1440px] mx-auto mb-6">
        <Link
          href="/"
          className="font-raleway text-[20px] md:text-[24px] font-normal tracking-[0.2em] uppercase text-[#1c1b1b] dark:text-[#f4f0ef] hover:opacity-80 transition-opacity"
        >
          DECORIUM
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content Area (Centered Minimal Luxury 404) */}
      <main className="w-full max-w-2xl mx-auto my-auto py-12 flex flex-col items-center justify-center text-center">
        <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-[0.25em] block mb-3">
          ERROR 404
        </span>

        <h1 className="font-raleway text-[110px] sm:text-[150px] md:text-[180px] font-light leading-none tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef] mb-6">
          404
        </h1>

        <h2 className="font-raleway text-headline-md sm:text-headline-lg uppercase font-light tracking-wide text-[#1c1b1b] dark:text-[#f4f0ef] mb-4">
          PAGE NOT FOUND
        </h2>

        <p className="font-body-lg text-body-lg text-[#5d5f5f] dark:text-[#8e8e8e] max-w-md mb-10">
          The requested surface page or catalog path could not be found. Return to the home page to explore our curated collections.
        </p>

        <Button href="/" variant="primary" size="lg" icon={ArrowRight} className="rounded-full px-10 py-4">
          RETURN HOME
        </Button>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between w-full max-w-[1440px] mx-auto pt-6 border-t border-[#c4c7c7]/30 dark:border-[#262626] font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest">
        <span>ERROR 404</span>
        <span>DECORIUM © 2026</span>
      </footer>

    </div>
  );
}
