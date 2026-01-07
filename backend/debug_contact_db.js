const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const PageContent = require('./models/PageContent');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const checkContactData = async () => {
    try {
        const page = await PageContent.findOne({ pageSlug: 'contact' });
        if (page) {
            console.log("Contact Page Found");
            page.sections.forEach(s => {
                console.log(`Section [${s.id}]:`, JSON.stringify(s.content, null, 2));
            });
        } else {
            console.log("Contact Page NOT Found");
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkContactData();
