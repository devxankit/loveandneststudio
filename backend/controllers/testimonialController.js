const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
const createTestimonial = async (req, res) => {
    try {
        const { clientName, content, rating, serviceType, date } = req.body;
        let image = '';
        if (req.file) {
            image = req.file.path;
        }

        const testimonial = await Testimonial.create({
            clientName,
            content,
            rating,
            serviceType,
            date,
            image
        });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update testimonial
const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        const { clientName, content, rating, serviceType, date } = req.body;

        testimonial.clientName = clientName || testimonial.clientName;
        testimonial.content = content || testimonial.content;
        testimonial.rating = rating || testimonial.rating;
        testimonial.serviceType = serviceType || testimonial.serviceType;
        testimonial.date = date || testimonial.date;

        if (req.file) {
            testimonial.image = req.file.path;
        }

        const updatedTestimonial = await testimonial.save();
        res.json(updatedTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTestimonials, createTestimonial, deleteTestimonial, updateTestimonial };
