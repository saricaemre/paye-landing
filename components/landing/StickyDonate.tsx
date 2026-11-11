"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import s from "./StickyDonate.module.css";
import ui from "./ui.module.css";

type Props = {
  href: string;
  label: string;
  /** Kalın yazılan tutar, ör. "₺2.000" */
  price: string;
  /** Tutarın altındaki kısa açıklama */
  note: string;
  /** Bu id'lerden biri ekrandayken çubuk gizlenir */
  hideWhen: string[];
  /** Kampanyanın kendi düğme rengi için ek sınıf */
  btnClassName?: string;
  /** Çubuğun kendisi için ek sınıf (ör. masaüstünde gizlemek) */
  className?: string;
};

/**
 * Hero geçildikten sonra beliren bağış çubuğu. Bağış kartı, kapanış, footer
 * ya da sayfadaki başka bir bağış düğmesi ekrandayken kaybolur.
 */
export function StickyDonate({ href, label, price, note, hideWhen, btnClassName, className }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = hideWhen
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target, e.isIntersecting);
        setShow(![...visible.values()].some(Boolean));
      },
      { threshold: 0 },
    );
    targets.forEach((t) => {
      visible.set(t, true);
      io.observe(t);
    });
    return () => io.disconnect();
  }, [hideWhen]);

  return (
    <div
      className={`${s.bar} ${className ?? ""}`}
      data-show={show ? "" : undefined}
      aria-hidden={!show}
    >
      <div className={s.inner}>
        <p className={s.note}>
          <strong>{price}</strong>
          <span>{note}</span>
        </p>
        <a
          href={href}
          className={`${ui.btn} ${ui.btnPrimary} ${s.btn} ${btnClassName ?? ""}`}
          tabIndex={show ? 0 : -1}
        >
          <Icon name="heartHandshake" size={19} />
          {label}
        </a>
      </div>
    </div>
  );
}
