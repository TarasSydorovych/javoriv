// // "use client";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import { storage } from "../../../../../lib/firebase";
// // import dynamic from "next/dynamic";
// // import { useParams, useRouter } from "next/navigation";
// // import styles from "../../../../components/admin/admin.module.css";
// // import Swal from "sweetalert2";
// // import BackMenu from "@/app/components/admin/backMenu";
// // import "react-quill/dist/quill.snow.css";

// // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // export default function EditProductPage() {
// //   const [formState, setFormState] = useState([
// //     {
// //       name: { ua: "", en: "", ru: "", pl: "" },
// //       shortDescription: { ua: "", en: "", ru: "", pl: "" },
// //       longDescription: { ua: "", en: "", ru: "", pl: "" },
// //       seotitle: { ua: "", en: "", ru: "", pl: "" },
// //       seodescriptions: { ua: "", en: "", ru: "", pl: "" },
// //       seoText: { ua: "", en: "", ru: "", pl: "" },
// //       images: [],
// //       characteristics: [
// //         {
// //           title: { ua: "", en: "", ru: "", pl: "" },
// //         },
// //       ],
// //       videoUrl: "",
// //       model3dFile: null,
// //       category: "",
// //     },
// //   ]);

// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();
// //   const { id: productId } = useParams();

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const response = await axios.get(`/api/products?id=${productId}`);
// //         setFormState(response.data); // Завантажуємо товар у перший елемент масиву
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching product:", error);
// //       }
// //     };

// //     const fetchCategories = async () => {
// //       try {
// //         const response = await axios.get("/api/category");
// //         setCategories(response.data);
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       }
// //     };

// //     fetchProduct();
// //     fetchCategories();
// //   }, [productId]);

// //   const handleFileUpload = async (file, folder) => {
// //     const storageRef = ref(storage, `${folder}/${file.name}`);
// //     const snapshot = await uploadBytes(storageRef, file);
// //     return getDownloadURL(snapshot.ref);
// //   };

// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     setFormState((prevState) => [
// //       {
// //         ...prevState[0],
// //         images: [...prevState[0].images, ...files],
// //       },
// //     ]);
// //   };

// //   const handle3DModelChange = (e) => {
// //     setFormState([{ ...formState[0], model3dFile: e.target.files[0] }]);
// //   };

// //   const removeImage = (index) => {
// //     const updatedImages = [...formState[0].images];
// //     updatedImages.splice(index, 1);
// //     setFormState([{ ...formState[0], images: updatedImages }]);
// //   };

// //   const remove3DModel = () => {
// //     setFormState([{ ...formState[0], model3dFile: null }]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     Swal.fire({
// //       title: "Оновлення продукту...",
// //       allowOutsideClick: false,
// //       didOpen: () => {
// //         Swal.showLoading();
// //       },
// //     });

// //     try {
// //       const uploadedImages = await Promise.all(
// //         formState[0].images.map(async (file) => {
// //           if (typeof file === "string") return file;
// //           return await handleFileUpload(file, "images");
// //         })
// //       );

// //       let model3dFileUrl = formState[0].model3dFile;
// //       if (formState[0].model3dFile instanceof File) {
// //         model3dFileUrl = await handleFileUpload(
// //           formState[0].model3dFile,
// //           "3dmodels"
// //         );
// //       }

// //       const updatedFormState = {
// //         ...formState[0],
// //         images: uploadedImages,
// //         model3dFile: model3dFileUrl,
// //       };

// //       await axios.put(`/api/products?id=${productId}`, updatedFormState);

// //       Swal.fire({
// //         icon: "success",
// //         title: "Продукт оновлено!",
// //         text: "Товар успішно оновлено.",
// //       });

// //       router.push("/admin/products");
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Помилка!",
// //         text: "Сталася помилка під час оновлення продукту.",
// //       });
// //     }
// //   };

// //   const handleCharacteristicChange = (index, field, lang, value) => {
// //     const newCharacteristics = [...formState[0].characteristics];
// //     newCharacteristics[index][field][lang] = value;
// //     setFormState([{ ...formState[0], characteristics: newCharacteristics }]);
// //   };

