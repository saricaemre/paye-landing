# Paye kampanya landing sayfaları

Paye İnsani Yardım Derneği için konsept landing sayfaları:

| Sayfa | Proje | Adres |
|---|---|---|
| **Davetlisiniz** | Afrika Sünnet Projesi | `/davetlisiniz` |
| **Gözün Aydın** | Katarakt Ameliyatı | `/gozun-aydin` |
| **Hayatın Ta Kendisi** | Su Kuyusu | `/hayatin-ta-kendisi` |

Next.js 16 (App Router) + TypeScript. Harici UI kütüphanesi yok; stiller CSS Modules ile.
Paye'nin renk ve font değişkenleri birebir kullanıldı.

> Metinde `../` ile başlayan yollar (marka kiti, eleştirmen raporları, revizyon klasörü, arşiv) asıl
> çalışma klasöründe duruyor, bu depoda yok. Sünnet kampanyasının ilk konsepti "Biri Kaldı" da bu
> depoya alınmadı; metinde geçtiği yerler yalnızca tarihçe.

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda: http://localhost:3123/davetlisiniz ·
http://localhost:3123/gozun-aydin · http://localhost:3123/hayatin-ta-kendisi

**Taslak modu:** adrese `?taslak` ekleyin (ör. http://localhost:3123/gozun-aydin?taslak). Gerçek
bilgiyle değiştirilecek bütün metinler sarı işaretlenir, görsel yuvalarında çekim notları da görünür.

> `next dev` "library load disallowed by system policy" hatası verirse proje klasörü bir mesajlaşma
> uygulamasından indirildiği için macOS karantinasına takılmıştır: `npm ci` ile bağımlılıkları
> temiz kurmak yeterli.

# Davetlisiniz: Afrika Sünnet Projesi, ikinci konsept

8 Kasım 2026'da Emre'nin getirdiği bir landing örneğinden kuruldu:
yapısı, tarzı, harfi ve renkleri o örnekten, kimlik Paye'nin. Görseller `public/davetlisiniz/` altında
(ilk konsept Biri Kaldı'dan alındı).

## Sayfanın kurgusu

1. **Giriş: yalnızca bir davetiye** (örnekteki gibi). Gök mavisi zeminde beyaz bir kart, altın çerçeve:
   köşelerde çizgi birleşmez, iki uç kendi içine kıvrılan sarmallarla biter (`_components/Cerceve`).
   Tepede mühür gibi Paye kuşu, Rozha One "Davetlisiniz", "Afrika’da sünnet olmayı bekleyen çocuklar,
   sizi sünnet günlerine davet ediyor.", altın hap düğme "Davete katılın", altında davete katılmanın ne
   demek olduğu ("2000 TL ile bir çocuğun sünnetini üstlenin", revizyonla), dipte matbaa satırı gibi "Afrika
   Sünnet Projesi". Üstte sünnet düğünlerinin bayrak süsü (`Bayraklar`); bayraklar çerçeveye değmez.
   Açılışta çizgiler kenarların ortasından köşelere uzanıp sarmala kıvrılır, bayraklar sırayla düşer.
   Telefonda kart ekranın tepesine yaslanır, alt köşeleri yuvarlak (örneğin mobil hâli); çerçevenin yan
   çizgileri header'ın altından başlar.
2. **Davete katıldığınızda** (görünür başlık) ve sayfa sahibinin üç çizimi (`Cizimler`; sünnet şapkası,
   davul, zarfta hatıra fotoğrafı; asılları `../revizyonlar/2026-11-11-davetlisiniz/kaynak/`) ile üç
   satır: "Sırasını bekleyen bir çocuğun sünnetini üstlenirsiniz.", "2000 TL ile uzman hekim, lokal
   anestezi ve steril koşullar.", "Akşam, şölenin baş köşesinde yaşıtlarıyla bayram eder." Çizim kutusu
   eski ölçüsünde (160:112), çizgi rengi sayfadan (`currentColor`).
3. **Şerit:** kesik çizgili krem bant, üstünde Emre'nin el makası (`_components/ElMakas`). Kaydırdıkça
   bant ilerler, parmaklar açılıp kapanır, durunca açık bekler (`Serit`).
4. **Juma’nın hikâyesi:** başlığın hemen altında temsilî notu ("fotoğraflardaki çocuklar Juma değil"),
   sonra dört an tek, dar bir sütunda (660 px) alt alta: cümlenin başı olan Rozha One başlık ("Her
   zamanki gibi…"), metin, sütun genişliğinde 3:2 görsel. Kart, çerçeve ve altyazı yok. Solda ince bir
   iplik: her başlığın hizasında altın bir nokta, çizgi ilk noktada başlar, sonuncuda biter; kaydırdıkça
   aşağı doğru dolar (`IplikDolumu`), her an yumuşakça belirir, hareketi azaltınca hepsi baştan görünür.
   Bölümler: avluda bekleyen Juma, acele etmeyen annesi ("Senin sünnetini bir hekim yapacak."), ekibin
   geldiği sabah (adı listede; sünnetini onu hiç tanımayan biri üstlenmişti; annesinin elini
   bırakamaması, steril set, hekimle el çakma), akşam avluda sünnet gününü anlatan Juma.
5. **Davete katılın:** "Juma’nın sünnetini, onu hiç tanımayan biri üstlenmişti…" ve davetin cevap kartı
   (`LcvKarti`: tepesinde Rozha One "Davetlisiniz", Biri Kaldı'nın kartıyla aynı akış, hap düğmeler,
   küçük altın çerçeve) ve ortak `DonateNotes`. Zemin kremin bir kademe açığı. Masaüstünde metin kartın
   yanında sabit, telefonda kart başlığın hemen altında. Temsilî notu ikinci kez burada.
6. **Sorular** (Biri Kaldı'nınkiler ve "Sünnetini üstlendiğim çocuğu görecek miyim?") → **Kapanış:**
   bayraklar, "Kimse kalmasın." (altın nokta), düğme → koyu paylaşım şeridi ("Bağış yapamıyorsanız bu
   davetiyeyi bir yakınınıza iletin."). Paylaşım görseli girişteki davetiye (`opengraph-image.jpg`).

**Eleştirmen (8 Kasım 2026, 78/100):** `../elestirmen/raporlar/2026-11-08-davetlisiniz.md`. Yedi maddenin
hepsi uygulandı: isimsiz altyazılar ve başlığın altında temsilî notu; bağıştan sonrası için SSS ve kartta
yer tutucu; bağışçı hikâyede ("onu hiç tanımayan biri"); görünür üçlü başlığı ve tutar cümlesi; üçüncü
kartın yeni metni; kadın hekimin sünnet yapan kişi gibi göründüğü kare (`hekim.jpg`) yerine saha ekibi
(`saha.jpg`); bayrakların ve mobil çerçevenin çakışması.

**Örnekten değişenler ve nedeni:** "Davetlisiniz!" ünlemsiz (ses kuralı); "binlerce çocuk" ve kartlardaki
"2025" yok (tarih ve sayı yazılmıyor); "Size bir hatıra fotoğrafı gönderelim" yok (bağışçıya fotoğraf
gönderilmiyor); sarı düğmede beyaz yazı okunmuyordu, Paye'nin amberinde (`s-300`) koyu yazı; gövde Inter
yerine Paye'nin DM Sans'ı; örnekteki yeşil kıyafetli çocuk yerine Biri Kaldı'nın çocuğu (Emre'nin isteği).

**Revizyon (10 Kasım 2026 talimatı, 11 Kasım'da uygulandı):** başlık harfi Yeseva One yerine Rozha One
(puntolar aynı: Rozha aynı puntoda daha küçük çıkıyor); davetin iki satırı ve üç çizimi; hikâye kartları
yerine iplik düzeni; kartta "LCV" yerine "Davetlisiniz", bağış zemini bir kademe açık; footer'daki
"Gaye paylaşmaktır." bu sayfada eğik serif yerine Rozha One; düğmenin altındaki satır "2000 TL ile bir
çocuğun sünnetini üstlenin". Uygulanamayan maddeler (hatıra fotoğrafı sözü, telefon alanı, SSS) ve
önce/sonra görüntüleri: `../revizyonlar/2026-11-11-davetlisiniz/`.

## Metinleri ve görselleri değiştirmek

Bütün metinler: [`app/davetlisiniz/content.tsx`](app/davetlisiniz/content.tsx) (`[[...]]`, `_..._`
işaretleri Biri Kaldı'yla aynı). Hikâyenin görselleri `hikaye.chapters[].image` içinde, hepsi 3:2
kırpılır (odak `position`): `hero-mobil.jpg`, `anne.jpg`, `saha.jpg`, `grup.jpg`. Juma temsilî bir çocuk;
adı ve ayrıntıları bu dosyada değişir. Fotoğraftaki kişiler hikâyenin kişileri olarak tanıtılmaz,
altyazılarda isim yok. Görseller sunum için yapay zekâ örneğidir, yayından önce içerik çekiminin gerçek
kareleriyle değişir (o zamana kadar notun "kıyafeti çekim için giydirdik" cümlesi henüz doğru değil).

**Netleşmesi gereken (Paye'den):** bağıştan sonra bağışçıya haber gidiyor mu, hangi kanaldan (kartta ve
SSS'te `[[...]]`); bağışlar çocuk başına mı karşılanıyor, havuzdan mı (havuzdansa üçüncü kartta "onu hiç
tanımayan insanların bağışları karşılamıştı"); sahada sünneti kim yapıyor; kapsam ve IBAN (Biri
Kaldı'yla ortak).

---

# Gözün Aydın: Katarakt Ameliyatı

Kampanya videosundaki soruyla açılan, sade ve hikâye anlatan bir sayfa. Hareket az ve işe yarar
yerlerde: girişteki mercek ve üstündeki sürüklenen karşılaştırma, ameliyatı ziyaretçinin kendisinin
denediği küçük oyun, ekrana girerken netleşen başlıklar ve kapanıştaki göz tablosu. Adını Türkçedeki müjde sözünden alıyor: sevindirici bir haber
alana "gözün aydın" denir.

## Sayfanın kurgusu

1. **Giriş.** Solda "Ne kadar güzel, değil mi?" ve iki cümlelik açıklama, altında buton ve fiyat satırı
   ("₺4.500 · bir hastanın ameliyatı · hastanın fotoğrafı size gelir"; mobilde söz kendi satırında,
   kısa ekranlarda tutar yapışkan çubukta ilk ekranda görünür); sağda yuvarlak bir mercek
   içinde reklam videosundaki bahar dalı, çevresinde ince amber bir halka (paylaşım görseliyle aynı
   motif). Sayfa açılırken görüntü bir kez buğudan çıkıp netleşir. Mobilde mercek üstte ve biraz
   küçük (buton, tutar ve söz ilk ekranda kalsın diye), yazılar ortalı, video hafif sürümüyle (540×540). Hareket azaltma ya da veri tasarrufu açıksa video
   oynamaz, kapak karesi görünür; halkanın üstündeki düğmeyle durdurulur, ekrandan çıkınca durur.
   Merceğin üstünde sürüklenen bir çizgi var: solunda aynı video katarakt gözüyle (bulanık, soluk,
   sütlü; ayrı bir video değil, `backdrop-filter` ile binen bir buğu), sağında ameliyattan sonra.
   Açılışta çizgi en soldadır ve görüntü tamamen nettir; düğme halkanın sol kenarında, yanında
   "Çizgiyi kaydırın" yazısıyla durur. Buğu ancak çizgi çekilince görünür; fareyle, parmakla
   (dokunulan yere atlar) ya da ok tuşlarıyla kaydırılır. Solda "Kataraktlı göz" etiketi var.
2. **Hikâye.** Okuyanın kendi hayatından bir an (anneannenin ya da dedenin katarakt ameliyatı),
   ardından Afrika'daki durum; yanında Halima ve torunu Amani'nin hikâyesi ve karta giden küçük bir
   bağlantı. İki metin tek kartın yerinde sırayla durur (`StoryCarousel`: yatay kaydırma ve yaslanma,
   altta noktalar ve ok düğmeleri; mobilde yandaki kartın kenarı görünür). Her kart koyu petrol; kendi
   görseli (`kart-ev.jpg`: dantel perde, çay bardağı ve gözlük; `kart-halima.jpg`: bir değneğin iki ucunu
   tutan iki el) masaüstünde bir yanda durup yazıya doğru petrole erer (ev kartında görsel solda, Halima'da
   sağda), mobilde üstte durup aşağı doğru erir. Halima'nın temsilî olduğunu söyleyen not kartın altında
   küçük bir dipnot.
3. **Ameliyat nasıl yapılıyor?** Paye'nin süreci altı sade adımda; yanında bir fotoğraf.
4. **Ameliyatı bir de siz deneyin.** Sürecin üçüncü adımı küçük bir oyun olarak (Emre'nin isteği,
   8 Kasım 2026; karmaşık olmasın, herkes yapabilsin). Girişteki merceğin ikizi, bu kez açık zeminde
   ve solda: mercekte cerrahın mikroskobundan görünen bir göz (kahve iris, gözbebeğinde sütlü
   katarakt), irisin kenarındaki girişte bekleyen ince bir alet; bölüm ilk kez ekrana girince alet bir
   kez gözbebeğinin kıyısına uzanıp geri çekilir, gözbebeğine yalnızca ziyaretçinin elini izlerken
   girer. İki adım: (1) aleti buğunun üstünde gezdirmek (fareyle üstünde gezinmek yeter, telefonda
   parmakla sürülür; tek bir dokunuşta alet buğuyu kendisi alır); buğu alındıkça gözbebeğine sıcak bir
   ışık dolar (mikroskopta mercek alınınca görülen yansıma), çevredeki amber halka ilerlemeyi gösterir,
   yüzde altmışı alınınca kalanı kendiliğinden çözülür. (2) Kenarda kolları kapalı bekleyen yapay
   merceği gözbebeğinin ortasındaki noktalı halkaya sürüklemek ya da üstüne dokunmak; mercek oturur,
   kolları açılıp irisin arkasına geçer (katlanan ya da sert mercek ayrımı çizilmedi; Paye'nin
   cerrahlarının tekniği sorulacak). Ardından görüntü gözbebeğinden içeri girer ve girişteki dal
   netleşerek belirir ("Ertesi gün" etiketiyle); yanında sonuç ("Halima’nın ameliyatı da böyle
   bitecek…", alttaki bağış başlığına köprü), bağış düğmesi ve "Baştan başlayın". Telefonda düğme
   ekranın altında kalırsa sayfa yalnızca o kadar kayar. Yan sütunda iki adım yazılı, o an
   yapılan adım öne çıkar. Klavyede Enter iki adımı da kendisi yapar, odak sıradaki adıma geçer ve
   her adım ekran okuyucuya duyurulur. Telefonda yalnızca gözbebeği (merceğin %44'ü) ve mercek sayfa
   kaydırmasını tutar; irisin halkası kaydırmaya kalır. Hareket azaltma tercihinde salınım, kırıntılar ve geçişler olmadan çalışır. Bölüm ekrandayken
   yapışkan bağış çubuğu gizlenir. Kan, göz kapağı ya da gerçekçi tıbbi ayrıntı yok.
5. **Bağış: Halima gibi birinin ameliyatını siz üstlenebilirsiniz.** Mobilde başlığın hemen altında
   kart, metin kartın altında; bütün bağış düğmeleri doğrudan karta iner. Kartta tam ameliyat ya da
   destek fonu; butonun altında kapsam, bağıştan sonra ne olacağı, ödeme güvencesi, kapalı başlayan
   havale satırı, "bir yakınınızın adına" satırı ve WhatsApp. Soldaki metin kartı tekrar etmez: kimin
   yeniden gördüğünü öğrenmek, bugüne kadar yeniden görenlerin sayısı ([[350]]), destek fonu ve göz
   aydınlığı geleneği; altında göz aydınlığında gönderilecek hazır mesaj (WhatsApp ve kopyala).
   Masaüstünde metin, ekran yüksekliği yetiyorsa kart boyunca yanında sabit durur.
6. **Sorular.** İlk soru "₺4.500 neleri karşılıyor?"; ameliyat yapılamazsa ne olacağı ve zekât da var.
7. **Kapanış.** Işıklı bir göz tablosu (yukarıdan aşağı okununca "GÖZÜN AYDIN"; satırlar ekrana
   girince sırayla netleşir), yanında sözün anlamı, bağış düğmesi ve paylaşım (paylaşanın ağzından).

Başlıklar ekrana girerken buğudan çıkıp netleşir, metin blokları hafifçe belirir. Hareket azaltma
tercihinde bunların hiçbiri çalışmaz; her şey ilk andan görünür.

## Metinleri değiştirmek

Bütün metinler: [`app/gozun-aydin/content.tsx`](app/gozun-aydin/content.tsx). İşaretler Biri
Kaldı'yla aynı (`[[...]]`, `_..._`). Tutar tek yerde: [`lib/config.ts`](lib/config.ts) içinde
`KATARAKT.pricePerPatient`. Metinlerde `{fiyat}` yazan yerlere bu tutar kendiliğinden gelir;
paylaşım görseli ve SSS de buradan okur.

Yazım ilkesi: doğal, akıcı cümleler; slogan gibi kesik cümleler, uzun tire, ünlem ve kelime oyunu yok.

### Netleştirilmesi gerekenler

| Yer | Şu anki taslak | Not |
|---|---|---|
| Tutar | **₺4.500** (Emre, 6 Kasım 2026) | Reklam videosundaki tutar geçerli. Sitede 5 Kasım'da ₺4.000 yazıyordu; sitenin ₺4.500'e çekilmesi yazılım ekibine iletildi (`../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md`). |
| Halima ve Amani | **Temsilî** (Emre, 6 Kasım 2026): [[64]] yaş, [[Kwale]], katarakt [[altı]] yıldır, Amani [[beş]] yaşında, [[gözleri iyiyken çarşıda sebze satardı]] | Sayfada not var. Görsel temsilî kaldıkça tanınabilir yüz değil, değneği tutan iki el. Kataraktın süresi torunun yaşından uzun kalmalı ("yüzünü hiç seçemedi"). |
| Bağıştan sonra | Bağışınızdan sonraki [[sekiz hafta]] içinde fotoğraf ve ameliyat bilgileri [[WhatsApp’tan]], hastanın [[izniyle]] | Ameliyatların sürekli mi, dönemsel kamplar hâlinde mi yapıldığı belli değil (Emre bilmiyor, Paye'ye); kamp hâlindeyse Biri Kaldı'daki gibi "hangi ameliyat günü" satırı eklenmeli. Kanal, rıza süreci; birden çok ameliyatta her hasta için ayrı mı. |
| Destek fonu | [[o dönemin ameliyatlarından bir fotoğraf da WhatsApp’tan size gelir]] | Fon bağışçısına ne gittiği. |
| Kapsam | [[tarama, sağlık merkezine ulaşım, ameliyat, yapay mercek, damla ve ilaçlar, ertesi günkü kontrol]] | ₺4.500'ün kalemleri (kartta ve SSS'de). |
| Ameliyat yapılamazsa | SSS'de yer tutucu | Paye'nin uygulaması. |
| Zekât | SSS'de yer tutucu | Katarakt için ayrı fon ve vekâlet var mı; yoksa "sadaka olarak alınıyor" cevabı. |
| Havale | `lib/config.ts` → `PAYE.bank` | Sitedeki TL hesabı; açıklama kodu "Katarakt". |
| Adına bağış | WhatsApp'tan kimin adına olduğunu yaz; bağış onun adıyla kaydedilir, bilgi bağışçıya o adla gelir (destek fonunda yalnızca kayıt) | Paye adı geçen kişiye haber vermiyor (Emre, 7 Kasım 2026). |
| Sayı | [[350]] katarakt ameliyatı | Sitedeki "Işığa Kavuşturan Ameliyat" sayacı ameliyat sayıyor (Emre, 7 Kasım 2026); güncel değeri yazılacak. |
| SSS | sağlık merkezi, bağış bilgisi | Paye'den. |
| Video | reklam videosunun ilk sahnesi | Görüntü stok çekimse lisansın landing kullanımını kapsadığı kontrol edilmeli. |
| Yardım toplama izni | yok | Reklamla yayılacağı için Paye'nin izin durumu sorulmalı. |
| Örnek bilgilendirme | yok (ertelendi) | Bağışçıya giden gerçek bir mesajın (izinle) ekran görüntüsü bağış bölümüne konabilir; eleştirmenin önerisi, Emre'nin kararı. |
| Ameliyat tekniği | oyunda yapay merceğin katlanıp katlanmadığı çizilmedi | Paye'nin cerrahları fako ve katlanır mercek mi, küçük kesili elle ameliyat (MSICS) ve sert mercek mi kullanıyor; oyunun görseli gerekirse buna göre ince ayar alır (eleştirmen, 8 Kasım 2026). |

Sayfadaki diğer bilgiler Paye'nin katarakt sayfasından: Afrika'da tedavi edilemediği için görme
kaybı, yoksulluk ve hekim eksikliği, erken yaşta görme kaybı, sağlık tarama ağları ve anlaşmalı
cerrahlar, sağlık merkezine taşıma, 15-20 dakika, matlaşan merceğin yerine yapay mercek, pansuman,
damla ve ilaç, ertesi gün bandın açılması, tam ameliyat bağışçısına görsel ve ameliyat bilgisi,
Katarakt Destek Fonu (en az ₺250). "Milyonlarca" ifadesi Emre'nin kararıyla (6 Kasım 2026) giriş,
açıklama, paylaşım görseli ve paylaşım metninden çıkarıldı; yerine tek bir insan ve "yarım saati
bulmayan bir ameliyat".

## Görseller ve video

**Hazır olanlar** (`public/gozun-aydin/`):

| Dosya | Ne |
|---|---|
| `bahar.mp4` | Reklam videosunun ilk sahnesi (0,25 ile 4,7 saniye arası; açılıştaki kararma dışarıda), kare kesilmiş, ileri geri dikişsiz döngü (1080×1080, sessiz, 8,9 sn, 770 KB) |
| `bahar-540.mp4` | Aynı döngünün mobil sürümü (540×540, 177 KB); 959 px ve altında bu oynar |
| `bahar.jpg` | Döngünün ilk karesi, merceğin kapağı |
| `kart-ev.jpg`, `kart-halima.jpg` | Hikâye kartlarının arka planı (3:4, 1200×1600). Sunum için Magnific (GPT Image 2.6) ile üretilmiş yapay zekâ örneği; yayından önce gerçek fotoğrafla değişir |
| `bahar-net.jpg`, `bahar-perde.jpg` | Kullanılmıyor (eski hikâye bölümündeki karşılaştırmanın kareleri; karşılaştırma artık mercekte, videonun üstünde) |

Serinin başka bir videosu kullanılmak istenirse döngü şöyle üretilir
(`BAS` ve `SURE` videonun yazısız bölümü, `Y` kare kesitin üst kenarı; dikey 1080×1920 videoda
ortası için 420):

```bash
ffmpeg -ss BAS -t SURE -i video.mp4 -an -filter_complex "[0:v]crop=1080:1080:0:Y,setpts=PTS-STARTPTS,split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0,format=yuv420p[v]" -map "[v]" -c:v libx264 -preset slow -crf 25 -movflags +faststart bahar.mp4
```

**Yer tutucular:** dosyayı `public/gozun-aydin/` altına koyup `content.tsx`'te ilgili `src: null`
alanını `src: "/gozun-aydin/dosya.jpg"` yapmak yeterli.

**Hassasiyet:** Ameliyat anı, göz ya da yara yakın planı yok. Hastalar onurlu ve sakin; bandı açılmış
hasta gülümsüyor. Çocuklarda veli izni, yalnızca ilk isim.

| # | Dosya önerisi | Oran · ölçü | Ne |
|---|---|---|---|
| 1 | `halima.jpg` | 3:2 · 2400×1600 | Bir değneğin iki ucunu tutan iki el (yaşlı bir el, küçük bir el); arkada köy yolu ya da evin önü. İkindi ışığı. Hikâye temsilî olduğu için tanınabilir yüz yok. |
| 2 | `kontrol.jpg` | 4:5 · 1200×1500 | Kontrol günü: bandı yeni açılmış, gülümseyen bir hasta ve yakını; kadrajda yerel hemşire ya da cerrah ve Paye ekibinden biri. Hastanın izniyle. |

**Paylaşım görseli:** `app/gozun-aydin/opengraph-image.tsx` derlemede 1200×630'luk kartı kendisi
üretir (dal, "Gözün aydın", tek cümle, tutar) ve JPEG'e çevirir (~80 KB; WhatsApp 300 KB üstü
önizlemeleri düşürebiliyor). Instrument Serif ve Onest'i Google Fonts'tan alır; ağ yoksa varsayılan
yazı tipine düşer. Hazır bir görsel kullanılacaksa dosya silinip aynı klasöre `opengraph-image.jpg`
konur.

## Kod

- **Instrument Serif** başlıklar yalnızca bu sayfada yüklenir (`app/gozun-aydin/layout.tsx`).
- `_components/`: `HeroVideo` (girişteki mercek: video, üstündeki sürüklenen
  karşılaştırma ve durdurma düğmesi), `StoryCarousel` (hikâye kartları arasında geçiş), `SurgeryGame`
  (ameliyatı deneme: göz, buğu ve alet tek bir canvas'ta, dış kütüphane yok; yapay mercek
  sürüklenebilen bir düğme; göz bölüm ekrana yaklaşınca bir kez çizilir), `EyeChart` (kapanıştaki göz tablosu), `DonateWidget` (bağış kartı),
  `GiftMessage` (göz aydınlığı mesajı). Oyunun metinleri `content.tsx` → `game`.
- Başlıkların netleşerek belirmesi `data-reveal="focus"` ile; kuralı `page.module.css`'in başında.
- Ortak parçalara iki ekleme yapıldı: `Header`'a `darkSections` (koyu bölümlerin üstünde koyu cam
  görünüm) ve `RevealObserver`'a adresle gelen `#bölüm`e kaydırma (ör. reklamdan `/gozun-aydin#bagis`).
  Biri Kaldı'nın görünümü değişmedi.
- Bağış butonu `/bagis-yap?tur=katarakt&adet=N`, destek fonu `?tur=katarakt&secenek=destek-fonu&tutar=N`
  adresine gider; sayfaya gelen `utm_*` parametreleri de eklenir. Site bu parametreleri henüz okumuyor
  (`../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md`).

## Kampanyaların ortak parçaları

- `components/landing/DonateNotes`: bağış kartında butondan sonraki satırlar (kapsam, sonra ne olur,
  ödeme güvencesi, kapalı başlayan havale satırı ve kopyala, kampanyaya özel satır, WhatsApp, künye).
  Hesap bilgisi `lib/config.ts` → `PAYE.bank`.
- `CopyButton` (panoya kopyalama), `useUtm` (reklam parametrelerini bağış adresine taşır).
  Paylaşım düğmeleri adrese kendi utm'sini ekler (`utm_source=whatsapp&utm_medium=paylasim`, göz
  aydınlığı mesajında `utm_medium=goz-aydinligi`); "bu sayfayı birine gönder"in getirdiği bağış ölçülür.
- Bağış çapası: `#bagis` bağış kartının kendisi, bölüm `#bagis-bolumu`. Header'daki "Bağış Yap",
  bütün butonlar ve reklamdan gelen `/…#bagis` adresi doğrudan karta iner.
- `StickyDonate`: girişteki fiyat satırı (`#giris-tutar`), bağış kartı, kapanış ya da footer
  (`#iletisim`) ekrandayken gizlenir; masaüstünde yalnızca düğme. Gizlenmesi bütün girişe değil fiyat
  satırına bağlı: telefonda araç çubukları açıkken (yaklaşık 664 px) fiyat satırı ilk ekranın altında
  kalırsa çubuk tutarı ve butonu ilk ekranda gösterir. `ui.module.css` sabit header ve çubuk için `scroll-padding` verir.
- `npm run denetim`: yayında kalmaması gereken `[[...]]` yer tutucularını, "netleştirilecek"
  notlarını, boş görsel yuvalarını ve `@yer-tutucu` diye işaretlenmiş değerleri (ör. köydeki çocuk
  sayısı `DONE`) listeler; açıklama satırlarındaki köşeli parantezleri saymaz. Yayından önce boş dönmeli. `npm run build:yayin`
  önce denetimi çalıştırır, yer tutucu kaldıysa derlemeyi başlatmaz (geliştirme önizlemesi etkilenmez).

---

# Hayatın Ta Kendisi: Su Kuyusu

Adı charity: water'ın "it's all about life" cümlesine Türkçe bir karşılık: su, hayatın bir parçası
olarak değil, kendisi olarak anlatılıyor. Sayfa kısa ve düz: rakamla açılan bir giriş, tek bir insanın
sabahı, suyun dokunduğu altı alan, kuyunun yolu, bağış.

> **Hitap "siz"** (Emre, 7 Kasım 2026 akşamı): sayfanın bütün metinleri, bağış kartı ve kartın altındaki
> ortak satırlar (`DonateNotes` → `siz`). Header'daki "Bağış Yap" Paye'nin sitesindeki düğmenin adı
> olarak kaldı.
>
> **7 Kasım 2026 akşamı, sayfa baştan tasarlandı (Emre'nin konsepti).** Damla konsepti bırakıldı; ilk
> iki sürüm `../arsiv/hayatin-ta-kendisi-v1/` altında. Giriş artık Emre'nin verdiği fotoğraf ve
> logotip: puslu bir gökyüzü, alçak bir duvarın üstünde başında suyla yürüyen bir çocuk ve annesi,
> gökyüzünde ortalı, figürlerin üstünde petrol "HAYATIN TA KENDİSİ". Sayfanın renkleri bu fotoğraftan
> alındı. Yalnız başına duran sarı bidon görseli "kötü" bulunup çıktı; su yolculuğu kesiti (iki yol)
> kaldı. Daha önce reddedilenler: damlanın içinde oynayan video, alanları vakitlere bölmek, "Bu kuyu
> kimin için?" (hayrat, canlı tabela) bölümü, Kur'an-ı Kerim satırı.

## Sayfanın kurgusu

1. **Giriş.** Logotip (`public/hayatin-ta-kendisi/logotip.svg`, kodda `_components/logotype-path.ts`)
   puslu gökyüzünde; altında "Dünyada 106 milyon insan içtiği suyu hâlâ göletten ve dereden taşıyor.
   Köyün ortasında açılan bir kuyuyla o uzun yol birkaç adıma iner." Kampanya düğmesi ("Bir kuyuya ortak
   olun"; Paye'nin petrol hapı, içinde amber bir damla) ve fiyat satırı: "₺3.000 bir kuyu hissesi ·
   açılış videosu size gelir". En altta fotoğraf; yazılar doğal boyunda kalır, fotoğraf kalan yüksekliği doldurur. Kısa
   ekranda duvarın alt kısmı kırpılır, yolcuların ayakları hep ilk ekranda kalır. Kaynak satırı
   duvarın üstünde sağ altta. Telefonda sıra logotip, düğme ve tutar, fotoğraf, metin (eleştirmen,
   7 Kasım v2 raporu: tarayıcının gerçek ekranında ~375×640 iki yolcu da ilk ekrana girsin diye).
2. **Bu sabah suya kaç kez dokundunuz?** Okuyanın kendi sabahı, ortalı; sonunda amber, italik serif bir
   davet: "Gelin, o köylerden birinde yaşayan Rehema’nın sabahını dinleyelim."
3. **Rehema’nın sabahı.** Davetin altından bir damla Paye'nin amber noktalı yolu boyunca düşer; geçtiği
   noktalar petrol suya döner, değdiği yerde halkalar açılır ve başlık o halkalardan yükselir. Zemin tam o
   çizgide açık kâğıttan Rehema'nın tozlu rengine geçer. Emre'nin metni; temsilî notu bölümün sonunda ve
   kartın altında.
4. **İki yol.** Köyün kesiti: evden en yakın suya uzun ve kıvrımlı yürüyüş (iki saat), aynı evin
   altında temiz suya kısa ve dümdüz iniş. Zemin tozdan toprağa, topraktan Paye'nin koyu petrolüne döner
   ve sonraki koyu bölüme akar. Çizgiler ekrana girerken bir kez uzar.
5. **Kuyu açılınca köyde neler değişiyor?** Altı hikâye kartı (Emre, 8 Kasım 2026: charity: water'ın
   "Hadjara, Umu, Natalia ve Devison" kartları gibi, her alan bir insanın adıyla). Paye'nin koyu
   petrolünde belgesel fotoğraf (4:5), alt kenarına açık bir kutu biner: amber çizgili alan adı, "X artık
   ..." başlığı (isim italik petrol) ve önceki hâli ile somut bir ayrıntıyı veren iki cümle. Zainabu
   (Sağlık), Baraka ile Neema (Hijyen), Amina (Eğitim), Fatuma (Kadınlar), Halima ve oğlu Omari
   (Beslenme), Athumani Dede (İbadet): kıyı Kenya'sının Svahili isimleri, çoğunun Türkçede karşılığı var
   (Zeynep, Fatma, Emine, Halime, Osman). Masaüstünde üç sütun, orta sütun biraz aşağıda; tablette iki
   sütun; telefonda kartlar yana kayar. Hikâyeler temsilî; altlarında not var. Yayından önce Paye'nin
   köylerinden gerçek hikâye ve fotoğraflarla (veli izni, yalnızca ilk isim) değişmeleri en iyisi.
6. **Bir kuyu nasıl açılıyor?** Beş adım, amber serif rakamlar; yanında açılış karesi (şimdilik
   kavramsal görsel, yayın öncesi gerçeğiyle değişmeli).
7. **Bağış: Rehema gibi bir çocuğun yolunu siz kısaltabilirsiniz.** Kart üç seçenekli, düğmelerde fiyat:
   **Hisse** (₺3.000, varsayılan; 1/2/5/10 ve sayaç; "bir hisse yaklaşık [[16]] kişinin suyu"; 31 hisse
   ve üstünde "Bütün kuyuya geç"), **Bütün kuyu** (El pompalı ₺92.000, Şadırvanlı ₺135.000; kişi
   karşılığıyla), **Her ay** (Su Kuyusu Havuzu; ₺250, ₺500, ₺1.000, ₺2.000 ve başka tutar; "Bir yılda
   ₺3.000 eder; bu tam bir kuyu hissesi demek"; düğme "WhatsApp’tan her ay ₺250 ile katıl", ödeme
   güvencesi satırı bu modda yok). Hisse ve bütün kuyuda butonun altında tabela satırı (adı WhatsApp'tan
   göndermek için). Hissede söz: "bütün hisseler dolunca [[haber veririz]], ondan sonraki [[üç ay]]
   içinde video". Soldaki metin: hisselerin nasıl birleştiği, sayaç (Onest), "Damlaya damlaya". Bu
   bölüm ilk sürümdeki görünümüyle kaldı (Emre, 7 Kasım: "eskisinde daha iyimiş"); sayfanın geri
   kalanı da onun diline uyduruldu.
8. **Sorular** (8): hisse, tutarlar, tabelaya yakının adı, açılış videosu, düzenli bağış, sondajda su
   çıkmazsa ya da kuyu bozulursa, zekât (verilemez; DİYK, 9 Nisan 2025), havale.
Kapanış bölümü yok: "Su gibi aziz ol" (ninesine su uzatan kız, düğme, paylaşım) Emre'nin isteğiyle
çıktı (7 Kasım akşamı); sayfa SSS'den sonra footer'la biter. Görselleri `../arsiv/hayatin-ta-kendisi-kapanis/`.

Hareket (dört dokunuş): açılışta logotipin harfleri alttan yukarı dalgalı bir su çizgisiyle dolar
(~3 sn, yalnızca bir kez); Rehema'ya düşen damla; iki yolun bir kez çizilmesi; ekrana girerken hafif
belirme. Kampanya düğmesinde fareyle üstüne gelince damladan halkalar açılır. Video, kaydırmaya bağlı
sahne ve sekme yok; hareket azaltma tercihinde her şey ilk andan görünür.

**Renk ve yazı katmanı** (`page.module.css` başı): açık zeminler giriş fotoğrafından (pus `#EBE5E3`,
girişin zemini ve fotoğrafın gökyüzü; kâğıt `#F4F0EC`; toz `#EBDFD1`, Rehema'nın dünyası); koyu
bölümler, düğmeler ve vurgular Paye'nin (petrol `#0E2E2C`, düğme `#1E6E6A`, amber noktalı yol ve
rakamlar, küçük amber metin `#9A5217`). Logotip `#094C50`, yalnızca girişte. Başlıklar ve vurgular
**DM Serif Display** (italik dahil), sayaç Onest, gövde DM Sans. Emre bir ara Anton'lu ağır başlıkları
gördü ve ilk sürümün serif, Paye renkli görünümünü daha güzel buldu (7 Kasım akşamı).

## Metinleri değiştirmek

Bütün metinler: [`app/hayatin-ta-kendisi/content.tsx`](app/hayatin-ta-kendisi/content.tsx). İşaretler
seriyle aynı (`[[...]]`, `_..._`). Tutarlar ve sayılar tek yerde: [`lib/config.ts`](lib/config.ts) →
`SU_KUYUSU` (`pricePerShare`, `handPump`, `fountain`, `monthlyMin`, `peoplePerWell`,
`peoplePerFountain`, `sharesPerWell`, `monthlyVia`). Metinlerde `{hisse}` yazan yere hisse tutarı
kendiliğinden gelir.

Görsellerin yanındaki "Kavramsal görsel, yapay zekâyla üretildi." notu sunum aşamasında kapalı
(Emre'nin tercihi): `content.tsx` → `showAiNotes`. Yayında kavramsal görsel kalırsa `true` yapılmalı.

Kaynaklı sayılar: her dört kişiden biri (2,1 milyar), 106 milyon ve 1,7 milyar (WHO ve UNICEF, Ağustos
2025), 505 bin (Dünya Sağlık Örgütü içme suyu bilgi notu, Eylül 2023; tahmin), onda yedi (WHO ve UNICEF,
Temmuz 2023; 15 yaş üstü kadınlar ve kızlar, suyu evinde olmayan haneler).

### Netleştirilmesi gerekenler

| Yer | Şu anki taslak | Not |
|---|---|---|
| Hisse ve tabela | Kartta: "[[hisse sahiplerinin adı kuyunun ortak tabelasına kısa olarak yazılır]]" | En önemli soru. Hissenin tabela hakkı yoksa hisse modunda tabela satırı kalkar. |
| Gerçek tabela | yok | Paye'nin gerçek tabelasının fotoğrafı, dili, karakter sınırı, onay adımı (SSS'de yer tutucu). |
| Bağıştan açılışa | Bütün kuyu: bağıştan sonraki [[dört ay]]; hisse: bütün hisseler dolduktan sonraki [[üç ay]] | Gerçek süre ve kanal ([[WhatsApp’tan]]); hisse dolunca haber verilip verilmediği. |
| Kişi karşılığı | `peoplePerWell` [[500]], `peoplePerFountain` [[800]], hisse başına [[16]] | Bir kuyunun yaklaşık kaç kişiye su verdiği. |
| Düzenli bağış | Sitede altyapı yok; "Her ay" düğmesi şimdilik WhatsApp'a hazır mesajla gider (`monthlyVia: "whatsapp"`) | Kayıt nasıl alınacak (kart, banka talimatı), nasıl durdurulacak, havuzun sırayla kuyu açtığı doğru mu. Altyapı gelince `monthlyVia: "site"` yeterli. En düşük tutar `monthlyMin` [[₺250]]. |
| Rehema | **Temsilî**, metni Emre'nin | Sayfada not var. |
| Beslenme | "[[bahçe kurulan köylerde sofraya sebze de geliyor.]]" | Paye'nin bir kuyusunda bahçe varsa kalır, yoksa cümle silinir. |
| Sayaç | [[12]] su kuyusu | Sitedeki "Açılan Su Kuyusu" sayacının güncel değeri. |
| Kapsam | [[Sondaj, borulama, filtre, pompa, tabela ve açılış]] | ₺92.000 ve ₺135.000'in kalemleri (SSS'de de). |
| Gerçek açılış | `well.image` şimdilik kavramsal görsel (`kuyu-acilis.jpg`) | Yayın öncesi zorunlu: gerçek bir açılıştan kare ya da sekiz saniyelik sessiz kesit, altyazıda bölge ve tarih. |
| Sondajda su çıkmazsa, bakım | SSS'de yer tutucu | Paye'nin uygulaması. |
| Zekât | DİYK cevabı; Paye'nin zekât sayfasına bağlantı | Bağlantı adresi (`/faaliyetlerimiz/zekat-sadaka`) sitede kontrol edilmeli. |
| Havale | `lib/config.ts` → `PAYE.bank`; açıklama kodu "Su Kuyusu" | |
| Yardım toplama izni | yok | Reklamla yayılacaksa sorulmalı. |

## Görseller

Hepsi `public/hayatin-ta-kendisi/` altında. Giriş fotoğrafını Emre verdi; geri kalanlar Magnific'te
(GPT 2.6, 2k, high) giriş fotoğrafı stil referansı yapılarak üretilmiş **kavramsal** görseller: uzun
odak, sıkışmış perspektif, havada toz ve pus, soluk kum, bej ve gül kurusu tonlar, kil, toprak sarısı
ve soluk mavi vurgular. Gerçek bir kare geldiğinde **yeni bir dosya adıyla** konulmalı (aynı adla
değiştirilince geliştirme sunucusu eskisini önbellekten verir; gerekirse `.next/dev/cache/images`
silinir).

| Dosya | Ne |
|---|---|
| `giris.jpg` | Masaüstü giriş: Emre'nin fotoğrafı, yanları Magnific Expand ile genişletilmiş (3504×1088) |
| `giris-mobil.jpg` | Telefon: iki yolcuyu ortalayan kare kırpım (1360×1380, asıl fotoğraftan) |
| `logotip.svg` | "HAYATIN TA KENDİSİ" logotipi, `#094C50` |
| `alan-saglik.jpg`, `alan-hijyen.jpg`, `alan-egitim.jpg`, `alan-kadinlar.jpg`, `alan-beslenme.jpg`, `alan-ibadet.jpg` | Altı hikâye kartının fotoğrafları (1200×1600): Zainabu, Baraka ile Neema, Amina, Fatuma, Halima ile Omari, Athumani Dede |
| `kuyu-acilis.jpg` | Kuyu açılışı (kavramsal; yayından önce gerçeğiyle değişmeli) |

Paylaşım görseli `app/hayatin-ta-kendisi/opengraph-image.tsx`: girişin aynısı (pus, logotip, duvarın
üstündeki yolcular, altta Paye ve tutar satırı; `og-hero.jpg`, ~80 KB JPEG).

## Kod

- **DM Serif Display** (normal ve italik) yalnızca bu sayfada yüklenir (`app/hayatin-ta-kendisi/layout.tsx`);
  gövdedeki DM Sans'la aynı aileden. Girişteki başlık yazı tipi değil, Emre'nin logotipi (SVG).
- `_components/`: `Logotype` (logotip ve suyla dolma açılışı), `DropBridge` (Rehema'ya düşen damla),
  `TwoPaths` (iki yol), `DonateWidget` (üç seçenekli bağış kartı).
- Ortak `Header`'a `lightTop` eklendi: açık renkli bir girişte en üstte logo ve bağlantılar koyu görünür;
  öbür sayfaların görünümü değişmedi.
- Ortak `DonateNotes`'a isteğe bağlı `secure` eklendi (düğme bağış sayfasına gitmiyorsa ödeme güvencesi
  satırını gizler); öbür sayfaların görünümü değişmedi.
- Bağış adresleri: hisse `/bagis-yap?tur=su-kuyusu&adet=N`, bütün kuyu `?tur=su-kuyusu&secenek=el-pompali`
  ya da `secenek=sadirvanli`, düzenli bağış `?tur=su-kuyusu&secenek=duzenli&tutar=N` (şimdilik
  kullanılmıyor, WhatsApp). `utm_*` parametreleri eklenir. Site bunları henüz okumuyor
  (`../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md`).

---

## Paye'nin Next.js projesine taşıma

Sitenin kendisi Next.js + Tailwind v4, `/tr` `/en` `/ar` dil yönlendirmesiyle çalışıyor.

1. `app/davetlisiniz/`, `app/gozun-aydin/` ve `app/hayatin-ta-kendisi/` klasörlerini sitenin dil
   segmenti altına (ör. `app/[locale]/gozun-aydin/`), `components/landing/` ve `lib/` klasörlerini
   projeye kopyalayın. Sünnetin görselleri `public/davetlisiniz/`, katarakt videosu ve kareleri `public/gozun-aydin/`, su kuyusunun görselleri
   `public/hayatin-ta-kendisi/` altında.
2. Fontlar: Onest ve DM Sans sitede zaten yüklü. `components/landing/ui.module.css` içindeki
   `--f-heading` ve `--f-body` değişkenlerini sitenin kendi değişkenlerine (`--ff-heading`, `--ff-body`)
   bağlayın. Kampanya fontları kendi layout'larında: Rozha One `app/davetlisiniz/layout.tsx`,
   Instrument Serif `app/gozun-aydin/layout.tsx`, DM Serif Display `app/hayatin-ta-kendisi/layout.tsx`.
   Kök layout'a eklenmemeli.
3. `app/globals.css` gerekmez; landing'in bütün stilleri `.landing` kökü altında.
4. `<html>`'e `js` sınıfını ekleyen küçük betik (`app/layout.tsx`) görünürlük animasyonları için gerekli.
5. Bağış butonu `/bagis-yap?tur=sunnet&adet=N` adresine gider. **Bağış sayfası şu an `adet`
   parametresini okumuyor**; sayfa bu parametreyle sünnet seçeneğini o adetle açarsa seçim sepete
   birebir taşınır. Alternatif olarak sitedeki "sepete ekle" fonksiyonu doğrudan bağlanabilir.
   Adres `lib/config.ts` içinde. Sitede yapılacak işlerin tamamı:
   `../elestirmen/raporlar/paye-yazilim-ekibine-notlar.md`.
7. Paylaşım görselleri JPEG'e çevrilirken Next.js'in isteğe bağlı bağımlılığı `sharp` kullanılır
   (`lib/og.ts`); kurulu değilse PNG döner.
6. Site kendi header/footer'ını kullanmak isterse `Header` ve `Footer` bileşenleri çıkarılabilir.
   Footer çıkarılırsa yapışkan bağış çubuğunun footer'da gizlenmesi için sitenin footer'ına
   `id="iletisim"` verilmeli. Canonical ve og:url (`/davetlisiniz`, `/gozun-aydin`) sitenin dil
   segmentine (`/tr/...`) göre güncellenmeli.

## Yapı

```
app/
  layout.tsx                 Onest ve DM Sans, metadata
  davetlisiniz/
    layout.tsx               Rozha One
    page.tsx · page.module.css · content.tsx
    opengraph-image.jpg      paylaşım görseli
    _components/             davetiye ve çerçeve, bayraklar, çizimler, el makaslı şerit, iplik, bağış kartı
  gozun-aydin/
    layout.tsx               Instrument Serif
    page.tsx · page.module.css · content.tsx
    opengraph-image.tsx      paylaşım görseli (derlemede üretilir, JPEG)
    _components/             mercek ve karşılaştırma, göz tablosu, bağış kartı, göz aydınlığı mesajı
  hayatin-ta-kendisi/
    layout.tsx               DM Serif Display
    page.tsx · page.module.css · content.tsx
    opengraph-image.tsx      paylaşım görseli (og-hero.jpg ve logotip, JPEG)
    _components/             logotip, Rehema'ya düşen damla, iki yol, bağış kartı
components/landing/          ortak parçalar (header, footer, görsel yuvası, SSS, bağış kartı satırları…)
lib/config.ts                Paye iletişim ve hesap bilgileri, bağış adresleri, tutarlar
lib/og.ts                    paylaşım görselleri için font ve JPEG yardımcıları
scripts/                     yer tutucu denetimi (npm run denetim)
public/brand/                Paye logoları (siteden)
public/davetlisiniz/         sünnetin görselleri (sunum için yapay zekâ örneği)
public/gozun-aydin/          katarakt videosu (iki boy) ve kareleri
public/hayatin-ta-kendisi/   su kuyusunun görselleri (giriş Emre'nin, gerisi kavramsal)
```

Erişilebilirlik: anlamsal başlık hiyerarşisi, klavyeyle gezilebilen SSS ve havale satırı, görünür
odak halkaları, kart içinde en az 44 px dokunma hedefleri, toplamı duyuran sabit bir canlı bölge;
`prefers-reduced-motion` açıkken bütün hareketler durur.
