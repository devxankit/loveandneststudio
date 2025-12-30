import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';

const Family = () => {
    return (
        <>
            <SEO
                title="Family Photography"
                description="Professional family photography capturing cherished bonds and creating beautiful family portraits."
                keywords="family photography, family portraits, family photoshoot"
            />
            <div className="portfolio-category-page">
                <SectionTitle title="Family Photography" subtitle="Cherished family bonds" />
                <div className="gallery-grid">
                    <p className="gallery-placeholder">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Family;
