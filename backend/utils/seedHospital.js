const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const PortfolioPage = require('../models/PortfolioPage');
const HospitalPage = require('../models/HospitalPage');
const HospitalSession = require('../models/HospitalSession');

dotenv.config({ path: './.env' }); // Assuming we run from backend root

const seedHospital = async () => {
    try {
        await connectDB();

        // 1. Update Portfolio Page with "Hospital" Category
        const portfolioPage = await PortfolioPage.findOne();
        if (portfolioPage) {
            const hasHospital = portfolioPage.categories.some(c => c.id === 'hospital');
            if (!hasHospital) {
                portfolioPage.categories.push({
                    id: 'hospital',
                    title: 'Hospital',
                    subtitle: 'Raw & Real',
                    description: 'The first 48 hours of life, captured authentically.',
                    image: 'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937541/loveandnest/assets/hero/Screenshot%202025-12-30%20141652.png', // Fallback or placeholder
                    link: '/portfolio/hospital'
                });
                await portfolioPage.save();
                console.log('Added Hospital category to Portfolio Page.');
            } else {
                console.log('Hospital category already exists in Portfolio Page.');
            }
        }

        // 2. Seed Main Hospital Page
        const hospitalPage = await HospitalPage.findOne();
        if (!hospitalPage) {
            await HospitalPage.create({
                categories: [
                    {
                        id: 'birth',
                        title: 'Birth Story',
                        description: 'Documenting labor and delivery.',
                        link: '/portfolio/hospital/birth',
                        image: 'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937585/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%230114.png'
                    },
                    {
                        id: 'newborn',
                        title: 'Fresh 48',
                        description: 'First 48 hours in hospital.',
                        link: '/portfolio/hospital/newborn',
                        image: 'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937541/loveandnest/assets/hero/Screenshot%202025-12-30%20141652.png'
                    },
                    {
                        id: 'family',
                        title: 'First Family',
                        description: 'Siblings meeting the baby.',
                        link: '/portfolio/hospital/family',
                        image: 'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937567/loveandnest/assets/portfolio/family/Screenshot%202025-12-31%20111323.png'
                    }
                ]
            });
            console.log('Created Main Hospital Page.');
        }

        // 3. Seed Sub-Sessions with Images
        const types = ['birth', 'newborn', 'family'];
        const sampleImages = [
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937541/loveandnest/assets/hero/Screenshot%202025-12-30%20141652.png',
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1736615560/loveandnest/assets/portfolio/toddler/t5.jpg',
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937567/loveandnest/assets/portfolio/family/Screenshot%202025-12-31%20111323.png',
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1736615557/loveandnest/assets/portfolio/toddler/t1.jpg',
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1767937585/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%230114.png',
            'https://res.cloudinary.com/djuyp9lut/image/upload/v1736615558/loveandnest/assets/portfolio/toddler/t3.jpg'
        ];

        for (const type of types) {
            const session = await HospitalSession.findOne({ type });
            if (!session) {
                await HospitalSession.create({
                    type,
                    hero: {
                        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Session`,
                        text: `Experience the raw beauty of your family's ${type} story.`
                    },
                    puzzleImages: sampleImages // Add images so they are not empty
                });
                console.log(`Created Hospital Session: ${type}`);
            } else if (session.puzzleImages.length === 0) {
                // Also update if they exist but are empty
                session.puzzleImages = sampleImages;
                await session.save();
                console.log(`Updated Hospital Session with images: ${type}`);
            }
        }

        console.log('Hospital seeding complete.');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedHospital();
