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
            <div className="py-20 px-8 max-w-[1200px] mx-auto text-center">
                <SectionTitle title="Maternity Photography" subtitle="Celebrating motherhood" />
                <div className="mt-20">
                    <p className="text-xl text-gray-400 italic">Gallery coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default Maternity;
