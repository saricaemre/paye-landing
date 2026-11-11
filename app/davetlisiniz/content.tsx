/**
 * "Davetlisiniz": Afrika Sünnet Projesi'nin ikinci konsepti (8 Kasım 2026).
 * Bu sayfa Emre'nin getirdiği
 * landing örneğinin yapısıyla kuruldu: girişte yalnızca bir davetiye, altında
 * üç küçük çizim, el makaslı eğik şerit, tek sütunda iplikle bağlı hikâye.
 *
 * İşaretler:
 *   [[...]]  gerçek bilgiyle değiştirilecek yer tutucu (sayfayı ?taslak ile
 *            açınca sarı görünür)
 *   _..._    italik vurgu
 *
 * Kampanyanın geçerli kararları (Emre, 7 Kasım 2026) burada da geçerli:
 *   - Hitap baştan sona "siz"; yalnızca paylaşanın yakınına giden hazır mesaj "sen".
 *   - Genel bir kampanya: tarih, yer adı, sayı örneği yazılmaz. Örnekteki
 *     "binlerce çocuk" ve kartlardaki "2025" bu yüzden yok.
 *   - Bağışçıya fotoğraf ya da video gönderilmiyor (SSS böyle diyor). Revizyon
 *     talimatı (10 Kasım 2026) hatıra fotoğrafını WhatsApp'tan göndermeyi istedi;
 *     bağış kartında telefon alanı olmadığı için bu söz sayfaya yazılmadı
 *     (revizyonlar/2026-11-11-davetlisiniz/RAPOR.md).
 *   - Sünnetlik yalnızca içerik çekimi için 4-5 çocuğa giydiriliyor; hikâyenin
 *     altındaki not bunu söylüyor.
 *   - Şölen, ikram ve oyuncak yok kararı vardı (örnekteki "merasim" ve hediye
 *     kutuları çıkmıştı). Revizyon talimatıyla davetin üçüncü satırı "şölenin baş
 *     köşesinde" diyor ve merasim çizimi geldi; şölenin sahada olup olmadığı
 *     Paye'den teyit edilmeli.
 *   - Ünlem ve uzun tire yok; örnekteki "Davetlisiniz!" ünlemsiz.
 *
 * Juma temsilî bir çocuk: hikâyesi sahada karşılaşılan çocuklardan derlendi.
 * Bunu söyleyen not sayfada iki yerde (hikâyenin altında ve bağışın yanında).
 *
 * Görseller public/davetlisiniz/ altında. Şu anki kareler sunum
 * için yapay zekâ örneğidir; gerçek bir çocuk ya da gerçek bir gün değildir.
 *
 * Tutar tek yerde: lib/config.ts içinde SUNNET.pricePerChild.
 */
import type { ImageBrief, Tone } from "@/components/landing/ImageSlot";
import type { FaqItem } from "@/components/landing/Faq";
import { Rich } from "@/components/landing/Rich";
import { PAYE, SUNNET } from "@/lib/config";
import { formatTRY } from "@/lib/format";

// @yer-tutucu: bütün görseller yapay zekâ örneği; yayından önce gerçekleriyle değişecek

type Img = { src: string | null; alt: string; brief: ImageBrief; tone?: Tone };

const fiyat = formatTRY(SUNNET.pricePerChild);

/** Bir çocuğun tutarının karşıladıkları; kart ve SSS aynı cümleyi okur */
const KAPSAM = "[[uzman hekim, lokal anestezi ve tek kullanımlık steril set]]";

const cekimNotu =
  "Şimdiki kare yapay zekâ örneği. Yayın için içerik çekiminden gerçek bir kare, velinin izniyle; tıbbi an yok. Sünnetlik yalnızca içerik için giydirilen 4-5 çocukta. Fotoğraftaki kişiler hikâyedeki kişiler olarak tanıtılmaz; altyazıda isim yok.";

export const meta = {
  title: "Davetlisiniz · Afrika Sünnet Projesi",
  /** Arama sonuçları ve WhatsApp önizlemesi (yer tutucu işareti olmadan) */
  description: `Afrika’da sünnet olmayı bekleyen çocuklar sizi sünnet günlerine davet ediyor. ${fiyat} ile bir çocuğun sünnetini siz üstlenebilirsiniz.`,
  ogTitle: "Davetlisiniz",
};

