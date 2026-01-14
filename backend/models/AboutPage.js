const mongoose = require('mongoose');

const aboutPageSchema = new mongoose.Schema({
    hero: {
        images: {
            type: [String],
            default: []
        }
    },
    bio: {
        intro: {
            type: String,
            default: "Welcome to Love & Nest Studio, a photography studio dedicated to capturing life's most precious beginnings with grace and refinement."
        },
        photographer: {
            heading: { type: String, default: "The Photographer" },
            text: { type: String, default: "I'm Anamika, the founder and photographer behind Love & Nest, with over 13 years of professional experience and 8 years of specialized expertise in newborn and baby photography." }
        },
        philosophy: {
            heading: { type: String, default: "Philosophy" },
            text: { type: String, default: "My work is inspired by the belief that true luxury lies in moments that are quiet, meaningful, and deeply personal—the gentle glow of motherhood, the first days of a newborn's life, and the intimate bonds shared within a family." }
        },
        approach: {
            heading: { type: String, default: "Our Approach" },
            text: { type: String, default: "At Love & Nest, I offer maternity, newborn, baby, and family portraiture, thoughtfully crafted in a calm, refined environment. Newborn sessions are always baby-led and safety-focused, guided by years of experience, patience, and a deep understanding of infant comfort." }
        },
        style: {
            heading: { type: String, default: "Style & Experience" },
            text: { type: String, default: "My photographic style is soft, refined, and enduring—designed to transcend trends and remain relevant across generations. Every detail of the experience, from lighting and styling to the overall flow of the session, is carefully curated to ensure families feel relaxed, valued, and impeccably cared for." },
            quote: { type: String, default: "Love & Nest Studio is more than a photography studio—it is a space where trust is honored, stories are preserved, and memories are transformed into heirlooms." }
        },
        footerQuote: {
            type: String,
            default: "Timeless portraits of love, crafted with care, meant to be cherished for generations."
        },
        thankYouText: {
            type: String,
            default: "Thank You"
        }
    },
    portfolioCategories: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('AboutPage', aboutPageSchema);
