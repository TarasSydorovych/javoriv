import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true }, // Назва товару
  shortDescription: { type: String }, // Короткий опис
  longDescription: { type: String }, // Довгий опис
  seotitle: { type: String }, // SEO Title
  seodescriptions: { type: String }, // SEO Опис
  seoText: { type: String }, // SEO текст (необов'язкове)
  images: [{ type: String }], // Масив зображень (необов'язкове)
  characteristics: [
    {
      title: { type: String }, // Назва характеристики
      value: { type: String }, // Значення характеристики
    },
  ], // Масив характеристик
  videoUrl: { type: String }, // Посилання на YouTube відео (необов'язкове)
  model3dFile: { type: String }, // Посилання на файл 3D моделі (необов'язкове)
  category: { type: mongoose.Types.ObjectId, ref: "Category" }, // Зв'язок з категорією
});

export const Product = models?.Product || model("Product", ProductSchema);
