// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { storage } from "../../../../lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Swal from "sweetalert2";
// import dynamic from "next/dynamic";
// import css from "../../../components/admin/styles/addStyle.module.css";
// import BackMenu from "@/app/components/admin/backMenu";

// // Динамічний імпорт ReactQuill без SSR
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

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

// export default function AddWork() {
//   const [workData, setWorkData] = useState({
//     translations: {
//       en: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       pl: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       ru: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//       ua: {
//         title: "",
//         seotitle: "",
//         seodescription: "",
//         shortDescription: "",
//         longDescription: "",
//       },
//     },
//     videoId: "",
//     photos: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   const handleInputChange = (e, lang, field) => {
//     setWorkData({
//       ...workData,
//       translations: {
//         ...workData.translations,
//         [lang]: {
//           ...workData.translations[lang],
//           [field]: e.target.value,
//         },
//       },
//     });
//   };

//   const handleQuillChange = (value, lang) => {
//     setWorkData({
//       ...workData,
//       translations: {
//         ...workData.translations,
//         [lang]: {
//           ...workData.translations[lang],
//           longDescription: value,
//         },
//       },
//     });
//   };

//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);

//     setSelectedPhotos((prevPhotos) => [...prevPhotos, ...files]);
//     setWorkData((prevWorkData) => ({
//       ...prevWorkData,
//       photos: [...prevWorkData.photos, ...files],
//     }));
//   };

//   const handleRemovePhoto = (index) => {
//     setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
//     setWorkData((prevWorkData) => ({
//       ...prevWorkData,
//       photos: prevWorkData.photos.filter((_, i) => i !== index),
//     }));
//   };

//   const uploadPhotos = async (files) => {
//     const promises = files.map((file) => {
//       const storageRef = ref(storage, `blogs/${file.name}`);
//       return uploadBytes(storageRef, file).then(async (snapshot) => {
//         const downloadURL = await getDownloadURL(snapshot.ref);
//         return downloadURL;
//       });
//     });
//     return Promise.all(promises);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     Swal.fire({
//       title: "Завантаження...",
//       text: "Будь ласка, зачекайте, завантаження триває",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const photoURLs = await uploadPhotos(workData.photos);

//       const formData = {
//         translations: workData.translations,
//         videoId: workData.videoId,
//         photos: photoURLs,
//       };

//       await axios.post("/api/blogs", formData);

//       Swal.fire({
//         icon: "success",
//         title: "Успіх!",
//         text: "Робота успішно додана!",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка при додаванні роботи. Спробуйте ще раз.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={css.wrapAllAdmin}>
//       <BackMenu />
//       <div className={css.wrapCategoryAdm}>
//         <h1 className={css.enterH1}>Додати нову статтю</h1>
//         <form onSubmit={handleSubmit} className={css.productForm}>
//           {["en", "pl", "ru", "ua"].map((lang) => (
//             <div key={lang} className={css.formGroup}>
//               <h2 className={css.productLabel}>
//                 {lang === "en"
//                   ? "Англійська версія"
//                   : lang === "pl"
//                   ? "Польська версія"
//                   : lang === "ru"
//                   ? "Російська версія"
//                   : "Українська версія"}
//               </h2>
//               <input
//                 type="text"
//                 placeholder={`Title (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].title}
//                 onChange={(e) => handleInputChange(e, lang, "title")}
//                 required
//                 className={css.productInput}
//               />
//               <input
//                 type="text"
//                 placeholder={`SEO Title (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].seotitle}
//                 onChange={(e) => handleInputChange(e, lang, "seotitle")}
//                 required
//                 className={css.productInput}
//               />
//               <input
//                 type="text"
//                 placeholder={`SEO Description (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].seodescription}
//                 onChange={(e) => handleInputChange(e, lang, "seodescription")}
//                 required
//                 className={css.productInput}
//               />
//               <textarea
//                 placeholder={`Short Description (${lang.toUpperCase()})`}
//                 value={workData.translations[lang].shortDescription}
//                 onChange={(e) => handleInputChange(e, lang, "shortDescription")}
//                 required
//                 className={css.productTextarea}
//               />
//               <h3 className={css.productLabel}>
//                 Довгий опис ({lang.toUpperCase()})
//               </h3>
//               <ReactQuill
//                 className={css.productQuill}
//                 theme="snow"
//                 value={workData.translations[lang].longDescription}
//                 onChange={(value) => handleQuillChange(value, lang)}
//                 modules={modules}
//               />
//             </div>
//           ))}

