import s from "./EyeChart.module.css";

type Row = { letters: string; acuity: string };

/**
 * Kapanıştaki göz tablosu: yukarıdan aşağı okununca "GÖZÜN AYDIN".
 * Ekrana girince satırlar yukarıdan aşağı sırayla netleşir. Ekran
 * okuyucular tabloyu atlar; bölüm başlığı ayrıca yazılıdır.
 */
export function EyeChart({ rows }: { rows: Row[] }) {
  return (
    <div className={s.box} data-reveal="self" aria-hidden="true">
      <div className={s.chart}>
        {rows.map((r, i) => (
          <div key={r.letters} className={s.row} style={{ "--i": i } as React.CSSProperties}>
            <span className={s.acuity}>{r.acuity}</span>
            <span className={s.letters}>
              {Array.from(r.letters).map((ch, j) => (
                <span key={j}>{ch}</span>
              ))}
            </span>
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}
