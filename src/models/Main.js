import mongoose from "mongoose";

const MainSchema = new mongoose.Schema({
  vartistmetra: { type: Number, required: true }, // Вартість метра
  kilkistkvartur: { type: Number, required: true }, // Кількість квартир
  parkomista: { type: Number, required: true }, // Паркомісця
  officeprem: { type: String, required: true }, // Офісні приміщення
});

export const Main = mongoose.models.Main || mongoose.model("Main", MainSchema);
