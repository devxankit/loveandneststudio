import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import ContactCTA from '../../components/common/ContactCTA';
import './Services.css';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Newborn Photography',
            description: 'Capture your newborn\'s first precious moments in a safe, comfortable environment.',
            features: ['Props and accessories included', 'Up to 2 hours session', 'Professional editing']
        },
        {
            id: 2,
            title: 'Maternity Photography',
            description: 'Celebrate your pregnancy journey with beautiful maternity portraits.',
            features: ['Indoor and outdoor options', 'Maternity gowns available', 'Partner and family shots included']
        },
        {
            id: 3,
            title: 'Baby Milestones',
            description: 'Document your baby\'s growth with milestone photography sessions.',
            features: ['3, 6, 9, 12 month sessions', 'Themed setups', 'Growth tracking photos']
        },
        {
            id: 4,
            title: 'Family Portraits',
            description: 'Create lasting memories with professional family photography.',
            features: ['All family members welcome', 'Multiple location options', 'Various poses and setups']
        }
    ];

    return (
        <>
            <SEO
                title="Services"
                description="Professional photography services including newborn, maternity, baby milestone, and family photography. Book your session today."
                keywords="photography services, photo packages, newborn session, maternity session"
            />
            <div className="services-page">
                <section className="services-header">
                    <SectionTitle
                        title="Our Services"
                        subtitle="Professional photography for every precious moment"
                    />
                </section>

                <section className="services-grid">
                    {services.map(service => (
                        <div key={service.id} className="service-card">
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <ContactCTA
                    title="Ready to Book Your Session?"
                    subtitle="Contact us today to discuss your photography needs"
                />
            </div>
        </>
    );
};

export default Services;
