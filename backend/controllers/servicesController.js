const Services = require('../models/Services');

// @desc    Get Services page content
// @route   GET /api/services
// @access  Public
const getServicesContent = async (req, res) => {
    try {
        const services = await Services.findOne();
        // Return empty object or default if not found
        if (!services) {
            return res.status(200).json(await Services.create({}));
        }
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Services page content
// @route   PUT /api/services
// @access  Private/Admin
const updateServicesContent = async (req, res) => {
    try {
        // Upsert: true creates it if it doesn't exist
        const services = await Services.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServicesContent,
    updateServicesContent
};
