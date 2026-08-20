"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  FolderTree,
  Tag,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const RECENTLY_ADDED_ITEMS = [
  {
    id: "item-1",
    name: "Travertine Table",
    meta: "Tables • Brand X",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80",
    slug: "travertine-table",
  },
  {
    id: "item-2",
    name: "Marble Console",
    meta: "Storage • Studio Y",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80",
    slug: "marble-console",
  },
  {
    id: "item-3",
    name: "Pendant Light",
    meta: "Lighting • Lumina",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80",
    slug: "pendant-light",
  },
  {
    id: "item-4",
    name: "Lounge Chair",
    meta: "Seating • Forma",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80",
    slug: "lounge-chair",
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      {/* Hero Greeting */}
      <section className="border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-8">
        <h2 className="font-raleway text-headline-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-light tracking-tight mb-2 uppercase">
          GOOD MORNING
        </h2>
        <p className="font-body-lg text-body-lg text-[#5d5f5f] dark:text-[#8e8e8e] max-w-2xl">
          Welcome back. Here&apos;s what&apos;s happening today across your catalog and showroom.
        </p>
      </section>

      {/* Overview Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 flex flex-col justify-between hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] transition-colors duration-300 group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-1">
                PRODUCTS
              </h3>
              <p className="font-raleway text-headline-md font-medium text-[#1c1b1b] dark:text-[#f4f0ef]">
                248
              </p>
            </div>
            <Package className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" strokeWidth={1.75} />
          </div>
          <Link href="/products" className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] group-hover:underline flex items-center gap-1">
            View all <ArrowRight className="size-4 stroke-[1.75]" />
          </Link>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 flex flex-col justify-between hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] transition-colors duration-300 group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-1">
                CATEGORIES
              </h3>
              <p className="font-raleway text-headline-md font-medium text-[#1c1b1b] dark:text-[#f4f0ef]">
                10
              </p>
            </div>
            <FolderTree className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" strokeWidth={1.75} />
          </div>
          <Link href="/products" className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] group-hover:underline flex items-center gap-1">
            View all <ArrowRight className="size-4 stroke-[1.75]" />
          </Link>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 flex flex-col justify-between hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] transition-colors duration-300 group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest mb-1">
                BRANDS
              </h3>
              <p className="font-raleway text-headline-md font-medium text-[#1c1b1b] dark:text-[#f4f0ef]">
                24
              </p>
            </div>
            <Tag className="size-5 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" strokeWidth={1.75} />
          </div>
          <Link href="/products" className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] group-hover:underline flex items-center gap-1">
            View all <ArrowRight className="size-4 stroke-[1.75]" />
          </Link>
        </div>

      </section>

      {/* Activity Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
        
        {/* Left Column: Recently Added (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex justify-between items-baseline border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-4 mb-6">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest">
              RECENTLY ADDED
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {RECENTLY_ADDED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl hover:bg-[#f1edec] dark:hover:bg-[#222222] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-[#e5e2e1] dark:bg-[#2e2e2e] overflow-hidden flex items-center justify-center relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">
                      {item.name}
                    </h4>
                    <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#8e8e8e] text-sm">
                      {item.meta}
                    </p>
                  </div>
                </div>
                <span className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#8e8e8e] text-sm">
                  {item.time}
                </span>
              </div>
            ))}
          </div>

          <Link href="/products" className="mt-6 font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] hover:underline flex items-center gap-1 self-start group">
            View all products <ArrowRight className="size-4 stroke-[1.75] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Column: Quick Actions (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex justify-between items-baseline border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-4 mb-6">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest">
              QUICK ACTIONS
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              href="/products"
              variant="primary"
              size="md"
              icon={Plus}
              iconPosition="left"
              className="w-full h-14 min-h-[56px] justify-center rounded-lg tracking-widest"
            >
              ADD PRODUCT
            </Button>

            <Button
              href="/products"
              variant="outline"
              size="md"
              icon={Plus}
              iconPosition="left"
              className="w-full h-14 min-h-[56px] justify-center rounded-lg tracking-widest !border-[#c4c7c7]/40 dark:!border-[#2e2e2e]"
            >
              ADD CATEGORY
            </Button>

            <Button
              href="/products"
              variant="outline"
              size="md"
              icon={Plus}
              iconPosition="left"
              className="w-full h-14 min-h-[56px] justify-center rounded-lg tracking-widest !border-[#c4c7c7]/40 dark:!border-[#2e2e2e]"
            >
              ADD BRAND
            </Button>
          </div>
        </div>

      </section>
    </>
  );
}
