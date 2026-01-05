const homePage = {
    pageSlug: 'home',
    title: 'Home Page',
    sections: [
        {
            id: 'hero',
            title: 'Hero Slider',
            type: 'slider',
            content: {
                heading: 'Love & Nest',
                subheading: 'Artistic Motherhood',
                slides: [], // Can be populated via Admin later
                overlay_text: 'Maternity • Newborn • Kids'
            }
        },
        {
            id: 'intro',
            title: 'Introduction',
            type: 'content',
            content: {
                heading: 'Hello and Welcome',
                text: 'We preserve the feeling of a moment, not just the look. Every session is designed to be a relaxing, memorable experience for your family.',
                image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            id: 'artist',
            title: 'The Artist',
            type: 'content',
            content: {
                name: 'Anamika',
                role: 'Lead Photographer',
                bio: 'A photographer with a deep passion for capturing the authentic essence of motherhood and family connections.',
                portrait: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000&auto=format&fit=crop'
            }
        }
    ]
};

const aboutPage = {
    pageSlug: 'about',
    title: 'About Page',
    sections: [
        {
            id: 'hero',
            title: 'Hero Section',
            type: 'content',
            content: {
                heading: 'Our Story',
                image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            id: 'bio',
            title: 'Biography',
            type: 'content',
            content: {
                heading: 'About Anamika',
                text: 'My journey began with a simple love for light and connection. Over the years, I have specialized in maternity and newborn photography, seeking to freeze those fleeting moments of early parenthood.'
            }
        }
    ]
};

const contactPage = {
    pageSlug: 'contact',
    title: 'Contact Page',
    sections: [
        {
            id: 'hero',
            title: 'Hero Heading',
            type: 'content',
            content: {
                text: 'Reach out to Love & Nest Studio for bookings and inquiries.'
            }
        }
    ]
};

const servicesPage = {
    pageSlug: 'services',
    title: 'Services Page',
    sections: []
};

const testimonialsPage = {
    pageSlug: 'testimonials',
    title: 'Testimonials Page',
    sections: [
        {
            id: 'hero',
            title: 'Hero Section',
            type: 'content',
            content: {
                badge: 'Testimonials',
                heading: 'Trusted by families\nfrom various cities',
                subheading: 'Learn why professionals trust our lens.'
            }
        },
        {
            id: 'cta',
            title: 'Bottom CTA',
            type: 'content',
            content: {
                text: 'Ready to create your own memories?'
            }
        }
    ]
};

const blogPosts = [
    {
        title: 'Why Maternity Photography Matters',
        slug: 'why-maternity-photography-matters',
        excerpt: 'Capture the glow before the baby arrives. A guide to why documenting this journey is so special.',
        content: '<p>Pregnancy is a fleeting time in your life. While it may feel long when you are in it, you will look back and miss the bump! Documenting this time allows you to relive the anticipation and joy.</p>',
        tags: ['maternity', 'tips'],
        coverImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop',
        isPublished: true,
        createdAt: new Date('2025-12-15')
    },
    {
        title: 'Newborn Session Prep Guide',
        slug: 'newborn-session-prep-guide',
        excerpt: 'How to prepare your baby and yourself for the smoothest newborn photoshoot experience.',
        content: '<p>A happy baby makes for happy photos. Feed your baby right before the session, keep the room warm, and relax!</p>',
        tags: ['newborn', 'guide'],
        coverImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop',
        isPublished: true,
        createdAt: new Date('2026-01-02')
    }
];

const testimonials = [
    {
        clientName: 'Sarah J.',
        content: 'Anamika was amazing with our newborn! She was so patient and gentle. The photos are absolutely breathtaking.',
        rating: 5,
        serviceType: 'Newborn',
        date: 'Dec 2025',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
    },
    {
        clientName: 'Emily R.',
        content: 'The best investment we made for our family memories. Highly recommended!',
        rating: 5,
        serviceType: 'Family',
        date: 'Nov 2025',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    }
];

module.exports = { pages: [homePage, aboutPage, contactPage, servicesPage, testimonialsPage], blogPosts, testimonials };
