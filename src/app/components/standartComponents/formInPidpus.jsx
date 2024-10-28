"use client";
import { useState } from "react";
import css from "./standart.module.css";
const FormInPidpus = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={css.wrapFormSubscribe}>
      <input
        className={css.emailAgro}
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={css.sendButtonSub}>Відправити</div>
    </div>
  );
};
export default FormInPidpus;
