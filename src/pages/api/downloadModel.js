import fs from "fs";
import path from "path";
import axios from "axios";

// Функція для перетворення закодованого URL в читабельну назву файлу
function sanitizeFileName(fileName) {
  return decodeURIComponent(fileName)
    .replace(/[^a-zA-Z0-9.\-_]/g, "_") // Заміна всіх некоректних символів на підкреслення
    .replace(/\s+/g, "_"); // Заміна пробілів на підкреслення
}

export default async function handler(req, res) {
  const { modelUrl, fileName } = req.query;

  try {
    // Використовуємо оригінальний URL без декодування
    const originalUrl = modelUrl;

    // Очищаємо ім'я файлу від зайвих параметрів та коригуємо назву файлу
    const cleanFileName = sanitizeFileName(fileName.split("?")[0]);
    const filePath = path.join(
      process.cwd(),
      "public",
      "static",
      cleanFileName
    );

    console.log("Original URL:", originalUrl);
    console.log("Saving to:", filePath);

    // Завантажуємо файл
    const response = await axios({
      url: originalUrl,
      method: "GET",
      responseType: "arraybuffer",
    });

    // Перевіряємо статус відповіді
    if (response.status !== 200) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    // Зберігаємо файл у зазначену папку
    fs.writeFileSync(filePath, Buffer.from(response.data));

    res.status(200).json({
      message: "Model downloaded successfully",
      path: `/static/${cleanFileName}`,
    });
  } catch (error) {
    console.error("Error downloading the model:", error.message);
    res
      .status(500)
      .json({ message: "Error downloading the model", error: error.message });
  }
}
