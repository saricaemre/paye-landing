"use client";

import { useEffect } from "react";

/**
 * [data-reveal] işaretli öğeleri görünür olduklarında açar.
 * Ayrıca adreste ?taslak varsa değiştirilecek metinleri işaretleyen
 * taslak modunu açar.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (new URLSearchParams(window.location.search).has("taslak")) {
      root.setAttribute("data-taslak", "");
    }

    // Adresle gelen #bölüme git (ör. reklamdan /gozun-aydin#bagis).
    // Uzun, yapışkan sahneli sayfalarda tarayıcının ilk kaydırması kaybolabiliyor.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      const go = () => target.scrollIntoView({ behavior: "instant", block: "start" });
      go();
      // yazı tipleri ve görseller yerleşince bir kez daha
      if (document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])"),
    );

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
