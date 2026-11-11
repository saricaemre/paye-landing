"use client";

import { CopyButton } from "@/components/landing/CopyButton";
import { Icon } from "@/components/landing/Icon";
import { shareUrl } from "@/components/landing/ShareActions";
import s from "./GiftMessage.module.css";

type Props = { label: string; text: string };

/**
 * Göz aydınlığı geleneğine hazır bir satır: bağışı yapan, sevinçli haberi
 * alan yakınına bu mesajı gönderebilir. Araç değil, tek satır metin ve iki
 * düğme (Biri Kaldı'daki davetiye satırının karşılığı).
 */
export function GiftMessage({ label, text }: Props) {
  const onWhatsApp = () => {
    const url = shareUrl("whatsapp", "goz-aydinligi");
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
  };

  return (
    <figure className={s.box}>
      <figcaption className={s.label}>{label}</figcaption>
      <blockquote className={s.quote}>“{text}”</blockquote>
      <div className={s.actions}>
        <button type="button" className={s.btn} onClick={onWhatsApp}>
          <Icon name="whatsapp" size={18} />
          WhatsApp’ta gönder
        </button>
        <CopyButton className={s.btn} text={text} label="Mesajı kopyala" done="Mesaj kopyalandı" />
      </div>
    </figure>
  );
}
