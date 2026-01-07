const GlobalSettings = require('../models/GlobalSettings');

// @desc    Get Global Settings (Logos, Title, etc.)
// @route   GET /api/settings
// @access  Public
const getGlobalSettings = async (req, res) => {
    try {
        let settings = await GlobalSettings.findOne();
        if (!settings) {
            settings = await GlobalSettings.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Global Settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateGlobalSettings = async (req, res) => {
    try {
        const settings = await GlobalSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGlobalSettings,
    updateGlobalSettings
};
