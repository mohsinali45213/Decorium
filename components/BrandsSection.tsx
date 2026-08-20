"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATALOG_BRANDS } from "@/lib/catalogData";

const BRAND_IMAGES: Record<string, string> = {
  "brand-laminam": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
  "brand-antoniolupi": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  "brand-gessi": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  "brand-salvatori": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  "brand-marazzi": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
  "brand-buster-punch": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
  "brand-margraf": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
};

export function BrandsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop screen width to control autoplay availability
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Desktop Autoplay Timer
  useEffect(() => {
    if (!isDesktop || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const currentIdx = prev ?? 0;
        return (currentIdx + 1) % CATALOG_BRANDS.length;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isDesktop, isAutoPlaying]);

  const desktopActiveIndex = activeIndex ?? 0;
  const activeBrand = CATALOG_BRANDS[desktopActiveIndex];
  const activeImage = BRAND_IMAGES[activeBrand._id] || BRAND_IMAGES["brand-salvatori"];

  return (
    <section className="bg-[#fdf8f8] dark:bg-[#121212] py-16 md:py-24 px-navbar-px max-w-[1440px] mx-auto border-t border-[#c4c7c7]/65 dark:border-[#262626] relative z-20 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-5 md:mb-10 text-left">
        <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
          BRAND & PARTNERS
        </span>
        <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
          Explore Brands
        </h2>
      </div>

      {/* Desktop Layout */}
      <div 
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="hidden md:grid grid-cols-12 gap-12 items-center min-h-[500px]"
      >
        
        {/* Left Column: Vertical Interactive Menu */}
        <div className="col-span-5 flex flex-col gap-1 w-full pr-6 text-left">
          {CATALOG_BRANDS.map((brand, index) => {
            const isActive = desktopActiveIndex === index;
            return (
              <div
                key={brand._id}
                onMouseEnter={() => setActiveIndex(index)}
                className="group py-3.5 border-b border-[#c4c7c7]/30 dark:border-[#262626] flex items-center justify-between cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  {/* Slide number */}
                  <span className={`font-label-caps text-label-caps-sm transition-colors duration-300 ${
                    isActive ? "text-[#1c1b1b] dark:text-[#f4f0ef]" : "text-[#5d5f5f]/40 dark:text-[#8e8e8e]/40"
                  }`}>
                    0{index + 1}
                  </span>
                  
                  {/* Brand name */}
                  <span className={`font-raleway text-body-lg uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive 
                      ? "text-[#1c1b1b] dark:text-[#f4f0ef] font-normal translate-x-2" 
                      : "text-[#5d5f5f]/60 dark:text-[#8e8e8e]/60 font-light group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] group-hover:translate-x-1"
                  }`}>
                    {brand.name}
                  </span>
                </div>

                {/* Micro-arrow icon for active item */}
                <ArrowRight 
                  className={`size-4 text-[#1c1b1b] dark:text-[#f4f0ef] transition-all duration-300 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`} 
                  strokeWidth={1.75}
                />
              </div>
            );
          })}
        </div>

        {/* Right Column: Animated Card Showcase */}
        <div className="col-span-7 pl-6 h-full flex flex-col justify-center">
          <Link
            href={`/products?brand=${activeBrand.slug}`}
            className="relative w-full aspect-[16/10] bg-[#f1edec] dark:bg-[#1f1f1f] rounded-lg border border-[#c4c7c7]/50 dark:border-[#2e2e2e] overflow-hidden group/img shadow-xs block cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopActiveIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  alt={activeBrand.name}
                  className="object-cover transition-transform duration-700 group-hover/img:scale-103"
                  fill
                  sizes="40vw"
                  src={activeImage}
                />
                {/* Dark overlay & Centered "Explore Collections" button on hover */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <span className="px-6 py-3.5 bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] font-label-caps text-label-caps uppercase rounded-md shadow-md flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300 border border-transparent dark:border-[#2e2e2e]">
                    Explore Collections
                    <ArrowUpRight className="size-4" strokeWidth={1.75} />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col w-full border-t border-[#c4c7c7]/30 dark:border-[#262626]">
        {CATALOG_BRANDS.map((brand, index) => {
          const isActive = activeIndex === index;
          const img = BRAND_IMAGES[brand._id] || BRAND_IMAGES["brand-salvatori"];
          return (
            <div
              key={brand._id}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="border-b border-[#c4c7c7]/30 dark:border-[#262626] py-5 flex flex-col cursor-pointer text-left"
            >
              {/* Accordion Header */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <span className={`font-label-caps text-label-caps-sm transition-colors duration-300 ${
                    isActive ? "text-[#1c1b1b] dark:text-[#f4f0ef]" : "text-[#5d5f5f]/40 dark:text-[#8e8e8e]/40"
                  }`}>
                    0{index + 1}
                  </span>
                  <h3 className={`font-raleway text-body-lg uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? "text-[#1c1b1b] dark:text-[#f4f0ef] font-normal" : "text-[#5d5f5f]/60 dark:text-[#8e8e8e]/60 font-light"
                  }`}>
                    {brand.name}
                  </h3>
                </div>
                
                <ArrowRight 
                  className={`size-4 text-[#1c1b1b] dark:text-[#f4f0ef] transition-transform duration-300 ${
                    isActive ? "rotate-90 text-[#1c1b1b] dark:text-[#f4f0ef]" : "text-[#5d5f5f]/50 dark:text-[#8e8e8e]/50"
                  }`} 
                  strokeWidth={1.75}
                />
              </div>

              {/* Accordion Body */}
              <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                isActive 
                  ? 'grid-rows-[1fr] opacity-100 mt-4 visible' 
                  : 'grid-rows-[0fr] opacity-0 mt-0 invisible pointer-events-none'
              }`}>
                <div className="min-h-0 flex flex-col">
                  <Link
                    href={`/products?brand=${brand.slug}`}
                    className="relative w-full aspect-[16/10] bg-[#f1edec] dark:bg-[#1f1f1f] rounded-lg border border-[#c4c7c7]/40 dark:border-[#2e2e2e] overflow-hidden mb-2 block cursor-pointer"
                  >
                    <Image
                      alt={brand.name}
                      className="object-cover"
                      fill
                      sizes="90vw"
                      src={img}
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center z-10">
                      <span className="px-4 py-2.5 bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] font-label-caps text-label-caps uppercase rounded-md shadow-md flex items-center gap-1.5 border border-transparent dark:border-[#2e2e2e]">
                        Explore Collections
                        <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
