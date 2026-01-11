const mongoose = require('mongoose');

const cakeSmashSchema = new mongoose.Schema({
    hero: {
        tagline: { type: String, default: 'The Birthday Collection' },
        title: { type: String, default: 'Cake Smash & Birthday' },
        subtitle: { type: String, default: 'Celebrating Milestones' },
        backgroundImage: { type: String, default: '' }
    },
    celebrationText: {
        title: { type: String, default: 'A Sweet Celebration' },
        description: { type: String, default: 'Capturing the joy of your little one\'s special day.' }
    },
    giftGrid: {
        title: { type: String, default: 'A Sweet Celebration' },
        tagline: { type: String, default: 'Pure Childhood Joy' },
        images: [String] // Array of 4 images
    },
    hangingGrid: {
        title: { type: String, default: 'Capturing Every Giggle' },
        tagline: { type: String, default: 'The Gallery' },
        images: [String] // Array of 3 images
    },
    experience: [{
        title: String,
        description: String,
        icon: String // Lucide icon name or type
    }],
    cta: {
        title: { type: String, default: "Let's Plan the Party!" },
        buttonText: { type: String, default: "Book A Session" },
        buttonLink: { type: String, default: "/contact" }
    },
    gallery: [{
        url: String,
        caption: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('CakeSmash', cakeSmashSchema);
