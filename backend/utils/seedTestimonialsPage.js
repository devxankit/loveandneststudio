const PageContent = require('../models/PageContent');

const seedTestimonialPage = async () => {
    try {
        const exists = await PageContent.findOne({ pageSlug: 'testimonials' });
        if (exists) {
            console.log('Testimonials page content already exists.');
            return;
        }

        await PageContent.create({
            pageSlug: 'testimonials',
            title: 'Testimonials Page',
            sections: [
                {
                    id: 'hero',
                    title: 'Hero Section',
                    type: 'content',
                    content: {
                        badge: 'Testimonials',
                        heading: 'Trusted by families\nfrom various cities',
                        subheading: 'Learn why professionals trust our lens.'
                    }
                },
                {
                    id: 'cta',
                    title: 'Bottom CTA',
                    type: 'content',
                    content: {
                        text: 'Ready to create your own memories?'
                    }
                }
            ],
            meta: {
                title: 'Testimonials - Love & Nest Studio',
                description: 'Read reviews and testimonials from our happy clients.',
                keywords: 'reviews, photography testimonials, client feedback'
            }
        });

        console.log('Testimonials page content seeded successfully.');
    } catch (error) {
        console.error('Error seeding testimonials page:', error);
    }
};

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); // Assuming we run from backend root

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const runSeed = async () => {
    await connectDB();
    await seedTestimonialPage();
    process.exit();
};

runSeed();
