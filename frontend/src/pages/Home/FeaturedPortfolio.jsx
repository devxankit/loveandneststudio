import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import ImageCard from '../../components/common/ImageCard';
import LazyImage from '../../components/common/LazyImage';
import decorativeImg from '../../assets/images/hero/Screenshot 2025-12-30 141711.png'; // Using a baby image

const FeaturedPortfolio = () => {
    const portfolioCategories = [
        {
            id: 1,
            title: 'Newborn',
            description: 'Precious first moments',
            image: '/placeholder-newborn.jpg',
            link: '/portfolio/newborn'
        },
        {
            id: 2,
            title: 'Maternity',
            description: 'Beautiful expecting mothers',
            image: '/placeholder-maternity.jpg',
            link: '/portfolio/maternity'
        },
        {
            id: 3,
            title: 'Baby',
            description: 'Growing milestones',
            image: '/placeholder-baby.jpg',
            link: '/portfolio/baby'
        },
        {
            id: 4,
            title: 'Family',
            description: 'Cherished family bonds',
            image: '/placeholder-family.jpg',
            link: '/portfolio/family'
        }
    ];

    return (
        <section className="featured-portfolio">
            <div className="portfolio-content-wrapper">
                {/* Left Side Decorative Image */}
                <div className="portfolio-left-decor">
                    <div className="decor-image-container">
                        <LazyImage src={decorativeImg} alt="Baby" className="decor-img" />
                        <div className="decor-overlay"></div>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="portfolio-right-content">
                    <SectionTitle
                        title="Our Portfolio"
                        subtitle="Browse our work"
                        align="left"
                    />
                    <div className="portfolio-grid-list">
                        {portfolioCategories.map((category, index) => (
                            <Link key={category.id} to={category.link} className="portfolio-list-item">
                                <div className="portfolio-card-horizontal">
                                    <div className="card-img-wrapper">
                                        <ImageCard
                                            image={category.image}
                                            title={category.title}
                                            description={category.description}
                                        />
                                    </div>
                                    <div className="card-details-side">
                                        <h3 className="card-side-title">{category.title}</h3>
                                        <p className="card-side-desc">{category.description}</p>
                                        <span className="card-side-arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPortfolio;

