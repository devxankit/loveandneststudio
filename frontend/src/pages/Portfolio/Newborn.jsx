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
            <div className="py-20 px-8 max-w-[1200px] mx-auto text-center">
                <SectionTitle title="Newborn Photography" subtitle="Precious first moments" />
                <div className="mt-20">
                    <p className="text-xl text-gray-400 italic">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Newborn;
