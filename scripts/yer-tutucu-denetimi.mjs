#!/usr/bin/env node
/**
 * Yayın öncesi denetim: sayfalarda gerçek bilgiyle değiştirilmemiş bir şey
 * kalmış mı?
 *
 *   [[...]]        metin yer tutucusu (taslak görünümünde sarı)
 *   data-ph        SSS'lerdeki "[... netleştirilecek]" notları
 *   src: null      fotoğrafı henüz konmamış görsel yuvası
 *   @yer-tutucu    köşeli parantez taşıyamayan bir değer (ör. bir sayı sabiti);
 *                  açıklama satırına yazılır, değer gerçeğiyle değişince silinir
 *
 * Açıklama satırlarındaki [[...]] sayılmaz; yalnızca @yer-tutucu işareti sayılır.
 *
 * Kullanım:  npm run denetim            (bütün kampanyalar)
 *            npm run denetim davetlisiniz (yalnızca biri)
 *
 * Bir şey kalmışsa listeler ve 1 koduyla çıkar; yayına çıkmadan önce boş
 * dönmeli. Geliştirme sırasında yer tutucular normaldir.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv[2];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mjs)$/.test(name)) files.push(p);
  }
};
walk(path.join(root, "app"));
files.push(path.join(root, "lib", "config.ts"));

const checks = [
  { name: "metin yer tutucusu", re: /\[\[[^\]]+\]\]/g },
  { name: "netleştirilecek not", re: /data-ph=/g },
  { name: "görsel yuvası boş", re: /\bsrc: null\b/g },
];

let total = 0;
for (const file of files) {
  const rel = path.relative(root, file);
  if (only && !rel.includes(only) && !rel.startsWith("lib")) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const t = line.trim();
    const comment = t.startsWith("*") || t.startsWith("/*") || t.startsWith("//");
    if (comment) {
      // açıklama satırları sayılmaz; yalnızca bilerek işaretlenmiş değerler
      if (t.includes("@yer-tutucu")) {
        total += 1;
        console.log(`${rel}:${i + 1}  işaretli değer: ${t.replace(/^\/\/\s*|^\/?\*+\s*/, "").slice(0, 100)}`);
      }
      return;
    }
    for (const c of checks) {
      const hits = line.match(c.re);
      if (!hits) continue;
      total += hits.length;
      const shown = c.name === "metin yer tutucusu" ? hits.join("  ") : line.trim().slice(0, 90);
      console.log(`${rel}:${i + 1}  ${c.name}: ${shown}`);
    }
  });
}

if (total) {
  console.log(`\n${total} yer tutucu kaldı. Yayına çıkmadan önce gerçek bilgiyle değiştirilmeli.`);
  process.exit(1);
}
console.log("Yer tutucu kalmadı.");
