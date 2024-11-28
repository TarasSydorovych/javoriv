import Link from "next/link";
import styles from "../components/catalog/catalog.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";

import { AiOutlinePlus } from "react-icons/ai";
import "../components/font/FuturaPT/stylesheet.css";
import "../components/font/monrope/stylesheet.css";
import OneProductWrap from "@/app/components/catalog/oneProductWrap";
import HeaderWhite from "../components/standartComponents/headerWhite";
// Функція для отримання категорій з API
async function getCategories() {
  const res = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати категорії");
  }
  return res.json();
}

// Функція для отримання всіх продуктів
async function getAllProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати продукти");
  }
  return res.json();
}
export async function generateMetadata() {
  return {
    title: "Каталог квартир у Новояворівську – сучасні пропозиції",
    description:
      "Ознайомтесь із каталогом квартир у Новояворівську. Великий вибір сучасного житла з оптимальним плануванням. Оберіть квартиру своєї мрії!",
  };
}
export default async function CatalogPage({ params: { lng } }) {
  const categories = await getCategories();
  const products = await getAllProducts();

  return (
    <div className={styles.wrapAllCat}>
      <HeaderWhite />
      <div className={styles.catalogContainer}>
        <div className={styles.wrapSmallCatalog}>
          <aside className={styles.categorySidebar}>
            <h2 className={styles.categoryH2K}></h2>
            <ul className={styles.ulList}>
              {categories.map((category) => (
                <li key={category._id} className={styles.listLi}>
                  <Link
                    href={`/catalog/${transliterate(category.name)}`}
                    className={styles.listLi}
                  >
                    {category.name}{" "}
                    <AiOutlinePlus className={styles.staleIconPlus} />
                    {/* Виведення назви категорії на поточній мові */}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <main className={styles.productsMain}>
            <h2 className={styles.h1InBlogCatalog}></h2>
            {products.length > 0 ? (
              <div className={styles.wrapProductsAll}>
                {products.map((product) => (
                  <OneProductWrap
                    product={product}
                    key={product._id}
                    lng={lng}
                  />
                ))}
              </div>
            ) : (
              <p>Немає доступних квартир.</p>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
