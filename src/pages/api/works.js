import { mongooseConnect } from "../../lib/mongoose";
import Work from "../../models/Work";

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
    const { id } = req.query; // Перевіряємо, чи є ID у запиті
    if (id) {
      const work = await Work.findById(id); // Знаходимо роботу за ID
      if (!work) {
        return res
          .status(404)
          .json({ success: false, error: "Роботу не знайдено" });
      }
      res.status(200).json({ success: true, data: work });
    } else {
      const works = await Work.find(); // Отримуємо всі роботи
      res.status(200).json({ success: true, data: works });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при отриманні робіт" });
  }
}

async function handlePostRequest(req, res) {
  try {
    const { translations, videoId, photos } = req.body;

    const newWork = new Work({
      translations, // багатомовний контент
      videoId,
      photos,
    });

    await newWork.save();
    res.status(201).json({ success: true, data: newWork });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при створенні роботи" });
  }
}

async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    const { translations, videoId, photos } = req.body;

    const updatedWork = await Work.findByIdAndUpdate(
      id,
      { translations, videoId, photos },
      { new: true, runValidators: true }
    );

    if (!updatedWork) {
      return res
        .status(404)
        .json({ success: false, error: "Роботу не знайдено" });
    }

    res.status(200).json({ success: true, data: updatedWork });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при оновленні роботи" });
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return res
        .status(404)
        .json({ success: false, error: "Роботу не знайдено для видалення" });
    }

    res.status(200).json({ success: true, message: "Роботу видалено успішно" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Помилка при видаленні роботи" });
  }
}
