import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import ImageCard from '../../components/common/ImageCard';

const Portfolio = () => {
    const categories = [
        {
            id: 1,
            title: 'Newborn Photography',
            description: 'Precious first moments captured beautifully',
            image: '/placeholder-newborn.jpg', // Ensure these paths are correct or updated if needed
            link: '/portfolio/newborn'
        },
        {
            id: 2,
            title: 'Maternity Photography',
            description: 'Celebrating the beauty of expecting mothers',
            image: '/placeholder-maternity.jpg',
            link: '/portfolio/maternity'
        },
        {
            id: 3,
            title: 'Baby Photography',
            description: 'Growing milestones and adorable moments',
            image: '/placeholder-baby.jpg',
            link: '/portfolio/baby'
        },
        {
            id: 4,
            title: 'Family Photography',
            description: 'Cherished family bonds and connections',
            image: '/placeholder-family.jpg',
            link: '/portfolio/family'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <SEO
                title="Portfolio"
                description="Browse our portfolio of newborn, maternity, baby, and family photography. See our beautiful work capturing precious moments."
                keywords="photography portfolio, newborn photos, maternity photos, family photos"
            />
            <div className="w-full py-20 px-4 md:px-8 bg-gray-50 min-h-screen">
                <section className="text-center mb-16">
                    <SectionTitle
                        title="Our Portfolio"
                        subtitle="Browse our beautiful photography collections"
                    />
                </section>

                <section className="max-w-[1200px] mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.map(category => (
                            <motion.div key={category.id} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                                <Link to={category.link} className="no-underline block h-full">
                                    <ImageCard
                                        image={category.image}
                                        title={category.title}
                                        description={category.description}
                                    // Removing built-in hover classes from ImageCard via prop or CSS override could be cleaner, 
                                    // but wrapping in motion.div handles the movement nicely.
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </>
    );
};

export default Portfolio;
