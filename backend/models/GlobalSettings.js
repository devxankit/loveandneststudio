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
    },
    seoDescription: {
        type: String,
        default: 'Professional photography services specializing in maternity, newborn, and family portraits in Dehradun.'
    },
    ownerName: {
        type: String,
        default: 'Anamika'
    },
    contactPhone: {
        type: String,
        default: '+91 98765 43210'
    },
    contactEmail: {
        type: String,
        default: 'hello@loveandnest.com'
    }
}, { timestamps: true });

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
