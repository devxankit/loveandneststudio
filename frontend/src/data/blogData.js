// Blog posts data
export const blogData = [
    {
        id: 1,
        title: '10 Tips for Preparing for Your Newborn Photoshoot',
        slug: 'newborn-photoshoot-tips',
        excerpt: 'Make the most of your newborn session with these helpful preparation tips that ensure beautiful, stress-free photos.',
        content: `
      Preparing for your newborn photoshoot doesn't have to be stressful. Here are our top 10 tips...
      
      1. Schedule within the first two weeks
      2. Keep baby awake before the session
      3. Bring extra outfits and diapers
      4. Feed baby right before arrival
      5. Relax and trust the process
      
      [Full content would go here...]
    `,
        author: 'Love & Nest Studio',
        date: '2024-01-15',
        image: '/placeholder-blog-1.jpg',
        category: 'Newborn',
        tags: ['newborn', 'tips', 'preparation'],
    },
    {
        id: 2,
        title: 'What to Wear for Maternity Photos',
        slug: 'maternity-photo-outfit-guide',
        excerpt: 'Choose the perfect outfit to showcase your beautiful baby bump with our complete style guide.',
        content: `
      Choosing what to wear for your maternity photos can make all the difference...
      
      [Full content would go here...]
    `,
        author: 'Love & Nest Studio',
        date: '2024-01-10',
        image: '/placeholder-blog-2.jpg',
        category: 'Maternity',
        tags: ['maternity', 'fashion', 'styling'],
    },
    {
        id: 3,
        title: 'Capturing Baby Milestones: A Complete Guide',
        slug: 'baby-milestone-photography-guide',
        excerpt: 'Learn when and how to document your baby\'s important milestones with professional photography.',
        content: `
      Baby's first year is filled with incredible milestones worth capturing...
      
      [Full content would go here...]
    `,
        author: 'Love & Nest Studio',
        date: '2024-01-05',
        image: '/placeholder-blog-3.jpg',
        category: 'Baby',
        tags: ['baby', 'milestones', 'guide'],
    },
];

// Get blog post by ID
export const getBlogById = (id) => {
    return blogData.find((post) => post.id === parseInt(id));
};

// Get blog post by slug
export const getBlogBySlug = (slug) => {
    return blogData.find((post) => post.slug === slug);
};

// Get recent blog posts
export const getRecentBlogs = (limit = 3) => {
    return blogData.slice(0, limit);
};

// Get blogs by category
export const getBlogsByCategory = (category) => {
    return blogData.filter((post) => post.category === category);
};

export default blogData;
