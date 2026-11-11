import s from "./Cizimler.module.css";

/*
 * Davetin üç satırının çizimleri: sayfa sahibinin revizyon talimatıyla ilettiği
 * üç SVG (10 Kasım 2026; asılları revizyonlar/2026-11-11-davetlisiniz/kaynak/).
 * viewBox aynen kaldı, sabit width/height çıktı: çizim kutusunu doldurur.
 * Çizgi rengi sayfadan gelir (currentColor, Cizimler.module.css); dolgu renkleri
 * dosyalardaki gibi. Üçü aynı viewBox ve aynı çizgi kalınlığında, süs amaçlı.
 */

function Cizim({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className={s.cizim}
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** 1-sunnet-vesile.svg */
export function SunnetVesile() {
  return (
    <Cizim>
      {/* Tüy (sünnet şapkası püskülü) */}
      <path d="M134 86 C129 60 139 41 157 28 C161 48 153 70 138 84 Z" fill="#FBF6EE" />
      <path d="M136 84 C140 62 146 46 157 28" />
      <path d="M140 66 L147 62 M138 74 L145 71 M143 55 L150 50" />
      {/* Şapka gövdesi */}
      <path d="M86 82 L80 148 Q120 160 160 148 L154 82 Z" fill="#D3DEE4" />
      {/* Alt bant */}
      <path d="M81.5 132 Q120 143 158.5 132 L160 148 Q120 160 80 148 Z" fill="#9BBBA0" />
      {/* Üst kapak */}
      <ellipse cx="120" cy="82" rx="34" ry="9" fill="#EEF3F5" />
      {/* Tüy tokası */}
      <ellipse cx="136" cy="84" rx="5" ry="3.2" fill="#E35A35" />
      {/* Yıldız süs */}
      <path
        d="M120 97 L122.65 104.36 L130.46 104.6 L124.28 109.39 L126.47 116.9 L120 112.5 L113.53 116.9 L115.72 109.39 L109.54 104.6 L117.35 104.36 Z"
        fill="#F5C842"
      />
      {/* Bant üzerindeki boncuklar */}
      <circle cx="100" cy="142" r="2.4" fill="#F5C842" />
      <circle cx="120" cy="145" r="2.4" fill="#F5C842" />
      <circle cx="140" cy="142" r="2.4" fill="#F5C842" />
      {/* Kalp */}
      <path
        d="M68 76 C60 70 56 65 59 60 C61 56 66 56 68 60 C70 56 75 56 77 60 C80 65 76 70 68 76 Z"
        fill="#E35A35"
      />
      {/* Parıltılar */}
      <path d="M180 74 L180 86 M174 80 L186 80" />
      <path d="M58 116 L58 124 M54 120 L62 120" />
      <circle cx="172" cy="100" r="1" fill="currentColor" stroke="none" />
      <circle cx="185" cy="108" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="66" cy="96" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="48" cy="104" r="1" fill="currentColor" stroke="none" />
      <circle cx="168" cy="48" r="1" fill="currentColor" stroke="none" />
    </Cizim>
  );
}

/** 2-merasim.svg */
export function Merasim() {
  return (
    <Cizim>
      {/* Bayrak süsü */}
      <path d="M36 30 Q120 58 204 30" />
      <path d="M49.2 35.9 L63.2 35.9 L56.2 52 Z" fill="#F5C842" />
      <path d="M74.4 41 L88.4 41 L81.4 57 Z" fill="#9BBBA0" />
      <path d="M99.6 43.6 L113.6 43.6 L106.6 59.6 Z" fill="#E35A35" />
      <path d="M126.4 43.6 L140.4 43.6 L133.4 59.6 Z" fill="#D3DEE4" />
      <path d="M151.6 41 L165.6 41 L158.6 57 Z" fill="#E3B394" />
      <path d="M176.8 35.9 L190.8 35.9 L183.8 52 Z" fill="#F5C842" />
      {/* Davul gövdesi */}
      <path d="M77 112 L77 162 A38 11 0 0 0 153 162 L153 112 Z" fill="#E3B394" />
      {/* İp örgüsü */}
      <path d="M80 126.3 L92 160.8 L104 132.5 L116 163 L128 132.3 L140 160.3 L150 126.3" />
      {/* Çemberler */}
      <path d="M77 112 A38 11 0 0 0 153 112 L153 120 A38 11 0 0 1 77 120 Z" fill="#E35A35" />
      <path d="M77 154 A38 11 0 0 0 153 154 L153 162 A38 11 0 0 1 77 162 Z" fill="#E35A35" />
      {/* Deri */}
      <ellipse cx="115" cy="112" rx="38" ry="11" fill="#FBF6EE" />
      {/* Tokmak */}
      <path d="M125.4 107.7 L163.4 75.7 L160.6 72.3 L122.6 104.3 Z" fill="#9BBBA0" />
      <circle cx="121" cy="107" r="6.5" fill="#F5C842" />
      {/* Konfeti ve parıltılar */}
      <path d="M52 92 L52 104 M46 98 L58 98" />
      <path d="M186 100 L186 108 M182 104 L190 104" />
      <rect x="58" y="128" width="6" height="3.5" rx="1" fill="#F5C842" transform="rotate(-25 61 130)" />
      <rect x="170" y="128" width="6" height="3.5" rx="1" fill="#E35A35" transform="rotate(30 173 130)" />
      <rect x="176" y="80" width="6" height="3.5" rx="1" fill="#9BBBA0" transform="rotate(-40 179 82)" />
      <path d="M60 70 q4 -4 8 0 t8 0" />
      <circle cx="72" cy="86" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="120" r="1" fill="currentColor" stroke="none" />
      <circle cx="196" cy="90" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="164" cy="146" r="1" fill="currentColor" stroke="none" />
      <circle cx="68" cy="152" r="1" fill="currentColor" stroke="none" />
    </Cizim>
  );
}

/** 3-hatira-fotografi.svg */
export function HatiraFotografi() {
  return (
    <Cizim>
      {/* Zarf arka yüz ve açık kapak */}
      <path d="M64 104 L120 74 L176 104 Z" fill="#EFD3BF" />
      <rect x="64" y="104" width="112" height="66" rx="3" fill="#E3B394" />
      {/* Polaroid */}
      <g transform="rotate(-6 120 92)">
        <rect x="88" y="50" width="64" height="76" rx="2" fill="#FFFFFF" />
        <rect x="94" y="56" width="52" height="50" fill="#D3DEE4" />
        <circle cx="134" cy="68" r="6" fill="#F5C842" />
        <path d="M94 96 Q106 84 118 92 Q132 82 146 93 L146 106 L94 106 Z" fill="#9BBBA0" />
        {/* Sevinçli çocuk */}
        <circle cx="112" cy="78" r="5" fill="#E3B394" />
        <path d="M106 98 L108 86 L116 86 L118 98 Z" fill="#E35A35" />
        <path d="M108 87 L102 80 M116 87 L122 80" />
      </g>
      {/* Zarf ön cebi */}
      <path
        d="M64 108 L120 140 L176 108 L176 167 A3 3 0 0 1 173 170 L67 170 A3 3 0 0 1 64 167 Z"
        fill="#F0C9AE"
      />
      <path d="M64 168 L106 138 M176 168 L134 138" />
      {/* Kalp */}
      <path
        d="M174 70 C166 64 162 59 165 54 C167 50 172 50 174 54 C176 50 181 50 183 54 C186 59 182 64 174 70 Z"
        fill="#E35A35"
      />
      {/* Gönderme çizgileri */}
      <path d="M36 128 L52 128 M28 138 L52 138 M40 148 L52 148" />
      {/* Parıltılar */}
      <path d="M70 64 L70 76 M64 70 L76 70" />
      <circle cx="192" cy="88" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="186" cy="100" r="1" fill="currentColor" stroke="none" />
      <circle cx="84" cy="52" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="58" cy="88" r="1" fill="currentColor" stroke="none" />
    </Cizim>
  );
}

export const CIZIMLER = { sunnet: SunnetVesile, merasim: Merasim, hatira: HatiraFotografi } as const;
