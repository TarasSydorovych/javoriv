// "use client";
// import { useState } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import styles from "../../../components/admin/styles/addStyle.module.css";
// import Swal from "sweetalert2";
// import BackMenu from "@/app/components/admin/backMenu";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const modules = {
//   toolbar: [
//     [{ header: [2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// export default function AddProductPage() {
//   const [formState, setFormState] = useState({
//     name: "",
//     shortDescription: "",
//     longDescription: "",
//     seotitle: "",
//     seodescriptions: "",
//     images: [],
//     characteristics: [{ title: "" }],
//   });

//   const router = useRouter();

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormState((prevState) => ({
//       ...prevState,
//       images: [...prevState.images, ...files],
//     }));
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...formState.images];
//     updatedImages.splice(index, 1);
//     setFormState({ ...formState, images: updatedImages });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   Swal.fire({
//   //     title: "Завантаження продукту...",
//   //     allowOutsideClick: false,
//   //     didOpen: () => Swal.showLoading(),
//   //   });

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("name", formState.name);
//   //     formData.append("shortDescription", formState.shortDescription);
//   //     formData.append("longDescription", formState.longDescription);
//   //     formData.append("seotitle", formState.seotitle);
//   //     formData.append("seodescriptions", formState.seodescriptions);

//   //     formState.images.forEach((file) => formData.append("images", file));

//   //     formData.append(
//   //       "characteristics",
//   //       JSON.stringify(formState.characteristics)
//   //     );

//   //     await axios.post("/api/products", formData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Продукт додано!",
//   //       text: "Новий продукт успішно доданий.",
//   //     });
//   //     router.push("/admin/products/list");
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Помилка!",
//   //       text: "Сталася помилка під час додавання продукту.",
//   //     });
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", formState.name);
//     formData.append("shortDescription", formState.shortDescription);
//     formData.append("longDescription", formState.longDescription);
//     formData.append("seotitle", formState.seotitle);
//     formData.append("seodescriptions", formState.seodescriptions);

//     formState.images.forEach((file) => {
//       formData.append("images", file);
//     });

//     formData.append(
//       "characteristics",
//       JSON.stringify(formState.characteristics)
//     );

//     try {
//       await axios.post("/api/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       Swal.fire("Успішно", "Продукт додано", "success");
//     } catch (error) {
//       console.error("Помилка:", error);
//       Swal.fire("Помилка", "Не вдалося додати продукт", "error");
//     }
//   };

//   const handleCharacteristicChange = (index, value) => {
//     const updatedCharacteristics = [...formState.characteristics];
//     updatedCharacteristics[index].title = value;
//     setFormState({ ...formState, characteristics: updatedCharacteristics });
//   };

//   const addCharacteristic = () => {
//     setFormState({
//       ...formState,
//       characteristics: [...formState.characteristics, { title: "" }],
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
//         <h1 className={styles.enterH1}>Додати новий продукт</h1>
//         <form onSubmit={handleSubmit} className={styles.productForm}>
//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Назва продукту</label>
//             <input
//               type="text"
//               className={styles.productInput}
//               value={formState.name}
//               onChange={(e) =>
//                 setFormState({ ...formState, name: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Короткий опис</label>
//             <textarea
//               className={styles.productTextarea}
//               value={formState.shortDescription}
//               onChange={(e) =>
//                 setFormState({ ...formState, shortDescription: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Довгий опис</label>
//             <ReactQuill
//               className={styles.productQuill}
//               value={formState.longDescription}
//               onChange={(value) =>
//                 setFormState({ ...formState, longDescription: value })
//               }
//               modules={modules}
//               theme="snow"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>SEO Title</label>
//             <input
//               type="text"
//               className={styles.productInput}
//               value={formState.seotitle}
//               onChange={(e) =>
//                 setFormState({ ...formState, seotitle: e.target.value })
//               }
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>SEO Опис</label>
//             <textarea
//               className={styles.productTextarea}
//               value={formState.seodescriptions}
//               onChange={(e) =>
//                 setFormState({
//                   ...formState,
//                   seodescriptions: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Зображення продукту</label>
//             <input
//               type="file"
//               multiple
//               className={styles.productFileInput}
//               onChange={handleImageChange}
//             />
//             {formState.images.length > 0 && (
//               <ul className={styles.imagesList}>
//                 {formState.images.map((image, index) => (
//                   <li key={index} className={styles.imageItem}>
//                     {image.name || image}
//                     <button
//                       type="button"
//                       className={styles.removeButton}
//                       onClick={() => removeImage(index)}
//                     >
//                       Видалити
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Характеристики</label>
//             {formState.characteristics.map((characteristic, index) => (
//               <div key={index} className={styles.characteristicRow}>
//                 <input
//                   type="text"
//                   className={styles.productInput}
//                   value={characteristic.title}
//                   onChange={(e) =>
//                     handleCharacteristicChange(index, e.target.value)
//                   }
//                 />
//                 <button
//                   type="button"
//                   className={styles.removeButton}
//                   onClick={() => removeCharacteristic(index)}
//                 >
//                   Видалити характеристику
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className={styles.addButton}
//               onClick={addCharacteristic}
//             >
//               Додати характеристику
//             </button>
//           </div>

//           <button type="submit" className={styles.submitButton}>
//             Додати продукт
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import styles from "../../../components/admin/styles/addStyle.module.css";
import Swal from "sweetalert2";
import BackMenu from "@/app/components/admin/backMenu";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function AddProductPage() {
  const [formState, setFormState] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    seotitle: "",
    seodescriptions: "",
    images: [],
    characteristics: [{ title: "" }],
    category: "", // Додаємо поле для вибору категорії
  });

  const [categories, setCategories] = useState([]); // Стан для категорій
  const router = useRouter();

  // Завантаження категорій при завантаженні компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка при завантаженні категорій:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...formState.images];
    updatedImages.splice(index, 1);
    setFormState({ ...formState, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("shortDescription", formState.shortDescription);
    formData.append("longDescription", formState.longDescription);
    formData.append("seotitle", formState.seotitle);
    formData.append("seodescriptions", formState.seodescriptions);
    formData.append("category", formState.category); // Додаємо категорію до форми

    formState.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append(
      "characteristics",
      JSON.stringify(formState.characteristics)
    );

    try {
      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Успішно", "Продукт додано", "success");
      router.push("/admin/products");
    } catch (error) {
      console.error("Помилка:", error);
      Swal.fire("Помилка", "Не вдалося додати продукт", "error");
    }
  };

  const handleCharacteristicChange = (index, value) => {
    const updatedCharacteristics = [...formState.characteristics];
    updatedCharacteristics[index].title = value;
    setFormState({ ...formState, characteristics: updatedCharacteristics });
  };

  const addCharacteristic = () => {
    setFormState({
      ...formState,
      characteristics: [...formState.characteristics, { title: "" }],
    });
  };

  const removeCharacteristic = (index) => {
    const updatedCharacteristics = [...formState.characteristics];
    updatedCharacteristics.splice(index, 1);
    setFormState({ ...formState, characteristics: updatedCharacteristics });
  };

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1 className={styles.enterH1}>Додати новий продукт</h1>
        <form onSubmit={handleSubmit} className={styles.productForm}>
          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Назва продукту</label>
            <input
              type="text"
              className={styles.productInput}
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Короткий опис</label>
            <textarea
              className={styles.productTextarea}
              value={formState.shortDescription}
              onChange={(e) =>
                setFormState({ ...formState, shortDescription: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Довгий опис</label>
            <ReactQuill
              className={styles.productQuill}
              value={formState.longDescription}
              onChange={(value) =>
                setFormState({ ...formState, longDescription: value })
              }
              modules={modules}
              theme="snow"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>SEO Title</label>
            <input
              type="text"
              className={styles.productInput}
              value={formState.seotitle}
              onChange={(e) =>
                setFormState({ ...formState, seotitle: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>SEO Опис</label>
            <textarea
              className={styles.productTextarea}
              value={formState.seodescriptions}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  seodescriptions: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Категорія</label>
            <select
              className={styles.productSelect}
              value={formState.category}
              onChange={(e) =>
                setFormState({ ...formState, category: e.target.value })
              }
              required
            >
              <option value="">Оберіть категорію</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Зображення продукту</label>
            <input
              type="file"
              multiple
              className={styles.productFileInput}
              onChange={handleImageChange}
            />
            {formState.images.length > 0 && (
              <ul className={styles.imagesList}>
                {formState.images.map((image, index) => (
                  <li key={index} className={styles.imageItem}>
                    {image.name || image}
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeImage(index)}
                    >
                      Видалити
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Характеристики</label>
            {formState.characteristics.map((characteristic, index) => (
              <div key={index} className={styles.characteristicRow}>
                <input
                  type="text"
                  className={styles.productInput}
                  value={characteristic.title}
                  onChange={(e) =>
                    handleCharacteristicChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeCharacteristic(index)}
                >
                  Видалити характеристику
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={addCharacteristic}
            >
              Додати характеристику
            </button>
          </div>

          <button type="submit" className={styles.submitButton}>
            Додати квартиру
          </button>
        </form>
      </div>
    </div>
  );
}
