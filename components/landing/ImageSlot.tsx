import Image, { getImageProps } from "next/image";
import s from "./ImageSlot.module.css";

export type ImageBrief = {
  /** Görselin ne olduğu, tek satır */
  title: string;
  /** Çekim / seçim notu (taslak modunda görünür) */
  detail?: string;
  /** Oran ve önerilen ölçü */
  ratio: string;
  size?: string;
};

export type Tone = "dusk" | "warm" | "teal" | "sepia" | "sand" | "night";

type Props = {
  /** Gerçek görsel geldiğinde: "/davetlisiniz/anne.jpg" */
  src?: string | null;
  /** İsteğe bağlı dikey kırpım: 767px ve altında bu dosya kullanılır */
  mobileSrc?: string | null;
  alt: string;
  brief: ImageBrief;
  tone?: Tone;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** object-position, ör. "70% 30%" */
  position?: string;
  label?: "full" | "compact" | "none";
  labelAt?: "bl" | "br" | "tl" | "tr";
  /** Tam ekran arka plan görseli: mobilde etiket metni gizlenir, metinle çakışmaz */
  bleed?: boolean;
  /** Yer tutucunun üzerine çizilecek dekor (ör. çeşme kemeri) */
  children?: React.ReactNode;
};

/**
 * Görsel yuvası. `src` verilmediği sürece, nereye hangi görselin geleceğini
 * anlatan sıcak tonlu bir yer tutucu gösterir.
 */
export function ImageSlot({
  src,
  mobileSrc,
  alt,
  brief,
  tone = "warm",
  sizes = "100vw",
  priority,
  className,
  position,
  label = "compact",
  labelAt = "bl",
  bleed,
  children,
}: Props) {
  if (src && mobileSrc) {
    // Sanat yönetimi: mobilde dikey, masaüstünde yatay kırpım
    const common = { alt, sizes, priority, fill: true as const };
    const {
      props: { srcSet: desktopSet, ...imgProps },
    } = getImageProps({ ...common, src });
    const {
      props: { srcSet: mobileSet },
    } = getImageProps({ ...common, src: mobileSrc });
    return (
      <div className={`${s.slot} ${className ?? ""}`}>
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSet} sizes={sizes} />
          <source media="(min-width: 768px)" srcSet={desktopSet} sizes={sizes} />
          <img
            {...imgProps}
            alt={alt}
            className={s.img}
            style={{ ...imgProps.style, ...(position ? { objectPosition: position } : null) }}
          />
        </picture>
      </div>
    );
  }

  if (src) {
    return (
      <div className={`${s.slot} ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={s.img}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`${s.slot} ${s.ph} ${className ?? ""}`}
      data-tone={tone}
      role="img"
      aria-label={alt}
    >
      {children ? <div className={s.deco}>{children}</div> : null}
      {label !== "none" ? (
        <div
          className={s.label}
          data-at={labelAt}
          data-size={label}
          data-bleed={bleed ? "" : undefined}
        >
          <span className={s.chip}>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m3 16 5-5 4 4 3-3 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            Görsel · {brief.ratio}
            {brief.size ? <span className={s.size}> · {brief.size}</span> : null}
          </span>
          <span className={s.title}>{brief.title}</span>
          {brief.detail ? <span className={s.detail}>{brief.detail}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
