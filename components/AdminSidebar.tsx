"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  Users,
  Settings,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";
import { LUXURY_TRANSITION, LUXURY_EASE_CSS } from "@/lib/motionConfig";

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, isMobileOpen, setIsMobileOpen, isMounted } = useAdminSidebar();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/brands", label: "Brands", icon: Tag },
    { href: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 01. MOBILE SIDEBAR DRAWER WITH GLOBAL SMOOTHNESS (Framer Motion)          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop Blur Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={LUXURY_TRANSITION}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Mobile Navigation Drawer Slide */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={LUXURY_TRANSITION}
              className="relative w-72 max-w-[80vw] h-full bg-[#fdf8f8] dark:bg-[#181818] border-r border-[#c4c7c7]/30 dark:border-[#2e2e2e] shadow-2xl flex flex-col p-6 z-50 overflow-hidden"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] mb-6">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-raleway text-headline-md font-normal tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef] uppercase"
                >
                  DECORIUM
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#252525] transition-colors"
                  aria-label="Close Mobile Sidebar"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Mobile Navigation Tabs */}
              <nav aria-label="Mobile Admin Navigation" className="flex-1 flex flex-col gap-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 font-label-caps text-label-caps uppercase transition-all duration-300 rounded-lg ${
                        isActive
                          ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                          : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Footer Actions */}
              <div className="pt-4 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex flex-col gap-2">
                <Link
                  href="/admin/settings"
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 font-label-caps text-label-caps uppercase transition-all duration-300 rounded-lg ${
                    pathname === "/admin/settings"
                      ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                      : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
                  }`}
                >
                  <Settings className="size-4 shrink-0" strokeWidth={1.75} />
                  <span>Settings</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3.5 font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-300"
                >
                  <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} />
                  <span>Return to Site</span>
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 02. DESKTOP FIXED SIDEBAR (ZERO RELOAD ANIMATION FLASH)                   */}
      {/* ========================================================================= */}
      <aside
        aria-label="Admin Navigation"
        style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
        className={`hidden md:flex fixed left-0 top-0 bottom-0 z-30 bg-[#f7f3f2]/95 dark:bg-[#181818]/95 border-r border-[#c4c7c7]/30 dark:border-[#2e2e2e] backdrop-blur-md flex-col select-none ${
          !isMounted ? "[&_*]:!transition-none !transition-none" : "transition-all duration-300"
        } ${isCollapsed ? "w-16 px-2 py-0" : "w-64 px-6 py-0"}`}
      >
        {/* Minimal Border Tab Handle Toggle Button */}
        <button
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
          className="absolute -right-5 top-[84px] h-9 w-5 rounded-r-lg bg-[#f7f3f2] dark:bg-[#181818] border-y border-r border-[#c4c7c7]/50 dark:border-[#2e2e2e] shadow-xs flex items-center justify-center text-[#1c1b1b] dark:text-[#f4f0ef] opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer z-50"
        >
          {isCollapsed ? (
            <ChevronRight className="size-3.5 -ml-0.5" strokeWidth={2} />
          ) : (
            <ChevronLeft className="size-3.5 -ml-0.5" strokeWidth={2} />
          )}
        </button>

        {/* Brand Header */}
        <div className={`h-16 flex items-center mb-4 shrink-0 overflow-hidden ${isCollapsed ? "justify-center" : "px-1"}`}>
          <Link
            href="/"
            title="Decorium Admin"
            className="font-raleway font-normal tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef] uppercase block transition-opacity duration-300 ease-in-out hover:opacity-80 whitespace-nowrap"
          >
            {isCollapsed ? (
              <div className="size-8 rounded-lg bg-[#1c1b1b] dark:bg-[#f4f0ef] text-white dark:text-[#121212] flex items-center justify-center font-bold text-base tracking-normal shadow-xs">
                D
              </div>
            ) : (
              <span className="text-headline-md whitespace-nowrap">DECORIUM</span>
            )}
          </Link>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Admin Navigation" className="flex-1 flex flex-col gap-1.5 overflow-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
                className={`flex items-center transition-all duration-300 cursor-pointer rounded-lg overflow-hidden ${
                  isCollapsed
                    ? "justify-center size-11 mx-auto"
                    : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
                } ${
                  isActive
                    ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                    : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
                }`}
              >
                <Icon className="size-4 shrink-0 transition-transform duration-300" strokeWidth={1.75} />
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation Actions */}
        <div className="pt-4 pb-6 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex flex-col gap-1.5 overflow-hidden">
          <Link
            href="/admin/settings"
            title={isCollapsed ? "Settings" : undefined}
            style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
            className={`flex items-center transition-all duration-300 rounded-lg overflow-hidden ${
              isCollapsed
                ? "justify-center size-11 mx-auto"
                : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
            } ${
              pathname === "/admin/settings"
                ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
            }`}
          >
            <Settings className="size-4 shrink-0 transition-transform duration-300" strokeWidth={1.75} />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Settings</span>}
          </Link>

          <Link
            href="/"
            title={isCollapsed ? "Return to Site" : undefined}
            style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
            className={`flex items-center transition-all duration-300 text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg overflow-hidden ${
              isCollapsed
                ? "justify-center size-11 mx-auto"
                : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
            }`}
          >
            <ArrowLeft className="size-4 shrink-0 transition-transform duration-300" strokeWidth={1.75} />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Return to Site</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
