const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    serviceType: { type: String, default: 'General' }, // e.g., Maternity, Newborn
    date: { type: Date }, // Requested date
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Booked', 'Archived'],
        default: 'New'
    }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
