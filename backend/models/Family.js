const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String },
    altText: { type: String },
    size: { type: String, enum: ['normal', 'large', 'tall', 'wide'], default: 'normal' }
}, { _id: true });

const familySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Family Portfolio' },
        subtitle: { type: String, default: 'Love and laughter' },
        bgImage: { type: String }
    },
    gallery: [portfolioItemSchema],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Family', familySchema);
