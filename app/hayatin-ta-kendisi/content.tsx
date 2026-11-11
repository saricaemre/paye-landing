/**
 * "Hayatın Ta Kendisi" su kuyusu landing'inin metinleri ve görsel yuvaları.
 *
 * İşaretler:
 *   [[...]]  gerçek bilgiyle değiştirilecek yer tutucu (sayfayı ?taslak ile
 *            açınca sarı görünür)
 *   _..._    italik vurgu
 *
 * İkinci sürüm (7 Kasım 2026, Emre'nin konsepti): puslu gökyüzü, başında suyla
 * duvarın üstünde yürüyen bir çocuk ve annesi, gökyüzünde "HAYATIN TA KENDİSİ"
 * logotipi. İlk sürüm (damla) ../../../arsiv/hayatin-ta-kendisi-v1/ altında.
 *
 * Görseller public/hayatin-ta-kendisi/ altında. Giriş görselini Emre verdi;
 * yanları Magnific'te genişletildi. Alanlar ve kuyu açılışı görselleri
 * Magnific'te (GPT 2.6) giriş görselinin ışığıyla üretilmiş kavramsal
 * görsellerdir. Sunum aşamasında görsellerin yanında not gösterilmiyor (Emre'nin
 * tercihi); yayında kavramsal görsel kalırsa `showAiNotes` true yapılmalı. Kuyu
 * açılışı görseli yayından önce Paye'nin gerçek bir açılış fotoğrafıyla
 * değişmeli.
 *
 * Tutarlar tek yerde: lib/config.ts içinde SU_KUYUSU. Metinlerde {hisse}
 * yazan yere bu tutar kendiliğinden gelir.
 *
 * Hitap "siz" (Emre, 7 Kasım 2026 akşamı).
 *
 * Rehema'nın hikâyesi temsilîdir ve metni Emre'nin (7 Kasım 2026); sayfada
 * bunu söyleyen not hikâyenin altında ve bağış kartının altında durur.
 *
 * Rakamların kaynakları:
 *   dörtte bir (2,1 milyar), 106 milyon, 1,7 milyar: WHO ve UNICEF, Ağustos 2025 (JMP)
 *   505 bin: Dünya Sağlık Örgütü içme suyu bilgi notu, Eylül 2023 (tahmin)
 *   onda yedi: WHO ve UNICEF, Temmuz 2023 (15 yaş ve üstü kadınlar ve kızlar,
 *              suyu evinde olmayan haneler)
 */
import type { FaqItem } from "@/components/landing/Faq";
import type { ImageBrief, Tone } from "@/components/landing/ImageSlot";
import { Rich } from "@/components/landing/Rich";
import { PAYE, whatsappHref } from "@/lib/config";

export type Img = { src: string | null; alt: string; brief: ImageBrief; tone?: Tone };

/** Kavramsal görsel notları; sunumda kapalı, yayında kavramsal görsel kalırsa açılmalı */
export const showAiNotes = false;
export const aiNote = "Kavramsal görsel, yapay zekâyla üretildi.";

export const meta = {
  title: "Hayatın Ta Kendisi · Su Kuyusu",
  description:
    "Dünyada 106 milyon insan içtiği suyu hâlâ göletten ve dereden taşıyor. Köyün ortasında açılan bir kuyuyla o uzun yol birkaç adıma iner. {hisse} ile bir kuyuya ortak olabilirsiniz; açılış videosu size gönderilir.",
};

export const nav = [
  { href: "#hikaye", label: "Hikâye" },
  { href: "#hayat", label: "Su ne değiştirir" },
  { href: "#kuyu", label: "Kuyu" },
  { href: "#bagis", label: "Bağış" },
  { href: "#sss", label: "Sorular" },
];

export const cta = "Bir kuyuya ortak olun";

/* ------------------------------------------------------------------ */
/* Giriş: puslu gökyüzünde logotip, altında iki cümle ve tek buton     */
/* ------------------------------------------------------------------ */

export const hero = {
  /** Logotipin ekran okuyucudaki karşılığı */
  title: "Hayatın ta kendisi",
  text: "Dünyada 106 milyon insan içtiği suyu hâlâ göletten ve dereden taşıyor. Köyün ortasında açılan bir kuyuyla o uzun yol birkaç adıma iner.",
  source: "Rakam: WHO ve UNICEF, 2025",
  priceNote: "bir kuyu hissesi",
  /** Paye'nin sözü fiyat satırında: mobilde de ilk ekranda kalsın */
  promise: "açılış videosu size gelir",
  image: {
    /** Masaüstü: yanları genişletilmiş geniş kare (3504×1088) */
    src: "/hayatin-ta-kendisi/giris.jpg",
    /** Telefon: iki yürüyüşçüyü ortalayan kare kırpım (1360×1380) */
    mobile: "/hayatin-ta-kendisi/giris-mobil.jpg",
    alt: "Puslu bir sabah, alçak bir beton duvarın üstünde yan yana yürüyen bir çocuk ve bir kadın; çocuğun başında sarı bir bidon, kadının başında toprak bir testi var",
  },
};

