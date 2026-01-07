const Home = require('../models/Home');

// @desc    Get Home page content
// @route   GET /api/home
// @access  Public
const getHomeContent = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) {
            // Optional: Auto-create default if missing
            home = await Home.create({});
        }
        res.status(200).json(home);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Home page content
// @route   PUT /api/home
// @access  Private/Admin
const updateHomeContent = async (req, res) => {
    try {
        const home = await Home.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(home);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHomeContent,
    updateHomeContent
};
