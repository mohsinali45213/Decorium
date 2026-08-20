"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemLabel?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
  itemLabel = "SPECIMENS",
}: PaginationProps) {
  if (totalItems <= 0) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`p-6 md:p-8 border-t border-[#c4c7c7]/65 dark:border-[#2e2e2e] flex flex-col items-center justify-center text-center gap-3 mt-auto w-full ${className}`}
    >
      <p className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase tracking-wider text-center">
        SHOWING {startIdx}–{endIdx} OF {totalItems} {itemLabel}
      </p>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination Navigation">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous Page"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            icon={ChevronLeft}
            className="size-10 p-0 rounded-md cursor-pointer disabled:opacity-40"
          />
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <Button
                key={pageNum}
                variant={isCurrent ? "primary" : "outline"}
                size="icon"
                onClick={() => handlePageChange(pageNum)}
                className={`size-10 p-0 rounded-md font-label-caps text-label-caps cursor-pointer ${
                  isCurrent ? "shadow-xs font-bold" : ""
                }`}
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="icon"
            aria-label="Next Page"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            icon={ChevronRight}
            className="size-10 p-0 rounded-md cursor-pointer disabled:opacity-40"
          />
        </nav>
      )}
    </div>
  );
}
