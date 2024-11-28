// import { mongooseConnect } from "../../lib/mongoose";
// import { Product } from "../../models/Product";

// export default async function handler(req, res) {
//   await mongooseConnect();

//   const { method } = req;

//   switch (method) {
//     case "GET":
//       await handleGetRequest(req, res);
//       break;
//     case "POST":
//       await handlePostRequest(req, res);
//       break;
//     case "PUT":
//       await handlePutRequest(req, res);
//       break;
//     case "DELETE":
//       await handleDeleteRequest(req, res);
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//       res.status(405).end(`Метод ${method} не дозволений`);
//       break;
//   }
// }

// async function handleGetRequest(req, res) {
//   try {
//     const { categoryId } = req.query;
//     const products = categoryId
//       ? await Product.find({ category: categoryId })
//       : await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при отриманні товарів", error });
//   }
// }

// async function handlePostRequest(req, res) {
//   try {
//     const {
//       name,
//       shortDescription,
//       longDescription,
//       seotitle,
//       seodescriptions,
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     } = req.body;

//     const product = new Product({
//       name,
//       shortDescription,
//       longDescription,
//       seotitle,
//       seodescriptions,
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     console.error("Error while creating product:", error);
//     res.status(500).json({ message: "Помилка при створенні товару", error });
//   }
// }

// async function handlePutRequest(req, res) {
//   try {
//     const { id } = req.query;
//     const {
//       name,
//       shortDescription,
//       longDescription,
//       seotitle,
//       seodescriptions,
//       seoText,
//       images,
//       characteristics,
//       videoUrl,
//       model3dFile,
//       category,
//     } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         shortDescription,
//         longDescription,
//         seotitle,
//         seodescriptions,
//         seoText,
//         images,
//         characteristics,
//         videoUrl,
//         model3dFile,
//         category,
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при оновленні товару", error });
//   }
// }

// async function handleDeleteRequest(req, res) {
//   try {
//     const { id } = req.query;
//     await Product.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Помилка при видаленні товару", error });
//   }
// }
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const products = categoryId
      ? await Product.find({ category: categoryId })
      : await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні товарів", error });
  }
}

async function handlePostRequest(req, res) {
  try {
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    form.on("fileBegin", (name, file) => {
      file.filepath = path.join(
        process.cwd(),
        "public/uploads",
        file.originalFilename
      );
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Приводимо поля до потрібного типу
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const shortDescription = Array.isArray(fields.shortDescription)
      ? fields.shortDescription[0]
      : fields.shortDescription;
    const longDescription = Array.isArray(fields.longDescription)
      ? fields.longDescription[0]
      : fields.longDescription;
    const seotitle = Array.isArray(fields.seotitle)
      ? fields.seotitle[0]
      : fields.seotitle;
    const seodescriptions = Array.isArray(fields.seodescriptions)
      ? fields.seodescriptions[0]
      : fields.seodescriptions;

    const category = Array.isArray(fields.category)
      ? fields.category[0]
      : fields.category; // Додаємо обробку категорії

    const images = [];
    if (files.images) {
      if (Array.isArray(files.images)) {
        files.images.forEach((file) => {
          images.push(`/uploads/${path.basename(file.filepath)}`);
        });
      } else {
        images.push(`/uploads/${path.basename(files.images.filepath)}`);
      }
    }

    // Створення нового продукту з категорією
    const product = new Product({
      name,
      shortDescription,
      longDescription,
      seotitle,
      seodescriptions,
      category, // Зберігаємо категорію
      images,
      characteristics: JSON.parse(fields.characteristics || "[]"),
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

    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Приводимо поля до потрібного типу
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const shortDescription = Array.isArray(fields.shortDescription)
      ? fields.shortDescription[0]
      : fields.shortDescription;
    const longDescription = Array.isArray(fields.longDescription)
      ? fields.longDescription[0]
      : fields.longDescription;
    const seotitle = Array.isArray(fields.seotitle)
      ? fields.seotitle[0]
      : fields.seotitle;
    const seodescriptions = Array.isArray(fields.seodescriptions)
      ? fields.seodescriptions[0]
      : fields.seodescriptions;

    const category = Array.isArray(fields.category)
      ? fields.category[0]
      : fields.category; // Додаємо обробку категорії

    const images = [];
    if (files.images) {
      if (Array.isArray(files.images)) {
        files.images.forEach((file) => {
          images.push(`/uploads/${path.basename(file.filepath)}`);
        });
      } else {
        images.push(`/uploads/${path.basename(files.images.filepath)}`);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        shortDescription,
        longDescription,
        seotitle,
        seodescriptions,
        category, // Оновлюємо категорію
        images: images.length > 0 ? images : undefined,
        characteristics: JSON.parse(fields.characteristics || "[]"),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Продукт не знайдено" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error while updating product:", error);
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
