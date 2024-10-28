import { mongooseConnect } from "../../lib/mongoose";
import { Category } from "../../models/Category";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      await handleGetRequest(req, res);
      break;

    case "POST":
      await handlePostRequest(req, res);
      break;

    case "PUT":
      await handlePutRequest(req, res);
      break;

    case "DELETE":
      await handleDeleteRequest(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Метод ${method} не дозволений`);
      console.log(`Метод ${method} не дозволений`);
      break;
  }
}

async function handleGetRequest(req, res) {
  try {
    const { id } = req.query;
    if (id) {
      console.log(`Отримання категорії за ID: ${id}`);
      const category = await Category.findById(id).populate("parent");
      if (!category) {
        console.log(`Категорію з ID: ${id} не знайдено`);
        return res.status(404).json({ message: "Категорія не знайдена" });
      }
      res.status(200).json(category);
    } else {
      console.log("Отримання всіх категорій");
      const categories = await Category.find().populate("parent");
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error("Помилка при отриманні категорій:", error);
    res.status(500).json({ message: "Помилка при отриманні категорій", error });
  }
}

async function handlePostRequest(req, res) {
  try {
    const {
      name,
      parent,
      properties,
      shorttitle,
      longdesc,
      seotitle,
      seodescription,
      image,
    } = req.body;

    const parentCategory = parent
      ? mongoose.Types.ObjectId.isValid(parent)
        ? parent
        : null
      : null;

    console.log("Додавання нової категорії:", name, "Parent:", parentCategory);

    const category = new Category({
      name,
      parent: parentCategory,
      properties,
      shorttitle,
      longdesc,
      seotitle,
      seodescription,
      image,
    });

    await category.save();
    console.log("Категорію успішно додано:", category);
    res.status(201).json(category);
  } catch (error) {
    console.error("Помилка при створенні категорії:", error);
    res.status(500).json({ message: "Помилка при створенні категорії", error });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const {
      name,
      parent,
      properties,
      shorttitle,
      longdesc,
      seotitle,
      seodescription,
      image,
    } = req.body;

    const parentCategory = parent
      ? mongoose.Types.ObjectId.isValid(parent)
        ? parent
        : null
      : null;

    console.log(`Оновлення категорії з ID: ${id}`);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        parent: parentCategory,
        properties,
        shorttitle,
        longdesc,
        seotitle,
        seodescription,
        image,
      },
      { new: true }
    );

    if (!updatedCategory) {
      console.log(`Категорію з ID: ${id} не знайдено`);
      return res.status(404).json({ message: "Категорія не знайдена" });
    }

    console.log("Категорію успішно оновлено:", updatedCategory);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Помилка при оновленні категорії:", error);
    res.status(500).json({ message: "Помилка при оновленні категорії", error });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    console.log(`Видалення категорії з ID: ${id}`);

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      console.log(`Категорію з ID: ${id} не знайдено`);
      return res.status(404).json({ message: "Категорія не знайдена" });
    }

    console.log("Категорію успішно видалено");
    res.status(204).send();
  } catch (error) {
    console.error("Помилка при видаленні категорії:", error);
    res.status(500).json({ message: "Помилка при видаленні категорії", error });
  }
}
