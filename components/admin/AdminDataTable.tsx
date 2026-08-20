"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Plus,
  Trash2,
  Edit2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface AdminDataTableProps<T extends { _id: string }> {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  addItemLabel?: string;
  columns: ColumnDef<T>[];
  data: T[];
  categoriesFilter?: Array<{ value: string; label: string }>;
  itemsPerPage?: number;
  onAddItem?: () => void;
  onEditItem?: (item: T) => void;
  onDeleteItem?: (item: T) => void;
}

export function AdminDataTable<T extends { _id: string }>({
  title,
  subtitle,
  searchPlaceholder = "Search items by title, code, or status...",
  addItemLabel = "Add Item",
  columns,
  data,
  itemsPerPage = 8,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: AdminDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "NAME_ASC" | "NAME_DESC">("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter & Sort Engine
  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return Object.values(item).some((val) =>
          String(val).toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "NAME_ASC") {
          const nameA = String((a as Record<string, unknown>).name || (a as Record<string, unknown>).title || "").toLowerCase();
          const nameB = String((b as Record<string, unknown>).name || (b as Record<string, unknown>).title || "").toLowerCase();
          return nameA.localeCompare(nameB);
        }
        if (sortOrder === "NAME_DESC") {
          const nameA = String((a as Record<string, unknown>).name || (a as Record<string, unknown>).title || "").toLowerCase();
          const nameB = String((b as Record<string, unknown>).name || (b as Record<string, unknown>).title || "").toLowerCase();
          return nameB.localeCompare(nameA);
        }
        return 0; // Default order
      });
  }, [data, searchQuery, sortOrder]);

  // Pagination Engine
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Selection Handlers
  const allSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.includes(item._id));

  const toggleSelectAll = () => {
    if (allSelected) {
      const pageIds = paginatedData.map((item) => item._id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedData.map((item) => item._id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentRangeStart = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const currentRangeEnd = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 text-left w-full">
      
      {/* 01. HEADER SECTION */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]">
        <div>
          <h1 className="font-raleway text-headline-md sm:text-headline-lg font-light uppercase tracking-wide text-[#1c1b1b] dark:text-[#f4f0ef]">
            {title}
          </h1>
          <p className="font-body-md text-body-sm sm:text-body-md text-[#5d5f5f] dark:text-[#8e8e8e] max-w-2xl mt-1.5 sm:mt-2">
            {subtitle}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="md"
              icon={Trash2}
              onClick={() => setSelectedIds([])}
              className="rounded-lg border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 text-xs py-2.5 px-4"
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
            className="rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 tracking-widest uppercase text-xs sm:text-label-caps"
          >
            {addItemLabel}
          </Button>
        </div>
      </section>

      {/* 02. CONTROLS BAR (SEARCH & SORT) */}
      <section className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="sm:col-span-7 md:col-span-8 lg:col-span-9 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#f7f3f2]/60 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl text-[#1c1b1b] dark:text-[#f4f0ef] placeholder-[#5d5f5f] dark:placeholder-[#8e8e8e] font-body-sm text-xs sm:text-sm focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
          />
        </div>

        {/* Sort Select Dropdown */}
        <div className="sm:col-span-5 md:col-span-4 lg:col-span-3 relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "NEWEST" | "NAME_ASC" | "NAME_DESC")}
            className="w-full pl-4 pr-10 py-2.5 sm:py-3 bg-[#f7f3f2]/60 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl text-[#1c1b1b] dark:text-[#f4f0ef] font-label-caps text-[10px] sm:text-xs uppercase tracking-wider focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] appearance-none cursor-pointer"
          >
            <option value="NEWEST">SORT BY: NEWEST</option>
            <option value="NAME_ASC">SORT BY: NAME (A-Z)</option>
            <option value="NAME_DESC">SORT BY: NAME (Z-A)</option>
          </select>
          <ChevronDown className="size-4 text-[#5d5f5f] dark:text-[#8e8e8e] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </section>

      {/* 03. ELEGANT MOBILE CARD VIEW (Under md screens) */}
      <section className="block md:hidden space-y-4">
        {paginatedData.length === 0 ? (
          <div className="p-8 text-center border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl bg-[#fdf8f8] dark:bg-[#121212] text-[#5d5f5f] dark:text-[#8e8e8e] font-body-sm">
            No items found matching your filters.
          </div>
        ) : (
          paginatedData.map((item, idx) => {
            const isSelected = selectedIds.includes(item._id);
            return (
              <div
                key={item._id}
                className={`p-4.5 rounded-xl border transition-all duration-300 relative space-y-3.5 ${
                  isSelected
                    ? "bg-[#f1edec] dark:bg-[#222222] border-[#1c1b1b] dark:border-[#f4f0ef] shadow-xs"
                    : "bg-[#fdf8f8] dark:bg-[#181818] border-[#c4c7c7]/30 dark:border-[#2e2e2e]"
                }`}
              >
                {/* Mobile Card Top Utility Bar */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(item._id)}
                      className="size-4 rounded-sm border-[#c4c7c7] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-label-caps text-[9px] text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider">
                      SPECIMEN #{idx + 1 + (currentPage - 1) * itemsPerPage}
                    </span>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === item._id ? null : item._id)}
                      className="p-1.5 text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] rounded-lg cursor-pointer transition-colors"
                    >
                      <MoreVertical className="size-4" />
                    </button>

                    {activeMenuId === item._id && (
                      <div className="absolute right-0 mt-1 w-44 bg-[#fdf8f8] dark:bg-[#181818] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-xl shadow-xl p-2 z-50 font-label-caps text-[10px] uppercase space-y-1">
                        <button
                          onClick={() => {
                            onEditItem?.(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef]"
                        >
                          <Edit2 className="size-3.5" />
                          <span>Edit Item</span>
                        </button>
                        <button
                          onClick={() => setActiveMenuId(null)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#f1edec] dark:hover:bg-[#252525] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef]"
                        >
                          <Copy className="size-3.5" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={() => {
                            onDeleteItem?.(item);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Item Identity Header (Column 0) */}
                {columns.length > 0 && (
                  <div className="pt-0.5">
                    {columns[0].render(item, idx)}
                  </div>
                )}

                {/* Secondary Meta Attributes Grid (Columns 1+) */}
                {columns.length > 1 && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                    {columns.slice(1).map((col) => (
                      <div key={col.key} className="flex flex-col gap-1">
                        <span className="font-label-caps text-[9px] text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider">
                          {col.header}
                        </span>
                        <div className="text-xs sm:text-sm font-hanken-grotesk text-[#1c1b1b] dark:text-[#f4f0ef]">
                          {col.render(item, idx)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* 04. DESKTOP DATA TABLE CANVAS (md and up screens) */}
      <section className="hidden md:block w-full min-h-[480px] overflow-x-auto border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl bg-[#fdf8f8] dark:bg-[#121212] shadow-xs">
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
                            onClick={() => setActiveMenuId(null)}
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
        <div className="font-body-md text-xs sm:text-sm">
          Showing <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">{currentRangeStart}–{currentRangeEnd}</span> of{" "}
          <span className="font-semibold text-[#1c1b1b] dark:text-[#f4f0ef]">{filteredData.length}</span> items
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 rounded-lg border border-[#c4c7c7]/30 dark:border-[#2e2e2e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1edec] dark:hover:bg-[#252525] text-[#1c1b1b] dark:text-[#f4f0ef] transition-colors"
          >
            <ChevronDown className="size-4 rotate-90" />
          </button>

          <div className="flex items-center gap-1 font-label-caps text-label-caps">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-[#1c1b1b] !text-white dark:!bg-[#f4f0ef] dark:!text-[#000000] font-semibold shadow-xs border border-[#1c1b1b] dark:border-[#f4f0ef]"
                    : "border border-[#c4c7c7]/40 dark:border-[#2e2e2e] hover:bg-[#f1edec] dark:hover:bg-[#252525] hover:border-[#1c1b1b] dark:hover:border-[#f4f0ef] text-[#5d5f5f] dark:text-[#8e8e8e] dark:hover:text-[#f4f0ef]"
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
            <ChevronDown className="size-4 -rotate-90" />
          </button>
        </div>
      </section>

    </div>
  );
}
