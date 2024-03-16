require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const {OpenAI} = require('openai');
const { upload } = require('./utils/upload');
const cloudinary = require('./utils/cloudinary');
const multer = require('multer');
const Replicate = require('replicate');
const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
}
const openai = new OpenAI(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/images', async (req, res) => {
    const response = await openai.images.generate({ 
        prompt: req.body.message,
        n: 2,
        size: "1024x1024",
    });
    console.log(response.data);
    res.send(response.data);
})
let filepath;
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError){
            return res.status(500).json(err);
        }else if(err){
            return res.status(500).json(err);
        }
        console.log('req.file.path', req.file.path);
        filepath = req.file.path;
    })
})

app.post('/variations', async (req, res) => {
    try {
        console.log('filepath', filepath)
    const response = await openai.images.createVariation({
        image: fs.createReadStream(filepath),
        n: 2,
        size: "1024x1024"
    });
    console.log('response.data', response.data);
    res.send(response.data);
    } catch (error) {
        console.log(error);
    }
})

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

app.post('/remover', async (req, res) => {
    console.log('filepath', filepath);
    const result = await cloudinary.uploader.upload(filepath, {
        folder: "blogs"
    });
    try {
        const imageBuffer = fs.readFileSync(filepath);
        const imageBase64 = imageBuffer.toString('base64');
        const output = await replicate.run(
            "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
            {
              input: {
                image: result.secure_url
              }
            }
          );
    console.log('output', output);
    return res.send(output);
    } catch (error) {
        console.log(error);
    }
})


app.listen(process.env.PORT, () => console.log("Server started"));