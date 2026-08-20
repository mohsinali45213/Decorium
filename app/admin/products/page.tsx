"use client";

import Image from "next/image";
import Link from "next/link";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, CatalogProduct } from "@/lib/catalogData";

export default function AdminProductsPage() {
  const categoryFilters = CATALOG_CATEGORIES.map((c) => ({
    label: c.name,
    value: c.slug,
  }));

  const columns: ColumnDef<CatalogProduct>[] = [
    {
      key: "name",
      header: "PRODUCT IDENTITY",
      className: "min-w-[260px]",
      render: (product) => (
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-lg overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] relative shrink-0 bg-[#f7f3f2] dark:bg-[#181818]">
            <Image
              src={product.coverImage}
              alt={product.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${product.slug}`}
              className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] hover:underline block truncate"
            >
              {product.name}
            </Link>
            <span className="font-label-caps text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase truncate">
              {product.spec || "NATURAL STONE"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "COLLECTION / CATEGORY",
      className: "min-w-[200px]",
      render: (product) => (
        <span className="inline-block px-2.5 py-1 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded text-[#5d5f5f] dark:text-[#8e8e8e] font-label-caps text-[10px] uppercase">
          {product.categoryName}
        </span>
      ),
    },
    {
      key: "brand",
      header: "QUARRY / BRAND",
      className: "min-w-[180px]",
      render: (product) => (
        <span className="font-body-md text-sm text-[#1c1b1b] dark:text-[#f4f0ef]">
          {product.brand || "Decorium Atelier"}
        </span>
      ),
    },
    {
      key: "price",
      header: "UNIT PRICE",
      className: "w-32",
      render: (product) => {
        const firstVariantPrice = product.variants?.[0]?.price;
        const formattedPrice = firstVariantPrice
          ? `₹${firstVariantPrice.toLocaleString("en-IN")}`
          : "POR / Spec";

        return (
          <span className="font-hanken-grotesk font-medium text-sm text-[#1c1b1b] dark:text-[#f4f0ef]">
            {formattedPrice}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "CATALOG STATUS",
      className: "w-32",
      render: (product) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase border ${
            product.isActive !== false
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-500/20"
          }`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {product.isActive !== false ? "Active" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      title="PRODUCTS"
      subtitle="Manage your architectural natural stone surfaces, monolithic porcelain catalog, and hardware inventory."
      searchPlaceholder="Search products by name, brand, or specification..."
      addItemLabel="Add Product"
      columns={columns}
      data={CATALOG_PRODUCTS}
      categoriesFilter={categoryFilters}
      itemsPerPage={8}
      onAddItem={() => alert("Add Product Modal Triggered")}
    />
  );
}