/* ------------------------------------------------------------------ */
/* Ayna ve tek insan                                                   */
/* ------------------------------------------------------------------ */

export const mirror = {
  title: "Bu sabah suya kaç kez dokundunuz?",
  text: "Uyanınca yüzünüzü yıkadınız, belki abdest aldınız. Çaydanlığı doldurdunuz, çocuğunuzun ellerini yıkadınız, kapıdan çıkmadan bir bardak su içtiniz. Bunların hiçbirini saymadınız, çünkü musluğu açarken insan suyu düşünmüyor. Kenya’nın kurak köylerinde ise günün ilk işi suyu bulmak.",
  /** Damla bu cümlenin altından Rehema'nın hikâyesine düşer */
  invite: "Gelin, o köylerden birinde yaşayan Rehema’nın sabahını dinleyelim.",
};

export const rehema = {
  title: "Rehema’nın sabahı",
  /* Emre'nin metni (7 Kasım 2026); "Oysaki" Emre'nin onayıyla TDK yazımına göre bitişik */
  paragraphs: [
    "Rehema on bir yaşında, Kilifi’de küçük bir köyde yaşıyor ve sınıfının en hızlı okuyan öğrencisi. İsmi, Svahili’de rahmet anlamına geliyormuş. Köyüne yağmur yılda iki kez, kısa süreliğine geliyor ve en yakın su kaynağı ise iki saat uzakta.",
    "Her sabah annesiyle birlikte sarı bidonlarını alıp o yola çıkıyorlar. Dönüşte annesinin başında yirmi, Rehema’nın elinde on kilo su oluyor, bu yüzden dönüş gidişten uzun sürüyor. Okulun zili çalarken Rehema çoğu gün hâlâ yolda. Göletin suyu çamurlu ve bulanık, hayvanlar da oradan içiyor; küçük kardeşi geçen ay o sudan hastalandı.",
    "Oysaki bastığı toprağın altında, metrelerce derine indiğinde temiz su var. Fakat Rehema, her sabah o suyun üstünde yürüyerek çamurlu bir gölete gitmek zorunda.",
  ],
  note: "Rehema’nın hikâyesi sahada karşılaştığımız ailelerden derlenmiştir.",
};

/** Rehema'nın iki yolu: Paye'nin noktalı yolu, uzun bir yürüyüş ve kısa bir iniş */
export const paths = {
  label:
    "Bir köyün kesiti: evden en yakın su kaynağına uzanan iki saatlik, kıvrımlı bir yol ve aynı evin altında kısa, düz bir inişle ulaşılan temiz su",
  home: "Rehema’nın evi",
  walk: "En yakın su",
  walkValue: "iki saat",
  depth: "Temiz su",
  depthValue: "toprağın metrelerce altında",
};

/* ------------------------------------------------------------------ */
/* Su ne değiştirir: altı hikâye kartı                                 */
/* ------------------------------------------------------------------ */

/**
 * charity: water'ın "Access to clean water changed the lives of Hadjara, Umu,
 * Natalia, and Devison" kartlarının Paye'deki karşılığı (Emre, 8 Kasım 2026):
 * her alan bir insanın adıyla anlatılır. Başlık "X artık ..." diye kurulur;
 * altındaki iki cümle önceki hâli ve somut bir ayrıntıyı verir. İsimler kıyı
 * Kenya'sında yaygın Svahili isimleri; çoğunun Türkçede bir karşılığı var
 * (Zainabu: Zeynep, Fatuma: Fatma, Amina: Emine, Halima: Halime, Athumani: Osman,
 * Baraka: bereket, Neema: nimet).
 *
 * Hikâyeler temsilîdir; altlarındaki not bunu söyler. Yayından önce Paye'nin
 * kuyu açtığı köylerden gerçek hikâyeler ve fotoğraflarla (veli izni, yalnızca
 * ilk isim) değişmeleri en iyisi; değişmezse not kalır. Fotoğraflar kavramsal.
 */
