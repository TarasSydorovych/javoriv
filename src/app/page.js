// import Image from "next/image";
// import css from "./components/standartComponents/standart.module.css";
// import Header from "./components/standartComponents/header";
// import "./components/font/FuturaPT/stylesheet.css";
// import "./components/font/monrope/stylesheet.css";
// import FirstBlock from "./components/main/firstBlock";
// import Perevagu from "./components/main/perevagu";
// import SendSmallForm from "./components/standartComponents/sendSmallForm";
// import Planing from "./components/main/planing";
// import WhotYouNeed from "./components/main/whotYouNeed";
// import Prodag from "./components/main/prodag";
// import Informations from "./components/main/informations";
// import BlockWithCvart from "./components/main/blockWithCvart";
// import Footer from "./components/standartComponents/footer";

// export async function generateMetadata() {
//   return {
//     title: "Продаж квартир у Новояворівську – сучасне житло для вашої родини",
//     description:
//       "Придбайте квартиру в Новояворівську! Просторі та затишні квартири із сучасним плануванням. Зручна інфраструктура, вигідні умови. Оберіть своє житло сьогодні!",
//   };
// }
// export default function Home() {
//   return (
//     <div className={css.allMainWrap}>
//       <Header />
//       <FirstBlock />
//       <Perevagu />
//       <SendSmallForm />
//       <Prodag />
//       <Planing />
//       <WhotYouNeed />
//       <Informations />
//       <BlockWithCvart />
//       <Footer />
//     </div>
//   );
// }
import axios from "axios";
import css from "./components/standartComponents/standart.module.css";
import Header from "./components/standartComponents/header";
import "./components/font/FuturaPT/stylesheet.css";
import "./components/font/monrope/stylesheet.css";
import FirstBlock from "./components/main/firstBlock";
import Perevagu from "./components/main/perevagu";
import SendSmallForm from "./components/standartComponents/sendSmallForm";
import Planing from "./components/main/planing";
import WhotYouNeed from "./components/main/whotYouNeed";
import Prodag from "./components/main/prodag";
import Informations from "./components/main/informations";
import BlockWithCvart from "./components/main/blockWithCvart";
import Footer from "./components/standartComponents/footer";

export async function generateMetadata() {
  return {
    title: "Продаж квартир у Новояворівську – сучасне житло для вашої родини",
    description:
      "Придбайте квартиру в Новояворівську! Просторі та затишні квартири із сучасним плануванням. Зручна інфраструктура, вигідні умови. Оберіть своє житло сьогодні!",
  };
}

// Сторінка як серверна компонента
export default async function Home() {
  // Запит до API для отримання даних
  const { data: mainData } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/main`
  );

  return (
    <div className={css.allMainWrap}>
      <Header />
      <FirstBlock mainData={mainData} />
      <Perevagu />
      <SendSmallForm />
      <Prodag mainData={mainData} />
      <Planing />
      <WhotYouNeed mainData={mainData} />
      <Informations mainData={mainData} /> {/* Передача даних у компонент */}
      <BlockWithCvart />
      <Footer />
    </div>
  );
}
