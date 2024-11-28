import Image from "next/image";
import css from "./main.module.css";
import locTov from "../../img/locTov.png";
import housYouNeed from "../../img/housYouNeed.png";
import forYuouNeed from "../../img/forYuouNeed.png";
const WhotYouNeed = ({ mainData }) => {
  return (
    <div className={css.wrapWhotYouNeed}>
      <p className={css.planingP}>ЖК ЯнівБуд — саме те, що вам потрібно</p>
      <div className={css.wrapWhotYouNeedSmall}>
        <div className={css.wrapWhotYouNeedSmallSm}>
          <Image
            src={housYouNeed}
            alt="ЯнівБуд"
            className={css.pershNew} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.whoNeedPIn}>Від $840 за м2</p>
          <p className={css.whoNeedPInTwo}>Вигідне розтермінування</p>
        </div>
        <div className={css.wrapWhotYouNeedSmallSm}>
          <Image
            src={forYuouNeed}
            alt="ЯнівБуд"
            className={css.pershNew} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.whoNeedPIn}>Площі від 43 м2</p>
          <p className={css.whoNeedPInTwo}>Зручне планування</p>
        </div>
        <div className={css.wrapWhotYouNeedSmallSm}>
          <Image
            src={locTov}
            alt="ЯнівБуд"
            className={css.pershNew} // Додаємо клас для стилізації, якщо потрібно
          />
          <p className={css.whoNeedPIn}>вул.Вербицького 8</p>
          <p className={css.whoNeedPInTwo}>м. Новояворівськ</p>
        </div>
      </div>
    </div>
  );
};
export default WhotYouNeed;
