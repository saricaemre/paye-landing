"use client";

import { useState } from "react";
import { Icon } from "@/components/landing/Icon";
import { PayeMark } from "@/components/landing/PayeMark";
import { useUtm } from "@/components/landing/useUtm";
import { KATARAKT, kataraktDonateHref, kataraktFundHref } from "@/lib/config";
import { countWord, formatTRY } from "@/lib/format";
import s from "./DonateWidget.module.css";

const PRESETS = [1, 2, 5, 10];
const FUND_PRESETS = [250, 500, 1000, 2000];
const MAX = 500;

type Mode = "ameliyat" | "fon";

type Props = {
  /**
   * Butonun altındaki satırlar (kapsam, sonra ne olur, havale, WhatsApp);
   * sunucuda çizilip seçeneğe göre verilir.
   */
  notes?: { ameliyat: React.ReactNode; fon: React.ReactNode };
};

/** Sitedeki bağış kartının düzeni: seçenek, adet ya da tutar, toplam, buton. */
export function DonateWidget({ notes }: Props) {
  const [mode, setMode] = useState<Mode>("ameliyat");
  const [qty, setQty] = useState(1);
  const [draft, setDraft] = useState("1");
  const [amount, setAmount] = useState(500);
  const [amountDraft, setAmountDraft] = useState("500");
  const utm = useUtm();

  const price = KATARAKT.pricePerPatient;
  const min = KATARAKT.fundMin;

  const setQ = (n: number) => {
    const next = Math.min(MAX, Math.max(1, Math.round(n) || 1));
    setQty(next);
    setDraft(String(next));
  };

  const setA = (n: number) => {
    const next = Math.max(min, Math.round(n) || min);
    setAmount(next);
    setAmountDraft(String(next));
  };

  const fund = mode === "fon";
  const total = fund ? amount : qty * price;
  const href = fund ? kataraktFundHref(amount, utm) : kataraktDonateHref(qty, utm);
  const label = fund
    ? `${formatTRY(amount)} ile ameliyatlara ortak olun`
    : qty === 1
      ? "Bir ameliyatı üstlenin"
      : `${countWord(qty)} ameliyatı üstlenin`;

  return (
    <div className={s.card}>
      <div className={s.modes} role="group" aria-label="Bağış seçeneği">
        <button type="button" className={s.mode} aria-pressed={!fund} onClick={() => setMode("ameliyat")}>
          Tam ameliyat
        </button>
        <button type="button" className={s.mode} aria-pressed={fund} onClick={() => setMode("fon")}>
          Destek fonu
        </button>
      </div>

      <div className={s.head}>
        <div className={s.headText}>
          <p className={s.name}>{fund ? "Katarakt Destek Fonu" : "Katarakt Ameliyatı"}</p>
          <p className={s.sub}>{fund ? "Dilediğiniz tutarla" : "Bir hastanın ameliyatı"}</p>
        </div>
        <p className={s.unit}>
          <strong>{formatTRY(fund ? min : price)}</strong>
          <span>{fund ? "en az" : "hasta başı"}</span>
        </p>
      </div>

      {fund ? (
        <fieldset className={s.qty}>
          <legend className={s.legend}>Ne kadar?</legend>
          <div className={s.presets}>
            {FUND_PRESETS.map((n) => (
              <button key={n} type="button" className={s.preset} aria-pressed={amount === n} onClick={() => setA(n)}>
                {formatTRY(n)}
              </button>
            ))}
          </div>
          <label className={s.stepper}>
            <span className={s.stepperLabel}>Başka bir tutar</span>
            <span className={s.amountCtrl}>
              <span aria-hidden="true">₺</span>
              <input
                className={`${s.input} ${s.amountInput}`}
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label={`Bağış tutarı, en az ${formatTRY(min)}`}
                value={amountDraft}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 7);
                  setAmountDraft(v);
                  if (v && Number(v) >= min) setAmount(Number(v));
                }}
                onBlur={() => setA(Number(amountDraft))}
              />
            </span>
          </label>
        </fieldset>
      ) : (
        <fieldset className={s.qty}>
          <legend className={s.legend}>Kaç hastanın ameliyatını üstlenmek istersiniz?</legend>
          <div className={s.presets}>
            {PRESETS.map((n) => (
              <button key={n} type="button" className={s.preset} aria-pressed={qty === n} onClick={() => setQ(n)}>
                {n}
              </button>
            ))}
          </div>
          <div className={s.stepper}>
            <span className={s.stepperLabel}>Hasta sayısı</span>
            <div className={s.stepperCtrl}>
              <button
                type="button"
                className={s.stepBtn}
                onClick={() => setQ(qty - 1)}
                disabled={qty <= 1}
                aria-label="Bir azalt"
              >
                <Icon name="minus" size={16} />
              </button>
              <input
                className={s.input}
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Hasta sayısı"
                value={draft}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setDraft(v);
                  if (v) setQ(Number(v));
                }}
                onBlur={() => setQ(Number(draft))}
              />
              <button
                type="button"
                className={s.stepBtn}
                onClick={() => setQ(qty + 1)}
                disabled={qty >= MAX}
                aria-label="Bir artır"
              >
                <Icon name="plus" size={16} />
              </button>
            </div>
          </div>
        </fieldset>
      )}

      <div className={s.total} aria-live="polite" aria-atomic="true">
        <span>Toplam</span>
        <strong>{formatTRY(total)}</strong>
      </div>

      <a className={s.donate} href={href}>
        <span>{label}</span>
        <span className={s.coin} aria-hidden="true">
          <PayeMark />
        </span>
      </a>

      {notes ? (fund ? notes.fon : notes.ameliyat) : null}
    </div>
  );
}
