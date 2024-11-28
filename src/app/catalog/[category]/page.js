// import Link from "next/link";
// import styles from "../../components/catalog/catalog.module.css";
// import { transliterate } from "@/utils/transliterate";
// import Header from "@/app/components/standartComponents/header";
// import Footer from "@/app/components/standartComponents/footer";

// import "../../components/font/FuturaPT/stylesheet.css";
// import "../../components/font/monrope/stylesheet.css";
// import { AiOutlinePlus } from "react-icons/ai";
// import OneProductWrap from "@/app/components/catalog/oneProductWrap";

// // Функція для отримання категорій з API
// async function getCategories() {
//   const res = await fetch("http://localhost:3000/api/category", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Не вдалося отримати категорії");
//   }
//   return res.json();
// }

// // Функція для отримання продуктів за категорією та її підкатегоріями
// async function getProductsByCategory(categoryName, lng) {
//   // Отримуємо всі категорії
//   const categoriesRes = await fetch("http://localhost:3000/api/category", {
//     cache: "no-store",
//   });
//   if (!categoriesRes.ok) {
//     throw new Error("Не вдалося отримати категорії");
//   }
//   const categories = await categoriesRes.json();

//   // Знаходимо категорію, яка відповідає переданій назві
//   const selectedCategory = categories.find(
//     (cat) => transliterate(cat.name) === categoryName
//   );

//   // Лог для перевірки вибраної категорії
//   if (!selectedCategory) {
//     throw new Error(`Категорія ${categoryName} не знайдена`);
//   } else {
//   }

//   // Знаходимо всі підкатегорії для вибраної категорії
//   const subCategories = categories.filter(
//     (cat) =>
//       cat.parent &&
//       cat.parent._id.toString() === selectedCategory._id.toString()
//   );

//   // Лог для перевірки підкатегорій

//   // Створюємо список ідентифікаторів категорій для фільтрації продуктів
//   const categoryIds = [
//     selectedCategory._id,
//     ...subCategories.map((cat) => cat._id),
//   ];

//   // Лог для перевірки списку категорій, які використовуються для фільтрації

//   // Отримуємо всі продукти
//   const productsRes = await fetch("http://localhost:3000/api/products", {
//     cache: "no-store",
//   });
//   if (!productsRes.ok) {
//     throw new Error("Не вдалося отримати продукти");
//   }
//   const allProducts = await productsRes.json();

//   // Лог для перевірки всіх продуктів

//   // Фільтруємо продукти по ідентифікаторах категорій
//   const filteredProducts = allProducts.filter((product) =>
//     categoryIds.includes(product.category)
//   );

//   // Лог для перевірки відфільтрованих продуктів

//   return filteredProducts;
// }

// export default async function CategoryPage({ params: { lng, category } }) {
//   const categories = await getCategories();

//   // Знайдемо вибрану категорію
//   const selectedCategory = categories.find(
//     (cat) => transliterate(cat.name) === category
//   );

//   // Отримаємо продукти для вибраної категорії
//   const products = selectedCategory
//     ? await getProductsByCategory(category, lng)
//     : [];

//   // Перевірка, чи є longdesc
//   const longDescHTML = selectedCategory ? selectedCategory.longdesc : "";

//   return (
//     <div className={styles.wrapAllCat}>
//       <Header />
//       <div className={styles.catalogContainer}>
//         <div className={styles.wrapSmallCatalog}>
//           <aside className={styles.categorySidebar}>
//             <h2 className={styles.categoryH2K}>Категорії</h2>
//             <ul className={styles.ulList}>
//               {categories.map((cat) => (
//                 <li
//                   key={cat._id}
//                   className={styles.listLi}
//                   // Додаємо умовний клас для вибраної категорії
//                   style={{
//                     color:
//                       transliterate(cat.name) === category
//                         ? "#f8b123" // Колір для вибраної категорії
//                         : "#042037", // Колір для всіх інших
//                   }}
//                 >
//                   <Link
//                     href={`/${lng}/catalog/${transliterate(cat.name)}`}
//                     className={styles.listLi}
//                   >
//                     <p
//                       style={{
//                         color:
//                           transliterate(cat.name) === category
//                             ? "#f8b123" // Колір для вибраної категорії
//                             : "#042037", // Колір для всіх інших
//                       }}
//                     >
//                       {cat.name}
//                     </p>
//                     <AiOutlinePlus
//                       className={styles.staleIconPlus}
//                       // Додаємо умовний стиль для іконки
//                       style={{
//                         color:
//                           transliterate(cat.name) === category
//                             ? "#f8b123" // Колір для вибраної категорії
//                             : "#042037", // Колір для всіх інших
//                       }}
//                     />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </aside>
//           <main className={styles.productsMain}>
//             <h2>
//               {t("forCatalogOneCate")} {selectedCategory?.name}
//             </h2>
//             {products.length > 0 ? (
//               <div className={styles.wrapProductsAll}>
//                 {products.map((product) => (
//                   <OneProductWrap
//                     product={product}
//                     key={product._id}
//                     lng={lng}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p>{t("notProdInCat")}</p>
//             )}
//             {selectedCategory && (
//               <div className={styles.longDescWrap}>
//                 {/* Серверний рендеринг HTML */}
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: longDescHTML, // HTML вже оброблений на сервері
//                   }}
//                 />
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import Link from "next/link";
import styles from "../../components/catalog/catalog.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";

