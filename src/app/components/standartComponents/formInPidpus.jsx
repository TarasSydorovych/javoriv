// "use client";
// import { useState } from "react";
// import css from "./standart.module.css";
// const FormInPidpus = () => {
//   const [email, setEmail] = useState("");
//   return (
//     <div className={css.wrapFormSubscribe}>
//       <input
//         className={css.emailAgro}
//         value={email}
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <div className={css.sendButtonSub}>Відправити</div>
//     </div>
//   );
// };
// export default FormInPidpus;
"use client";
import { useState } from "react";
import css from "./standart.module.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const FormInPidpus = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    // Перевірка на коректність email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = () => {
    if (!validateEmail(email)) {
      Swal.fire({
        title: "Помилка",
        text: "Введіть коректну email адресу",
        icon: "error",
        confirmButtonText: "ОК",
      });
      return;
    }

    // Використання Email.js для відправки email
    emailjs
      .send(
        "service_g65pywa", // ID вашого сервісу
        "template_lg8bpfh", // ID вашого шаблону
        { email }, // Дані, які передаються у шаблон
        "mpWM3rXU3j_5Wauio" // Ваш User ID з Email.js
      )
      .then(
        (response) => {
          Swal.fire({
            title: "Успішно!",
            text: "Ваш email було відправлено.",
            icon: "success",
            confirmButtonText: "ОК",
          });
          setEmail(""); // Очищення поля після успішної відправки
        },
        (error) => {
          Swal.fire({
            title: "Помилка",
            text: "Не вдалося відправити email. Спробуйте пізніше.",
            icon: "error",
            confirmButtonText: "ОК",
          });
          console.error("Помилка:", error);
        }
      );
  };

  return (
    <div className={css.wrapFormSubscribe}>
      <input
        className={css.emailAgro}
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={css.sendButtonSub} onClick={handleSendEmail}>
        Відправити
      </div>
    </div>
  );
};

export default FormInPidpus;
