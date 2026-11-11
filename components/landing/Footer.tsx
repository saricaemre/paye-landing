import Image from "next/image";
import { PAYE } from "@/lib/config";
import { Icon } from "./Icon";
import { PayeMark } from "./PayeMark";
import s from "./Footer.module.css";
import ui from "./ui.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="iletisim" className={s.footer}>
      <PayeMark className={s.mark} />
      <div className={`${ui.container} ${s.inner}`}>
        <div className={s.top}>
          <div className={s.brand}>
            <a href={PAYE.site} aria-label="Paye İnsani Yardım Derneği anasayfa">
              <Image
                src="/brand/paye-logo-black.png"
                alt="Paye İnsani Yardım Derneği"
                width={600}
                height={202}
                className={s.logo}
              />
            </a>
            <p className={s.motto}>Gaye paylaşmaktır.</p>
          </div>

          <a href={PAYE.phoneHref} className={s.call}>
            <span className={s.callLabel}>Bize ulaşın</span>
            <span className={s.callNumber}>{PAYE.phone}</span>
          </a>
        </div>

        <div className={s.cols}>
          <div>
            <h3 className={s.colTitle}>Kurumsal</h3>
            <ul className={s.links}>
              <li><a href={PAYE.links.hakkimizda}>Hakkımızda</a></li>
              <li><a href={PAYE.links.hesaplar}>Hesap numaralarımız (IBAN)</a></li>
              <li><a href={PAYE.links.sss}>Sıkça sorulan sorular</a></li>
            </ul>
          </div>
          <div>
            <h3 className={s.colTitle}>Yasal metinler</h3>
            <ul className={s.links}>
              <li><a href={PAYE.links.kvkk}>KVKK aydınlatma metni</a></li>
              <li><a href={PAYE.links.gizlilik}>Gizlilik ve güvenlik politikası</a></li>
              <li><a href={PAYE.links.sozlesme}>Mesafeli bağış sözleşmesi</a></li>
              <li><a href={PAYE.links.iade}>İptal ve iade koşulları</a></li>
            </ul>
          </div>
          <div>
            <h3 className={s.colTitle}>İletişim</h3>
            <ul className={s.links}>
              <li>
                <a href={PAYE.whatsapp} className={s.iconLink}>
                  <Icon name="whatsapp" size={16} /> WhatsApp hattı
                </a>
              </li>
              <li>
                <a href={`mailto:${PAYE.email}`} className={s.iconLink}>
                  <Icon name="mail" size={16} /> {PAYE.email}
                </a>
              </li>
              <li className={s.address}>{PAYE.address}</li>
            </ul>
            <div className={s.social}>
              <a href={PAYE.links.instagram} aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href={PAYE.links.youtube} aria-label="YouTube"><Icon name="youtube" size={18} /></a>
              <a href={PAYE.links.x} aria-label="X"><Icon name="x" size={16} /></a>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <p>
            Dernek kütük no: {PAYE.kutukNo} · Vergi no: {PAYE.vergiNo}
          </p>
          <p className={s.secure}>
            <span><Icon name="lock" size={14} /> 256-bit SSL</span>
            <span><Icon name="shieldCheck" size={14} /> 3D Secure</span>
          </p>
          <p>© {year} Paye İnsani Yardım Derneği</p>
        </div>
      </div>
    </footer>
  );
}
