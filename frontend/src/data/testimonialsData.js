// Testimonials data
export const testimonialsData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        text: 'The photos are absolutely beautiful! They captured our newborn perfectly. The photographer was so patient and professional.',
        rating: 5,
        service: 'Newborn Photography',
        date: '2024-01-15',
    },
    {
        id: 2,
        name: 'Michael Smith',
        text: 'Professional, patient, and talented. Highly recommend! Our family portraits turned out amazing.',
        rating: 5,
        service: 'Family Photography',
        date: '2024-01-10',
    },
    {
        id: 3,
        name: 'Emily Davis',
        text: 'Amazing experience from start to finish. The photos exceeded our expectations! Beautiful maternity shots.',
        rating: 5,
        service: 'Maternity Photography',
        date: '2024-01-05',
    },
    {
        id: 4,
        name: 'Raj Patel',
        text: 'Wonderful experience capturing our baby\'s milestones. The quality of work is exceptional!',
        rating: 5,
        service: 'Baby Milestone',
        date: '2023-12-20',
    },
    {
        id: 5,
        name: 'Priya Sharma',
        text: 'Simply the best! Our newborn session was magical. The photographer made us feel so comfortable.',
        rating: 5,
        service: 'Newborn Photography',
        date: '2023-12-15',
    },
];

// Get testimonials by service
export const getTestimonialsByService = (service) => {
    return testimonialsData.filter((testimonial) => testimonial.service === service);
};

// Get recent testimonials
export const getRecentTestimonials = (limit = 3) => {
    return testimonialsData.slice(0, limit);
};

export default testimonialsData;
