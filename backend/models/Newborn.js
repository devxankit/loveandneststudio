const mongoose = require('mongoose');

const newbornSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Sweet Newborn' },
        subtitle: { type: String, default: 'Helping Your Littles Shine' },
        image: { type: String, default: '' }
    },
    welcome: {
        title: { type: String, default: 'Welcome' },
        text: { type: String, default: "Welcome to Love & Nest Studio's Newborn Portfolio..." },
        image: { type: String, default: '' }
    },
    gallery: [{ type: String }], // Array of image URLs
}, { timestamps: true });

module.exports = mongoose.model('Newborn', newbornSchema);
