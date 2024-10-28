// import Link from "next/link";
// import css from "./admin.module.css";
// const BackMenu = () => {
//   return (
//     <div className={css.wrapBackMenu}>
//       <Link href={`/admin/categories`} className={css.linkInDas}>
//         Категорії
//       </Link>
//       <Link href={`/admin/products`} className={css.linkInDas}>
//         Товари
//       </Link>
//     </div>
//   );
// };
// export default BackMenu;
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import css from "./admin.module.css";

const BackMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Перенаправлення на сторінку входу після виходу
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

  return (
    <div className={css.wrapBackMenu}>
      <Link href={`/admin/categories`} className={css.linkInDas}>
        Категорії
      </Link>
      <Link href={`/admin/products`} className={css.linkInDas}>
        Квартири
      </Link>

      <Link href={`/admin/blog`} className={css.linkInDas}>
        Блог
      </Link>
      <button onClick={handleLogout} className={css.logoutButton}>
        Вийти
      </button>
    </div>
  );
};

export default BackMenu;
