"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, CatalogProduct } from "@/lib/catalogData";

export default function ProductsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("NEWEST");
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
    <main className="max-w-container-max mx-auto px-gutter md:px-margin-desktop py-12 md:py-24 bg-background text-on-surface antialiased selection:bg-surface-variant selection:text-on-surface">
      {/* Header & Search */}
      <header className="mb-16">
        <div className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase">
          <Link className="hover:text-primary transition-colors" href="/">HOME</Link> /{" "}
          <span className="text-primary">PRODUCTS</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-secondary/20 pb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">PRODUCTS</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Explore the complete Decorium catalog of surfaces, fittings, and bespoke furniture.
            </p>
          </div>
        </div>

        <div className="relative w-full border border-secondary/30 rounded focus-within:border-primary transition-colors bg-white">
          <input
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-3 font-nav-link text-nav-link uppercase placeholder-on-surface-variant/50"
            placeholder="SEARCH PRODUCTS"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant size-5" />
        </div>
      </header>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="md:col-span-3 border-r border-secondary/20 pr-8 hidden md:block">
          <div className="flex justify-between items-end border-b border-secondary/20 pb-2 mb-8">
            <h2 className="font-label-caps text-label-caps text-primary uppercase">FILTERS</h2>
            {(selectedCategories.length > 0 || selectedBrand || searchQuery || featuredOnly) && (
              <button
                onClick={handleResetFilters}
                className="font-label-caps text-[10px] text-secondary hover:text-primary underline uppercase transition-colors pb-0.5"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Checkboxes */}
          <div className="mb-8">
            <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">CATEGORY</h3>
            <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedCategories.length === 0}
                  onChange={() => {
                    setSelectedCategories([]);
                    setMaxPrice(300000);
                    setCurrentPage(1);
                  }}
                  className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary focus:ring-offset-0 bg-transparent group-hover:border-primary transition-colors"
                  type="checkbox"
                />
                <span className={selectedCategories.length === 0 ? "text-primary font-medium" : "group-hover:text-primary transition-colors"}>
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
                      className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary focus:ring-offset-0 bg-transparent group-hover:border-primary transition-colors"
                      type="checkbox"
                    />
                    <span className={isChecked ? "text-primary font-medium" : "group-hover:text-primary transition-colors"}>
                      {category.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-8 border-t border-secondary/20 pt-8">
            <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">PRICE RANGE</h3>
            <div className="relative pt-4">
              <input
                className="w-full h-0.5 bg-secondary/30 appearance-none rounded outline-none cursor-pointer accent-primary"
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
              <div className="flex justify-between mt-4 font-body-md text-body-md text-on-surface-variant">
                <span>{isUSDOnly ? "$0" : "₹0"}</span>
                <span className="font-semibold text-primary">
                  Max: {isUSDOnly ? `$${maxPrice.toLocaleString()}` : `₹${maxPrice.toLocaleString("en-IN")}`}
                </span>
              </div>
            </div>
          </div>

          {/* Brand Dropdown Filter */}
          <div className="mb-8 border-t border-secondary/20 pt-8">
            <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">BRAND</h3>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border border-secondary/30 rounded px-4 py-2.5 font-label-caps text-label-caps uppercase text-primary focus:ring-primary focus:border-primary outline-none cursor-pointer w-full"
            >
              <option value="">All Brands & Quarries</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Selection Filter */}
          <div className="mb-8 border-t border-secondary/20 pt-8">
            <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">SELECTION</h3>
            <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={featuredOnly}
                  onChange={(e) => {
                    setFeaturedOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary focus:ring-offset-0 bg-transparent group-hover:border-primary transition-colors"
                  type="checkbox"
                />
                <span className={featuredOnly ? "text-primary font-medium" : "group-hover:text-primary transition-colors"}>
                  Featured Only
                </span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="md:col-span-9">
          
          {/* Grid Controls */}
          <div className="flex justify-between items-center mb-8 border-b border-secondary/20 pb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              SHOWING {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} OF {filteredProducts.length} PRODUCTS
            </span>
            
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-1.5 border border-secondary/30 rounded px-3 py-1.5 font-label-caps text-label-caps uppercase text-primary hover:bg-surface-variant transition-colors"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-secondary/30 rounded px-4 py-2 font-label-caps text-label-caps uppercase text-primary focus:ring-primary focus:border-primary outline-none cursor-pointer"
              >
                <option value="NEWEST">SORT: NEWEST</option>
                <option value="PRICE_ASC">SORT: PRICE (LOW-HIGH)</option>
                <option value="PRICE_DESC">SORT: PRICE (HIGH-LOW)</option>
              </select>
            </div>
          </div>

          {/* Grid Layout (4 columns on desktop match reference) */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {paginatedProducts.map((product, index) => (
                <div key={product._id} className="group flex flex-col h-full">
                  {/* Image Link Frame */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full aspect-[4/5] bg-surface-container-low rounded-lg mb-4 overflow-hidden border border-secondary/10 relative block cursor-pointer"
                  >
                    <Image
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      src={product.coverImage}
                      priority={index < 4} // Load top-row cards instantly
                    />
                  </Link>
                  
                  {/* Product Text info */}
                  <h4 className="font-headline-md text-body-lg text-primary mb-1 truncate uppercase">
                    {product.name}
                  </h4>
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 uppercase tracking-widest">
                    {product.brand || product.categoryName}
                  </p>
                  <p className="font-nav-link text-nav-link text-on-surface-variant mb-4">
                    {getFormattedPrice(product)}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center border border-secondary/30 rounded-lg py-2 font-label-caps text-label-caps text-primary hover:bg-surface-variant transition-colors uppercase cursor-pointer"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-secondary/30 rounded bg-white/40">
              <span className="font-headline-md text-primary uppercase tracking-wider mb-2">No Products Found</span>
              <p className="font-body-md text-on-surface-variant mb-6 max-w-sm">
                No items match your active filters. Try adjusting your search query, price limit, or category checkboxes.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase rounded transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls (Bracketed Page numbers match reference) */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-secondary/20 flex justify-center items-center gap-4 font-nav-link text-nav-link">
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
                    className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                      isCurrent
                        ? "text-primary font-bold border border-primary/20"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-variant"
                    }`}
                  >
                    {isCurrent ? `[ ${pageNum} ]` : pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay & Container */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-xs h-full bg-background shadow-xl p-6 overflow-y-auto flex flex-col animate-slide-in-right z-10 border-l border-secondary/20 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-secondary/20 mb-6">
              <h2 className="font-label-caps text-label-caps text-primary uppercase">FILTERS</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-primary hover:text-secondary p-1 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">CATEGORY</h3>
              <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={selectedCategories.length === 0}
                    onChange={() => {
                      setSelectedCategories([]);
                      setMaxPrice(300000);
                      setCurrentPage(1);
                    }}
                    className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary bg-transparent"
                    type="checkbox"
                  />
                  <span className={selectedCategories.length === 0 ? "text-primary font-medium" : ""}>
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
                        className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary bg-transparent"
                        type="checkbox"
                      />
                      <span className={isChecked ? "text-primary font-medium" : ""}>
                        {category.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-8 border-t border-secondary/20 pt-6">
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">PRICE RANGE</h3>
              <input
                className="w-full h-0.5 bg-secondary/30 appearance-none rounded cursor-pointer accent-primary"
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
              <div className="flex justify-between mt-3 font-body-md text-body-md text-on-surface-variant">
                <span>{isUSDOnly ? "$0" : "₹0"}</span>
                <span className="font-semibold text-primary">
                  Max: {isUSDOnly ? `$${maxPrice.toLocaleString()}` : `₹${maxPrice.toLocaleString("en-IN")}`}
                </span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-8 border-t border-secondary/20 pt-6">
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">BRAND</h3>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border border-secondary/30 rounded px-3 py-2 font-label-caps text-label-caps uppercase text-primary focus:outline-none w-full"
              >
                <option value="">All Brands & Quarries</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Only check */}
            <div className="mb-8 border-t border-secondary/20 pt-6">
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase">SELECTION</h3>
              <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="form-checkbox text-primary rounded-sm border-secondary/50 focus:ring-primary bg-transparent"
                    type="checkbox"
                  />
                  <span className={featuredOnly ? "text-primary font-medium" : ""}>
                    Featured Only
                  </span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-secondary/20 flex flex-col gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase rounded transition-colors"
              >
                Apply Filters
              </button>
              {(selectedCategories.length > 0 || selectedBrand || searchQuery || featuredOnly) && (
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-3 border border-secondary/30 text-primary font-label-caps text-label-caps uppercase rounded hover:bg-surface-container transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
