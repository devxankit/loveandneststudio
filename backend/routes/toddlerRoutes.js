const express = require('express');
const router = express.Router();
const Toddler = require('../models/Toddler');

// @desc    Get Toddler page data
// @route   GET /api/toddler
router.get('/', async (req, res) => {
    try {
        let data = await Toddler.findOne();
        if (!data) {
            data = await Toddler.create({
                hero: {
                    title: 'Toddler',
                    subtitle: 'Photography & Videography',
                    tagline: 'From Planning to Execution',
                    images: ['', '', '', '', '', '']
                },
                gallery: []
            });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update Toddler page data
// @route   PUT /api/toddler
router.put('/', async (req, res) => {
    try {
        let data = await Toddler.findOne();
        if (!data) {
            data = new Toddler({});
        }

        if (req.body.hero) data.hero = { ...data.hero, ...req.body.hero };
        if (req.body.gallery) data.gallery = req.body.gallery;
        if (req.body.themeColor) data.themeColor = req.body.themeColor;

        await data.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
