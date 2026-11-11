"use client";

import { useState } from "react";
import { Icon } from "@/components/landing/Icon";
import { PayeMark } from "@/components/landing/PayeMark";
import { useUtm } from "@/components/landing/useUtm";
import {
  SU_KUYUSU,
  type WellType,
  suKuyusuMonthlyHref,
  suKuyusuShareHref,
  suKuyusuWellHref,
  whatsappHref,
} from "@/lib/config";
import { countWord, formatTRY } from "@/lib/format";
import s from "./DonateWidget.module.css";

const SHARE_PRESETS = [1, 2, 5, 10];
const MONTHLY_PRESETS = [250, 500, 1000, 2000];
const MAX = 500;

type Mode = "hisse" | "kuyu" | "aylik";

const WELLS: { type: WellType; name: string; sub: string; price: number }[] = [
  { type: "el-pompali", name: "El Pompalı Su Kuyusu", sub: "Derin sondaj ve el pompası", price: SU_KUYUSU.handPump },
  { type: "sadirvanli", name: "Şadırvanlı Su Kuyusu", sub: "Su deposu ve şadırvanlı", price: SU_KUYUSU.fountain },
];

type Props = {
  /** Butonun altındaki satırlar; sunucuda çizilip seçeneğe göre verilir */
  notes?: { hisse: React.ReactNode; kuyu: React.ReactNode; aylik: React.ReactNode };
  /** Tabela satırı: hisse ve bütün kuyuda butonun hemen altında */
  plate?: { hisse: React.ReactNode; kuyu: React.ReactNode };
  /** Aylık bağış WhatsApp'tan alınırken gidecek mesaj; {tutar} yerine tutar gelir */
  monthlyMessage: string;
};

const lower = (n: number) => (n <= 10 ? countWord(n).toLocaleLowerCase("tr") : String(n));

/** Aylık tutarın bir yılda neye dönüştüğü, tek cümle */
function yearly(amount: number) {
  const year = amount * 12;
  const shares = Math.floor(year / SU_KUYUSU.pricePerShare);
  if (shares < 1) return `Bir yılda ${formatTRY(year)} eder ve havuzda diğer bağışlarla birleşir.`;
  if (shares === 1 && year === SU_KUYUSU.pricePerShare)
    return `Bir yılda ${formatTRY(year)} eder; bu tam bir kuyu hissesi demek.`;
  return `Bir yılda ${formatTRY(year)} eder; bu da ${lower(shares)} kuyu hissesi demek.`;
}