export type Story = {
  /** Alanın adı: kartın üstündeki küçük etiket */
  area: string;
  /** "X artık ..." başlığı; _..._ içindeki isim italik */
  title: string;
  text: string;
  src: string;
  alt: string;
};

export const life = {
  title: "Kuyu açılınca köyde neler değişiyor?",
  items: [
    {
      area: "Sağlık",
      title: "_Zainabu_ artık temiz su içiyor",
      text: "Göletin suyunu içtiği günlerde sık sık hastalanırdı. Her sabah kendi bardağını kapıp pompanın başına ilk o koşuyor.",
      src: "/hayatin-ta-kendisi/alan-saglik.jpg",
      alt: "Köyün el pompasının önünde, iki eliyle tuttuğu alüminyum bardaktan su içen küçük Zainabu",
    },
    {
      area: "Hijyen",
      title: "_Baraka_ ile _Neema_ artık yemekten önce ellerini yıkıyor",
      text: "Su birkaç adım öteye gelince kapının önüne bir bidon asıp musluk yaptılar. Akşam sofrasına kimseyi ellerini yıkamadan oturtmuyorlar.",
      src: "/hayatin-ta-kendisi/alan-hijyen.jpg",
      alt: "Yeşil boyalı bir el pompasından akan suyun altında gülerek ellerini yıkayan Baraka ve kız kardeşi Neema",
    },
    {
      area: "Eğitim",
      title: "_Amina_ artık ilk derse yetişiyor",
      text: "Sabahları annesiyle suya gittiği için ilk dersi çoğu gün kaçırırdı. Bu dönem sınıfta sesli okumaya hep o başlıyor.",
      src: "/hayatin-ta-kendisi/alan-egitim.jpg",
      alt: "Bir köy okulunun sınıfında, mavi önlüklü arkadaşlarının arasında kitabından sesli okuyan Amina",
    },
    {
      area: "Kadınlar",
      title: "_Fatuma_ artık pazarda kendi tezgâhını kuruyor",
      text: "Eskiden su yolunda geçen dört saatini şimdi pazara ayırıyor. Oğullarının okul önlüklerini bu yıl kendi kazancıyla aldı.",
      src: "/hayatin-ta-kendisi/alan-kadinlar.jpg",
      alt: "Köy pazarında tezgâhına domates, soğan ve yeşillik dizen, başı örtülü Fatuma",
    },
    {
      area: "Beslenme",
      title: "_Halima_ artık suyun hesabını yapmıyor",
      text: "Taşıdığı su önce içmeye ayrılır, tencereye ancak kalanı girerdi. Şimdi fasulyeyi akşamdan ıslatıyor, oğlu Omari de ocağın başından kalkmıyor.",
      src: "/hayatin-ta-kendisi/alan-beslenme.jpg",
      alt: "Avludaki ateşin üstündeki tencereye alüminyum bir güğümden su döken Halima ve yanında oturan oğlu Omari",
    },
    {
      area: "İbadet",
      title: "_Athumani Dede_ artık abdestini akan suyla alıyor",
      text: "Yıllarca bir ibrik suyla, damlasını sayarak abdest aldı. Caminin yanına şadırvanlı kuyu açıldığından beri sabah namazına herkesten önce geliyor.",
      src: "/hayatin-ta-kendisi/alan-ibadet.jpg",
      alt: "Küçük bir köy camisinin yanındaki musluklarda abdest alan, beyaz takkeli Athumani Dede",
    },
  ] satisfies Story[],
  /** Temsilî notu: kartların altında */
  note: "Hikâyeler, kuyu açılan köylerde karşılaştığımız ailelerden derlenmiştir.",
};

/* ------------------------------------------------------------------ */
/* Kuyu nasıl açılıyor                                                 */
/* ------------------------------------------------------------------ */

