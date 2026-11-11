/**
 * "Gözün Aydın" katarakt ameliyatı landing'inin metinleri ve görsel yuvaları.
 *
 * İşaretler:
 *   [[...]]  gerçek bilgiyle değiştirilecek yer tutucu (sayfayı ?taslak ile
 *            açınca sarı görünür)
 *   _..._    italik vurgu
 *
 * Görseller: dosyayı public/gozun-aydin/ altına koyup ilgili `src` alanına
 * "/gozun-aydin/dosya-adi.jpg" yazmak yeterli. Ölçü ve çekim notları her
 * görselin `brief` alanında.
 *
 * Tutar tek yerde: lib/config.ts içinde KATARAKT.pricePerPatient ve
 * KATARAKT.fundMin. Metinlerde {fiyat} ve {fon} yazan yere bu tutarlar
 * kendiliğinden gelir.
 *
 * Halima ve Amani'nin hikâyesi temsilîdir (Emre, 6 Kasım 2026): sahada
 * karşılaşılan hastalardan derlenir. Sayfadaki "derlenmiştir" notları
 * Emre'nin isteğiyle kaldırıldı (7 Kasım 2026).
 *
 * Hitap: bu sayfa "siz" diliyle yazılır (Emre, 7 Kasım 2026). Bağışçının
 * yakınına göndereceği hazır mesajlar (gift.text, shareText) kendi sesiyle,
 * "sen" olarak kalır.
 */
import type { FaqItem } from "@/components/landing/Faq";
import type { ImageBrief, Tone } from "@/components/landing/ImageSlot";
import { Rich } from "@/components/landing/Rich";
import { PAYE, whatsappHref } from "@/lib/config";

export type Img = { src: string | null; alt: string; brief: ImageBrief; tone?: Tone };

export const meta = {
  title: "Gözün Aydın · Katarakt Ameliyatı",
  description:
    "Yarım saati bulmayan bir katarakt ameliyatı, Afrika’da bir insanın yeniden görmesini sağlıyor. {fiyat} ile bir hastanın ameliyatını üstlenebilirsiniz; ameliyat olan hastanın fotoğrafı size gönderilir.",
};

export const nav = [
  { href: "#hikaye", label: "Hikâye" },
  { href: "#ameliyat", label: "Ameliyat" },
  { href: "#bagis", label: "Bağış" },
  { href: "#sss", label: "Sorular" },
];

export const cta = "Bir ameliyatı üstlenin";

/* ------------------------------------------------------------------ */
/* Giriş                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  label: "Afrika’da katarakt ameliyatı",
  title: "Ne kadar güzel,",
  titleEnd: "değil mi?",
  text: "Gözünde katarakt olan biri bu güzelliği göremez. Afrika’da pek çok insan, yarım saati bulmayan bir ameliyatla düzelebilecek bu hastalık yüzünden dünyayı yıllarca böyle görüyor.",
  priceNote: "bir hastanın ameliyatı",
  /** Paye'nin sözü fiyat satırında: mobilde de ilk ekranda kalsın */
  promise: "hastanın fotoğrafı size gelir",
  /** Kampanya videosunun yazısız ilk saniyeleri, ileri geri döngü */
  video: {
    src: "/gozun-aydin/bahar.mp4",
    /** Mobil için hafif sürüm (540×540) */
    srcSmall: "/gozun-aydin/bahar-540.mp4",
    poster: "/gozun-aydin/bahar.jpg",
    alt: "Yağmur damlalarıyla kaplı, pembe çiçek açmış bir dal",
  },
  /** Mercekteki sürgü: çizginin solunda aynı video katarakt gözüyle */
  compare: {
    before: "Kataraktlı göz",
    /** Mercek küçükken (mobil) etiket kısalır */
    beforeShort: "Kataraktlı göz",
    hint: "Çizgiyi kaydırın",
    label: "Katarakt gözüyle görünenle ameliyattan sonrakini karşılaştırmak için çizgiyi kaydırın",
  },
};

/* ------------------------------------------------------------------ */
/* Hikâye                                                              */
/* ------------------------------------------------------------------ */

