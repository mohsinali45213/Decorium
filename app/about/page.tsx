"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OurWorldAccordion } from "@/components/OurWorldAccordion";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero, HeroSlide } from "@/components/Hero";

const aboutSlides: HeroSlide[] = [
  {
    number: "01",
    title: "SPACES WITH CHARACTER",
    description: "We curate architectural surfaces and bespoke details, shaping spaces with quiet luxury and enduring craftsmanship.",
    desktopImage: "/images/desktop/pexels-artbovich-7166636.jpg",
    mobileImage: "/images/mobile/pexels-ahmetcotur-29702287.jpg",
    linkHref: "/contect",
    linkLabel: "Contact Us"
  }
];

export default function AboutPage() {
  return (
    <main className="flex-grow w-full bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased relative transition-colors duration-300">
      
      {/* Reusable Hero component (Full bleed) */}
      <Hero slides={aboutSlides} />



      {/* What We Believe Section */}
      <section className="bg-[#fdf8f8] dark:bg-[#121212] py-16 md:py-24 px-navbar-px max-w-[1440px] mx-auto border-t border-[#c4c7c7]/65 dark:border-[#262626] relative z-20 text-left transition-colors duration-300">
        <div className="mb-12">
          <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest block mb-3">
            CORE PRINCIPLES
          </span>
          <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light tracking-wide">
            WHAT WE BELIEVE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 group/container">
          {/* Column 1 */}
          <div className="flex flex-col text-left transition-all duration-500 group-hover/container:opacity-40 hover:!opacity-100 hover:-translate-y-1 cursor-default">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">Curation</span>
            <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wider mb-3 font-normal">Quality Over Quantity</h3>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
              We curate collections that prioritize enduring materials and timeless forms, rejecting the transient in favor of the permanent.
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col text-left transition-all duration-500 group-hover/container:opacity-40 hover:!opacity-100 hover:-translate-y-1 cursor-default">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">Execution</span>
            <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wider mb-3 font-normal">Craft as Anchor</h3>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
              Every detail, from the invisible joinery to the hand-finished surfaces, speaks to a dedication to master craftsmanship.
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col text-left transition-all duration-500 group-hover/container:opacity-40 hover:!opacity-100 hover:-translate-y-1 cursor-default">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">Form</span>
            <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wider mb-3 font-normal">Simplicity in Form</h3>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
              True elegance is found in restraint. We strip away the unnecessary to reveal the essential beauty of structure.
            </p>
          </div>
        </div>
      </section>

      {/* Product Index / Our World Section */}
      <section className="bg-[#fdf8f8] dark:bg-[#121212] py-16 md:py-24 px-navbar-px max-w-[1440px] mx-auto border-t border-[#c4c7c7]/65 dark:border-[#262626] relative z-20 text-left transition-colors duration-300">
        <div className="mb-12">
          <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest block mb-3">
            PRODUCT INDEX
          </span>
          <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light tracking-wide">
            OUR WORLD
          </h2>
        </div>

        {/* Smooth Accordion Component */}
        <OurWorldAccordion />

        {/* Contact Us button inside the section */}
        <div className="mt-16 flex justify-center w-full">
          <Button
            href="/contect"
            variant="outline"
            size="lg"
            className="tracking-widest"
          >
            CONTACT US
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
