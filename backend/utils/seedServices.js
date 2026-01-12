const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Services = require('../models/Services');

dotenv.config();

const savedServices = [
    {
        id: 'maternity',
        title: "Maternity",
        subtitle: "Embracing Motherhood",
        description: "Soft, soulful portraits that celebrate motherhood, love, and the beautiful bond between parents and baby—before your little one arrives.",
        details: "Our maternity sessions are designed to make you feel empowered and beautiful. We provide a curated closet of high-end gowns and fabrics. The best time to schedule is between 28-34 weeks when you are showing comfortably.",
        coverImage: "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png",
        galleryImages: [
            "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png",
            "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png",
            "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png",
            "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png",
            "/images/portfolio/maternity/Screenshot 2026-01-01 225737.png"
        ],
        price: 15000,
        features: ["1 Hour Session", "15 Edited Images", "Access to Client Closet", "Family Portraits Included"],
        isActive: true
    },
    {
        id: 'birth',
        title: "Birth",
        subtitle: "The Miracle of Life",
        description: "Capturing the raw, powerful, and miraculous journey of bringing life into the world. Every emotion, every first breath, preserved forever.",
        details: "We document the labor and delivery process with respect and discretion, capturing the first breath and first bond.",
        coverImage: "/images/hero/Screenshot 2025-12-30 141652.png",
        galleryImages: [
            "/images/hero/Screenshot 2025-12-30 141652.png",
            "/images/hero/Screenshot 2025-12-30 141756.png",
            "/images/hero/Screenshot 2025-12-30 141652.png",
            "/images/hero/Screenshot 2025-12-30 141756.png",
            "/images/hero/Screenshot 2025-12-30 141652.png"
        ],
        price: 35000,
        isActive: true
    },
    {
        id: 'newborn',
        title: "Newborn",
        subtitle: "The First Days",
        description: "Gentle, cozy newborn sessions designed with safety and comfort at the heart. Natural poses, minimal props, and timeless imagery.",
        details: "Safety and comfort are our top priorities. We are trained in newborn safety and posing. Sessions are best scheduled within the first 5-15 days of birth. We provide all props, wraps, and accessories.",
        coverImage: "/images/hero/Screenshot 2025-12-30 141652.png",
        galleryImages: [
            "/images/hero/Screenshot 2025-12-30 141652.png",
            "/images/hero/Screenshot 2025-12-30 141756.png",
            "/images/hero/Screenshot 2025-12-30 141652.png",
            "/images/hero/Screenshot 2025-12-30 141756.png",
            "/images/hero/Screenshot 2025-12-30 141652.png"
        ],
        price: 25000,
        features: ["2-3 Hour Session", "20 Edited Images", "Organic Props & Wraps", "Advanced Retouching"],
        isActive: true
    },
    {
        id: 'pre-bday',
        title: "Pre Bday",
        subtitle: "The Anticipation",
        description: "Capturing the milestones and anticipation leading up to your little one's special day. The smiles, the giggles, and the growth.",
        details: "Perfect for documenting the crawling, standing, or walking stages before the first birthday.",
        coverImage: "/images/portfolio/baby/Screenshot 2025-12-31 153257.png",
        galleryImages: [
            "/images/portfolio/baby/Screenshot 2025-12-31 153257.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153323.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153353.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153257.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153323.png"
        ],
        price: 12000,
        isActive: true
    },
    {
        id: 'cakesmash',
        title: "Cake Smash",
        subtitle: "Smash & Splash",
        description: "Fun, colorful, and joy-filled first birthday shoots. Let your baby explore, play, and celebrate while we capture the magic (and the mess!).",
        details: "Celebrate the big One! We custom design the set to match your theme. We handle the cake, the decorations, and the cleanup. You just bring the baby!",
        coverImage: "/images/portfolio/baby/Screenshot 2025-12-31 153323.png",
        galleryImages: [
            "/images/portfolio/baby/Screenshot 2025-12-31 153323.png",
            "/images/hero/Screenshot 2025-12-30 141842.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153353.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153323.png",
            "/images/hero/Screenshot 2025-12-30 141700.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153257.png"
        ],
        price: 18000,
        isActive: true
    },
    {
        id: 'toddler',
        title: "Toddler",
        subtitle: "Little Explorers",
        description: "Energetic and personality-filled sessions that capture the wonder and curiosity of your growing child exploring the world.",
        details: "We follow their lead, capturing genuine expressions and playful moments in a safe environment.",
        coverImage: "/images/portfolio/baby/Screenshot 2025-12-31 153353.png",
        galleryImages: [
            "/images/portfolio/baby/Screenshot 2025-12-31 153353.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153353.png",
            "/images/hero/Screenshot 2025-12-30 141756.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153323.png",
            "/images/portfolio/baby/Screenshot 2025-12-31 153353.png"
        ],
        price: 15000,
        isActive: true
    },
    {
        id: 'family',
        title: "Family",
        subtitle: "Bond & Connection",
        description: "Warm, timeless family portraits that reflect genuine connections, love, and togetherness—perfect for generations to treasure.",
        details: "Focusing on connection and love. We guide you through natural interactions to capture the genuine bond of your family. Pets are always welcome!",
        coverImage: "/images/portfolio/family/Screenshot 2025-12-31 120803.png",
        galleryImages: [
            "/images/portfolio/family/Screenshot 2025-12-31 111323.png",
            "/images/portfolio/family/Screenshot 2025-12-31 120803.png",
            "/images/portfolio/family/Screenshot 2025-12-31 111323.png",
            "/images/portfolio/family/Screenshot 2025-12-31 120803.png",
            "/images/portfolio/family/Screenshot 2025-12-31 111323.png"
        ],
        price: 20000,
        isActive: true
    },
    {
        id: 'birthday',
        title: "Birthday",
        subtitle: "Celebration",
        description: "Documenting the joy, laughter, and celebration of your child's special milestones with family and friends.",
        details: "From the cake cutting to family portraits, we cover the highlights of your child's birthday.",
        coverImage: "/images/services/Screenshot 2026-01-05 114143.png",
        galleryImages: [
            "/images/services/Screenshot 2026-01-05 114143.png",
            "/images/services/Screenshot 2026-01-05 114155.png",
            "/images/services/Screenshot 2026-01-05 114207.png",
            "/images/services/Screenshot 2026-01-05 114223.png",
            "/images/services/Screenshot 2026-01-05 114238.png",
            "/images/services/Screenshot 2026-01-05 114251.png",
            "/images/services/Screenshot 2026-01-05 114307.png"
        ],
        price: 25000,
        isActive: true
    },
    {
        id: 'hospital',
        title: "Hospital",
        subtitle: "First Fresh Moments",
        description: "Capturing those first precious hours in the hospital. Sweet, organic, and purely natural moments of your newest family member.",
        details: "A documentary-style session within the first 48 hours of birth. No props, just your baby and the raw beauty of your new journey.",
        coverImage: "/images/hero/Screenshot 2025-12-30 141756.png",
        galleryImages: [],
        price: 15000,
        isActive: true
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding services...');

        // Clear existing services config
        await Services.deleteMany({});

        // Create new single entry
        await Services.create({
            hero: {
                title: "Our Photography Services",
                subtitle: "Timeless Memories"
            },
            serviceList: savedServices,
            meta: {
                title: "Our Services | Love & Nest",
                description: "Professional photography services including newborn, maternity, baby milestone, cake smash, and family portraits."
            }
        });

        console.log('Services seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
