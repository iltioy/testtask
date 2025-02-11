const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const convert = (file) => {
    const outputname = `${file.filename}.mp4`;
    const outputpath = path.join('converted', outputname);

    if (!fs.existsSync('converted')) {
        fs.mkdirSync('converted')
    }

    return new Promise((resolve, reject) => {
        ffmpeg(file.path)
            .output(outputpath)
            .on('end', () => {
                fs.unlinkSync(file.path);
                resolve(outputname);
            })
            .on('error', (err) => {
                reject(err);
            })
            .run();
    });
};

module.exports = { convert };
