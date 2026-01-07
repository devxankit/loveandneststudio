const PageContent = require('../models/PageContent');
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');
const asyncHandler = require('express-async-handler'); // Need to install this or use try-catch

// @desc    Get all pages (summary)
// @route   GET /api/pages
// @access  Public
const getPages = async (req, res) => {
    try {
        const pages = await PageContent.find({}).select('pageSlug title updatedAt');
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single page content
// @route   GET /api/pages/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
    try {
        const page = await PageContent.findOne({ pageSlug: req.params.slug });
        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper for manual upload with date fix
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        // CORRECT THE CLOCK DRIFT (2026 -> 2025)
        const currentSystemTime = Math.floor(Date.now() / 1000);
        const correctedTimestamp = currentSystemTime;

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                timestamp: correctedTimestamp
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

// @desc    Update page section
// @route   PUT /api/pages/:slug/sections/:sectionId
// @access  Private/Admin
const updatePageSection = async (req, res) => {
    try {
        const { slug, sectionId } = req.params;
        const page = await PageContent.findOne({ pageSlug: slug });

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        const sectionIndex = page.sections.findIndex(s => s.id === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // 1. Text Content Update
        if (req.body.content) {
            const newContentContent = typeof req.body.content === 'string'
                ? JSON.parse(req.body.content)
                : req.body.content;

            page.sections[sectionIndex].content = {
                ...page.sections[sectionIndex].content,
                ...newContentContent
            };
        }

        // 2. File Upload Handling
        if (req.file) {
            console.log('File detected. Target Key:', req.body.targetKey);
            const targetKey = req.body.targetKey || 'image';

            // Upload to Cloudinary manually
            const folder = `loveandnest/${slug}`;
            let secureUrl;
            try {
                secureUrl = await uploadToCloudinary(req.file.buffer, folder);
                console.log('Cloudinary Upload Success:', secureUrl);
                const fs = require('fs');
                fs.appendFileSync('debug_upload.log', `[${new Date().toISOString()}] Upload Success: ${secureUrl}\n`);
            } catch (err) {
                console.error('Cloudinary Upload Failed:', err);
                throw err;
            }

            // Safe update for Mixed type: Clone -> Modify -> Reassign
            let updatedContentObj = page.sections[sectionIndex].content ? JSON.parse(JSON.stringify(page.sections[sectionIndex].content)) : {};

            if (Array.isArray(updatedContentObj[targetKey])) {
                updatedContentObj[targetKey].push(secureUrl);
            } else {
                updatedContentObj[targetKey] = secureUrl;
            }

            // Reassign completely to ensure Mongoose detects change
            page.sections[sectionIndex].content = updatedContentObj;

            console.log(`Updated Content [${targetKey}] with:`, secureUrl);

            // Explicitly mark as modified
            page.markModified('sections');
        } else {
            console.log('No file in request.');
        }

        const savedPage = await page.save();
        console.log('Page Data Saved to DB.');
        res.json(savedPage);
    } catch (error) {
        console.error("Update Page Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Seed/Create Page (Internal/Admin)
// @route   POST /api/pages
const createPage = async (req, res) => {
    const { pageSlug, title, sections } = req.body;
    try {
        const page = await PageContent.create({ pageSlug, title, sections });
        res.status(201).json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPages,
    getPageBySlug,
    updatePageSection,
    createPage
};
