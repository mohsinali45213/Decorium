"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
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
    afterChange: (current: number) => {
      setActiveIndex(current);
    },
    beforeChange: () => {
      startTimer();
    },
  };

  const currentCategory = CATALOG_CATEGORIES[activeIndex];
  const nextCategory = CATALOG_CATEGORIES[(activeIndex + 1) % CATALOG_CATEGORIES.length];

  return (
    <section className="bg-[#fdf8f8] dark:bg-[#121212] py-showcase-py px-navbar-px max-w-[1440px] mx-auto border-t border-[#c4c7c7]/65 dark:border-[#262626] relative z-20 transition-colors duration-300">
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
        <div className="max-w-2xl text-left">
          <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
            Collections & Categories
          </span>
          <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
            Browse Catalog
          </h2>
        </div>

        {/* Custom Navigation */}
        <div className="flex gap-4 items-center self-start md:self-auto select-none">
          <Button
            variant="icon"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous slide"
            icon={ArrowLeft}
            className="size-11"
          />

          <span className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] min-w-[54px] text-center">
            0{activeIndex + 1} / 0{CATALOG_CATEGORIES.length}
          </span>

          <Button
            variant="icon"
            size="icon"
            onClick={handleNext}
            aria-label="Next slide"
            icon={ArrowRight}
            className="size-11"
          />
        </div>
      </div>

      {/* Desktop Slider View */}
      <div className="hidden md:block relative px-4 pb-12 min-h-[500px]">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left Column: Main Image & Next Preview */}
          <div className="col-span-6 relative">
            <div className="relative w-full aspect-[16/10] bg-[#f1edec] dark:bg-[#1f1f1f] rounded-lg border border-[#c4c7c7]/65 dark:border-[#2e2e2e]">
              <Image
                alt={currentCategory.name}
                className="object-cover rounded-lg"
                fill
                sizes="40vw"
                src={currentCategory.image}
              />

              {/* Next Slide Thumbnail */}
              <button
                onClick={handleNext}
                className="absolute -bottom-8 -right-8 z-20 w-[160px] h-[105px] rounded-md overflow-hidden border-[3px] border-[#fdf8f8] dark:border-[#121212] group/btn cursor-pointer bg-[#f1edec] dark:bg-[#1f1f1f] shadow-lg"
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

          {/* Right Column: Details */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="col-span-6 flex flex-col justify-center items-start text-left pl-8"
          >
            {/* Line 1: Index/slug */}
            <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] mb-4 block uppercase">
              0{activeIndex + 1} / {currentCategory.slug}
            </span>

            {/* Line 2: Name */}
            <h3 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] mb-5">
              {currentCategory.name}
            </h3>

            {/* Line 3: Description */}
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] mb-8 max-w-md">
              {currentCategory.description}
            </p>

            {/* Line 4: Explore link */}
            <div>
              <Link
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase hover:text-[#5d5f5f] dark:hover:text-[#a0a0a0] group relative"
                href="/products"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  Explore
                </span>
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="block md:hidden categories-slick-slider -mx-3">
        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {CATALOG_CATEGORIES.map((category, index) => (
            <div key={category.slug} className="px-3 py-1 flex w-full">
              <article className="group flex flex-col gap-5 bg-[#f7f3f2]/40 dark:bg-[#181818] p-5 rounded-xl border border-[#c4c7c7]/50 dark:border-[#262626] w-full min-h-[440px] justify-between text-left">
                <div className="flex flex-col gap-4">
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#c4c7c7]/50 dark:border-[#2e2e2e] bg-[#f1edec] dark:bg-[#1f1f1f]">
                    <Image
                      alt={category.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      src={category.image}
                    />
                  </div>

                  {/* Index and slug */}
                  <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase mt-1">
                    0{index + 1} / {category.slug}
                  </span>

                  {/* Name */}
                  <h3 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0] line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Explore button */}
                <div className="pt-4 border-t border-[#c4c7c7]/50 dark:border-[#262626]">
                  <Link
                    className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase hover:text-[#5d5f5f] dark:hover:text-[#a0a0a0] group"
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
