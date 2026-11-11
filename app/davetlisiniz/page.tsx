import type { Metadata } from "next";
import { DonateNotes } from "@/components/landing/DonateNotes";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Icon } from "@/components/landing/Icon";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { PayeMark } from "@/components/landing/PayeMark";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { Rich } from "@/components/landing/Rich";
import { ShareActions } from "@/components/landing/ShareActions";
import { StickyDonate } from "@/components/landing/StickyDonate";
import ui from "@/components/landing/ui.module.css";
import { PAYE, SUNNET } from "@/lib/config";
import { formatTRY } from "@/lib/format";
import { Bayraklar } from "./_components/Bayraklar";
import { Cerceve } from "./_components/Cerceve";
import { CIZIMLER } from "./_components/Cizimler";
import { IplikDolumu } from "./_components/IplikDolumu";
import { LcvKarti } from "./_components/LcvKarti";
import { Serit } from "./_components/Serit";
import * as c from "./content";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: "/davetlisiniz" },
  openGraph: {
    title: c.meta.ogTitle,
    description: c.meta.description,
    url: "/davetlisiniz",
    siteName: PAYE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: c.meta.ogTitle,
    description: c.meta.description,
  },
};

/** Görünürlük animasyonu için gecikme */
const d = (ms: number, extra?: Record<string, string>) =>
  ({ "--d": `${ms}ms`, ...extra }) as React.CSSProperties;

