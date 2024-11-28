import { mongooseConnect } from "../../lib/mongoose"; // Підключення до MongoDB
import { Main } from "../../models/Main";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      // Отримати дані
      const data = await Main.findOne();
      return res.status(200).json(data || {});
    } catch (error) {
      return res.status(500).json({ error: "Помилка отримання даних" });
    }
  }

  if (method === "POST") {
    try {
      // Оновити або створити запис
      const { vartistmetra, kilkistkvartur, parkomista, officeprem } = req.body;

      let mainData = await Main.findOne();
      if (!mainData) {
        mainData = new Main({
          vartistmetra,
          kilkistkvartur,
          parkomista,
          officeprem,
        });
      } else {
        mainData.vartistmetra = vartistmetra;
        mainData.kilkistkvartur = kilkistkvartur;
        mainData.parkomista = parkomista;
        mainData.officeprem = officeprem;
      }

      await mainData.save();
      return res.status(200).json(mainData);
    } catch (error) {
      return res.status(500).json({ error: "Помилка збереження даних" });
    }
  }

  // Якщо метод не підтримується
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Метод ${method} не дозволений`);
}
