// "use client";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import css from "./main.module.css";
// import { AiOutlineClose } from "react-icons/ai";

// const ButtonWithPop = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleButtonClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleSubmit = (event) => {
//     // Додай це для перевірки

//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const name = formData.get("name");
//     const phone = formData.get("phone");

//     // Тут можна додати логіку відправки даних на сервер або інші дії
//     console.log(`Ім'я: ${name}, Телефон: ${phone}`);

//     // Показуємо повідомлення про успішну відправку
//     Swal.fire({
//       title: "Успішно!",
//       text: "Ваше повідомлення було відправлено.",
//       icon: "success",
//       confirmButtonText: "ОК",
//     });

//     setIsPopupOpen(false); // Закриваємо попап після відправки форми
//   };

//   return (
//     <div className={css.wrapInPop}>
//       <button onClick={handleButtonClick} className={css.button}>
//         Отримати пропозицію
//       </button>

//       {isPopupOpen && (
//         <div className={css.popupOverlay}>
//           <div className={css.popupContent}>
//             <AiOutlineClose
//               onClick={handleClosePopup}
//               className={css.closeButton}
//             />

//             <form onSubmit={handleSubmit} className={css.wrapFormPopUp}>
//               <label htmlFor="name" className={css.nameIdL}>
//                 Ім'я:
//               </label>
//               <input
//                 className={css.inputPopUpIn}
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//               />

//               <label htmlFor="phone" className={css.nameIdL}>
//                 Номер телефону:
//               </label>
//               <input
//                 className={css.inputPopUpIn}
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder="093 - 000 - 00 - 00"
//                 required
//               />

//               <button type="submit" className={css.submitButton}>
//                 Відправити
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ButtonWithPop;
"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import css from "./main.module.css";
import { AiOutlineClose } from "react-icons/ai";
import emailjs from "@emailjs/browser";

const ButtonWithPop = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Збираємо дані з форми
    const formData = new FormData(event.target);
    const from_name = formData.get("name"); // Ім'я користувача
    const phone = formData.get("phone"); // Телефон користувача

    // Відправка даних через Email.js
    emailjs
      .send(
        "service_g65pywa", // ID вашого сервісу
        "template_lg8bpfh", // ID вашого шаблону
        { from_name, phone }, // Дані, які передаються у шаблон
        "mpWM3rXU3j_5Wauio" // Ваш User ID з Email.js
      )
      .then(
        (response) => {
          // Повідомлення про успіх
          Swal.fire({
            title: "Успішно!",
            text: "Ваше повідомлення було відправлено.",
            icon: "success",
            confirmButtonText: "ОК",
          });
          setIsPopupOpen(false); // Закриваємо попап після відправки
        },
        (error) => {
          // Повідомлення про помилку
          Swal.fire({
            title: "Помилка!",
            text: "Щось пішло не так. Спробуйте ще раз.",
            icon: "error",
            confirmButtonText: "ОК",
          });
          console.error("Помилка:", error);
        }
      );
  };

  return (
    <div className={css.wrapInPop}>
      <button onClick={handleButtonClick} className={css.button}>
        Отримати пропозицію
      </button>

      {isPopupOpen && (
        <div className={css.popupOverlay}>
          <div className={css.popupContent}>
            <AiOutlineClose
              onClick={handleClosePopup}
              className={css.closeButton}
            />

            <form onSubmit={handleSubmit} className={css.wrapFormPopUp}>
              <label htmlFor="name" className={css.nameIdL}>
                Ім&apos;я:
              </label>
              <input
                className={css.inputPopUpIn}
                type="text"
                id="name"
                name="name"
                required
              />

              <label htmlFor="phone" className={css.nameIdL}>
                Номер телефону:
              </label>
              <input
                className={css.inputPopUpIn}
                type="tel"
                id="phone"
                name="phone"
                placeholder="093-000-00-00"
                required
              />

              <button type="submit" className={css.submitButton}>
                Відправити
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonWithPop;
