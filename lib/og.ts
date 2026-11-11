/**
 * Paylaşım görselleri (opengraph-image.tsx) için ortak yardımcılar.
 */

/** Google Fonts'tan yalnızca gereken harfleri içeren TTF alt kümesi */
export async function googleFont(family: string, query: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:${query}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`Font bulunamadı: ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

/**
 * ImageResponse'un ürettiği PNG'yi JPEG'e çevirir. WhatsApp 300 KB'ı aşan
 * önizleme görsellerini düşürebiliyor; düz renkli bir kart JPEG'de 100 KB
 * civarında kalır. sharp, Next.js'in kendi isteğe bağlı bağımlılığıdır; yoksa
 * PNG olduğu gibi döner.
 */
export async function asJpeg(png: Response, quality = 84): Promise<Response> {
  const input = Buffer.from(await png.arrayBuffer());
  try {
    const { default: sharp } = await import("sharp");
    const jpeg = await sharp(input)
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    return new Response(new Uint8Array(jpeg), {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return new Response(new Uint8Array(input), { headers: { "Content-Type": "image/png" } });
  }
}
