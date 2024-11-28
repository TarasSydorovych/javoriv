// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import css from "../admin.module.css";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
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
//   categories = [],
// }) {
//   const [formState, setFormState] = useState({
//     name: "",
//     parent: "",
//     properties: [],
//     shorttitle: "",
//     longdesc: "",
//     seotitle: "",
//     ceodescription: "",
//     image: "",
//   });

//   useEffect(() => {
//     if (selectedCategory) {
//       setFormState({
//         name: selectedCategory.name || "",
//         parent: selectedCategory.parent?._id || "",
//         properties: selectedCategory.properties || [],
//         shorttitle: selectedCategory.shorttitle || "",
//         longdesc: selectedCategory.longdesc || "",
//         seotitle: selectedCategory.seotitle || "",
//         ceodescription: selectedCategory.ceodescription || "",
//         image: selectedCategory.image || "",
//       });
//     }
//   }, [selectedCategory]);

//   const resetForm = () => {
//     setFormState({
//       name: "",
//       parent: "",
//       properties: [],
//       shorttitle: "",
//       longdesc: "",
//       seotitle: "",
//       ceodescription: "",
//       image: "",
//     });
//   };

//   const handleLongDescChange = useCallback((value) => {
//     setFormState((prevState) => ({
//       ...prevState,
//       longdesc: value,
//     }));
//   }, []);

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
//       fetchCategories();
//       resetForm();
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
//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Назва категорії</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.name}
//           onChange={(e) => setFormState({ ...formState, name: e.target.value })}
//           required
//         />
//       </div>

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
//                 {category.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>Завантаження категорій...</option>
//           )}
//         </select>
//       </div>

//       <div className={css.labelWithNameCatWith}>
//         <label className={css.catLabel}>Довгий опис</label>
//         <ReactQuill
//           className={css.reacrQilrddf}
//           theme="snow"
//           value={formState.longdesc}
//           onChange={handleLongDescChange}
//           modules={modules}
//           formats={formats}
//         />
//       </div>

//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>Короткий заголовок</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.shorttitle}
//           onChange={(e) =>
//             setFormState({ ...formState, shorttitle: e.target.value })
//           }
//         />
//       </div>

//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>SEO заголовок</label>
//         <input
//           type="text"
//           className={css.inputInCate}
//           value={formState.seotitle}
//           onChange={(e) =>
//             setFormState({ ...formState, seotitle: e.target.value })
//           }
//         />
//       </div>

//       <div className={css.labelWithNameCat}>
//         <label className={css.catLabel}>SEO опис</label>
//         <textarea
//           className={css.textAreaInCate}
//           value={formState.ceodescription}
//           onChange={(e) =>
//             setFormState({ ...formState, ceodescription: e.target.value })
//           }
//         />
//       </div>

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
"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import css from "../admin.module.css";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
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

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
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
    seodescription: "", // Виправлено на правильну назву
    image: "",
  });

  // Заповнення форми у випадку редагування
  useEffect(() => {
    if (selectedCategory) {
      console.log("selectedCategory", selectedCategory);

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

  // Скидання форми
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

  // Зміна довгого опису
  const handleLongDescChange = useCallback((value) => {
    setFormState((prevState) => ({
      ...prevState,
      longdesc: value,
    }));
  }, []);

  // Надсилання форми
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formState };

      // Видаляємо поле parent, якщо воно пусте
      if (!payload.parent) {
        delete payload.parent;
      }
      console.log("payload", payload);

      // Якщо поле ceodescription або longdesc порожнє, задаємо дефолтне значення
      payload.seodescription = payload.seodescription || "";
      payload.longdesc = payload.longdesc || "";

      if (selectedCategory) {
        await axios.put(`/api/category?id=${selectedCategory._id}`, payload);
        Swal.fire({
          icon: "success",
          title: "Категорія оновлена!",
          text: "Категорію успішно оновлено.",
        });
      } else {
        await axios.post("/api/category", payload);
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
      console.error("Error saving category:", error);
    }
  };
  console.log("formState", formState);

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
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
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
          value={formState.seodescription} // Використовується правильна назва
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
