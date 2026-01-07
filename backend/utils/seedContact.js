const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const PageContent = require('../models/PageContent');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });
connectDB();

const contactPageData = {
    pageSlug: 'contact',
    title: 'Contact Page',
    sections: [
        {
            id: 'hero',
            title: 'Hero Section',
            content: {
                heading: 'Let\'s Connect',
                subheading: 'Inquire with Us',
                text: 'Because every breath, every giggle, and every tiny finger deserves to be remembered exactly as it felt.'
            }
        },
        {
            id: 'info',
            title: 'Contact Information',
            content: {
                email: 'loveandnest@gmail.com',
                phone: '+91 86790 76776',
                location: 'Dehradun, Uttarakhand'
            }
        },
        {
            id: 'sidebar',
            title: 'Sidebar Images',
            content: {
                entranceLabel: 'Studio Entrance — Dehradun',
                entranceImage: '', // Empty initially to use local fallback
                verticalImage: '' // Empty initially to use local fallback
            }
        },
        {
            id: 'collage',
            title: 'Collage Images',
            content: {
                images: [] // Empty initially to use local fallbacks
            }
        }
    ]
};

const seedContact = async () => {
    try {
        console.log('🌱 Seeding Contact Page...');
        await PageContent.deleteOne({ pageSlug: 'contact' });
        await PageContent.create(contactPageData);
        console.log('✅ Contact Page Seeded Successfully with structure!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error}`);
        process.exit(1);
    }
};

seedContact();
