"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, SlidersHorizontal, ArrowRight, Grid3X3, LayoutGrid, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, CatalogProduct } from "@/lib/catalogData";
import { LUXURY_TRANSITION, LUXURY_EASE_CSS } from "@/lib/motionConfig";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearchParam = searchParams?.get("search") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchParam);

  useEffect(() => {
    if (initialSearchParam) {
      setSearchQuery(initialSearchParam);
    }
  }, [initialSearchParam]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("NEWEST");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mobile Filter Drawer Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands for filtering
  const uniqueBrands = useMemo(() => {
    const brands = CATALOG_PRODUCTS.map((p) => p.brand).filter(Boolean);
    return Array.from(new Set(brands)) as string[];
  }, []);

  // Determine if the currently filtered set is USD-only
  const isUSDOnly = useMemo(() => {
    if (selectedCategories.length === 0) return false;
    return selectedCategories.every((cat) => ["marble", "tiles", "hardware"].includes(cat));
  }, [selectedCategories]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      // 1. Search Query Match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesDesc && !matchesBrand) return false;
      }

      // 2. Category Match
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.categorySlug)) return false;
      }

      // 3. Brand Match
      if (selectedBrand) {
        if (product.brand !== selectedBrand) return false;
      }

      // 4. Featured Only Match
      if (featuredOnly) {
        if (!product.isFeatured) return false;
      }

      // 5. Price Match
      const primaryVariant = product.variants?.[0];
      if (primaryVariant && primaryVariant.price) {
        if (isUSDOnly) {
          if (primaryVariant.price > maxPrice) return false;
        } else {
          const isUSD = ["marble", "tiles", "hardware"].includes(product.categorySlug);
          const normalizedPrice = isUSD ? primaryVariant.price * 85 : primaryVariant.price;
          if (normalizedPrice > maxPrice) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants?.[0]?.price || 0;
      const priceB = b.variants?.[0]?.price || 0;

      const normA = ["marble", "tiles", "hardware"].includes(a.categorySlug) ? priceA * 85 : priceA;
      const normB = ["marble", "tiles", "hardware"].includes(b.categorySlug) ? priceB * 85 : priceB;

      if (sortBy === "PRICE_ASC") {
        return normA - normB;
      }
      if (sortBy === "PRICE_DESC") {
        return normB - normA;
      }
      return a._id.localeCompare(b._id);
    });
  }, [searchQuery, selectedCategories, selectedBrand, featuredOnly, maxPrice, isUSDOnly, sortBy]);

  // Pagination Parameters
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Helper to format price
  const getFormattedPrice = (product: CatalogProduct) => {
    const primaryVariant = product.variants?.[0];
    if (!primaryVariant || !primaryVariant.showPriceOnWebsite || !primaryVariant.price) {
      return "Price on Request";
    }

    if (primaryVariant.price > 5000) {
      return `₹${primaryVariant.price.toLocaleString("en-IN")}${primaryVariant.unit ? ` / ${primaryVariant.unit}` : ""}`;
    } else {
      return `$${primaryVariant.price.toLocaleString("en-US")}${primaryVariant.unit ? ` / ${primaryVariant.unit}` : ""}`;
    }
  };

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) => {
      const nextCategories = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      const nextIsUSDOnly = nextCategories.length > 0 && nextCategories.every((cat) => ["marble", "tiles", "hardware"].includes(cat));
      setMaxPrice(nextIsUSDOnly ? 2000 : 300000);
      return nextCategories;
    });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand("");
    setSearchQuery("");
    setFeaturedOnly(false);
    setMaxPrice(300000);
    setCurrentPage(1);
  };

  return (
    <main className="max-w-[1600px] mx-auto px-navbar-px pt-[110px] md:pt-[130px] pb-24 bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] antialiased transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 01. EDITORIAL HEADER & TITLE                                             */}
      {/* ========================================================================= */}
      <header className="mb-10 text-left">
        <Breadcrumbs items={[{ label: "HOME", href: "/" }, { label: "PRODUCTS" }]} className="mb-4" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-8">
          <div>
            <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2 tracking-widest">
              COLLECTION CATALOG & SPECIMENS
            </span>
            <h1 className="font-raleway text-headline-lg font-light text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
              ARCHITECTURAL SURFACES
            </h1>
            <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] max-w-2xl mt-2">
              Direct quarry natural stone slabs, 3200×1600mm continuous porcelain surfaces, artisan bathware, and solid knurled hardware.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Result Pill */}
            <div className="px-4 py-2 rounded-full border border-[#c4c7c7]/40 dark:border-[#2e2e2e] bg-[#f7f3f2]/60 dark:bg-[#181818]/60 font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase">
              {filteredProducts.length} SPECIMENS AVAILABLE
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 02. FAST CATEGORY FILTER CHIPS CAROUSEL                                  */}
      {/* ========================================================================= */}
      <nav aria-label="Category Quick Selector" className="mb-8 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2">
        <button
          onClick={() => {
            setSelectedCategories([]);
            setCurrentPage(1);
          }}
          className={`px-5 py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all duration-300 shrink-0 cursor-pointer ${
            selectedCategories.length === 0
              ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] shadow-xs font-semibold"
              : "border border-[#c4c7c7]/40 dark:border-[#2e2e2e] text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#1f1f1f]"
          }`}
        >
          All Specimen
        </button>

        {CATALOG_CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.slug);
          return (
            <button
              key={cat.slug}
              onClick={() => handleCategoryToggle(cat.slug)}
              className={`px-5 py-2.5 rounded-full font-label-caps text-label-caps uppercase transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] shadow-xs font-semibold"
                  : "border border-[#c4c7c7]/40 dark:border-[#2e2e2e] text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#1f1f1f]"
              }`}
            >
              {isSelected && <Check className="size-3" strokeWidth={2.5} />}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </nav>

      {/* ========================================================================= */}
      {/* 03. TOOLBAR CONTROLS BAR (Search, Sort, Grid Switcher)                    */}
      {/* ========================================================================= */}
      <section className="mb-10 bg-[#f7f3f2]/70 dark:bg-[#181818]/70 border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
        
        {/* Search Input Box */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5d5f5f] dark:text-[#8e8e8e] size-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search stone name, spec, quarry origin..."
            className="w-full pl-10 pr-9 py-2.5 font-hanken-grotesk text-body-sm bg-white dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] placeholder-[#5d5f5f]/60 dark:placeholder-[#8e8e8e]/60 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5d5f5f] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] p-1"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] bg-white dark:bg-[#121212] rounded-lg px-4 py-2.5 font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#1f1f1f] transition-colors"
          >
            <SlidersHorizontal className="size-4" />
            <span>Filters</span>
          </button>

          {/* Desktop Grid Switcher */}
          <div className="hidden lg:flex items-center bg-white dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg p-1 gap-1">
            <button
              onClick={() => setGridCols(3)}
              title="3 Columns Grid"
              className={`p-1.5 rounded transition-colors ${
                gridCols === 3
                  ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212]"
                  : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
              }`}
            >
              <Grid3X3 className="size-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              title="4 Columns Grid"
              className={`p-1.5 rounded transition-colors ${
                gridCols === 4
                  ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212]"
                  : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg px-4 py-2.5 font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] outline-none cursor-pointer transition-colors"
          >
            <option value="NEWEST" className="dark:bg-[#181818]">Sort: Newest Arrival</option>
            <option value="PRICE_ASC" className="dark:bg-[#181818]">Sort: Price (Low to High)</option>
            <option value="PRICE_DESC" className="dark:bg-[#181818]">Sort: Price (High to Low)</option>
          </select>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. MAIN CATALOG GRID (Sidebar + Product Cards)                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="md:col-span-3 border-r border-[#c4c7c7]/30 dark:border-[#2e2e2e] pr-8 hidden md:block text-left select-none">
          <div className="flex justify-between items-end border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-3 mb-6">
            <h2 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-semibold">FILTERS & SPEC</h2>
            {(selectedCategories.length > 0 || selectedBrand || searchQuery || featuredOnly) && (
              <button
                onClick={handleResetFilters}
                className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-black dark:hover:text-white underline uppercase transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Checkboxes */}
          <div className="mb-8">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">CATEGORY</h3>
            <div className="space-y-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0]">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedCategories.length === 0}
                  onChange={() => {
                    setSelectedCategories([]);
                    setMaxPrice(300000);
                    setCurrentPage(1);
                  }}
                  className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent group-hover:border-black dark:group-hover:border-white transition-colors"
                  type="checkbox"
                />
                <span className={selectedCategories.length === 0 ? "text-black dark:text-white font-medium" : "group-hover:text-black dark:group-hover:text-white transition-colors"}>
                  All Categories
                </span>
              </label>

              {CATALOG_CATEGORIES.map((category) => {
                const isChecked = selectedCategories.includes(category.slug);
                return (
                  <label key={category.slug} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(category.slug)}
                      className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent group-hover:border-black dark:group-hover:border-white transition-colors"
                      type="checkbox"
                    />
                    <span className={isChecked ? "text-black dark:text-white font-medium" : "group-hover:text-black dark:group-hover:text-white transition-colors"}>
                      {category.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">MAX PRICE</h3>
            <input
              className="w-full h-1 bg-[#c4c7c7] dark:bg-[#2e2e2e] appearance-none rounded-lg cursor-pointer accent-[#1c1b1b] dark:accent-[#f4f0ef]"
              max={isUSDOnly ? 2000 : 300000}
              min={0}
              step={isUSDOnly ? 50 : 5000}
              type="range"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
            />
            <div className="flex justify-between mt-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#8e8e8e]">
              <span>{isUSDOnly ? "$0" : "₹0"}</span>
              <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">
                Up to {isUSDOnly ? `$${maxPrice.toLocaleString()}` : `₹${maxPrice.toLocaleString("en-IN")}`}
              </span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">QUARRY / BRAND</h3>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg px-3 py-2 font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] focus:outline-none w-full bg-white dark:bg-[#181818] cursor-pointer"
            >
              <option value="" className="dark:bg-[#181818]">All Quarries & Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand} className="dark:bg-[#181818]">
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Selection Checkbox */}
          <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
            <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">CURATION</h3>
            <div className="space-y-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0]">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={featuredOnly}
                  onChange={(e) => {
                    setFeaturedOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent group-hover:border-black dark:group-hover:border-white transition-colors"
                  type="checkbox"
                />
                <span className={featuredOnly ? "text-black dark:text-white font-medium" : "group-hover:text-black dark:group-hover:text-white transition-colors"}>
                  Featured Slabs Only
                </span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="md:col-span-9 text-left">
          
          {paginatedProducts.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              } gap-x-6 gap-y-10`}
            >
              {paginatedProducts.map((product, index) => (
                <div key={product._id} className="group flex flex-col h-full select-none">
                  
                  {/* Image Link Frame */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full aspect-[4/5] bg-[#f1edec] dark:bg-[#181818] rounded-xl mb-4 overflow-hidden border border-[#c4c7c7]/30 dark:border-[#2e2e2e] relative block cursor-pointer group/frame"
                  >
                    <Image
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-700 ease-[0.25,1,0.5,1]"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      src={product.coverImage}
                      priority={index < 4}
                    />

                    {/* Featured / Direct Quarry Badge */}
                    {product.isFeatured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1c1b1b]/80 dark:bg-[#f4f0ef]/90 text-white dark:text-[#121212] font-label-caps text-[9px] uppercase tracking-wider backdrop-blur-xs">
                        Quarry Select
                      </div>
                    )}

                    {/* Hover Explore Indicator */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-black/90 text-[#1c1b1b] dark:text-[#f4f0ef] font-label-caps text-label-caps uppercase tracking-widest shadow-md">
                        View Specimen
                      </span>
                    </div>
                  </Link>
                  
                  {/* Product Metadata Info */}
                  <div className="flex flex-col flex-1 text-left justify-between">
                    <div>
                      {/* Brand & Origin overline */}
                      <span className="font-label-caps text-[10px] text-[#5d5f5f] dark:text-[#8e8e8e] block uppercase mb-1 tracking-wider">
                        {product.brand || product.categoryName} {product.origin ? `· ${product.origin}` : ""}
                      </span>

                      {/* Title */}
                      <h3 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-medium mb-1 line-clamp-1 uppercase group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        <Link href={`/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Spec Line */}
                      <p className="font-body-sm text-[12px] text-[#5d5f5f] dark:text-[#8e8e8e] line-clamp-1 mb-3">
                        {product.spec}
                      </p>
                    </div>

                    {/* Price & Explore Button */}
                    <div className="pt-3 border-t border-[#c4c7c7]/20 dark:border-[#2e2e2e] flex items-center justify-between gap-2 mt-auto">
                      <span className="font-body-md text-sm font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">
                        {getFormattedPrice(product)}
                      </span>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1 font-label-caps text-[11px] uppercase text-[#1c1b1b] dark:text-[#f4f0ef] hover:text-amber-700 dark:hover:text-amber-400 transition-colors group/link"
                      >
                        <span>Details</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-xl bg-white/40 dark:bg-[#181818]/40 p-8">
              <span className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] uppercase mb-2">No Matching Specimen</span>
              <p className="font-body-md text-[#5d5f5f] dark:text-[#8e8e8e] mb-6 max-w-sm">
                No items match your active query or price threshold. Adjust your search parameters or reset filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-[#1c1b1b] dark:bg-[#f4f0ef] text-white dark:text-[#121212] hover:opacity-90 font-label-caps text-label-caps uppercase rounded-lg transition-opacity cursor-pointer shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex justify-center items-center gap-3 font-label-caps text-label-caps">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`size-9 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold shadow-xs"
                        : "text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#1f1f1f]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 05. MOBILE FILTER DRAWER WITH GLOBAL SMOOTHNESS (Framer Motion)           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={LUXURY_TRANSITION}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Drawer Body */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={LUXURY_TRANSITION}
              className="relative w-full max-w-xs h-full bg-[#fdf8f8] dark:bg-[#141414] shadow-2xl p-6 overflow-y-auto flex flex-col z-10 border-l border-[#c4c7c7]/30 dark:border-[#2e2e2e] text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] mb-6">
                <h2 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-semibold">FILTERS & SPEC</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-[#1c1b1b] dark:text-[#f4f0ef] hover:opacity-70 p-1 transition-opacity"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">CATEGORY</h3>
                <div className="space-y-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      checked={selectedCategories.length === 0}
                      onChange={() => {
                        setSelectedCategories([]);
                        setMaxPrice(300000);
                        setCurrentPage(1);
                      }}
                      className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent"
                      type="checkbox"
                    />
                    <span className={selectedCategories.length === 0 ? "text-black dark:text-white font-medium" : ""}>
                      All Categories
                    </span>
                  </label>

                  {CATALOG_CATEGORIES.map((category) => {
                    const isChecked = selectedCategories.includes(category.slug);
                    return (
                      <label key={category.slug} className="flex items-center gap-3 cursor-pointer">
                        <input
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(category.slug)}
                          className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent"
                          type="checkbox"
                        />
                        <span className={isChecked ? "text-black dark:text-white font-medium" : ""}>
                          {category.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price range */}
              <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
                <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">MAX PRICE</h3>
                <input
                  className="w-full h-1 bg-[#c4c7c7] dark:bg-[#2e2e2e] appearance-none rounded-lg cursor-pointer accent-[#1c1b1b] dark:accent-[#f4f0ef]"
                  max={isUSDOnly ? 2000 : 300000}
                  min={0}
                  step={isUSDOnly ? 50 : 5000}
                  type="range"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                />
                <div className="flex justify-between mt-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#8e8e8e]">
                  <span>{isUSDOnly ? "$0" : "₹0"}</span>
                  <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Max: {isUSDOnly ? `$${maxPrice.toLocaleString()}` : `₹${maxPrice.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
                <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">BRAND / QUARRY</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg px-3 py-2 font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] focus:outline-none w-full bg-white dark:bg-[#181818]"
                >
                  <option value="" className="dark:bg-[#181818]">All Quarries & Brands</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand} className="dark:bg-[#181818]">
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Only check */}
              <div className="mb-8 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] pt-6">
                <h3 className="font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] mb-4 uppercase tracking-wider">CURATION</h3>
                <div className="space-y-3 font-body-sm text-body-sm text-[#5d5f5f] dark:text-[#a0a0a0]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      checked={featuredOnly}
                      onChange={(e) => {
                        setFeaturedOnly(e.target.checked);
                        setCurrentPage(1);
                      }}
                      className="form-checkbox text-[#1c1b1b] dark:text-[#f4f0ef] rounded-sm border-[#c4c7c7] dark:border-[#404040] focus:ring-0 bg-transparent"
                      type="checkbox"
                    />
                    <span className={featuredOnly ? "text-black dark:text-white font-medium" : ""}>
                      Featured Slabs Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-auto pt-6 border-t border-[#c4c7c7]/30 dark:border-[#2e2e2e] flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full"
                >
                  Apply Filters
                </Button>
                {(selectedCategories.length > 0 || selectedBrand || searchQuery || featuredOnly) && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      handleResetFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdf8f8] dark:bg-[#121212]" />}>
      <ProductsContent />
    </Suspense>
  );
}
