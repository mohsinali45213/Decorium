"use client";

import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminSidebarProvider, useAdminSidebar } from "@/components/admin/AdminSidebarContext";
import { LUXURY_EASE_CSS } from "@/lib/motionConfig";

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { isCollapsed, isMounted } = useAdminSidebar();

  return (
    <div className="min-h-screen w-full bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased transition-colors duration-300 font-hanken-grotesk select-none flex flex-col md:flex-row">
      
      {/* Reusable Fixed Left / Mobile Drawer Admin Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area: Zero-flash Layout Padding */}
      <div
        style={{ transitionTimingFunction: LUXURY_EASE_CSS }}
        className={`flex-1 flex flex-col min-h-screen min-w-0 pl-0 ${
          !isMounted ? "!transition-none" : "transition-[padding] duration-300"
        } ${isCollapsed ? "md:pl-16" : "md:pl-64"}`}
      >
        {/* Reusable Sticky Top Admin Navbar Header */}
        <AdminNavbar />

        {/* Dynamic Admin Page Content */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-6 md:pt-10 pb-24 flex flex-col gap-8 md:gap-10 text-left">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminSidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminSidebarProvider>
  );
}
