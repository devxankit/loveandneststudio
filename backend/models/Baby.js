const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Coming Soon' },
        subtitle: { type: String, default: 'Something Beautiful' },
        text: { type: String, default: 'We are curating a gallery of tiny miracles and sweet moments.' },
        images: [{ type: String }] // For the infinite scrolling columns
    },
    welcome: {
        handwriting: { type: String, default: 'welcome!' },
        title: { type: String, default: "Let's break the ice" },
        text: { type: String, default: "I'm the photographer behind Love & Nest..." },
        image: { type: String },
        buttonText: { type: String, default: 'My Full Adventure' }
    },
    adventureModal: {
        topImage: { type: String },
        content: { type: String, default: "Your adventure content goes here..." },
        sideImage: { type: String }
    },
    puzzleImages: [{ type: String }] // For the puzzle grid (Sneak Peek)
}, { timestamps: true });

module.exports = mongoose.model('Baby', babySchema);
