const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    hero: {
        subheading: { type: String, default: "Inquire with Us" },
        heading: { type: String, default: "Let's<br /> Connect" },
        text: { type: String, default: "Because every breath, every giggle, and every tiny finger deserves to be remembered exactly as it felt." }
    },
    info: {
        email: { type: String, default: "loveandnest@gmail.com" },
        phone: { type: String, default: "+91 86790 76776" },
        whatsapp: { type: String, default: "+91 86790 76776" },
        location: { type: String, default: "Dehradun, Uttarakhand" }
    },
    visuals: {
        entranceImage: { type: String, default: "" },
        entranceLabel: { type: String, default: "Studio Entrance — Dehradun" },
        verticalImage: { type: String, default: "" }
    },
    socials: {
        instagram: { type: String, default: "https://instagram.com" },
        facebook: { type: String, default: "https://facebook.com" },
        threads: { type: String, default: "https://www.threads.net/@love.neststudio" },
        pinterest: { type: String, default: "https://in.pinterest.com/" },
        youtube: { type: String, default: "https://youtube.com/@loveandnest?si=O7DUvepeflrB2_p5" }
    },
    collage: {
        images: { type: [String], default: [] }
    },
    meta: {
        title: { type: String, default: "Connect | Love & Nest Studio" },
        description: { type: String, default: "Reach out to Love & Nest Studio for maternity, newborn, and family photography." },
        keywords: { type: String, default: "contact photographer, love and nest studio, maternity photography pune" }
    }
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
