import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import styles from "./ProductList.module.css";

export async function getCategoryData(categoryName) {
  await mongooseConnect();
  const category = await Category.findOne({ name: categoryName }).lean();
  return category;
}

export default async function ProductList({ categoryName, lng }) {
  const categoryData = await getCategoryData(categoryName);

  if (!categoryData) {
    return <p>Категорія не знайдена</p>;
  }

  return (
    <div className={styles.productList}>
      <h2>{categoryData.name[lng]}</h2>
      <p>{categoryData.longdesc[lng]}</p>

      <div className={styles.products}>
        {/* Тут буде відображення товарів */}
        <p>Товари в категорії...</p>
      </div>
    </div>
  );
}
