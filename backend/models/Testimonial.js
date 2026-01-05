const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String }, // e.g., "September 2024"
    image: { type: String }, // Optional client photo
    rating: { type: Number, default: 5 },
    serviceType: { type: String }, // e.g., "Maternity", "Newborn"
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
