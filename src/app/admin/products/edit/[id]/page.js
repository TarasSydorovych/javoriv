// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductForm from "@/app/components/admin/product/productForm";
// import css from "../../../../components/admin/admin.module.css";
// import { useRouter } from "next/navigation";
// import BackMenu from "@/app/components/admin/backMenu";

// export default function EditProductPage({ params }) {
//   const { id } = params;
//   const [product, setProduct] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const router = useRouter();

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/api/products?id=${id}`);
//       setProduct(res.data);
//     } catch (error) {
//       console.error("Error fetching product", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("/api/category");
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Error fetching categories", error);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     fetchCategories();
//   }, [id]);

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <div className={css.wrapMainButton}>
//           <h1 className={css.enterH1}>Редагувати продукт</h1>
//           <button
//             className={css.enterButtonInNew}
//             onClick={() => router.push("/admin/products")}
//           >
//             Назад
//           </button>
//         </div>
//         {product && (
//           <ProductForm
//             selectedProduct={product}
//             categories={categories}
//             fetchProducts={() => router.push("/admin/products")}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import styles from "../../../../components/admin/styles/addStyle.module.css";
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

export default function EditProductPage() {
  const [formState, setFormState] = useState([
    {
      name: { ua: "", en: "", ru: "", pl: "" },
      shortDescription: { ua: "", en: "", ru: "", pl: "" },
      longDescription: { ua: "", en: "", ru: "", pl: "" },
      seotitle: { ua: "", en: "", ru: "", pl: "" },
      seodescriptions: { ua: "", en: "", ru: "", pl: "" },
      images: [],
      characteristics: [{ title: { ua: "", en: "", ru: "", pl: "" } }],
      videoUrl: "",
      model3dFile: null,
      category: "",
    },
  ]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products?id=${productId}`);
        setFormState(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка при отриманні продукту:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка при отриманні категорій:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState((prevState) => [
      {
        ...prevState[0],
        images: [...prevState[0].images, ...files],
      },
    ]);
  };

  const handle3DModelChange = (e) => {
    setFormState([
      {
        ...formState[0],
        model3dFile: e.target.files[0],
      },
    ]);
  };

  const removeImage = (index) => {
    const updatedImages = [...formState[0].images];
    updatedImages.splice(index, 1);
    setFormState([{ ...formState[0], images: updatedImages }]);
  };

  const remove3DModel = () => {
    setFormState([{ ...formState[0], model3dFile: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Оновлення продукту...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("name", JSON.stringify(formState[0].name));
      formData.append(
        "shortDescription",
        JSON.stringify(formState[0].shortDescription)
      );
      formData.append(
        "longDescription",
        JSON.stringify(formState[0].longDescription)
      );
      formData.append("seotitle", JSON.stringify(formState[0].seotitle));
      formData.append(
        "seodescriptions",
        JSON.stringify(formState[0].seodescriptions)
      );
      formData.append("videoUrl", formState[0].videoUrl);
      formData.append("category", formState[0].category);

      formState[0].images.forEach((file) => {
        formData.append("images", file);
      });

      if (formState[0].model3dFile) {
        formData.append("model3dFile", formState[0].model3dFile);
      }

      formData.append(
        "characteristics",
        JSON.stringify(formState[0].characteristics)
      );

      await axios.put(`/api/products?id=${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Продукт оновлено!",
        text: "Товар успішно оновлено.",
      });

      router.push("/admin/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час оновлення продукту.",
      });
    }
  };

  const handleCharacteristicChange = (index, lang, value) => {
    const updatedCharacteristics = [...formState[0].characteristics];
    updatedCharacteristics[index].title[lang] = value;
    setFormState([
      { ...formState[0], characteristics: updatedCharacteristics },
    ]);
  };

  const addCharacteristic = () => {
    setFormState([
      {
        ...formState[0],
        characteristics: [
          ...formState[0].characteristics,
          { title: { ua: "", en: "", ru: "", pl: "" } },
        ],
      },
    ]);
  };

  const removeCharacteristic = (index) => {
    const updatedCharacteristics = [...formState[0].characteristics];
    updatedCharacteristics.splice(index, 1);
    setFormState([
      { ...formState[0], characteristics: updatedCharacteristics },
    ]);
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }
  console.log("formState", formState);

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1 className={styles.enterH1}>Редагувати продукт</h1>
        <form onSubmit={handleSubmit} className={styles.productForm}>
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Назва продукту ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState[0].name?.[lang] || ""}
                onChange={(e) =>
                  setFormState([
                    {
                      ...formState[0],
                      name: { ...formState[0].name, [lang]: e.target.value },
                    },
                  ])
                }
                required
              />
            </div>
          ))}

          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Короткий опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState[0].shortDescription?.[lang] || ""}
                onChange={(e) =>
                  setFormState([
                    {
                      ...formState[0],
                      shortDescription: {
                        ...formState[0].shortDescription,
                        [lang]: e.target.value,
                      },
                    },
                  ])
                }
              />
            </div>
          ))}

          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Довгий опис ({lang.toUpperCase()})
              </label>
              <ReactQuill
                className={styles.productQuill}
                value={formState[0].longDescription?.[lang] || ""}
                onChange={(value) =>
                  setFormState([
                    {
                      ...formState[0],
                      longDescription: {
                        ...formState[0].longDescription,
                        [lang]: value,
                      },
                    },
                  ])
                }
                modules={modules}
                theme="snow"
              />
            </div>
          ))}

          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Title ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState[0].seotitle?.[lang] || ""}
                onChange={(e) =>
                  setFormState([
                    {
                      ...formState[0],
                      seotitle: {
                        ...formState[0].seotitle,
                        [lang]: e.target.value,
                      },
                    },
                  ])
                }
              />
            </div>
          ))}

          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState[0].seodescriptions?.[lang] || ""}
                onChange={(e) =>
                  setFormState([
                    {
                      ...formState[0],
                      seodescriptions: {
                        ...formState[0].seodescriptions,
                        [lang]: e.target.value,
                      },
                    },
                  ])
                }
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Зображення продукту</label>
            <input
              type="file"
              multiple
              className={styles.productFileInput}
              onChange={handleImageChange}
            />
            {formState[0].images.length > 0 && (
              <ul className={styles.imagesList}>
                {formState[0].images.map((image, index) => (
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
            <label className={styles.productLabel}>Файл 3D моделі</label>
            <input
              type="file"
              className={styles.productFileInput}
              onChange={handle3DModelChange}
            />
            {formState[0].model3dFile && (
              <div className={styles.modelFile}>
                <span>{formState[0].model3dFile.name}</span>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={remove3DModel}
                >
                  Видалити файл
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Категорія</label>
            <select
              className={styles.productSelect}
              value={formState[0].category}
              onChange={(e) =>
                setFormState([{ ...formState[0], category: e.target.value }])
              }
              required
            >
              <option value="">Оберіть категорію</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name.ua}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Характеристики</label>
            {formState[0].characteristics.map((characteristic, index) => (
              <div key={index} className={styles.characteristicRow}>
                {["ua", "en", "ru", "pl"].map((lang) => (
                  <div key={lang} className={styles.characteristicInput}>
                    <label>Назва характеристики ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      className={styles.productInput}
                      value={characteristic.title?.[lang] || ""}
                      onChange={(e) =>
                        handleCharacteristicChange(index, lang, e.target.value)
                      }
                    />
                  </div>
                ))}
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

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>
              Посилання на YouTube відео
            </label>
            <input
              type="text"
              className={styles.productInput}
              value={formState[0].videoUrl || ""}
              onChange={(e) =>
                setFormState([{ ...formState[0], videoUrl: e.target.value }])
              }
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Оновити продукт
          </button>
        </form>
      </div>
    </div>
  );
}
