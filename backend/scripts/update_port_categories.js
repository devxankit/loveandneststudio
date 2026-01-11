const mongoose = require('mongoose');
const PortfolioPage = require('../models/PortfolioPage');
const dotenv = require('dotenv');

dotenv.config();

const addCakeSmashToPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        const page = await PortfolioPage.findOne();
        if (page) {
            // Check if cakesmash already exists in categories
            const exists = page.categories.some(cat => cat.id === 'cakesmash');
            if (!exists) {
                page.categories.push({
                    id: 'cakesmash',
                    title: 'Cake Smash',
                    subtitle: 'Sweet Celebrations',
                    description: 'Fun, messy, and memorable first birthday moments.',
                    link: '/portfolio/cakesmash',
                    accent: 'bg-[#D14D72]'
                });
                await page.save();
                console.log('Cake Smash category added to Portfolio landing page.');
            } else {
                console.log('Cake Smash category already exists in Portfolio.');
            }
        } else {
            console.log('PortfolioPage document not found. Running seed script might be better.');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating Portfolio page:', error);
        mongoose.disconnect();
    }
};

addCakeSmashToPortfolio();
