// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import css from "../admin.module.css";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// // Динамічне завантаження React Quill
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // Налаштування інструментів панелі
// const modules = {
//   toolbar: [
//     [{ header: [2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "list",
//   "bullet",
//   "link",
//   "image",
// ];

// export default function CategoryForm({
//   selectedCategory,
//   fetchCategories,
//   clearSelection,
//   categories = [], // Список категорій для вибору батьківської
// }) {
//   // Ініціалізація стану форми
//   const [formState, setFormState] = useState({
//     name: { ua: "", en: "", ru: "", pl: "" },
//     parent: "",
//     properties: [],
//     shorttitle: { ua: "", en: "", ru: "", pl: "" },
//     longdesc: { ua: "", en: "", ru: "", pl: "" }, // Довгий опис з підтримкою HTML
//     seotitle: { ua: "", en: "", ru: "", pl: "" },
//     ceodescriptions: { ua: "", en: "", ru: "", pl: "" },
//     image: "",
//   });

//   // Оновлення стану форми при виборі категорії
//   useEffect(() => {
//     if (selectedCategory) {
//       setFormState({
//         name: selectedCategory.name || { ua: "", en: "", ru: "", pl: "" },
//         parent: selectedCategory.parent?._id || "",
//         properties: selectedCategory.properties || [],
//         shorttitle: selectedCategory.shorttitle || {
//           ua: "",
//           en: "",
//           ru: "",
//           pl: "",
//         },
//         longdesc: selectedCategory.longdesc || {
//           ua: "",
//           en: "",
//           ru: "",
//           pl: "",
//         },
//         seotitle: selectedCategory.seotitle || {
//           ua: "",
//           en: "",
//           ru: "",
//           pl: "",
//         },
//         ceodescriptions: selectedCategory.ceodescriptions || {
//           ua: "",
//           en: "",
//           ru: "",
//           pl: "",
//         },
//         image: selectedCategory.image || "",
//       });
//     }
//   }, [selectedCategory]);

//   // Очищення форми
//   const resetForm = () => {
//     setFormState({
//       name: { ua: "", en: "", ru: "", pl: "" },
//       parent: "",
//       properties: [],
//       shorttitle: { ua: "", en: "", ru: "", pl: "" },
//       longdesc: { ua: "", en: "", ru: "", pl: "" },
//       seotitle: { ua: "", en: "", ru: "", pl: "" },
//       ceodescriptions: { ua: "", en: "", ru: "", pl: "" },
//       image: "",
//     });
//   };

//   // Обробка змін в полі `longdesc` з перевіркою на дублювання значення
//   const handleLongDescChange = useCallback(
//     (lang, value) => {
//       if (formState.longdesc[lang] !== value) {
//         setFormState((prevState) => ({
//           ...prevState,
//           longdesc: { ...prevState.longdesc, [lang]: value },
//         }));
//       }
//     },
//     [formState.longdesc]
//   );

//   // Обробка сабміту форми
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedCategory) {
//         await axios.put(`/api/category?id=${selectedCategory._id}`, formState);
//         Swal.fire({
//           icon: "success",
//           title: "Категорія оновлена!",
//           text: "Категорію успішно оновлено.",
//         });
//       } else {
//         await axios.post("/api/category", formState);
//         Swal.fire({
//           icon: "success",
//           title: "Категорія додана!",
//           text: "Нова категорія успішно додана.",
//         });
//       }
//       clearSelection();
//       fetchCategories(); // Оновлення списку категорій після збереження
//       resetForm(); // Очищення форми після сабміту
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка під час збереження категорії.",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={css.formWrapCat}>
//       {/* Назва категорії на різних мовах */}
//       <div className={css.wrapOneMenuLinkf}>
//         {["ua", "en", "ru", "pl"].map((lang) => (
//           <div key={lang} className={css.labelWithNameCat}>
//             <label className={css.catLabel}>
//               Назва категорії ({lang.toUpperCase()})
//             </label>
//             <input
//               type="text"
//               className={css.inputInCate}
//               value={formState.name[lang]}
//               onChange={(e) =>
//                 setFormState({
//                   ...formState,
//                   name: { ...formState.name, [lang]: e.target.value },
//                 })
//               }
//               required
//             />
//           </div>
//         ))}
//       </div>

//       {/* Вибір батьківської категорії */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Батьківська категорія</label>
//         <select
//           className={css.inputInCate}
//           value={formState.parent}
//           onChange={(e) =>
//             setFormState({ ...formState, parent: e.target.value })
//           }
//         >
//           <option value="">Без батьківської категорії</option>
//           {categories && categories.length > 0 ? (
//             categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name.ua}
//               </option>
//             ))
//           ) : (
//             <option disabled>Завантаження категорій...</option>
//           )}
//         </select>
//       </div>

//       {/* Довгий опис з підтримкою HTML для кожної мови */}
//       <div className={css.wrapOneMenuLinkf}>
//         {["ua", "en", "ru", "pl"].map((lang) => (
//           <div key={lang} className={css.labelWithNameCatWith}>
//             <label className={css.catLabel}>
//               Довгий опис ({lang.toUpperCase()})
//             </label>
//             <ReactQuill
//               className={css.reacrQilrddf}
//               theme="snow"
//               value={formState.longdesc[lang]}
//               onChange={(value) => handleLongDescChange(lang, value)}
//               modules={modules}
//               formats={formats}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Short Title на різних мовах */}
//       <div className={css.wrapOneMenuLinkf}>
//         {["ua", "en", "ru", "pl"].map((lang) => (
//           <div key={lang} className={css.labelWithNameCat}>
//             <label className={css.catLabel}>
//               Короткий заголовок ({lang.toUpperCase()})
//             </label>
//             <input
//               type="text"
//               className={css.inputInCate}
//               value={formState.shorttitle[lang]}
//               onChange={(e) =>
//                 setFormState({
//                   ...formState,
//                   shorttitle: {
//                     ...formState.shorttitle,
//                     [lang]: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* SEO Title на різних мовах */}
//       <div className={css.wrapOneMenuLinkf}>
//         {["ua", "en", "ru", "pl"].map((lang) => (
//           <div key={lang} className={css.labelWithNameCat}>
//             <label className={css.catLabel}>
//               SEO заголовок ({lang.toUpperCase()})
//             </label>
//             <input
//               type="text"
//               className={css.inputInCate}
//               value={formState.seotitle[lang]}
//               onChange={(e) =>
//                 setFormState({
//                   ...formState,
//                   seotitle: { ...formState.seotitle, [lang]: e.target.value },
//                 })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* SEO Description на різних мовах */}
//       <div className={css.wrapOneMenuLinkf}>
//         {["ua", "en", "ru", "pl"].map((lang) => (
//           <div key={lang} className={css.labelWithNameCat}>
//             <label className={css.catLabel}>
//               SEO опис ({lang.toUpperCase()})
//             </label>
//             <textarea
//               className={css.textAreaInCate}
//               value={formState.ceodescriptions[lang]}
//               onChange={(e) =>
//                 setFormState({
//                   ...formState,
//                   ceodescriptions: {
//                     ...formState.ceodescriptions,
//                     [lang]: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* Поле для зображення */}
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>URL зображення</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.image}
//           onChange={(e) =>
//             setFormState({ ...formState, image: e.target.value })
//           }
//         />
//       </div>

