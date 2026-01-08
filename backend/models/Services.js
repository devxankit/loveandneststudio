const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Our Photography Services' },
        subtitle: { type: String, default: 'Timeless Memories Captured with Love' }
    },
    serviceList: [{
        id: { type: String, required: true }, // slug, e.g. 'maternity'
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String }, // Short description for card
        details: { type: String }, // Long description for sub-page
        coverImage: { type: String },
        galleryImages: { type: [String], default: [] }, // Array of image URLs for sub-page
        price: { type: Number },
        features: { type: [String], default: [] },
        isActive: { type: Boolean, default: true }
    }],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Services', servicesSchema);
