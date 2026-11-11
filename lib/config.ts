/**
 * Paye'ye ait sabit bilgiler. Tüm landing sayfaları buradan okur.
 * Siteye entegre edilirken bağış adresi göreli yola ("/bagis-yap?tur=sunnet")
 * çevrilebilir.
 */
export const PAYE = {
  name: "Paye İnsani Yardım Derneği",
  site: "https://www.payeinsaniyardim.org.tr",
  phone: "+90 532 207 72 93",
  phoneHref: "tel:+905322077293",
  whatsapp: "https://wa.me/905322077293",
  email: "info@payeinsaniyardim.org.tr",
  kutukNo: "34-294-028",
  vergiNo: "7230999708",
  city: "İstanbul",
  address: "İkitelli OSB Mah. 6. Cadde Beyaz Tower 1/78 Başakşehir/İstanbul",
  /**
   * Bağış kartındaki "Havale ile göndermek istiyorum" satırı.
   * [[...]] yer tutucu: sitedeki "Hesap numaralarımız" sayfasındaki TL hesabı yazılacak.
   */
  bank: {
    holder: "Paye İnsani Yardım Derneği",
    bankName: "[[Banka adı]]",
    iban: "[[TR00 0000 0000 0000 0000 0000 00]]",
  },
  links: {
    hakkimizda: "https://www.payeinsaniyardim.org.tr/hakkimizda",
    hesaplar: "https://www.payeinsaniyardim.org.tr/hesap-numaralarimiz",
    kvkk: "https://www.payeinsaniyardim.org.tr/kvkk-aydinlatma-metni",
    gizlilik: "https://www.payeinsaniyardim.org.tr/gizlilik-ve-guvenlik-politikasi",
    sozlesme: "https://www.payeinsaniyardim.org.tr/mesafeli-bagis-sozlesmesi",
    iade: "https://www.payeinsaniyardim.org.tr/iptal-ve-iade-kosullari",
    sss: "https://www.payeinsaniyardim.org.tr/sikca-sorulan-sorular",
    instagram: "https://www.instagram.com/payeinsaniyardim",
    youtube: "https://www.youtube.com/@payeinsaniyardım",
    x: "https://x.com/payeiyd",
  },
} as const;

/** WhatsApp hattına hazır mesajla giden bağlantı */
export function whatsappHref(text?: string) {
  return text ? `${PAYE.whatsapp}?text=${encodeURIComponent(text)}` : PAYE.whatsapp;
}

/** Sayfa adresindeki kampanya parametreleri (utm_*); bağış adresine aynen taşınır. */
export type Utm = Record<string, string>;

function withUtm(url: URL, utm?: Utm) {
  if (utm) for (const [k, v] of Object.entries(utm)) url.searchParams.set(k, v);
  return url.toString();
}

export const SUNNET = {
  /** Sitedeki "Bir çocuğun sünneti" seçeneği: bir çocuk için tutar (₺). */
  pricePerChild: 2000,
  donateUrl:
    process.env.NEXT_PUBLIC_SUNNET_DONATE_URL ??
    "https://www.payeinsaniyardim.org.tr/bagis-yap?tur=sunnet",
  /**
   * Bağış sayfası şu an bu parametreyi okumuyor. Yazılım ekibi
   * `?tur=sunnet&adet=3` geldiğinde sünnet seçeneğini 3 adetle açarsa
   * landing'deki seçim sepete birebir taşınır
   * (../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md).
   */
  quantityParam: "adet",
} as const;

export function sunnetDonateHref(qty: number, utm?: Utm) {
  const url = new URL(SUNNET.donateUrl);
  if (qty > 1) url.searchParams.set(SUNNET.quantityParam, String(qty));
  return withUtm(url, utm);
}

export const KATARAKT = {
  /**
   * "Katarakt Ameliyatı: bir hastanın ameliyatı" (₺, hasta başı).
   * Emre 6 Kasım 2026'da reklam videosundaki ₺4.500'ü geçerli tutar olarak
   * onayladı. Paye'nin sitesinde o gün ₺4.000 yazıyordu; sitenin ₺4.500'e
   * çekilmesi yazılım ekibine iletildi.
   */
  pricePerPatient: 4500,
  /** "Katarakt Destek Fonu": dilediğin tutar, en az ₺250 (sitedeki seçenek). */
  fundMin: 250,
  donateUrl:
    process.env.NEXT_PUBLIC_KATARAKT_DONATE_URL ??
    "https://www.payeinsaniyardim.org.tr/bagis-yap?tur=katarakt",
  /**
   * Bağış sayfası şu an bu parametreleri okumuyor (bkz. README). Okumaya
   * başladığında landing'deki adet ve tutar seçimi sepete birebir taşınır.
   */
  quantityParam: "adet",
  optionParam: "secenek",
  fundOption: "destek-fonu",
  amountParam: "tutar",
} as const;

