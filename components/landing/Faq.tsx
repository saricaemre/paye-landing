import { Icon } from "./Icon";
import s from "./Faq.module.css";

export type FaqItem = { q: string; a: React.ReactNode };

/** Sitedeki SSS düzeni: her soru ayrı kart, solda amber sıra numarası. */
export function Faq({ items, firstOpen = true }: { items: FaqItem[]; firstOpen?: boolean }) {
  return (
    <div className={s.list}>
      {items.map((item, i) => (
        <details key={item.q} className={s.item} name="sss" open={firstOpen && i === 0}>
          <summary className={s.q}>
            <span className={s.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={s.qText}>{item.q}</span>
            <span className={s.icon} aria-hidden="true">
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <div className={s.a}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}
