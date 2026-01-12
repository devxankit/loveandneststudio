const express = require('express');
const router = express.Router();
const PreBirthday = require('../models/PreBirthday');
const { protect } = require('../middleware/authMiddleware');

// Get page data
router.get('/', async (req, res) => {
    try {
        let data = await PreBirthday.findOne();
        if (!data) {
            data = await PreBirthday.create({});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update page data
router.put('/', protect, async (req, res) => {
    try {
        let data = await PreBirthday.findOne();
        if (!data) {
            data = new PreBirthday(req.body);
        } else {
            Object.assign(data, req.body);
        }
        await data.save();
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
