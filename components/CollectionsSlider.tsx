"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATALOG_CATEGORIES } from "@/lib/catalogData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CollectionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileSliderRef = useRef<Slider>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (mobileSliderRef.current) {
        mobileSliderRef.current.slickNext();
      } else {
        setActiveIndex((prev) => (prev + 1) % CATALOG_CATEGORIES.length);
      }
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  // Manual navigation resets the timer so it never fires
  // right on top of a click-triggered transition.
  const handleNext = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.slickNext();
    } else {
      setActiveIndex((prev) => (prev + 1) % CATALOG_CATEGORIES.length);
    }
    startTimer();
  };

  const handlePrev = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.slickPrev();
    } else {
      setActiveIndex((prev) => (prev - 1 + CATALOG_CATEGORIES.length) % CATALOG_CATEGORIES.length);
    }
    startTimer();
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    swipe: true,
    // Keep React state in sync with Slick's ACTUAL position,
    // whether it got there via swipe, slickGoTo, or anything else.
    afterChange: (current: number) => {
      setActiveIndex(current);
    },
    // Reset the timer if the user swipes manually too.
    beforeChange: () => {
      startTimer();
    },
  };

  const currentCategory = CATALOG_CATEGORIES[activeIndex];
  const nextCategory = CATALOG_CATEGORIES[(activeIndex + 1) % CATALOG_CATEGORIES.length];

  return (
    <section className="bg-[#fdf8f8] py-showcase-py px-navbar-px max-w-[1440px] mx-auto border-t border-[#c4c7c7]/65 relative z-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .categories-slick-slider .slick-track {
          display: flex !important;
        }
        .categories-slick-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .categories-slick-slider .slick-slide > div {
          width: 100% !important;
          display: flex !important;
        }
      `,
        }}
      />

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-10 gap-6">
        <div className="max-w-2xl">
          <span className="font-label-caps text-label-caps text-[#5d5f5f] uppercase block mb-3">
            Collections & Categories
          </span>
          <h2 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase tracking-wide">
            Browse Catalog
          </h2>
        </div>

        {/* Custom Navigation */}
        <div className="flex gap-4 items-center self-start md:self-auto select-none">
          <button
            onClick={handlePrev}
            className="flex size-11 items-center justify-center rounded-full border border-[#8a8d8d] text-[#1c1b1b] hover:bg-[#1c1b1b] hover:text-[#fdf8f8] hover:border-[#1c1b1b] cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>

          <span className="font-label-caps text-label-caps text-[#1c1b1b] min-w-[54px] text-center">
            0{activeIndex + 1} / 0{CATALOG_CATEGORIES.length}
          </span>

          <button
            onClick={handleNext}
            className="flex size-11 items-center justify-center rounded-full border border-[#8a8d8d] text-[#1c1b1b] hover:bg-[#1c1b1b] hover:text-[#fdf8f8] hover:border-[#1c1b1b] cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Desktop Slider View (Hidden on Mobile - Pure Static Instant Swap Layout) */}
      <div className="hidden md:block relative px-4 pb-12 min-h-[500px]">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left Column: Main Image & Next Preview */}
          <div className="col-span-6 relative">
            <div className="relative w-full aspect-[16/10] bg-[#f1edec] rounded-lg border border-[#c4c7c7]/65">
              <Image
                alt={currentCategory.name}
                className="object-cover rounded-lg"
                fill
                sizes="40vw"
                src={currentCategory.image}
              />

              {/* Next Slide Thumbnail (Overlaps the bottom-right border - Larger Size) */}
              <button
                onClick={handleNext}
                className="absolute -bottom-8 -right-8 z-20 w-[160px] h-[105px] rounded-md overflow-hidden border-[3px] border-[#fdf8f8] group/btn cursor-pointer bg-[#f1edec]"
                title="Next Category"
              >
                <Image
                  alt={`Next: ${nextCategory.name}`}
                  className="object-cover"
                  fill
                  sizes="160px"
                  src={nextCategory.image}
                />
                <div className="absolute inset-0 bg-black/10 group-hover/btn:bg-black/0 transition-colors z-10" />
              </button>
            </div>
          </div>

          {/* Right Column: Details (Unified Slide Up & Fade Transition) */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="col-span-6 flex flex-col justify-center items-start text-left pl-8"
          >
            {/* Line 1: Index/slug */}
            <span className="font-label-caps text-label-caps text-[#5d5f5f] mb-4 block uppercase">
              0{activeIndex + 1} / {currentCategory.slug}
            </span>

            {/* Line 2: Name */}
            <h3 className="font-raleway text-headline-md text-[#1c1b1b] mb-5">
              {currentCategory.name}
            </h3>

            {/* Line 3: Description */}
            <p className="font-body-md text-body-md text-[#5d5f5f] mb-8 max-w-md">
              {currentCategory.description}
            </p>

            {/* Line 4: Explore link */}
            <div>
              <Link
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] uppercase hover:text-[#5d5f5f] group relative"
                href="/products"
              >
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  Explore
                </span>
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile/Tablet Slider (Visible on Mobile/Tablet) */}
      <div className="block md:hidden categories-slick-slider -mx-3">
        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {CATALOG_CATEGORIES.map((category, index) => (
            <div key={category.slug} className="px-3 py-1 flex w-full">
              <article className="group flex flex-col gap-5 bg-[#f7f3f2]/40 p-5 rounded-xl border border-[#c4c7c7]/50 w-full min-h-[440px] justify-between">
                <div className="flex flex-col gap-4">
                  {/* Category Image - Reduced size with 4/3 aspect ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#c4c7c7]/50 bg-[#f1edec]">
                    <Image
                      alt={category.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      src={category.image}
                    />
                  </div>

                  {/* Index and slug */}
                  <span className="font-label-caps text-label-caps text-[#5d5f5f] block uppercase mt-1">
                    0{index + 1} / {category.slug}
                  </span>

                  {/* Name */}
                  <h3 className="font-raleway text-headline-md text-[#1c1b1b] group-hover:text-black">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="font-body-sm text-body-sm text-[#5d5f5f] line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Explore button */}
                <div className="pt-4 border-t border-[#c4c7c7]/50">
                  <Link
                    className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] uppercase hover:text-[#5d5f5f] group"
                    href="/products"
                  >
                    <span>Explore</span>
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
