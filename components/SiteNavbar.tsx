"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATALOG_CATEGORIES } from "@/lib/catalogData";
import aboutPreview from "@/stitch_decorium_editorial_navbar/decorium_premium_full_screen_menu/about.jpg";
import contactPreview from "@/stitch_decorium_editorial_navbar/decorium_premium_full_screen_menu/contact.jpg";
import homePreview from "@/stitch_decorium_editorial_navbar/decorium_premium_full_screen_menu/home.jpg";
import featuredSpace from "@/stitch_decorium_editorial_navbar/decorium_premium_full_screen_menu_mobile/featured-interior-space.jpg";

const links = [
  { href: "/", label: "Home", number: "01" },
  { href: "/products", label: "Products", number: "02" },
  { href: "/about", label: "About", number: "03" },
  { href: "/contect", label: "Contect", number: "04" },
] as const;

type MenuRoute = (typeof links)[number]["href"];

const previews = {
  "/": { image: homePreview, label: "Home" },
  "/about": { image: aboutPreview, label: "About Decorium" },
  "/contect": { image: contactPreview, label: "Visit our showroom" },
};

function MenuIcon() {
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-[22px]">
      <span className="absolute left-0 top-0 h-px w-full bg-current" />
      <span className="absolute left-0 top-1.5 h-px w-full bg-current" />
      <span className="absolute left-0 top-3 h-px w-full bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
    </span>
  );
}

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewRoute, setPreviewRoute] = useState<MenuRoute>("/");
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPreviewRoute(links.find((link) => link.href === pathname)?.href ?? "/");
    }
  }, [isOpen, pathname]);

  const wordmarkClass = "font-raleway text-[clamp(1.45rem,2.4vw,2rem)] font-normal leading-none tracking-[-0.075em] text-[#1c1b1b]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e2e1] bg-[#fdf8f8]/95">
      <div className="mx-auto flex h-navbar-h max-w-[1440px] items-center justify-between px-navbar-px">
        <Link className={wordmarkClass} href="/" onClick={() => setIsOpen(false)}>
          DECORIUM
        </Link>

        <div className="flex items-center gap-3.5 md:gap-6">
          <button className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e2e1] text-[#1c1b1b]" type="button" aria-label="Search collections">
            <svg aria-hidden="true" className="size-[18px] fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.25" /><path d="m16 16 4.25 4.25" strokeLinecap="round" /></svg>
          </button>
          <button className="inline-flex items-center gap-2.5 text-[1rem] font-semibold uppercase tracking-[0.16em] text-[#1c1b1b]" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen(true)}>
            <span className="hidden md:block">Menu</span>
            <MenuIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="primary-navigation"
            className="fixed inset-0 z-10 flex min-h-dvh flex-col bg-[#fdf8f8]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="mx-auto flex h-navbar-h w-full max-w-[1440px] items-center justify-between px-navbar-px shrink-0">
              <Link className={wordmarkClass} href="/" onClick={() => setIsOpen(false)}>DECORIUM</Link>
              <button className="inline-flex size-10 items-center justify-center text-[#1c1b1b]" type="button" aria-label="Close menu" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            
            {/* Desktop Layout (md and up) */}
            <div className="mx-auto hidden md:grid w-full max-w-[1440px] flex-1 grid-cols-2 overflow-hidden">
              <nav aria-label="Primary navigation" className="flex flex-col px-categories-px py-categories-py">
                <div className="flex flex-1 flex-col justify-center gap-3.5">
                  {links.map((link, index) => {
                    const active = pathname === link.href;
                    const selected = active || previewRoute === link.href;
                    const menuItemClass = `inline-flex w-fit items-baseline gap-[18px] font-raleway text-[clamp(28px,calc((48/1920)*100vw),48px)] font-normal uppercase leading-[clamp(31px,calc((53/1920)*100vw),53px)] tracking-[-0.06em] transition duration-200 hover:translate-x-2 hover:text-[#1c1b1b] ${selected ? "border-b border-[#1c1b1b] text-[#1c1b1b]" : "text-[#5d5f5f]"}`;
                    return (
                      <motion.div key={link.href} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + index * 0.09, duration: 0.45 }}>
                        {link.href === "/products" ? (
                          <button className={`${menuItemClass} text-left`} type="button" onClick={() => setPreviewRoute("/products")} onMouseEnter={() => setPreviewRoute("/products")} onFocus={() => setPreviewRoute("/products")}>
                            <small className="text-[0.65rem] font-semibold tracking-[0.16em]">{link.number}</small>
                            {link.label}
                            <ArrowRight aria-hidden="true" className="ml-2 size-[0.8em] shrink-0 self-center" strokeWidth={1.4} />
                          </button>
                        ) : (
                          <Link className={menuItemClass} href={link.href} aria-current={active ? "page" : undefined} onMouseEnter={() => setPreviewRoute(link.href)} onFocus={() => setPreviewRoute(link.href)} onClick={() => setIsOpen(false)}>
                            <small className="text-[0.65rem] font-semibold tracking-[0.16em]">{link.number}</small>
                            {link.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-8 flex flex-wrap gap-7 border-t border-[#c4c7c7] pt-5">
                  <Link className="group inline-flex items-center gap-3 text-[#1c1b1b]" href="/contect" onClick={() => setIsOpen(false)}>
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#1c1b1b] text-[#fdf8f8] transition-colors group-hover:bg-[#5d5f5f]">
                      <Phone aria-hidden="true" size={15} strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em]">Call</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[#5d5f5f]">Direct line</span>
                    </span>
                  </Link>
                  <Link className="group inline-flex items-center gap-3 text-[#1c1b1b]" href="/contect" onClick={() => setIsOpen(false)}>
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#1c1b1b] text-[#fdf8f8] transition-colors group-hover:bg-[#5d5f5f]">
                      <MessageCircle aria-hidden="true" size={15} strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em]">WhatsApp</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[#5d5f5f]">Message us</span>
                    </span>
                  </Link>
                </div>
              </nav>
              <div className="relative overflow-hidden bg-[#f1edec] min-h-full">
                <AnimatePresence mode="wait">
                  {previewRoute === "/products" ? (
                    <motion.div key="categories" className="flex h-full flex-col justify-center px-categories-px py-categories-py" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                      <div className="mb-7 flex items-end justify-between gap-4">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d5f5f]">Product index</p>
                          <h2 className="font-raleway text-[clamp(24px,calc((32/1920)*100vw),32px)] font-normal leading-tight tracking-[-0.03em] text-[#1c1b1b]">Categories</h2>
                        </div>
                        <Link className="inline-flex items-center gap-2 rounded-lg bg-[#1c1b1b] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80" href="/products" onClick={() => setIsOpen(false)}>
                          All categories <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} />
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {CATALOG_CATEGORIES.map((category, index) => (
                          <Link
                            className="group flex gap-4 rounded-lg border border-[#c4c7c7] bg-[#fdf8f8] p-3 transition-colors hover:bg-white items-center"
                            href="/products"
                            key={category.slug}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-[#f1edec]">
                              <Image
                                alt={category.name}
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                fill
                                sizes="64px"
                                src={category.image}
                              />
                            </div>
                            <div className="flex flex-col flex-grow justify-between h-16 py-0.5 min-w-0">
                              <small className="text-[0.65rem] font-semibold tracking-[0.12em] text-[#5d5f5f]">0{index + 1}</small>
                              <span className="flex items-end justify-between gap-3 font-raleway text-sm font-normal leading-tight tracking-[-0.02em] text-[#1c1b1b]">
                                <span className="truncate">{category.name}</span>
                                <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={1.4} />
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key={previewRoute} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                      <Image alt={previews[previewRoute].label} className="object-cover" fill sizes="50vw" src={previews[previewRoute].image} />
                      <div className="absolute inset-0 bg-black/20" />
                      <p className="absolute bottom-16 left-16 text-xs font-semibold uppercase tracking-[0.16em] text-white">{previews[previewRoute].label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Mobile Layout (under md) */}
            <div className="mx-auto flex md:hidden flex-col w-full flex-1 overflow-y-auto px-6 pb-6 justify-between">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5d5f5f] mt-8 mb-6 font-hanken-grotesk">
                  NAVIGATION
                </div>
                <nav className="flex flex-col gap-5">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    if (link.href === "/products") {
                      return (
                        <button
                          key={link.href}
                          className="flex items-baseline gap-4 group transition duration-300 hover:translate-x-2 font-raleway text-left"
                          type="button"
                          onClick={() => setPreviewRoute("/products")}
                        >
                          <span className="text-[12px] font-semibold tracking-[0.15em] text-[#5d5f5f] w-6">
                            {link.number}
                          </span>
                          <span
                            className={`text-[20px] font-normal uppercase tracking-[-0.02em] transition-all duration-300 flex items-center gap-1.5 ${
                              previewRoute === "/products" ? "text-[#1c1b1b]" : "text-[#1c1b1b]/50"
                            }`}
                          >
                            {link.label}
                            <ArrowRight aria-hidden="true" className="size-5 shrink-0 self-center" strokeWidth={1.4} />
                          </span>
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        className="flex items-baseline gap-4 group transition duration-300 hover:translate-x-2 font-raleway"
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-[12px] font-semibold tracking-[0.15em] text-[#5d5f5f] w-6">
                          {link.number}
                        </span>
                        <span
                          className={`text-[20px] font-normal uppercase tracking-[-0.02em] transition-all duration-300 ${
                            active ? "text-[#1c1b1b]" : "text-[#1c1b1b]/50"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              <div className="flex flex-col mt-8">
                {/* Visual Element */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    {previewRoute === "/products" ? (
                      <motion.div
                        key="categories-mobile"
                        className="w-full bg-[#fdf8f8] rounded-lg border border-[#c4c7c7]/30 p-3.5 animate-in fade-in duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="mb-4 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#5d5f5f]">Product index</p>
                            <h3 className="font-raleway text-base font-normal tracking-[-0.02em] text-[#1c1b1b]">Categories</h3>
                          </div>
                          <Link
                            className="inline-flex items-center gap-1 rounded-md bg-[#1c1b1b] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 font-hanken-grotesk"
                            href="/products"
                            onClick={() => setIsOpen(false)}
                          >
                            All <ArrowRight aria-hidden="true" size={10} strokeWidth={1.5} />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {CATALOG_CATEGORIES.map((category, index) => (
                            <Link
                              className="group flex gap-2 rounded-md border border-[#c4c7c7] bg-[#fdf8f8] p-2 transition-colors hover:bg-white items-center"
                              href="/products"
                              key={category.slug}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="relative size-10 shrink-0 overflow-hidden rounded bg-[#f1edec]">
                                <Image
                                  alt={category.name}
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  fill
                                  sizes="40px"
                                  src={category.image}
                                />
                              </div>
                              <div className="flex flex-col flex-grow justify-center min-h-10 min-w-0">
                                <small className="text-[8px] font-semibold tracking-[0.12em] text-[#5d5f5f]">0{index + 1}</small>
                                <span className="flex items-end justify-between gap-1 font-raleway text-[11px] font-normal leading-[14px] tracking-[-0.02em] text-[#1c1b1b]">
                                  <span className="line-clamp-2">{category.name}</span>
                                  <ArrowRight aria-hidden="true" className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5 self-end mb-0.5" strokeWidth={1.4} />
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="image-mobile"
                        className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#c4c7c7]/30 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Image
                          alt="Featured Interior Space"
                          className="object-cover"
                          fill
                          sizes="100vw"
                          src={featuredSpace}
                        />
                        <div className="absolute inset-0 bg-[#000000]/5 mix-blend-multiply" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Bottom Action Section */}
                <footer className="border-t border-[#c4c7c7] pt-6 flex justify-center items-center">
                  <div className="flex items-center gap-6 font-hanken-grotesk">
                    <Link
                      className="text-[12px] font-semibold text-[#1c1b1b] uppercase tracking-widest hover:opacity-70 transition-opacity"
                      href="/contect"
                      onClick={() => setIsOpen(false)}
                    >
                      WHATSAPP
                    </Link>
                    <div className="w-[1px] h-4 bg-[#c4c7c7]"></div>
                    <Link
                      className="text-[12px] font-semibold text-[#1c1b1b] uppercase tracking-widest hover:opacity-70 transition-opacity"
                      href="/contect"
                      onClick={() => setIsOpen(false)}
                    >
                      CALL
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}