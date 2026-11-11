"use client";

import { useEffect, useRef, useState } from "react";
import s from "./DropBridge.module.css";

type Props = {
  /** Damla düştüğü yerde beliren içerik (Rehema'nın başlığı) */
  children: React.ReactNode;
};

/**
 * Okuyanın sabahından Rehema'nın sabahına düşen tek damla. Ayna bölümünün son
 * cümlesinin altında bir damla belirir, Paye'nin noktalı yolu boyunca düşer,
 * düştüğü yerde suda halkalar açılır ve Rehema'nın başlığı o halkalardan
 * yükselir. Ekrana girince bir kez oynar; hareket azaltmada her şey baştan
 * yerinde durur.
 */
export function DropBridge({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "falling" | "landed">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setState("landed");
      return;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("falling");
        timer = window.setTimeout(() => setState("landed"), 1580);
      },
      // damlanın değeceği yer ekranın üst üçte ikisine girince düşsün; yoksa halkalar
      // ve başlığın belirmesi ekranın altında (telefonda yapışkan çubuğun altında) kalıyor.
      // Yol uzun olduğu için köprünün %60'ı görünmeli.
      { threshold: 0.6, rootMargin: "0px 0px -32% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className={s.bridge} data-state={state}>
      <div className={s.path} aria-hidden="true">
        <span className={s.dots} />
        <span className={s.trail} />
        <span className={s.fall}>
          <span className={s.drop} />
        </span>
        <span className={s.rings}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={s.after}>{children}</div>
    </div>
  );
}
