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

// Auto-generate slug from title before saving
blogPostSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
