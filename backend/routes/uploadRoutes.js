const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

// Use memory storage to handle buffer manually
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', upload.single('image'), (req, res) => {
    try {
        console.log("Upload request received. File:", req.file ? req.file.originalname : 'None');
        console.log("Cloudinary Config Check - Name:", !!process.env.CLOUDINARY_CLOUD_NAME, "Key:", !!process.env.CLOUDINARY_API_KEY);

        if (!req.file) {
            console.error("Upload Error: No file in request");
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'loveandnest/portfolio',
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary SDK Error Details:", JSON.stringify(error, null, 2));
                    return res.status(500).json({
                        message: 'Cloudinary upload failure',
                        error: error,
                        details: error.message || 'Check server logs'
                    });
                }
                res.json({ url: result.secure_url });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (error) {
        console.error("Internal Upload Route Error:", error);
        res.status(500).json({
            message: 'Internal server error during upload',
            error: error.message
        });
    }
});

module.exports = router;
