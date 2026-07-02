"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-24 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-clay text-bg transition-opacity hover:bg-clay-hover md:bottom-6 md:right-6 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
}
