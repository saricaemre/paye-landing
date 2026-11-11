import s from "./Bayraklar.module.css";

/*
 * Sünnet düğünlerinin bayrak süsü (örnekteki gibi): iki ucundan asılı, ortası
 * sarkan bir ip ve üstünde üçgen bayraklar. Renkler örneğin paletinden, petrol
 * ve amber Paye'nin kendisinden. Açılışta ip çizilir, bayraklar sırayla düşer;
 * hareket azaltma tercihinde asılı gelir.
 */

const RENKLER = [
  { dolgu: "#1e6e6a", kat: "#155553" }, // Paye petrolü
  { dolgu: "#c4e2cb", kat: "#a7cfb2" }, // nane
  { dolgu: "#e9a23b", kat: "#d48a26" }, // Paye amberi
  { dolgu: "#f2835b", kat: "#dd6941" }, // mercan
  { dolgu: "#f2da9a", kat: "#e3c477" }, // kum
];

type Olcu = {
  /** viewBox genişliği ve yüksekliği */
  w: number;
  h: number;
  /** ipin iki ucu ve sarkma noktası (ikinci derece Bézier) */
  ipY: number;
  sarkma: number;
  adet: number;
  /** bayrağın eni ve boyu */
  bw: number;
  bh: number;
};

const OLCULER: Record<"genis" | "dar", Olcu> = {
  /* Sarkma, bayraklar davetiyenin çerçeve çizgisine değmeyecek kadar (eleştirmen, 8 Kasım 2026) */
  genis: { w: 1440, h: 170, ipY: 14, sarkma: 116, adet: 19, bw: 52, bh: 64 },
  dar: { w: 600, h: 132, ipY: 10, sarkma: 96, adet: 9, bw: 46, bh: 56 },
};

function bayraklar(o: Olcu) {
  const p0 = { x: -12, y: o.ipY };
  const p1 = { x: o.w / 2, y: o.sarkma };
  const p2 = { x: o.w + 12, y: o.ipY };
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
      a:
        (Math.atan2(2 * u * (p1.y - p0.y) + 2 * t * (p2.y - p1.y), 2 * u * (p1.x - p0.x) + 2 * t * (p2.x - p1.x)) *
          180) /
        Math.PI,
    };
  };
  const ip = `M${p0.x} ${p0.y}Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
  const liste = Array.from({ length: o.adet }, (_, i) => {
    const t = 0.03 + (0.94 * (i + 0.5)) / o.adet;
    const { x, y, a } = at(t);
    // Kumaş gibi dursun diye uç her bayrakta biraz kayık
    const kay = ((i * 37) % 7) - 3;
    const h = o.bh - ((i * 13) % 5);
    const yarim = o.bw / 2;
    const d = `M${-yarim} 0L${yarim} 0L${kay + 1.6} ${h - 1.5}Q${kay} ${h + 1} ${kay - 1.6} ${h - 1.5}Z`;
    const kat = `M${-yarim} 0L${yarim} 0L${yarim - 1.2} 5.5L${-yarim + 1.2} 5.5Z`;
    return { x, y, a, d, kat, renk: RENKLER[i % RENKLER.length], i };
  });
  return { ip, liste };
}

type Props = {
  className?: string;
  /** Sayfa açılırken asılsın (giriş) */
  ac?: boolean;
  /** Ekrana girince asılsın (kapanış; RevealObserver'a bağlı) */
  gorununce?: boolean;
};

export function Bayraklar({ className, ac, gorununce }: Props) {
  return (
    <div
      className={`${s.bayraklar} ${className ?? ""}`}
      data-ac={ac ? "" : undefined}
      data-reveal={gorununce ? "self" : undefined}
      aria-hidden="true"
    >
      {(Object.keys(OLCULER) as (keyof typeof OLCULER)[]).map((k) => {
        const o = OLCULER[k];
        const { ip, liste } = bayraklar(o);
        return (
          <svg
            key={k}
            className={s.svg}
            data-olcu={k}
            viewBox={`0 0 ${o.w} ${o.h}`}
            preserveAspectRatio="xMidYMin slice"
            focusable="false"
          >
            <path className={s.ip} d={ip} pathLength={1} />
            {liste.map((b) => (
              <g key={b.i} transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.a.toFixed(2)})`}>
                <g className={s.bayrak} style={{ "--i": b.i } as React.CSSProperties}>
                  <path d={b.d} fill={b.renk.dolgu} />
                  <path d={b.kat} fill={b.renk.kat} />
                </g>
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}
