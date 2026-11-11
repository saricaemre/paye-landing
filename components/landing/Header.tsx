"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import s from "./Header.module.css";
import ui from "./ui.module.css";

type Props = {
  homeHref: string;
  donateHref: string;
  links?: { href: string; label: string }[];
  /**
   * Koyu bölümlerin id'leri. Header bu bölümlerden birinin üstündeyken
   * beyaz yerine koyu cam görünümüne geçer (ör. kaydırmalı hero sahnesi).
   */
  darkSections?: string[];
  /**
   * Sayfa açık renkli bir girişle başlıyorsa (ör. puslu gökyüzü): en üstte,
   * henüz kaydırılmamışken logo ve bağlantılar koyu görünür.
   */
  lightTop?: boolean;
};

export function Header({ homeHref, donateHref, links = [], darkSections = [], lightTop }: Props) {
  const [solid, setSolid] = useState(false);
  const [dark, setDark] = useState(false);
  const darkKey = darkSections.join(",");

  useEffect(() => {
    const ids = darkKey ? darkKey.split(",") : [];
    let raf = 0;

    const update = () => {
      raf = 0;
      setSolid(window.scrollY > 24);
      if (!ids.length) return;
      const probe = 36; // header'ın orta çizgisi
      const over = ids.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setDark(over);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [darkKey]);

  return (
    <header
      className={s.header}
      data-solid={solid ? "" : undefined}
      data-dark={dark ? "" : undefined}
      data-light={lightTop ? "" : undefined}
    >
      <div className={`${ui.container} ${s.inner}`}>
        <a href={homeHref} className={s.logo} aria-label="Paye İnsani Yardım Derneği anasayfa">
          <Image
            src="/brand/paye-logo-black.png"
            alt="Paye İnsani Yardım Derneği"
            width={600}
            height={202}
            priority
          />
        </a>

        {links.length ? (
          <nav className={s.nav} aria-label="Sayfa bölümleri">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}

        <a
          href={donateHref}
          className={`${ui.btn} ${ui.btnSm} ${solid && !dark ? ui.btnPrimary : ui.btnLight} ${s.cta}`}
        >
          <Icon name="heartHandshake" size={18} />
          Bağış Yap
        </a>
      </div>
    </header>
  );
}
