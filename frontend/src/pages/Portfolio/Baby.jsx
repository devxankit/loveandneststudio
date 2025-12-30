import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';

const Baby = () => {
    return (
        <>
            <SEO
                title="Baby Photography"
                description="Adorable baby photography capturing growing milestones and precious moments of your little one."
                keywords="baby photography, infant photos, baby photoshoot, milestone photos"
            />
            <div className="portfolio-category-page">
                <SectionTitle title="Baby Photography" subtitle="Growing milestones" />
                <div className="gallery-grid">
                    <p className="gallery-placeholder">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Baby;
