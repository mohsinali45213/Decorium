import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export default function AboutPage() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9789392265007!2d77.6385157758369!3d12.973199487342371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf14b146e279f%3A0xc3191f6e1f0e4b85!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const mapDirectionsUrl = "https://maps.google.com/?q=Decorium+Studio+Indiranagar+Bengaluru";

  return (
    <main className="flex-grow w-full bg-background text-on-surface antialiased relative pt-[110px] md:pt-[140px]">
      
      {/* Container wrapper */}
      <div className="max-w-[1440px] mx-auto px-navbar-px pb-16 md:pb-24 flex flex-col gap-20 md:gap-32 relative z-10">
        
        {/* Asymmetrical Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          {/* Hero text (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase tracking-widest block mb-4">
              OUR PHILOSOPHY
            </span>
            <h1 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase font-light tracking-wide leading-[1.1] mb-6">
              WE CREATE SPACES WITH <br className="hidden md:inline" />ARCHITECTURAL CHARACTER.
            </h1>
            <p className="font-body-lg text-body-lg text-[#5d5f5f] max-w-2xl font-light leading-relaxed">
              We believe that the objects we surround ourselves with shape our daily experience. Our approach is rooted in an appreciation for quiet luxury, where every piece is chosen for its sculptural integrity, natural authenticity, and enduring appeal.
            </p>
          </div>
          
          {/* Vertical Details Image (5 columns) */}
          <div className="lg:col-span-5 w-full aspect-[4/5] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 shadow-xs">
            <Image
              alt="Organic sculpted ceramic details inside a minimalist space"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=85"
              priority
            />
          </div>

          {/* Full-width Panoramic Editorial Banner */}
          <div className="lg:col-span-12 w-full aspect-[16/10] md:aspect-[21/9] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 mt-6">
            <Image
              alt="Meticulously curated modern residential living space with cream bouclé sofa"
              className="object-cover grayscale-[10%]"
              fill
              sizes="100vw"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
            />
          </div>
        </section>

        {/* Refined What We Believe Section */}
        <section className="border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div className="mb-12">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase tracking-widest block mb-3">
              CORE PRINCIPLES
            </span>
            <h2 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase font-light tracking-wide">
              WHAT WE BELIEVE
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            <div className="flex flex-col gap-5 border-l border-[#c4c7c7]/40 pl-6">
              <span className="font-raleway text-headline-lg text-[#c4c7c7]/40 font-light leading-none">01</span>
              <h3 className="font-raleway text-body-lg font-normal text-[#1c1b1b] uppercase tracking-wide">Quality Over Quantity</h3>
              <p className="font-body-md text-body-md text-[#5d5f5f] leading-relaxed">
                We curate collections that prioritize enduring materials and timeless forms, rejecting the transient in favor of the permanent.
              </p>
            </div>
            <div className="flex flex-col gap-5 border-l border-[#c4c7c7]/40 pl-6">
              <span className="font-raleway text-headline-lg text-[#c4c7c7]/40 font-light leading-none">02</span>
              <h3 className="font-raleway text-body-lg font-normal text-[#1c1b1b] uppercase tracking-wide">Craft as Anchor</h3>
              <p className="font-body-md text-body-md text-[#5d5f5f] leading-relaxed">
                Every detail, from the invisible joinery to the hand-finished surfaces, speaks to a dedication to master craftsmanship.
              </p>
            </div>
            <div className="flex flex-col gap-5 border-l border-[#c4c7c7]/40 pl-6">
              <span className="font-raleway text-headline-lg text-[#c4c7c7]/40 font-light leading-none">03</span>
              <h3 className="font-raleway text-body-lg font-normal text-[#1c1b1b] uppercase tracking-wide">Simplicity in Form</h3>
              <p className="font-body-md text-body-md text-[#5d5f5f] leading-relaxed">
                True elegance is found in restraint. We strip away the unnecessary to reveal the essential beauty of structure.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Categories Showcase (Replaced simple list with a gorgeous grid) */}
        <section className="border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div className="mb-12">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase tracking-widest block mb-3">
              PRODUCT INDEX
            </span>
            <h2 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase font-light tracking-wide">
              OUR WORLD
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category 1 */}
            <Link href="/products" className="group flex flex-col">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 mb-4">
                <Image
                  alt="Minimalist design wooden chair"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=85"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-raleway text-body-lg font-light tracking-wide text-[#1c1b1b] uppercase">Furniture</span>
                <ArrowRight className="size-4 text-[#5d5f5f] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </div>
              <span className="font-label-caps text-[9px] text-[#5d5f5f] uppercase mt-1">01 / Index</span>
            </Link>

            {/* Category 2 */}
            <Link href="/products" className="group flex flex-col">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 mb-4">
                <Image
                  alt="Modern minimalist lighting fixtures"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=85"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-raleway text-body-lg font-light tracking-wide text-[#1c1b1b] uppercase">Lighting</span>
                <ArrowRight className="size-4 text-[#5d5f5f] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </div>
              <span className="font-label-caps text-[9px] text-[#5d5f5f] uppercase mt-1">02 / Index</span>
            </Link>

            {/* Category 3 */}
            <Link href="/products" className="group flex flex-col">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 mb-4">
                <Image
                  alt="Premium natural stone marble slab details"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=85"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-raleway text-body-lg font-light tracking-wide text-[#1c1b1b] uppercase">Surfaces</span>
                <ArrowRight className="size-4 text-[#5d5f5f] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </div>
              <span className="font-label-caps text-[9px] text-[#5d5f5f] uppercase mt-1">03 / Index</span>
            </Link>

            {/* Category 4 */}
            <Link href="/products" className="group flex flex-col">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg bg-[#f1edec] border border-[#c4c7c7]/30 mb-4">
                <Image
                  alt="Curated minimal sculptural objects and vases"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=85"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-raleway text-body-lg font-light tracking-wide text-[#1c1b1b] uppercase">Objects</span>
                <ArrowRight className="size-4 text-[#5d5f5f] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </div>
              <span className="font-label-caps text-[9px] text-[#5d5f5f] uppercase mt-1">04 / Index</span>
            </Link>
          </div>
        </section>

        {/* Materials Highlight Section (Landscape Split Layout) */}
        <section className="border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
              <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase block">
                THE FOUNDATION
              </span>
              <h2 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase font-light tracking-wide">
                TACTILE MATERIALS
              </h2>
              <p className="font-body-md text-body-md text-[#5d5f5f] leading-relaxed">
                The physical presence of a space is defined by its materials. We source rare marbles, sustainably harvested woods, textured plasters, and patinated metals to create environments that age with grace and dignity.
              </p>
              <div className="pt-4">
                <Link
                  className="inline-block font-label-caps text-label-caps text-[#1c1b1b] border-b border-[#1c1b1b] pb-1 hover:text-[#5d5f5f] hover:border-[#5d5f5f] transition-colors uppercase tracking-widest"
                  href="/products"
                >
                  Explore Index
                </Link>
              </div>
            </div>

            {/* Right Image (6 cols) */}
            <div className="lg:col-span-6 aspect-[16/11] relative overflow-hidden rounded-lg border border-[#c4c7c7]/30 bg-[#f1edec] order-1 lg:order-2">
              <Image
                alt="Architectural details of natural stone texture surfaces"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85"
              />
            </div>
          </div>
        </section>

        {/* Flagship Showroom & Studio Map Section */}
        <section className="border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-6">
              <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase block mb-3">
                EXPERIENCE
              </span>
              <h2 className="font-raleway text-headline-lg text-[#1c1b1b] uppercase font-light tracking-wide">
                VISIT THE SHOWROOM
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pt-8">
              <p className="font-body-md text-body-md text-[#5d5f5f] leading-relaxed">
                Immerse yourself in our curated environments. Visit our flagship Indiranagar studio to experience the scale, texture, and presence of our full collection of natural stones, large porcelain slabs, and fixtures firsthand.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Embedded desaturated Map Frame */}
            <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-lg overflow-hidden border border-[#c4c7c7]/40 relative bg-[#f1edec] h-[300px] md:h-[400px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(90%) opacity(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="flex justify-between items-center flex-wrap gap-6 mt-4">
              <a 
                href={mapDirectionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-[#1c1b1b] px-8 py-3.5 font-label-caps text-label-caps text-[#1c1b1b] uppercase hover:bg-[#1c1b1b] hover:text-[#fdf8f8] transition-all duration-300 rounded-md"
              >
                <span>GET DIRECTIONS</span>
                <Compass className="size-4" strokeWidth={1.75} />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border-l border-[#c4c7c7]/40 pl-6">
                <div>
                  <h3 className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase mb-1">ADDRESS</h3>
                  <p className="font-body-sm text-body-sm text-[#5d5f5f] leading-relaxed">
                    Decorium Studio<br />
                    12th Main Road, Indiranagar<br />
                    Bengaluru, Karnataka 560038
                  </p>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase mb-1">HOURS</h3>
                  <p className="font-body-sm text-body-sm text-[#5d5f5f] leading-relaxed">
                    Monday - Saturday<br />
                    10:00 AM - 7:00 PM<br />
                    Sunday by appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <SiteFooter />
    </main>
  );
}
