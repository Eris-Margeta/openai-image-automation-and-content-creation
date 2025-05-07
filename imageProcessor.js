const fs = require('fs');
const path = require('path');
const axios = require('axios');

const uploadDir = './uploads';
const processDelay = 2000;
let imageQueue = [];
const promptText = fs.readFileSync('prompt.txt', 'utf8');

const processImage = async () => {
    if (imageQueue.length === 0) {
        console.log('All images have been processed.');
        return;
    }

    const filename = imageQueue.shift();
    try {
        const imageUrl = `${process.env.PUBLIC_URL_BASE}/uploads/${filename}`;

      
        console.log("Image URL:", imageUrl);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        };

        const payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        { "type": "text", "text": promptText },
                        { "type": "image_url", "image_url": { "url": imageUrl } }
                    ]
                }
            ], 
            "max_tokens": 3000
        };

       
        console.log("Sending request to OpenAI with payload:", JSON.stringify(payload, null, 2));

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        const description = response.data.choices[0].message.content;

        const textFilePath = path.join(uploadDir, `${path.parse(filename).name}.txt`);
        fs.writeFileSync(textFilePath, description);

        setTimeout(processImage, processDelay);
    } catch (error) {
        console.error(`Error processing ${filename}:`, error.response ? error.response.data : error.message);
        if (error.response) {
            console.error("Error details:", JSON.stringify(error.response.data, null, 2));
        }
        setTimeout(processImage, processDelay);
    }
};

const initializeQueue = (files) => {
    imageQueue = files;
};

module.exports = { processImage, initializeQueue };
