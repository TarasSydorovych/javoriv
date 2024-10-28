import Link from "next/link";
import css from "./standart.module.css";
import Image from "next/image";
import Navigations from "./navigations";
import newLogoIns from "../../img/jkjanivbud.png";
const Header = () => {
  return (
    <header className={css.allHeaderWrap}>
      <div className={css.secondInHeader}>
        {" "}
        {/* <div className={css.wrapLogoW}>
          <Image src={logoInsortex} alt="Insortex Logo" className={css.logo} />
          <strong className={css.textStrongLogo}>INSORTEX</strong>
        </div> */}
        <Link href={"/"}>
          <Image src={newLogoIns} alt="Insortex Logo" className={css.logo} />
        </Link>
        {/* <nav className={css.navWrap}>
          <ul className={css.ulNavigation}>
            <li className={css.liNavigation}>{t("mainLink")}</li>
            <li className={css.liNavigation}>{t("productions")}</li>
            <li className={css.liNavigation}>{t("ourWorks")}</li>
            <li className={css.liNavigation}>{t("ourNews")}</li>
            <li className={css.liNavigation}>{t("aboutUs")}</li>
            <li className={css.liNavigation}>{t("contackLink")}</li>
          </ul>
        </nav> */}
        <nav className={css.navWrap}>
          {" "}
          <Navigations />
        </nav>
      </div>
    </header>
  );
};
export default Header;