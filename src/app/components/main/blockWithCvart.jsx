import css from "./main.module.css";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";
import photoKvartOne from "../../img/photoKvartOne.jpg";
import photoKvartTwo from "../../img/photoKvartTwo.jpg";
import photoKvartThre from "../../img/photoKvartThre.jpg";
import Image from "next/image";
import ButtonWithPopProd from "./buttonWithPopProd";
const BlockWithCvart = () => {
  return (
    <div className={css.wrapKvart}>
      <div className={css.wrapPWithCatalog}>
        <p className={css.pinCatalog}>Лідери продажів</p>
        <Link href="/catalog">
          <p className={css.pinCatalogLo}>
            Каталог <IoArrowForwardOutline className={css.newwardOutline} />
          </p>
        </Link>
      </div>
      <div className={css.wrapAllKvart}>
        <div className={css.wrapOneKvart}>
          {" "}
          <Image
            src={photoKvartOne}
            alt="ЯнівБуд"
            className={css.photoKvartOne} // Додаємо клас для стилізації, якщо потрібно
          />
          <Link href="/your-page-url" className={css.wrapOnePInProd}>
            {" "}
            {/* Замініть /your-page-url на бажане посилання */}
            <div className={css.wrapOnePInProd} style={{ cursor: "pointer" }}>
              {" "}
              {/* Додаємо стиль для курсора */}
              <p className={css.nameKvart}>Однокімнатна квартира</p>
              <p className={css.nameKvart}>46м²</p>
            </div>
          </Link>
          {/* <ButtonWithPopProd /> */}
        </div>
        <div className={css.wrapOneKvart}>
          {" "}
          <Image
            src={photoKvartTwo}
            alt="ЯнівБуд"
            className={css.photoKvartOne} // Додаємо клас для стилізації, якщо потрібно
          />
          <Link href="/your-page-url" className={css.wrapOnePInProd}>
            {" "}
            {/* Замініть /your-page-url на бажане посилання */}
            <div className={css.wrapOnePInProd} style={{ cursor: "pointer" }}>
              {" "}
              {/* Додаємо стиль для курсора */}
              <p className={css.nameKvart}>Двокімнатна квартира</p>
              <p className={css.nameKvart}>68м²</p>
            </div>
          </Link>
          {/* <ButtonWithPopProd /> */}
        </div>
        <div className={css.wrapOneKvart}>
          {" "}
          <Image
            src={photoKvartOne}
            alt="ЯнівБуд"
            className={css.photoKvartOne} // Додаємо клас для стилізації, якщо потрібно
          />
          <Link href="/your-page-url" className={css.wrapOnePInProd}>
            {" "}
            {/* Замініть /your-page-url на бажане посилання */}
            <div className={css.wrapOnePInProd} style={{ cursor: "pointer" }}>
              {" "}
              {/* Додаємо стиль для курсора */}
              <p className={css.nameKvart}>Трьохкімнатна квартира</p>
              <p className={css.nameKvart}>86м²</p>
            </div>
          </Link>
          {/* <ButtonWithPopProd /> */}
        </div>
      </div>
    </div>
  );
};
export default BlockWithCvart;
