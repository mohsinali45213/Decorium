"use client";

import { useState } from "react";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface HeroSlide {
  number: string;
  title: string;
  description: string;
  image: any;
  linkHref?: string;
  linkLabel?: string;
}

interface HeroProps {
  slides: HeroSlide[];
}

export function Hero({ slides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isSlider = slides.length > 1;

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

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section suppressHydrationWarning className="relative w-full h-[75dvh] min-h-[500px] md:h-[92dvh] md:min-h-[700px] flex items-end justify-center md:justify-end overflow-hidden px-navbar-px py-navbar-px text-left">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full z-0 hero-slick-slider">
        {isSlider ? (
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
                <div className="absolute inset-0 bg-[#fdf8f8]/10 dark:bg-black/30" />
                {/* Gradient Overlay for Mobile readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f8]/80 dark:from-[#121212]/80 via-transparent to-transparent md:hidden" />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="relative w-full h-full">
            <Image
              alt={activeSlide.title}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={activeSlide.image}
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#fdf8f8]/10 dark:bg-black/30" />
            {/* Gradient Overlay for Mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f8]/80 dark:from-[#121212]/80 via-transparent to-transparent md:hidden" />
          </div>
        )}
      </div>

      {/* Floating Card */}
      <div className="relative z-10 w-full md:w-[480px] bg-[#f7f3f2] dark:bg-[#121212] p-[clamp(24px,calc((48/1920)*100vw),48px)] rounded-lg border border-[#c4c7c7]/20 dark:border-[#262626] shadow-sm flex flex-col gap-4 md:gap-6 min-h-[320px] justify-between transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-4 md:gap-6 flex-1 justify-between text-left"
          >
            <div>
              {/* Slide Counter */}
              <div className="flex items-center justify-between md:block mb-4">
                <div className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase">
                  {activeSlide.number} <span className="mx-2 text-[#c4c7c7] dark:text-[#444444]">/</span> {slides.length < 10 ? `0${slides.length}` : slides.length}
                </div>
                <div className="h-px bg-[#c4c7c7]/30 dark:bg-[#2e2e2e] flex-1 ml-4 md:hidden"></div>
              </div>

              {/* Headline */}
              <h1 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase md:normal-case tracking-tight mb-2 md:mb-4">
                {activeSlide.title}
              </h1>

              {/* Description */}
              <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-sm">
                {activeSlide.description}
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-2 md:mt-4">
              <Link
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase hover:text-[#5d5f5f] dark:hover:text-[#a0a0a0] transition-colors group relative"
                href={activeSlide.linkHref || "/products"}
              >
                <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  {activeSlide.linkLabel || "Explore"}
                </span>
                <ArrowRight className="size-4 shrink-0" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
