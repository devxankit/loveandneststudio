import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import './Offers.css';

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
            <div className="offers-page">
                <section className="offers-header">
                    <SectionTitle
                        title="Special Offers"
                        subtitle="Limited time photography packages"
                    />
                </section>

                <section className="offers-grid">
                    {offers.map(offer => (
                        <div key={offer.id} className="offer-card">
                            <div className="offer-badge">Special Offer</div>
                            <h3>{offer.title}</h3>
                            <p className="offer-description">{offer.description}</p>

                            <div className="offer-pricing">
                                <span className="original-price">{offer.originalPrice}</span>
                                <span className="offer-price">{offer.offerPrice}</span>
                            </div>

                            <ul className="offer-features">
                                {offer.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>

                            <p className="offer-validity">{offer.validity}</p>

                            <Button variant="primary" size="medium">Book Now</Button>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default Offers;
