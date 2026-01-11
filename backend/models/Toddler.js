const mongoose = require('mongoose');

const toddlerSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Toddler' },
        subtitle: { type: String, default: 'Photography & Videography' },
        tagline: { type: String, default: 'From Planning to Execution' },
        phoneNumber: { type: String, default: '+1 234 567 890' },
        email: { type: String, default: 'hello@loveandnest.com' },
        images: [{ type: String }] // Need at least 6 images for the circular grid
    },
    gallery: [{ type: String }],
    themeColor: { type: String, default: '#5A2A45' } // Studio's Plum color
}, { timestamps: true });

module.exports = mongoose.model('Toddler', toddlerSchema);
