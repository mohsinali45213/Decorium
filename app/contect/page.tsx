import Image from "next/image";
import { ArrowUpRight, ArrowRight, Compass } from "lucide-react";

export default function ContectPage() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9789392265007!2d77.6385157758369!3d12.973199487342371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf14b146e279f%3A0xc3191f6e1f0e4b85!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const mapDirectionsUrl = "https://maps.google.com/?q=Decorium+Studio+Indiranagar+Bengaluru";

  return (
    <main className="flex-grow w-full bg-background text-on-surface antialiased relative pt-[110px] md:pt-[140px]">
      
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (md and up)                                                */}
      {/* ========================================================================= */}
      <div className="hidden md:flex max-w-[1440px] mx-auto px-navbar-px pb-16 md:pb-24 flex-col gap-16 relative z-10">
        {/* Contact Intro Section */}
        <section className="flex flex-col gap-8 text-left">
          <div className="max-w-3xl">
            <span className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-3">
              CONTACT
            </span>
            <h1 className="font-raleway text-[clamp(32px,calc((48/1920)*100vw),48px)] leading-[clamp(38px,calc((56/1920)*100vw),56px)] text-[#1c1b1b] uppercase font-light tracking-wide">
              LET&apos;S TALK.
            </h1>
            <p className="font-hanken-grotesk text-[15px] leading-[26px] text-[#5d5f5f] max-w-2xl mt-4">
              Have a project in mind, need product information, or want to visit our showroom? Our team would be happy to help.
            </p>
          </div>
        </section>

        {/* GET IN TOUCH Section */}
        <section className="border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div className="mb-8">
            <span className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-3">
              CONNECT WITH US
            </span>
            <h2 className="font-raleway text-[clamp(32px,calc((48/1920)*100vw),48px)] leading-[clamp(38px,calc((56/1920)*100vw),56px)] text-[#1c1b1b] uppercase font-light tracking-wide">
              GET IN TOUCH
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Side: Showroom Image Frame (6 columns) */}
            <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:h-[380px] rounded-lg overflow-hidden border border-[#c4c7c7]/40 relative bg-[#f1edec]">
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
            <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:pl-6">
              <div className="flex flex-col h-full border-t border-[#c4c7c7]/30">
                
                {/* Phone Line Link */}
                <a 
                  href="tel:+919876543210" 
                  className="group border-b border-[#c4c7c7]/30 hover:border-[#1c1b1b] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.25em] text-[#5d5f5f] uppercase">
                      Phone
                    </span>
                    <h3 className="font-raleway text-[clamp(20px,calc((26/1920)*100vw),26px)] leading-tight font-light tracking-widest text-[#1c1b1b] uppercase">
                      +91 98765 43210
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] group-hover:text-[#1c1b1b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* WhatsApp Line Link */}
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group border-b border-[#c4c7c7]/30 hover:border-[#1c1b1b] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.25em] text-[#5d5f5f] uppercase">
                      WhatsApp
                    </span>
                    <h3 className="font-raleway text-[clamp(20px,calc((26/1920)*100vw),26px)] leading-tight font-light tracking-widest text-[#1c1b1b] uppercase">
                      +91 98765 43210
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] group-hover:text-[#1c1b1b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* Email Line Link */}
                <a 
                  href="mailto:hello@decorium.com" 
                  className="group border-b border-[#c4c7c7]/30 hover:border-[#1c1b1b] py-5 flex items-center justify-between cursor-pointer transition-all duration-300 px-2 text-left"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                    <span className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.25em] text-[#5d5f5f] uppercase">
                      Email
                    </span>
                    <h3 className="font-raleway text-[clamp(18px,calc((24/1920)*100vw),24px)] leading-tight font-light tracking-widest text-[#1c1b1b] uppercase break-all">
                      hello@decorium.com
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 text-[#5d5f5f] group-hover:text-[#1c1b1b] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                </a>

                {/* Operating Hours Info */}
                <div className="mt-auto pt-6 px-4 text-left">
                  <p className="font-hanken-grotesk text-[13px] leading-relaxed text-[#5d5f5f]">
                    Our concierge team is available Monday through Friday, 9am — 6pm IST.
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* SHOWROOM Section */}
        <section className="flex flex-col gap-8 border-t border-[#c4c7c7]/65 pt-12 md:pt-16 text-left">
          <div>
            <span className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-3">
              VISIT US
            </span>
            <h2 className="font-raleway text-[clamp(32px,calc((48/1920)*100vw),48px)] leading-[clamp(38px,calc((56/1920)*100vw),56px)] text-[#1c1b1b] uppercase font-light tracking-wide">
              OUR SHOWROOM
            </h2>
            <p className="font-hanken-grotesk text-[15px] leading-[26px] text-[#5d5f5f] max-w-2xl mt-4">
              Experience our full collection of natural stones, large porcelain slabs, and fixtures in person.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-lg overflow-hidden border border-[#c4c7c7]/40 relative bg-[#f1edec] h-[300px] md:h-[450px]">
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
              <a 
                href={mapDirectionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-[#1c1b1b] px-8 py-3.5 font-hanken-grotesk text-[12px] font-semibold uppercase tracking-widest text-[#1c1b1b] hover:bg-[#1c1b1b] hover:text-[#fdf8f8] transition-all duration-300 rounded-md"
              >
                <span>GET DIRECTIONS</span>
                <Compass className="size-4" strokeWidth={1.75} />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border-l border-[#c4c7c7]/40 pl-6">
                <div>
                  <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.25em] text-[#5d5f5f] uppercase mb-1">ADDRESS</h3>
                  <p className="font-hanken-grotesk text-[13px] leading-relaxed text-[#5d5f5f]">
                    Decorium Studio<br />
                    12th Main Road, Indiranagar<br />
                    Bengaluru, Karnataka 560038
                  </p>
                </div>
                <div>
                  <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.25em] text-[#5d5f5f] uppercase mb-1">HOURS</h3>
                  <p className="font-hanken-grotesk text-[13px] leading-relaxed text-[#5d5f5f]">
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

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (under md)                                                  */}
      {/* ========================================================================= */}
      <div className="block md:hidden flex flex-col bg-[#fdf8f8] w-full">
        {/* Editorial Header */}
        <section className="px-margin-mobile pb-8 border-b border-[#c4c7c7]/30 text-left">
          <span className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-3">
            CONTACT
          </span>
          <h1 className="font-raleway text-[32px] leading-[40px] font-light uppercase text-[#1c1b1b] mb-4">
            LET&apos;S TALK
          </h1>
          <p className="font-hanken-grotesk text-[15px] leading-[26px] text-[#5d5f5f] max-w-sm mt-4">
            Whether you&apos;re inquiring about a specific piece, discussing a bespoke commission, or exploring interior styling services, our team is ready to assist you.
          </p>
        </section>

        {/* Get In Touch Section */}
        <section className="border-b border-[#c4c7c7]/30">
          <div className="w-full aspect-[16/10] relative bg-[#f1edec]">
            <Image 
              alt="High-end minimalist showroom interior" 
              className="object-cover grayscale opacity-90 mix-blend-multiply" 
              fill
              sizes="100vw"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" 
            />
          </div>
          <div className="px-margin-mobile py-6 text-left">
            <span className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-2">
              CONNECT WITH US
            </span>
            <h2 className="font-raleway text-[26px] leading-[32px] font-light uppercase text-[#1c1b1b] mb-4">
              GET IN TOUCH
            </h2>
            <ul className="flex flex-col mt-2">
              {/* Phone */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30 first:pt-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-hanken-grotesk text-[10px] font-semibold tracking-[0.2em] text-[#1c1b1b] uppercase">PHONE</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f]" strokeWidth={1.5} />
                </div>
                <a className="font-hanken-grotesk text-[14px] text-[#5d5f5f] hover:text-[#1c1b1b] transition-colors" href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </li>

              {/* WhatsApp */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-hanken-grotesk text-[10px] font-semibold tracking-[0.2em] text-[#1c1b1b] uppercase">WHATSAPP</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f]" strokeWidth={1.5} />
                </div>
                <a className="font-hanken-grotesk text-[14px] text-[#5d5f5f] hover:text-[#1c1b1b] transition-colors" href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  Message Us
                </a>
              </li>

              {/* Email */}
              <li className="py-4.5 border-b border-[#c4c7c7]/30 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-hanken-grotesk text-[10px] font-semibold tracking-[0.2em] text-[#1c1b1b] uppercase">EMAIL</span>
                  <ArrowRight className="size-3.5 text-[#5d5f5f]" strokeWidth={1.5} />
                </div>
                <a className="font-hanken-grotesk text-[14px] text-[#5d5f5f] hover:text-[#1c1b1b] transition-colors break-all" href="mailto:hello@decorium.com">
                  hello@decorium.com
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="px-margin-mobile py-16 text-left">
          <span className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] uppercase block mb-3">
            VISIT OUR SHOWROOM
          </span>
          <h2 className="font-raleway text-[32px] leading-[36px] font-light uppercase text-[#1c1b1b] mb-8">
            VISIT US
          </h2>
          
          <div className="w-full aspect-square mb-8 rounded overflow-hidden border border-[#c4c7c7]/40 relative bg-[#f1edec] h-[300px]">
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

          <a 
            href={mapDirectionsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 border border-[#1c1b1b] text-[#1c1b1b] font-hanken-grotesk text-[12px] font-semibold uppercase tracking-widest rounded hover:bg-[#1c1b1b] hover:text-[#fdf8f8] transition-colors mb-12 flex items-center justify-center gap-2"
          >
            <span>GET DIRECTIONS</span>
            <Compass className="size-4" strokeWidth={1.75} />
          </a>

          <div className="space-y-8">
            <div>
              <h3 className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] mb-2 uppercase">ADDRESS</h3>
              <p className="font-hanken-grotesk text-[15px] leading-relaxed text-[#5d5f5f]">
                Decorium Studio<br />
                12th Main Road, Indiranagar<br />
                Bengaluru, Karnataka 560038
              </p>
            </div>
            <div>
              <h3 className="font-hanken-grotesk text-[12px] font-semibold tracking-[0.2em] text-[#5d5f5f] mb-2 uppercase">HOURS</h3>
              <p className="font-hanken-grotesk text-[15px] leading-relaxed text-[#5d5f5f]">
                Monday - Saturday<br />
                10:00 AM - 7:00 PM<br />
                Sunday by appointment
              </p>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
