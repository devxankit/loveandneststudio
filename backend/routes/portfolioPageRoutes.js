const express = require('express');
const router = express.Router();
const PortfolioPage = require('../models/PortfolioPage');
const asyncHandler = require('express-async-handler');

// @desc    Get portfolio landing page content
// @route   GET /api/portfolio-page
router.get('/', asyncHandler(async (req, res) => {
    let page = await PortfolioPage.findOne();
    if (!page) {
        // Create initial data if none exists
        page = await PortfolioPage.create({
            hero: {
                titleLine1: 'Port',
                titleLine2: 'folio',
                subtext1: '/ Est. 2012 /',
                subtext2: '/ Dehradun /',
                strip1: [],
                strip2: [],
                strip3: []
            },
            categories: [
                { id: 'newborn', title: 'Newborn', subtitle: 'The First Breath', description: 'Pure, innocent moments that fly by so quickly.', link: '/portfolio/newborn', accent: 'bg-[#B77A8C]' },
                { id: 'maternity', title: 'Maternity', subtitle: 'The Radiance of Life', description: 'Celebrating the strength and beauty of your journey.', link: '/portfolio/maternity', accent: 'bg-[#E8CBB6]' },
                { id: 'baby', title: 'Baby', subtitle: 'Tiny Milestones', description: 'Capturing the wonder and growth of your little one.', link: '/portfolio/baby', accent: 'bg-[#8F8A86]' },
                { id: 'cakesmash', title: 'Cake Smash', subtitle: 'Sweet Celebrations', description: 'Fun, messy, and memorable first birthday moments.', link: '/portfolio/cakesmash', accent: 'bg-[#D14D72]' },
                { id: 'family', title: 'Family', subtitle: 'Heart & Home', description: 'The connections that mean the absolute world.', link: '/portfolio/family', accent: 'bg-[#5A2A45]' },
                { id: 'hospital', title: 'Hospital', subtitle: 'First Hours', description: "Capturing the raw and real moments of your baby's first hours.", link: '/portfolio/hospital', accent: 'bg-[#5A2A45]' },
                { id: 'toddler', title: 'Toddler', subtitle: 'Pure Wonder', description: 'Exploring the world through tiny eyes and big steps.', link: '/portfolio/toddler', accent: 'bg-[#B77A8C]' },
                { id: 'pre-birthday', title: 'Pre-Birthday', subtitle: 'A Magical Journey', description: 'Capturing the excitement before the big celebration.', link: '/portfolio/pre-birthday', accent: 'bg-[#E8CBB6]' }
            ],
            experience: {
                titleLine1: 'Every moment',
                titleLine2: 'is a masterpiece.',
                buttonText: 'Book Your Story',
                buttonLink: '/contact'
            }
        });
    }

    // Ensure new categories exist for existing installations
    const categoriesToAdd = [
        { id: 'toddler', title: 'Toddler', subtitle: 'Pure Wonder', description: 'Exploring the world through tiny eyes and big steps.', link: '/portfolio/toddler', accent: 'bg-[#B77A8C]' },
        { id: 'pre-birthday', title: 'Pre-Birthday', subtitle: 'A Magical Journey', description: 'Capturing the excitement before the big celebration.', link: '/portfolio/pre-birthday', accent: 'bg-[#E8CBB6]' },
        { id: 'birthday', title: 'Birthday', subtitle: 'Joyful Years', description: 'Every wish and every candle, preserved forever.', link: '/portfolio/birthday', accent: 'bg-[#D14D72]' }
    ];

    let updated = false;
    categoriesToAdd.forEach(newCat => {
        if (!page.categories.find(c => c.id === newCat.id)) {
            page.categories.push(newCat);
            updated = true;
        }
    });

    if (updated) {
        await page.save();
    }

    res.json({ success: true, data: page });
}));

// @desc    Update portfolio landing page content
// @route   PUT /api/portfolio-page
router.put('/', asyncHandler(async (req, res) => {
    let page = await PortfolioPage.findOne();
    if (page) {
        page = await PortfolioPage.findByIdAndUpdate(page._id, req.body, { new: true });
    } else {
        page = await PortfolioPage.create(req.body);
    }
    res.json({ success: true, data: page });
}));

module.exports = router;
