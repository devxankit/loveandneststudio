const mongoose = require('mongoose');
const CakeSmash = require('../models/CakeSmash');
const dotenv = require('dotenv');

dotenv.config();

// Default images (placeholders)
const defaults = {
    heroBg: 'https://res.cloudinary.com/dnglpqiza/image/upload/v1736608553/birthday-hero_qyz13x.jpg',
    img1: 'https://res.cloudinary.com/dnglpqiza/image/upload/v1736608553/cake1_abc.jpg',
    img2: 'https://res.cloudinary.com/dnglpqiza/image/upload/v1736608553/cake2_def.jpg'
};

const seedCakeSmashPage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding Cake Smash page...');

        const existing = await CakeSmash.findOne();
        if (existing) {
            console.log('Cake Smash page data already exists. Skipping...');
        } else {
            await CakeSmash.create({
                hero: {
                    title: 'Cake Smash & Birthday',
                    subtitle: 'Celebrating Milestones',
                    backgroundImage: defaults.heroBg
                },
                gallery: [
                    { url: defaults.img1, caption: 'First Bite', layout: 'gift-grid' },
                    { url: defaults.img2, caption: 'Messy Joy', layout: 'gift-grid' },
                    { url: defaults.img1, caption: 'Smiles', layout: 'gift-grid' },
                    { url: defaults.img2, caption: 'Fun', layout: 'gift-grid' }
                ],
                celebrationText: {
                    title: 'A Sweet Celebration',
                    description: 'Capturing the joy of your little one\'s special day.'
                }
            });
            console.log('Cake Smash page seeded with default data.');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding Cake Smash page:', error);
        mongoose.disconnect();
    }
};

seedCakeSmashPage();
