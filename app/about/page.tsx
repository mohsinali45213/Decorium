import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero, HeroSlide } from "@/components/Hero";

const aboutSlides: HeroSlide[] = [
  {
    number: "01",
    title: "SPACES WITH CHARACTER",
    description: "We curate architectural surfaces and bespoke details, shaping spaces with quiet luxury and enduring craftsmanship.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
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
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">01 / Curation</span>
            <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wider mb-3 font-normal">Quality Over Quantity</h3>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
              We curate collections that prioritize enduring materials and timeless forms, rejecting the transient in favor of the permanent.
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col text-left transition-all duration-500 group-hover/container:opacity-40 hover:!opacity-100 hover:-translate-y-1 cursor-default">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">02 / Execution</span>
            <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wider mb-3 font-normal">Craft as Anchor</h3>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
              Every detail, from the invisible joinery to the hand-finished surfaces, speaks to a dedication to master craftsmanship.
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col text-left transition-all duration-500 group-hover/container:opacity-40 hover:!opacity-100 hover:-translate-y-1 cursor-default">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-3 block">03 / Form</span>
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
        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 w-full h-auto md:h-[500px]">
          {/* Category 1 */}
          <Link href="/products" className="group relative rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] transition-all duration-500 h-[200px] md:h-full md:flex-1 md:hover:flex-[2.5]">
            <Image
              alt="Furniture Category"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-20 text-white text-left flex flex-col gap-1">
              <span className="font-label-caps text-[8px] md:text-[9px] text-white/70 uppercase tracking-widest">01 / Category</span>
              <div className="flex items-center gap-2">
                <h3 className="font-raleway text-body-lg md:text-headline-md font-light uppercase tracking-wide text-white">Furniture</h3>
                <ArrowRight className="size-3.5 md:size-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
              </div>
            </div>
          </Link>

          {/* Category 2 */}
          <Link href="/products" className="group relative rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] transition-all duration-500 h-[200px] md:h-full md:flex-1 md:hover:flex-[2.5]">
            <Image
              alt="Lighting Category"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-20 text-white text-left flex flex-col gap-1">
              <span className="font-label-caps text-[8px] md:text-[9px] text-white/70 uppercase tracking-widest">02 / Category</span>
              <div className="flex items-center gap-2">
                <h3 className="font-raleway text-body-lg md:text-headline-md font-light uppercase tracking-wide text-white">Lighting</h3>
                <ArrowRight className="size-3.5 md:size-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
              </div>
            </div>
          </Link>

          {/* Category 3 */}
          <Link href="/products" className="group relative rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] transition-all duration-500 h-[200px] md:h-full md:flex-1 md:hover:flex-[2.5]">
            <Image
              alt="Surfaces Category"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-20 text-white text-left flex flex-col gap-1">
              <span className="font-label-caps text-[8px] md:text-[9px] text-white/70 uppercase tracking-widest">03 / Category</span>
              <div className="flex items-center gap-2">
                <h3 className="font-raleway text-body-lg md:text-headline-md font-light uppercase tracking-wide text-white">Surfaces</h3>
                <ArrowRight className="size-3.5 md:size-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
              </div>
            </div>
          </Link>

          {/* Category 4 */}
          <Link href="/products" className="group relative rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] transition-all duration-500 h-[200px] md:h-full md:flex-1 md:hover:flex-[2.5]">
            <Image
              alt="Objects Category"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 z-20 text-white text-left flex flex-col gap-1">
              <span className="font-label-caps text-[8px] md:text-[9px] text-white/70 uppercase tracking-widest">04 / Category</span>
              <div className="flex items-center gap-2">
                <h3 className="font-raleway text-body-lg md:text-headline-md font-light uppercase tracking-wide text-white">Objects</h3>
                <ArrowRight className="size-3.5 md:size-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
              </div>
            </div>
          </Link>
        </div>

        {/* Contact Us button inside the section */}
        <div className="mt-16 flex justify-center w-full">
          <Link
            className="inline-block bg-transparent border border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] font-label-caps text-label-caps px-8 py-4 rounded-md hover:bg-[#1c1b1b] dark:hover:bg-[#f4f0ef] hover:text-white dark:hover:text-[#121212] transition-colors uppercase tracking-widest text-center"
            href="/contect"
          >
            CONTACT US
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
