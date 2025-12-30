import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';

const Newborn = () => {
    return (
        <>
            <SEO
                title="Newborn Photography"
                description="Professional newborn photography capturing your baby's first precious moments with care and expertise."
                keywords="newborn photography, baby photos, newborn photoshoot"
            />
            <div className="portfolio-category-page">
                <SectionTitle title="Newborn Photography" subtitle="Precious first moments" />
                <div className="gallery-grid">
                    <p className="gallery-placeholder">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Newborn;