// //   const addCharacteristic = () => {
// //     setFormState([
// //       {
// //         ...formState[0],
// //         characteristics: [
// //           ...formState[0].characteristics,
// //           {
// //             title: { ua: "", en: "", ru: "", pl: "" },
// //           },
// //         ],
// //       },
// //     ]);
// //   };

// //   const removeCharacteristic = (index) => {
// //     const updatedCharacteristics = [...formState[0].characteristics];
// //     updatedCharacteristics.splice(index, 1);
// //     setFormState([
// //       { ...formState[0], characteristics: updatedCharacteristics },
// //     ]);
// //   };

// //   if (loading) {
// //     return <div>Завантаження...</div>;
// //   }
// //   console.log("formState[0]", formState[0]);

// //   return (
// //     <div className={styles.wrapAllAdmin}>
// //       <BackMenu />
// //       {formState[0] && (
// //         <div className={styles.wrapCategoryAdm}>
// //           <h1>Редагувати продукт</h1>
// //           <form onSubmit={handleSubmit} className={styles.productForm}>
// //             {["ua", "en", "ru", "pl"].map((lang) => (
// //               <div key={lang} className={styles.formGroup}>
// //                 <label>Назва продукту ({lang.toUpperCase()})</label>
// //                 <input
// //                   type="text"
// //                   value={formState[0]?.name?.[lang] || ""}
// //                   onChange={(e) =>
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         name: { ...formState[0].name, [lang]: e.target.value },
// //                       },
// //                     ])
// //                   }
// //                   required
// //                 />
// //               </div>
// //             ))}

