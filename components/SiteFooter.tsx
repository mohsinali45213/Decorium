"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Mail } from "lucide-react";

const FOOTER_NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contect", label: "CONTACT" },
] as const;

export function SiteFooter() {

  return (
    <footer className="bg-[#fdf8f8] border-t border-[#c4c7c7]/65 pt-12 md:pt-showcase-py pb-navbar-px px-navbar-px relative z-20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Primary Branding (Hidden on Mobile) */}
        <div className="hidden md:block mb-14 md:mb-16">
          <h2 className="font-raleway text-display-lg leading-none tracking-tighter text-black uppercase">
            DECORIUM
          </h2>
        </div>

        {/* Content Grid (Split Layout on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 mb-10">
          
          {/* FIND US - Desktop Layout */}
          <div className="hidden md:flex col-span-1 border border-[#c4c7c7]/55 rounded-lg p-8 flex-col justify-between hover:bg-[#f7f3f2]/40 transition-colors duration-300">
            <div>
              <h3 className="font-label-caps text-label-caps-sm uppercase mb-4 text-[#5d5f5f]">
                FIND US
              </h3>
              <p className="font-body-md text-body-md text-[#1c1b1b] mb-2">
                124 Architecture Blvd,<br />
                Indiranagar, Bengaluru, India 560038
              </p>
              <p className="font-body-sm text-body-sm text-[#5d5f5f]">
                Mon — Sat, 10:00 — 19:00
              </p>
            </div>
            
            <div className="mt-8">
              <a 
                className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#1c1b1b] uppercase hover:text-[#5d5f5f] group" 
                href="#"
              >
                <span>GET DIRECTIONS</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* FIND US - Mobile Layout */}
          <div className="flex md:hidden flex-col gap-6 col-span-1">
            <h3 className="font-label-caps text-label-caps-sm uppercase text-[#5d5f5f]">
              Find Us
            </h3>
            <div className="border border-[#c4c7c7]/55 rounded-lg p-6 bg-transparent">
              <p className="font-body-md text-body-md text-[#1c1b1b] mb-6">
                124 Architecture Blvd,<br />
                Indiranagar, Bengaluru, India 560038
              </p>
              <a className="flex items-center justify-between group" href="#">
                <span className="font-label-caps text-label-caps text-[#1c1b1b] uppercase">Get Directions</span>
                <ArrowRight className="size-4 text-black group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* LET'S TALK - Desktop Layout */}
          <div className="hidden md:flex col-span-1 border border-[#c4c7c7]/55 rounded-lg p-8 flex-col justify-between hover:bg-[#f7f3f2]/40 transition-colors duration-300">
            <div>
              <h3 className="font-label-caps text-label-caps-sm uppercase mb-4 text-[#5d5f5f]">
                LET&apos;S TALK
              </h3>
              
              <div className="flex flex-col mt-8 space-y-1">
                <a 
                  className="inline-flex items-center justify-between font-body-md text-body-md py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
                  href="#"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle className="size-4 text-[#5d5f5f] group-hover:text-[#1c1b1b]" strokeWidth={1.75} />
                    <span>WhatsApp</span>
                  </span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
                
                <a 
                  className="inline-flex items-center justify-between font-body-md text-body-md py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
                  href="#"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="size-4 text-[#5d5f5f] group-hover:text-[#1c1b1b]" strokeWidth={1.75} />
                    <span>Call Us</span>
                  </span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
                
                <a 
                  className="inline-flex items-center justify-between font-body-md text-body-md py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
                  href="#"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="size-4 text-[#5d5f5f] group-hover:text-[#1c1b1b]" strokeWidth={1.75} />
                    <span>Email</span>
                  </span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* LET'S TALK - Mobile Layout */}
          <div className="flex md:hidden flex-col gap-6 col-span-1">
            <h3 className="font-label-caps text-label-caps-sm uppercase text-[#5d5f5f]">
              Let&apos;s Talk
            </h3>
            <div className="flex flex-col border-t border-[#c4c7c7]/55">
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <MessageCircle className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-body-md text-body-md text-[#1c1b1b]">WhatsApp</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <Phone className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-body-md text-body-md text-[#1c1b1b]">Call Us</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <Mail className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-body-md text-body-md text-[#1c1b1b]">Email</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Navigation Row */}
        <div className="border-y border-[#c4c7c7]/65 py-4 md:py-6 mb-8">
          <nav className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-2 justify-center items-center">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                className="font-label-caps text-label-caps text-[#1c1b1b] hover:text-[#5d5f5f] transition-colors uppercase" 
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Primary Branding on Mobile (Centered immediately after navigation) */}
        <div className="md:hidden mb-8 flex justify-center">
          <h2 className="font-raleway text-display-lg leading-none tracking-tighter text-black uppercase">
            DECORIUM
          </h2>
        </div>

        {/* Fine Print */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="font-label-caps text-label-caps-sm text-[#5d5f5f] uppercase">
            © 2026 DECORIUM ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-6 items-center">
            <a className="font-label-caps text-label-caps-sm text-[#5d5f5f] hover:text-black transition-colors uppercase" href="#">
              Privacy
            </a>
            <span className="md:hidden text-[#c4c7c7] text-xs">|</span>
            <a className="font-label-caps text-label-caps-sm text-[#5d5f5f] hover:text-black transition-colors uppercase" href="#">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
