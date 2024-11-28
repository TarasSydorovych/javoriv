export const config = {
  api: {
    bodyParser: false, // Забороняємо стандартний парсер
    sizeLimit: "100mb", // Збільшуємо обмеження на розмір запиту
  },
};

import { mongooseConnect } from "../../lib/mongoose";
import Blog from "../../models/Blog";
import formidable from "formidable";
import path from "path";

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
    const { id } = req.query;
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, error: "Блог не знайдено" });
      }
      res.status(200).json({ success: true, data: blog });
    } else {
      const blogs = await Blog.find();
      res.status(200).json({ success: true, data: blogs });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при отриманні блогів" });
  }
}

async function handlePostRequest(req, res) {
  try {
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50 MB
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Обробка полів
    const title = fields.title?.toString();
    const seotitle = fields.seotitle?.toString();
    const seodescription = fields.seodescription?.toString();
    const shortDescription = fields.shortDescription?.toString();
    const longDescription = fields.longDescription?.toString();

    // Обробка фото
    const photos = [];
    if (files.photos) {
      const photoFiles = Array.isArray(files.photos)
        ? files.photos
        : [files.photos];
      photoFiles.forEach((file) => {
        photos.push(`/uploads/${path.basename(file.filepath)}`);
      });
    }

    const newBlog = new Blog({
      title,
      seotitle,
      seodescription,
      shortDescription,
      longDescription,
      photos,
    });

    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Error while creating blog:", error);
    res
      .status(500)
      .json({ success: false, error: "Помилка при створенні блогу" });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50 MB
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Обробка полів
    const title = fields.title?.toString();
    const seotitle = fields.seotitle?.toString();
    const seodescription = fields.seodescription?.toString();
    const shortDescription = fields.shortDescription?.toString();
    const longDescription = fields.longDescription?.toString();

    // Обробка фото
    const photos = [];
    if (files.photos) {
      const photoFiles = Array.isArray(files.photos)
        ? files.photos
        : [files.photos];
      photoFiles.forEach((file) => {
        photos.push(`/uploads/${path.basename(file.filepath)}`);
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        seotitle,
        seodescription,
        shortDescription,
        longDescription,
        photos: photos.length > 0 ? photos : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, error: "Блог не знайдено" });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error while updating blog:", error);
    res
      .status(500)
      .json({ success: false, error: "Помилка при оновленні блогу" });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, error: "Блог не знайдено для видалення" });
    }

    res.status(200).json({ success: true, message: "Блог видалено успішно" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при видаленні блогу" });
  }
}
