const express = require('express');
const router = express.Router();
const HomePage = require('../models/HomePage');
const asyncHandler = require('express-async-handler');

// @desc    Get home page content
// @route   GET /api/home-page
router.get('/', asyncHandler(async (req, res) => {
    let page = await HomePage.findOne();
    if (!page) {
        // Create initial data if none exists
        page = await HomePage.create({});
    }
    res.json({ success: true, data: page });
}));

// @desc    Update home page content
// @route   PUT /api/home-page
router.put('/', asyncHandler(async (req, res) => {
    let page = await HomePage.findOne();
    if (page) {
        page = await HomePage.findByIdAndUpdate(page._id, req.body, { new: true });
    } else {
        page = await HomePage.create(req.body);
    }
    res.json({ success: true, data: page });
}));

module.exports = router;
