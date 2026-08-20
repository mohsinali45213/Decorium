"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  target?: string;
  rel?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  showArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      icon: Icon,
      iconPosition = "right",
      showArrow = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-label-caps uppercase tracking-wider transition-all duration-300 select-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none group";

    // Variant styles (Dark & Light mode unified)
    const variantStyles = {
      primary:
        "btn-luxury btn-luxury-primary bg-[#1c1b1b] dark:bg-[#f4f0ef] text-white dark:text-[#121212] border border-[#1c1b1b] dark:border-[#f4f0ef] hover:bg-[#3b3a3a] dark:hover:bg-white hover:border-[#3b3a3a] dark:hover:border-white shadow-xs hover:shadow-md",
      outline:
        "btn-luxury btn-luxury-outline bg-transparent border border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] hover:bg-[#1c1b1b] dark:hover:bg-[#f4f0ef] hover:text-white dark:hover:text-[#121212]",
      ghost:
        "bg-transparent text-[#1c1b1b] dark:text-[#f4f0ef] hover:text-[#5d5f5f] dark:hover:text-[#a0a0a0]",
      icon:
        "btn-luxury-icon rounded-full border border-[#e5e2e1] dark:border-[#2e2e2e] text-[#1c1b1b] dark:text-[#f4f0ef]",
    };

    // Size styles
    const sizeStyles = {
      sm: "text-[10px] px-4 py-2 gap-2 rounded-md",
      md: "text-label-caps px-6 py-3.5 gap-2.5 rounded-md",
      lg: "text-label-caps px-8 py-4 gap-3 rounded-md",
      icon: "size-10 p-0 rounded-full",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    const RenderIcon = Icon || (showArrow ? ArrowRight : null);

    const content = (
      <>
        {RenderIcon && iconPosition === "left" && (
          <RenderIcon className="size-4 shrink-0" strokeWidth={1.75} />
        )}
        {children && <span>{children}</span>}
        {RenderIcon && iconPosition === "right" && (
          <RenderIcon className="size-4 shrink-0" strokeWidth={1.75} />
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
