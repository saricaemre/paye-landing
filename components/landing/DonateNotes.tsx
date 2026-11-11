import { PAYE, whatsappHref } from "@/lib/config";
import { CopyButton } from "./CopyButton";
import { Icon, type IconName } from "./Icon";
import { Rich, plain } from "./Rich";
import s from "./DonateNotes.module.css";

type Props = {
  /** Bu tutarın neyi karşıladığı (Rich metin; [[...]] yer tutucu olabilir) */
  coverage?: string;
  /** Bağıştan sonra ne olacağı: ne, ne zaman, hangi kanaldan (Rich metin) */
  after: string;
  /** "Sonra ne olur" satırının ikonu; varsayılan kamera (fotoğraf gelen kampanyalar için) */
  afterIcon?: IconName;
  /** Havale açıklamasına yazılacak kod, ör. "Sünnet" */
  bankCode: string;
  /** Ödeme güvencesi satırı; düğme bağış sayfasına gitmiyorsa (ör. WhatsApp'tan kayıt) false */
  secure?: boolean;
  /** Havale satırının altına eklenecek kampanyaya özel satırlar (ör. sünnet kardeşi) */
  children?: React.ReactNode;
  /** "Siz" diliyle yazılan sayfalar için (Gözün Aydın); varsayılan "sen" */
  siz?: boolean;
  /** Güvence satırındaki "(256-bit SSL, 3D Secure)" ayrıntısı; Gözün Aydın'da yok */
  sslDetail?: boolean;
  /** WhatsApp satırının yazısı; verilmezse "Aklına bir şey takılırsa WhatsApp'tan yaz" */
  waLabel?: string;
  /** En alttaki kurum künyesi; Gözün Aydın'da yok */
  kunye?: boolean;
};

/**
 * Bağış kartının butondan sonraki kısmı: kapsam, "sonra ne olur", ödeme
 * güvencesi, kapalı başlayan havale satırı, WhatsApp ve kısa künye.
 * İki kampanyanın kartında da aynı sırayla durur.
 */
export function DonateNotes({ coverage, after, afterIcon = "camera", bankCode, secure = true, children, siz = false, sslDetail = true, waLabel, kunye = true }: Props) {
  const iban = plain(PAYE.bank.iban);

  return (
    <div className={s.wrap}>
      <ul className={s.notes}>
        {coverage ? (
          <li>
            <Icon name="circleCheck" size={18} />
            <span>
              <Rich text={coverage} />
            </span>
          </li>
        ) : null}
        <li>
          <Icon name={afterIcon} size={18} />
          <span>
            <Rich text={after} />
          </span>
        </li>
        {secure ? (
          <li>
            <Icon name="lock" size={18} />
            <span>Ödemeyi Paye’nin güvenli bağış sayfasında {siz ? "tamamlarsınız" : "tamamlarsın"}
              {sslDetail ? " (256-bit SSL, 3D Secure)" : ""}.
            </span>
          </li>
        ) : null}
      </ul>

      <div className={s.ways}>
        <details className={s.bank}>
          <summary className={s.row}>
            <Icon name="landmark" size={18} />
            <span className={s.rowText}>Havale ile göndermek istiyorum</span>
            <Icon name="chevronDown" size={18} className={s.chev} />
          </summary>
          <div className={s.bankBody}>
            <dl className={s.account}>
              <div>
                <dt>Alıcı</dt>
                <dd>{PAYE.bank.holder}</dd>
              </div>
              <div>
                <dt>Banka</dt>
                <dd>
                  <Rich text={PAYE.bank.bankName} />
                </dd>
              </div>
              <div>
                <dt>IBAN</dt>
                <dd className={s.iban}>
                  <Rich text={PAYE.bank.iban} />
                </dd>
              </div>
            </dl>
            <CopyButton
              className={s.copy}
              text={iban}
              label={siz ? "IBAN’ı kopyalayın" : "IBAN’ı kopyala"}
              done="IBAN kopyalandı"
            />
            <p className={s.bankNote}>
              Açıklamaya “{bankCode}” {siz ? "yazın" : "yaz"}. Diğer hesaplarımız:{" "}
              <a href={PAYE.links.hesaplar}>Hesap numaralarımız</a>
            </p>
          </div>
        </details>

        {children}

        <a className={`${s.row} ${waLabel ? s.rowShort : ""}`} href={whatsappHref()}>
          <Icon name="whatsapp" size={18} className={s.wa} />
          <span className={s.rowText}>
            {waLabel ?? (siz ? "Aklınıza bir şey takılırsa WhatsApp’tan yazın" : "Aklına bir şey takılırsa WhatsApp’tan yaz")}
          </span>
          <span className={s.rowAside}>{PAYE.phone}</span>
        </a>
      </div>

      {kunye ? (
        <p className={s.kunye}>
          {PAYE.name} · {PAYE.city} ·{" "}
          <span className={s.nowrap}>Kütük no {PAYE.kutukNo}</span> ·{" "}
          <a href={PAYE.links.hakkimizda}>Hakkımızda</a>
        </p>
      ) : null}
    </div>
  );
}

/** Kartın altına eklenen, bağlantı olarak çalışan kampanya satırı (ör. sünnet kardeşi) */
export function DonateNoteLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a className={`${s.row} ${s.rowTall}`} href={href}>
      <span className={s.rowIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={s.rowText}>{children}</span>
    </a>
  );
}
