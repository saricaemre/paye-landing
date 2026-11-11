import { LOGOTYPE_PATH, LOGOTYPE_VIEWBOX } from "./logotype-path";
import s from "./Logotype.module.css";

type Props = {
  className?: string;
  /** Açılışta harfler alttan yukarı suyla dolar gibi belirsin (yalnızca girişte) */
  fill?: boolean;
};

/**
 * "HAYATIN TA KENDİSİ" logotipi. Ekran okuyucular için metin, logotipi saran
 * başlıkta ayrıca yazılır; bu bileşen yalnızca görseldir.
 *
 * `fill` açıkken iki katman çizilir: altta logotipin soluk bir gölgesi, üstte
 * dalgalı bir maskenin ardında koyu petrol harfler. Maske bir kez, alttan
 * yukarı çekilir; harfler bir bardağın dolması gibi suyla dolar. Hareket
 * azaltma tercihinde harfler baştan dolu görünür.
 */
export function Logotype({ className, fill }: Props) {
  return (
    <span className={`${s.logo} ${className ?? ""}`} data-fill={fill ? "" : undefined} aria-hidden="true">
      {fill ? (
        <svg className={s.ghost} viewBox={LOGOTYPE_VIEWBOX} focusable="false">
          <path d={LOGOTYPE_PATH} />
        </svg>
      ) : null}
      <svg className={s.ink} viewBox={LOGOTYPE_VIEWBOX} focusable="false">
        <path d={LOGOTYPE_PATH} />
      </svg>
    </span>
  );
}
