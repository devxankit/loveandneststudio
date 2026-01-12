const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Birthday Celebrations' },
        subtitle: { type: String, default: 'Capturing Every Joyous Year' },
        tagline: { type: String, default: 'Timeless Memories of Growing Up' },
        backgroundImage: { type: String, default: '' },
        floatingImages: [String] // Small animated images/elements
    },
    intro: {
        title: { type: String, default: 'A Day to Remember' },
        description: { type: String, default: 'From the first candle to every wish thereafter, we capture the magic of childhood birthdays.' },
        image: { type: String, default: '' }
    },
    gallery: [String],
    videos: [String],
    themes: [{
        title: String,
        description: String,
        image: String
    }],
    cta: {
        title: { type: String, default: "Make Their Wish Last Forever" },
        text: { type: String, default: "Ready to book a birthday session?" },
        buttonText: { type: String, default: "Reserve Your Date" },
        buttonLink: { type: String, default: "/contact" }
    },
    themeColor: { type: String, default: '#FDE2E4' }
}, { timestamps: true });

module.exports = mongoose.model('Birthday', birthdaySchema);
