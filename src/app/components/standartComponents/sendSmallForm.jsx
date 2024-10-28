"use client";
import css from "./sendSmallForm.module.css";
import { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const SendSmallForm = ({ t, lng }) => {
  const form = useRef();

  const validatePhoneNumber = (phone) => {
    // Валідація телефону: лише цифри, + і -
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const phone = formData.get("phone");

    if (!validatePhoneNumber(phone)) {
      Swal.fire({
        title: "Помилка",
        text: "Введіть коректний номер телефону",
        icon: "error",
        confirmButtonText: "ОК",
      });
      return;
    }

    emailjs
      .sendForm(
        "your_service_id", // Вкажи свій service_id
        "your_template_id", // Вкажи свій template_id
        form.current,
        "your_user_id" // Вкажи свій user_id
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            title: "Успішно!",
            text: "Ваше повідомлення було відправлено.",
            icon: "success",
            confirmButtonText: "ОК",
          });
          form.current.reset(); // Очищення форми після успішної відправки
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            title: "Помилка",
            text: "Не вдалося відправити повідомлення. Спробуйте пізніше.",
            icon: "error",
            confirmButtonText: "ОК",
          });
        }
      );
  };

  return (
    <div className={css.wrapSmallForm}>
      <p className={css.pInSmallForm}>Зв'яжіться з нами</p>

      <form ref={form} onSubmit={sendEmail} className={css.form}>
        <input
          type="text"
          name="name"
          placeholder="Імʼя"
          className={css.inputField}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          className={css.inputField}
          required
        />
        <button type="submit" className={css.submitButton}>
          Відправити
        </button>
      </form>
    </div>
  );
};

export default SendSmallForm;
