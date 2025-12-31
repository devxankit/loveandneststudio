import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import ImageCard from '../../components/common/ImageCard';
const Portfolio = () => {
    const categories = [
        {
            id: 1,
            title: 'Newborn Photography',
            description: 'Precious first moments captured beautifully',
            image: '/placeholder-newborn.jpg',
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

    return (
        <>
            <SEO
                title="Portfolio"
                description="Browse our portfolio of newborn, maternity, baby, and family photography. See our beautiful work capturing precious moments."
                keywords="photography portfolio, newborn photos, maternity photos, family photos"
            />
            <div className="w-full py-20 px-8 bg-gray-50">
                <section className="text-center mb-16">
                    <SectionTitle
                        title="Our Portfolio"
                        subtitle="Browse our beautiful photography collections"
                    />
                </section>

                <section className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {categories.map(category => (
                            <Link key={category.id} to={category.link} className="no-underline block h-full">
                                <ImageCard
                                    image={category.image}
                                    title={category.title}
                                    description={category.description}
                                />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Portfolio;
