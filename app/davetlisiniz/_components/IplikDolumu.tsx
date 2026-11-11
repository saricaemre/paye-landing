"use client";

import { useEffect } from "react";

/**
 * Hikâyenin ipliği sayfa kaydırıldıkça aşağı doğru dolar: her anın çizgisi (bir
 * noktadan sonrakine) ekranın kabaca üçte ikisindeki "kalem" geçtikçe dolar ve
 * oranı --dolu olarak o ana yazılır (page.module.css: .parca::after).
 * Hareketi azalt açıksa ya da betik çalışmazsa çizgi baştan dolu görünür.
 */
export function IplikDolumu({ listeId }: { listeId: string }) {
  useEffect(() => {
    const liste = document.getElementById(listeId);
    if (!liste) return;
    const parcalar = Array.from(liste.children) as HTMLElement[];
    const azalt = window.matchMedia("(prefers-reduced-motion: reduce)");
    let kare = 0;

    const guncelle = () => {
      kare = 0;
      if (azalt.matches) {
        parcalar.forEach((p) => p.style.removeProperty("--dolu"));
        return;
      }
      const kalem = window.innerHeight * 0.62;
      for (let i = 0; i < parcalar.length - 1; i++) {
        const bas = parcalar[i].getBoundingClientRect().top;
        const son = parcalar[i + 1].getBoundingClientRect().top;
        const oran = Math.min(1, Math.max(0, (kalem - bas) / (son - bas)));
        parcalar[i].style.setProperty("--dolu", oran.toFixed(3));
      }
    };
    const iste = () => {
      if (!kare) kare = requestAnimationFrame(guncelle);
    };

    guncelle();
    window.addEventListener("scroll", iste, { passive: true });
    window.addEventListener("resize", iste);
    azalt.addEventListener("change", iste);
    return () => {
      cancelAnimationFrame(kare);
      window.removeEventListener("scroll", iste);
      window.removeEventListener("resize", iste);
      azalt.removeEventListener("change", iste);
    };
  }, [listeId]);

  return null;
}
