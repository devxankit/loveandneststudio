const mongoose = require('mongoose');
const Maternity = require('../models/Maternity');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedMaternity = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clean existing
        await Maternity.deleteMany({});
        console.log('Cleared existing Maternity data');

        const img1 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937574/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225737.png";
        const img2 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937575/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225745.png";
        const img3 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937576/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225753.png";
        const img4 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937577/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225801.png";
        const img5 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937578/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225807.png";
        const img6 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937579/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225812.png";
        const img7 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937581/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225901.png";
        const img8 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937582/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225916.png";
        const img9 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937583/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225924.png";
        const img10 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937584/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%230059.png";
        const img11 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937585/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%230114.png";
        const img12 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937586/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%230124.png";

        const maternityPage = {
            hero: {
                title: "The Glow of Motherhood",
                subtitle: "Captured Forever",
                image: img1
            },
            editorial: {
                title: "A Moment in Time",
                text: "Pregnancy is one of the most transformative times in a woman's life...",
                image1: img2,
                image2: img3
            },
            silhouette: {
                image: img4,
                title: "Silhouettes of Love",
                text: "Artistic shadows and light play..."
            },
            journey: {
                images: [img2, img3, img12],
                title: "Your Journey",
                subtitle: "Growing with love"
            },
            poses: {
                title: "Timeless Poses",
                subtitle: "For Your Session",
                images: [img5, img6, img7, img8]
            },
            gallery: [
                img9, img10, img11, img1, img4
            ],
            cta: {
                title: "Ready to Capture Your Glow?",
                text: "Let's create something beautiful together."
            }
        };

        await Maternity.create(maternityPage);
        console.log('✅ Maternity Data Seeded Successfully with Correct Schema!');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

seedMaternity();
