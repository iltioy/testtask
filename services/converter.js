const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const convert = (file) => {
    const outputname = `${file.filename}.mp4`;
    const outputpath = path.join('converted', outputname);

    return new Promise((resolve, reject) => {
        ffmpeg(file.path)
            .output(outputpath)
            .on('end', () => {
                console.log('asdasd');
                fs.unlinkSynk(filepath);

                resolve(outputname);
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .run();
    });
};

module.exports = { convert };
