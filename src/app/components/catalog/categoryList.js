import Link from "next/link";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import styles from "./CategoryList.module.css";

export async function getCategories() {
  await mongooseConnect();
  const categories = await Category.find().lean();
  return categories;
}

export default async function CategoryList({ currentCategory, lng }) {
  const categories = await getCategories();

  return (
    <div className={styles.categoryList}>
      <h3>Категорії</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link href={`/catalog/${category.name}`}>
              <a
                className={
                  currentCategory === category.name ? styles.active : ""
                }
              >
                {category.name[lng]}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
