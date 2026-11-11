import type { Metadata } from "next";
import Image from "next/image";
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
import { KATARAKT, PAYE } from "@/lib/config";
import { formatTRY } from "@/lib/format";
import { DonateWidget } from "./_components/DonateWidget";
import { EyeChart } from "./_components/EyeChart";
import { GiftMessage } from "./_components/GiftMessage";
import { HeroVideo } from "./_components/HeroVideo";
import { StoryCarousel } from "./_components/StoryCarousel";
import { SurgeryGame } from "./_components/SurgeryGame";
import * as c from "./content";
import s from "./page.module.css";

const price = formatTRY(KATARAKT.pricePerPatient);
const fund = formatTRY(KATARAKT.fundMin);
const withPrice = (text: string) => text.replaceAll("{fiyat}", price).replaceAll("{fon}", fund);

/** Bağış kartının alt satırları: siz dili, sade güvence satırı, tek satırlık WhatsApp, künye yok */
const cardNotes = {
  siz: true,
  sslDetail: false,
  kunye: false,
  waLabel: c.donate.card.waLabel,
  bankCode: c.donate.card.bankCode,
};

export const metadata: Metadata = {
  title: c.meta.title,
  description: withPrice(c.meta.description),
  alternates: { canonical: "/gozun-aydin" },
  openGraph: {
    title: "Gözün aydın",
    description: withPrice(c.meta.description),
    url: "/gozun-aydin",
    siteName: PAYE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gözün aydın",
    description: withPrice(c.meta.description),
  },
};

