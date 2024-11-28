import Link from "next/link";
import styles from "../components/blog/works.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";

import { AiOutlinePlus } from "react-icons/ai";
import "../components/font/FuturaPT/stylesheet.css";
import "../components/font/monrope/stylesheet.css";

import css from "styled-jsx/css";
import OneProductWrap from "../components/blog/oneProductWrap";
import HeaderWhite from "../components/standartComponents/headerWhite";

// Функція для отримання робіт з API
async function getWorks() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати роботи");
  }
  return res.json();
}
export async function generateMetadata() {
  const worksResponse = await getWorks();
  const works = worksResponse.data;

  const title = works.length
    ? "Блог про продаж квартир у Новояворівську | Нерухомість"
    : "Блог недоступний | Нерухомість у Новояворівську";
  const description = works.length
    ? "Читайте корисні статті про продаж квартир у Новояворівську. Дізнайтеся більше про наші пропозиції та новини ринку нерухомості."
    : "На жаль, наразі немає доступних статей у блозі. Поверніться пізніше, щоб дізнатися більше про продаж квартир у Новояворівську.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function WorksPage({ params: { lng } }) {
  const worksResponse = await getWorks();
  const works = worksResponse.data; // Отримуємо роботи з поля "data"

  return (
    <div className={styles.wrapAllWorks}>
      <HeaderWhite />

      <div className={styles.worksContainer}>
        <div className={styles.wrapSmallWorks}>
          <main className={styles.worksMain}>
            <h2 className={styles.h2ForAllWorks}>Блог</h2>
            {works.length > 0 ? (
              <div className={styles.wrapWorksAll}>
                {works.map((work) => (
                  <OneProductWrap product={work} key={work._id} lng={lng} />
                ))}
              </div>
            ) : (
              <p>Немає доступних статей.</p>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
