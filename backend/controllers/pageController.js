const PageContent = require('../models/PageContent');
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

        // Merge existing content with new content
        // Handle file uploads if any
        let updatedContent = { ...req.body };

        // If files were uploaded, add their URLs to the content
        if (req.files && req.files.length > 0) {
            // Logic to map files to specific keys is complex in generic form.
            // For simplicity, we assume fields named 'image' or 'images' in the form data
            // match keys in the content object.
            req.files.forEach(file => {
                // The fieldname in formData should match the content key (e.g. "content[heroImage]")
                // But multer gives flat structure. 
                // We will assume the frontend sends specific keys or we handle mapped uploads efficiently.
                // For now, let's append uploaded Image URL to a known key or return it.
            });
        }

        // Simple Replace for now: we expect the frontend to send the full section content object
        // Maps nicely if we allow passing JSON string in formData or standard body
        if (req.body.content) {
            // If content is sent as a JSON string (common with FormData), parse it
            const newContentContent = typeof req.body.content === 'string'
                ? JSON.parse(req.body.content)
                : req.body.content;

            page.sections[sectionIndex].content = {
                ...page.sections[sectionIndex].content,
                ...newContentContent
            };
        }

        // If a specific image file was uploaded
        if (req.file) {
            const targetKey = req.body.targetKey || 'image';
            const currentContent = page.sections[sectionIndex].content;

            if (Array.isArray(currentContent[targetKey])) {
                // If the target is an array (e.g., slides), push the new image
                page.sections[sectionIndex].content[targetKey].push(req.file.path);
            } else {
                // Otherwise replace/set the value
                page.sections[sectionIndex].content[targetKey] = req.file.path;
            }

            // Explicitly mark as modified because we are mutating a Mixed type or nested object
            page.markModified('sections');
        }

        await page.save();
        res.json(page);
    } catch (error) {
        console.error(error);
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
