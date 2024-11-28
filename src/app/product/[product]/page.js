// import Image from "next/image";
// import Link from "next/link";
// import { transliterate } from "@/utils/transliterate";
// import css from "@/app/components/product/product.module.css";

// import Header from "@/app/components/standartComponents/header";
// import Footer from "@/app/components/standartComponents/footer";
// import { notFound } from "next/navigation";
// import PictureBlock from "@/app/components/product/pictureBlock";
// import SecondBlockMain from "@/app/components/product/secondBlockMain";
// import "../../components/font/FuturaPT/stylesheet.css";
// import "../../components/font/monrope/stylesheet.css";
// import CharacteristicsList from "@/app/components/product/characteristicsList";

// import SeoText from "@/app/components/product/seoText";
// // Це серверна компонента
// const ProductPage = async ({ params }) => {
//   const { lng, product } = params;
//   try {
//     // Запит для отримання всіх продуктів
//     const res = await fetch(`http://localhost:3000/api/products`, {
//       cache: "no-store", // Не використовуємо кешування для завантаження актуальних даних
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const allProducts = await res.json();

//     // Шукаємо товар за транслитерованим ім'ям
//     const productData = allProducts.find(
//       (p) => transliterate(p.name) === product
//     );

//     // Якщо товар не знайдено
//     if (!productData) {
//       notFound();
//     }

//     return (
//       <div className={css.productPage}>
//         <Header t={t} lng={lng} />
//         <div className={css.allProdWrap}>
//           <div className={css.wrapFirstBlock}>
//             <PictureBlock productData={productData} />
//             <SecondBlockMain t={t} lng={lng} productData={productData} />
//           </div>
//           <CharacteristicsList productData={productData} t={t} lng={lng} />
//           <p className={css.vieoVievP}>{t("videoView")}</p>

//           <SeoText productData={productData} t={t} lng={lng} />
//         </div>

//         <Footer t={t} lng={lng} />
//       </div>
//     );
//   } catch (error) {
//     notFound();
//   }
// };

// export default ProductPage;
import Image from "next/image";
import Link from "next/link";
import { transliterate } from "@/utils/transliterate";
import css from "@/app/components/product/product.module.css";

import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";
import { notFound } from "next/navigation";
import PictureBlock from "@/app/components/product/pictureBlock";
import SecondBlockMain from "@/app/components/product/secondBlockMain";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import CharacteristicsList from "@/app/components/product/characteristicsList";
import SeoText from "@/app/components/product/seoText";
import HeaderWhite from "@/app/components/standartComponents/headerWhite";
export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const allProducts = await res.json();
    const decodedProduct = decodeURIComponent(params.product);

    const normalizedProductSlug = decodedProduct.replace(/м²/g, "");
    const productData = allProducts.find(
      (p) =>
        transliterate(p.name).toLowerCase() ===
        normalizedProductSlug.toLowerCase()
    );

    if (!productData) {
      notFound();
    }

    return {
      title: productData.seotitle || productData.name,
      description: productData.seodescriptions || productData.shortDescription,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Сторінка продукту",
      description: "Інформація про вибраний продукт.",
    };
  }
}

const ProductPage = async ({ params }) => {
  const { lng, product } = params;

  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const allProducts = await res.json();

    // console.log("Params:", params);
    // console.log(
    //   "All products:",
    //   allProducts.map((p) => p.name)
    // );
    // console.log(
    //   "Transliterated names:",
    //   allProducts.map((p) => transliterate(p.name))
    // );

    const decodedProduct = decodeURIComponent(product);
    // console.log("Decoded product slug:", decodedProduct);

    // Видаляємо "м²" для уніфікації
    const normalizedProductSlug = decodedProduct.replace(/м²/g, "");
    const productData = allProducts.find(
      (p) =>
        transliterate(p.name).toLowerCase() ===
        normalizedProductSlug.toLowerCase()
    );
    // console.log("productData", productData);

    if (!productData) {
      console.error("Product not found for slug:", normalizedProductSlug);
      console.error(
        "Available slugs:",
        allProducts.map((p) => transliterate(p.name))
      );
      notFound();
    }
    console.log("productData", productData);

    return (
      <div className={css.productPage}>
        <HeaderWhite />
        <div className={css.allProdWrap}>
          <div className={css.wrapFirstBlock}>
            <PictureBlock productData={productData} />
            <SecondBlockMain lng={lng} productData={productData} />
          </div>
          <CharacteristicsList productData={productData} lng={lng} />

          <SeoText productData={productData} lng={lng} />
        </div>
        <Footer lng={lng} />
      </div>
    );
  } catch (error) {
    console.error("Error rendering product page:", error);
    notFound();
  }
};

export default ProductPage;
