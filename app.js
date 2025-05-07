const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const { copyImagesToUploads } = require('./imageHandler');
const { processImage, initializeQueue } = require('./imageProcessor');

const app = express();
const port = 3000;
const uploadDir = './uploads';

copyImagesToUploads();

app.get('/process-images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            res.status(500).send('GRESKA PROBLEM NE MOZEMO CITAT UPLOADS FOLDER ALO!!!');
            return;
        }

        const sortedFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
                                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        initializeQueue(sortedFiles);
        processImage();
        res.send(`Processing ${sortedFiles.length} images...`);
    });
});

app.use('/uploads', express.static(uploadDir));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