export const well = {
  title: "Bir kuyu nasıl açılıyor?",
  intro:
    "Paye, kuyuları Kenya başta olmak üzere Afrika’nın uzak köylerinde açıyor. Bir kuyunun yolu baştan sona şöyle ilerliyor:",
  steps: [
    "[[Saha ekibi suya en çok ihtiyaç duyan köyü belirliyor.]] Hisseli kuyularda bütün hisseler dolunca [[WhatsApp’tan size haber veriliyor]].",
    "Derin sondajla yer altındaki temiz suya iniliyor; yüzey suları bulaşmasın diye dayanıklı boru ve filtre sistemleri yerleştiriliyor.",
    "İhtiyaca göre el pompası ya da depolu, şadırvanlı sistem kuruluyor. [[Su test edilmeden kuyu açılmıyor.]]",
    "Bütün bir kuyuda belirlediğiniz isim kalıcı tabelaya işleniyor; köy halkıyla açılış yapılıyor ve kuyu köye emanet ediliyor.",
    "Açılış töreninin videosu ve fotoğrafları size gönderiliyor.",
  ],
  image: {
    /* Sunum için kavramsal görsel; yayından önce gerçek açılış fotoğrafı gelecek */
    src: "/hayatin-ta-kendisi/kuyu-acilis.jpg",
    alt: "Yeni açılmış bir kuyunun mavi el pompasından ilk su akarken çevresinde gülümseyen köy halkı",
    brief: {
      title: "Gerçek bir açılış: ilk su, köy halkı, tabela",
      detail:
        "Paye’nin gerçek bir kuyu açılışından bir kare ya da sekiz saniyelik sessiz bir kesit: suyun ilk aktığı an, köy halkı, kadrajda isim tabelası ve Paye logolu tişört giymiş saha ekibinden biri. Altyazıya bölge ve tarih. Yayından önce zorunlu. Çocuklar için veli izni; konum üstverisi silinir.",
      ratio: "3:4",
      size: "1200×1600",
    },
    tone: "warm",
  } satisfies Img,
  caption: "[[Bölge, tarih]]. Paye’nin açtığı bir kuyunun açılış günü.",
};

/* ------------------------------------------------------------------ */
/* Bağış                                                               */
/* ------------------------------------------------------------------ */

export const donate = {
  title: "Rehema gibi bir çocuğun yolunu siz kısaltabilirsiniz",
  /** Kartın söylemediği: hisselerin kuyuya nasıl dönüştüğü, tutar ve takvim kartta */
  lead: "Bir hisse aldığınızda bağışınız sıradaki kuyunun tutarına eklenir. Otuz bir hisse bir el pompalı kuyuyu tamamlar.",
  statValue: "[[12]]",
  /** Sitedeki "Açılan Su Kuyusu" sayacı */
  statLabel: "su kuyusu bugüne kadar Paye aracılığıyla açıldı.",
  monthly: {
    title: "Damlaya damlaya",
    text: "Her ay küçük bir tutar ayırmak isterseniz Su Kuyusu Havuzu’na katılabilirsiniz. Damlaya damlaya göl olur: [[havuzda bir kuyunun tutarı biriktiğinde sıradaki köyün sondajı başlıyor, açılan her kuyunun videosu da size geliyor.]]",
  },
  card: {
    shareCoverage: "[[Sondaj, pompa, filtre ve tabela]] dahil.",
    shareAfter: "Kuyu açılınca videosu [[WhatsApp’tan]] size gelir.",
    wellCoverage: "[[Sondaj, pompa, filtre ve tabela]] dahil.",
    wellAfter: "[[Dört ay]] içinde açılır, videosu [[WhatsApp’tan]] size gelir.",
    monthlyAfter: "Kaydınızı WhatsApp’tan alıyoruz; [[istediğiniz ay durdurabilirsiniz.]]",
    monthlyMessage: "Su Kuyusu Havuzu’na her ay {tutar} ile katılmak istiyorum.",
    bankCode: "Su Kuyusu",
    plateLead: "Tabelaya isim için",
    plateShare: "bağıştan sonra adı WhatsApp’tan gönderin.",
    plateWell: "bağıştan sonra adı WhatsApp’tan gönderin.",
    plateMessage: "Su kuyusu bağışı yaptım. Tabelaya yazılacak ad: ",
  },
  /** Kartın hemen altındaki not */
  cardNote:
    "Rehema’nın hikâyesi sahada karşılaştığımız ailelerden derlenmiştir; bağışınız, onun gibi suyu uzakta olan bir köyün kuyusuna gider.",
};

/* ------------------------------------------------------------------ */
/* Sorular                                                             */
/* ------------------------------------------------------------------ */

