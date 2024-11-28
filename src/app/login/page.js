// src/app/login/page.js
"use client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import css from "../components/admin/admin.module.css";
import "../components/font/FuturaPT/stylesheet.css";
import "../components/font/monrope/stylesheet.css";
export default function LoginPage() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/admin");
    } catch (error) {
      console.error("Помилка входу:", error);
    }
  };

  return (
    <div className={css.mainLogin}>
      <h1 className={css.enterH1}>Вхід</h1>
      <button className={css.enterButtonIn} onClick={signInWithGoogle}>
        Увійти через Google
      </button>
    </div>
  );
}
