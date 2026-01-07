const express = require('express');
const router = express.Router();
const Baby = require('../models/Baby');
const asyncHandler = require('express-async-handler');

// @desc Get Baby page content
// @route GET /api/baby
router.get('/', asyncHandler(async (req, res) => {
    let content = await Baby.findOne();
    if (!content) {
        content = await Baby.create({});
    }
    res.json(content);
}));

// @desc Update Baby page content
// @route PUT /api/baby
router.put('/', asyncHandler(async (req, res) => {
    let content = await Baby.findOne();
    if (!content) {
        content = new Baby(req.body);
    } else {
        Object.assign(content, req.body);
    }
    const updatedContent = await content.save();
    res.json(updatedContent);
}));

module.exports = router;
