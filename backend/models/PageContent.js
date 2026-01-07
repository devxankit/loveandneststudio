const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    id: { type: String, required: true }, // e.g., 'hero', 'intro'
    title: { type: String }, // Friendly name for Admin UI
    type: { type: String, default: 'content' }, // 'content', 'gallery', 'slider'
    content: { type: mongoose.Schema.Types.Mixed }, // Flexible content object
    isVisible: { type: Boolean, default: true }
}, { _id: false });

const pageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: true,
        unique: true,
        unique: true
    },
    title: { type: String, required: true },
    sections: [sectionSchema],
    meta: {
        title: String,
        description: String,
        keywords: String
    }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
