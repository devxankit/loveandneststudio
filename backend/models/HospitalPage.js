const mongoose = require('mongoose');

const hospitalPageSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Hospital Sessions' },
        subtitle: { type: String, default: 'Capturing the first hours' },
        description: { type: String, default: 'Preserve the raw, emotional, and beautiful moments of your baby\'s first hours in the hospital.' },
        image: { type: String, default: '' }, // Main hero image
        buttonText: { type: String, default: 'View Gallery' }
    },
    categoriesSection: {
        title: { type: String, default: 'Our Packages' },
        subtitle: { type: String, default: 'Choose your session' }
    },
    categories: [{
        id: { type: String, required: true }, // 'birth', 'newborn', 'family'
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        link: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('HospitalPage', hospitalPageSchema);
