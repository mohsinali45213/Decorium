import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminNavbar } from "@/components/AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased transition-colors duration-300 ease-in-out font-hanken-grotesk select-none flex">
      
      {/* Reusable Fixed Left Admin Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        
        {/* Reusable Sticky Top Admin Navbar Header */}
        <AdminNavbar />

        {/* Dynamic Admin Page Content */}
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-16 pt-8 md:pt-12 pb-24 flex flex-col gap-12 text-left">
          {children}
        </main>

      </div>
    </div>
  );
}
