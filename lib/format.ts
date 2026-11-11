const tl = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

/** 2000 → "₺2.000" (sitedeki yazımla aynı) */
export function formatTRY(value: number) {
  return `₺${tl.format(value)}`;
}

const words = [
  "",
  "Bir",
  "İki",
  "Üç",
  "Dört",
  "Beş",
  "Altı",
  "Yedi",
  "Sekiz",
  "Dokuz",
  "On",
];

/** 1 → "Bir", 3 → "Üç", 12 → "12" */
export function countWord(n: number) {
  return n >= 1 && n <= 10 ? words[n] : String(n);
}
