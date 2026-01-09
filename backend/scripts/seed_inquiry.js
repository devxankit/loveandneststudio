const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedInquiry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const dummyInquiry = {
            name: "Rahul Sharma",
            email: "rahul.demo@example.com",
            phone: "+91 9876543210",
            serviceType: "Maternity",
            date: new Date(),
            message: "I am interested in a maternity shoot for next month. Could you please share the packages?",
            status: "New"
        };

        await Inquiry.create(dummyInquiry);
        console.log('✅ Dummy Inquiry Added! Dashboard should now show 1 inquiry.');

        // Also add a second one to make it look active
        await Inquiry.create({
            name: "Priya Singh",
            email: "priya.singh@example.com",
            serviceType: "Newborn",
            message: "Looking for a newborn session for my baby boy.",
            status: "New"
        });
        console.log('✅ Second dummy inquiry added.');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

seedInquiry();
