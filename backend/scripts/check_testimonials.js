const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const checkTestimonials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const count = await Testimonial.countDocuments();
        console.log(`Found ${count} testimonials.`);

        if (count > 0) {
            const sample = await Testimonial.findOne();
            console.log('Sample testimonial:', sample);
        } else {
            console.log('No testimonials found. You might want to seed some.');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkTestimonials();
