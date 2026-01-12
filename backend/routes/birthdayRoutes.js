const express = require('express');
const router = express.Router();
const Birthday = require('../models/Birthday');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

// @desc    Get birthday page data
// @route   GET /api/birthday
router.get('/', asyncHandler(async (req, res) => {
    let birthday = await Birthday.findOne();
    if (!birthday) {
        birthday = await Birthday.create({});
    }
    res.json(birthday);
}));

// @desc    Update birthday page data
// @route   PUT /api/birthday
router.put('/', protect, asyncHandler(async (req, res) => {
    let birthday = await Birthday.findOne();
    if (birthday) {
        birthday = await Birthday.findByIdAndUpdate(birthday._id, req.body, { new: true });
    } else {
        birthday = await Birthday.create(req.body);
    }
    res.json(birthday);
}));

module.exports = router;
