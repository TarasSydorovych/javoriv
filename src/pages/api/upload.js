import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/static/3dmodels"),
      keepExtensions: true,
    });

    // Переконайтеся, що директорія існує
    const uploadDir = path.join(process.cwd(), "public/static/3dmodels");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Створює директорію, якщо її немає
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing the files:", err);
        return res.status(500).json({ error: "Error parsing the files" });
      }

      const file = files.file[0]; // Отримайте перший файл з масиву
      if (!file) {
        console.error("No file uploaded"); // Лог, якщо файл не було завантажено
        return res.status(400).json({ error: "No file uploaded" });
      }

      const newFileName = `${Date.now()}_${file.originalFilename}`; // Створіть нову назву для файлу
      const uploadPath = path.join(uploadDir, newFileName); // Визначте шлях до завантаження

      try {
        // Перемістіть файл
        await fs.promises.rename(file.filepath, uploadPath);
        const fileUrl = `/static/3dmodels/${newFileName}`; // URL для доступу до файлу
        res.status(200).json({ url: fileUrl }); // Відповідь з URL
      } catch (error) {
        console.error("Error saving the file:", error); // Лог помилки при збереженні
        res.status(500).json({ error: "Error saving the file" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
