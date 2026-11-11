#!/usr/bin/env node
/**
 * Hayatın Ta Kendisi: düz petrol zemin üstünde üretilmiş bir damla görselinin
 * zeminini ayıklar, damlayı çerçeveye oturtur ve saydam WebP olarak kaydeder.
 *
 *   node scripts/damla-zemin.mjs girdi.png public/hayatin-ta-kendisi/damla-saglik.webp
 *
 * Zemin rengi dört köşeden okunur; zemin kenarlardan içeri doğru yayılarak
 * bulunur (damlanın içindeki koyu gökyüzü silinmesin diye damlanın iç bölgesine
 * girilmez); kenarda zemin renginden arındırılmış yumuşak bir alfa kalır.
 * Görsel üretirken istem: "isolated on a plain flat solid dark teal background
 * (hex 0E2E2C), nothing else in the frame".
 */
import sharp from "sharp";

const [input, output, sizeArg] = process.argv.slice(2);
if (!input || !output) {
  console.error("Kullanım: node scripts/damla-zemin.mjs girdi.png çıktı.webp [ölçü=760]");
  process.exit(1);
}
const SIZE = Number(sizeArg) || 760;

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const px = (x, y) => (y * w + x) * 3;

// zemin rengi: dört köşenin ortancası
const ornek = [];
for (const [cx, cy] of [[0, 0], [w - 40, 0], [0, h - 40], [w - 40, h - 40]])
  for (let y = cy; y < cy + 40; y += 2) for (let x = cx; x < cx + 40; x += 2) ornek.push(px(x, y));
const med = (i) => {
  const a = ornek.map((p) => data[p + i]).sort((m, n) => m - n);
  return a[a.length >> 1];
};
const bg = [med(0), med(1), med(2)];

const uzak = new Float32Array(w * h);
for (let i = 0; i < w * h; i++) {
  const p = i * 3;
  uzak[i] = Math.hypot(data[p] - bg[0], data[p + 1] - bg[1], data[p + 2] - bg[2]);
}

// damlanın sınır kutusu
let x0 = w, x1 = 0, y0 = h, y1 = 0;
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++)
    if (uzak[y * w + x] > 45) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
const cx = (x0 + x1) / 2;
const cy = (y0 + y1) / 2 + (y1 - y0) * 0.03;
const r = Math.min(x1 - x0, y1 - y0) / 2;

// kenarlardan içeri doğru zemini yay
const T_LO = 10, T_HI = 34;
const zemin = new Uint8Array(w * h);
const yigin = [];
const it = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const i = y * w + x;
  if (zemin[i] || uzak[i] >= T_HI) return;
  if (Math.hypot(x - cx, y - cy) < r * 0.9) return;
  zemin[i] = 1;
  yigin.push(i);
};
for (let x = 0; x < w; x++) { it(x, 0); it(x, h - 1); }
for (let y = 0; y < h; y++) { it(0, y); it(w - 1, y); }
while (yigin.length) {
  const i = yigin.pop();
  const x = i % w, y = (i - x) / w;
  it(x + 1, y); it(x - 1, y); it(x, y + 1); it(x, y - 1);
}

// alfa ve kenarda zemin renginden arındırma
const rgba = Buffer.alloc(w * h * 4);
for (let i = 0; i < w * h; i++) {
  const p = i * 3, q = i * 4;
  const a = zemin[i] ? Math.max(0, Math.min(1, (uzak[i] - T_LO) / (T_HI - T_LO))) : 1;
  for (let k = 0; k < 3; k++) {
    const c = a > 0.02 ? (data[p + k] - (1 - a) * bg[k]) / a : data[p + k];
    rgba[q + k] = Math.max(0, Math.min(255, Math.round(c)));
  }
  rgba[q + 3] = Math.round(a * 255);
}

// damlanın çerçeveyi doldurduğu kare kırpım
const kenar = Math.round(Math.max(x1 - x0, y1 - y0) * 1.04);
const left = Math.max(0, Math.round(cx - kenar / 2));
const top = Math.max(0, Math.round((y0 + y1) / 2 - kenar / 2));
await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left, top, width: Math.min(kenar, w - left), height: Math.min(kenar, h - top) })
  .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 84, alphaQuality: 92, effort: 6 })
  .toFile(output);
console.log(`${output}: zemin rgb(${bg.join(", ")}), ${SIZE}×${SIZE}`);
