"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // 1. Detect if desktop viewport to prevent touch scroll conflicts on mobile
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // 2. Measure scrollable content height dynamically
    const handleResize = () => {
      if (containerRef.current) {
        setScrollHeight(containerRef.current.scrollHeight);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [isDesktop]);

  // 3. Track native window scroll
  const { scrollY } = useScroll();

  // 4. Apply spring physics configuration (smooth interpolation)
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 90,
    mass: 0.9,
  });

  // 5. Transform scroll value into vertical translation
  const y = useTransform(smoothY, (value) => -value);

  // Mobile/Tablet returns standard layout to leverage native touch-inertial scrolling
  if (!isDesktop) {
    return <div ref={containerRef} className="w-full">{children}</div>;
  }

  return (
    <>
      {/* Fixed viewport content wrapper */}
      <motion.div
        ref={containerRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform z-10"
      >
        {children}
      </motion.div>

      {/* Scroll height spacer to trigger native browser scrollbars */}
      <div style={{ height: scrollHeight }} className="w-full relative z-0" />
    </>
  );
}