export const nav = [
  { href: "#nasil", label: "Davet" },
  { href: "#hikaye", label: "Juma’nın hikâyesi" },
  { href: "#sss", label: "Sorular" },
];

/* ------------------------------------------------------------------ */
/* 1. Giriş: davetiye                                                  */
/* ------------------------------------------------------------------ */

/**
 * Örnekteki gibi girişte yalnızca bir davetiye: altın sarmallı çerçeve,
 * "Davetlisiniz", iki satır, tek düğme. Tepesinde Paye'nin kuşu mühür gibi,
 * altında matbaa satırı gibi kampanyanın adı.
 */
export const hero = {
  title: "Davetlisiniz",
  text: "Afrika’da sünnet olmayı bekleyen çocuklar, sizi sünnet günlerine davet ediyor.",
  cta: "Davete katılın",
  /**
   * Düğmenin altındaki satır, revizyon talimatındaki gibi: "2000 TL ile bir çocuğun
   * sünnetini üstlenin" (tutar kalın; 2000 ile TL arasında bölünmez boşluk)
   */
  priceAmount: `${SUNNET.pricePerChild} TL`,
  priceLine: "ile bir çocuğun sünnetini üstlenin",
  /** Yapışkan çubuktaki kısa not */
  priceNote: "bir çocuğun sünneti",
};

/* ------------------------------------------------------------------ */
/* 2. Davetin üç satırı (örnekteki üç çizim)                           */
/* ------------------------------------------------------------------ */

/**
 * Üç satır ve sayfa sahibinin üç çizimi: 1 sünnete vesile, 2 merasim, 3 hatıra fotoğrafı;
 * çizimler dosya adlarındaki sırayla dizildi. Cümleler Emre'nin 11 Kasım 2026 revizesi, birebir.
 */
export const davet = {
  title: "Davete Katılın",
  items: [
    { cizim: "sunnet", text: "Bir çocuğun sünnet olmasına vesile olun." },
    { cizim: "merasim", text: "Hayallerindeki merasimi gerçekleştirin." },
    { cizim: "hatira", text: "Size bir hatıra fotoğrafı gönderelim." },
  ] as const,
};

/* ------------------------------------------------------------------ */
/* 3. Juma'nın hikâyesi                                                */
/* ------------------------------------------------------------------ */

/**
 * Hikâyenin bir anı. Revizyonla (10 Kasım 2026) kartlar ve altyazılar kalktı:
 * dört an tek sütunda, ince bir iplikle bağlı; görsellerin hepsi 3:2, sütun genişliğinde.
 */
type Bolum = {
  /** Başlık cümlenin başıdır; metin üç noktadan sonra onu sürdürür */
  title: string;
  text: string;
  image: Img;
  /** Görselin 3:2 kırpımdaki odağı (object-position) */
  position?: string;
};

