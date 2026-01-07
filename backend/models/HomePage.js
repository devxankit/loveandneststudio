const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
    hero: {
        slides: { type: [String], default: [] },
        heading: { type: String, default: "Love &" },
        subheading: { type: String, default: "Nest" },
        overlay_text: { type: String, default: "Maternity • Newborn • Kids" }
    },
    expertise: {
        heading: { type: String, default: "Creating A Legacy." },
        subheading: { type: String, default: "Our Mission" },
        text: { type: String, default: "We specialize in elevating your most precious memories into a visual narrative that stands out. Our approach blends technical precision with raw emotional depth." },
        image1: { type: String, default: "" }, // Large image
        image2: { type: String, default: "" }  // Smaller accent image
    },
    checklist: {
        heading: { type: String, default: "Your Experience with us includes" },
        items: { type: [String], default: ["Personalized Moodboarding", "Professional Art Direction", "Bespoke Retouching", "Comfortable Environment", "Digital Archives Access"] },
        image: { type: String, default: "" }
    },
    gallery: {
        heading: { type: String, default: "Curated Gallery" },
        subheading: { type: String, default: "The Digital Lens" },
        images: { type: [String], default: [] }
    },
    splitScreen: {
        intro: {
            heading: { type: String, default: "Hello and <br /> Welcome" },
            text: { type: String, default: "Love you can feel forever." },
            image: { type: String, default: "" }
        },
        artist: {
            title: { type: String, default: "The Artist" },
            role: { type: String, default: "Lead Photographer" },
            name: { type: String, default: "Anamika" },
            bio: { type: String, default: "A photographer with a deep passion for capturing the authentic essence of life's journey." },
            portrait: { type: String, default: "" }
        },
        philosophy: {
            heading: { type: String, default: "Our Philosophy" },
            quote: { type: String, default: "We preserve feelings." },
            text: { type: String, default: "We believe that every photograph should evoke emotion. It’s not just about how it looks, but how it feels when you look back at it years from now." },
            points: { type: [String], default: ["Maternity", "Newborn", "Family"] }
        },
        contact: {
            heading: { type: String, default: "Let's <br /> Create" },
            subheading: { type: String, default: "Start Your Journey" }
        }
    },
    collage: {
        images: { type: [String], default: [] }
    }
}, { timestamps: true });

module.exports = mongoose.model('HomePage', homePageSchema);
