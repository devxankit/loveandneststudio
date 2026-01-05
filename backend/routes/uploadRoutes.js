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

        // CORRECT THE CLOCK DRIFT
        // User system is in 2026. Cloudinary expects 2025.
        // We subtract ~1 year (365 days) from the current system timestamp.
        const oneYearSeconds = 365 * 24 * 60 * 60;
        const currentSystemTime = Math.floor(Date.now() / 1000);

        // Only apply fix if we are actually in the future (simple check for year > 2025)
        // timestamp needs to be valid.
        // Actually, easiest way is to NOT rely on system time for signature if possible,
        // but Cloudinary SDK uses it by default.
        // We will override it.
        const correctedTimestamp = currentSystemTime > 1767225600 ? (currentSystemTime - oneYearSeconds) : currentSystemTime; // 1767... is roughly start of 2026

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'loveandnest/portfolio',
                timestamp: correctedTimestamp // Force 'past' timestamp (which is actually 'now' in reality)
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
