const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Our Services' },
        subtitle: { type: String, default: 'What We Offer' },
        bgImage: { type: String }
    },
    serviceList: [{
        title: { type: String, required: true },
        description: { type: String },
        categories: { type: [String] }, // e.g. ['maternity', 'newborn'] if applicable
        startingPrice: { type: String },
        image: { type: String }
    }],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Services', servicesSchema);
