"use client"; // Додаємо на початку файлу

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Використовуємо правильний імпорт для app directory

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Використовуємо для навігації

  useEffect(() => {
    fetchProducts();
  }, []);

  // Функція для завантаження товарів
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products"); // Запит на API для отримання всіх товарів
      const data = await response.json();
      setProducts(data); // Збереження товарів у стані
    } catch (error) {
      console.error("Помилка при завантаженні товарів:", error);
    }
    setLoading(false);
  };

  // Функція для видалення товару
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE", // Виклик API для видалення товару
      });
      if (response.status === 204) {
        alert("Товар успішно видалено!");
        fetchProducts(); // Оновлюємо список після видалення
      } else {
        alert("Не вдалося видалити товар");
      }
    } catch (error) {
      console.error("Помилка при видаленні товару:", error);
    }
  };

  // Функція для редагування товару
  const editProduct = (productId) => {
    router.push(`/admin/products/edit/${productId}`); // Перенаправлення на сторінку редагування
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      <h1>Список товарів</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: "20px" }}>
            <h2>{product.name.ua}</h2>
            <p>{product.shortDescription?.ua || "Опис відсутній"}</p>
            <button onClick={() => deleteProduct(product._id)}>Видалити</button>
            <button
              onClick={() => editProduct(product._id)}
              style={{ marginLeft: "10px" }}
            >
              Редагувати
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
