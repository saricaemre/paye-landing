"use client";

import { useEffect, useState } from "react";
import type { Utm } from "@/lib/config";

/**
 * Sayfaya reklamla gelen ziyaretçinin utm_* parametreleri. Bağış adresine
 * aynen eklenir; böylece hangi reklamın hangi bağışı getirdiği ölçülebilir
 * (sitenin bunları bağış kaydına geçirmesi yazılım ekibinin işi).
 */
export function useUtm(): Utm | undefined {
  const [utm, setUtm] = useState<Utm>();

  useEffect(() => {
    const found: Utm = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key.startsWith("utm_") && value) found[key] = value;
    });
    if (Object.keys(found).length) setUtm(found);
  }, []);

  return utm;
}
