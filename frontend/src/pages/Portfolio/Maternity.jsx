import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';

const Maternity = () => {
    return (
        <>
            <SEO
                title="Maternity Photography"
                description="Beautiful maternity photography celebrating the journey of motherhood with elegant and timeless portraits."
                keywords="maternity photography, pregnancy photos, maternity photoshoot"
            />
            <div className="portfolio-category-page">
                <SectionTitle title="Maternity Photography" subtitle="Celebrating motherhood" />
                <div className="gallery-grid">
                    <p className="gallery-placeholder">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Maternity;
