const express = require('express');
const app = express();
const upload = require('./services/upload');
const path = require('path');
const fs = require('fs');
const { convert } = require('./services/converter');

app.post('/upload', upload.single('video'), async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({
            message: req.fileValidationError,
        });
    }

    if (!req.file) {
        return res.status(400).json({
            message: 'Для конвертации видео загрузите файл!',
        });
    }

    try {
        const filename = await convert(req.file);

        const protocol = req.protocol;
        const host = req.get('host');
        const downloadUrl = `${protocol}://${host}/download/${filename}`;

        res.status(200).json({
            message: 'Успешная конвертация видео!',
            downloadUrl,
        });
    } catch (error) {
        res.status(500).json({
            messsage: 'Ошибка при конвертации',
            error,
        });
    }
});

app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join('converted', filename);

    if (!fs.existsSync(filepath)) {
        return res.status(404).json({
            message: `Файл ${filename} не найден!`,
        });
    }

    res.download(filepath, filename, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Ошибка при отправке файла',
            });
        }
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
