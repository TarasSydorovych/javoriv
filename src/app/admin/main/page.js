"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BackMenu from "@/app/components/admin/backMenu";
import css from "../../components/admin/admin.module.css";
export default function MainEditor() {
  const [formData, setFormData] = useState({
    vartistmetra: "",
    kilkistkvartur: "",
    parkomista: "",
    officeprem: "",
  });

  useEffect(() => {
    // Завантаження існуючих даних
    axios.get("/api/main").then((response) => {
      if (response.data) {
        setFormData(response.data);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/main", formData);
    alert("Дані оновлено!");
  };

  return (
    <div className={css.wrapAllAdmin}>
      <BackMenu />
      <form onSubmit={handleSubmit}>
        <div>
          <label className={css.someClasInM}>Вартість метра:</label>
          <input
            className={css.wrinput}
            type="number"
            name="vartistmetra"
            value={formData.vartistmetra}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={css.someClasInM}>Кількість квартир:</label>
          <input
            className={css.wrinput}
            type="number"
            name="kilkistkvartur"
            value={formData.kilkistkvartur}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={css.someClasInM}>Паркомісця:</label>
          <input
            className={css.wrinput}
            type="number"
            name="parkomista"
            value={formData.parkomista}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={css.someClasInM}>Офісні приміщення:</label>
          <input
            className={css.wrinput}
            type="text"
            name="officeprem"
            value={formData.officeprem}
            onChange={handleChange}
            required
          />
        </div>
        <button className={css.editButton} type="submit">
          Зберегти
        </button>
      </form>
    </div>
  );
}
