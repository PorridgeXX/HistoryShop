import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Указываем папку для сохранения загружаемых файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Папка для хранения файлов
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Маршрут для загрузки файла
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Файл не был загружен.");
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Обслуживание статических файлов из папки dist
app.use(express.static(path.join(__dirname, "dist")));

// Обслуживание папки загрузок
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ловим все остальные маршруты и перенаправляем их на index.html из dist
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
