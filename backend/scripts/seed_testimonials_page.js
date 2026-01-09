const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedTestimonialsPage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const existingPage = await PageContent.findOne({ pageSlug: 'testimonials' });
        if (existingPage) {
            console.log('Testimonials page content already exists.');
            // Optionally update it if you want to ensure the structure is correct
            // await PageContent.deleteOne({ pageSlug: 'testimonials' });
        } else {
            console.log('Seeding Testimonials page content...');

            const testimonialPageData = {
                pageSlug: 'testimonials',
                title: 'Testimonials Page',
                meta: {
                    title: 'Testimonials - Love & Nest Studio',
                    description: 'Read reviews and testimonials from our happy clients.',
                    keywords: 'reviews, client love, photography testimonials'
                },
                sections: [
                    {
                        id: 'hero',
                        title: 'Hero Section',
                        type: 'hero',
                        content: {
                            badge: 'Testimonials',
                            heading: 'Trusted by families\nfrom various cities',
                            subheading: 'Learn why professionals trust our lens.',
                            images: [] // Initially empty, or add placeholders if desired
                        }
                    },
                    {
                        id: 'cta',
                        title: 'CTA Section',
                        type: 'cta',
                        content: {
                            text: 'Ready to create your own memories?'
                        }
                    }
                ]
            };

            await PageContent.create(testimonialPageData);
            console.log('✅ Testimonials Page Content Seeded!');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

seedTestimonialsPage();