export const hikaye = {
  title: "Juma’nın hikâyesi",
  /** Başlığın altındaki temsilî notu Emre'nin isteğiyle kaldırıldı (11 Kasım 2026) */
  chapters: [
    {
      title: "Her zamanki gibi…",
      text: "…Juma cuma namazından sonra caminin avlusunda arkadaşlarını bekledi. Cuma günü doğduğu için adını böyle koymuşlar. Avluda birlikte koşturduğu çocukların hepsi bu yıl sünnet oldu, bir tek o kaldı. Arkadaşları o günü birbirine anlatırken Juma bir kenarda durup dinliyor, söze hiç karışmıyordu.",
      position: "50% 38%",
      image: {
        src: "/davetlisiniz/hero-mobil.jpg",
        alt: "Fıskiyeli bir çeşmenin önünde, sünnet kıyafeti ve Maşallah kuşağıyla gülümseyen Afrikalı bir çocuk",
        brief: {
          title: "Sünnet kıyafetiyle, gülümseyen bir çocuk portresi",
          detail: `Kampanyanın ana görseli (Biri Kaldı'nın girişindeki çocuk). ${cekimNotu}`,
          ratio: "3:2",
          size: "2400×1600",
        },
        tone: "warm",
      },
    },
    {
      title: "Annesi acele etmedi…",
      text: "…çünkü köyde bu işi ehil olmayan ellere bırakanlar vardı ve sonu her zaman iyi bitmiyordu. Kocasını kaybettiğinden beri evi tek başına geçindiriyordu; en yakın hekim çok uzaktaydı, o yolun masrafı da evin hesabına sığmıyordu. Juma ne zaman sorsa aynı cevabı verdi: “Senin sünnetini bir hekim yapacak.”",
      position: "50% 17%",
      image: {
        src: "/davetlisiniz/anne.jpg",
        alt: "Evlerinin önünde bir anne, sünnet kıyafetli oğlunun şapkasını düzeltiyor; ikisi de gülümsüyor",
        brief: {
          title: "Annesi oğlunun şapkasını düzeltiyor",
          detail: cekimNotu,
          ratio: "3:2",
          size: "2400×1600",
        },
        tone: "warm",
      },
    },
    {
      title: "Bir sabah ekibimiz köye geldi…",
      /* Bağışçı hikâyede: "onu hiç tanımayan biri" (eleştirmen, 8 Kasım 2026). Annenin elini
         bırakamaması sabahki korkuyu kurar, el çakma onu kapatır. Gönüllü ve anlaşmalı yerel
         cerrahlar SSS'te. */
      text: "…ve sırasını bekleyen çocukları tek tek çağırdı. Juma’nın adı da listedeydi; sünnetini, onu hiç tanımayan biri üstlenmişti. Sırası gelince annesinin elini bırakmakta biraz zorlandı. Uzman bir hekim, yalnızca onun için açılan steril bir setle ve lokal anesteziyle sünnetini yaptı. Her şey bitince hekim avucunu uzattı; Juma sabahki korkusunu çoktan unutmuştu, gülerek çaktı.",
      position: "50% 33%",
      /* Önceki kare (hekim.jpg: kadın hekim, okul verandası) eleştirmenin uyarısıyla çıktı:
         sünneti yapan kişiyi gösteriyordu. Bu kare listeyi ve ekibi gösteriyor. */
      image: {
        src: "/davetlisiniz/saha.jpg",
        alt: "Elinde listeyle bir saha görevlisi, gülümseyen bir anne ve ona yaslanmış oğluyla konuşuyor",
        brief: {
          title: "Saha ekibinden biri, bir anne ve oğluyla",
          detail: `${cekimNotu} Ekipten biri elindeki listeyle aileyle konuşuyor; çocuk gündelik kıyafetiyle.`,
          ratio: "3:2",
          size: "2400×1600",
        },
        tone: "warm",
      },
    },
    {
      title: "Akşam olduğunda…",
      text: "…caminin avlusunda yine aynı çocuklar toplandı, bu kez Juma da aralarındaydı. Sünnet gününü anlatma sırası ondaydı ve hiçbir ayrıntıyı atlamadı. Annesi evin önünde oturmuş, avludan gelen seslerin arasında oğlunun sesini hemen seçiyordu.",
      position: "50% 40%",
      image: {
        src: "/davetlisiniz/grup.jpg",
        alt: "Sünnet kıyafetli çocuklar köy camisinin önünde yan yana, gülerek poz veriyor",
        brief: {
          title: "Çocuklar bir arada, caminin önünde",
          detail: cekimNotu,
          ratio: "3:2",
          size: "2400×1600",
        },
        tone: "warm",
      },
    },
  ] satisfies Bolum[],
};

/* ------------------------------------------------------------------ */
/* 4. Bağış: davetin cevap kartı (LCV)                                 */
/* ------------------------------------------------------------------ */

