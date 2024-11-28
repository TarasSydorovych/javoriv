import ButtonWithPop from "./buttonWithPop";
import css from "./main.module.css";
import Slider from "./slider";
const FirstBlock = ({ mainData }) => {
  return (
    <div className={css.firstBlockWrap}>
      <Slider /> {/* Використовуємо слайдер */}
      <div className={css.smallWrapInFir}>
        <h1 className={css.h1ForMain}>
          ЖК ЯнівБуд - квартири в Новояворівську від {mainData.vartistmetra}$/м²
        </h1>
        <p className={css.pInMain}>
          ЖК &quot;ЯнівБуд&quot; розпочав будівництво сучасний житловий комплекс
          у місті Новояворівськ. Пропонуємо комфортні квартири за доступною
          ціною. Відмінна інфраструктура, зручне розташування та якісне
          будівництво забезпечують ідеальні умови для життя. Планова здача
          будинку IV квартал 2026 року
        </p>
        <ButtonWithPop />
      </div>
    </div>
  );
};
export default FirstBlock;
