// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import styles from "../../components/admin/admin.module.css";
// import Swal from "sweetalert2";
// import BackMenu from "@/app/components/admin/backMenu";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export default function AddProductPage() {
//   const [formState, setFormState] = useState({
//     name: { ua: "", en: "", ru: "", pl: "" },
//     shortDescription: { ua: "", en: "", ru: "", pl: "" },
//     longDescription: { ua: "", en: "", ru: "", pl: "" },
//     seotitle: { ua: "", en: "", ru: "", pl: "" },
//     seodescriptions: { ua: "", en: "", ru: "", pl: "" },
//     seoText: { ua: "", en: "", ru: "", pl: "" },
//     images: [],
//     characteristics: [{ title: { ua: "", en: "", ru: "", pl: "" } }],
//     videoUrl: "",
//     model3dFile: null,
//     category: "",
//   });

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/category");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormState((prevState) => ({
//       ...prevState,
//       images: [...prevState.images, ...files],
//     }));
//   };

//   const handle3DModelChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormState({ ...formState, model3dFile: file });
//     }
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...formState.images];
//     updatedImages.splice(index, 1);
//     setFormState({ ...formState, images: updatedImages });
//   };

//   const remove3DModel = () => {
//     setFormState({ ...formState, model3dFile: null });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Завантаження продукту...",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const uploadedImages = await Promise.all(
//         formState.images.map(async (file) => {
//           if (typeof file === "string") return file;
//           const filePath = `/static/images/${file.name}`;
//           await fs.promises.copyFile(file.path, `public${filePath}`); // Синхронне копіювання файлів
//           return filePath; // Повертаємо шлях до зображення
//         })
//       );

//       let model3dFileUrl = null;
//       if (formState.model3dFile) {
//         model3dFileUrl = `/static/3dmodels/${formState.model3dFile.name}`;
//         await fs.promises.copyFile(
//           formState.model3dFile.path,
//           `public${model3dFileUrl}`
//         ); // Синхронне копіювання файлів
//       }

//       const updatedFormState = {
//         ...formState,
//         images: uploadedImages,
//         model3dFile: model3dFileUrl,
//       };

//       await axios.post("/api/products", updatedFormState);

//       Swal.fire({
//         icon: "success",
//         title: "Продукт додано!",
//         text: "Новий продукт успішно доданий.",
//       });

//       setFormState({
//         name: { ua: "", en: "", ru: "", pl: "" },
//         shortDescription: { ua: "", en: "", ru: "", pl: "" },
//         longDescription: { ua: "", en: "", ru: "", pl: "" },
//         seotitle: { ua: "", en: "", ru: "", pl: "" },
//         seodescriptions: { ua: "", en: "", ru: "", pl: "" },
//         seoText: { ua: "", en: "", ru: "", pl: "" },
//         images: [],
//         characteristics: [{ title: { ua: "", en: "", ru: "", pl: "" } }],
//         videoUrl: "",
//         model3dFile: null,
//         category: "",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка під час додавання продукту.",
//       });
//     }
//   };

//   const handleCharacteristicChange = (index, field, lang, value) => {
//     const newCharacteristics = [...formState.characteristics];
//     newCharacteristics[index][field][lang] = value;
//     setFormState({ ...formState, characteristics: newCharacteristics });
//   };

//   const addCharacteristic = () => {
//     setFormState({
//       ...formState,
//       characteristics: [
//         ...formState.characteristics,
//         { title: { ua: "", en: "", ru: "", pl: "" } },
//       ],
//     });
//   };

//   const removeCharacteristic = (index) => {
//     const updatedCharacteristics = [...formState.characteristics];
//     updatedCharacteristics.splice(index, 1);
//     setFormState({ ...formState, characteristics: updatedCharacteristics });
//   };

