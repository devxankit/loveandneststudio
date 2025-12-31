import React from 'react';
import SectionTitle from '../../components/common/SectionTitle';
import Carousel from '../../components/common/Carousel';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            text: 'The photos are absolutely beautiful! They captured our newborn perfectly.',
            rating: 5
        },
        {
            id: 2,
            name: 'Michael Smith',
            text: 'Professional, patient, and talented. Highly recommend!',
            rating: 5
        },
        {
            id: 3,
            name: 'Emily Davis',
            text: 'Amazing experience from start to finish. The photos exceeded our expectations!',
            rating: 5
        }
    ];

    const testimonialCards = testimonials.map(testimonial => (
        <div key={testimonial.id} className="bg-gray-50 p-8 md:p-12 rounded-2xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] mx-4">
            <div className="text-accent text-2xl mb-6">
                {'★'.repeat(testimonial.rating)}
            </div>
            <p className="text-xl italic leading-relaxed mb-6 text-gray-700">"{testimonial.text}"</p>
            <p className="font-semibold text-primary">- {testimonial.name}</p>
        </div>
    ));

    return (
        <section className="py-20 px-8 bg-white overflow-hidden">
            <SectionTitle
                title="What Our Clients Say"
                subtitle="Testimonials"
            />
            <div className="max-w-[800px] mx-auto mt-12">
                <Carousel items={testimonialCards} autoPlay={true} interval={5000} />
            </div>
        </section>
    );
};

export default Testimonials;
