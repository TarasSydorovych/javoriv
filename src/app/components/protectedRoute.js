// src/components/ProtectedRoute.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const allowedEmails = ["jakzadarom2@gmail.com", "yanivbud@gmail.com"];

        if (allowedEmails.includes(user.email)) {
          setUser(user);
        } else {
          alert("Ви не маєте доступу до цієї сторінки.");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Завантаження...</div>;

  return user ? children : null;
}
