import Link from "next/link";
import type { Metadata } from "next";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Kampanya sayfaları",
  robots: { index: false },
};

const campaigns = [
  { href: "/davetlisiniz", name: "Davetlisiniz", project: "Afrika Sünnet Projesi", ready: true },
  { href: "/gozun-aydin", name: "Gözün Aydın", project: "Katarakt Ameliyatı", ready: true },
  { href: "/hayatin-ta-kendisi", name: "Hayatın Ta Kendisi", project: "Su Kuyusu", ready: true },
];

/** Geliştirme sırasında kampanyalara hızlı erişim. Yayında kullanılmaz. */
export default function Index() {
  return (
    <main className={s.main}>
      <p className={s.kicker}>Paye İnsani Yardım Derneği</p>
      <h1 className={s.title}>Kampanya sayfaları</h1>
      <ul className={s.list}>
        {campaigns.map((c) => (
          <li key={c.project}>
            {c.ready ? (
              <Link href={c.href} className={s.card}>
                <span className={s.project}>{c.project}</span>
                <span className={s.name}>{c.name}</span>
                <span className={s.go}>Aç →</span>
              </Link>
            ) : (
              <span className={`${s.card} ${s.soon}`}>
                <span className={s.project}>{c.project}</span>
                <span className={s.name}>Sırada</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className={s.hint}>
        Değiştirilecek metinleri görmek için sayfayı <code>?taslak</code> ile açın.
      </p>
    </main>
  );
}
