const express = require('express');
const router = express.Router();
const Family = require('../models/Family');
const asyncHandler = require('express-async-handler');

// @desc    Get family page content
// @route   GET /api/family
router.get('/', asyncHandler(async (req, res) => {
    let family = await Family.findOne();
    if (!family) {
        // Create initial default data if none exists
        family = await Family.create({
            hero: {
                fixedBgImage: '',
                experienceText: '13 Years of Experience • Love & Nest Studio',
                titleLine1: 'Preserving Your',
                titleLine2: 'Family Legacy',
            },
            philosophy: {
                image: '',
                titleLine1: 'Cherishing Every',
                titleLine2: 'Fleeting Moment',
                text1: 'Family is the anchor during rough waters and the wind in our sails during calm seas. It is our everything. In the relentless rush of our modern lives, the quiet, profound beauty of simply being together is often overlooked.',
                text2: 'Our mission is deeper than photography. We aim to freeze time—preserving the laughter that fills a room, the gentle touch of a hand, and the unspoken bond that ties you together. We craft visual heirlooms, authentic and unspooled, for you to hold onto forever.',
                author: 'Anamika',
                role: 'Lead Photographer',
            },
            banner: {
                image: '',
                quote: '"Where life happens"',
            },
            selectedWorks: [],
            mosaic: {
                image1: '',
                title: 'Ready to tell your story?',
                image2: '',
            },
            archGrid: {
                images: ['', '', '', '', ''],
                lineArtImage: '',
                title: 'Ready to frame your memories?',
            }
        });
    }
    res.json({ success: true, data: family });
}));

// @desc    Update family page content
// @route   PUT /api/family
router.put('/', asyncHandler(async (req, res) => {
    let family = await Family.findOne();
    if (family) {
        family = await Family.findByIdAndUpdate(family._id, req.body, { new: true });
    } else {
        family = await Family.create(req.body);
    }
    res.json({ success: true, data: family });
}));

module.exports = router;
