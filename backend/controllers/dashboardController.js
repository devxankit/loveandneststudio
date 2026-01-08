const BlogPost = require('../models/BlogPost');
const Testimonial = require('../models/Testimonial');
const Services = require('../models/Services');
const Contact = require('../models/Contact');
const Newborn = require('../models/Newborn');
const Maternity = require('../models/Maternity');
const Baby = require('../models/Baby');
const Family = require('../models/Family');
const GlobalSettings = require('../models/GlobalSettings');

// @desc    Get Dashboard Stats
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        // Run all count queries in parallel for performance
        const [
            blogCount,
            testimonialCount,
            serviceCount,
            inquiryCount,
            newbornCount,
            maternityCount,
            babyCount,
            familyCount,
            settings
        ] = await Promise.all([
            BlogPost.countDocuments(),
            Testimonial.countDocuments(),
            Services.countDocuments(),
            Contact.countDocuments(),
            Newborn.countDocuments(),
            Maternity.countDocuments(),
            Baby.countDocuments(),
            Family.countDocuments(),
            GlobalSettings.findOne()
        ]);

        const portfolioCount = newbornCount + maternityCount + babyCount + familyCount;

        // Get recent inquiries (last 5)
        const recentInquiries = await Contact.find().sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            stats: {
                portfolio: portfolioCount,
                blogs: blogCount,
                inquiries: inquiryCount,
                services: serviceCount,
                testimonials: testimonialCount
            },
            recentInquiries,
            ownerName: settings?.ownerName || 'Anamika'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching dashboard stats' });
    }
};

module.exports = {
    getDashboardStats
};
