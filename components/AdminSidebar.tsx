"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  ImageIcon,
  Sparkles,
  Store,
  Settings,
  ArrowLeft,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/brands", label: "Brands", icon: Tag },
    { href: "/admin/media", label: "Media Studio", icon: ImageIcon },
    { href: "/admin/recommendations", label: "Curated Spaces", icon: Sparkles },
    { href: "/about", label: "Showroom", icon: Store },
  ];

  return (
    <aside aria-label="Admin Navigation" className="w-64 fixed left-0 top-0 bottom-0 z-30 bg-[#f7f3f2]/90 dark:bg-[#181818]/95 border-r border-[#c4c7c7]/30 dark:border-[#2e2e2e] backdrop-blur-md flex flex-col p-6 transition-all duration-300 ease-in-out">
      
      {/* Brand Header */}
      <div className="mb-8 pt-2 px-2">
        <Link
          href="/"
          className="font-raleway text-headline-md font-normal tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef] uppercase block transition-opacity duration-300 ease-in-out hover:opacity-80"
        >
          DECORIUM
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav aria-label="Admin Navigation" className="flex-1 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 ease-in-out cursor-pointer rounded-lg ${
                isActive
                  ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
                  : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
              }`}
            >
              <Icon className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation Actions */}
      <div className="pt-6 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex flex-col gap-1.5">
        <Link
          href="/admin/settings"
          className={`w-full flex items-center gap-3 px-4 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 ease-in-out rounded-lg ${
            pathname === "/admin/settings"
              ? "bg-[#1c1b1b] text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] [&_*]:dark:!text-[#000000] shadow-xs font-semibold"
              : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec]/80 dark:hover:bg-[#252525]/80"
          }`}
        >
          <Settings className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
          <span>Settings</span>
        </Link>

        <Link
          href="/"
          className="w-full flex items-center gap-3 px-4 py-3 font-label-caps text-label-caps uppercase text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-300 ease-in-out"
        >
          <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 ease-in-out" strokeWidth={1.75} />
          <span>Return to Site</span>
        </Link>
      </div>
    </aside>
  );
}
