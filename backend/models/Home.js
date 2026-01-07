const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Welcome to Love & Nest' },
        subtitle: { type: String, default: 'Capturing Timeless Moments' },
        bgImage: { type: String }
    },
    aboutSection: {
        heading: { type: String, default: 'About Us' },
        content: { type: String },
        image: { type: String }
    },
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