import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import { AiOutlinePlus } from "react-icons/ai";
import OneProductWrap from "@/app/components/catalog/oneProductWrap";
import HeaderWhite from "@/app/components/standartComponents/headerWhite";

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

// Функція для отримання продуктів за категорією та її підкатегоріями
async function getProductsByCategory(categoryName) {
  const categoriesRes = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  if (!categoriesRes.ok) {
    throw new Error("Не вдалося отримати категорії");
  }
  const categories = await categoriesRes.json();

  const selectedCategory = categories.find(
    (cat) => transliterate(cat.name) === categoryName
  );

  if (!selectedCategory) {
    throw new Error(`Категорія ${categoryName} не знайдена`);
  }

  const subCategories = categories.filter(
    (cat) =>
      cat.parent &&
      cat.parent._id.toString() === selectedCategory._id.toString()
  );

  const categoryIds = [
    selectedCategory._id,
    ...subCategories.map((cat) => cat._id),
  ];

  const productsRes = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!productsRes.ok) {
    throw new Error("Не вдалося отримати продукти");
  }
  const allProducts = await productsRes.json();

  return allProducts.filter((product) =>
    categoryIds.includes(product.category)
  );
}
export async function generateMetadata() {
  return {
    title: "Каталог квартир у Новояворівську – сучасні пропозиції",
    description:
      "Ознайомтесь із каталогом квартир у Новояворівську. Великий вибір сучасного житла з оптимальним плануванням. Оберіть квартиру своєї мрії!",
  };
}
export default async function CategoryPage({ params: { category } }) {
  const categories = await getCategories();

  const selectedCategory = categories.find(
    (cat) => transliterate(cat.name) === category
  );

  const products = selectedCategory
    ? await getProductsByCategory(category)
    : [];

  const longDescHTML = selectedCategory ? selectedCategory.longdesc : "";

  return (
    <div className={styles.wrapAllCat}>
      <HeaderWhite />
      <div className={styles.catalogContainer}>
        <div className={styles.wrapSmallCatalog}>
          <aside className={styles.categorySidebar}>
            <h2 className={styles.categoryH2K}>Категорії</h2>
            <ul className={styles.ulList}>
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className={styles.listLi}
                  style={{
                    color:
                      transliterate(cat.name) === category
                        ? "#f8b123"
                        : "#042037",
                  }}
                >
                  <Link
                    href={`/catalog/${transliterate(cat.name)}`}
                    className={styles.listLi}
                  >
                    <p
                      style={{
                        color:
                          transliterate(cat.name) === category
                            ? "#f8b123"
                            : "#042037",
                      }}
                    >
                      {cat.name}
                    </p>
                    <AiOutlinePlus
                      className={styles.staleIconPlus}
                      style={{
                        color:
                          transliterate(cat.name) === category
                            ? "#f8b123"
                            : "#042037",
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <main className={styles.productsMain}>
            <h2>Квартири в категорії: {selectedCategory?.name}</h2>
            {products.length > 0 ? (
              <div className={styles.wrapProductsAll}>
                {products.map((product) => (
                  <OneProductWrap product={product} key={product._id} />
                ))}
              </div>
            ) : (
              <p>Немає продуктів у цій категорії</p>
            )}
            {selectedCategory && (
              <div className={styles.longDescWrap}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: longDescHTML,
                  }}
                />
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
