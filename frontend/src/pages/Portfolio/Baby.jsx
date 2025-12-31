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
            <div className="py-20 px-8 max-w-[1200px] mx-auto text-center">
                <SectionTitle title="Baby Photography" subtitle="Growing milestones" />
                <div className="mt-20">
                    <p className="text-xl text-gray-400 italic">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Baby;
