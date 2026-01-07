const Contact = require('../models/Contact');

// @desc    Get Contact page content
// @route   GET /api/contact
// @access  Public
const getContactContent = async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = await Contact.create({});
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Contact page content
// @route   PUT /api/contact
// @access  Private/Admin
const updateContactContent = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContactContent,
    updateContactContent
};
