"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import s from "./ShareActions.module.css";

type Props = {
  /** Paylaşım mesajı; sonuna sayfa adresi eklenir */
  text: string;
  title: string;
  /** "Siz" diliyle yazılan sayfalar için; varsayılan "sen" (DonateNotes'taki gibi) */
  siz?: boolean;
};

/**
 * Paylaşılan sayfa adresi: reklamın utm'si taşınmaz, paylaşımın kendi utm'si
 * eklenir; böylece "bu sayfayı birine gönder" çağrısının getirdiği bağış ölçülür.
 */
export function shareUrl(source: string, medium: string) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  const campaign = url.pathname.split("/").filter(Boolean).pop() ?? "kampanya";
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function ShareActions({ text, title, siz = false }: Props) {
  const [copied, setCopied] = useState(false);

  const onWhatsApp = () => {
    const msg = `${text} ${shareUrl("whatsapp", "paylasim")}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const onShare = async () => {
    const url = shareUrl("paylasim", "baglanti");
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* kullanıcı vazgeçti */
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt(siz ? "Bağlantıyı kopyalayın:" : "Bağlantıyı kopyala:", url);
    }
  };

  return (
    <div className={s.row}>
      <button type="button" className={s.btn} onClick={onWhatsApp}>
        <Icon name="whatsapp" size={18} />
        {siz ? "WhatsApp’ta gönderin" : "WhatsApp’ta gönder"}
      </button>
      <button type="button" className={s.btn} onClick={onShare} aria-live="polite">
        <Icon name={copied ? "check" : "link"} size={18} />
        {copied ? "Bağlantı kopyalandı" : siz ? "Bağlantıyı paylaşın" : "Bağlantıyı paylaş"}
      </button>
    </div>
  );
}
