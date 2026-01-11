const express = require('express');
const router = express.Router();
const CakeSmash = require('../models/CakeSmash');

// Get Cake Smash page data
router.get('/', async (req, res) => {
    try {
        let page = await CakeSmash.findOne();
        if (!page) {
            page = await CakeSmash.create({});
        }
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Cake Smash page data
router.put('/', async (req, res) => {
    try {
        const page = await CakeSmash.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
