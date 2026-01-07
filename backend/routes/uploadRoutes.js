const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

// Use memory storage to handle buffer manually
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Use system time directly
        const correctedTimestamp = Math.floor(Date.now() / 1000);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'loveandnest/portfolio',
                timestamp: correctedTimestamp
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ message: 'Upload failure', error: error.message });
                }
                res.json({ url: result.secure_url });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (error) {
        console.error("Server Upload Error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
