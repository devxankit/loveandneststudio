const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // Rich text / HTML
    coverImage: { type: String }, // Cloudinary URL
    author: { type: String, default: 'Anamika' },
    tags: [String],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date }
}, { timestamps: true });



module.exports = mongoose.model('BlogPost', blogPostSchema);