export default function GozunAydinPage() {
  return (
    <div className={`${ui.landing} ${s.page}`}>
      <Header
        homeHref={PAYE.site}
        donateHref="#bagis"
        links={c.nav}
        darkSections={["hero", "bagis-bolumu", "iletisim"]}
      />

      <main>
        {/* Giriş */}
        <section id="hero" className={s.hero} aria-labelledby="hero-title">
          <div className={`${ui.container} ${s.heroGrid}`}>
            <div className={s.heroText}>
              <p className={s.heroLabel}>{c.hero.label}</p>
              <h1 id="hero-title" className={s.heroTitle}>
                {c.hero.title} <em>{c.hero.titleEnd}</em>
              </h1>
              <p className={s.heroLead}>{c.hero.text}</p>
              <div className={s.heroActions}>
                <a href="#bagis" className={`${ui.btn} ${ui.btnPrimary}`}>
                  <Icon name="heartHandshake" size={20} />
                  {c.cta}
                </a>
                {/* Yapışkan çubuk bu satır ekrandayken gizlenir: kısa ekranlarda
                    tutar ilk ekranda çubukta görünür */}
                <p id="giris-tutar" className={s.heroPrice}>
                  <strong>{price}</strong> · {c.hero.priceNote}
                  <span className={s.heroPromise}>
                    <span className={s.promiseDot} aria-hidden="true">
                      {" · "}
                    </span>
                    {c.hero.promise}
                  </span>
                </p>
              </div>
            </div>

            <div className={s.heroMedia}>
              <HeroVideo
                src={c.hero.video.src}
                srcSmall={c.hero.video.srcSmall}
                poster={c.hero.video.poster}
                alt={c.hero.video.alt}
                compare={c.hero.compare}
              />
            </div>
          </div>
        </section>

        {/* Hikâye */}
        <section id="hikaye" className={`${ui.section} ${s.story}`} aria-labelledby="story-title">
          {/* İki hikâye tek kartın yerinde, sırayla: bizdeki olağan ameliyat, sonra Halima.
              Masaüstünde görsel solda, yazı sağda; mobilde görsel üstte, yazı altta. */}
          <div className={s.storyWrap} data-reveal>
            <StoryCarousel labels={[c.story.label, c.halima.label]}>
              <article className={s.storyCard} style={{ "--shift": "13cqw" } as React.CSSProperties}>
                <Image
                  className={s.cardImg}
                  src={c.story.image.src}
                  alt={c.story.image.alt}
                  width={1200}
                  height={1600}
                  sizes="(min-width: 960px) 660px, 100vw"
                />
                <h2 id="story-title" className={s.h2} data-reveal="focus">
                  {c.story.title}
                </h2>
                <div className={s.prose}>
                  {c.story.paragraphs.map((p, i) => (
                    <p key={i}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </article>

              <article className={s.storyCard} data-flip style={{ "--shift": "6cqw" } as React.CSSProperties}>
                <Image
                  className={s.cardImg}
                  src={c.halima.image.src}
                  alt={c.halima.image.alt}
                  width={1200}
                  height={1600}
                  sizes="(min-width: 960px) 660px, 100vw"
                />
                <h2 className={s.h2} data-reveal="focus">
                  {c.halima.title}
                </h2>
                <div className={s.prose}>
                  {c.halima.paragraphs.map((p, i) => (
                    <p key={i}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
                <a href="#bagis" className={`${ui.textLink} ${s.cardLink}`}>
                  {c.halima.link}
                  <Icon name="arrowRight" size={18} />
                </a>
              </article>
            </StoryCarousel>
          </div>
        </section>

        {/* Ameliyat */}
        <section id="ameliyat" className={`${ui.section} ${s.surgery}`} aria-labelledby="surgery-title">
          <div className={`${ui.container} ${s.surgeryGrid}`}>
            <div className={s.surgeryIntro}>
              <h2 id="surgery-title" className={s.h2} data-reveal="focus">
                {c.surgery.title}
              </h2>
              <p className={s.surgeryLead} data-reveal>
                {c.surgery.intro}
              </p>
              <div className={s.surgeryPhoto} data-reveal>
                <ImageSlot
                  src={c.surgery.image.src}
                  alt={c.surgery.image.alt}
                  brief={c.surgery.image.brief}
                  tone={c.surgery.image.tone}
                  labelAt="tl"
                  sizes="(min-width: 960px) 440px, 100vw"
                />
              </div>
            </div>

            <ol className={s.steps}>
              {c.surgery.steps.map((step, i) => (
                <li key={i} className={s.step} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <span className={s.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Deneyin: sürecin üçüncü adımı ziyaretçinin elinde, iki hareketle */}
        <section id="deneyin" className={`${ui.section} ${s.try}`} aria-labelledby="try-title">
          <div className={ui.container}>
            <SurgeryGame
              headingId="try-title"
              headingClassName={s.h2}
              text={{ ...c.game, resultText: withPrice(c.game.resultText) }}
              cta={
                <a href="#bagis" className={`${ui.btn} ${ui.btnPrimary}`}>
                  <Icon name="heartHandshake" size={20} />
                  {c.cta}
                </a>
              }
            />
          </div>
        </section>

        {/* Bağış: mobilde sıra başlık, kart, metin; bütün bağış düğmeleri karta iner */}
        <section id="bagis-bolumu" className={`${ui.section} ${ui.dark} ${s.donate}`} aria-labelledby="donate-title">
          <PayeMark className={s.donateMark} />
          <div className={`${ui.container} ${s.donateGrid}`}>
            <h2 id="donate-title" className={`${s.h2} ${s.donateHead}`} data-reveal="focus">
              {c.donate.title}
            </h2>
            <div
              id="bagis"
              className={s.donateCard}
              data-reveal="fade"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <DonateWidget
                notes={{
                  ameliyat: (
                    <DonateNotes
                      {...cardNotes}
                      coverage={withPrice(c.donate.card.coverage)}
                      after={c.donate.card.after}
                    />
                  ),
                  fon: (
                    <DonateNotes {...cardNotes} after={c.donate.card.fundAfter} />
                  ),
                }}
              />
            </div>
            <div className={s.donateBody}>
              <p className={`${s.prose} ${s.donateLead}`} data-reveal>
                {c.donate.lead}
              </p>
              <div className={s.stat} data-reveal>
                <p className={s.statValue}>
                  <Rich text={c.donate.statValue} />
                </p>
                <p className={s.statLabel}>{c.donate.statLabel}</p>
              </div>
              <div className={s.prose} data-reveal>
                {c.donate.paragraphs.map((p, i) => (
                  <p key={i}>
                    <Rich text={withPrice(p)} />
                  </p>
                ))}
              </div>
              <GiftMessage label={c.donate.gift.label} text={c.donate.gift.text} />
            </div>
          </div>
        </section>

        {/* Sorular */}
        <section id="sss" className={`${ui.section} ${s.faq}`} aria-labelledby="faq-title">
          <div className={`${ui.container} ${s.faqGrid}`}>
            <div className={s.faqSide}>
              <h2 id="faq-title" className={s.h2} data-reveal="focus">
                {c.faq.title}
              </h2>
              <p className={s.faqSideText}>{c.faq.side}</p>
              <a href={PAYE.whatsapp} className={`${ui.btn} ${ui.btnLight} ${ui.btnSm} ${s.faqWa}`}>
                <Icon name="whatsapp" size={18} />
                WhatsApp’tan yazın
              </a>
            </div>
            <Faq items={c.faq.items(price)} />
          </div>
        </section>

        {/* Kapanış */}
        <section id="kapanis" className={`${ui.section} ${s.closing}`} aria-labelledby="closing-title">
          <div className={`${ui.container} ${s.closingGrid}`}>
            <div className={s.closingChart}>
              <EyeChart rows={c.closing.chart} />
            </div>
            <div className={s.closingBody}>
              <h2 id="closing-title" className={ui.srOnly}>
                {c.closing.title}
              </h2>
              <p className={s.closingText} data-reveal>
                {c.closing.text}
              </p>
              <a
                href="#bagis"
                className={`${ui.btn} ${ui.btnPrimary}`}
                data-reveal
                style={{ "--d": "120ms" } as React.CSSProperties}
              >
                <Icon name="heartHandshake" size={20} />
                {c.cta}
              </a>
              <div className={s.share} data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
                <p>{c.closing.shareLead}</p>
                <ShareActions text={withPrice(c.closing.shareText)} title="Gözün aydın" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <StickyDonate
        href="#bagis"
        label={c.cta}
        price={price}
        note={c.hero.priceNote}
        hideWhen={["giris-tutar", "deneyin", "bagis", "kapanis", "iletisim"]}
      />
      <RevealObserver />
    </div>
  );
}
