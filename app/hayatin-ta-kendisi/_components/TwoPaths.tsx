"use client";

import { useEffect, useRef, useState } from "react";
import s from "./TwoPaths.module.css";

type Props = {
  label: string;
  home: string;
  walk: string;
  walkValue: string;
  depth: string;
  depthValue: string;
};

/**
 * Bir köyün kesiti. Paye'nin amber noktalı yolu iki kez çizilir: yer yüzeyinde
 * evden en yakın suya uzanan uzun, kıvrımlı yürüyüş ve aynı noktadan yerin
 * altına, temiz suya inen kısa, düz çizgi. Çizgiler ekrana girerken bir kez
 * uzar; hareket azaltmada baştan çizili durur. Zemin en altta petrol suya döner
 * ve bir sonraki koyu bölüme akar.
 */
export function TwoPaths({ label, home, walk, walkValue, depth, depthValue }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={s.section} data-drawn={drawn ? "" : undefined}>
      <div ref={ref} className={s.cut} role="img" aria-label={label}>
        {/* Yer yüzeyi: uzun ve kıvrımlı yürüyüş */}
        <div className={s.sky}>
          <svg className={s.walk} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M60 198C200 198 280 112 400 110S560 178 650 172 790 98 870 104 940 186 948 198" />
          </svg>

          <span className={s.home} aria-hidden="true">
            <span className={s.tag}>{home}</span>
            <svg viewBox="0 0 32 28" width="32" height="28">
              <path
                d="M3 13 16 3l13 10M7 11v15h18V11M13 26v-8h6v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className={s.pond} aria-hidden="true">
            <span className={`${s.tag} ${s.pondTag}`}>
              <strong>{walk}</strong>
              <span>{walkValue}</span>
            </span>
            <span className={s.pondShape} />
          </span>
        </div>

        {/* Yerin altı: kısa ve düz bir iniş */}
        <div className={s.ground} aria-hidden="true">
          <span className={s.down} />
          <span className={s.depth}>
            <strong>{depth}</strong>
            <span>{depthValue}</span>
          </span>
        </div>

        <div className={s.waterline} aria-hidden="true">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0 22C120 10 220 32 340 22S560 8 680 20 900 34 1020 22 1140 12 1200 18V40H0Z" />
          </svg>
          <span className={s.spring}>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </figure>
  );
}
