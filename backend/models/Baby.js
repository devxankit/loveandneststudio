const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String },
    altText: { type: String },
    size: { type: String, enum: ['normal', 'large', 'tall', 'wide'], default: 'normal' }
}, { _id: true });

const babySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Baby Portfolio' },
        subtitle: { type: String, default: 'Growing fast' },
        bgImage: { type: String }
    },
    gallery: [portfolioItemSchema],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Baby', babySchema);
