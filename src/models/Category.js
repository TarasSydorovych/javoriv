import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
  shorttitle: { type: String },
  longdesc: { type: String },
  seotitle: { type: String },
  seodescription: { type: String },
  image: { type: String },
});

export const Category = models?.Category || model("Category", CategorySchema);
