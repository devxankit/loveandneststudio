const mongoose = require('mongoose');

const maternitySchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Motherhood' },
        subtitle: { type: String, default: 'The beauty of' },
        image: { type: String, default: '' }
    },
    editorial: {
        title: { type: String, default: 'A Moment Suspended in Time' },
        text: { type: String, default: 'Pregnancy is a powerful, fleeting journey...' },
        image1: { type: String, default: '' },
        image2: { type: String, default: '' }
    },
    silhouette: {
        title: { type: String, default: 'The Art of Silhouette' },
        text: { type: String, default: 'We specialize in creating dramatic, timeless black and white portraits...' },
        image: { type: String, default: '' }
    },
    journey: {
        title: { type: String, default: 'The Journey' },
        subtitle: { type: String, default: 'Growing with love' },
        topText: { type: String, default: 'Every Kick, Every Flutter' },
        images: [{ type: String }],
        midGalleryText: { type: String, default: 'Visual Poetry' }
    },
    poses: {
        title: { type: String, default: 'Studio Maternity Poses' },
        subtitle: { type: String, default: "You'll Love" },
        images: [{ type: String }]
    },
    gallery: [{ type: String }],
    cta: {
        title: { type: String, default: 'Ready to capture your glow?' },
        text: { type: String, default: "Let's create timeless art that celebrates this beautiful chapter of your life." }
    }
}, { timestamps: true });

module.exports = mongoose.model('Maternity', maternitySchema);
