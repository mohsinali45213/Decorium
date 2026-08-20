"use client";

import Image from "next/image";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { CATALOG_BRANDS, CatalogBrand } from "@/lib/catalogData";

export default function AdminBrandsPage() {
  const columns: ColumnDef<CatalogBrand>[] = [
    {
      key: "name",
      header: "BRAND IDENTITY",
      className: "min-w-[260px]",
      render: (brand) => {
        const initials = brand.name.slice(0, 2).toUpperCase();
        const brandImg = brand.logo || brand.image;
        return (
          <div className="flex items-center gap-3.5">
            {brandImg ? (
              <div className="size-10 rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] relative shrink-0 bg-[#f7f3f2] dark:bg-[#181818]">
                <Image src={brandImg} alt={brand.name} fill sizes="40px" className="object-cover" />
              </div>
            ) : (
              <div className="size-10 rounded-lg bg-[#1c1b1b] dark:bg-[#f4f0ef] text-white dark:text-[#121212] flex items-center justify-center font-semibold text-xs font-label-caps shrink-0 shadow-xs border border-[#c4c7c7]/30 dark:border-[#2e2e2e]">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] block truncate">
                {brand.name}
              </span>
              <span className="font-label-caps text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase truncate">
                /{brand.slug}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "category",
      header: "SPECIALTY / CATEGORY",
      className: "min-w-[200px]",
      render: (brand) => (
        <span className="font-body-md text-sm text-[#1c1b1b] dark:text-[#f4f0ef]">
          {brand.category || "Natural Stone Partner"}
        </span>
      ),
    },
    {
      key: "origin",
      header: "QUARRY / ORIGIN",
      className: "min-w-[180px]",
      render: (brand) => (
        <span className="inline-block px-2.5 py-1 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded text-[#5d5f5f] dark:text-[#8e8e8e] font-label-caps text-[10px] uppercase">
          {brand.origin || "Italy"}
        </span>
      ),
    },
    {
      key: "specimenCount",
      header: "CATALOG SPECIMENS",
      className: "w-32",
      render: (brand) => (
        <span className="font-hanken-grotesk font-semibold text-sm text-[#1c1b1b] dark:text-[#f4f0ef]">
          {brand.specimenCount || 10} Specimens
        </span>
      ),
    },
    {
      key: "status",
      header: "PARTNER STATUS",
      className: "w-32",
      render: (brand) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase border ${
            brand.isActive
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : "bg-stone-100 dark:bg-stone-900 text-[#5d5f5f] dark:text-[#8e8e8e] border-stone-500/20"
          }`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {brand.isActive ? "Active Partner" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      title="BRANDS & PARTNERS"
      subtitle="Manage global quarry partners, surface studios, and architectural hardware manufacturers."
      searchPlaceholder="Search brands by name, origin, or category..."
      addItemLabel="Add Brand"
      columns={columns}
      data={CATALOG_BRANDS}
      itemsPerPage={8}
      onAddItem={() => alert("Add Brand Modal Triggered")}
    />
  );
}
