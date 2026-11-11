import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import { DonateNoteLink, DonateNotes } from "@/components/landing/DonateNotes";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Icon } from "@/components/landing/Icon";
import { ImageSlot } from "@/components/landing/ImageSlot";
import { PayeMark } from "@/components/landing/PayeMark";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { Rich } from "@/components/landing/Rich";
import { StickyDonate } from "@/components/landing/StickyDonate";
import ui from "@/components/landing/ui.module.css";
import { PAYE, SU_KUYUSU, whatsappHref } from "@/lib/config";
import { formatTRY } from "@/lib/format";
import { DonateWidget } from "./_components/DonateWidget";
import { DropBridge } from "./_components/DropBridge";
import { Logotype } from "./_components/Logotype";
import { TwoPaths } from "./_components/TwoPaths";
import * as c from "./content";
import s from "./page.module.css";

const hisse = formatTRY(SU_KUYUSU.pricePerShare);
const pompa = formatTRY(SU_KUYUSU.handPump);
const sadirvan = formatTRY(SU_KUYUSU.fountain);
const withPrice = (text: string) => text.replaceAll("{hisse}", hisse);

export const metadata: Metadata = {
  title: c.meta.title,
  description: withPrice(c.meta.description),
  alternates: { canonical: "/hayatin-ta-kendisi" },
  openGraph: {
    title: "Hayatın ta kendisi",
    description: withPrice(c.meta.description),
    url: "/hayatin-ta-kendisi",
    siteName: PAYE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayatın ta kendisi",
    description: withPrice(c.meta.description),
  },
};

/** Kampanyanın düğmesi: Paye'nin petrol hapı, içinde amber bir damla */
function DropButton({ className }: { className?: string }) {
  return (
    <a href="#bagis" className={`${s.cta} ${className ?? ""}`}>
      <span className={s.ctaDrop} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
          <path d="M12 2.8c-2.5 3.6-6.6 8.3-6.6 12.2a6.6 6.6 0 0 0 13.2 0c0-3.9-4.1-8.6-6.6-12.2Z" fill="currentColor" />
          <path
            d="M8.9 15.3a3.2 3.2 0 0 0 2.7 3.1"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.75"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>{c.cta}</span>
    </a>
  );
}

/** Girişin fotoğrafı: telefonda kare kırpım, büyük ekranda yanları genişletilmiş geniş kare */
function HeroPhoto() {
  const common = { alt: c.hero.image.alt, fill: true as const, priority: true };
  // tabletlerde fotoğraf yüksekliğe göre büyür, yanları kırpılır: görüntü ekrandan geniş
  const wideSizes = "(max-width: 1199px) 220vw, 100vw";
  const {
    props: { srcSet: wideSet, ...img },
  } = getImageProps({ ...common, src: c.hero.image.src, sizes: wideSizes });
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: c.hero.image.mobile, sizes: "100vw" });

  return (
    <div className={s.heroPhoto}>
      <picture>
        <source media="(max-width: 639px)" srcSet={mobileSet} sizes="100vw" />
        <source media="(min-width: 640px)" srcSet={wideSet} sizes={wideSizes} />
        <img {...img} alt={c.hero.image.alt} className={s.heroImg} />
      </picture>
    </div>
  );
}

