const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../config/cloudinary');
const PageContent = require('../models/PageContent');
const BlogPost = require('../models/BlogPost');
const Testimonial = require('../models/Testimonial');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

// --- DATA DEFINITIONS ---

// Define the content directly here to allow dynamic image mapping
// Define the content directly here to allow dynamic image mapping
const initialPages = [
    {
        pageSlug: 'home',
        title: 'Home Page',
        sections: [
            {
                id: 'hero',
                title: 'Hero Slider',
                type: 'slider',
                content: {
                    heading: 'Love & Nest',
                    subheading: 'Artistic Motherhood',
                    slides: [],
                    overlay_text: 'Capturing the essence of life.'
                }
            },
            {
                id: 'intro',
                title: 'Introduction',
                type: 'content',
                content: {
                    heading: 'Hello and Welcome',
                    text: 'We preserve the feeling of a moment, not just the look.',
                    image: ''
                }
            },
            {
                id: 'artist',
                title: 'The Artist',
                type: 'content',
                content: {
                    name: 'Anamika',
                    role: 'Lead Photographer',
                    bio: 'A photographer with a deep passion for capturing the authentic essence of motherhood and family connections.',
                    portrait: ''
                }
            },
            {
                id: 'collage',
                title: 'Visual Collage',
                type: 'gallery',
                content: {
                    images: [] // For HorizontalCollage
                }
            }
        ]
    },
    {
        pageSlug: 'about',
        title: 'About Page',
        sections: [
            {
                id: 'bio',
                title: 'Biography',
                type: 'content',
                content: {
                    heading: 'The Photographer',
                    text: "I'm Anamika, the founder and photographer behind Love & Nest, with over 13 years of professional experience."
                }
            },
            {
                id: 'floating_gallery',
                title: 'Floating Gallery',
                type: 'gallery',
                content: {
                    images: [] // For the 21 floating images
                }
            }
        ]
    },
    {
        pageSlug: 'contact',
        title: 'Contact Page',
        sections: [
            {
                id: 'hero',
                title: 'Hero Section',
                type: 'content',
                content: {
                    subheading: 'Inquire with Us',
                    heading: "Let's Connect",
                    text: "Because every breath, every giggle, and every tiny finger deserves to be remembered exactly as it felt."
                }
            },
            {
                id: 'info',
                title: 'Contact Information',
                type: 'text',
                content: {
                    email: 'loveandnest@gmail.com',
                    phone: '+91 86790 76776',
                    location: 'Dehradun, Uttarakhand'
                }
            },
            {
                id: 'sidebar',
                title: 'Sidebar Images',
                type: 'content',
                content: {
                    entranceImage: '', // img1
                    entranceLabel: 'Studio Entrance — Pune',
                    verticalImage: '' // verticalImg
                }
            },
            {
                id: 'collage',
                title: 'Bottom Collage',
                type: 'gallery',
                content: {
                    images: [] // img2, img3
                }
            }
        ]
    }
];

const initialBlogPosts = [
    {
        title: 'When Is the Best Time to Plan Your Maternity Photoshoot?',
        slug: 'best-time-for-maternity-shoot',
        excerpt: 'Discover why 28–32 weeks is the safest and most beautiful time for a relaxed, magazine-style maternity shoot experience.',
        content: '<p>Pregnancy is a fleeting time in your life. While it may feel long when you are in it, you will look back and miss the bump! Documenting this time allows you to relive the anticipation and joy.</p><p>We recommend booking your session between 28 and 32 weeks.</p>',
        date: 'Jan 2, 2026',
        tags: ['Maternity Guide'],
        coverImage: '', // To be filled
        isPublished: true,
        publishedAt: new Date('2026-01-02')
    }
];

const initialTestimonials = [
    {
        id: 1, // temporary ID for mapping
        clientName: "Priya Jha",
        role: "Happy Mother", // map to serviceType or keep separate if schema supports it. Schema has serviceType.
        content: "Hello Anamika, Thank you for the beautiful photos. Your work is wonderful and you are a very nice photographer—professional, kind, and talented. Thank you for making my son 1st birthday special.. I loved the colors and how you captured the moments. Again Thank you 😊 ❤️",
        rating: 5,
        image: "", // To be filled
        serviceType: "Happy Mother"
    },
    {
        id: 2,
        clientName: "Reshu Verma",
        role: "Mentor",
        content: "Anamika is a rare blend of precision, grace, and quiet strength... (See full text in frontend)",
        rating: 5,
        image: "",
        serviceType: "Mentor"
    }
];

// Helper to Create Task
// Types: 'page', 'blog', 'testimonial'
const createTask = (label, relPath, targetType, identifier, key, isArray = false, sectionId = null) => ({
    label,
    path: relPath,
    target: { type: targetType, id: identifier, sectionId, key, isArray }
});

const heroDir = 'frontend/src/assets/images/hero';
const aboutDir = 'frontend/src/assets/images/about';
const familyDir = 'frontend/src/assets/images/portfolio/family';
const contactDir = 'frontend/src/assets/images/contract';
const maternityDir = 'frontend/src/assets/images/portfolio/maternity';
const testimonialDir = 'frontend/src/assets/images/testimonials';

