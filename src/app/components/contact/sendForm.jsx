// "use client";
// import { useState } from "react";
// import emailjs from "emailjs-com";
// import Swal from "sweetalert2";
// import css from "./contact.module.css";

// const SendForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Перевірка довжини номера телефону
//     if (formData.phone.length < 10) {
//       Swal.fire(
//         "Помилка",
//         "Будь ласка, введіть коректний номер телефону",
//         "error"
//       );
//       return;
//     }

//     emailjs
//       .send(
//         "your_service_id", // замініть на ваш service ID
//         "your_template_id", // замініть на ваш template ID
//         formData,
//         "your_user_id" // замініть на ваш user ID
//       )
//       .then(
//         (result) => {
//           Swal.fire(
//             "Успішно",
//             "Ваше повідомлення було відправлено!",
//             "success"
//           );
//           setFormData({ name: "", phone: "", message: "" }); // Очищення форми
//         },
//         (error) => {
//           console.error("Помилка при відправці:", error);
//           Swal.fire("Помилка", "Щось пішло не так, спробуйте ще раз", "error");
//         }
//       );
//   };

//   return (
//     <form onSubmit={handleSubmit} className={css.sendFormWrap}>
//       <div className={css.wrapWithLabel}>
//         <label className={css.labelInForm}>Імʼя</label>
//         <input
//           name="name"
//           className={css.input}
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className={css.wrapWithLabel}>
//         <label className={css.labelInForm}>Телефон</label>
//         <input
//           name="phone"
//           className={css.input}
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className={css.wrapWithLabel}>
//         <label className={css.labelInForm}>Повідомлення</label>
//         <textarea
//           name="message"
//           className={css.inputArea}
//           value={formData.message}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit" className={css.formSendButton}>
//         Відправити
//       </button>
//     </form>
//   );
// };

// export default SendForm;
"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import css from "./contact.module.css";

const SendForm = () => {
  const [formData, setFormData] = useState({
    from_name: "", // Відповідає полю "name"
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перевірка довжини номера телефону
    if (formData.phone.length < 10) {
      Swal.fire(
        "Помилка",
        "Будь ласка, введіть коректний номер телефону",
        "error"
      );
      return;
    }

    emailjs
      .send(
        "service_g65pywa", // Ваш service ID
        "template_lg8bpfh", // Ваш template ID
        formData, // Передача даних форми
        "mpWM3rXU3j_5Wauio" // Ваш User ID
      )
      .then(
        (result) => {
          Swal.fire(
            "Успішно",
            "Ваше повідомлення було відправлено!",
            "success"
          );
          setFormData({ from_name: "", phone: "", message: "" }); // Очищення форми
        },
        (error) => {
          console.error("Помилка при відправці:", error);
          Swal.fire("Помилка", "Щось пішло не так, спробуйте ще раз", "error");
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className={css.sendFormWrap}>
      <div className={css.wrapWithLabel}>
        <label className={css.labelInForm}>Імʼя</label>
        <input
          name="from_name" // Поле для імені користувача
          className={css.input}
          value={formData.from_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={css.wrapWithLabel}>
        <label className={css.labelInForm}>Телефон</label>
        <input
          name="phone" // Поле для телефону
          className={css.input}
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className={css.wrapWithLabel}>
        <label className={css.labelInForm}>Повідомлення</label>
        <textarea
          name="message" // Поле для повідомлення
          className={css.inputArea}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={css.formSendButton}>
        Відправити
      </button>
    </form>
  );
};

export default SendForm;
