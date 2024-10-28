import css from "./standart.module.css";

import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

import Link from "next/link";
import logoJavorivNewWhite from "../../img/jkjanivbud.png";
import FormInPidpus from "./formInPidpus";
const Footer = ({ t, lng }) => {
  return (
    <footer className={css.wrapFooter}>
      <div className={css.firtBlockInFooter}>
        {/* <div className={css.wrapLogoW}>
          <Image src={logoInsortex} alt="Insortex Logo" className={css.logo} />
          <strong className={css.textStrongLogoFooter}>INSORTEX</strong>
        </div> */}
        <Link href={"/"}>
          <Image
            src={logoJavorivNewWhite}
            alt="Insortex Logo"
            className={css.logoFooter}
          />
        </Link>
        <div className={css.wrapNumberInFooter}>
          <FaPhoneAlt className={css.aPhoneAlt} />
          <a className={css.nubberInFooterP}>+38(096) 14 - 02 - 597</a>
        </div>
        <div className={css.wrapNumberInFooter}>
          <IoMdMail className={css.aPhoneAlt} />
          <a className={css.nubberInFooterP}>yanivbud@gmail.com</a>
        </div>
        <div className={css.wrapNumberInFooter}>
          <IoLocation className={css.aPhoneAlt} />
          <p className={css.nubberInFooterP}>
            м.Новояворівськ, вул.С,Бандери 11
          </p>
        </div>
        <div className={css.wrapIconsInHeader}>
          <a
            href="https://www.instagram.com/insortex.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={css.aInstagramNem} />
          </a>
          <a
            href="https://www.facebook.com/insortexcom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className={css.aInstagramNem} />
          </a>
          <a
            href="https://www.youtube.com/@Insortexagro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={css.aInstagramNem} />
          </a>
        </div>
      </div>
      <div className={css.firtBlockInFooter}>
        <p className={css.newPinFooter}>Підписатись на новини</p>
        <p className={css.ourGroupAll}>
          Залиште Ваш номер, щоб бути в курсі всіх акційних пропозицій
        </p>
        {/* <p className={css.ourGroupAll}>{t("orEmailSubcr")}</p> */}
        <FormInPidpus />
      </div>
      <nav className={css.wrapSmalNavigation}>
        <p className={css.newPinFooter}>Навігація</p>
        <ul className={css.ulListFooter}>
          <li className={css.liInFooter}>
            <Link href="/">Головна</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/productions">Каталог</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/our-works">Блог</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/news">Контакти</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;
