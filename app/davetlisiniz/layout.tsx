import { Rozha_One } from "next/font/google";

/*
 * Sünnet kampanyasının ikinci konsepti ("Davetlisiniz", 8 Kasım 2026). Başlık
 * harfi Rozha One (revizyon talimatı, 10 Kasım 2026; önceki Yeseva One): tek
 * ağırlıklı (400), çok yüksek kontrastlı bir display harfi. Yalnızca büyük
 * başlıklarda kullanılır; gövde ve ara başlıklar Paye'nin DM Sans'ı, düğmeler
 * Onest. latin-ext alt kümesi Türkçe harfleri (Ğ ğ Ş ş İ ı) taşır. Google'ın
 * <link>'i yerine next/font: dosya derlemede indirilip sitenin kendisinden sunulur.
 * Yalnızca bu sayfada yüklenir.
 */
const rozha = Rozha_One({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

export default function DavetlisinizLayout({ children }: { children: React.ReactNode }) {
  return <div className={rozha.variable}>{children}</div>;
}
