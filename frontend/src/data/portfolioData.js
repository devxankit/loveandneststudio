// Portfolio data for different categories
export const portfolioData = {
    newborn: [
        {
            id: 1,
            title: 'Sweet Dreams',
            description: 'Peaceful newborn moments',
            image: '/placeholder-newborn-1.jpg',
            category: 'newborn',
        },
        // Add more newborn photos here
    ],
    maternity: [
        {
            id: 1,
            title: 'Glowing Beauty',
            description: 'Beautiful maternity portrait',
            image: '/placeholder-maternity-1.jpg',
            category: 'maternity',
        },
        // Add more maternity photos here
    ],
    baby: [
        {
            id: 1,
            title: 'First Steps',
            description: 'Baby milestone photography',
            image: '/placeholder-baby-1.jpg',
            category: 'baby',
        },
        // Add more baby photos here
    ],
    family: [
        {
            id: 1,
            title: 'Family Love',
            description: 'Cherished family moments',
            image: '/placeholder-family-1.jpg',
            category: 'family',
        },
        // Add more family photos here
    ],
};

// Get portfolio by category
export const getPortfolioByCategory = (category) => {
    return portfolioData[category] || [];
};

// Get all portfolio items
export const getAllPortfolio = () => {
    return Object.values(portfolioData).flat();
};

export default portfolioData;
