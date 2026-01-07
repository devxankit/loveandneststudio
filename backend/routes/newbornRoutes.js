const express = require('express');
const router = express.Router();
const Newborn = require('../models/Newborn');
const { upload } = require('../config/cloudinary');

// @desc    Get Newborn page data
// @route   GET /api/newborn
router.get('/', async (req, res) => {
    try {
        let data = await Newborn.findOne();
        if (!data) {
            data = await Newborn.create({});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update Newborn page data
// @route   PUT /api/newborn
router.put('/', async (req, res) => {
    try {
        let data = await Newborn.findOne();
        if (!data) {
            data = new Newborn({});
        }

        if (req.body.hero) data.hero = { ...data.hero, ...req.body.hero };
        if (req.body.welcome) data.welcome = { ...data.welcome, ...req.body.welcome };
        if (req.body.gallery) data.gallery = req.body.gallery;

        await data.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
