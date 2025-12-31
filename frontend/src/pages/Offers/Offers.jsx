import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
const Offers = () => {
    const offers = [
        {
            id: 1,
            title: 'New Parent Package',
            description: 'Complete maternity and newborn photography bundle',
            originalPrice: '₹25,000',
            offerPrice: '₹20,000',
            features: [
                'Maternity photoshoot',
                'Newborn session',
                '40+ edited photos',
                'Online gallery'
            ],
            validity: 'Valid until March 31, 2024'
        },
        {
            id: 2,
            title: 'Baby Milestone Bundle',
            description: 'Document your baby\'s first year',
            originalPrice: '₹30,000',
            offerPrice: '₹24,000',
            features: [
                '4 sessions (3, 6, 9, 12 months)',
                '60+ edited photos',
                'Themed setups',
                'Digital album'
            ],
            validity: 'Valid for 1 year from booking'
        },
        {
            id: 3,
            title: 'Family Portrait Special',
            description: 'Professional family photography session',
            originalPrice: '₹12,000',
            offerPrice: '₹9,999',
            features: [
                '2 hour session',
                'Indoor or outdoor',
                '25+ edited photos',
                'Print-ready files'
            ],
            validity: 'Valid until February 28, 2024'
        }
    ];

    return (
        <>
            <SEO
                title="Special Offers"
                description="Check out our special photography packages and limited-time offers for newborn, maternity, and family photography."
                keywords="photography offers, photo packages, special deals, discount photography"
            />
            <div className="w-full py-20 px-8">
                <section className="text-center mb-16">
                    <SectionTitle
                        title="Special Offers"
                        subtitle="Limited time photography packages"
                    />
                </section>

                <section className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-4 right-[-35px] bg-primary text-white py-1.5 px-10 text-xs font-bold uppercase tracking-widest rotate-45 shadow-md">Special Offer</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{offer.title}</h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">{offer.description}</p>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-lg text-gray-400 line-through font-medium">{offer.originalPrice}</span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{offer.offerPrice}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {offer.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600">
                                        <span className="text-primary text-xl">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-8">{offer.validity}</p>

                            <div className="mt-auto">
                                <Button variant="primary" size="medium" className="w-full">Book Now</Button>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default Offers;
