"use client";

import { useState } from "react";
import { Icon } from "@/components/landing/Icon";
import { Rich } from "@/components/landing/Rich";
import { useUtm } from "@/components/landing/useUtm";
import { SUNNET, sunnetDonateHref } from "@/lib/config";
import { countWord, formatTRY } from "@/lib/format";
import { Cerceve } from "./Cerceve";
import s from "./LcvKarti.module.css";

const PRESETS = [1, 3, 5, 10];
const MAX = 500;

type Props = {
  /** Kartın tepesindeki başlık ("Davetlisiniz"); altına alt başlık eklenmez */
  title: string;
  /** Etki satırının sonu, ör. "sünnet olur." → "Üç çocuk sünnet olur." */
  line: string;
  /** Butonun altındaki satırlar (kapsam, sonra ne olur, havale, WhatsApp) */
  children?: React.ReactNode;
};

/**
 * Davetin cevap kartı: Biri Kaldı'nın bağış kartıyla aynı akış (dört seçenek,
 * başka sayı, etki satırı, tek buton, ortak notlar), davetiyedeki altın
 * çerçevenin küçüğü içinde ve örnekteki hap düğmelerle. Tepesinde "Davetlisiniz"
 * (revizyon, 10 Kasım 2026; önceki "LCV, Lütfen cevap veriniz").
 */
export function LcvKarti({ title, line, children }: Props) {
  const [qty, setQty] = useState(1);
  const [draft, setDraft] = useState("1");
  const utm = useUtm();
  const total = qty * SUNNET.pricePerChild;

  const set = (n: number) => {
    const next = Math.min(MAX, Math.max(1, Math.round(n) || 1));
    setQty(next);
    setDraft(String(next));
  };

  return (
    <div className={s.kart}>
      <Cerceve kucuk className={s.cerceve} />

      <h3 className={s.baslik}>{title}</h3>

      <fieldset className={s.qty}>
        <legend className={s.legend}>Kaç çocuğun sünnetini üstleniyorsunuz?</legend>
        <div className={s.presets}>
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              className={s.preset}
              aria-pressed={qty === n}
              onClick={() => set(n)}
            >
              <strong>{n}</strong>
              <span>çocuk</span>
            </button>
          ))}
        </div>

        <div className={s.stepper}>
          <span className={s.stepperLabel}>Başka bir sayı</span>
          <div className={s.stepperCtrl}>
            <button
              type="button"
              className={s.stepBtn}
              onClick={() => set(qty - 1)}
              disabled={qty <= 1}
              aria-label="Bir azalt"
            >
              <Icon name="minus" size={16} />
            </button>
            <input
              className={s.input}
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label="Çocuk sayısı"
              value={draft}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                setDraft(v);
                if (v) set(Number(v));
              }}
              onBlur={() => set(Number(draft))}
            />
            <button
              type="button"
              className={s.stepBtn}
              onClick={() => set(qty + 1)}
              disabled={qty >= MAX}
              aria-label="Bir artır"
            >
              <Icon name="plus" size={16} />
            </button>
          </div>
        </div>
      </fieldset>

      <div className={s.total} aria-live="polite" aria-atomic="true">
        <p className={s.line} key={qty}>
          <Icon name="heartHandshake" size={18} />
          <span>
            {countWord(qty)} çocuk <Rich text={line} />
          </span>
        </p>
        <strong key={total}>{formatTRY(total)}</strong>
      </div>

      <a className={s.donate} href={sunnetDonateHref(qty, utm)}>
        {countWord(qty)} çocuğun sünnetini üstlenin
      </a>

      {children}
    </div>
  );
}
