const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedTestimonials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing
        await Testimonial.deleteMany({});
        console.log('Cleared existing testimonials');

        const testimonials = [
            {
                clientName: "Priya Sharma",
                rating: 5,
                serviceType: "Maternity",
                content: "An absolute dream to work with! The team made me feel so comfortable during my maternity shoot. The photos are magical and something I will cherish forever.",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937582/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225916.png",
                isFeatured: true
            },
            {
                clientName: "Rahul & Anjali",
                rating: 5,
                serviceType: "Newborn",
                content: "We were worried about how our newborn would handle the session, but they were so patient and gentle. The results are breathtaking!",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937575/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225745.png",
                isFeatured: true
            },
            {
                clientName: "Sneha Gupta",
                rating: 5,
                serviceType: "Family",
                content: "Best photography studio in the city! They captured our family's essence perfectly. Highly recommend to everyone.",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937578/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225807.png",
                isFeatured: true
            },
            {
                clientName: "Vikram Singh",
                rating: 4,
                serviceType: "Baby",
                content: "Professional, creative, and very easy to work with. The studio setup is beautiful and very baby-friendly.",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937579/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225812.png",
                isFeatured: false
            },
            {
                clientName: "Meera & Rohan",
                rating: 5,
                serviceType: "Maternity",
                content: "I felt like a queen during my session. The gowns they provide are stunning, and the lighting was just perfect.",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937581/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225901.png",
                isFeatured: true
            },
            {
                clientName: "Aditi Roy",
                rating: 5,
                serviceType: "Legacy",
                content: "Every picture tells a story. Thank you Love & Nest for capturing ours so beautifully.",
                image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937583/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20225924.png",
                isFeatured: true
            }
        ];

        await Testimonial.insertMany(testimonials);
        console.log('✅ Seeding complete!');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

seedTestimonials();
