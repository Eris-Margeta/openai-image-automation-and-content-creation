const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const uploadDir = './uploads';

app.get('/process-images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading uploads directory');
            return;
        }

        // SORTIRAMO
        imageQueue = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
                          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        
        console.log(`Found ${imageQueue.length} images to process.`);
        processImage();
        res.send(`Processing ${imageQueue.length} images...`);
    });
});

module.exports = router;
