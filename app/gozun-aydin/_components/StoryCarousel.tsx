"use client";

import { Children, useEffect, useRef, useState } from "react";
import s from "./StoryCarousel.module.css";

type Props = {
  /** Her kartın kısa adı: noktaların ve düğmelerin erişilebilir etiketi */
  labels: string[];
  children: React.ReactNode;
};

/**
 * Hikâye kartları tek bir kartın yerinde, sırayla. Yatay kaydırma ve yaslanma
 * (scroll-snap) üstüne kurulu: telefonda parmakla, dizüstünde iki parmakla
 * kaydırılır; altta noktalar ve ok düğmeleri var. Klavyede düğmelerle geçilir.
 */
export function StoryCarousel({ labels, children }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const x = track.scrollLeft;
        let best = 0;
        items.forEach((el, i) => {
          if (Math.abs(el.offsetLeft - x) < Math.abs(items[best].offsetLeft - x)) best = i;
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(count - 1, i));
    const el = track.children[target] as HTMLElement | undefined;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={s.carousel} aria-roledescription="carousel">
      <div ref={trackRef} className={s.track}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={s.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}: ${labels[i] ?? ""}`}
            aria-hidden={i !== active ? true : undefined}
            inert={i !== active ? true : undefined}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className={s.controls}>
        <div className={s.dots}>
          {labels.map((label, i) => (
            <button
              key={i}
              type="button"
              className={s.dot}
              aria-label={label}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className={s.arrows}>
          <button
            type="button"
            className={s.arrow}
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Önceki hikâye"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={s.arrow}
            onClick={() => go(active + 1)}
            disabled={active === count - 1}
            aria-label="Sonraki hikâye"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