//   return (
//     <div className={styles.wrapAllAdmin}>
//       <BackMenu />
//       <div className={styles.wrapCategoryAdm}>
//         <h1>Додати новий продукт</h1>
//         <form onSubmit={handleSubmit} className={styles.productForm}>
//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label>Назва продукту ({lang.toUpperCase()})</label>
//               <input
//                 type="text"
//                 value={formState.name[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     name: { ...formState.name, [lang]: e.target.value },
//                   })
//                 }
//                 required
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label>Короткий опис ({lang.toUpperCase()})</label>
//               <textarea
//                 value={formState.shortDescription[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     shortDescription: {
//                       ...formState.shortDescription,
//                       [lang]: e.target.value,
//                     },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.longDescriptions}>
//                 Довгий опис ({lang.toUpperCase()})
//               </label>
//               <ReactQuill
//                 className={styles.bigDescriptino}
//                 value={formState.longDescription[lang]}
//                 onChange={(value) =>
//                   setFormState({
//                     ...formState,
//                     longDescription: {
//                       ...formState.longDescription,
//                       [lang]: value,
//                     },
//                   })
//                 }
//                 theme="snow"
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroupSeo}>
//               <label>SEO Title ({lang.toUpperCase()})</label>
//               <input
//                 type="text"
//                 value={formState.seotitle[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     seotitle: { ...formState.seotitle, [lang]: e.target.value },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label>SEO Опис ({lang.toUpperCase()})</label>
//               <textarea
//                 value={formState.seodescriptions[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     seodescriptions: {
//                       ...formState.seodescriptions,
//                       [lang]: e.target.value,
//                     },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           <div className={styles.formGroup}>
//             <label>Зображення продукту (URL або файл)</label>
//             <input type="file" multiple onChange={handleImageChange} />
//             {formState.images.length > 0 && (
//               <ul>
//                 {formState.images.map((image, index) => (
//                   <li key={index}>
//                     {image.name || image}
//                     <button type="button" onClick={() => removeImage(index)}>
//                       Видалити
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label>Файл 3D моделі (URL або файл)</label>
//             <input type="file" onChange={handle3DModelChange} />
//             {formState.model3dFile && (
//               <div>
//                 <span>{formState.model3dFile.name}</span>
//                 <button type="button" onClick={remove3DModel}>
//                   Видалити файл
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label>Категорія</label>
//             <select
//               value={formState.category}
//               onChange={(e) => {
//                 const selectedCategory = categories.find(
//                   (category) => category._id === e.target.value
//                 );
//                 if (selectedCategory) {
//                   setFormState({
//                     ...formState,
//                     category: selectedCategory._id,
//                   });
//                 }
//               }}
//               required
//             >
//               <option value="">Оберіть категорію</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category._id}>
//                   {category.name.ua}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label>Характеристики</label>
//             {formState.characteristics.map((characteristic, index) => (
//               <div key={index} className={styles.characteristicRow}>
//                 {["ua", "en", "ru", "pl"].map((lang) => (
//                   <div key={lang}>
//                     <label>Назва характеристики ({lang.toUpperCase()})</label>
//                     <input
//                       type="text"
//                       placeholder={`Назва характеристики (${lang.toUpperCase()})`}
//                       value={characteristic.title[lang]}
//                       onChange={(e) =>
//                         handleCharacteristicChange(
//                           index,
//                           "title",
//                           lang,
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => removeCharacteristic(index)}
//                 >
//                   Видалити характеристику
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={addCharacteristic}>
//               Додати характеристику
//             </button>
//           </div>

//           <div className={styles.formGroup}>
//             <label>Посилання на YouTube відео</label>
//             <input
//               type="text"
//               value={formState.videoUrl}
//               onChange={(e) =>
//                 setFormState({ ...formState, videoUrl: e.target.value })
//               }
//             />
//           </div>

//           <button type="submit">Додати продукт</button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import css from "../../components/admin/admin.module.css";
import BackMenu from "@/app/components/admin/backMenu";
import Swal from "sweetalert2";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Функція для завантаження товарів
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Помилка при завантаженні товарів:", error);
    }
  };

  // Функція для завантаження категорій
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Помилка при завантаженні категорій:", error);
    }
  };

  // Функція для отримання назви категорії за її ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name.ua : "Без категорії";
  };

  // Функція для видалення товару
  const deleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Ви впевнені?",
        text: "Цей товар буде видалено назавжди!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Так, видалити!",
        cancelButtonText: "Скасувати",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/products?id=${productId}`);
        Swal.fire("Видалено!", "Товар було успішно видалено.", "success");
        fetchProducts();
      }
    } catch (error) {
      Swal.fire("Помилка!", "Не вдалося видалити товар.", "error");
    }
  };

  // Функція для редагування товару
  const editProduct = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  // Функція для переходу на сторінку додавання нового товару
  const addNewProduct = () => {
    router.push("/admin/products/add");
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <div className={css.wrapMainButton}>
          <h1 className={css.enterH1}>Список товарів</h1>
          <button className={css.enterButtonInNew} onClick={addNewProduct}>
            Додати новий товар
          </button>
        </div>
        <div className={css.wrapTableAll}>
          <table className={css.wrapTableAll}>
            <thead>
              <tr className={css.tableHeader}>
                <th className={css.tableHeaderCell}>Назва (UA)</th>
                <th className={css.tableHeaderCell}>Категорія</th>
                <th className={css.tableHeaderCell}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className={css.tableRow}>
                  <td className={css.tableCell}>{product.name.ua}</td>
                  <td className={css.tableCell}>
                    {getCategoryName(product.category)}
                  </td>
                  <td className={css.tableCell}>
                    <button
                      className={css.editButton}
                      onClick={() => editProduct(product._id)}
                    >
                      Редагувати
                    </button>
                    <button
                      className={css.deleteButton}
                      onClick={() => deleteProduct(product._id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
