const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    hero: {
        fixedBgImage: String,
        experienceText: String,
        titleLine1: String,
        titleLine2: String,
    },
    philosophy: {
        image: String,
        titleLine1: String,
        titleLine2: String,
        text1: String,
        text2: String,
        author: String,
        role: String,
    },
    banner: {
        image: String,
        quote: String,
    },
    selectedWorks: [{
        image: String,
        title: String,
        subtitle: String,
    }],
    mosaic: {
        image1: String,
        title: String,
        image2: String,
    },
    archGrid: {
        images: [String], // Array of 5 images
        lineArtImage: String,
        title: String,
    },
    collage: {
        images: [String], // Array of 5 images for the holiday grid
        title: String,
        subtitle: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Family', familySchema);
