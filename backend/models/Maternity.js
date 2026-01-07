const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String },
    altText: { type: String },
    // Layout options depending on grid needs
    size: { type: String, enum: ['normal', 'large', 'tall', 'wide'], default: 'normal' }
}, { _id: true });

const maternitySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Maternity Portfolio' },
        subtitle: { type: String, default: 'Celebrating Motherhood' },
        bgImage: { type: String }
    },
    gallery: [portfolioItemSchema],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Maternity', maternitySchema);
