const mongoose = require('mongoose');

const hospitalSessionSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true, enum: ['birth', 'newborn', 'family'] }, // Sub-category type
    hero: {
        title: { type: String, default: 'Fresh 48' },
        subtitle: { type: String, default: 'The Beginning' },
        text: { type: String, default: 'Capturing the newness of life.' },
        images: [{ type: String }], // Infinite scroll images
        floatingImages: [{ type: String }] // Floating bubbles in hero
    },
    welcome: {
        handwriting: { type: String, default: 'hello world' },
        title: { type: String, default: "First Breaths" },
        text: { type: String, default: "There is nothing quite like those first few hours..." },
        image: { type: String },
        buttonText: { type: String, default: 'Book Now' }
    },
    puzzleImages: [{ type: String }] // Swapping grid images
}, { timestamps: true });

module.exports = mongoose.model('HospitalSession', hospitalSessionSchema);
