"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "./main.module.css";
import persh from "../../img/persh.jpg";
import planDva from "../../img/planDva.jpg";

const Planing = () => {
  return (
    <div className={css.wrapPlanning}>
      <p className={css.planingP}>Сучасне планування</p>
      <div className={css.wrapPlanningB}>
        <PhotoProvider>
          <div className={css.wrapOnePlanning}>
            <PhotoView src={persh.src}>
              <Image
                src={persh}
                alt="ЯнівБуд"
                className={css.persh} // Додаємо клас для стилізації, якщо потрібно
              />
            </PhotoView>
            <div className={css.descriptionsWrapPlan}>
              <p className={css.pInOne}>План першого поверху</p>
              <p className={css.pDescPIn}>
                Просторий і зручний план першого поверху передбачає всі
                необхідні приміщення для комфортного проживання. Велика
                вітальня, кухня та функціональні зони створюють затишок і
                практичність.
              </p>
            </div>
          </div>

          <div className={css.wrapOnePlanning}>
            <PhotoView src={planDva.src}>
              <Image
                src={planDva}
                alt="ЯнівБуд"
                className={css.persh} // Додаємо клас для стилізації, якщо потрібно
              />
            </PhotoView>
            <div className={css.descriptionsWrapPlan}>
              <p className={css.pInOne}>План 2-9го поверхів</p>
              <p className={css.pDescPIn}>
                Типові плани 2-9 поверхів пропонують оптимальне використання
                простору. Квартири мають раціональні планування з розділенням
                житлових зон, забезпечуючи зручність і комфорт для мешканців.
              </p>
            </div>
          </div>
        </PhotoProvider>
      </div>
    </div>
  );
};

export default Planing;
