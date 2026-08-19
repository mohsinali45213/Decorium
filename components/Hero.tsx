"use client";

import { useState } from "react";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import customBg from "@/stitch_decorium_editorial_navbar/decorium_floating_hero_variant_b/hero-bg-custom.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    number: "01",
    title: "Timeless Elegance",
    description: "Curated spaces designed with precision. Embrace the luxury of intentional minimalism and architectural grace.",
    image: customBg,
  },
  {
    number: "02",
    title: "Natural Marble Slabs",
    description: "Direct quarry-imported natural blocks and bookmatched slabs from Carrara and Tuscany, curated for seamless statements.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
  },
  {
    number: "03",
    title: "Monolithic Precision",
    description: "Ultra-large 3200×1600mm monolithic porcelain surfaces engineered with continuous veining and zero-joint precision.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1920&q=85",
  },
  {
    number: "04",
    title: "Sculpted Details",
    description: "Freestanding baths, sculpted stone basins, and tapware in brushed champagne, creating textured tactile warmth.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=85",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <section className="relative w-full h-[75dvh] min-h-[500px] md:h-[92dvh] md:min-h-[700px] flex items-end justify-center md:justify-end overflow-hidden px-[clamp(24px,calc((64/1920)*100vw),64px)] py-[clamp(24px,calc((64/1920)*100vw),64px)]">
      <style dangerouslySetInnerHTML={{__html: `
        .hero-slick-slider .slick-slider,
        .hero-slick-slider .slick-list,
        .hero-slick-slider .slick-track,
        .hero-slick-slider .slick-slide,
        .hero-slick-slider .slick-slide > div {
          height: 100% !important;
        }
      `}} />

      {/* Background Images Slider */}
      <div className="absolute inset-0 w-full h-full z-0 hero-slick-slider">
        <Slider {...settings} className="h-full w-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-[75dvh] min-h-[500px] md:h-[92dvh] md:min-h-[700px]">
              <Image
                alt={slide.title}
                className="object-cover"
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.image}
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-[#fdf8f8]/10" />
              {/* Gradient Overlay for Mobile readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f8]/80 via-transparent to-transparent md:hidden" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Floating Card */}
      <div className="relative z-10 w-full md:w-[480px] bg-[#f7f3f2]/90 backdrop-blur-md p-[clamp(24px,calc((48/1920)*100vw),48px)] rounded-lg border border-[#c4c7c7]/20 shadow-sm flex flex-col gap-4 md:gap-6 min-h-[320px] justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-4 md:gap-6 flex-1 justify-between"
          >
            <div>
              {/* Slide Counter */}
              <div className="flex items-center justify-between md:block mb-4">
                <div className="text-[12px] font-semibold text-[#5d5f5f] tracking-widest uppercase font-hanken-grotesk">
                  {slides[currentSlide].number} <span className="mx-2 text-[#c4c7c7]">/</span> 04
                </div>
                <div className="h-px bg-[#c4c7c7]/30 flex-1 ml-4 md:hidden"></div>
              </div>

              {/* Headline */}
              <h1 className="font-raleway text-[clamp(28px,calc((48/1920)*100vw),48px)] leading-[clamp(34px,calc((56/1920)*100vw),56px)] text-[#1c1b1b] font-normal uppercase md:normal-case tracking-tight mb-2 md:mb-4">
                {slides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="text-[clamp(14px,calc((18/1920)*100vw),18px)] leading-[clamp(22px,calc((32/1920)*100vw),32px)] text-[#5d5f5f] max-w-sm font-hanken-grotesk">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-2 md:mt-4 pt-4 md:pt-0 border-t border-[#e2e2e2] md:border-0">
              <Link
                className="inline-flex items-center gap-2 text-[clamp(12px,calc((14/1920)*100vw),14px)] font-semibold text-[#1c1b1b] uppercase tracking-widest hover:text-[#5d5f5f] transition-colors group font-hanken-grotesk"
                href="/products"
              >
                <span>Explore</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