/** Sitedeki bağış kartının düzeni: seçenek, adet ya da tutar, toplam, buton. */
export function DonateWidget({ notes, plate, monthlyMessage }: Props) {
  const [mode, setMode] = useState<Mode>("hisse");
  const [qty, setQty] = useState(1);
  const [draft, setDraft] = useState("1");
  const [well, setWell] = useState<WellType>("el-pompali");
  const [amount, setAmount] = useState(250);
  const [amountDraft, setAmountDraft] = useState("250");
  const utm = useUtm();

  const price = SU_KUYUSU.pricePerShare;
  const min = SU_KUYUSU.monthlyMin;
  const chosen = WELLS.find((w) => w.type === well) ?? WELLS[0];
  const viaWhatsapp = mode === "aylik" && SU_KUYUSU.monthlyVia === "whatsapp";

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

  const total = mode === "hisse" ? qty * price : mode === "kuyu" ? chosen.price : amount;
  const href =
    mode === "hisse"
      ? suKuyusuShareHref(qty, utm)
      : mode === "kuyu"
        ? suKuyusuWellHref(well, utm)
        : viaWhatsapp
          ? whatsappHref(monthlyMessage.replace("{tutar}", formatTRY(amount)))
          : suKuyusuMonthlyHref(amount, utm);
  const label =
    mode === "hisse"
      ? qty === 1
        ? "Bir kuyuya ortak olun"
        : `${countWord(qty)} hisseyle ortak olun`
      : mode === "kuyu"
        ? well === "el-pompali"
          ? "El pompalı kuyu açın"
          : "Şadırvanlı kuyu açın"
        : viaWhatsapp
          ? `WhatsApp’tan her ay ${formatTRY(amount)} ile katılın`
          : `Her ay ${formatTRY(amount)} ile katılın`;

  // Bir hissenin yaklaşık kaç kişinin suyu olduğu (Paye'den gelecek sayıyla)
  const people = Math.round((qty * SU_KUYUSU.peoplePerWell) / SU_KUYUSU.sharesPerWell);

  return (
    <div className={s.card}>
      <div className={s.modes} role="group" aria-label="Bağış seçeneği">
        <button type="button" className={s.mode} aria-pressed={mode === "hisse"} onClick={() => setMode("hisse")}>
          <span>Hisse</span>
          <small>{formatTRY(price)}</small>
        </button>
        <button type="button" className={s.mode} aria-pressed={mode === "kuyu"} onClick={() => setMode("kuyu")}>
          <span>Bütün kuyu</span>
          <small>{formatTRY(SU_KUYUSU.handPump)}’den</small>
        </button>
        <button type="button" className={s.mode} aria-pressed={mode === "aylik"} onClick={() => setMode("aylik")}>
          <span>Her ay</span>
          <small>{formatTRY(min)}’den</small>
        </button>
      </div>

      {mode === "hisse" ? (
        <>
          <fieldset className={s.qty}>
            <legend className={s.legend}>Kaç hisse almak istersiniz?</legend>
            <div className={s.presets}>
              {SHARE_PRESETS.map((n) => (
                <button key={n} type="button" className={s.preset} aria-pressed={qty === n} onClick={() => setQ(n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className={s.stepper}>
              <span className={s.stepperLabel}>Hisse sayısı</span>
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
                  aria-label="Hisse sayısı"
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
          <p className={s.yearly}>
            {qty >= SU_KUYUSU.sharesPerWell ? (
              <>
                {qty} hisse {formatTRY(qty * price)} ediyor. Bütün bir el pompalı kuyu {formatTRY(SU_KUYUSU.handPump)};
                kendi tabelasıyla birlikte.{" "}
                <button
                  type="button"
                  className={s.switch}
                  onClick={() => {
                    setWell("el-pompali");
                    setMode("kuyu");
                  }}
                >
                  Bütün kuyuya geçin
                </button>
              </>
            ) : (
              <>
                Bir kuyu yaklaşık <span data-ph="">{SU_KUYUSU.peoplePerWell}</span> kişiye su veriyor;{" "}
                {qty === 1 ? "bir hisse" : `${lower(qty)} hisse`} yaklaşık <span data-ph="">{people}</span> kişinin
                suyu demek.
              </>
            )}
          </p>
        </>
      ) : null}

      {mode === "kuyu" ? (
        <fieldset className={s.wells}>
          <legend className={s.legend}>Hangi kuyuyu açmak istersiniz?</legend>
          {WELLS.map((w) => (
            <button
              key={w.type}
              type="button"
              className={s.wellOption}
              aria-pressed={well === w.type}
              onClick={() => setWell(w.type)}
            >
              <span className={s.wellText}>
                <strong>{w.name}</strong>
                <span>{w.sub}</span>
              </span>
              <span className={s.wellPrice}>{formatTRY(w.price)}</span>
            </button>
          ))}
          <p className={s.yearly}>
            Bir {well === "el-pompali" ? "el pompalı" : "şadırvanlı"} kuyu yaklaşık{" "}
            <span data-ph="">{well === "el-pompali" ? SU_KUYUSU.peoplePerWell : SU_KUYUSU.peoplePerFountain}</span>{" "}
            kişiye su veriyor.
          </p>
        </fieldset>
      ) : null}

      {mode === "aylik" ? (
        <>
          <fieldset className={s.qty}>
            <legend className={s.legend}>Her ay ne kadar?</legend>
            <div className={s.presets}>
              {MONTHLY_PRESETS.map((n) => (
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
                  aria-label={`Aylık bağış tutarı, en az ${formatTRY(min)}`}
                  value={amountDraft}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setAmountDraft(v);
                    if (v && Number(v) >= min) setAmount(Number(v));
                  }}
                  onBlur={() => setA(Number(amountDraft))}
                />
              </span>
            </label>
          </fieldset>
          <p className={s.yearly}>{yearly(amount)}</p>
        </>
      ) : null}

      <div className={s.total} aria-live="polite" aria-atomic="true">
        <span>{mode === "aylik" ? "Her ay" : "Toplam"}</span>
        <strong>{formatTRY(total)}</strong>
      </div>

      <a className={s.donate} href={href}>
        <span>{label}</span>
        {viaWhatsapp ? (
          <span className={s.wa} aria-hidden="true">
            <Icon name="whatsapp" size={20} />
          </span>
        ) : (
          <span className={s.coin} aria-hidden="true">
            <PayeMark />
          </span>
        )}
      </a>

      {plate && mode !== "aylik" ? <div className={s.plateRow}>{plate[mode]}</div> : null}

      {notes ? notes[mode] : null}
    </div>
  );
}
