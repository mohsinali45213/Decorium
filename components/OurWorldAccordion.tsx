"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "01",
    tag: "01 / CURATION",
    title: "Furniture",
    subtitle: "Sculptural living & dining",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    href: "/products",
  },
  {
    id: "02",
    tag: "02 / ILLUMINATION",
    title: "Lighting",
    subtitle: "Architectural pendants & sconces",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
    href: "/products",
  },
  {
    id: "03",
    tag: "03 / SURFACES",
    title: "Surfaces",
    subtitle: "Quarried marble & slabs",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    href: "/products",
  },
  {
    id: "04",
    tag: "04 / ARTIFACTS",
    title: "Objects",
    subtitle: "Tactile stone & brass accents",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=85",
    href: "/products",
  },
];

export function OurWorldAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full h-auto md:h-[500px]">
      {CATEGORIES.map((category, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <motion.div
            key={category.id}
            layout
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{
              flex: isHovered ? 2.8 : isAnyHovered ? 0.9 : 1.2,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
              mass: 0.8,
            }}
            className="relative h-[220px] md:h-full rounded-xl overflow-hidden border border-[#c4c7c7]/40 dark:border-[#262626] bg-[#1a1a1a] cursor-pointer group select-none"
          >
            <Link href={category.href} className="block w-full h-full relative">
              {/* Background Image */}
              <Image
                alt={category.title}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={category.image}
                priority={index < 2}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 transition-opacity duration-500" />

              {/* Top Discipline Tag */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 font-label-caps text-[9px] text-white tracking-widest uppercase inline-block">
                  {category.tag}
                </span>
              </div>

              {/* Bottom Content Bar */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between gap-3 text-white">
                <div className="min-w-0 flex-1 overflow-hidden pr-2">
                  <h3 className="font-raleway text-headline-md font-light uppercase tracking-wide text-white whitespace-nowrap drop-shadow-sm">
                    {category.title}
                  </h3>
                  <p className="font-body-sm text-xs text-white/80 whitespace-nowrap mt-1 drop-shadow-sm transition-opacity duration-300">
                    {category.subtitle}
                  </p>
                </div>

                <div className="size-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0">
                  <ArrowRight className="size-4 text-white" strokeWidth={1.75} />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