export const story = {
  title: "Bu ameliyatı belki evinizden tanıyorsunuz",
  /** Kartlar arasında geçişin kısa adı */
  label: "Evinizden tanıdığınız ameliyat",
  paragraphs: [
    "Anneanneniz ya da dedeniz bir sabah hastaneye gidip öğlene doğru gözünde bir bantla eve dönmüş olabilir. Ertesi gün bant açıldığında ilk iş etrafındakilerin yüzüne uzun uzun bakmıştır.",
    "Afrika’da katarakt hastası birçok ihtiyaç sahibi o bandı hiç takamıyor. Bizde bir sabahı bile doldurmayan bu ameliyat için orada bir göz doktoruna ulaşmak çoğu zaman mümkün olmuyor. Doktor bulunsa bile maddi imkânsızlıklar ameliyata engel oluyor. Gözdeki perde yıllar içinde kalınlaşıyor ve insan bir gün yanı başında oturanın yüzünü bile seçemez oluyor.",
  ],
  /** Kartın arka planı. Sunum için yapay zekâ örneği; yayından önce gerçek fotoğrafla değişir. */
  image: {
    src: "/gozun-aydin/kart-ev.jpg",
    alt: "Sabah güneşinde bembeyaz dantel perdeler, pencere önünde bir ince belli çay bardağı ve katlanmış bir gözlük",
  },
};

export const halima = {
  title: "Halima, torununu sesinden tanıyor",
  label: "Halima’nın hikâyesi",
  paragraphs: [
    "Halima [[64]] yaşında, [[Kenya’nın kıyısındaki Kwale’de]] küçük bir köyde yaşıyor. [[Gözleri iyiyken çarşıda sebze satarak geçimini sağlardı.]] Gözlerine katarakt ineli [[altı yedi]] yıl oldu. Torunu Amani ise [[altı]] yaşında, yani Halima onun yüzünü hiç seçemedi. Onu sesinden ve saçındaki örgülere dokunarak tanıyor.",
    "Kuyuya ya da çarşıya giderken Amani bir değneğin ucunu tutuyor, Halima da öbür ucunu.",
    "Halima’nın ameliyatı on beş yirmi dakika sürecek. Ertesi gün bandı açıldığında, örgülerine yıllardır dokunduğu torununun yüzünü ilk kez net olarak görecek.",
  ],
  link: "Halima gibi birinin ameliyatını üstlenin",
  /** Kartın arka planı. Sunum için yapay zekâ örneği; yayından önce gerçek fotoğrafla değişir. */
  image: {
    src: "/gozun-aydin/kart-halima.jpg",
    alt: "Kızıl toprak bir köy yolunda, bir değneğin iki ucunu tutan iki el: yaşlı bir kadının eli ve küçük bir çocuğun eli",
  },
};

/* ------------------------------------------------------------------ */
/* Ameliyat                                                            */
/* ------------------------------------------------------------------ */

export const surgery = {
  title: "Ameliyat nasıl yapılıyor?",
  intro:
    "Paye, Afrika’daki katarakt ameliyatlarını bölgede kurduğu sağlık tarama ağları ve anlaşmalı cerrahlarla birlikte yürütüyor. Bir hastanın süreci baştan sona şöyle ilerliyor:",
  steps: [
    "Sağlık tarama ağları bölgedeki katarakt hastalarını belirliyor.",
    "Ameliyat günü hasta köyünden sağlık merkezine getiriliyor.",
    "Cerrah buğulanan merceği alıp yerine yapay bir mercek takıyor. Ameliyat 15-20 dakika sürüyor.",
    "Gözün pansumanı yapılıyor; hasta, koruyucu damlası ve ilaçlarıyla o geceyi dinlenerek geçiriyor.",
    "Ertesi gün kontrolde bant açılıyor ve hasta yeniden görmeye başlıyor.",
    "Tam ameliyat bağışı yapan bağışçıya, ameliyat olan hastanın fotoğrafı ve ameliyat bilgileri gönderiliyor.",
  ],
  /** Sunum için yapay zekâ örneği; yayından önce gerçek fotoğrafla değişir. */
  image: {
    src: "/gozun-aydin/kontrol-gunu.jpg",
    alt: "Kontrol gününde, göz bandı yeni açılmış yaşlı bir kadın gülümsüyor; yanında kızı kolundan tutmuş gülüyor, hemşire açtığı göz kapağını elinde tutuyor",
    brief: {
      title: "Kontrol günü: bandı yeni açılmış, gülümseyen bir hasta",
      detail:
        "Ameliyat anı ya da tıbbi ayrıntı yok. Hastanın yüzündeki ifade ve yanındaki yakını; kadrajda yerel hemşire ya da cerrah ve Paye ekibinden biri de olsun (logolu tişört hastanın önünde değil). Hastanın izniyle.",
      ratio: "4:5",
      size: "1200×1500",
    },
    tone: "sepia",
  } satisfies Img,
};

