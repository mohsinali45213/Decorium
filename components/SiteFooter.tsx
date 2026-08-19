"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";

const FOOTER_NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contect", label: "CONTACT" },
] as const;

export function SiteFooter() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <footer className="bg-[#fdf8f8] border-t border-[#c4c7c7]/65 pt-12 md:pt-showcase-py pb-navbar-px px-navbar-px relative z-20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Primary Branding (Hidden on Mobile) */}
        <div className="hidden md:block mb-14 md:mb-16">
          <h2 className="font-raleway text-[clamp(40px,calc((80/1920)*100vw),80px)] leading-none tracking-tighter text-black uppercase font-light">
            DECORIUM
          </h2>
        </div>

        {/* Content Grid (Split Layout on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 mb-16">
          
          {/* FIND US - Desktop Layout */}
          <div className="hidden md:flex col-span-1 border border-[#c4c7c7]/55 rounded-lg p-8 flex-col justify-between hover:bg-[#f7f3f2]/40 transition-colors duration-300">
            <div>
              <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.16em] uppercase mb-4 text-[#5d5f5f]">
                FIND US
              </h3>
              <p className="font-hanken-grotesk text-[15px] leading-relaxed text-[#1c1b1b] mb-2">
                124 Architecture Blvd,<br />
                Indiranagar, Bengaluru, India 560038
              </p>
              <p className="font-hanken-grotesk text-[14px] text-[#5d5f5f]">
                Mon — Sat, 10:00 — 19:00
              </p>
            </div>
            
            <div className="mt-8">
              <a 
                className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-[#1c1b1b] uppercase hover:text-[#5d5f5f] group font-hanken-grotesk" 
                href="#"
              >
                <span>GET DIRECTIONS</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* FIND US - Mobile Layout */}
          <div className="flex md:hidden flex-col gap-6 col-span-1">
            <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5d5f5f]">
              Find Us
            </h3>
            <div className="border border-[#c4c7c7]/55 rounded-lg p-6 bg-transparent">
              <p className="font-hanken-grotesk text-[15px] leading-relaxed text-[#1c1b1b] mb-6">
                124 Architecture Blvd,<br />
                Indiranagar, Bengaluru, India 560038
              </p>
              <a className="flex items-center justify-between group" href="#">
                <span className="font-hanken-grotesk text-[12px] font-semibold tracking-widest text-[#1c1b1b] uppercase">Get Directions</span>
                <ArrowRight className="size-4 text-black group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* LET'S TALK - Desktop Layout */}
          <div className="hidden md:flex col-span-1 border border-[#c4c7c7]/55 rounded-lg p-8 flex-col justify-between hover:bg-[#f7f3f2]/40 transition-colors duration-300">
            <div>
              <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.16em] uppercase mb-4 text-[#5d5f5f]">
                LET&apos;S TALK
              </h3>
              
              <div className="flex flex-col mt-8 space-y-1">
                <a 
                  className="inline-flex items-center justify-between font-hanken-grotesk text-[15px] py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
                  href="#"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle className="size-4 text-[#5d5f5f] group-hover:text-[#1c1b1b]" strokeWidth={1.75} />
                    <span>WhatsApp</span>
                  </span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
                
                <a 
                  className="inline-flex items-center justify-between font-hanken-grotesk text-[15px] py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
                  href="#"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="size-4 text-[#5d5f5f] group-hover:text-[#1c1b1b]" strokeWidth={1.75} />
                    <span>Call Us</span>
                  </span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
                
                <a 
                  className="inline-flex items-center justify-between font-hanken-grotesk text-[15px] py-3 border-b border-[#c4c7c7]/50 hover:border-[#1c1b1b] transition-colors group text-[#1c1b1b]" 
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
            <h3 className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5d5f5f]">
              Let&apos;s Talk
            </h3>
            <div className="flex flex-col border-t border-[#c4c7c7]/55">
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <MessageCircle className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-hanken-grotesk text-[16px] text-[#1c1b1b]">WhatsApp</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <Phone className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-hanken-grotesk text-[16px] text-[#1c1b1b]">Call Us</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
              <a className="flex items-center justify-between py-6 border-b border-[#c4c7c7]/55 group" href="#">
                <div className="flex items-center gap-4">
                  <Mail className="size-5 text-[#5d5f5f]" strokeWidth={1.5} />
                  <span className="font-hanken-grotesk text-[16px] text-[#1c1b1b]">Email</span>
                </div>
                <ArrowRight className="size-4 text-[#5d5f5f] transition-transform group-hover:translate-x-1 group-hover:text-black" strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Navigation Row with Mobile Dropdown Accordion */}
        <div className="border-y border-[#c4c7c7]/65 py-4 md:py-6 mb-8">
          {/* Mobile Accordion Toggle */}
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex md:hidden w-full items-center justify-between py-1 text-[14px] font-semibold tracking-[0.15em] text-[#1c1b1b] uppercase font-hanken-grotesk cursor-pointer"
          >
            <span>Navigation</span>
            <ChevronDown className={`size-4.5 text-[#1c1b1b] transition-transform duration-200 ${isNavOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Links List */}
          <div className={`grid transition-all duration-300 ease-in-out overflow-hidden md:block ${
            isNavOpen 
              ? 'grid-rows-[1fr] opacity-100 mt-4 visible' 
              : 'grid-rows-[0fr] opacity-0 mt-0 invisible md:visible md:opacity-100'
          }`}>
            <nav className="min-h-0 flex flex-col md:flex-row md:flex-wrap gap-x-8 md:gap-x-12 justify-start md:justify-center items-stretch md:items-center">
              {FOOTER_NAV_LINKS.map((link, index) => (
                <Link 
                  key={link.href} 
                  className={`text-[12px] font-semibold tracking-[0.15em] text-[#1c1b1b] hover:text-[#5d5f5f] transition-colors uppercase font-hanken-grotesk py-3 md:py-0 ${
                    index === FOOTER_NAV_LINKS.length - 1 
                      ? "border-none" 
                      : "border-b border-[#c4c7c7]/20 md:border-none"
                  }`} 
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Primary Branding on Mobile (Centered immediately after navigation) */}
        <div className="md:hidden mb-8 flex justify-center">
          <h2 className="font-raleway text-[48px] leading-none tracking-tighter text-black uppercase font-light">
            DECORIUM
          </h2>
        </div>

        {/* Fine Print */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.12em] text-[#5d5f5f] uppercase">
            © 2026 DECORIUM ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-6 items-center">
            <a className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.12em] text-[#5d5f5f] hover:text-black transition-colors uppercase" href="#">
              Privacy
            </a>
            <span className="md:hidden text-[#c4c7c7] text-xs">|</span>
            <a className="font-hanken-grotesk text-[11px] font-semibold tracking-[0.12em] text-[#5d5f5f] hover:text-black transition-colors uppercase" href="#">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
