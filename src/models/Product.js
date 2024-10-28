import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    ua: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true },
    pl: { type: String, required: true },
  }, // Назва товару на 4 мовах (обов'язкове поле)

  shortDescription: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  }, // Короткий опис на 4 мовах (необов'язкове)

  longDescription: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  }, // Довгий опис на 4 мовах (необов'язкове)

  seotitle: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  }, // SEO Title на 4 мовах

  seodescriptions: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  }, // SEO Опис на 4 мовах

  seoText: {
    ua: { type: String },
    en: { type: String },
    ru: { type: String },
    pl: { type: String },
  }, // SEO текст на 4 мовах (необов'язкове)

  images: [{ type: String }], // Масив зображень (необов'язкове)

  characteristics: [
    {
      title: {
        ua: { type: String },
        en: { type: String },
        ru: { type: String },
        pl: { type: String },
      }, // Назва характеристики на 4 мовах (необов'язкове)
    },
  ], // Масив характеристик з багатомовною підтримкою (необов'язкове)

  videoUrl: { type: String }, // Посилання на YouTube відео (необов'язкове)

  model3dFile: { type: String }, // Посилання на файл 3D моделі (необов'язкове)

  category: { type: mongoose.Types.ObjectId, ref: "Category" }, // Зв'язок з категорією (необов'язкове)
});

export const Product = models?.Product || model("Product", ProductSchema);
