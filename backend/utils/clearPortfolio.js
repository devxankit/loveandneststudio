const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const PageContent = require('../models/PageContent');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });
connectDB();

const clearPortfolio = async () => {
    try {
        console.log('🗑️ Clearing Portfolio Data...');
        await PageContent.deleteOne({ pageSlug: 'portfolio' });
        console.log('✅ Portfolio data cleared. Frontend should now revert to local defaults.');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error}`);
        process.exit(1);
    }
};

clearPortfolio();