export const faq = {
  title: "Merak ettikleriniz",
  side: "Burada cevabını bulamadığınız bir sorunuz olursa WhatsApp hattımızdan bize yazabilirsiniz.",
  items: (price: { hisse: string; pompa: string; sadirvan: string }): FaqItem[] => [
    {
      q: "Bir hisse nasıl işliyor?",
      a: (
        <>
          Bir hisse {price.hisse}. Hisseler bir araya gelerek bir kuyunun tutarını tamamlıyor; otuz bir hisse
          bir el pompalı kuyuyu, kırk beş hisse bir şadırvanlı kuyuyu tamamlar. Bütün hisseler dolunca{" "}
          <Rich text="[[size haber verilir]]" />.{" "}
          <span data-ph="">[Paye ile netleştirilecek: hisse bağışçısına hangi kuyunun bildirildiği]</span>
        </>
      ),
    },
    {
      q: `Neden ${price.pompa}, neden ${price.sadirvan}?`,
      a: (
        <>
          El pompalı kuyuda derin sondaj, boru ve filtre sistemleri ile bir el pompası var. Şadırvanlı kuyuda
          bunlara bir su deposu ve abdest için şadırvan ekleniyor.{" "}
          <span data-ph="">[Kalemler ve bir kuyunun yaklaşık kaç kişiye su verdiği Paye ile netleştirilecek]</span>
        </>
      ),
    },
    {
      q: "Tabelaya bir yakınımın adını yazdırabilir miyim?",
      a: (
        <>
          Evet. Bütün bir kuyuda belirlediğiniz isim ya da isimler kalıcı tabelaya işleniyor; vefat etmiş bir
          yakınınızın adına da olabilir. Bağışınızdan sonra{" "}
          <a href={whatsappHref("Su kuyusu bağışı yaptım. Tabelaya yazılacak ad: ")}>WhatsApp hattımızdan</a>{" "}
          adı yazmanız yeterli. Paye adı geçen kişiye ya da ailesine ayrıca haber vermez.{" "}
          <span data-ph="">
            [Paye ile netleştirilecek: hisseli kuyuda adların ortak tabelada nasıl yazıldığı, karakter sınırı,
            adının görünmesini istemeyene ne yazıldığı]
          </span>
        </>
      ),
    },
    {
      q: "Kuyunun açıldığını nasıl göreceğim?",
      a: (
        <Rich text="Köy halkıyla yapılan açılış töreninin videosu ve fotoğrafları [[WhatsApp’tan]] size gönderilir: bütün bir kuyuda bağışınızdan sonraki [[dört ay]] içinde, hissede bütün hisseler dolduktan sonraki [[üç ay]] içinde. [[Kuyunun bulunduğu köy ve bölge de bildirilir.]]" />
      ),
    },
    {
      q: "Düzenli bağış nasıl işliyor?",
      a: (
        <>
          Her ay seçtiğiniz tutar Su Kuyusu Havuzu’nda birikir.{" "}
          <Rich text="[[Havuzda bir kuyunun tutarı tamamlandığında sıradaki köyün sondajı başlar ve o kuyunun açılış videosu size de gelir. Kaydınızı WhatsApp’tan alıyoruz; her ay aynı tutar kartınızdan ya da banka talimatıyla çekilir. İstediğiniz ay WhatsApp’tan yazarak durdurabilir ya da tutarını değiştirebilirsiniz.]]" />
        </>
      ),
    },
    {
      q: "Sondajda su çıkmazsa ya da kuyu bozulursa ne oluyor?",
      a: (
        <>
          Açılışta kuyu köy halkına emanet ediliyor.{" "}
          <span data-ph="">
            [Paye’nin uygulaması: ön etüt, su çıkmazsa sondajın başka bir noktada denenmesi, bakımı kimin
            yaptığı, arızada kime ulaşıldığı]
          </span>
        </>
      ),
    },
    {
      q: "Zekâtımı su kuyusuna verebilir miyim?",
      a: (
        <>
          Hayır. Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu’na göre (9 Nisan 2025) zekâtta mülkiyetin
          ihtiyaç sahibine geçmesi şarttır; bu yüzden kuyu gibi hayır işlerine, bir hayır kurumu aracılığıyla
          da olsa, zekât verilemez. Bu sayfadaki bağışlar sadaka olarak alınıyor; kuyu, faydası sahibinin
          ardından da süren bir sadaka-i câriyedir. Zekâtınız için{" "}
          <a href={`${PAYE.site}/faaliyetlerimiz/zekat-sadaka`}>Zekât ve sadaka sayfamıza</a> bakabilirsiniz.
        </>
      ),
    },
    {
      q: "Havale veya EFT ile bağış yapabilir miyim?",
      a: (
        <>
          Evet. Bağış kartındaki “Havale ile göndermek istiyorum” satırından IBAN’ı kopyalayabilirsiniz;
          açıklamaya “Su Kuyusu” yazmanız yeterli. Bütün hesaplarımız{" "}
          <a href={PAYE.links.hesaplar}>Hesap numaralarımız</a> sayfasında.
        </>
      ),
    },
  ],
};
