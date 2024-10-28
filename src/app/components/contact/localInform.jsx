import css from "./contact.module.css";
import { FaHome } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { GrPlan } from "react-icons/gr";

const LocalInform = () => {
  return (
    <div className={css.localInformWrap}>
      <div className={css.wrapInformationsI}>
        <FaHome className={css.aHome} />
        <p className={css.pAdress}>Відділ продажу</p>
      </div>
      <p className={css.greyDesc}>м.Новояворівськ, вул.С,Бандери 11</p>
      <div className={css.wrapInformationsI}>
        <IoLocationSharp className={css.aHome} />
        <p className={css.pAdress}>Розташування ЖК ЯнівБуд</p>
      </div>
      <p className={css.greyDesc}>м.Новояворівськ по вул.Вербицького 8</p>
      <div className={css.wrapInformationsI}>
        <MdPhone className={css.aHome} />
        <p className={css.pAdress}>Телефон</p>
      </div>
      <p className={css.greyDesc}>+38(096) 14 - 02 - 597</p>
      <div className={css.wrapInformationsI}>
        <MdEmail className={css.aHome} />
        <p className={css.pAdress}>Email</p>
      </div>
      <p className={css.greyDesc}>yanivbud@gmail.com</p>
      <div className={css.wrapInformationsI}>
        <GrPlan className={css.aHome} />
        <p className={css.pAdress}>Години роботи</p>
      </div>
      <p className={css.greyDesc}>Пн-Пт: 9:00 – 18:00</p>
    </div>
  );
};
export default LocalInform;
