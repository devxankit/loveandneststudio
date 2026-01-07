const mongoose = require('mongoose');

const portfolioPageSchema = new mongoose.Schema({
    hero: {
        titleLine1: { type: String, default: 'Port' },
        titleLine2: { type: String, default: 'folio' },
        subtext1: { type: String, default: '/ Est. 2012 /' },
        subtext2: { type: String, default: '/ Dehradun /' },
        strip1: [String],
        strip2: [String],
        strip3: [String]
    },
    categories: [{
        id: String,
        title: String,
        subtitle: String,
        description: String,
        image: String,
        link: String,
        accent: String
    }],
    experience: {
        titleLine1: { type: String, default: 'Every moment' },
        titleLine2: { type: String, default: 'is a masterpiece.' },
        buttonText: { type: String, default: 'Book Your Story' },
        buttonLink: { type: String, default: '/contact' }
    }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioPage', portfolioPageSchema);