/* ------------------------------------------------------------------ */
/* Deneyin: ameliyatı ziyaretçi kendisi dener                          */
/* ------------------------------------------------------------------ */

/**
 * Sürecin üçüncü adımı, küçük bir oyun olarak (Emre'nin isteği, 8 Kasım 2026):
 * önce buğulanan mercek alınır, sonra yapay mercek yerleştirilir, ardından
 * girişteki dal netleşerek görünür. Karmaşık olmasın, herkes yapabilsin.
 * Göz stilize bir çizim kalır; gerçek bir ameliyat fotoğrafı ya da videosuyla
 * değiştirilmez.
 */
export const game = {
  title: "Ameliyatı bir de siz deneyin",
  intro:
    "Mercekteki göz, ameliyat sırasında cerrahın mikroskopta gördüğüne benziyor. Gerçekte on beş yirmi dakika süren ve büyük bir dikkat isteyen bu ameliyatın iki temel adımını burada birkaç saniyede deneyebilirsiniz.",
  steps: [
    {
      title: "Buğulanan merceği alın",
      text: "Farenizi ya da parmağınızı gözbebeğindeki buğunun üstünde gezdirin.",
    },
    {
      title: "Yapay merceği yerleştirin",
      text: "Kenarda bekleyen yeni merceği tutup gözbebeğinin ortasına bırakın.",
    },
  ],
  /** Merceğin üstündeki küçük ipuçları; ilk dokunuşta kaybolur */
  hints: {
    clear: "Aleti buğunun üstünde gezdirin",
    place: "Merceği ortaya sürükleyin",
  },
  tag: "Ertesi gün",
  /** Oyunun sonu sayfanın tek insanına ve hemen alttaki bağış başlığına bağlanır */
  result: "Halima’nın ameliyatı da böyle bitecek ve bandı açıldığında torunu Amani’nin yüzünü görmeye başlayacak.",
  resultText:
    "Burada iki hareketle denediğiniz ameliyatı sahada Paye’nin anlaşmalı cerrahları yapıyor. {fiyat} ile bir hastanın ameliyatını siz üstlenebilirsiniz; ameliyat olan hastanın fotoğrafı da size gelir.",
  restart: "Baştan başlayın",
  /** Ekran okuyucu ve klavye için */
  labels: {
    group: "Katarakt ameliyatını deneme alanı",
    clear: "Buğulanan merceği alın",
    place: "Yapay merceği yerleştirin",
    clearHelp: "Dokunursanız ya da Enter tuşuna basarsanız alet buğuyu kendisi alır.",
    placeHelp: "Dokunursanız ya da Enter tuşuna basarsanız mercek kendiliğinden yerine oturur.",
  },
  live: {
    cleared: "Buğulanan mercek alındı. Şimdi yapay merceği yerleştirin.",
    placed: "Yapay mercek yerine oturdu.",
    done: "Halima’nın ameliyatı da böyle bitecek ve bandı açıldığında torunu Amani’nin yüzünü görmeye başlayacak.",
  },
  /** Sonda mercekte netleşen görüntü: girişteki dal */
  view: {
    src: "/gozun-aydin/bahar.jpg",
    alt: "Yağmur damlalarıyla kaplı, pembe çiçek açmış bir dal; her ayrıntısı net",
  },
};

