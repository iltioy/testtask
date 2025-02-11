const multer = require('multer');
const path = require('path');

const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1024 * 1024 * 1024 * 2,
    },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname).toLowerCase() === '.mov') {
            cb(null, true);
        } else {
            req.fileValidationError =
                'Для загрузки поддверживается только формат видео .mov';
            cb(null, false, req.fileValidationError);
        }
    },
});

module.exports = upload;
