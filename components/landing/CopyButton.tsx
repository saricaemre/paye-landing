"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Props = {
  /** Panoya kopyalanacak düz metin */
  text: string;
  label: string;
  done?: string;
  className?: string;
};

/** Metni panoya kopyalar; kısa bir süre "Kopyalandı" der. */
export function CopyButton({ text, label, done = "Kopyalandı", className }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Kopyala:", text);
    }
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      <Icon name={copied ? "check" : "copy"} size={16} />
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
