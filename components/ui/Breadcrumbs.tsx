import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb Sitemap" className={`flex items-center flex-wrap gap-1.5 font-label-caps text-[11px] uppercase tracking-[0.18em] select-none ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-[#c4c7c7] dark:text-[#3e3e3e] flex items-center shrink-0">
                <ChevronRight className="size-3" strokeWidth={1.5} />
              </span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef] transition-colors duration-300 relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold truncate max-w-[220px] sm:max-w-[360px]">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
