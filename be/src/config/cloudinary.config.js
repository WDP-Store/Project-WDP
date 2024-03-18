import slugify from "slugify"
import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'uniqueImageFolder',
            format: 'jpeg',
            public_id: Date.now() + '-' + Math.floor(Math.random() * (999 - 100 + 1) + 100) + '-' + slugify(file.originalname, { lower: true, strict: true }),
        };
    },
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('File must be an image and less than 10MB'), false); // Reject the file
    }
};

const uploadCloud = multer({ storage, fileFilter });

export default uploadCloud