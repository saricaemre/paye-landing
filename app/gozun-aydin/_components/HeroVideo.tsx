"use client";

import { useEffect, useRef, useState } from "react";
import s from "./HeroVideo.module.css";

type Props = {
  src: string;
  /** Küçük ekranlar için hafif sürüm (mercek mobilde ~300 px) */
  srcSmall?: string;
  poster: string;
  alt: string;
  /** Mercekteki sürgü: çizginin solu katarakt gözüyle, sağı ameliyattan sonra */
  compare: { before: string; beforeShort: string; hint: string; label: string };
  className?: string;
};

/**
 * Girişteki mercek: kampanya videosu yuvarlak bir çerçevede, sessiz döngüde.
 * Sayfa açılırken bir kez netleşir. Üstünde sürüklenen bir çizgi var; solunda
 * aynı video katarakt gözüyle (bulanık, soluk, sütlü) görünür. Buğu ayrı bir
 * video değil, videonun üstüne binen bir filtredir. Çizgi sürüklenerek,
 * tıklanarak ya da ok tuşlarıyla kayar. Açılışta çizgi en soldadır, görüntü
 * tamamen nettir; buğu ancak çizgi çekilince görünür. Hareket azaltma tercihinde ya da veri tasarrufu açıkken video
 * oynamaz, kapak karesi görünür. Halkanın üstündeki düğmeyle durdurulabilir.
 */
export function HeroVideo({ src, srcSmall, poster, alt, compare, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [allowed, setAllowed] = useState(false);

  // Açılışta çizgi en solda: görüntü tamamen net, buğu ancak çekince görünür
  const [pos, setPos] = useState(0);
  const [touched, setTouched] = useState(false);
  const touchedRef = useRef(false);
  const drag = useRef<{ id: number; x: number; moved: boolean; mouse: boolean } | null>(null);

  const markTouched = () => {
    touchedRef.current = true;
    setTouched(true);
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;

    setAllowed(true);
    const small = srcSmall && window.matchMedia("(max-width: 959px)").matches;
    const file = small ? srcSmall : src;
    if (video.getAttribute("src") !== file) video.src = file;

    // Düğmenin durumu videonun kendi olaylarından gelir; tarayıcı videoyu
    // kendisi durdurup başlattığında da doğru kalır.
    const sync = () => setPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (userPaused.current) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, [src, srcSmall]);

  const moveTo = (clientX: number) => {
    const el = glassRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  // Tarayıcı imleci tanımazsa (ör. dokunuş iptal edildiyse) yakalama hata verir; sürükleme yine çalışır
  const capture = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as Element).closest("button")) return;
    const mouse = e.pointerType === "mouse";
    drag.current = { id: e.pointerId, x: e.clientX, moved: mouse, mouse };
    markTouched();
    // Farede tıklanan yere atlar; dokunmatikte sayfa kaydırmasını bozmamak için
    // ancak yatay bir hareket başlayınca kayar.
    if (mouse) {
      capture(e);
      moveTo(e.clientX);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) {
      if (Math.abs(e.clientX - d.x) < 4) return;
      d.moved = true;
      capture(e);
    }
    moveTo(e.clientX);
  };

  // Dokunmatikte kısa bir dokunuş (kaydırma değil) çizgiyi dokunulan yere taşır
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d && d.id === e.pointerId && !d.mouse && !d.moved) moveTo(e.clientX);
    drag.current = null;
  };

  const onPointerEnd = () => {
    drag.current = null;
  };

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div
      className={`${s.lens} ${className ?? ""}`}
      style={{ "--pos": `${pos}%` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerEnd}
    >
      <span className={s.shadow} aria-hidden="true" />
      <div ref={glassRef} className={s.glass}>
        <video
          ref={ref}
          className={s.video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
          disablePictureInPicture
          disableRemotePlayback
        />

        {/* Çizginin solu: videonun üstüne binen katarakt buğusu */}
        <div className={s.haze} aria-hidden="true">
          <span className={s.tag} data-side="before">
            <span className={s.long}>{compare.before}</span>
            <span className={s.short}>{compare.beforeShort}</span>
          </span>
        </div>

        <span className={s.line} aria-hidden="true" />

        <input
          type="range"
          className={s.range}
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          aria-label={compare.label}
          onChange={(e) => {
            markTouched();
            setPos(Number(e.target.value));
          }}
        />
      </div>
      <span className={s.ring} aria-hidden="true" />
      {/* Düğme dairenin dışında da görünsün diye camın dışında; en solda halkanın üstünde durur */}
        <div className={s.handle} aria-hidden="true">
          <span className={s.knob}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="m9 7-5 5 5 5M15 7l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={s.hint} data-hidden={touched ? "" : undefined}>
            {compare.hint}
          </span>
        </div>
      {allowed ? (
        <button
          type="button"
          className={s.toggle}
          onClick={toggle}
          aria-label={playing ? "Videoyu durdur" : "Videoyu oynat"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
            </svg>
          )}
        </button>
      ) : null}
    </div>
  );
}
