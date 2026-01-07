const express = require('express');
const router = express.Router();
const ContactPage = require('../models/ContactPage');

// @desc    Get Contact page content
// @route   GET /api/contact-page
router.get('/', async (req, res) => {
    try {
        let pageData = await ContactPage.findOne();
        if (!pageData) {
            pageData = await ContactPage.create({});
        }
        res.status(200).json({ data: pageData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update Contact page content
// @route   PUT /api/contact-page
router.put('/', async (req, res) => {
    try {
        const pageData = await ContactPage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json({ data: pageData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
