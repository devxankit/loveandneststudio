const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String },
    altText: { type: String },
    size: { type: String, enum: ['normal', 'large', 'tall', 'wide'], default: 'normal' }
}, { _id: true });

const newbornSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Newborn Portfolio' },
        subtitle: { type: String, default: 'Tiny Miracles' },
        bgImage: { type: String }
    },
    gallery: [portfolioItemSchema],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Newborn', newbornSchema);
