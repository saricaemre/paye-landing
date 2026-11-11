import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { KATARAKT } from "@/lib/config";
import { formatTRY } from "@/lib/format";
import { asJpeg, googleFont as font } from "@/lib/og";

/*
 * WhatsApp ve sosyal medyada paylaşılınca görünen kart (1200×630, JPEG).
 * Derleme sırasında bir kez üretilir. Hazır bir görsel konulmak istenirse
 * bu dosya silinip aynı klasöre opengraph-image.jpg konabilir.
 */

export const alt = "Gözün aydın: Paye İnsani Yardım Derneği ile Afrika’da katarakt ameliyatı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const TITLE = "Gözün aydın";
const LINE = "Yarım saati bulmayan bir ameliyat, Afrika’da bir insanın yeniden görmesini sağlıyor.";

export default async function OpengraphImage() {
  const price = formatTRY(KATARAKT.pricePerPatient);
  const foot = `Paye İnsani Yardım · Katarakt ameliyatı · ${price}`;

  const lens = await readFile(join(process.cwd(), "app/gozun-aydin/og-lens.jpg"));
  const lensSrc = `data:image/jpeg;base64,${lens.toString("base64")}`;

  let fonts: { name: string; data: ArrayBuffer; style: "normal" | "italic"; weight: 400 | 600 }[] = [];
  try {
    fonts = [
      { name: "Instrument Serif", data: await font("Instrument+Serif", "ital@0", TITLE), style: "normal", weight: 400 },
      { name: "Instrument Serif", data: await font("Instrument+Serif", "ital@1", LINE), style: "italic", weight: 400 },
      { name: "Onest", data: await font("Onest", "wght@600", foot), style: "normal", weight: 600 },
    ];
  } catch {
    // ağ yoksa varsayılan yazı tipiyle üretilir
    fonts = [];
  }

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(160deg, #123c39 0%, #0e2e2c 55%, #0a2321 100%)",
          color: "#fff",
          fontFamily: "Onest",
        }}
      >
        {/* mercek */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 65,
            width: 500,
            height: 500,
            borderRadius: 9999,
            border: "1.5px solid rgba(233,162,59,0.85)",
            padding: 14,
            display: "flex",
          }}
        >
          <img
            src={lensSrc}
            width={470}
            height={470}
            style={{ borderRadius: 9999, objectFit: "cover" }}
            alt=""
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 80px",
            width: 620,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {TITLE}
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 34,
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.86)",
            }}
          >
            {LINE}
          </div>
          <div
            style={{
              marginTop: 44,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 21,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#1E6E6A",
                border: "2px solid #E9A23B",
              }}
            />
            {foot}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
  return asJpeg(png);
}
