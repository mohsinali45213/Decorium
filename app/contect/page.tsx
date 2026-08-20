"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteFooter } from "@/components/SiteFooter";

export default function ContectPage() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9789392265007!2d77.6385157758369!3d12.973199487342371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf14b146e279f%3A0xc3191f6e1f0e4b85!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const mapDirectionsUrl = "https://maps.google.com/?q=Decorium+Studio+Indiranagar+Bengaluru";

  return (
    <main className="flex-grow w-full bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased relative pt-[110px] md:pt-[140px] transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (md and up)                                                */}
      {/* ========================================================================= */}
      <div className="hidden md:flex max-w-[1440px] mx-auto px-navbar-px pb-16 md:pb-24 flex-col gap-16 relative z-10">
        {/* Contact Intro Section */}
        <section className="flex flex-col gap-8 text-left">
          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
              CONTACT
            </span>
            <h1 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
              LET&apos;S TALK.
            </h1>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-2xl mt-4">
              Have a project in mind, need product information, or want to visit our showroom? Our team would be happy to help.
            </p>
          </div>
        </section>

        {/* GET IN TOUCH Section */}
        <section className="border-t border-[#c4c7c7]/65 dark:border-[#262626] pt-12 md:pt-16 text-left">
          <div className="mb-8">
            <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
              CONNECT WITH US
            </span>
            <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
              GET IN TOUCH
            </h2>
          </div>
          
          <div className="grid grid-cols-12 gap-10">
            {/* Left Side: Showroom Image Frame (6 columns) */}
            <div className="col-span-6 aspect-auto h-[380px] rounded-lg overflow-hidden border border-[#c4c7c7]/40 dark:border-[#2e2e2e] relative bg-[#f1edec] dark:bg-[#1f1f1f]">
              <Image 
                alt="High-end minimalist showroom interior" 
                className="object-cover" 
                fill
                sizes="40vw"
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" 
                priority
              />
            </div>
            
            {/* Right Side: Contact List (6 columns) */}
            <div className="col-span-6 flex flex-col justify-center py-2 pl-6">
              <div className="flex flex-col h-full border-t border-[#c4c7c7]/30 dark:border-[#262626]">
                
                {/* Phone Line Link */}
                <a 
                  href="tel:+919876543210" 
                  className="group border-b border-[#c4c7c7]/30 dark:border-[#262626] hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase">
                      Phone
                    </span>
                    <h3 className="font-raleway text-headline-md tracking-wider text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light">
                      +91 98765 43210
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* WhatsApp Line Link */}
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group border-b border-[#c4c7c7]/30 dark:border-[#262626] hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase">
                      WhatsApp
                    </span>
                    <h3 className="font-raleway text-headline-md tracking-wider text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light">
                      +91 98765 43210
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* Email Line Link */}
                <a 
                  href="mailto:hello@decorium.com" 
                  className="group border-b border-[#c4c7c7]/30 dark:border-[#262626] hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase">
                      Email
                    </span>
                    <h3 className="font-raleway text-headline-md tracking-wider text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-light break-all">
                      hello@decorium.com
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* Operating Hours Info */}
                <div className="mt-auto pt-6 px-4 text-left">
                  <p className="font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0] leading-relaxed">
                    Our concierge team is available Monday through Friday, 9am — 6pm IST.
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* SHOWROOM Section */}
        <section className="flex flex-col gap-8 border-t border-[#c4c7c7]/65 dark:border-[#262626] pt-12 md:pt-16 text-left">
          <div>
            <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
              VISIT US
            </span>
            <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
              OUR SHOWROOM
            </h2>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-2xl mt-4">
              Experience our full collection of natural stones, large porcelain slabs, and fixtures in person.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-lg overflow-hidden border border-[#c4c7c7]/40 dark:border-[#2e2e2e] relative bg-[#f1edec] dark:bg-[#1f1f1f] h-[300px] md:h-[450px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="flex justify-between items-end gap-6 flex-wrap mt-4">
              <Button
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={Compass}
                iconPosition="right"
                className="tracking-widest"
              >
                GET DIRECTIONS
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (under md)                                                  */}
      {/* ========================================================================= */}
      <div className="block md:hidden flex flex-col bg-[#fdf8f8] dark:bg-[#121212] w-full transition-colors duration-300">
        {/* Editorial Header */}
        <section className="px-navbar-px pb-8 border-b border-[#c4c7c7]/30 dark:border-[#262626] text-left">
          <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
            CONTACT
          </span>
          <h1 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] mb-4">
            LET&apos;S TALK
          </h1>
          <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-sm mt-4">
            Whether you&apos;re inquiring about a specific piece, discussing a bespoke commission, or exploring interior styling services, our team is ready to assist you.
          </p>
        </section>

        {/* Get In Touch Section */}
        <section className="border-b border-[#c4c7c7]/30 dark:border-[#262626]">
          <div className="w-full aspect-[16/10] relative bg-[#f1edec] dark:bg-[#1f1f1f]">
            <Image 
              alt="High-end minimalist showroom interior" 
              className="object-cover grayscale opacity-90 mix-blend-multiply dark:mix-blend-normal" 
              fill
              sizes="100vw"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" 
            />
          </div>
          <div className="px-navbar-px py-6 text-left">
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
              CONNECT WITH US
            </span>
            <h2 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] mb-4">
              GET IN TOUCH
            </h2>
            <ul className="flex flex-col mt-2">
              {/* Phone */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30 dark:border-[#262626] first:pt-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-label-caps text-label-caps-sm text-[#1c1b1b] dark:text-[#f4f0ef] uppercase">PHONE</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f] dark:text-[#8e8e8e]" strokeWidth={1.5} />
                </div>
                <a className="font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] transition-colors" href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </li>

              {/* WhatsApp */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30 dark:border-[#262626]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-label-caps text-label-caps-sm text-[#1c1b1b] dark:text-[#f4f0ef] uppercase">WHATSAPP</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f] dark:text-[#8e8e8e]" strokeWidth={1.5} />
                </div>
                <a className="font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] transition-colors" href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  Message Us
                </a>
              </li>

              {/* Email */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30 dark:border-[#262626] last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-label-caps text-label-caps-sm text-[#1c1b1b] dark:text-[#f4f0ef] uppercase">EMAIL</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f] dark:text-[#8e8e8e]" strokeWidth={1.5} />
                </div>
                <a className="font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] transition-colors break-all" href="mailto:hello@decorium.com">
                  hello@decorium.com
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="px-navbar-px py-16 text-left">
          <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-3">
            VISIT OUR SHOWROOM
          </span>
          <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] mb-8">
            VISIT US
          </h2>
          
          <div className="w-full aspect-square mb-8 rounded overflow-hidden border border-[#c4c7c7]/40 dark:border-[#2e2e2e] relative bg-[#f1edec] dark:bg-[#1f1f1f] h-[300px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <Button
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            icon={Compass}
            iconPosition="right"
            className="w-full tracking-widest"
          >
            GET DIRECTIONS
          </Button>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
