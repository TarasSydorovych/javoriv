import Image from "next/image";
import css from "./main.module.css";
import locTov from "../../img/locTov.png";
import housYouNeed from "../../img/housYouNeed.png";
import forYuouNeed from "../../img/forYuouNeed.png";
const Prodag = () => {
  return (
    <div className={css.wrapWhotYouNeed}>
      <p className={css.planingP}>Зараз у продажі</p>
      <div className={css.wrapWhotYouNeedSmall}>
        <div className={css.wrapWhotYouNeedSmallSmProdag}>
          <p className={css.whoNeedPInNew}>86</p>
          <p className={css.whoNeedPInTwoNew}>Квартир</p>
        </div>
        <div className={css.wrapWhotYouNeedSmallSmProdag}>
          <p className={css.whoNeedPInNew}>40</p>
          <p className={css.whoNeedPInTwoNew}>Паркомісць</p>
        </div>
        <div className={css.wrapWhotYouNeedSmallSmProdag}>
          <p className={css.whoNeedPInNew}>4</p>
          <p className={css.whoNeedPInTwoNew}>Офісні приміщення</p>
        </div>
      </div>
    </div>
  );
};
export default Prodag;