export const donate = {
  title: "Davete katılın",
  /** Hikâyenin üçüncü kartındaki bağışçıya bağlanır */
  text: "Juma’nın sünnetini, onu hiç tanımayan biri üstlenmişti. Afrika’nın köylerinde onun gibi sırasını bekleyen çocuklar hâlâ var; bir sonrakinin sünnetini siz üstlenebilirsiniz.",
  /**
   * Kartın tepesi (revizyon, 10 Kasım 2026; önceki "LCV, Lütfen cevap veriniz").
   * Altına alt başlık yok: tutarı giriş zaten söylüyor.
   */
  cardTitle: "Davetlisiniz",
  /** Karttaki etki satırının sonu: "Üç çocuk sünnet olur." */
  line: "sünnet olur.",
  coverage: `Bir çocuk için ${fiyat}: ${KAPSAM} dahil.`,
  /** Bağıştan sonra ne olacağı; haber verilip verilmediği Paye'den netleşecek */
  after: "Bağışınız, Afrika’nın kırsalında düzenlediğimiz toplu sünnetlerde bir çocuğun sünnetine ayrılır; [[sünnet yapıldığında size WhatsApp’tan haber veririz]].",
  bankCode: "Sünnet",
  waLabel: "İletişim için WhatsApp",
};

/* ------------------------------------------------------------------ */
/* 5. Sorular (Biri Kaldı'yla aynı bilgiler)                           */
/* ------------------------------------------------------------------ */

export const faq = {
  title: "Aklınıza takılanlar",
  side: "Burada olmayan bir sorunuz varsa WhatsApp hattımızdan bize yazabilirsiniz.",
  items: [
    {
      q: `${fiyat} neleri karşılıyor?`,
      a: <Rich text={`Bir çocuğun sünneti için gerekenleri karşılıyor: ${KAPSAM}.`} />,
    },
    {
      /* Hikâye bir isimle anlatıldığı için okuyan "kendi Juma"sını bekleyebilir (eleştirmen, 8 Kasım 2026) */
      q: "Sünnetini üstlendiğim çocuğu görecek miyim?",
      a: (
        <Rich
          text={`Bağışçılarımıza fotoğraf ya da video göndermiyoruz. Bağışınız, Afrika’nın kırsalında düzenlediğimiz toplu sünnetlerde bir çocuğun sünnetini karşılar; [[toplu sünnet yapıldığında size WhatsApp’tan kısa bir haber veririz]].`}
        />
      ),
    },
    {
      q: "Sünnet nerede yapılıyor?",
      a: "Afrika’nın kırsal bölgelerinde, sağlık hizmetine ulaşmanın zor olduğu köylerde.",
    },
    {
      q: "Sünneti kim yapıyor, nasıl yapılıyor?",
      a: "Afrika’nın kırsalında çocuklar ya sünnet olamıyor ya da hijyenik olmayan yöntemlerle sünnet ediliyor. Bu yüzden gönüllü ve anlaşmalı yerel cerrahlarla toplu sünnet düzenliyoruz. Sünnet uzman hekim tarafından, lokal anestezi altında ve her çocuk için tek kullanımlık steril aletlerle yapılır.",
    },
    {
      q: "Hangi çocuklar sünnet ediliyor?",
      a: "Yetim ve maddi imkânı olmayan ailelerin çocukları.",
    },
    {
      q: "Havale veya EFT ile bağış yapabilir miyim?",
      a: (
        <>
          Evet. Bağış kartındaki “Havale ile göndermek istiyorum” satırından IBAN’ı kopyalayabilirsiniz;
          açıklamaya “Sünnet” yazmanız yeterli. Bütün hesaplarımız{" "}
          <a href={PAYE.links.hesaplar}>Hesap numaralarımız</a> sayfasında.
        </>
      ),
    },
  ] satisfies FaqItem[],
};

/* ------------------------------------------------------------------ */
/* 6. Kapanış                                                          */
/* ------------------------------------------------------------------ */

export const closing = {
  title: "Kimse kalmasın",
  text: "Afrika’da sırasını bekleyen her çocuk, yaşıtlarıyla birlikte sünnet olsun.",
  cta: "Davete katılın",
  shareLead: "Bağış yapamıyorsanız bu davetiyeyi bir yakınınıza iletin.",
  /**
   * Paylaşanın ağzından, yakınına; sonuna sayfa adresi eklenir. Sayfa "siz" olsa da
   * bu mesaj bağışçının kendi sesi, "sen" kalır (Biri Kaldı'daki gibi).
   */
  shareText: `Afrika’da sünnet olmayı bekleyen çocuklar var. ${fiyat} ile birinin sünnetini üstlenebiliyorsun, davetiyeye bir bak:`,
};
