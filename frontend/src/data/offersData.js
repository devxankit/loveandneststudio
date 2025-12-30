// Special offers data
export const offersData = [
    {
        id: 1,
        title: 'New Parent Package',
        description: 'Complete maternity and newborn photography bundle',
        originalPrice: 25000,
        offerPrice: 20000,
        discount: 20,
        features: [
            'Maternity photoshoot (1-2 hours)',
            'Newborn session within 2 weeks',
            '40+ professionally edited photos',
            'Online gallery for sharing',
            'Print-ready high-resolution files',
        ],
        validUntil: '2024-03-31',
        isActive: true,
        terms: 'Valid for bookings made before March 31, 2024. Sessions must be completed within 6 months of booking.',
    },
    {
        id: 2,
        title: 'Baby Milestone Bundle',
        description: 'Document your baby\'s entire first year with our comprehensive package',
        originalPrice: 30000,
        offerPrice: 24000,
        discount: 20,
        features: [
            '4 milestone sessions (3, 6, 9, 12 months)',
            '60+ professionally edited photos',
            'Themed setups and props included',
            'Digital photo album',
            'Complimentary cake smash at 12 months',
        ],
        validUntil: '2024-12-31',
        isActive: true,
        terms: 'Sessions must be booked and scheduled in advance. Valid for 1 year from booking date.',
    },
    {
        id: 3,
        title: 'Family Portrait Special',
        description: 'Professional family photography session at a special price',
        originalPrice: 12000,
        offerPrice: 9999,
        discount: 17,
        features: [
            '2 hour photography session',
            'Indoor or outdoor location',
            '25+ edited photos',
            'Print-ready files',
            'One 8x10 print included',
        ],
        validUntil: '2024-02-28',
        isActive: true,
        terms: 'Limited time offer. Book by February 28, 2024.',
    },
];

// Get active offers
export const getActiveOffers = () => {
    return offersData.filter((offer) => offer.isActive);
};

// Get offer by ID
export const getOfferById = (id) => {
    return offersData.find((offer) => offer.id === parseInt(id));
};

// Calculate savings
export const calculateSavings = (originalPrice, offerPrice) => {
    return originalPrice - offerPrice;
};

export default offersData;
