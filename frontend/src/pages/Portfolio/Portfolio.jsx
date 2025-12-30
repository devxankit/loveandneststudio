import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import ImageCard from '../../components/common/ImageCard';
import './Portfolio.css';

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
            <div className="portfolio-page">
                <section className="portfolio-header">
                    <SectionTitle
                        title="Our Portfolio"
                        subtitle="Browse our beautiful photography collections"
                    />
                </section>

                <section className="portfolio-categories">
                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link key={category.id} to={category.link}>
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