const imagesToUpload = [
    // --- HOME PAGE ---
    createTask('Hero Slide 1', `${heroDir}/Screenshot 2025-12-30 141652.png`, 'page', 'home', 'slides', true, 'hero'),
    createTask('Hero Slide 2', `${heroDir}/Screenshot 2025-12-30 141700.png`, 'page', 'home', 'slides', true, 'hero'),
    createTask('Hero Slide 3', `${heroDir}/Screenshot 2025-12-30 141711.png`, 'page', 'home', 'slides', true, 'hero'),
    createTask('Hero Slide 4', `${heroDir}/Screenshot 2025-12-30 141721.png`, 'page', 'home', 'slides', true, 'hero'),

    createTask('Intro Image', `${familyDir}/Screenshot 2025-12-31 111323.png`, 'page', 'home', 'image', false, 'intro'),
    createTask('Artist Portrait', `${aboutDir}/01-1.jpg`, 'page', 'home', 'portrait', false, 'artist'),

    // Collage
    createTask('Collage 1', `${heroDir}/Screenshot 2025-12-30 141652.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 2', `${heroDir}/Screenshot 2025-12-30 141700.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 3', `${heroDir}/Screenshot 2025-12-30 141711.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 4', `${heroDir}/Screenshot 2025-12-30 141721.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 5', `${heroDir}/Screenshot 2025-12-30 141756.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 6', `${heroDir}/Screenshot 2025-12-30 141833.png`, 'page', 'home', 'images', true, 'collage'),
    createTask('Collage 7', `${heroDir}/Screenshot 2025-12-30 141842.png`, 'page', 'home', 'images', true, 'collage'),

    // --- ABOUT PAGE ---
    createTask('About 1', `${aboutDir}/01-1.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 2', `${aboutDir}/02-01.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 3', `${aboutDir}/0385.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 4', `${aboutDir}/0390.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 5', `${aboutDir}/0398.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 6', `${aboutDir}/0414.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 7', `${aboutDir}/0418.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),
    createTask('About 8', `${aboutDir}/0424.jpg`, 'page', 'about', 'images', true, 'floating_gallery'),

    // --- CONTACT PAGE ---
    createTask('Contact Entrance', `${contactDir}/Screenshot 2025-12-30 104112.png`, 'page', 'contact', 'entranceImage', false, 'sidebar'),
    createTask('Contact Collage 1', `${contactDir}/Screenshot 2025-12-30 104125.png`, 'page', 'contact', 'images', true, 'collage'),
    createTask('Contact Collage 2', `${contactDir}/Screenshot 2025-12-30 104143.png`, 'page', 'contact', 'images', true, 'collage'),
    createTask('Contact Vertical', `${contactDir}/_FOR BA .jpg`, 'page', 'contact', 'verticalImage', false, 'sidebar'),

    // --- BLOG POSTS ---
    createTask('Maternity Blog Cover', `${maternityDir}/Screenshot 2026-01-01 225737.png`, 'blog', 'best-time-for-maternity-shoot', 'coverImage'),

    // --- TESTIMONIALS ---
    createTask('Testimonial Priya', `${testimonialDir}/Screenshot 2025-12-31 114249.png`, 'testimonial', 1, 'image'),
    createTask('Testimonial Reshu', `${testimonialDir}/Screenshot 2025-12-31 114257.png`, 'testimonial', 2, 'image'),
];

const seedWithCloudinary = async () => {
    try {
        console.log('🌱 Starting Cloudinary Seeding Process...');

        // 1. Clear Existing Data
        await PageContent.deleteMany();
        await BlogPost.deleteMany();
        await Testimonial.deleteMany();
        console.log('✅ Cleared existing db content.');

        // 2. Iterate and Upload Images
        for (const imgTask of imagesToUpload) {
            // Resolve absolute path
            const imagePath = path.resolve(__dirname, '../../', imgTask.path);

            if (fs.existsSync(imagePath)) {
                console.log(`⬆️ Uploading: ${imgTask.label}...`);
                try {
                    const result = await cloudinary.uploader.upload(imagePath, {
                        folder: 'loveandnest/seeds'
                    });

                    const url = result.secure_url;
                    // console.log(`   ✅ Uploaded: ${url}`);

                    // UPDATE LOGIC BASED ON TARGET TYPE
                    if (imgTask.target.type === 'page') {
                        const page = initialPages.find(p => p.pageSlug === imgTask.target.id);
                        if (page) {
                            const section = page.sections.find(s => s.id === imgTask.target.sectionId);
                            if (section) {
                                if (imgTask.target.isArray) {
                                    section.content[imgTask.target.key].push(url);
                                } else {
                                    section.content[imgTask.target.key] = url;
                                }
                            }
                        }
                    } else if (imgTask.target.type === 'blog') {
                        const post = initialBlogPosts.find(p => p.slug === imgTask.target.id);
                        if (post) {
                            post[imgTask.target.key] = url;
                        }
                    } else if (imgTask.target.type === 'testimonial') {
                        const t = initialTestimonials.find(x => x.id === imgTask.target.id);
                        if (t) {
                            t[imgTask.target.key] = url;
                        }
                    }

                } catch (uploadOrr) {
                    console.error(`   ❌ Failed to upload ${imgTask.label}:`, uploadOrr.message);
                }
            } else {
                console.warn(`   ⚠️ File not found: ${imgTask.path}`);
            }
        }

        // 3. Insert into MongoDB
        await PageContent.insertMany(initialPages);

        // Remove IDs from testimonials before inserting (Monoose handles _id)
        const cleanTestimonials = initialTestimonials.map(({ id, ...rest }) => rest);
        await Testimonial.insertMany(cleanTestimonials);

        await BlogPost.insertMany(initialBlogPosts);

        console.log('✅ Database populated with Cloudinary URLs (Pages, Blogs, Testimonials).');
        console.log('🎉 Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`❌ Seeding Error: ${error}`);
        process.exit(1);
    }
};

seedWithCloudinary();
