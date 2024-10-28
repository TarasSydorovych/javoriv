import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";

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
      break;
  }
}

async function handleGetRequest(req, res) {
  try {
    const { categoryId } = req.query;
    if (categoryId) {
      const products = await Product.find({ category: categoryId });
      res.status(200).json(products);
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні товарів", error });
  }
}

async function handlePostRequest(req, res) {
  try {
    const {
      name,
      shortDescription,
      longDescription,
      seotitle,
      seodescriptions,
      seoText,
      images,
      characteristics,
      videoUrl,
      model3dFile,
      category,
    } = req.body;

    const product = new Product({
      name,
      shortDescription,
      longDescription,
      seotitle, // Додаємо поля SEO Title
      seodescriptions, // Додаємо поля SEO Опис
      seoText,
      images,
      characteristics,
      videoUrl,
      model3dFile,
      category,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).json({ message: "Помилка при створенні товару", error });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const {
      name,
      shortDescription,
      longDescription,
      seotitle,
      seodescriptions,
      seoText,
      images,
      characteristics,
      videoUrl,
      model3dFile,
      category,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        shortDescription,
        longDescription,
        seotitle, // Додаємо поля SEO Title
        seodescriptions, // Додаємо поля SEO Опис
        seoText,
        images,
        characteristics,
        videoUrl,
        model3dFile,
        category,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні товару", error });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    await Product.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні товару", error });
  }
}
