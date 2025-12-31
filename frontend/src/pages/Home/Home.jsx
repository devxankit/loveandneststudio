import React from 'react';
import SEO from '../../components/seo/SEO';
import Hero from './Hero';
import IconMenu from '../../components/layout/IconMenu';
import FeaturedPortfolio from './FeaturedPortfolio';
import Testimonials from './Testimonials';
import ContactCTA from '../../components/common/ContactCTA';
const Home = () => {
    return (
        <>
            <SEO
                title="Home"
                description="Professional newborn, maternity, baby, and family photography services. Capturing your precious moments beautifully."
                keywords="photography studio, newborn photography, maternity photography, family photographer"
            />
            <div className="w-full">
                <Hero />
                <IconMenu />
                <FeaturedPortfolio />
                <Testimonials />
                <ContactCTA />
            </div>
        </>
    );
};

export default Home;