// //             {["ua", "en", "ru", "pl"].map((lang) => (
// //               <div key={lang} className={styles.formGroup}>
// //                 <label>Короткий опис ({lang.toUpperCase()})</label>
// //                 <textarea
// //                   value={formState[0]?.shortDescription?.[lang] || ""}
// //                   onChange={(e) =>
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         shortDescription: {
// //                           ...formState[0].shortDescription,
// //                           [lang]: e.target.value,
// //                         },
// //                       },
// //                     ])
// //                   }
// //                 />
// //               </div>
// //             ))}

// //             {["ua", "en", "ru", "pl"].map((lang) => (
// //               <div key={lang} className={styles.formGroup}>
// //                 <label className={styles.longDescriptions}>
// //                   Довгий опис ({lang.toUpperCase()})
// //                 </label>
// //                 <ReactQuill
// //                   className={styles.bigDescriptino}
// //                   value={formState[0]?.longDescription?.[lang] || ""}
// //                   onChange={(value) =>
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         longDescription: {
// //                           ...formState[0].longDescription,
// //                           [lang]: value,
// //                         },
// //                       },
// //                     ])
// //                   }
// //                   theme="snow"
// //                 />
// //               </div>
// //             ))}

// //             {["ua", "en", "ru", "pl"].map((lang) => (
// //               <div key={lang} className={styles.formGroupSeo}>
// //                 <label>SEO Title ({lang.toUpperCase()})</label>
// //                 <input
// //                   type="text"
// //                   value={formState[0]?.seotitle?.[lang] || ""}
// //                   onChange={(e) =>
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         seotitle: {
// //                           ...formState[0].seotitle,
// //                           [lang]: e.target.value,
// //                         },
// //                       },
// //                     ])
// //                   }
// //                 />
// //               </div>
// //             ))}

// //             {["ua", "en", "ru", "pl"].map((lang) => (
// //               <div key={lang} className={styles.formGroup}>
// //                 <label>SEO Опис ({lang.toUpperCase()})</label>
// //                 <textarea
// //                   value={formState[0]?.seodescriptions?.[lang] || ""}
// //                   onChange={(e) =>
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         seodescriptions: {
// //                           ...formState[0].seodescriptions,
// //                           [lang]: e.target.value,
// //                         },
// //                       },
// //                     ])
// //                   }
// //                 />
// //               </div>
// //             ))}

// //             <div className={styles.formGroup}>
// //               <label>Зображення продукту (URL або файл)</label>
// //               <input type="file" multiple onChange={handleImageChange} />
// //               {formState[0].images && formState[0].images.length > 0 && (
// //                 <ul>
// //                   {formState[0].images.map((image, index) => (
// //                     <li key={index}>
// //                       {image.name || image}
// //                       <button type="button" onClick={() => removeImage(index)}>
// //                         Видалити
// //                       </button>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Файл 3D моделі (URL або файл)</label>
// //               <input type="file" onChange={handle3DModelChange} />
// //               {formState[0].model3dFile && (
// //                 <div>
// //                   <span>{formState[0].model3dFile.name}</span>
// //                   <button type="button" onClick={remove3DModel}>
// //                     Видалити файл
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Категорія</label>
// //               <select
// //                 value={formState[0].category}
// //                 onChange={(e) => {
// //                   const selectedCategory = categories.find(
// //                     (category) => category._id === e.target.value
// //                   );
// //                   if (selectedCategory) {
// //                     setFormState([
// //                       {
// //                         ...formState[0],
// //                         category: selectedCategory._id,
// //                       },
// //                     ]);
// //                   }
// //                 }}
// //                 required
// //               >
// //                 <option value="">Оберіть категорію</option>
// //                 {categories.map((category) => (
// //                   <option key={category._id} value={category._id}>
// //                     {category.name.ua}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Характеристики</label>
// //               {formState[0].characteristics &&
// //                 formState[0].characteristics.map((characteristic, index) => (
// //                   <div key={index} className={styles.characteristicRow}>
// //                     {["ua", "en", "ru", "pl"].map((lang) => (
// //                       <div key={lang}>
// //                         <label>
// //                           Назва характеристики ({lang.toUpperCase()})
// //                         </label>
// //                         <input
// //                           type="text"
// //                           placeholder={`Назва характеристики (${lang.toUpperCase()})`}
// //                           value={characteristic.title[lang]}
// //                           onChange={(e) =>
// //                             handleCharacteristicChange(
// //                               index,
// //                               "title",
// //                               lang,
// //                               e.target.value
// //                             )
// //                           }
// //                         />
// //                       </div>
// //                     ))}
// //                     <button
// //                       type="button"
// //                       onClick={() => removeCharacteristic(index)}
// //                     >
// //                       Видалити характеристику
// //                     </button>
// //                   </div>
// //                 ))}
// //               <button type="button" onClick={addCharacteristic}>
// //                 Додати характеристику
// //               </button>
// //             </div>

// //             <div className={styles.formGroup}>
// //               <label>Посилання на YouTube відео</label>
// //               <input
// //                 type="text"
// //                 value={formState[0].videoUrl}
// //                 onChange={(e) =>
// //                   setFormState([{ ...formState[0], videoUrl: e.target.value }])
// //                 }
// //               />
// //             </div>

// //             <button type="submit">Оновити продукт</button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useParams, useRouter } from "next/navigation";
// import styles from "../../../../components/admin/admin.module.css";
// import Swal from "sweetalert2";
// import BackMenu from "@/app/components/admin/backMenu";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export default function EditProductPage() {
//   const [formState, setFormState] = useState([
//     {
//       name: { ua: "", en: "", ru: "", pl: "" },
//       shortDescription: { ua: "", en: "", ru: "", pl: "" },
//       longDescription: { ua: "", en: "", ru: "", pl: "" },
//       seotitle: { ua: "", en: "", ru: "", pl: "" },
//       seodescriptions: { ua: "", en: "", ru: "", pl: "" },
//       seoText: { ua: "", en: "", ru: "", pl: "" },
//       images: [],
//       characteristics: [
//         {
//           title: { ua: "", en: "", ru: "", pl: "" },
//         },
//       ],
//       videoUrl: "",
//       model3dFile: null,
//       category: "",
//     },
//   ]);

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { id: productId } = useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`/api/products?id=${productId}`);
//         setFormState(response.data); // Завантажуємо товар у перший елемент масиву
//         setLoading(false);
//       } catch (error) {
//         console.error("Помилка при отриманні продукту:", error);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/category");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Помилка при отриманні категорій:", error);
//       }
//     };

//     fetchProduct();
//     fetchCategories();
//   }, [productId]);

//   const handleFileUpload = async (file, folder) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     // Адаптуйте ваш API для обробки завантаження файлів
//     const response = await axios.post(`/api/upload`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data.url; // Припускаємо, що ваш API повертає URL файлу
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormState((prevState) => [
//       {
//         ...prevState[0],
//         images: [...prevState[0].images, ...files],
//       },
//     ]);
//   };

//   const handle3DModelChange = (e) => {
//     setFormState([{ ...formState[0], model3dFile: e.target.files[0] }]);
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...formState[0].images];
//     updatedImages.splice(index, 1);
//     setFormState([{ ...formState[0], images: updatedImages }]);
//   };

//   const remove3DModel = () => {
//     setFormState([{ ...formState[0], model3dFile: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Оновлення продукту...",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const uploadedImages = await Promise.all(
//         formState[0].images.map(async (file) => {
//           if (typeof file === "string") return file;
//           return await handleFileUpload(file, "images");
//         })
//       );

//       let model3dFileUrl = formState[0].model3dFile;
//       if (formState[0].model3dFile instanceof File) {
//         model3dFileUrl = await handleFileUpload(
//           formState[0].model3dFile,
//           "3dmodels"
//         );
//       }

//       const updatedFormState = {
//         ...formState[0],
//         images: uploadedImages,
//         model3dFile: model3dFileUrl, // Зберігаємо URL для 3D моделі
//       };

//       await axios.put(`/api/products?id=${productId}`, updatedFormState);

//       Swal.fire({
//         icon: "success",
//         title: "Продукт оновлено!",
//         text: "Товар успішно оновлено.",
//       });

//       router.push("/admin/products");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка під час оновлення продукту.",
//       });
//     }
//   };

//   const handleCharacteristicChange = (index, field, lang, value) => {
//     const newCharacteristics = [...formState[0].characteristics];
//     newCharacteristics[index][field][lang] = value;
//     setFormState([{ ...formState[0], characteristics: newCharacteristics }]);
//   };

//   const addCharacteristic = () => {
//     setFormState([
//       {
//         ...formState[0],
//         characteristics: [
//           ...formState[0].characteristics,
//           {
//             title: { ua: "", en: "", ru: "", pl: "" },
//           },
//         ],
//       },
//     ]);
//   };

//   const removeCharacteristic = (index) => {
//     const updatedCharacteristics = [...formState[0].characteristics];
//     updatedCharacteristics.splice(index, 1);
//     setFormState([
//       { ...formState[0], characteristics: updatedCharacteristics },
//     ]);
//   };

//   if (loading) {
//     return <div>Завантаження...</div>;
//   }

//   return (
//     <div className={styles.wrapAllAdmin}>
//       <BackMenu />
//       {formState[0] && (
//         <div className={styles.wrapCategoryAdm}>
//           <h1>Редагувати продукт</h1>
//           <form onSubmit={handleSubmit} className={styles.productForm}>
//             {["ua", "en", "ru", "pl"].map((lang) => (
//               <div key={lang} className={styles.formGroup}>
//                 <label>Назва продукту ({lang.toUpperCase()})</label>
//                 <input
//                   type="text"
//                   value={formState[0]?.name?.[lang] || ""}
//                   onChange={(e) =>
//                     setFormState([
//                       {
//                         ...formState[0],
//                         name: { ...formState[0].name, [lang]: e.target.value },
//                       },
//                     ])
//                   }
//                   required
//                 />
//               </div>
//             ))}

//             {["ua", "en", "ru", "pl"].map((lang) => (
//               <div key={lang} className={styles.formGroup}>
//                 <label>Короткий опис ({lang.toUpperCase()})</label>
//                 <textarea
//                   value={formState[0]?.shortDescription?.[lang] || ""}
//                   onChange={(e) =>
//                     setFormState([
//                       {
//                         ...formState[0],
//                         shortDescription: {
//                           ...formState[0].shortDescription,
//                           [lang]: e.target.value,
//                         },
//                       },
//                     ])
//                   }
//                 />
//               </div>
//             ))}

//             {["ua", "en", "ru", "pl"].map((lang) => (
//               <div key={lang} className={styles.formGroup}>
//                 <label className={styles.longDescriptions}>
//                   Довгий опис ({lang.toUpperCase()})
//                 </label>
//                 <ReactQuill
//                   className={styles.bigDescriptino}
//                   value={formState[0]?.longDescription?.[lang] || ""}
//                   onChange={(value) =>
//                     setFormState([
//                       {
//                         ...formState[0],
//                         longDescription: {
//                           ...formState[0].longDescription,
//                           [lang]: value,
//                         },
//                       },
//                     ])
//                   }
//                   theme="snow"
//                 />
//               </div>
//             ))}

//             {["ua", "en", "ru", "pl"].map((lang) => (
//               <div key={lang} className={styles.formGroupSeo}>
//                 <label>SEO Title ({lang.toUpperCase()})</label>
//                 <input
//                   type="text"
//                   value={formState[0]?.seotitle?.[lang] || ""}
//                   onChange={(e) =>
//                     setFormState([
//                       {
//                         ...formState[0],
//                         seotitle: {
//                           ...formState[0].seotitle,
//                           [lang]: e.target.value,
//                         },
//                       },
//                     ])
//                   }
//                 />
//               </div>
//             ))}

//             {["ua", "en", "ru", "pl"].map((lang) => (
//               <div key={lang} className={styles.formGroup}>
//                 <label>SEO Опис ({lang.toUpperCase()})</label>
//                 <textarea
//                   value={formState[0]?.seodescriptions?.[lang] || ""}
//                   onChange={(e) =>
//                     setFormState([
//                       {
//                         ...formState[0],
//                         seodescriptions: {
//                           ...formState[0].seodescriptions,
//                           [lang]: e.target.value,
//                         },
//                       },
//                     ])
//                   }
//                 />
//               </div>
//             ))}

//             <div className={styles.formGroup}>
//               <label>Зображення продукту (URL або файл)</label>
//               <input type="file" multiple onChange={handleImageChange} />
//               {formState[0].images && formState[0].images.length > 0 && (
//                 <ul>
//                   {formState[0].images.map((image, index) => (
//                     <li key={index}>
//                       {image.name || image}
//                       <button type="button" onClick={() => removeImage(index)}>
//                         Видалити
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className={styles.formGroup}>
//               <label>Файл 3D моделі (URL або файл)</label>
//               <input type="file" onChange={handle3DModelChange} />
//               {formState[0].model3dFile && (
//                 <div>
//                   <span>{formState[0].model3dFile.name}</span>
//                   <button type="button" onClick={remove3DModel}>
//                     Видалити файл
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className={styles.formGroup}>
//               <label>Категорія</label>
//               <select
//                 value={formState[0].category}
//                 onChange={(e) => {
//                   const selectedCategory = categories.find(
//                     (category) => category._id === e.target.value
//                   );
//                   if (selectedCategory) {
//                     setFormState([
//                       {
//                         ...formState[0],
//                         category: selectedCategory._id,
//                       },
//                     ]);
//                   }
//                 }}
//                 required
//               >
//                 <option value="">Оберіть категорію</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name.ua}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label>Характеристики</label>
//               {formState[0].characteristics &&
//                 formState[0].characteristics.map((characteristic, index) => (
//                   <div key={index} className={styles.characteristicRow}>
//                     {["ua", "en", "ru", "pl"].map((lang) => (
//                       <div key={lang}>
//                         <label>
//                           Назва характеристики ({lang.toUpperCase()})
//                         </label>
//                         <input
//                           type="text"
//                           placeholder={`Назва характеристики (${lang.toUpperCase()})`}
//                           value={characteristic.title[lang]}
//                           onChange={(e) =>
//                             handleCharacteristicChange(
//                               index,
//                               "title",
//                               lang,
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => removeCharacteristic(index)}
//                     >
//                       Видалити характеристику
//                     </button>
//                   </div>
//                 ))}
//               <button type="button" onClick={addCharacteristic}>
//                 Додати характеристику
//               </button>
//             </div>

//             <div className={styles.formGroup}>
//               <label>Посилання на YouTube відео</label>
//               <input
//                 type="text"
//                 value={formState[0].videoUrl}
//                 onChange={(e) =>
//                   setFormState([{ ...formState[0], videoUrl: e.target.value }])
//                 }
//               />
//             </div>

//             <button type="submit">Оновити продукт</button>
//           </form>
//         </div>
//       )}
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
  });
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
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

  const handle3DModelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, model3dFile: file });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formState.images];
    updatedImages.splice(index, 1);
    setFormState({ ...formState, images: updatedImages });
  };

  const remove3DModel = () => {
    setFormState({ ...formState, model3dFile: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Завантаження продукту...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("name", JSON.stringify(formState.name));
      formData.append(
        "shortDescription",
        JSON.stringify(formState.shortDescription)
      );
      formData.append(
        "longDescription",
        JSON.stringify(formState.longDescription)
      );
      formData.append("seotitle", JSON.stringify(formState.seotitle));
      formData.append(
        "seodescriptions",
        JSON.stringify(formState.seodescriptions)
      );
      formData.append("videoUrl", formState.videoUrl);
      formData.append("category", formState.category);

      formState.images.forEach((file) => {
        formData.append("images", file);
      });

      if (formState.model3dFile) {
        formData.append("model3dFile", formState.model3dFile);
      }

      formData.append(
        "characteristics",
        JSON.stringify(formState.characteristics)
      );

      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Продукт додано!",
        text: "Новий продукт успішно доданий.",
      });

      router.push("/admin/products/list");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час додавання продукту.",
      });
    }
  };

  const handleCharacteristicChange = (index, lang, value) => {
    const updatedCharacteristics = [...formState.characteristics];
    updatedCharacteristics[index].title[lang] = value;
    setFormState({ ...formState, characteristics: updatedCharacteristics });
  };

  const addCharacteristic = () => {
    setFormState({
      ...formState,
      characteristics: [
        ...formState.characteristics,
        { title: { ua: "", en: "", ru: "", pl: "" } },
      ],
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
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Назва продукту ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState.name[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: { ...formState.name, [lang]: e.target.value },
                  })
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
                value={formState.shortDescription[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    shortDescription: {
                      ...formState.shortDescription,
                      [lang]: e.target.value,
                    },
                  })
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
                value={formState.longDescription[lang]}
                onChange={(value) =>
                  setFormState({
                    ...formState,
                    longDescription: {
                      ...formState.longDescription,
                      [lang]: value,
                    },
                  })
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
                value={formState.seotitle[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    seotitle: { ...formState.seotitle, [lang]: e.target.value },
                  })
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
                value={formState.seodescriptions[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    seodescriptions: {
                      ...formState.seodescriptions,
                      [lang]: e.target.value,
                    },
                  })
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
            <label className={styles.productLabel}>Файл 3D моделі</label>
            <input
              type="file"
              className={styles.productFileInput}
              onChange={handle3DModelChange}
            />
            {formState.model3dFile && (
              <div className={styles.modelFile}>
                <span>{formState.model3dFile.name}</span>
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
              value={formState.category}
              onChange={(e) =>
                setFormState({ ...formState, category: e.target.value })
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
            {formState.characteristics.map((characteristic, index) => (
              <div key={index} className={styles.characteristicRow}>
                {["ua", "en", "ru", "pl"].map((lang) => (
                  <div key={lang} className={styles.characteristicInput}>
                    <label>Назва характеристики ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      className={styles.productInput}
                      value={characteristic.title[lang]}
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
              value={formState.videoUrl}
              onChange={(e) =>
                setFormState({ ...formState, videoUrl: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Додати продукт
          </button>
        </form>
      </div>
    </div>
  );
}
