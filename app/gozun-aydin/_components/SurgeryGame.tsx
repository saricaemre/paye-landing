"use client";

import { Fragment, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import s from "./SurgeryGame.module.css";

/**
 * "Ameliyatı bir de siz deneyin": girişteki merceğin ikizi. Bu kez mercekte,
 * cerrahın mikroskobundan bakılan bir göz var. Ziyaretçi iki şey yapar:
 *
 *   1. Aleti gözbebeğindeki buğunun üstünde gezdirip buğulanan merceği alır
 *      (fareyle üstünde gezinmek yeter, dokunmatikte parmakla sürülür; tek
 *      bir dokunuşta alet buğuyu kendisi alır). Buğu kalktıkça gözbebeğine
 *      ışık dolar; halka ilerlemeyi gösterir.
 *   2. Kenarda bekleyen yapay merceği gözbebeğinin ortasına sürükler ya da
 *      üstüne dokunur; mercek yerine oturur, kolları açılır.
 *
 * Ardından görüntü gözbebeğinden içeri girer ve girişteki dal netleşerek
 * belirir: ertesi gün bant açıldığında hastanın gördüğü. Aynı anda başlık,
 * açıklama ve adımlar buğulanıp çekilir; yerlerine Halima'nın cümlesi kelime
 * kelime netleşerek gelir (masaüstünde merceğin yanında, ortada; telefonda
 * merceğin altında; telefonda başlık kalkarken mercek ekranda yerinde kalır).
 * Sonunda bağış düğmesi ve baştan başlama; düğme ekranın altında kalırsa
 * sayfa yalnızca o kadar kayar.
 *
 * Alet beklerken gözbebeğinde değil, irisin kenarındaki girişte durur;
 * bölüm ilk kez ekrana girince bir kez gözbebeğinin kıyısına uzanıp geri
 * çekilir. Gözbebeğine yalnızca ziyaretçinin elini izlerken girer.
 *
 * Göz, buğu ve alet tek bir canvas'ta çizilir (dış kütüphane yok); yapay
 * mercek sürüklenebilen bir düğmedir. Klavyede Enter ya da boşlukla iki adım
 * da kendiliğinden yapılır; ekran okuyucuya her adım duyurulur. Hareket
 * azaltma tercihinde bekleme salınımı, kırıntılar ve geçişler olmadan çalışır.
 * Dokunmatikte yalnızca gözbebeği ve mercek sayfa kaydırmasını tutar.
 */

export type SurgeryGameText = {
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  hints: { clear: string; place: string };
  tag: string;
  result: string;
  resultText: string;
  restart: string;
  labels: { group: string; clear: string; place: string; clearHelp: string; placeHelp: string };
  live: { cleared: string; placed: string; done: string };
  view: { src: string; alt: string };
};

type Props = {
  text: SurgeryGameText;
  /** Sonuçtaki bağış düğmesi; sayfada hazırlanır */
  cta: React.ReactNode;
  headingId: string;
  headingClassName?: string;
};

type Phase = "clear" | "place" | "settle" | "reveal" | "done";
type IolMode = "hidden" | "waiting" | "dragging" | "gliding" | "returning" | "placed" | "settled";
type Pt = { x: number; y: number };

/* Ölçüler merceğin çapına oranla */
const IRIS = 0.36;
const PUPIL = 0.19;
/** Aletin girdiği yer: saat dört yönünde, irisin kenarı */
const INC = (38 * Math.PI) / 180;
/** Katlı merceğin beklediği yer: aletin girdiği yerin hemen içi */
const REST_R = 0.33;
const REST: Pt = { x: 0.5 + REST_R * Math.cos(INC), y: 0.5 + REST_R * Math.sin(INC) };
const FOLD = 0.36;
/** Mercek merkeze bu kadar yaklaşınca yerine oturur */
const SNAP = 0.13;
/** Buğunun bu kadarı alınınca kalanı kendiliğinden çözülür */
const CLEAR_AT = 0.6;
/** Buğunun alındığı alan: gözbebeği ve fırça payı (CSS'te .hit genişliği %44) */
const HIT = 0.22;
const TAU = Math.PI * 2;
/** Aletin ilk uzanışının süresi */
const INTRO = 1800;

export function SurgeryGame({ text, cta, headingId, headingClassName }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<SVGCircleElement>(null);
  const iolRef = useRef<HTMLButtonElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<Eye | null>(null);
  const timers = useRef<number[]>([]);
  const viaKeys = useRef(false);
  const press = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const skipClick = useRef(false);
  /** 1. adımda kısa bir dokunuşu sürmekten ayırmak için */
  const downAt = useRef<{ x: number; y: number; t: number; far: boolean } | null>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const pos = useRef<Pt>({ ...REST });
  const seed = useRef(1);
  const still = useRef(false);
  const seen = useRef(false);

  const [phase, setPhase] = useState<Phase>("clear");
  const [iol, setIol] = useState<IolMode>("hidden");
  const [hint1, setHint1] = useState(true);
  const [hint2, setHint2] = useState(true);
  const [near, setNear] = useState(false);
  const [live, setLive] = useState("");
  /** Telefonda çekilen başlık yerini de bırakır (masaüstünde yeri durur) */
  const [folded, setFolded] = useState(false);
  const lensTop = useRef<number | null>(null);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, still.current ? Math.min(ms, 80) : ms));
  };

  // Telefonda başlık merceğin üstünde: kalkınca ya da geri gelince mercek
  // ekranda yerinden oynamasın diye sayfa aynı ölçüde kayar (boyamadan önce)
  const fold = (v: boolean) => {
    lensTop.current = lensRef.current?.getBoundingClientRect().top ?? null;
    setFolded(v);
  };

  useLayoutEffect(() => {
    const before = lensTop.current;
    lensTop.current = null;
    const lens = lensRef.current;
    // Mercek ekranın altındaysa değişiklik görünmez, kaydırmaya gerek yok
    if (before == null || !lens || before > window.innerHeight) return;
    const by = lens.getBoundingClientRect().top - before;
    if (Math.abs(by) > 0.5) window.scrollBy({ top: by, behavior: "instant" });
  }, [folded]);

  /** Halka: buğu alındıkça dörtte üçüne, mercek oturunca tamamına dolar */
  const ring = (p: number) => {
    const el = fillRef.current;
    if (!el) return;
    // tam dolunca saat on ikide çentik kalmasın diye çizgi biraz daha uzun
    el.style.strokeDasharray = `${p >= 1 ? 101 : (p * 100).toFixed(2)} 200`;
    el.style.opacity = p > 0 ? "1" : "0";
  };

  const placeIol = (x: number, y: number, scale: number) => {
    pos.current = { x, y };
    const el = iolRef.current;
    if (!el) return;
    el.style.left = `${(x * 100).toFixed(3)}%`;
    el.style.top = `${(y * 100).toFixed(3)}%`;
    el.style.setProperty("--s", scale.toFixed(3));
  };

  // Buğu çözülünce motor bunu çağırır; ref, her çizimde güncel kalsın diye
  const onCleared = useRef(() => {});
  onCleared.current = () => {
    placeIol(REST.x, REST.y, FOLD);
    setIol("waiting");
    setPhase("place");
    setLive(text.live.cleared);
  };

  useEffect(() => {
    const lens = lensRef.current;
    const canvas = canvasRef.current;
    if (!lens || !canvas) return;
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Göz, bölüm ekrana yaklaşınca bir kez çizilir
    const start = () => {
      if (eyeRef.current) return;
      const w = lens.getBoundingClientRect().width || 420;
      const size = Math.round(Math.min(1100, Math.max(560, w * Math.min(2, window.devicePixelRatio || 1))));
      const eye = new Eye(canvas, size, still.current, (f) => ring(f * 0.75), () => onCleared.current());
      eyeRef.current = eye;
      eye.setVisible(seen.current);
    };
    const soon = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          soon.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    soon.observe(lens);

    // Bölüm ilk kez ekrana girince alet bir kez gözbebeğinin kıyısına uzanır
    const view = new IntersectionObserver(
      (entries) => {
        seen.current = entries[entries.length - 1].isIntersecting;
        eyeRef.current?.setVisible(seen.current);
      },
      { threshold: 0.35 },
    );
    view.observe(lens);

    const pending = timers.current;
    return () => {
      soon.disconnect();
      view.disconnect();
      eyeRef.current?.destroy();
      eyeRef.current = null;
      pending.forEach(clearTimeout);
    };
  }, []);

  // Klavyeyle oynayanın odağı sıradaki adıma geçer (sayfa kaymadan)
  useEffect(() => {
    if (!viaKeys.current) return;
    const el =
      phase === "clear" ? hitRef.current : phase === "place" ? iolRef.current : phase === "done" ? resultRef.current : null;
    el?.focus({ preventScroll: true });
  }, [phase]);

  // Sonuç gelince bağış düğmesi ekranın altında kalıyorsa (telefonda) dal
  // netleştikten sonra sayfa yalnızca o kadar kayar; merceğin ortası üst
  // çubuğun altına girmez
  useEffect(() => {
    if (phase !== "done") return;
    const id = window.setTimeout(
      () => {
        const actions = actionsRef.current;
        const lens = lensRef.current;
        if (!actions || !lens) return;
        const over = actions.getBoundingClientRect().bottom + 16 - window.innerHeight;
        const l = lens.getBoundingClientRect();
        const room = l.top + l.height / 2 - 80;
        const by = Math.min(over, room);
        if (by > 0) window.scrollBy({ top: by, behavior: still.current ? "auto" : "smooth" });
      },
      still.current ? 0 : 900,
    );
    return () => window.clearTimeout(id);
  }, [phase]);

  /* ----- 1. adım: buğulanan merceği almak ------------------------------ */

  const hitMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const eye = eyeRef.current;
    const lens = lensRef.current;
    if (!eye || !lens || phase !== "clear") return;
    const d = downAt.current;
    if (d && !d.far && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10) d.far = true;
    if (e.pointerType !== "mouse" && press.current?.id !== e.pointerId) return;
    eye.move(eye.local(e.clientX, e.clientY, lens.getBoundingClientRect()));
    if (hint1) setHint1(false);
  };

  const hitDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    viaKeys.current = false;
    downAt.current = { x: e.clientX, y: e.clientY, t: performance.now(), far: false };
    if (e.pointerType !== "mouse") {
      press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: true };
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
    hitMove(e);
  };

  const hitUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (press.current?.id === e.pointerId) press.current = null;
    if (e.pointerType !== "mouse") eyeRef.current?.release();
  };

  const hitLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") eyeRef.current?.release();
  };

  const hitKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    viaKeys.current = true;
    setHint1(false);
    eyeRef.current?.autoClear();
  };

  // Kısa bir dokunuş ya da tıklama (ekran okuyucunun tıklaması dahil): alet
  // buğuyu kendisi alır. Sürerek silen birinin bıraktığı tıklama sayılmaz.
  const hitClick = () => {
    if (phase !== "clear") return;
    const d = downAt.current;
    downAt.current = null;
    if (d && (d.far || performance.now() - d.t > 450)) return;
    viaKeys.current = !d;
    setHint1(false);
    eyeRef.current?.autoClear();
  };

  /* ----- 2. adım: yapay merceği yerleştirmek ---------------------------- */

  /** Mercek gözbebeğine yaklaştıkça gerçek boyuna büyür */
  const scaleAt = (x: number, y: number) => {
    const d = Math.hypot(x - 0.5, y - 0.5);
    const t = Math.min(1, Math.max(0, (REST_R - d) / (REST_R - 0.08)));
    return FOLD + (1 - FOLD) * t;
  };

  const snap = () => {
    setNear(false);
    setIol("placed");
    placeIol(0.5, 0.5, 1);
    ring(1);
    setPhase("settle");
    setLive(text.live.placed);
    try {
      navigator.vibrate?.(12);
    } catch {}
    later(() => setIol("settled"), 650);
    // Görüntü gözbebeğinden içeri girerken başlık ve adımlar buğulanıp çekilir
    later(() => setPhase("reveal"), 1900);
    later(() => fold(true), 2500);
    later(() => {
      setPhase("done");
      setLive(text.live.done);
    }, 3500);
  };

  const iolDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (iol !== "waiting" || (e.pointerType === "mouse" && e.button !== 0)) return;
    viaKeys.current = false;
    press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setHint2(false);
  };

  const iolMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const p = press.current;
    const lens = lensRef.current;
    if (!p || p.id !== e.pointerId || !lens) return;
    if (!p.moved) {
      if (Math.hypot(e.clientX - p.x, e.clientY - p.y) < 6) return;
      p.moved = true;
      setIol("dragging");
    }
    const r = lens.getBoundingClientRect();
    let x = (e.clientX - r.left) / r.width;
    let y = (e.clientY - r.top) / r.height;
    const d = Math.hypot(x - 0.5, y - 0.5);
    if (d > 0.4) {
      x = 0.5 + ((x - 0.5) / d) * 0.4;
      y = 0.5 + ((y - 0.5) / d) * 0.4;
    }
    placeIol(x, y, scaleAt(x, y));
    const isNear = Math.hypot(x - 0.5, y - 0.5) < SNAP;
    if (isNear !== near) setNear(isNear);
  };

  const iolUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    press.current = null;
    // Kımıldamadan bırakılan dokunuşu click olayı karşılar
    if (!p.moved) return;
    skipClick.current = true;
    const { x, y } = pos.current;
    if (e.type === "pointerup" && Math.hypot(x - 0.5, y - 0.5) < SNAP) {
      snap();
      return;
    }
    setNear(false);
    setIol("returning");
    placeIol(REST.x, REST.y, FOLD);
    later(() => setIol((m) => (m === "returning" ? "waiting" : m)), 420);
  };

  const iolClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (skipClick.current) {
      skipClick.current = false;
      return;
    }
    if (iol !== "waiting") return;
    viaKeys.current = e.detail === 0;
    setHint2(false);
    setIol("gliding");
    requestAnimationFrame(() => placeIol(0.5, 0.5, 1));
    later(snap, 900);
  };

  /* ----- baştan ---------------------------------------------------------- */

  const restart = (e: React.MouseEvent<HTMLButtonElement>) => {
    viaKeys.current = e.detail === 0;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    seed.current += 1;
    downAt.current = null;
    eyeRef.current?.reset(seed.current);
    ring(0);
    setNear(false);
    setIol("hidden");
    setHint1(true);
    setHint2(true);
    setLive("");
    setPhase("clear");
    fold(false);
  };

  const step = phase === "clear" ? 0 : phase === "place" ? 1 : 2;
  const done = phase === "done";
  /** Görüntü gözbebeğine girince başlık, açıklama ve adımlar çekilir */
  const away = phase === "reveal" || done;
  const pillHidden = (phase === "clear" && !hint1) || (phase === "place" && !hint2) || step > 1;
  const words = text.result.split(" ");

  return (
    <div className={s.grid} data-away={away ? "" : undefined} data-folded={folded ? "" : undefined}>
      <div className={s.head}>
        <h2 id={headingId} className={headingClassName} data-reveal="focus">
          {text.title}
        </h2>
        <p className={s.lead} data-reveal>
          {text.intro}
        </p>
      </div>

      <div className={s.stage} data-reveal="fade">
        <div ref={lensRef} className={s.lens} data-phase={phase} role="group" aria-label={text.labels.group}>
          <span className={s.shadow} aria-hidden="true" />
          <div className={s.glass}>
            {/* Ertesi gün: girişteki dal, bu kez net */}
            <img
              className={s.view}
              src={text.view.src}
              alt={done ? text.view.alt : ""}
              aria-hidden={done ? undefined : true}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <div className={s.eye}>
              <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
              <svg
                className={s.target}
                viewBox="0 0 100 100"
                aria-hidden="true"
                data-near={near ? "" : undefined}
              >
                <circle cx="50" cy="50" r="14.6" />
              </svg>
              <button
                ref={iolRef}
                type="button"
                className={s.iol}
                data-mode={iol}
                aria-label={text.labels.place}
                aria-describedby={`${uid}-s1 ${uid}-k1`}
                tabIndex={iol === "waiting" ? 0 : -1}
                onPointerDown={iolDown}
                onPointerMove={iolMove}
                onPointerUp={iolUp}
                onPointerCancel={iolUp}
                onClick={iolClick}
              >
                <IolArt uid={uid} />
              </button>
              <span className={s.glare} aria-hidden="true" />
            </div>
            <span className={s.tag} aria-hidden="true">
              {text.tag}
            </span>
          </div>

          <svg className={s.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={s.ringBase} cx="50" cy="50" r="49.6" />
            <circle ref={fillRef} className={s.ringFill} cx="50" cy="50" r="49.6" pathLength={100} />
          </svg>

          <div
            ref={hitRef}
            className={s.hit}
            role="button"
            tabIndex={phase === "clear" ? 0 : -1}
            aria-label={text.labels.clear}
            aria-describedby={`${uid}-s0 ${uid}-k0`}
            onClick={hitClick}
            onPointerDown={hitDown}
            onPointerMove={hitMove}
            onPointerUp={hitUp}
            onPointerCancel={hitUp}
            onPointerLeave={hitLeave}
            onKeyDown={hitKey}
          />

          <span className={s.pill} data-step={step + 1} data-hidden={pillHidden ? "" : undefined} aria-hidden="true">
            {phase === "place" ? text.hints.place : text.hints.clear}
          </span>
        </div>
      </div>

      <div className={s.panel}>
        {/* Bitince görünmez olur ama yerini korur: sonuç aynı yere oturur, sayfa oynamaz */}
        <ol className={s.steps}>
          {text.steps.map((st, i) => (
            <li
              key={st.title}
              className={s.step}
              data-state={i < step ? "done" : i === step ? "active" : "next"}
            >
              <span className={s.num} aria-hidden="true">
                {i < step ? (
                  <svg viewBox="0 0 24 24" width="15" height="15">
                    <path
                      d="M20 6 9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <div>
                <p className={s.stepTitle}>{st.title}</p>
                <p id={`${uid}-s${i}`} className={s.stepText}>
                  {st.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className={s.sr} aria-live="polite">
          {live}
        </p>
        <span id={`${uid}-k0`} className={s.sr}>
          {text.labels.clearHelp}
        </span>
        <span id={`${uid}-k1`} className={s.sr}>
          {text.labels.placeHelp}
        </span>
      </div>

      {done && (
        <div ref={resultRef} className={s.result} tabIndex={-1}>
          {/* Cümle, dal gibi kelime kelime netleşir; ekran okuyucu tek parça okur */}
          <p className={s.resultLead}>
            <span className={s.sr}>{text.result}</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className={s.word} style={{ "--i": i } as React.CSSProperties}>
                    {w}
                  </span>
                </Fragment>
              ))}
            </span>
          </p>
          <p className={s.resultText}>{text.resultText}</p>
          <div ref={actionsRef} className={s.actions}>
            {cta}
            <button type="button" className={s.restart} onClick={restart}>
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                <path
                  d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {text.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Yapay mercek: saydam bir optik ve iki ince kol                           */
/* ------------------------------------------------------------------------ */

function IolArt({ uid }: { uid: string }) {
  const arm = "M 7 -43.5 C 34 -84 90 -80 94 -26";
  const arms = (
    <>
      <path d={arm} className={s.armUnder} />
      <path d={arm} className={s.armOver} />
      <path d={arm} transform="rotate(180)" className={s.armUnder} />
      <path d={arm} transform="rotate(180)" className={s.armOver} />
    </>
  );
  return (
    <svg className={s.iolArt} viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <clipPath id={`${uid}-optic`}>
          <circle r="44" />
        </clipPath>
        {/* Yerine oturunca kollar irisin arkasında kalır; gözbebeğinden görünen kısmı net */}
        <mask id={`${uid}-pupil`} maskUnits="userSpaceOnUse" x="-100" y="-100" width="200" height="200">
          <circle r="59" fill="#fff" />
        </mask>
        <linearGradient id={`${uid}-glint`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle r="76" className={s.waitRing} />
      <g className={s.iolBody}>
        <g className={s.arms}>{arms}</g>
        <g mask={`url(#${uid}-pupil)`}>
          <g className={s.armsIn}>{arms}</g>
        </g>
        <g className={s.optic}>
          <circle r="44" className={s.opticFill} />
          <circle r="40.5" className={s.opticRim} />
          <circle r="44" className={s.opticUnder} />
          <circle r="44" className={s.opticEdge} />
          <path d="M -31 -25 A 40 40 0 0 1 6 -40" className={s.opticShine} />
          <g clipPath={`url(#${uid}-optic)`}>
            <g transform="rotate(24)">
              <rect className={s.glint} x="-22" y="-70" width="44" height="140" fill={`url(#${uid}-glint)`} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Göz: canvas üstünde iris, buğu, alet ve kırıntılar                        */
/* ------------------------------------------------------------------------ */

type Speck = { x: number; y: number; life: number; max: number; r: number };

/** Tohumlu rastgele sayı: her açılışta aynı iris, her denemede başka bir buğu */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Eye {
  private readonly n: number;
  private readonly c: number;
  private readonly r: number;
  private readonly k: number;
  private readonly iris: number;
  private readonly pupil: number;
  private readonly brush: number;
  private readonly inc: Pt;
  private readonly rest: Pt;
  private readonly reach: Pt;
  private readonly gone: Pt;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly eyeLayer = document.createElement("canvas");
  private readonly hazeLayer = document.createElement("canvas");
  private readonly hctx: CanvasRenderingContext2D;
  /** Göz ve buğunun birleşimi; buğu değişmedikçe yeniden çizilmez */
  private readonly baseLayer = document.createElement("canvas");
  private readonly bctx: CanvasRenderingContext2D;
  private baseDirty = true;
  private readonly box: { x: number; y: number; w: number };
  private readonly samples: Int32Array;
  private tip: Pt;
  private aim: Pt | null = null;
  private last: Pt | null = null;
  private probe = 0;
  private probeTo = 1;
  private hazeAlpha = 1;
  private fading = false;
  private specks: Speck[] = [];
  private auto: { t: number; dur: number } | null = null;
  private frac = 0;
  private raf = 0;
  private prev = 0;
  private lastMeasure = 0;
  private visible = false;
  /** İlk görünüşte bir kez: uç gözbebeğinin kıyısına uzanıp geri çekilir */
  private introAt = 0;
  private introShown = false;
  private touched = false;
  private done = false;

  constructor(
    canvas: HTMLCanvasElement,
    size: number,
    private readonly still: boolean,
    private readonly onProgress: (f: number) => void,
    private readonly onCleared: () => void,
  ) {
    const n = size;
    canvas.width = n;
    canvas.height = n;
    this.n = n;
    this.c = n / 2;
    this.r = n / 2;
    this.k = n / 800;
    this.iris = n * IRIS;
    this.pupil = n * PUPIL;
    this.brush = this.pupil * 0.3;
    const at = (rad: number): Pt => ({ x: this.c + Math.cos(INC) * rad, y: this.c + Math.sin(INC) * rad });
    this.inc = at(this.iris * 0.98);
    // beklerken uç irisin kenarında, girdiği yerin hemen içinde
    this.rest = at(this.iris * 0.86);
    this.reach = at(this.pupil * 0.92);
    this.gone = at(this.iris * 0.94);
    this.tip = { ...this.rest };

    this.ctx = canvas.getContext("2d")!;
    this.eyeLayer.width = this.eyeLayer.height = n;
    this.hazeLayer.width = this.hazeLayer.height = n;
    this.hctx = this.hazeLayer.getContext("2d", { willReadFrequently: true })!;
    this.baseLayer.width = this.baseLayer.height = n;
    this.bctx = this.baseLayer.getContext("2d")!;

    // Ne kadar buğu kaldığını ölçmek için gözbebeğinin içinden seyrek bir örnek
    const x0 = Math.floor(this.c - this.pupil) - 1;
    const w = Math.ceil(this.pupil * 2) + 2;
    this.box = { x: x0, y: x0, w };
    const stepPx = Math.max(2, Math.round(this.pupil / 38));
    const idx: number[] = [];
    for (let yy = 0; yy < w; yy += stepPx) {
      for (let xx = 0; xx < w; xx += stepPx) {
        const dx = x0 + xx + 0.5 - this.c;
        const dy = x0 + yy + 0.5 - this.c;
        if (dx * dx + dy * dy <= (this.pupil * 0.96) ** 2) idx.push((yy * w + xx) * 4 + 3);
      }
    }
    this.samples = Int32Array.from(idx);

    this.paintEye();
    this.paintHaze(1);
    this.draw();
  }

  /* ----- dışarıdan ------------------------------------------------------- */

  local(clientX: number, clientY: number, rect: DOMRect): Pt {
    return {
      x: ((clientX - rect.left) / rect.width) * this.n,
      y: ((clientY - rect.top) / rect.height) * this.n,
    };
  }

  setVisible(v: boolean) {
    if (v && !this.introShown && !this.touched && !this.still) {
      this.introShown = true;
      this.introAt = performance.now() + 500;
    }
    this.visible = v;
    this.kick();
  }

  move(p: Pt) {
    if (this.done || this.auto) return;
    const q = this.clamp(p);
    this.touched = true;
    this.aim = q;
    this.stroke(q);
    this.measure();
    this.kick();
  }

  release() {
    this.aim = null;
    this.last = null;
    this.kick();
  }

  /** Klavye: alet gözbebeğinde helezon çizerek buğuyu kendisi alır */
  autoClear() {
    if (this.done || this.auto) return;
    this.touched = true;
    if (this.still) {
      this.complete();
      return;
    }
    this.last = null;
    this.auto = { t: 0, dur: 1700 };
    this.kick();
  }

  reset(seed: number) {
    this.auto = null;
    this.aim = null;
    this.last = null;
    this.done = false;
    this.touched = false;
    this.fading = false;
    this.frac = 0;
    this.hazeAlpha = 1;
    this.baseDirty = true;
    this.specks = [];
    this.probe = 0;
    this.probeTo = 1;
    this.introAt = this.still ? 0 : performance.now() + 700;
    this.tip = { ...this.gone };
    this.paintHaze(seed);
    this.onProgress(0);
    this.draw();
    this.kick();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /* ----- çizim ----------------------------------------------------------- */

  private paintEye() {
    const g = this.eyeLayer.getContext("2d")!;
    const { n, c, r, iris, pupil, k } = this;
    const rnd = random(7);

    // Gözün akı: sıcak ve açık, kenara doğru Paye'nin koyu petrolüne kararır
    let gr = g.createRadialGradient(c, c, iris * 0.95, c, c, r);
    gr.addColorStop(0, "#f1e3d7");
    gr.addColorStop(0.25, "#e9d7c9");
    gr.addColorStop(0.55, "#c5ad9b");
    gr.addColorStop(0.8, "#6b665b");
    gr.addColorStop(1, "#12302d");
    g.fillStyle = gr;
    g.fillRect(0, 0, n, n);

    // İris: sıcak kahverengi zemin
    gr = g.createRadialGradient(c, c, pupil, c, c, iris);
    gr.addColorStop(0, "#82522b");
    gr.addColorStop(0.3, "#6a4220");
    gr.addColorStop(0.75, "#4b2b15");
    gr.addColorStop(1, "#26150a");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(c, c, iris, 0, TAU);
    g.fill();

    g.save();
    g.beginPath();
    g.arc(c, c, iris, 0, TAU);
    g.clip();
    g.lineCap = "round";
    // Işınsal lifler: kahve, amber ve koyu tonlar
    for (let i = 0; i < 560; i++) {
      const a = rnd() * TAU;
      const r1 = pupil * (1 + rnd() * 0.12);
      const r2 = iris * (0.72 + rnd() * 0.3);
      const bend = (rnd() - 0.5) * 0.16;
      const t = rnd();
      g.strokeStyle =
        t < 0.4
          ? `rgba(198,132,62,${0.14 + rnd() * 0.26})`
          : t < 0.62
            ? `rgba(233,162,59,${0.1 + rnd() * 0.2})`
            : t < 0.9
              ? `rgba(36,18,7,${0.16 + rnd() * 0.3})`
              : `rgba(255,226,180,${0.08 + rnd() * 0.14})`;
      g.lineWidth = (0.7 + rnd() * 1.8) * k;
      const am = a + bend;
      const rm = (r1 + r2) / 2;
      g.beginPath();
      g.moveTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
      g.quadraticCurveTo(
        c + Math.cos(am) * rm,
        c + Math.sin(am) * rm,
        c + Math.cos(a + bend * 0.4) * r2,
        c + Math.sin(a + bend * 0.4) * r2,
      );
      g.stroke();
    }
    // Gözbebeğinin çevresindeki kıvrımlı halka
    g.beginPath();
    for (let i = 0; i <= 240; i++) {
      const a = (i / 240) * TAU;
      const rr = pupil * 1.38 + Math.sin(a * 19 + 0.6) * pupil * 0.045 + Math.sin(a * 7 + 2) * pupil * 0.03;
      const x = c + Math.cos(a) * rr;
      const y = c + Math.sin(a) * rr;
      if (i) g.lineTo(x, y);
      else g.moveTo(x, y);
    }
    g.strokeStyle = "rgba(226,166,96,0.4)";
    g.lineWidth = 3.2 * k;
    g.stroke();
    // Kenardaki koyu halka
    gr = g.createRadialGradient(c, c, iris * 0.82, c, c, iris);
    gr.addColorStop(0, "rgba(22,11,4,0)");
    gr.addColorStop(1, "rgba(22,11,4,0.78)");
    g.fillStyle = gr;
    g.fillRect(0, 0, n, n);
    g.restore();

    // Gözbebeği: mercek alınınca içeriden gelen sıcak ışık
    gr = g.createRadialGradient(c - pupil * 0.14, c - pupil * 0.18, pupil * 0.04, c, c, pupil);
    gr.addColorStop(0, "#ffd894");
    gr.addColorStop(0.38, "#f0a74a");
    gr.addColorStop(0.78, "#bd6020");
    gr.addColorStop(0.95, "#5a240c");
    gr.addColorStop(1, "#2a1006");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(c, c, pupil, 0, TAU);
    g.fill();
    g.strokeStyle = "rgba(28,12,4,0.85)";
    g.lineWidth = 3 * k;
    g.beginPath();
    g.arc(c, c, pupil * 1.01, 0, TAU);
    g.stroke();
  }

  /** Katarakt: gözbebeğini kaplayan sütlü, ortası sarımtırak bir perde */
  private paintHaze(seed: number) {
    const g = this.hctx;
    const { n, c, pupil } = this;
    const rnd = random(seed * 977 + 13);
    g.globalCompositeOperation = "source-over";
    g.clearRect(0, 0, n, n);
    g.save();
    g.beginPath();
    g.arc(c, c, pupil * 1.02, 0, TAU);
    g.clip();
    const gr = g.createRadialGradient(c, c, 0, c, c, pupil * 1.02);
    gr.addColorStop(0, "rgba(222,200,156,0.99)");
    gr.addColorStop(0.42, "rgba(234,222,196,0.98)");
    gr.addColorStop(0.82, "rgba(243,238,228,0.96)");
    gr.addColorStop(1, "rgba(226,220,208,0.9)");
    g.fillStyle = gr;
    g.fillRect(0, 0, n, n);
    for (let i = 0; i < 110; i++) {
      const a = rnd() * TAU;
      const d = Math.sqrt(rnd()) * pupil;
      const x = c + Math.cos(a) * d;
      const y = c + Math.sin(a) * d;
      const rr = pupil * (0.05 + rnd() * 0.17);
      const cg = g.createRadialGradient(x, y, 0, x, y, rr);
      cg.addColorStop(
        0,
        rnd() < 0.62 ? `rgba(255,253,247,${0.12 + rnd() * 0.24})` : `rgba(196,172,128,${0.08 + rnd() * 0.16})`,
      );
      cg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = cg;
      g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
    // Kenardan içeri uzanan ince, beyaz kamalar
    for (let i = 0; i < 15; i++) {
      const a = rnd() * TAU;
      const w = 0.04 + rnd() * 0.07;
      const r0 = pupil * (0.42 + rnd() * 0.2);
      g.beginPath();
      g.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
      g.lineTo(c + Math.cos(a - w) * pupil * 1.03, c + Math.sin(a - w) * pupil * 1.03);
      g.lineTo(c + Math.cos(a + w) * pupil * 1.03, c + Math.sin(a + w) * pupil * 1.03);
      g.closePath();
      g.fillStyle = `rgba(255,255,255,${0.16 + rnd() * 0.22})`;
      g.fill();
    }
    g.restore();
    // Bundan sonra bu katmana yapılan her çizim buğuyu siler
    g.globalCompositeOperation = "destination-out";
    this.baseDirty = true;
  }

  private draw() {
    if (this.baseDirty) {
      const b = this.bctx;
      b.clearRect(0, 0, this.n, this.n);
      b.drawImage(this.eyeLayer, 0, 0);
      if (this.hazeAlpha > 0) {
        b.globalAlpha = this.hazeAlpha;
        b.drawImage(this.hazeLayer, 0, 0);
        b.globalAlpha = 1;
      }
      this.baseDirty = false;
    }
    const g = this.ctx;
    g.clearRect(0, 0, this.n, this.n);
    g.drawImage(this.baseLayer, 0, 0);
    for (const p of this.specks) {
      g.fillStyle = `rgba(255,251,242,${((1 - p.life / p.max) * 0.9).toFixed(3)})`;
      g.beginPath();
      g.arc(p.x, p.y, p.r, 0, TAU);
      g.fill();
    }
    this.drawProbe(g);
  }

  /** İnce, metal bir alet; irisin kenarındaki küçük girişten içeri uzanır */
  private drawProbe(g: CanvasRenderingContext2D) {
    if (this.probe < 0.01) return;
    const T = this.tip;
    const I = this.inc;
    const k = this.k;
    let dx = I.x - T.x;
    let dy = I.y - T.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    const nx = -dy;
    const ny = dx;
    const far = { x: I.x + dx * this.r * 1.4, y: I.y + dy * this.r * 1.4 };
    const at = (d: number, off = 0): Pt => ({ x: I.x + dx * d * k + nx * off * k, y: I.y + dy * d * k + ny * off * k });
    const line = (a: Pt, b: Pt) => {
      g.beginPath();
      g.moveTo(a.x, a.y);
      g.lineTo(b.x, b.y);
      g.stroke();
    };

    g.save();
    g.globalAlpha = this.probe;
    g.lineCap = "round";
    g.shadowColor = "rgba(40,16,4,0.42)";
    g.shadowBlur = 18 * k;
    g.shadowOffsetX = 7 * k;
    g.shadowOffsetY = 12 * k;
    // dıştaki kalın gövde
    g.strokeStyle = "#aab4b9";
    g.lineWidth = 19 * k;
    line(at(12), far);
    // içerideki ince uç
    g.strokeStyle = "#c9d1d5";
    g.lineWidth = 8.5 * k;
    line(T, at(16));
    g.shadowColor = "transparent";
    // parıltı ve gölge çizgileri
    g.strokeStyle = "rgba(255,255,255,0.8)";
    g.lineWidth = 2.4 * k;
    line({ x: T.x + nx * 1.6 * k, y: T.y + ny * 1.6 * k }, at(14, 1.6));
    line(at(14, 4.8), { x: far.x + nx * 4.8 * k, y: far.y + ny * 4.8 * k });
    g.strokeStyle = "rgba(64,74,80,0.5)";
    g.lineWidth = 2 * k;
    line({ x: T.x - nx * 2.6 * k, y: T.y - ny * 2.6 * k }, at(14, -2.6));
    line(at(14, -7.2), { x: far.x - nx * 7.2 * k, y: far.y - ny * 7.2 * k });
    // uç
    g.fillStyle = "rgba(255,255,255,0.95)";
    g.beginPath();
    g.arc(T.x, T.y, 4.6 * k, 0, TAU);
    g.fill();
    // aletin aldığı alan
    if (this.aim) {
      g.strokeStyle = "rgba(255,255,255,0.5)";
      g.lineWidth = 1.6 * k;
      g.beginPath();
      g.arc(T.x, T.y, this.brush * 0.95, 0, TAU);
      g.stroke();
    }
    g.restore();
  }

  /* ----- buğuyu almak ---------------------------------------------------- */

  /** Alet buğunun alındığı alanda kalır ve girdiği yere fazla yaklaşmaz */
  private clamp(p: Pt): Pt {
    const { c, inc, r } = this;
    let x = p.x;
    let y = p.y;
    const dx = x - c;
    const dy = y - c;
    const d = Math.hypot(dx, dy);
    const max = this.n * HIT;
    if (d > max) {
      x = c + (dx / d) * max;
      y = c + (dy / d) * max;
    }
    const ix = x - inc.x;
    const iy = y - inc.y;
    const id = Math.hypot(ix, iy) || 1;
    const min = r * 0.16;
    if (id < min) {
      x = inc.x + (ix / id) * min;
      y = inc.y + (iy / id) * min;
    }
    return { x, y };
  }

  private stroke(p: Pt) {
    const last = this.last;
    this.last = { ...p };
    if (!last) {
      this.dab(p.x, p.y);
      this.baseDirty = true;
      return;
    }
    const dx = p.x - last.x;
    const dy = p.y - last.y;
    const dist = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(dist / (this.brush * 0.3)));
    for (let i = 1; i <= steps; i++) this.dab(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
    this.baseDirty = true;
    if (dist > 0.5) this.spawn(p, Math.min(4, 1 + Math.floor(dist / (this.brush * 0.25))));
  }

  private dab(x: number, y: number) {
    if (Math.hypot(x - this.c, y - this.c) > this.pupil + this.brush) return;
    const g = this.hctx;
    const r = this.brush;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, "rgba(0,0,0,0.5)");
    gr.addColorStop(0.55, "rgba(0,0,0,0.32)");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  /** Alınan buğudan kopan kırıntılar aletin ucuna akar */
  private spawn(p: Pt, count: number) {
    if (this.still) return;
    const m = Math.round(count * Math.max(0.15, 1 - this.frac / CLEAR_AT));
    for (let i = 0; i < m && this.specks.length < 140; i++) {
      const a = Math.random() * TAU;
      const d = this.brush * (0.85 + Math.random() * 0.9);
      const x = p.x + Math.cos(a) * d;
      const y = p.y + Math.sin(a) * d;
      if (Math.hypot(x - this.c, y - this.c) > this.pupil * 0.98) continue;
      this.specks.push({ x, y, life: 0, max: 260 + Math.random() * 260, r: (1 + Math.random() * 1.9) * this.k });
    }
  }

  private measure() {
    const now = performance.now();
    if (now - this.lastMeasure < 90) return;
    this.lastMeasure = now;
    const { x, y, w } = this.box;
    const d = this.hctx.getImageData(x, y, w, w).data;
    const s = this.samples;
    let clear = 0;
    for (let i = 0; i < s.length; i++) if (d[s[i]] < 64) clear++;
    this.frac = clear / s.length;
    this.onProgress(Math.min(1, this.frac / CLEAR_AT));
    if (this.frac >= CLEAR_AT) this.complete();
  }

  private complete() {
    if (this.done) return;
    this.done = true;
    this.auto = null;
    this.aim = null;
    this.last = null;
    this.probeTo = 0;
    this.onProgress(1);
    if (this.still) {
      this.hazeAlpha = 0;
      this.baseDirty = true;
      this.probe = 0;
      this.draw();
      this.onCleared();
      return;
    }
    // kalan buğu çözülürken kırıntılar aletle birlikte dışarı çekilir
    for (let i = 0; i < 44; i++) {
      const a = Math.random() * TAU;
      const d = Math.sqrt(Math.random()) * this.pupil * 0.95;
      this.specks.push({
        x: this.c + Math.cos(a) * d,
        y: this.c + Math.sin(a) * d,
        life: Math.random() * 120,
        max: 420 + Math.random() * 360,
        r: (1 + Math.random() * 2) * this.k,
      });
    }
    this.fading = true;
    this.kick();
  }

  /* ----- döngü ----------------------------------------------------------- */

  private intro(now: number) {
    if (!this.introAt || this.touched || this.done) return -1;
    const t = (now - this.introAt) / INTRO;
    return t >= 1 ? -1 : Math.max(0, t);
  }

  private idlePos(now: number): Pt {
    if (this.done) return this.gone;
    const t = this.intro(now);
    if (t < 0) return this.rest;
    const k = Math.sin(Math.PI * t);
    return { x: this.rest.x + (this.reach.x - this.rest.x) * k, y: this.rest.y + (this.reach.y - this.rest.y) * k };
  }

  private kick() {
    if (!this.raf) this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const dt = this.prev ? Math.min(50, now - this.prev) : 16;
    this.prev = now;
    let busy = false;

    if (this.auto) {
      const a = this.auto;
      a.t += dt;
      const u = Math.min(1, a.t / a.dur);
      const ang = u * TAU * 3 + INC;
      const rad = this.pupil * (0.12 + 0.8 * u);
      this.aim = this.clamp({ x: this.c + Math.cos(ang) * rad, y: this.c + Math.sin(ang) * rad });
      this.stroke(this.aim);
      busy = true;
      if (u >= 1) this.complete();
    }

    if (this.aim) {
      this.tip = { ...this.aim };
    } else {
      const target = this.idlePos(now);
      const e = Math.min(1, dt / 110);
      this.tip.x += (target.x - this.tip.x) * e;
      this.tip.y += (target.y - this.tip.y) * e;
      if (Math.abs(target.x - this.tip.x) + Math.abs(target.y - this.tip.y) > 0.4) busy = true;
    }
    const intro = this.intro(now) >= 0 || (this.introAt > now && !this.touched && !this.done);
    if (intro) busy = true;

    if (Math.abs(this.probe - this.probeTo) > 0.004) {
      this.probe += (this.probeTo - this.probe) * Math.min(1, dt / 160);
      busy = true;
    } else {
      this.probe = this.probeTo;
    }

    if (this.fading) {
      this.hazeAlpha = Math.max(0, this.hazeAlpha - dt / 700);
      this.baseDirty = true;
      if (this.hazeAlpha === 0) {
        this.fading = false;
        this.onCleared();
      } else {
        busy = true;
      }
    }

    if (this.specks.length) {
      const t = this.tip;
      const f = Math.min(1, dt / 90) * 0.5;
      for (const p of this.specks) {
        p.life += dt;
        p.x += (t.x - p.x) * f;
        p.y += (t.y - p.y) * f;
      }
      this.specks = this.specks.filter((p) => p.life < p.max);
      busy = true;
    }

    this.draw();

    if (busy) {
      this.raf = requestAnimationFrame(this.frame);
    } else {
      this.raf = 0;
      this.prev = 0;
    }
  };
}
