import React from 'react';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import ContactCTA from '../../components/common/ContactCTA';
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
            <div className="w-full py-20 px-8">
                <section className="text-center mb-16">
                    <SectionTitle
                        title="Our Services"
                        subtitle="Professional photography for every precious moment"
                    />
                </section>

                <section className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-20">
                    {services.map(service => (
                        <div key={service.id} className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] group">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed text-lg">{service.description}</p>
                            <ul className="space-y-4">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-4 text-gray-600">
                                        <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                                        {feature}
                                    </li>
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
