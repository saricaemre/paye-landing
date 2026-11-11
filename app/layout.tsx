import type { Metadata, Viewport } from "next";
import { DM_Sans, Onest } from "next/font/google";
import "./globals.css";

/* Paye sitesinin kendi fontları */
const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-onest",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

/*
 * Kampanyaların kendi yazı katmanları yalnızca kendi sayfalarında yüklenir:
 * Rozha One app/davetlisiniz/layout.tsx'te, Instrument Serif
 * app/gozun-aydin/layout.tsx'te, DM Serif Display app/hayatin-ta-kendisi/layout.tsx'te.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.payeinsaniyardim.org.tr"),
  title: {
    default: "Paye İnsani Yardım Derneği",
    template: "%s | Paye İnsani Yardım Derneği",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2e2c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${onest.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Görünürlük animasyonları yalnızca JS varken devreye girsin */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