export default function DavetlisinizPage() {
  const price = formatTRY(SUNNET.pricePerChild);

  return (
    <div className={`${ui.landing} ${s.page}`}>
      <Header homeHref={PAYE.site} donateHref="#bagis" links={c.nav} lightTop darkSections={["paylas", "iletisim"]} />

      <main>
        {/* ============================================================
            1 · GİRİŞ: yalnızca bir davetiye
            ============================================================ */}
        <section id="davetiye" className={s.giris} aria-labelledby="giris-title">
          <Bayraklar ac className={s.girisBayrak} />

          <div className={s.davetiye}>
            <Cerceve ciz className={s.davetiyeCerceve} />

            <div className={s.davetiyeIc}>
              <PayeMark className={s.muhur} />
              <h1 id="giris-title" className={s.baslik}>
                {c.hero.title}
              </h1>
              <p className={s.davetMetin}>{c.hero.text}</p>
              <a href="#bagis" className={s.dugme}>
                {c.hero.cta}
              </a>
            </div>

            {/* Tutar satırı, davetiyelerin dibindeki matbaa satırının yerinde (Emre, 11 Kasım 2026) */}
            <p id="giris-tutar" className={`${s.tutar} ${s.matbaa}`}>
              <strong>{c.hero.priceAmount}</strong> {c.hero.priceLine}
            </p>
          </div>
        </section>

        {/* ============================================================
            2 · DAVETİN ÜÇ SATIRI: örnekteki üç çizim
            ============================================================ */}
        <section id="nasil" className={s.uclu} aria-labelledby="nasil-title">
          <h2 id="nasil-title" className={s.ucluBaslik} data-reveal>
            {c.davet.title}
          </h2>
          <ul className={s.ucluListe}>
            {c.davet.items.map((it, i) => {
              const Cizim = CIZIMLER[it.cizim];
              return (
                <li key={it.cizim} className={s.ucluOge} data-reveal style={d(i * 130, { "--d2": `${0.3 + i * 0.13}s` })}>
                  <div className={s.ucluCizim}>
                    <Cizim />
                  </div>
                  <p>
                    <Rich text={it.text} />
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <Serit />

        {/* ============================================================
            3 · JUMA'NIN HİKÂYESİ: tek sütunda, ince bir iplikle bağlı dört an
            ============================================================ */}
        <section id="hikaye" className={s.hikaye} aria-labelledby="hikaye-title">
          <div className={ui.container}>
            <h2 id="hikaye-title" className={`${s.h2} ${s.ortali}`} data-reveal>
              {c.hikaye.title}
            </h2>

            {/* Solda iplik: her başlığın hizasında bir nokta; kaydırdıkça aşağı doğru dolar */}
            <ol id="hikaye-ipligi" className={s.iplik}>
              {c.hikaye.chapters.map((b) => (
                <li key={b.title} className={s.parca} data-reveal="fade">
                  <h3 className={s.parcaBaslik}>{b.title}</h3>
                  <p className={s.parcaMetin}>
                    <Rich text={b.text} />
                  </p>
                  <figure className={s.parcaFoto}>
                    <ImageSlot
                      src={b.image.src}
                      alt={b.image.alt}
                      brief={b.image.brief}
                      tone={b.image.tone}
                      sizes="(max-width: 767px) calc(100vw - 80px), 660px"
                      position={b.position}
                      label="none"
                    />
                  </figure>
                </li>
              ))}
            </ol>
            <IplikDolumu listeId="hikaye-ipligi" />
          </div>
        </section>

        {/* ============================================================
            4 · BAĞIŞ: davetin cevap kartı
            ============================================================ */}
        <section id="bagis-bolumu" className={s.bagis} aria-labelledby="bagis-title">
          <div className={`${ui.container} ${s.bagisIzgara}`}>
            {/* Masaüstünde kartın yanında sabit durur; telefonda başlık, kart, metin sırasıyla */}
            <div className={s.bagisSol}>
              <h2 id="bagis-title" className={`${s.h2} ${s.bagisBaslik}`} data-reveal>
                {c.donate.title}
              </h2>
              <div className={s.bagisYazi}>
                <p className={s.bagisMetin} data-reveal style={d(120)}>
                  <Rich text={c.donate.text} />
                </p>
              </div>
            </div>

            {/* Bütün bağış düğmeleri buraya, kartın kendisine iner */}
            <div id="bagis" className={s.bagisKart} data-reveal="fade" style={d(120)}>
              <LcvKarti title={c.donate.cardTitle} line={c.donate.line}>
                <DonateNotes
                  coverage={c.donate.coverage}
                  after={c.donate.after}
                  afterIcon="heartHandshake"
                  bankCode={c.donate.bankCode}
                  siz
                  sslDetail={false}
                  kunye={false}
                  waLabel={c.donate.waLabel}
                />
              </LcvKarti>
            </div>
          </div>
        </section>

        {/* ============================================================
            5 · SORULAR
            ============================================================ */}
        <section id="sss" className={s.sss} aria-labelledby="sss-title">
          <div className={`${ui.container} ${s.sssIzgara}`}>
            <div>
              <h2 id="sss-title" className={s.h2}>
                {c.faq.title}
              </h2>
              <p className={s.sssMetin}>{c.faq.side}</p>
              <a href={PAYE.whatsapp} className={`${ui.btn} ${ui.btnLight} ${ui.btnSm}`}>
                <Icon name="whatsapp" size={18} />
                WhatsApp’tan yazın
              </a>
            </div>
            <div data-reveal>
              <Faq items={c.faq.items} firstOpen={false} />
            </div>
          </div>
        </section>

        {/* ============================================================
            6 · KAPANIŞ: yine bayraklar, davetin son satırı
            ============================================================ */}
        <section id="kapanis" className={s.kapanis} aria-labelledby="kapanis-title">
          <Bayraklar gorununce className={s.kapanisBayrak} />
          <div className={`${ui.container} ${s.kapanisIc}`}>
            <h2 id="kapanis-title" className={s.kapanisBaslik} data-reveal>
              {c.closing.title}
              <span className={s.nokta}>.</span>
            </h2>
            <p className={s.kapanisMetin} data-reveal style={d(120)}>
              {c.closing.text}
            </p>
            <a href="#bagis" className={s.dugme} data-reveal style={d(220)}>
              {c.closing.cta}
            </a>
          </div>
        </section>

        <section id="paylas" className={s.paylas} aria-label="Bu davetiyeyi paylaşın">
          <div className={`${ui.container} ${s.paylasIc}`}>
            <p>{c.closing.shareLead}</p>
            <ShareActions text={c.closing.shareText} title={c.meta.ogTitle} siz />
          </div>
        </section>
      </main>

      <Footer />

      <StickyDonate
        href="#bagis"
        label={c.hero.cta}
        price={price}
        note={c.hero.priceNote}
        hideWhen={["giris-tutar", "bagis", "kapanis", "paylas", "iletisim"]}
        btnClassName={s.cubukDugme}
        className={s.cubuk}
      />
      <RevealObserver />
    </div>
  );
}
