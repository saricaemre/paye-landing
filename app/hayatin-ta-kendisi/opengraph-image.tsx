import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SU_KUYUSU } from "@/lib/config";
import { formatTRY } from "@/lib/format";
import { asJpeg, googleFont as font } from "@/lib/og";
import { LOGOTYPE_PATH, LOGOTYPE_VIEWBOX } from "./_components/logotype-path";

/*
 * WhatsApp ve sosyal medyada paylaşılınca görünen kart (1200×630, JPEG).
 * Girişin aynısı: puslu gökyüzünde logotip, altta duvarın üstünde yürüyen çocuk
 * ve annesi. Derleme sırasında bir kez üretilir. Hazır bir görsel konulmak
 * istenirse bu dosya silinip aynı klasöre opengraph-image.jpg konabilir.
 */

export const alt = "Hayatın ta kendisi: Paye İnsani Yardım Derneği ile Afrika’da su kuyusu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const HAZE = "#EBE5E3";
const INK = "#094C50";

export default async function OpengraphImage() {
  const price = formatTRY(SU_KUYUSU.pricePerShare);
  const foot = `Paye İnsani Yardım · Afrika’da su kuyusu · Bir hisse ${price}`;

  const photo = await readFile(join(process.cwd(), "app/hayatin-ta-kendisi/og-hero.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGOTYPE_VIEWBOX}"><path fill="${INK}" d="${LOGOTYPE_PATH}"/></svg>`;
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  let fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 500 }[] = [];
  try {
    fonts = [{ name: "Onest", data: await font("Onest", "wght@500", foot), style: "normal", weight: 500 }];
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
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          background: HAZE,
          fontFamily: "Onest",
        }}
      >
        <img
          src={photoSrc}
          width={1200}
          height={373}
          style={{ position: "absolute", left: 0, bottom: 0 }}
          alt=""
        />
        {/* fotoğrafın üst kenarı gökyüzüne karışsın */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 257,
            height: 50,
            display: "flex",
            background: `linear-gradient(to bottom, ${HAZE}, rgba(235,229,227,0))`,
          }}
        />
        <img src={logoSrc} width={430} height={180} style={{ marginTop: 58 }} alt="" />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 22,
            display: "flex",
            justifyContent: "center",
            fontSize: 21,
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {foot}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
  return asJpeg(png);
}
