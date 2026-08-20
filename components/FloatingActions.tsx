"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Quick actions"
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center"
    >
      <AnimatePresence>
        {/* Scroll to Top Button (Appears on scroll with Framer Motion) */}
        {showScrollTop && (
          <motion.div
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <Button
              variant="icon"
              size="icon"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              icon={ArrowUp}
              className="size-11 rounded-full btn-floating-reverse shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct Call Button */}
      <Button
        href="tel:+919876543210"
        variant="icon"
        size="icon"
        aria-label="Call concierge"
        icon={Phone}
        className="size-11 rounded-full btn-floating-reverse shadow-lg"
        style={{ animationDelay: "0.4s" }}
      />

      {/* WhatsApp Floating Button */}
      <Button
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        variant="icon"
        size="icon"
        aria-label="Chat on WhatsApp"
        icon={MessageCircle}
        className="size-11 rounded-full btn-floating-reverse shadow-lg"
        style={{ animationDelay: "0s" }}
      />
    </aside>
  );
}
