"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ColumnDef<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T, index: number) => React.ReactNode;
}

export interface AdminDataTableProps<T extends { _id: string; name: string }> {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  addItemLabel: string;
  onAddItem?: () => void;
  onEditItem?: (item: T) => void;
  onDeleteItem?: (item: T) => void;
  columns: ColumnDef<T>[];
  data: T[];
  categoriesFilter?: { label: string; value: string }[];
  itemsPerPage?: number;
}

export function AdminDataTable<T extends { _id: string; name: string }>({
  title,
  subtitle,
  searchPlaceholder = "Search items...",
  addItemLabel,
  onAddItem,
  onEditItem,
  onDeleteItem,
  columns,
  data,
  categoriesFilter = [],
  itemsPerPage = 5,
}: AdminDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"NEWEST" | "NAME_ASC" | "NAME_DESC">("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesOther = JSON.stringify(item).toLowerCase().includes(query);
        if (!matchesName && !matchesOther) return false;
      }
      // 2. Category Filter
      if (selectedCategory !== "ALL") {
        const categoryMatch = (item as unknown as Record<string, unknown>).categorySlug === selectedCategory ||
          (item as unknown as Record<string, unknown>).category === selectedCategory;
        if (!categoryMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "NAME_ASC") return a.name.localeCompare(b.name);
      if (sortBy === "NAME_DESC") return b.name.localeCompare(a.name);
      return 0; // Default NEWEST
    });
  }, [data, searchQuery, selectedCategory, sortBy]);

  // Pagination Math
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentRangeStart = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const currentRangeEnd = Math.min(currentPage * itemsPerPage, filteredData.length);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Checkbox Selection Logic
  const allSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.includes(item._id));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedData.some((p) => p._id === id)));
    } else {
      const currentPageIds = paginatedData.map((p) => p._id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="w-full flex flex-col gap-8 text-left animate-fadeIn">
      
      {/* 01. PAGE HEADER */}
      <section className="flex flex-col gap-2 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-6">
        <h1 className="font-raleway text-[42px] sm:text-[48px] font-light uppercase tracking-tight text-[#1c1b1b] dark:text-[#f4f0ef]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body-lg text-body-lg text-[#5d5f5f] dark:text-[#8e8e8e] max-w-2xl">
            {subtitle}
          </p>
        )}
      </section>

      {/* 02. SEARCH & TOOLS TOOLBAR */}
      <section className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pb-4 border-b border-[#c4c7c7]/40 dark:border-[#2e2e2e]">
        
        {/* Search Bar Input */}
        <div className="w-full sm:w-1/2 max-w-md relative group">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5d5f5f] dark:text-[#8e8e8e] group-focus-within:text-[#1c1b1b] dark:group-focus-within:text-[#f4f0ef] transition-colors" strokeWidth={1.75} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg font-body-md text-body-md text-[#1c1b1b] dark:text-[#f4f0ef] focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors placeholder:text-[#5d5f5f] dark:placeholder:text-[#8e8e8e]"
          />
        </div>

        {/* Toolbar Buttons: Filter & Sort */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {categoriesFilter.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                className="flex items-center gap-2 px-4 py-3 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] transition-colors bg-[#f7f3f2]/40 dark:bg-[#181818] cursor-pointer"
              >
                <SlidersHorizontal className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" strokeWidth={1.75} />
                <span className="font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef]">
                  {selectedCategory === "ALL" ? "FILTERS" : `FILTER: ${selectedCategory}`}
                </span>
              </button>

              {showFiltersDrawer && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fdf8f8] dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-xl shadow-xl p-2 z-50 animate-fadeIn font-label-caps text-label-caps uppercase text-xs space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setShowFiltersDrawer(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "ALL"
                        ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold"
                        : "hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#1c1b1b] dark:text-[#f4f0ef]"
                    }`}
                  >
                    All Categories
                  </button>
                  {categoriesFilter.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setShowFiltersDrawer(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.value
                          ? "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212] font-semibold"
                          : "hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#1c1b1b] dark:text-[#f4f0ef]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "NEWEST" | "NAME_ASC" | "NAME_DESC")}
              className="appearance-none flex items-center gap-2 pl-4 pr-8 py-3 bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] transition-colors font-label-caps text-label-caps uppercase text-[#1c1b1b] dark:text-[#f4f0ef] cursor-pointer focus:outline-none"
            >
              <option value="NEWEST">SORT BY: NEWEST</option>
              <option value="NAME_ASC">SORT BY: NAME (A-Z)</option>
              <option value="NAME_DESC">SORT BY: NAME (Z-A)</option>
            </select>
            <ChevronDown className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </section>

      {/* 03. STATS & ACTION BAR */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-widest">
          {filteredData.length} {filteredData.length === 1 ? "ITEM" : "ITEMS"} FOUND
          {selectedIds.length > 0 && (
            <span className="ml-3 text-emerald-600 dark:text-emerald-400 font-semibold">
              ({selectedIds.length} SELECTED)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="md"
              icon={Trash2}
              onClick={() => {
                setSelectedIds([]);
              }}
              className="rounded-lg border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
            >
              DELETE ({selectedIds.length})
            </Button>
          )}

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            iconPosition="left"
            onClick={onAddItem}
            className="rounded-lg px-6 py-3 tracking-widest uppercase"
          >
            {addItemLabel}
          </Button>
        </div>
      </section>

      {/* 04. DATA TABLE CANVAS */}
      <section className="w-full overflow-x-auto border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl bg-[#fdf8f8] dark:bg-[#121212] shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#1c1b1b] dark:border-[#f4f0ef] bg-[#f7f3f2]/60 dark:bg-[#181818] font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider">
              <th className="w-12 py-4 px-4 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="size-4 rounded-sm border-[#c4c7c7] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef] focus:ring-0 cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className={`py-4 px-4 font-semibold ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
              <th className="w-16 py-4 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#c4c7c7]/20 dark:divide-[#2e2e2e]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-12 text-center text-[#5d5f5f] dark:text-[#8e8e8e]">
                  No items found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => {
                const isSelected = selectedIds.includes(item._id);
                return (
                  <tr
                    key={item._id}
                    className={`group transition-colors duration-200 ${
                      isSelected
                        ? "bg-[#f1edec] dark:bg-[#222222]"
                        : "hover:bg-[#f7f3f2]/60 dark:hover:bg-[#181818]"
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item._id)}
                        className="size-4 rounded-sm border-[#c4c7c7] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef] focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {columns.map((col) => (
                      <td key={col.key} className={`py-4 px-4 ${col.className || ""}`}>
                        {col.render(item, idx)}
                      </td>
                    ))}

                    {/* Action Dropdown Column */}
                    <td className="py-4 px-4 text-center relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === item._id ? null : item._id)}
                        className="p-2 text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreVertical className="size-4" />
                      </button>

                      {activeMenuId === item._id && (
                        <div className="absolute right-4 mt-1 w-44 bg-[#fdf8f8] dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-xl shadow-xl p-2 z-50 animate-fadeIn text-left font-label-caps text-label-caps uppercase text-xs space-y-1">
                          <button
                            onClick={() => {
                              onEditItem?.(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg transition-colors text-[#1c1b1b] dark:text-[#f4f0ef]"
                          >
                            <Edit2 className="size-3.5" />
                            <span>Edit Item</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg transition-colors text-[#1c1b1b] dark:text-[#f4f0ef]"
                          >
                            <Copy className="size-3.5" />
                            <span>Duplicate</span>
                          </button>
                          <button
                            onClick={() => {
                              onDeleteItem?.(item);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {/* 05. PAGINATION FOOTER */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2 text-[#5d5f5f] dark:text-[#8e8e8e]">
        <div className="font-body-md text-sm">
          Showing <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">{currentRangeStart}–{currentRangeEnd}</span> of{" "}
          <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">{filteredData.length}</span> items
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 rounded-lg border border-[#c4c7c7]/30 dark:border-[#2e2e2e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#1c1b1b] dark:text-[#f4f0ef] transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1 font-label-caps text-label-caps">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-[#1c1b1b] !text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] font-semibold shadow-xs"
                    : "hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#5d5f5f] dark:text-[#8e8e8e] dark:hover:text-[#f4f0ef]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="p-2 rounded-lg border border-[#c4c7c7]/30 dark:border-[#2e2e2e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#1c1b1b] dark:text-[#f4f0ef] transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