//           <div className={css.formGroupFull}>
//             <h2 className={css.productLabel}>Додаткові дані</h2>
//             <input
//               type="text"
//               placeholder="Video ID"
//               value={workData.videoId}
//               onChange={(e) =>
//                 setWorkData({ ...workData, videoId: e.target.value })
//               }
//               required
//               className={css.productInput}
//             />

//             <h2 className={css.productLabel}>Фото</h2>
//             <input
//               type="file"
//               multiple
//               onChange={handlePhotoChange}
//               required
//               className={css.productFileInput}
//             />

//             <div className={css.selectedPhotosContainer}>
//               {selectedPhotos.map((photo, index) => (
//                 <div key={index} className={css.photoWrapper}>
//                   <img
//                     src={
//                       typeof photo === "string"
//                         ? photo
//                         : URL.createObjectURL(photo)
//                     }
//                     alt={`Selected ${index + 1}`}
//                     className={css.photoPreview}
//                   />
//                   <button
//                     type="button"
//                     className={css.deletePhotoButton}
//                     onClick={() => handleRemovePhoto(index)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button type="submit" disabled={loading} className={css.submitButton}>
//             {loading ? "Додавання..." : "Додати роботу"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import css from "../../../components/admin/styles/addStyle.module.css";
import BackMenu from "@/app/components/admin/backMenu";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function AddWork() {
  const [workData, setWorkData] = useState({
    title: "",
    seotitle: "",
    seodescription: "",
    shortDescription: "",
    longDescription: "",
    photos: [],
  });

  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleInputChange = (e, field) => {
    setWorkData({
      ...workData,
      [field]: e.target.value,
    });
  };

  const handleQuillChange = (value) => {
    setWorkData({
      ...workData,
      longDescription: value,
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedPhotos((prevPhotos) => [...prevPhotos, ...files]);
    setWorkData((prevWorkData) => ({
      ...prevWorkData,
      photos: [...prevWorkData.photos, ...files],
    }));
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setWorkData((prevWorkData) => ({
      ...prevWorkData,
      photos: prevWorkData.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Завантаження...",
      text: "Будь ласка, зачекайте, завантаження триває",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("title", workData.title);
      formData.append("seotitle", workData.seotitle);
      formData.append("seodescription", workData.seodescription);
      formData.append("shortDescription", workData.shortDescription);
      formData.append("longDescription", workData.longDescription);

      workData.photos.forEach((file) => {
        formData.append("photos", file);
      });

      await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Успіх!",
        text: "Стаття успішно додана!",
      });
    } catch (error) {
      console.error("Помилка:", error);
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка при додаванні статті. Спробуйте ще раз.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <div className={css.wrapCategoryAdm}>
        <h1 className={css.enterH1}>Додати нову статтю</h1>
        <form onSubmit={handleSubmit} className={css.productForm}>
          <div className={css.formGroup}>
            <input
              type="text"
              placeholder="Назва"
              value={workData.title}
              onChange={(e) => handleInputChange(e, "title")}
              required
              className={css.productInput}
            />
            <input
              type="text"
              placeholder="SEO Title"
              value={workData.seotitle}
              onChange={(e) => handleInputChange(e, "seotitle")}
              required
              className={css.productInput}
            />
            <input
              type="text"
              placeholder="SEO Description"
              value={workData.seodescription}
              onChange={(e) => handleInputChange(e, "seodescription")}
              required
              className={css.productInput}
            />
            <textarea
              placeholder="Короткий опис"
              value={workData.shortDescription}
              onChange={(e) => handleInputChange(e, "shortDescription")}
              required
              className={css.productTextarea}
            />
            <h3 className={css.productLabel}>Довгий опис</h3>
            <ReactQuill
              className={css.productQuill}
              theme="snow"
              value={workData.longDescription}
              onChange={handleQuillChange}
              modules={modules}
            />
          </div>

          <div className={css.formGroupFull}>
            <h2 className={css.productLabel}>Фото</h2>
            <input
              type="file"
              multiple
              onChange={handlePhotoChange}
              required
              className={css.productFileInput}
            />

            <div className={css.selectedPhotosContainer}>
              {selectedPhotos.map((photo, index) => (
                <div key={index} className={css.photoWrapper}>
                  <img
                    src={
                      typeof photo === "string"
                        ? photo
                        : URL.createObjectURL(photo)
                    }
                    alt={`Selected ${index + 1}`}
                    className={css.photoPreview}
                  />
                  <button
                    type="button"
                    className={css.deletePhotoButton}
                    onClick={() => handleRemovePhoto(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className={css.submitButton}>
            {loading ? "Додавання..." : "Додати статтю"}
          </button>
        </form>
      </div>
    </div>
  );
}
