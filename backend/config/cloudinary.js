const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("CRITICAL: Cloudinary environment variables are not loaded!");
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'loveandnest',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1200, crop: "limit" }] // Optimize large uploads
    },
});

module.exports = { cloudinary, storage };
