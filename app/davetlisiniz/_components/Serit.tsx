"use client";

import { useEffect, useRef } from "react";
import { ElMakas } from "./ElMakas";
import s from "./Serit.module.css";

/*
 * Örnekteki eğik şerit: kenarları kesik çizgili krem bir bant, üstünde
 * işaret ve orta parmağıyla makas yapan eller (Emre'nin Biri Kaldı'da verdiği
 * çizim, `ElMakas`). Sayfa kaydırıldıkça bant kendi doğrultusunda ilerler,
 * eller parmaklarını açıp kapar; kaydırma durunca parmaklar açık bekler.
 * Hareket azaltma tercihinde bant durur.
 */

const ADIM = 108; // iki el arası (px); bant bu kadar kayınca desen başa döner
const ADET = 28;

export function Serit({ className }: { className?: string }) {
  const kok = useRef<HTMLDivElement>(null);
  const iz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = kok.current;
    const track = iz.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gorunur = false;
    let raf = 0;
    let dur = 0;

    const io = new IntersectionObserver(([e]) => (gorunur = e.isIntersecting), {
      rootMargin: "120px 0px",
    });
    io.observe(el);

    const ciz = () => {
      raf = 0;
      const kay = (window.scrollY * 0.42) % ADIM;
      track.style.transform = `translate3d(${(kay - ADIM).toFixed(1)}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!gorunur) return;
      if (!raf) raf = requestAnimationFrame(ciz);
      el.setAttribute("data-kesiyor", "");
      window.clearTimeout(dur);
      dur = window.setTimeout(() => el.removeAttribute("data-kesiyor"), 180);
    };

    ciz();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(dur);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={kok} className={`${s.serit} ${className ?? ""}`} aria-hidden="true">
      <div className={s.bant}>
        <div ref={iz} className={s.iz} style={{ transform: `translate3d(${-ADIM}px, 0, 0)` }}>
          {Array.from({ length: ADET }, (_, i) => (
            <span key={i} className={s.el} style={{ "--i": i % 4 } as React.CSSProperties}>
              <ElMakas acikSinif={s.acik} kapaliSinif={s.kapali} siluetSinif={s.siluet} cizgiSinif={s.cizgi} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
