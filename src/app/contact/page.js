import Image from "next/image";
import css from "../components/standartComponents/standart.module.css";

import "../components/font/FuturaPT/stylesheet.css";
import "../components/font/monrope/stylesheet.css";
import Footer from "../components/standartComponents/footer";
import HeaderWhite from "../components/standartComponents/headerWhite";
import FirtBlockContact from "../components/contact/firstBlockContact";
import BlockWithForm from "../components/contact/blockWithForm";
import Map from "../components/contact/map";
export async function generateMetadata() {
  return {
    title: "Контакти – Продаж квартир у Новояворівську",
    description:
      "Зв'яжіться з нами для детальної інформації про продаж квартир у Новояворівську. Наші контакти та розташування на карті.",
  };
}
export default function Home() {
  return (
    <div className={css.allMainWrap}>
      <HeaderWhite />
      <FirtBlockContact />
      <BlockWithForm />
      <Map />
      <Footer />
    </div>
  );
}
