import s from "./Cerceve.module.css";

/*
 * Davetiyenin altın çerçevesi (örnekteki gibi): dört kenarda ince bir çizgi,
 * köşelerde çizgi birleşmez; her iki uç kendi içine kıvrılan birer sarmalla
 * biter, köşe boş kalır. Sarmallar 140 birimlik sol üst köşe için çizildi,
 * öteki köşeler CSS'te aynalanır.
 *
 * Açılışta çizgiler kenarların ortasından köşelere uzanır, uçlar köşeye
 * varınca sarmala kıvrılır (`ciz`). Hareket azaltma tercihinde çerçeve çizili
 * gelir.
 */

/** Üst kenarın ucu: çizginin bittiği yerden (87,18) aşağı kıvrılan sarmal */
const KIVRIM_UST =
  "M87 18C93 21 96 26 94.5 33C92 47 83 57 72 57C61 57 54 48 54 39C54 30 60 23.5 68 23.5C75 23.5 80.5 29 80.5 35.5C80.5 39.5 78 42.5 74.5 43.5";
/** Sol kenarın ucu: aynı sarmalın köşegene göre aynası */
const KIVRIM_YAN =
  "M18 87C21 93 26 96 33 94.5C47 92 57 83 57 72C57 61 48 54 39 54C30 54 23.5 60 23.5 68C23.5 75 29 80.5 35.5 80.5C39.5 80.5 42.5 78 43.5 74.5";
/** Kenar çizgilerinin köşe kutusundaki parçası; kutunun kenarından sarmala doğru çizilir */
const UC_UST = "M141 18H85";
const UC_YAN = "M18 141V85";

const KOSELER = ["sol-ust", "sag-ust", "sol-alt", "sag-alt"] as const;
const KENARLAR = ["ust", "alt", "sol", "sag"] as const;

type Props = {
  className?: string;
  /** Açılışta çizilerek gelsin (girişteki davetiye) */
  ciz?: boolean;
  /** Küçük kart (bağış kartı): daha küçük köşe */
  kucuk?: boolean;
};

export function Cerceve({ className, ciz, kucuk }: Props) {
  return (
    <div
      className={`${s.cerceve} ${className ?? ""}`}
      data-ciz={ciz ? "" : undefined}
      data-kucuk={kucuk ? "" : undefined}
      aria-hidden="true"
    >
      {KENARLAR.map((k) => (
        <span key={k} className={s.kenar} data-k={k} />
      ))}
      {KOSELER.map((k) => (
        <svg key={k} className={s.kose} data-k={k} viewBox="0 0 140 140" focusable="false">
          <path className={s.uc} d={UC_UST} pathLength={1} />
          <path className={s.uc} d={UC_YAN} pathLength={1} />
          <path className={s.kivrim} d={KIVRIM_UST} pathLength={1} />
          <path className={s.kivrim} d={KIVRIM_YAN} pathLength={1} />
        </svg>
      ))}
    </div>
  );
}
