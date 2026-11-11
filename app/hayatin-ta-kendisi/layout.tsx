import { DM_Serif_Display } from "next/font/google";

/*
 * Su kuyusu kampanyasının yazı katmanı: DM Serif Display. Gövdedeki DM Sans'la
 * aynı aileden gelir; başlıklarda ve vurgularda (italik) kullanılır. Girişteki
 * "HAYATIN TA KENDİSİ" Emre'nin logotipidir, yazı tipi değil (SVG). Yalnızca bu
 * sayfada yüklenir; Paye'nin Onest ve DM Sans'ı kök layout'tan gelir.
 */
const display = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-su",
  display: "swap",
});

export default function HayatinTaKendisiLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