export default function HayatinTaKendisiPage() {
  const plate = (text: string) => (
    <DonateNoteLink href={whatsappHref(c.donate.card.plateMessage)} icon={<Icon name="whatsapp" />}>
      <strong>{c.donate.card.plateLead}</strong> <Rich text={text} />
    </DonateNoteLink>
  );

  return (
    <div className={`${ui.landing} ${s.page}`}>
      <Header
        homeHref={PAYE.site}
        donateHref="#bagis"
        links={c.nav}
        darkSections={["hayat", "bagis-bolumu", "iletisim"]}
        lightTop
      />

      <main>
        {/* Giriş: puslu gökyüzünde logotip, altında iki cümle ve düğme; en altta duvarın üstündeki yolcular */}
        <section id="hero" className={s.hero} aria-labelledby="hero-title">
          <div className={`${ui.container} ${s.heroInner}`}>
            <h1 id="hero-title" className={s.heroTitle}>
              <span className={ui.srOnly}>{c.hero.title}</span>
              <Logotype fill className={s.heroLogo} />
            </h1>
            <p className={s.heroLead}>{c.hero.text}</p>
            <div className={s.heroActions}>
              <DropButton />
              {/* Yapışkan çubuk bu satır ekrandayken gizlenir */}
              <p id="giris-tutar" className={s.heroPrice}>
                <strong>{hisse}</strong> {c.hero.priceNote}
                <span className={s.heroPromise}>
                  <span className={s.promiseDot} aria-hidden="true">
                    {" · "}
                  </span>
                  {c.hero.promise}
                </span>
              </p>
            </div>
          </div>
          <HeroPhoto />
          <p className={s.heroNote}>{c.hero.source}</p>
        </section>

        {/* Ayna: okuyanın sabahı. Son cümlenin altından bir damla Rehema'nın sabahına düşer. */}
        <section id="hikaye" className={s.story} aria-labelledby="story-title">
          <div className={`${s.column} ${s.mirror}`}>
            <h2 id="story-title" className={s.h2} data-reveal>
              {c.mirror.title}
            </h2>
            <p className={`${s.prose} ${s.mirrorText}`} data-reveal>
              {c.mirror.text}
            </p>
            <p className={s.invite} data-reveal>
              {c.mirror.invite}
            </p>
          </div>

          <div className={s.rehema}>
            <div className={s.column}>
              <DropBridge>
                <h2 className={`${s.h2} ${s.rehemaTitle}`}>{c.rehema.title}</h2>
              </DropBridge>
              <div className={`${s.prose} ${s.rehemaText}`} data-reveal>
                {c.rehema.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className={s.caption} data-reveal>
                {c.rehema.note}
              </p>
            </div>
          </div>
        </section>

        {/* Rehema'nın iki yolu: yerin üstünde uzun bir yürüyüş, altında kısa bir iniş */}
        <TwoPaths
          label={c.paths.label}
          home={c.paths.home}
          walk={c.paths.walk}
          walkValue={c.paths.walkValue}
          depth={c.paths.depth}
          depthValue={c.paths.depthValue}
        />

        {/* Su ne değiştirir: altı hikâye kartı; fotoğrafın altına binen açık kutuda alan, "X artık ..." ve iki cümle */}
        <section id="hayat" className={`${ui.section} ${ui.dark} ${s.life}`} aria-labelledby="life-title">
          <div className={ui.container}>
            <h2 id="life-title" className={`${s.h2} ${s.lifeTitle}`} data-reveal>
              {c.life.title}
            </h2>
            <ul className={s.stories}>
              {c.life.items.map((item, i) => (
                <li
                  key={item.area}
                  className={s.storyCard}
                  data-reveal
                  style={{ "--d": `${(i % 3) * 110}ms` } as React.CSSProperties}
                >
                  <div className={s.storyPhoto}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1240px) 360px, (min-width: 960px) 30vw, (min-width: 640px) 46vw, 82vw"
                      className={s.cover}
                    />
                  </div>
                  <div className={s.storyBody}>
                    <p className={s.storyArea}>{item.area}</p>
                    <h3 className={s.storyTitle}>
                      <Rich text={item.title} />
                    </h3>
                    <p className={s.storyText}>
                      <Rich text={item.text} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={s.storiesNote}>
              {c.life.note}
              {c.showAiNotes ? ` ${c.aiNote}` : null}
            </p>
          </div>
        </section>

        {/* Kuyu nasıl açılıyor */}
        <section id="kuyu" className={`${ui.section} ${s.well}`} aria-labelledby="well-title">
          <div className={`${ui.container} ${s.wellGrid}`}>
            <div className={s.wellIntro}>
              <h2 id="well-title" className={s.h2} data-reveal>
                {c.well.title}
              </h2>
              <p className={s.wellLead} data-reveal>
                {c.well.intro}
              </p>
              <figure className={s.wellFigure} data-reveal>
                <div className={s.wellPhoto}>
                  <ImageSlot
                    src={c.well.image.src}
                    alt={c.well.image.alt}
                    brief={c.well.image.brief}
                    tone={c.well.image.tone}
                    labelAt="tl"
                    sizes="(min-width: 960px) 440px, 100vw"
                  />
                </div>
                <figcaption className={s.caption}>
                  <Rich text={c.well.caption} />
                </figcaption>
              </figure>
            </div>

            <ol className={s.steps}>
              {c.well.steps.map((step, i) => (
                <li key={i} className={s.step} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                  <span className={s.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>
                    <Rich text={step} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Bağış: mobilde sıra başlık, kart, metin; bütün bağış düğmeleri karta iner */}
        <section id="bagis-bolumu" className={`${ui.section} ${ui.dark} ${s.donate}`} aria-labelledby="donate-title">
          <PayeMark className={s.donateMark} />
          <div className={`${ui.container} ${s.donateGrid}`}>
            <h2 id="donate-title" className={`${s.h2} ${s.donateHead}`} data-reveal>
              {c.donate.title}
            </h2>
            <div id="bagis" className={s.donateCard} data-reveal="fade" style={{ "--d": "120ms" } as React.CSSProperties}>
              <DonateWidget
                monthlyMessage={c.donate.card.monthlyMessage}
                plate={{ hisse: plate(c.donate.card.plateShare), kuyu: plate(c.donate.card.plateWell) }}
                notes={{
                  hisse: (
                    <DonateNotes
                      coverage={c.donate.card.shareCoverage}
                      after={c.donate.card.shareAfter}
                      bankCode={c.donate.card.bankCode}
                      sslDetail={false}
                      waLabel="WhatsApp’tan sorun"
                      siz
                    />
                  ),
                  kuyu: (
                    <DonateNotes
                      coverage={c.donate.card.wellCoverage}
                      after={c.donate.card.wellAfter}
                      bankCode={c.donate.card.bankCode}
                      sslDetail={false}
                      waLabel="WhatsApp’tan sorun"
                      siz
                    />
                  ),
                  aylik: (
                    <DonateNotes
                      after={c.donate.card.monthlyAfter}
                      afterIcon="whatsapp"
                      bankCode={c.donate.card.bankCode}
                      sslDetail={false}
                      waLabel="WhatsApp’tan sorun"
                      secure={SU_KUYUSU.monthlyVia === "site"}
                      siz
                    />
                  ),
                }}
              />
              <p className={s.cardNote}>{c.donate.cardNote}</p>
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
              <div className={s.monthly} data-reveal>
                <h3 className={s.monthlyTitle}>{c.donate.monthly.title}</h3>
                <p>
                  <Rich text={c.donate.monthly.text} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sorular */}
        <section id="sss" className={`${ui.section} ${s.faq}`} aria-labelledby="faq-title">
          <div className={`${ui.container} ${s.faqGrid}`}>
            <div className={s.faqSide}>
              <h2 id="faq-title" className={s.h2} data-reveal>
                {c.faq.title}
              </h2>
              <p className={s.faqSideText}>{c.faq.side}</p>
              <a href={PAYE.whatsapp} className={`${ui.btn} ${ui.btnLight} ${ui.btnSm} ${s.faqWa}`}>
                <Icon name="whatsapp" size={18} />
                WhatsApp’tan yazın
              </a>
            </div>
            <Faq items={c.faq.items({ hisse, pompa, sadirvan })} />
          </div>
        </section>
      </main>

      <Footer />

      <StickyDonate
        href="#bagis"
        label={c.cta}
        price={hisse}
        note={c.hero.priceNote}
        hideWhen={["giris-tutar", "bagis", "iletisim"]}
        className={s.stickyBar}
      />
      <RevealObserver />
    </div>
  );
}
