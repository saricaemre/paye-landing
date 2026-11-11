import { Fragment } from "react";

/**
 * İçerik metinlerinde iki küçük işaret:
 *  [[...]]  → değiştirilecek yer tutucu (taslak modunda sarı görünür)
 *  _..._    → italik vurgu
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\]|_[^_]+_)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <span key={i} data-ph="">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Yer tutucu işaretlerini temizler (meta etiketleri ve aria metinleri için). */
export function plain(text: string) {
  return text.replace(/\[\[|\]\]/g, "").replace(/_([^_]+)_/g, "$1");
}
