const mongoose = require('mongoose');

const preBirthdaySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Pre-Birthday' },
        subtitle: { type: String, default: 'Capturing The Anticipation' },
        tagline: { type: String, default: 'A Magical Journey Before The Big Day' },
        images: [{ type: String }] // For the floating/animated elements
    },
    cakeGrid: {
        title: { type: String, default: 'The Sweetest Moments' },
        description: { type: String, default: 'Custom cake-shaped gallery capturing every tiny detail.' },
        images: [String] // Array of images for the cake shape structure
    },
    gallery: [String],
    themeColor: { type: String, default: '#E8CBB6' }
}, { timestamps: true });

module.exports = mongoose.model('PreBirthday', preBirthdaySchema);
