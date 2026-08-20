"use client";

import Image from "next/image";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { CATALOG_CATEGORIES, CatalogCategory } from "@/lib/catalogData";

export default function AdminCategoriesPage() {
  const columns: ColumnDef<CatalogCategory>[] = [
    {
      key: "image",
      header: "IMAGE",
      className: "w-20",
      render: (cat) => (
        <div className="size-12 rounded-lg bg-[#e5e2e1] dark:bg-[#2e2e2e] overflow-hidden relative shrink-0 border border-[#c4c7c7]/30 dark:border-[#2e2e2e]">
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "CATEGORY NAME",
      className: "min-w-[200px]",
      render: (cat) => (
        <div>
          <span className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] block">
            {cat.name}
          </span>
          <span className="font-label-caps text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase">
            /{cat.slug}
          </span>
        </div>
      ),
    },
    {
      key: "subCategories",
      header: "SUB-COLLECTIONS",
      className: "min-w-[200px]",
      render: (cat) => (
        <div className="flex flex-wrap gap-1">
          {cat.subCategories.slice(0, 3).map((sub) => (
            <span
              key={sub._id}
              className="inline-block px-2 py-0.5 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded text-[#5d5f5f] dark:text-[#8e8e8e] font-label-caps text-[10px] uppercase"
            >
              {sub.name}
            </span>
          ))}
          {cat.subCategories.length > 3 && (
            <span className="inline-block px-1.5 py-0.5 text-[#5d5f5f] dark:text-[#8e8e8e] font-label-caps text-[10px]">
              +{cat.subCategories.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "specimenCount",
      header: "ITEMS COUNT",
      className: "w-32",
      render: (cat) => (
        <span className="font-hanken-grotesk font-semibold text-sm text-[#1c1b1b] dark:text-[#f4f0ef]">
          {cat.specimenCount} Items
        </span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      className: "w-28",
      render: () => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-current" />
          Active
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      title="CATEGORIES"
      subtitle="Organize monolithic stone slabs, natural marbles, hardware finishes, and bathware collections."
      searchPlaceholder="Search categories by title, slug, or sub-collection..."
      addItemLabel="Add Category"
      columns={columns}
      data={CATALOG_CATEGORIES}
      itemsPerPage={6}
      onAddItem={() => alert("Add Category Modal Triggered")}
    />
  );
}