/* ------------------------------------------------------------------ */
/* Bağış                                                               */
/* ------------------------------------------------------------------ */

export const donate = {
  title: "Halima gibi birinin ameliyatını siz üstlenebilirsiniz",
  /** Kartın söylemediği: kimin yeniden gördüğünü öğrenmek; tutar ve takvim kartta */
  lead: "Bir ameliyatın tamamını üstlendiğinizde, bağışınızla kimin yeniden gördüğünü fotoğrafıyla ve ameliyat bilgileriyle öğrenirsiniz.",
  statValue: "[[350]]",
  /** Sitedeki "Işığa Kavuşturan Ameliyat" sayacı ameliyat sayıyor (Emre, 7 Kasım 2026) */
  statLabel: "katarakt ameliyatı bugüne kadar Paye aracılığıyla yapıldı.",
  paragraphs: [
    "Tutarın tamamını veremiyorsanız Katarakt Destek Fonu’na {fon}’den başlayarak dilediğiniz kadar katılabilirsiniz.",
    "Sevinçli bir haber alana göz aydınlığına gidilir ve eli boş gidilmez. Bebeği olan bir dostunuzu ya da hacdan dönen bir büyüğünüzü ziyarete giderken, o sevinç adına Afrika’da bir hastanın ameliyatını da üstlenebilirsiniz.",
  ],
  /** Göz aydınlığına giderken gönderilebilecek hazır mesaj */
  gift: {
    label: "Göz aydınlığında gönderebileceğiniz bir mesaj",
    text: "Gözün aydın. Bu sevincin adına Afrika’da bir hastanın katarakt ameliyatını üstlendim. Bandı açıldığı gün onun evinde de aynı sevinç yaşanacak.",
  },
  /** Bağış kartının içindeki satırlar */
  card: {
    coverage:
      "Bir ameliyat için {fiyat}: [[tarama, sağlık merkezine ulaşım, ameliyat, yapay mercek, damla ve ilaçlar, ertesi günkü kontrol]] dahil.",
    after:
      "Bağışınızdan sonraki [[sekiz hafta]] içinde, ameliyat olan hastanın fotoğrafı ve ameliyat bilgileri [[WhatsApp’tan]] size gelir.",
    fundAfter:
      "[[Fondaki bağışlar bir ameliyatın tutarına ulaştıkça sıradaki hasta ameliyat olur; o dönemin ameliyatlarından bir fotoğraf da WhatsApp’tan size gelir.]]",
    bankCode: "Katarakt",
    /** Kartın WhatsApp satırı; tek satıra sığsın. "Yakınınız adına" satırı kaldırıldı,
        bilgisi sorularda duruyor (Emre, 7 Kasım 2026) */
    waLabel: "İletişim için WhatsApp",
  },
};

/* ------------------------------------------------------------------ */
/* Sorular                                                             */
/* ------------------------------------------------------------------ */

