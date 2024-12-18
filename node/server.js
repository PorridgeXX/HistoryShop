import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь до папки dist
const distPath = path.join(__dirname, "../dist");

const app = express();
const PORT = 3000;

// Настройка для обработки папки загрузок
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Статические файлы для фронтенда
app.use(express.static(distPath));

// Перенаправляем все неизвестные пути на index.html для поддержки Vue Router
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Загрузка файлов с помощью multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Файл не был загружен.");
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
