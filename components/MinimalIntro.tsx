"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import customBg from "@/stitch_decorium_editorial_navbar/decorium_floating_hero_variant_b/hero-bg-custom.jpg";

export function MinimalIntro() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-[clamp(24px,calc((64/1920)*100vw),64px)] text-center bg-[#fdf8f8]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          alt="Architectural Minimalist Background"
          className="object-cover opacity-30"
          fill
          priority
          sizes="100vw"
          src={customBg}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f8]/50 via-transparent to-[#fdf8f8]/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-lg mx-auto w-full px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Wordmark */}
        <h2 className="font-raleway text-[clamp(48px,calc((80/1920)*100vw),80px)] text-[#1c1b1b] tracking-[0.25em] font-light uppercase leading-none">
          DECORIUM
        </h2>
        
        {/* Divider Line */}
        <div className="w-16 h-px bg-[#1c1b1b] opacity-20" />

        {/* Tagline */}
        <p className="font-hanken-grotesk text-[clamp(11px,calc((12/1920)*100vw),12px)] font-semibold text-[#5d5f5f] uppercase tracking-[0.3em]">
          WE MAKE SPACE FOR LIFE.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#1c1b1b] opacity-60 animate-bounce">
        <span className="text-[10px] font-semibold tracking-[0.2em] font-hanken-grotesk">SCROLL</span>
        <ArrowDown className="size-4" strokeWidth={2} />
      </div>
    </section>
  );
}