export const faq = {
  title: "Merak ettikleriniz",
  side: "Burada cevabını bulamadığınız bir sorunuz olursa WhatsApp hattımızdan bize yazabilirsiniz.",
  items: (price: string): FaqItem[] => [
    {
      q: `${price} neleri karşılıyor?`,
      a: (
        <>
          Bir hastanın ameliyatı için gerekenleri karşılıyor.{" "}
          <span data-ph="">
            [Kalemler Paye ile netleştirilecek: tarama, sağlık merkezine ulaşım, ameliyat, yapay mercek,
            pansuman, damla ve ilaçlar, ertesi günkü kontrol]
          </span>
        </>
      ),
    },
    {
      q: "Bağışımın ulaştığını nasıl göreceğim?",
      a: (
        <Rich text="Tam ameliyat bağışında, bağışınızdan sonraki [[sekiz hafta]] içinde ameliyat olan hastanın [[izniyle çekilen]] fotoğrafı ve ameliyat bilgileri [[WhatsApp’tan]] size gönderilir. [[Birden çok ameliyat üstlendiyseniz her hasta için ayrı bilgi gelir.]] Destek fonuna katıldıysanız [[o dönemin ameliyatlarından bir fotoğraf WhatsApp’tan size gelir]]." />
      ),
    },
    {
      q: "Ameliyat yapılamazsa bağışım ne olur?",
      a: (
        <span data-ph="">
          [Paye’nin uygulaması: ör. muayenede ameliyata uygun bulunmayan bir hastanın yerine bağışınız
          sıradaki hastanın ameliyatında kullanılır ve size bildirilir]
        </span>
      ),
    },
    {
      q: "Ameliyatlar nerede yapılıyor?",
      a: (
        <>
          Afrika’da, başta Kenya olmak üzere sağlık hizmetine ulaşmanın zor olduğu bölgelerde.
          Hastalar bölgedeki sağlık tarama ağlarıyla belirleniyor, sağlık merkezine getiriliyor ve
          anlaşmalı cerrahlar tarafından ameliyat ediliyor.{" "}
          <span data-ph="">[Sağlık merkezinin adı ve bölge bilgisi]</span>
        </>
      ),
    },
    {
      q: "Bir yakınım adına bağış yapabilir miyim?",
      a: (
        <>
          Evet. Bağışınızı yaptıktan sonra{" "}
          <a href={whatsappHref("Katarakt ameliyatı bağışı yaptım. Kimin adına: ")}>
            WhatsApp hattımızdan
          </a>{" "}
          kimin adına yaptığınızı yazmanız yeterli; bağışınız onun adıyla kaydedilir ve bilgisi size o
          adla gelir. Paye o kişiye ayrıca haber vermez; göz aydınlığına giderken gönderebileceğiniz
          hazır mesaj bağış bölümünde.
        </>
      ),
    },
    {
      q: "Havale veya EFT ile bağış yapabilir miyim? Bağışım için ne alırım?",
      a: (
        <>
          Evet. Bağış kartındaki “Havale ile göndermek istiyorum” satırından IBAN’ı kopyalayabilirsiniz;
          açıklamaya “Katarakt” yazmanız yeterli. Bütün hesaplarımız{" "}
          <a href={PAYE.links.hesaplar}>Hesap numaralarımız</a> sayfasında. Havalede bankanın dekontu,
          kartla bağışta <Rich text="[[Paye’nin gönderdiği bağış bilgisi]]" /> elinizde olur.
        </>
      ),
    },
    {
      q: "Zekâtımı bu ameliyatlar için verebilir miyim?",
      a: (
        <span data-ph="">
          [Paye’de katarakt için ayrı bir zekât fonu ve hastadan vekâlet varsa süreç; yoksa: Bu
          sayfadaki bağışlar sadaka olarak alınıyor, zekâtınız için WhatsApp hattımızdan bize
          yazabilirsiniz.]
        </span>
      ),
    },
    {
      q: "Katarakt nedir?",
      a: "Gözün içindeki doğal merceğin zamanla matlaşmasıdır. Mercek buğulandıkça görüntü bulanıklaşır ve renkler solar; tedavi edilmezse körlüğe kadar ilerleyebilir. Ameliyatta matlaşan mercek alınır ve yerine yapay bir mercek takılır.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Kapanış                                                             */
/* ------------------------------------------------------------------ */

export const closing = {
  title: "Gözün aydın",
  /** Göz tablosu: yukarıdan aşağı okununca GÖZÜN AYDIN */
  chart: [
    { letters: "G", acuity: "0,1" },
    { letters: "ÖZ", acuity: "0,2" },
    { letters: "ÜNA", acuity: "0,3" },
    { letters: "YDIN", acuity: "0,5" },
  ],
  text: "Sevindirici bir haber alana “gözün aydın” deriz. Bağışınızla ameliyat olan her hastanın evinde, bandın açıldığı gün aynı sevinç yaşanacak.",
  shareLead: "Bağış yapamıyorsanız bu sayfayı bir yakınınıza göndermeniz de çok kıymetli.",
  /** Paylaşanın ağzından; sonuna sayfa adresi eklenir */
  shareText:
    "Paye, Afrika’da katarakt ameliyatları yaptırıyor. Bir hastanın ameliyatı {fiyat}; ameliyat olan hastanın fotoğrafı da bağışçıya gönderiliyor. Görünce sana da göndermek istedim:",
};
