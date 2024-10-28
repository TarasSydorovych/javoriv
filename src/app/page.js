import Image from "next/image";
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
export default function Home() {
  return (
    <div className={css.allMainWrap}>
      <Header />
      <FirstBlock />
      <Perevagu />
      <SendSmallForm />
      <Prodag />
      <Planing />
      <WhotYouNeed />
      <Informations />
      <BlockWithCvart />
      <Footer />
    </div>
  );
}
