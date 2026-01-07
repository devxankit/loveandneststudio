const express = require('express');
const router = express.Router();
const Maternity = require('../models/Maternity');
const asyncHandler = require('express-async-handler');

// @desc    Get maternity page content
// @route   GET /api/maternity
router.get('/', asyncHandler(async (req, res) => {
    let page = await Maternity.findOne();
    if (!page) {
        // Create initial if not exists
        page = await Maternity.create({});
    }
    res.json(page);
}));

// @desc    Update maternity page content
// @route   PUT /api/maternity
router.put('/', asyncHandler(async (req, res) => {
    let page = await Maternity.findOne();
    if (page) {
        page = await Maternity.findByIdAndUpdate(page._id, req.body, { new: true });
    } else {
        page = await Maternity.create(req.body);
    }
    res.json(page);
}));

module.exports = router;
