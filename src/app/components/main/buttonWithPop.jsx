"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import css from "./main.module.css";
import { AiOutlineClose } from "react-icons/ai";

const ButtonWithPop = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    console.log("Кнопку натиснуто");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (event) => {
    // Додай це для перевірки

    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const phone = formData.get("phone");

    // Тут можна додати логіку відправки даних на сервер або інші дії
    console.log(`Ім'я: ${name}, Телефон: ${phone}`);

    // Показуємо повідомлення про успішну відправку
    Swal.fire({
      title: "Успішно!",
      text: "Ваше повідомлення було відправлено.",
      icon: "success",
      confirmButtonText: "ОК",
    });

    setIsPopupOpen(false); // Закриваємо попап після відправки форми
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
                Ім'я:
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
                placeholder="093 - 000 - 00 - 00"
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
