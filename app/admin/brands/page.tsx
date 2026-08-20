"use client";

import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { CATALOG_BRANDS, CatalogBrand } from "@/lib/catalogData";

export default function AdminBrandsPage() {
  const columns: ColumnDef<CatalogBrand>[] = [
    {
      key: "name",
      header: "BRAND NAME",
      className: "min-w-[200px]",
      render: (brand) => (
        <div>
          <span className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] block">
            {brand.name}
          </span>
          <span className="font-label-caps text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase">
            /{brand.slug}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "SPECIALTY / CATEGORY",
      className: "min-w-[220px]",
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
      key: "status",
      header: "STATUS",
      className: "w-28",
      render: (brand) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase ${
          brand.isActive
            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-500/20"
        }`}>
          <span className="size-1.5 rounded-full bg-current" />
          {brand.isActive ? "Verified" : "Pending"}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      title="BRANDS"
      subtitle="Manage global quarry partners, artisan studios, and architectural surface manufacturers."
      searchPlaceholder="Search brands by studio title, quarry origin, or material specialty..."
      addItemLabel="Add Brand"
      columns={columns}
      data={CATALOG_BRANDS}
      itemsPerPage={6}
      onAddItem={() => alert("Add Brand Modal Triggered")}
    />
  );
}
