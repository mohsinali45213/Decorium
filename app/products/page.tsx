"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowRight,
  ChevronDown,
  Check,
  Grid,
  List as ListIcon,
  RotateCcw,
  Sparkles,
  Globe,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { LuxuryDropdown } from "@/components/ui/LuxuryDropdown";
import { SearchBar } from "@/components/ui/SearchBar";
import { LUXURY_TRANSITION } from "@/lib/motionConfig";
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, CatalogProduct } from "@/lib/catalogData";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearchParam = searchParams?.get("search") || "";
  const initialCategoryParam = searchParams?.get("category") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("All Origins");
  const [selectedFinish, setSelectedFinish] = useState<string>("All Finishes");
  const [selectedColor, setSelectedColor] = useState<string>("All Colors");
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("PRICE_ASC");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mobile & Desktop Floating Filter Drawer
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialSearchParam) {
      setSearchQuery(initialSearchParam);
    }
  }, [initialSearchParam]);

  useEffect(() => {
    if (initialCategoryParam) {
      setSelectedCategory(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  // Extract unique origins from product data
  const uniqueOrigins = useMemo(() => {
    const origins = CATALOG_PRODUCTS.map((p) => p.origin).filter(Boolean);
    return ["All Origins", ...Array.from(new Set(origins))] as string[];
  }, []);

  const finishOptions = [
    "All Finishes",
    "Polished",
    "Honed",
    "Leathered",
    "Flamed",
    "Brushed",
  ];

  const colorOptions = [
    { name: "All Colors", bg: "bg-white border-[#c4c7c7]/65 dark:border-[#2e2e2e]" },
    { name: "Beige", bg: "bg-[#f5f5dc] border-[#c4c7c7]/65 dark:border-[#2e2e2e]" },
    { name: "Light Gray", bg: "bg-[#e0e0e0] border-[#c4c7c7]/65 dark:border-[#2e2e2e]" },
    { name: "Gray", bg: "bg-[#a9a9a9] border-[#c4c7c7]/65 dark:border-[#2e2e2e]" },
    { name: "Dark Gray", bg: "bg-[#696969] border-[#c4c7c7]/65 dark:border-[#2e2e2e]" },
    { name: "Black", bg: "bg-black border-black" },
  ];

  const sortOptions = [
    { value: "PRICE_ASC", label: "SORT: PRICE (LOW → HIGH)" },
    { value: "PRICE_DESC", label: "SORT: PRICE (HIGH → LOW)" },
    { value: "NEWEST", label: "SORT: NEWEST" },
    { value: "NAME_ASC", label: "SORT: POPULAR" },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query) || false;
        const matchesOrigin = product.origin?.toLowerCase().includes(query) || false;
        const matchesSpec = product.spec.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesOrigin && !matchesSpec) {
          return false;
        }
      }

      // 2. Category Match
      if (selectedCategory && selectedCategory !== "All Categories" && selectedCategory !== "") {
        if (product.categorySlug !== selectedCategory) return false;
      }

      // 3. Origin Match
      if (selectedOrigin && selectedOrigin !== "All Origins") {
        if (product.origin !== selectedOrigin) return false;
      }

      // 4. Finish Match
      if (selectedFinish && selectedFinish !== "All Finishes") {
        const finishStr = (product.variants?.[0]?.finish || product.spec).toLowerCase();
        if (!finishStr.includes(selectedFinish.toLowerCase())) return false;
      }

      // 5. Color Match
      if (selectedColor && selectedColor !== "All Colors") {
        const textToSearch = `${product.name} ${product.description}`.toLowerCase();
        if (!textToSearch.includes(selectedColor.toLowerCase())) return false;
      }

      // 6. Featured Only
      if (featuredOnly && !product.isFeatured) return false;

      // 7. Price Filter
      const primaryVariant = product.variants?.[0];
      if (primaryVariant && primaryVariant.price) {
        const isUSD = ["marble", "tiles", "hardware"].includes(product.categorySlug);
        const normalizedPrice = isUSD ? primaryVariant.price * 85 : primaryVariant.price;
        if (normalizedPrice > maxPrice) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants?.[0]?.price || 0;
      const priceB = b.variants?.[0]?.price || 0;
      const isUSDA = ["marble", "tiles", "hardware"].includes(a.categorySlug);
      const isUSDB = ["marble", "tiles", "hardware"].includes(b.categorySlug);
      const normA = isUSDA ? priceA * 85 : priceA;
      const normB = isUSDB ? priceB * 85 : priceB;

      if (sortBy === "PRICE_ASC") return normA - normB;
      if (sortBy === "PRICE_DESC") return normB - normA;
      if (sortBy === "NAME_ASC") return a.name.localeCompare(b.name);
      return a._id.localeCompare(b._id);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedOrigin,
    selectedFinish,
    selectedColor,
    featuredOnly,
    maxPrice,
    sortBy,
  ]);

  // Pagination (6 items per page for active multi-page pagination)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedOrigin("All Origins");
    setSelectedFinish("All Finishes");
    setSelectedColor("All Colors");
    setSearchQuery("");
    setFeaturedOnly(false);
    setMaxPrice(300000);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    (selectedCategory !== "" && selectedCategory !== "All Categories") ||
    selectedOrigin !== "All Origins" ||
    selectedFinish !== "All Finishes" ||
    selectedColor !== "All Colors" ||
    featuredOnly ||
    searchQuery !== "" ||
    maxPrice < 300000;

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

  // Collapsible Filter Accordions State (Closed by default for clean initial view)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: false,
    origin: false,
    finish: false,
    color: false,
    price: false,
    curation: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Reusable Sidebar Component matching Homepage Typography & Unified Button System
  const SidebarFilterContent = (
    <div className="space-y-4 text-left">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#c4c7c7]/65 dark:border-[#2e2e2e]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4.5 text-[#1c1b1b] dark:text-[#f4f0ef]" />
          <h2 className="font-raleway text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold uppercase tracking-wider">
            Filters
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-[10px] tracking-widest text-[#5d5f5f] hover:text-red-600 dark:hover:text-red-400 p-0 h-auto"
            >
              RESET
            </Button>
          )}
          <button
            type="button"
            onClick={() => setIsFiltersOpen(false)}
            className="p-1 rounded-md text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Category Section - Custom Accordion Dropdown */}
      <div className="pb-3 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]/60">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest cursor-pointer group py-1.5"
        >
          <span className="flex items-center gap-2">
            <Layers className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" />
            Category
          </span>
          <ChevronDown className={`size-4 text-[#5d5f5f] dark:text-[#8e8e8e] transition-transform duration-300 ${openSections.category ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {openSections.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={LUXURY_TRANSITION}
              className="mt-2.5 space-y-1.5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className={`w-full px-3.5 py-2.5 text-left font-label-caps text-[11px] uppercase tracking-wider rounded-md flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  !selectedCategory || selectedCategory === "All Categories"
                    ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold shadow-xs"
                    : "text-[#5d5f5f] dark:text-[#a0a0a0] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
                }`}
              >
                <span className="truncate">All Categories</span>
                {(!selectedCategory || selectedCategory === "All Categories") && <Check className="size-3.5 shrink-0" />}
              </button>
              {CATALOG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setCurrentPage(1);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left font-label-caps text-[11px] uppercase tracking-wider rounded-md flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold shadow-xs"
                        : "text-[#5d5f5f] dark:text-[#a0a0a0] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {isSelected && <Check className="size-3.5 shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Origin Section - Custom Accordion Dropdown */}
      <div className="pb-3 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]/60">
        <button
          type="button"
          onClick={() => toggleSection("origin")}
          className="flex items-center justify-between w-full text-left font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest cursor-pointer group py-1.5"
        >
          <span className="flex items-center gap-2">
            <Globe className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" />
            Origin
          </span>
          <ChevronDown className={`size-4 text-[#5d5f5f] dark:text-[#8e8e8e] transition-transform duration-300 ${openSections.origin ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {openSections.origin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={LUXURY_TRANSITION}
              className="mt-2.5 space-y-1.5 overflow-hidden"
            >
              {uniqueOrigins.map((orig) => {
                const isSelected = selectedOrigin === orig;
                return (
                  <button
                    key={orig}
                    type="button"
                    onClick={() => {
                      setSelectedOrigin(orig);
                      setCurrentPage(1);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left font-label-caps text-[11px] uppercase tracking-wider rounded-md flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold shadow-xs"
                        : "text-[#5d5f5f] dark:text-[#a0a0a0] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
                    }`}
                  >
                    <span className="truncate">{orig}</span>
                    {isSelected && <Check className="size-3.5 shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 03. Finish Section */}
      <div className="pb-3 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]/60">
        <button
          type="button"
          onClick={() => toggleSection("finish")}
          className="flex items-center justify-between w-full text-left font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest cursor-pointer group py-1.5"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" />
            Finish
          </span>
          <ChevronDown className={`size-4 text-[#5d5f5f] dark:text-[#8e8e8e] transition-transform duration-300 ${openSections.finish ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSections.finish && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={LUXURY_TRANSITION}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 mt-2.5">
                {finishOptions.map((finish) => {
                  const isSelected = selectedFinish === finish;
                  return (
                    <button
                      key={finish}
                      onClick={() => {
                        setSelectedFinish(finish);
                        setCurrentPage(1);
                      }}
                      className={`py-2.5 px-3 font-label-caps text-label-caps-sm uppercase tracking-wider rounded-md transition-all duration-300 border text-center cursor-pointer ${
                        isSelected
                          ? "bg-[#1c1b1b] dark:bg-[#f4f0ef] text-white dark:text-[#121212] border-[#1c1b1b] dark:border-[#f4f0ef] font-semibold shadow-xs"
                          : "bg-white dark:bg-[#181818] text-[#5d5f5f] dark:text-[#8e8e8e] border-[#c4c7c7]/65 dark:border-[#2e2e2e] hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
                      }`}
                    >
                      {finish}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 04. Color Section */}
      <div className="pb-3 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]/60">
        <button
          type="button"
          onClick={() => toggleSection("color")}
          className="flex items-center justify-between w-full text-left font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest cursor-pointer group py-1.5"
        >
          <span className="flex items-center gap-2">
            <Sliders className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" />
            Color
          </span>
          <ChevronDown className={`size-4 text-[#5d5f5f] dark:text-[#8e8e8e] transition-transform duration-300 ${openSections.color ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSections.color && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={LUXURY_TRANSITION}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 flex-wrap mt-2.5 py-2 px-2.5">
                {colorOptions.map((c) => {
                  const isSelected = selectedColor === c.name;
                  const isDarkColor = c.name === "Black" || c.name === "Dark Gray";
                  return (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      aria-label={c.name}
                      onClick={() => {
                        setSelectedColor(isSelected && c.name !== "All Colors" ? "All Colors" : c.name);
                        setCurrentPage(1);
                      }}
                      className={`size-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative ${c.bg} ${
                        isSelected
                          ? "border-2 border-[#1c1b1b] dark:border-[#f4f0ef] ring-2 ring-[#1c1b1b]/30 dark:ring-[#f4f0ef]/30 scale-105 shadow-xs"
                          : "hover:scale-105 opacity-85 hover:opacity-100"
                      }`}
                    >
                      {isSelected ? (
                        <Check className={`size-3.5 ${isDarkColor ? "text-white" : "text-[#1c1b1b]"}`} />
                      ) : c.name === "All Colors" ? (
                        <span className="text-[9px] font-semibold text-[#5d5f5f] dark:text-[#8e8e8e]">ALL</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 06. Price Range Section */}
      <div className="pb-3">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-label-caps text-label-caps text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-widest cursor-pointer group py-1.5"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] group-hover:text-[#1c1b1b] dark:group-hover:text-[#f4f0ef] transition-colors" />
            Price Range
          </span>
          <ChevronDown className={`size-4 text-[#5d5f5f] dark:text-[#8e8e8e] transition-transform duration-300 ${openSections.price ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSections.price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={LUXURY_TRANSITION}
              className="overflow-hidden"
            >
              <div className="px-1 mt-2.5 py-1">
                <div className="flex justify-between font-mono text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mb-2.5">
                  <span>₹0</span>
                  <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#1c1b1b] dark:accent-[#f4f0ef] cursor-pointer h-2"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdf8f8] dark:bg-[#121212] text-[#1c1b1b] dark:text-[#f4f0ef] font-hanken-grotesk antialiased flex flex-col pt-20">
      
      {/* ========================================================================= */}
      {/* MAIN CONTENT SPLIT LAYOUT                                                 */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* MAIN CONTENT SPLIT LAYOUT                                                 */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* MAIN CONTENT SPLIT LAYOUT                                                 */}
      {/* ========================================================================= */}
      <main className="flex-grow flex flex-col w-full max-w-[1920px] mx-auto bg-[#fdf8f8] dark:bg-[#121212]">

        {/* Desktop Floating Filter Drawer Overlay (Slides in from LEFT) */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden md:flex justify-start"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={LUXURY_TRANSITION}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md h-full bg-[#fdf8f8] dark:bg-[#121212] flex flex-col shadow-2xl border-r border-[#c4c7c7]/65 dark:border-[#2e2e2e]"
              >
                {/* Scrollable Filter Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                  {SidebarFilterContent}
                </div>

                {/* Drawer Fixed Bottom Action Bar */}
                <div className="p-4 bg-[#fdf8f8] dark:bg-[#121212] border-t border-[#c4c7c7]/65 dark:border-[#2e2e2e] flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                    className="flex-1 whitespace-nowrap py-3 text-[11px] tracking-wider"
                  >
                    CLEAR ALL
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsFiltersOpen(false)}
                    className="flex-1 whitespace-nowrap py-3 text-[11px] tracking-wider"
                  >
                    APPLY FILTERS
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Full-Page Filter Drawer Overlay (Slides in from LEFT to RIGHT) */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-[#fdf8f8] dark:bg-[#121212] flex justify-start md:hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={LUXURY_TRANSITION}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full bg-[#fdf8f8] dark:bg-[#121212] flex flex-col"
              >
                {/* Scrollable Filter Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                  {SidebarFilterContent}
                </div>

                {/* Drawer Fixed Bottom Action Bar */}
                <div className="p-4 bg-[#fdf8f8] dark:bg-[#121212] border-t border-[#c4c7c7]/65 dark:border-[#2e2e2e] flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                    className="flex-1 whitespace-nowrap py-3 text-[11px] tracking-wider"
                  >
                    CLEAR ALL
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsFiltersOpen(false)}
                    className="flex-1 whitespace-nowrap py-3 text-[11px] tracking-wider"
                  >
                    APPLY FILTERS
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col min-h-[calc(100vh-5rem)] overflow-y-auto">
          
          {/* Top Bar */}
          <div className="p-3 md:p-6 lg:p-8 border-b border-[#c4c7c7]/65 dark:border-[#2e2e2e]">
            {/* Single Line Controls Container for Mobile & Desktop */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
              
              {/* Reusable Standalone SearchBar Component */}
              <SearchBar
                value={searchQuery}
                onChange={(val) => {
                  setSearchQuery(val);
                  setCurrentPage(1);
                }}
                placeholder="Search materials..."
              />

              {/* Right Side Controls Group (Sort Dropdown + Grid View + Filters) */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Custom Reusable Luxury Glassmorphic Dropdown */}
                <LuxuryDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={(val) => {
                    setSortBy(val);
                    setCurrentPage(1);
                  }}
                  widthClassName="md:w-48 lg:w-56"
                  icon={ArrowUpDown}
                  align="right"
                  mobileIconOnly
                />

                {/* Grid / List View Toggle (Hidden on Mobile) */}
                <div className="hidden md:flex items-center h-10 border border-[#c4c7c7]/65 dark:border-[#2e2e2e] rounded-md overflow-hidden bg-transparent shrink-0">
                  <button
                    aria-label="Grid View"
                    onClick={() => setViewMode("grid")}
                    className={`h-full px-3 flex items-center justify-center transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212]"
                        : "text-[#5d5f5f] hover:text-[#1c1b1b] dark:text-[#8e8e8e] dark:hover:text-[#f4f0ef]"
                    }`}
                  >
                    <Grid className="size-4" />
                  </button>
                  <button
                    aria-label="List View"
                    onClick={() => setViewMode("list")}
                    className={`h-full px-3 flex items-center justify-center transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212]"
                        : "text-[#5d5f5f] hover:text-[#1c1b1b] dark:text-[#8e8e8e] dark:hover:text-[#f4f0ef]"
                    }`}
                  >
                    <ListIcon className="size-4" />
                  </button>
                </div>

                {/* FILTERS Button (Icon on Mobile, Text + Icon on Desktop - Placed LAST) */}
                <button
                  type="button"
                  onClick={() => setIsFiltersOpen(true)}
                  aria-label="Open Filters"
                  className="h-10 size-10 md:w-auto md:px-4 rounded-md border border-[#c4c7c7]/65 dark:border-[#2e2e2e] btn-luxury btn-luxury-outline flex items-center justify-center gap-2 relative shrink-0 cursor-pointer transition-all duration-300 font-label-caps text-[11px] uppercase tracking-widest"
                >
                  <SlidersHorizontal className="size-4 shrink-0" />
                  <span className="hidden md:inline">FILTERS</span>
                </button>
              </div>

            </div>
          </div>

          {/* Product Grid / List Content */}
          {paginatedProducts.length > 0 ? (
            viewMode === "grid" ? (
              /* GRID VIEW: 2 cards per row on Mobile, 5 cards per row on Desktop */
              <div className="p-3 sm:p-4 md:p-6 lg:p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {paginatedProducts.map((product) => {
                  return (
                    <article
                      key={product._id}
                      className="group border border-[#c4c7c7]/65 dark:border-[#2e2e2e] rounded-md bg-transparent overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 text-left"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] bg-[#f1edec] dark:bg-[#1f1f1f] border-b border-[#c4c7c7]/65 dark:border-[#2e2e2e] overflow-hidden">
                        <Image
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 16vw"
                          src={product.coverImage}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info Details */}
                      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-raleway text-xs sm:text-sm md:text-body-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-normal uppercase tracking-wide truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-0.5 sm:mb-1">
                            <Link href={`/products/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <p className="font-body-md text-xs sm:text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] mb-1 sm:mb-2 font-mono">
                            {getFormattedPrice(product)}
                          </p>
                          <span className="font-label-caps text-[9px] sm:text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider block mb-2 sm:mb-4 truncate">
                            {product.origin || "Italy"} · {product.variants?.[0]?.finish || product.spec || "Polished"}
                          </span>
                        </div>

                        {/* View Details Button */}
                        <Button
                          href={`/products/${product.slug}`}
                          variant="outline"
                          size="sm"
                          showArrow
                          className="w-full mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] tracking-widest py-1.5 sm:py-2.5 px-1.5 sm:px-3"
                        >
                          VIEW DETAILS
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="p-6 md:p-8 flex flex-col gap-6">
                {paginatedProducts.map((product) => {
                  return (
                    <article
                      key={product._id}
                      className="group border border-[#c4c7c7]/65 dark:border-[#2e2e2e] rounded-md bg-transparent overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-300 text-left"
                    >
                      <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-square bg-[#f1edec] dark:bg-[#1f1f1f] border-b sm:border-b-0 sm:border-r border-[#c4c7c7]/65 dark:border-[#2e2e2e] shrink-0 overflow-hidden">
                        <Image
                          alt={product.name}
                          fill
                          sizes="256px"
                          src={product.coverImage}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] uppercase font-normal tracking-wide">
                              <Link href={`/products/${product.slug}`}>
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="font-body-lg text-body-lg font-mono text-[#1c1b1b] dark:text-[#f4f0ef] mb-3">
                            {getFormattedPrice(product)}
                          </p>
                          <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#a0a0a0] mb-4">
                            {product.description}
                          </p>
                          <span className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider block">
                            {product.origin || "Italy"} · {product.variants?.[0]?.finish || product.spec || "Polished"} · 20mm
                          </span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#c4c7c7]/40 dark:border-[#2e2e2e] flex justify-end">
                          <Button
                            href={`/products/${product.slug}`}
                            variant="outline"
                            size="sm"
                            showArrow
                            className="text-[10px] tracking-widest px-6 py-2.5"
                          >
                            VIEW DETAILS
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )
          ) : (
            /* EMPTY STATE */
            <div className="p-12 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-raleway text-headline-md text-[#1c1b1b] dark:text-[#f4f0ef] uppercase mb-2">No Stone Specimen Found</h3>
              <p className="font-body-md text-body-md text-[#5d5f5f] dark:text-[#8e8e8e] mb-6">
                No items match your active search filters. Try clearing filters or entering a different search term.
              </p>
              <Button variant="primary" size="md" onClick={handleResetFilters}>
                RESET FILTERS
              </Button>
            </div>
          )}

          {/* Reusable Standalone Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemLabel="SPECIMENS"
          />
        </section>
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdf8f8] dark:bg-[#121212]" />}>
      <ProductsContent />
    </Suspense>
  );
}
