import css from "./main.module.css";
import Image from "next/image";
import iconOne from "../../img/iconOne.png";
import iconTwo from "../../img/iconTwo.png";
import iconThre from "../../img/iconThre.png";
import iconFour from "../../img/iconFour.png";
import iconFive from "../../img/iconFive.png";
import iconSix from "../../img/iconSix.png";

const Perevagu = () => {
  return (
    <div className={css.perevagu}>
      <p className={css.ourPerevaPo}>Перевага ЖК ЯнівБуд</p>
      <div className={css.wrapAllPreb}>
        <div className={css.onePerevage}>
          <Image
            src={iconOne}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>
            Оптимальне співвідношення ціни та якості{" "}
          </p>
        </div>
        <div className={css.onePerevage}>
          <Image
            src={iconThre}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>Чудова локація</p>
        </div>{" "}
        <div className={css.onePerevage}>
          <Image
            src={iconTwo}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>Високі стандарти якості</p>
        </div>
      </div>
      <div className={css.wrapAllPreb}>
        <div className={css.onePerevage}>
          <Image
            src={iconFour}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>Швидке оформлення</p>
        </div>
        <div className={css.onePerevage}>
          <Image
            src={iconFive}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>Сучасний дизайн</p>
        </div>
        <div className={css.onePerevage}>
          <Image
            src={iconSix}
            alt="ЯнівБуд"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.perevagaText}>Розвинена інфраструктура</p>
        </div>
      </div>
    </div>
  );
};
export default Perevagu;
