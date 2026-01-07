const express = require('express');
const router = express.Router();
const AboutPage = require('../models/AboutPage');
const asyncHandler = require('express-async-handler');

// @desc    Get about page content
// @route   GET /api/about-page
router.get('/', asyncHandler(async (req, res) => {
    let page = await AboutPage.findOne();
    if (!page) {
        // Create initial data if none exists
        page = await AboutPage.create({});
    }
    res.json({ success: true, data: page });
}));

// @desc    Update about page content
// @route   PUT /api/about-page
router.put('/', asyncHandler(async (req, res) => {
    let page = await AboutPage.findOne();
    if (page) {
        page = await AboutPage.findByIdAndUpdate(page._id, req.body, { new: true });
    } else {
        page = await AboutPage.create(req.body);
    }
    res.json({ success: true, data: page });
}));

module.exports = router;
