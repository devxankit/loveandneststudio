const Maternity = require('../models/Maternity');
const Newborn = require('../models/Newborn');
const Baby = require('../models/Baby');
const Family = require('../models/Family');

// Helper to get or create
const getPortfolio = async (Model, res) => {
    try {
        let data = await Model.findOne();
        if (!data) data = await Model.create({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper to update
const updatePortfolio = async (Model, req, res) => {
    try {
        const data = await Model.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Maternity
const getMaternity = (req, res) => getPortfolio(Maternity, res);
const updateMaternity = (req, res) => updatePortfolio(Maternity, req, res);

// Newborn
const getNewborn = (req, res) => getPortfolio(Newborn, res);
const updateNewborn = (req, res) => updatePortfolio(Newborn, req, res);

// Baby
const getBaby = (req, res) => getPortfolio(Baby, res);
const updateBaby = (req, res) => updatePortfolio(Baby, req, res);

// Family
const getFamily = (req, res) => getPortfolio(Family, res);
const updateFamily = (req, res) => updatePortfolio(Family, req, res);

module.exports = {
    getMaternity,
    updateMaternity,
    getNewborn,
    updateNewborn,
    getBaby,
    updateBaby,
    getFamily,
    updateFamily
};
