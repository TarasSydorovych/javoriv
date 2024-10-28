import css from "./main.module.css";
import adviser from "../../img/adviser.jpg";
import Image from "next/image";
const Informations = () => {
  return (
    <div className={css.wrapInformation}>
      <Image
        src={adviser}
        alt="ЯнівБуд"
        className={css.adviser} // Додаємо клас для стилізації, якщо потрібно
      />
      <div className={css.wrapInformationsBlock}>
        <p className={css.mainInfoemationsE}>Основна інформація</p>
        <p className={css.informationsPInSmallW}>
          Планова здача будинку IV квартал 2026 року <br />
          Два під'їзди, дев'ять поверхів, підземний паркінг.
          <br /> Конструктивна схема будівлі: монолітний залізобетонний каркас.
          <br />
          Зовнішні стіни: газоблок.
          <br /> Фасад: утеплення негорючими матеріалами. <br />У вартість
          квартири входить:
          <br />
        </p>{" "}
        <ul className={css.listInInformations}>
          <li className={css.liInInformations}>Штукатурка стін</li>
          <li className={css.liInInformations}>Стяжка підлоги</li>
          <li className={css.liInInformations}>Вхідні двері </li>
          <li className={css.liInInformations}>Енергоефективні вікна</li>
          <li className={css.liInInformations}>
            Лічильники (вода, електрика, тепло)
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Informations;
