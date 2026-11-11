import { Instrument_Serif } from "next/font/google";

/*
 * Katarakt kampanyasının yazı katmanı: Instrument Serif.
 * Yalnızca bu sayfada yüklenir; Paye'nin Onest ve DM Sans'ı kök layout'tan gelir.
 */
const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export default function GozunAydinLayout({ children }: { children: React.ReactNode }) {
  return <div className={instrument.variable}>{children}</div>;
}
