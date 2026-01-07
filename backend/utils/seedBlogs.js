const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BlogPost = require('../models/BlogPost');

dotenv.config({ path: './.env' });

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if any blogs exist
        const existingPosts = await BlogPost.countDocuments();
        if (existingPosts > 0) {
            console.log('Blog posts already exist. Skipping seed.');
            process.exit(0);
        }

        const posts = [
            {
                title: "Capturing the First Days: A Newborn Photography Guide",
                slug: "capturing-first-days-newborn-guide",
                excerpt: "Why the first 14 days are crucial for those sleepy, curled-up newborn poses.",
                content: "<p>The first two weeks of a baby's life are fleeting and magical. In this guide, we explore why scheduling your newborn session early is the secret to capturing those peaceful, sleepy moments that parents cherish forever. From womb-like poses to the tiny details of fingers and toes, discover the art of newborn photography.</p>",
                coverImage: "https://res.cloudinary.com/djuyp9lut/image/upload/v1735752332/loveandnest/portfolio/newborn/Screenshot_2026-01-01_225442_rmx8qj.png",
                tags: ["Newborn", "Guide"],
                isPublished: true,
                author: "Anamika",
                publishedAt: new Date()
            },
            {
                title: "What to Wear for Your Maternity Session",
                slug: "what-to-wear-maternity-session",
                excerpt: "Tips on choosing the perfect outfit to showcase your baby bump with elegance.",
                content: "<p>Choosing the right outfit for your maternity shoot can make all the difference. We recommend flowing fabrics that accentuate your bump, solid earth tones that complement our studio's aesthetic, and comfort above all else. Whether you prefer a dramatic gown or a cozy knit sweater, we help you style your session to reflect your personality.</p>",
                coverImage: "https://res.cloudinary.com/djuyp9lut/image/upload/v1735752457/loveandnest/portfolio/maternity/Screenshot_2026-01-01_225737_w4x5y6.png",
                tags: ["Maternity", "Tips"],
                isPublished: true,
                author: "Anamika",
                publishedAt: new Date()
            },
            {
                title: "Preserving Memories: The Importance of Printed Photos",
                slug: "importance-of-printed-photos",
                excerpt: "In a digital age, holding a physical photograph brings a unique joy and legacy.",
                content: "<p>In today's digital world, thousands of photos sit forgotten on our phones. But there is something timeless about a printed photograph using archival-quality paper. It becomes a family heirloom, a tangible piece of history passed down through generations. Let's discuss why we believe in the power of print.</p>",
                coverImage: "https://res.cloudinary.com/djuyp9lut/image/upload/v1735752614/loveandnest/portfolio/toddler/Screenshot_2026-01-01_230014_z8q9r2.png",
                tags: ["Family", "Legacy"],
                isPublished: true,
                author: "Anamika",
                publishedAt: new Date()
            },
            {
                title: "A Day in the Life at Love & Nest Studio",
                slug: "day-in-life-love-and-nest",
                excerpt: "Behind the scenes of a typical photoshoot day filled with laughter and love.",
                content: "<p>Behind the scenes of a typical photoshoot day filled with laughter and love.</p>",
                coverImage: "https://res.cloudinary.com/djuyp9lut/image/upload/v1735752495/loveandnest/portfolio/couples/Screenshot_2026-01-01_225815_t4u5v8.png",
                tags: ["Behind the Scenes", "Studio"],
                isPublished: true,
                author: "Anamika",
                publishedAt: new Date()
            }
        ];

        await BlogPost.insertMany(posts);
        console.log('Sample blog posts seeded successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
};

seedBlogs();
