"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useAdminSidebar();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/brands", label: "Brands", icon: Tag },
    { href: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <aside
      aria-label="Admin Navigation"
      className={`fixed left-0 top-0 bottom-0 z-30 bg-[#f7f3f2]/95 dark:bg-[#181818]/95 border-r border-[#c4c7c7]/30 dark:border-[#2e2e2e] backdrop-blur-md flex flex-col transition-all duration-300 ease-in-out select-none ${
        isCollapsed ? "w-16 px-2 py-0" : "w-64 px-6 py-0"
      }`}
    >
      {/* 01. INTEGRATED BORDER TAB HANDLE TOGGLE BUTTON (Aligned with First Sidebar Item) */}
      <button
        onClick={toggleSidebar}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        className="absolute -right-5 top-[84px] h-9 w-5 rounded-r-lg bg-[#f7f3f2] dark:bg-[#181818] border-y border-r border-[#c4c7c7]/50 dark:border-[#2e2e2e] shadow-xs flex items-center justify-center text-[#1c1b1b] dark:text-[#f4f0ef] opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="size-3.5 -ml-0.5" strokeWidth={2} />
        ) : (
          <ChevronLeft className="size-3.5 -ml-0.5" strokeWidth={2} />
        )}
      </button>

      {/* 02. BRAND HEADER (h-16 aligned with Searchbar) */}
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

      {/* 03. NAVIGATION TABS */}
      <nav aria-label="Admin Navigation" className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center transition-all duration-300 ease-in-out cursor-pointer rounded-lg overflow-hidden ${
                isCollapsed
                  ? "justify-center size-11 mx-auto"
                  : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
              } ${
                isActive
                  ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                  : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
              }`}
            >
              <Icon className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* 04. FOOTER NAVIGATION ACTIONS */}
      <div className="pt-4 pb-6 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex flex-col gap-1.5 overflow-hidden">
        <Link
          href="/admin/settings"
          title={isCollapsed ? "Settings" : undefined}
          className={`flex items-center transition-all duration-300 ease-in-out rounded-lg overflow-hidden ${
            isCollapsed
              ? "justify-center size-11 mx-auto"
              : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
          } ${
            pathname === "/admin/settings"
              ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
              : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
          }`}
        >
          <Settings className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Settings</span>}
        </Link>

        <Link
          href="/"
          title={isCollapsed ? "Return to Site" : undefined}
          className={`flex items-center transition-all duration-300 ease-in-out text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg overflow-hidden ${
            isCollapsed
              ? "justify-center size-11 mx-auto"
              : "w-full gap-3 px-4 py-3 font-label-caps text-label-caps uppercase"
          }`}
        >
          <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Return to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
