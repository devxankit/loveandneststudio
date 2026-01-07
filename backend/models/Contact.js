const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Contact Us' },
        subtitle: { type: String, default: 'Get in Touch' },
        bgImage: { type: String }
    },
    contactInfo: {
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        googleMapEmbedUrl: { type: String }
    },
    socialLinks: {
        instagram: { type: String },
        facebook: { type: String },
        pinterest: { type: String }
    },
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
