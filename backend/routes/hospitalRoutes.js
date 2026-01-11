const express = require('express');
const router = express.Router();
const HospitalPage = require('../models/HospitalPage');
const HospitalSession = require('../models/HospitalSession');

// --- Main Hospital Page Routes ---

// Get Hospital Page Content
router.get('/page', async (req, res) => {
    try {
        let page = await HospitalPage.findOne();
        if (!page) {
            // Seed if not exists
            page = await HospitalPage.create({
                categories: [
                    { id: 'birth', title: 'Birth Story', description: 'Documenting labor and delivery.', link: '/portfolio/hospital/birth' },
                    { id: 'newborn', title: 'Fresh 48', description: 'First 48 hours in hospital.', link: '/portfolio/hospital/newborn' },
                    { id: 'family', title: 'First Family', description: 'Siblings meeting the baby.', link: '/portfolio/hospital/family' }
                ]
            });
        }
        res.json(page);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Hospital Page
router.put('/page', async (req, res) => {
    try {
        const page = await HospitalPage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(page);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Hospital Session (Sub-pages) Routes ---

// Get Session Content by Type
router.get('/session/:type', async (req, res) => {
    try {
        const { type } = req.params;
        let session = await HospitalSession.findOne({ type });
        if (!session) {
            // Seed default if not exists
            session = await HospitalSession.create({ type });
        }
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Session Content by Type
router.put('/session/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const session = await HospitalSession.findOneAndUpdate({ type }, req.body, { new: true, upsert: true });
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
