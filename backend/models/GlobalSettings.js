const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema({
    navbarLogo: {
        type: String,
        default: '' // URL for the navbar logo
    },
    footerLogo: {
        type: String,
        default: '' // URL for the footer logo
    },
    // We can add more global settings here later (e.g. site title, favicon)
    siteTitle: {
        type: String,
        default: 'Love & Nest Studio'
    }
}, { timestamps: true });

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
