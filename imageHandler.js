const fs = require('fs');
const path = require('path');

const apesDir = './apes';
const uploadDir = './uploads';

const copyImagesToUploads = () => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const files = fs.readdirSync(apesDir);
    let count = 0;

    files.forEach(file => {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const sourcePath = path.join(apesDir, file);
            const destPath = path.join(uploadDir, `image_${count}.jpg`); // IMENUJEMO FAJLOVE KOJE MATEJ NE ZNA IMENOVAT JEBEMGA UUSTA
            fs.copyFileSync(sourcePath, destPath);
            count++;
        }
    });

    console.log('All images have been copied and renamed in the uploads folder.');
};

module.exports = { copyImagesToUploads };
