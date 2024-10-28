// src/utils/transliterate.js

export function transliterate(text) {
  const uaToEnMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "yu",
    я: "ya",
    ь: "",
    "'": "",
    " ": "-",
    "–": "-",
    "—": "-",
    _: "-",
    "-": "-",
  };

  return text
    .toLowerCase() // Зводимо до нижнього регістру
    .split("") // Розбиваємо текст на окремі символи
    .map((char) => uaToEnMap[char] || char) // Транслітеруємо кожен символ
    .join(""); // Збираємо назад у рядок
}
