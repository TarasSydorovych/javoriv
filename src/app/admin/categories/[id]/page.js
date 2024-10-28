// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import CategoryForm from "@/app/components/admin/category/categoryForm";
// import css from "../../../components/admin/admin.module.css";
// import { useRouter } from "next/navigation";
// import "../../../components/font/FuturaPT/stylesheet.css";
// import "../../../components/font/monrope/stylesheet.css";
// import BackMenu from "@/app/components/admin/backMenu";

// export default function EditCategoryPage({ params }) {
//   const { id } = params;
//   const [category, setCategory] = useState(null);
//   const router = useRouter();
//   const [categories, setCategories] = useState([]);

//   // Завантаження поточної категорії для редагування
//   const fetchCategory = async () => {
//     try {
//       const res = await axios.get(`/api/category?id=${id}`);
//       setCategory(res.data); // Зберігаємо дані категорії у стані
//     } catch (error) {
//       console.error("Error fetching category", error);
//     }
//   };

//   // Завантаження всіх категорій для вибору батьківської
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("/api/category");
//       setCategories(res.data); // Зберігаємо всі категорії у стані
//     } catch (error) {
//       console.error("Error fetching categories", error);
//     }
//   };

//   // Викликаємо функції завантаження даних при монтуванні компонента
//   useEffect(() => {
//     fetchCategory();
//     fetchCategories();
//   }, [id]);

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <div className={css.wrapMainButton}>
//           <h1 className={css.enterH1}>Редагувати категорію</h1>
//           <button
//             className={css.enterButtonInNew}
//             onClick={() => router.push("/admin/categories")}
//           >
//             Назад
//           </button>
//         </div>
//         {category && (
//           <CategoryForm
//             selectedCategory={category}
//             categories={categories}
//             fetchCategories={() => router.push("/admin/categories")}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "@/app/components/admin/category/categoryForm";
import css from "../../../components/admin/admin.module.css";
import { useRouter } from "next/navigation";
import "../../../components/font/FuturaPT/stylesheet.css";
import "../../../components/font/monrope/stylesheet.css";
import BackMenu from "@/app/components/admin/backMenu";

export default function EditCategoryPage({ params }) {
  const { id } = params;
  const [category, setCategory] = useState(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`/api/category?id=${id}`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching category", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchCategories();
  }, [id]);

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Редагувати категорію</h1>
          <button
            className={css.enterButtonInNew}
            onClick={() => router.push("/admin/categories")}
          >
            Назад
          </button>
        </div>
        {category && (
          <CategoryForm
            selectedCategory={category}
            categories={categories}
            fetchCategories={() => router.push("/admin/categories")}
          />
        )}
      </div>
    </div>
  );
}