export function kataraktDonateHref(qty: number, utm?: Utm) {
  const url = new URL(KATARAKT.donateUrl);
  if (qty > 1) url.searchParams.set(KATARAKT.quantityParam, String(qty));
  return withUtm(url, utm);
}

export function kataraktFundHref(amount: number, utm?: Utm) {
  const url = new URL(KATARAKT.donateUrl);
  url.searchParams.set(KATARAKT.optionParam, KATARAKT.fundOption);
  url.searchParams.set(KATARAKT.amountParam, String(amount));
  return withUtm(url, utm);
}

export const SU_KUYUSU = {
  /** Sitedeki "Hisseli Su Kuyusu": bir kuyunun bedeline ortak olmak (₺, hisse başı). */
  pricePerShare: 3000,
  /** Sitedeki "El Pompalı Su Kuyusu" (₺). */
  handPump: 92000,
  /** Sitedeki "Şadırvanlı Su Kuyusu": su deposu ve şadırvanlı (₺). */
  fountain: 135000,
  // @yer-tutucu Su Kuyusu Havuzu'nun aylık en düşük tutarı Paye ile netleştirilecek
  monthlyMin: 250,
  // @yer-tutucu bir el pompalı kuyunun yaklaşık kaç kişiye su verdiği Paye'den gelecek
  peoplePerWell: 500,
  // @yer-tutucu bir şadırvanlı kuyunun yaklaşık kaç kişiye su verdiği Paye'den gelecek
  peoplePerFountain: 800,
  /** El pompalı kuyuyu tamamlayan hisse sayısı (₺92.000 / ₺3.000, yukarı yuvarlanır) */
  sharesPerWell: 31,
  /**
   * Sitede düzenli bağış altyapısı yok. O gelene kadar "Her ay" düğmesi
   * WhatsApp'a hazır mesajla gider; altyapı gelince "site" yapılır ve düğme
   * suKuyusuMonthlyHref adresine gider.
   */
  monthlyVia: "whatsapp" as "whatsapp" | "site",
  donateUrl:
    process.env.NEXT_PUBLIC_SU_KUYUSU_DONATE_URL ??
    "https://www.payeinsaniyardim.org.tr/bagis-yap?tur=su-kuyusu",
  /**
   * Bağış sayfası bu parametreleri henüz okumuyor; düzenli bağış altyapısı da
   * sitede yok (../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md).
   */
  quantityParam: "adet",
  optionParam: "secenek",
  handPumpOption: "el-pompali",
  fountainOption: "sadirvanli",
  monthlyOption: "duzenli",
  amountParam: "tutar",
} as const;

export type WellType = "el-pompali" | "sadirvanli";

/** Hisseli kuyu: adet seçimi */
export function suKuyusuShareHref(qty: number, utm?: Utm) {
  const url = new URL(SU_KUYUSU.donateUrl);
  if (qty > 1) url.searchParams.set(SU_KUYUSU.quantityParam, String(qty));
  return withUtm(url, utm);
}

/** Bütün bir kuyu: el pompalı ya da şadırvanlı */
export function suKuyusuWellHref(type: WellType, utm?: Utm) {
  const url = new URL(SU_KUYUSU.donateUrl);
  url.searchParams.set(SU_KUYUSU.optionParam, type);
  return withUtm(url, utm);
}

/** Su Kuyusu Havuzu: her ay aynı tutar */
export function suKuyusuMonthlyHref(amount: number, utm?: Utm) {
  const url = new URL(SU_KUYUSU.donateUrl);
  url.searchParams.set(SU_KUYUSU.optionParam, SU_KUYUSU.monthlyOption);
  url.searchParams.set(SU_KUYUSU.amountParam, String(amount));
  return withUtm(url, utm);
}