//       <button type="submit" className={css.submitBtn}>
//         {selectedCategory ? "Оновити категорію" : "Додати категорію"}
//       </button>
//     </form>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import css from "../admin.module.css";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "unordered" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "ordered", // замість "list"
  "unordered", // замість "bullet"
  "link",
  "image",
];

export default function CategoryForm({
  selectedCategory,
  fetchCategories,
  clearSelection,
  categories = [],
}) {
  const [formState, setFormState] = useState({
    name: "",
    parent: "",
    properties: [],
    shorttitle: "",
    longdesc: "",
    seotitle: "",
    seodescription: "",
    image: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormState({
        name: selectedCategory.name || "",
        parent: selectedCategory.parent?._id || "",
        properties: selectedCategory.properties || [],
        shorttitle: selectedCategory.shorttitle || "",
        longdesc: selectedCategory.longdesc || "",
        seotitle: selectedCategory.seotitle || "",
        seodescription: selectedCategory.seodescription || "",
        image: selectedCategory.image || "",
      });
    }
  }, [selectedCategory]);

  const resetForm = () => {
    setFormState({
      name: "",
      parent: "",
      properties: [],
      shorttitle: "",
      longdesc: "",
      seotitle: "",
      seodescription: "",
      image: "",
    });
  };

  const handleLongDescChange = useCallback((value) => {
    setFormState((prevState) => ({
      ...prevState,
      longdesc: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await axios.put(`/api/category?id=${selectedCategory._id}`, formState);
        Swal.fire({
          icon: "success",
          title: "Категорія оновлена!",
          text: "Категорію успішно оновлено.",
        });
      } else {
        await axios.post("/api/category", formState);
        Swal.fire({
          icon: "success",
          title: "Категорія додана!",
          text: "Нова категорія успішно додана.",
        });
      }
      clearSelection();
      fetchCategories();
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час збереження категорії.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formWrapCat}>
      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Назва категорії</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          required
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Батьківська категорія</label>
        <select
          className={css.inputInCate}
          value={formState.parent}
          onChange={(e) =>
            setFormState({ ...formState, parent: e.target.value })
          }
        >
          <option value="">Без батьківської категорії</option>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>Завантаження категорій...</option>
          )}
        </select>
      </div>

      <div className={css.labelWithNameCatWith}>
        <label className={css.catLabel}>Довгий опис</label>
        <ReactQuill
          className={css.reacrQilrddf}
          theme="snow"
          value={formState.longdesc}
          onChange={handleLongDescChange}
          modules={modules}
          formats={formats}
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>Короткий заголовок</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.shorttitle}
          onChange={(e) =>
            setFormState({ ...formState, shorttitle: e.target.value })
          }
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>SEO заголовок</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.seotitle}
          onChange={(e) =>
            setFormState({ ...formState, seotitle: e.target.value })
          }
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>SEO опис</label>
        <textarea
          className={css.textAreaInCate}
          value={formState.seodescription}
          onChange={(e) =>
            setFormState({ ...formState, seodescription: e.target.value })
          }
        />
      </div>

      <div className={css.labelWithNameCat}>
        <label className={css.catLabel}>URL зображення</label>
        <input
          type="text"
          className={css.inputInCate}
          value={formState.image}
          onChange={(e) =>
            setFormState({ ...formState, image: e.target.value })
          }
        />
      </div>

      <button type="submit" className={css.submitBtn}>
        {selectedCategory ? "Оновити категорію" : "Додати категорію"}
      </button>
    </form>
  );
}
