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
        <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">- {testimonial.name}</p>
        </div>
    ));

    return (
        <section className="testimonials">
            <SectionTitle
                title="What Our Clients Say"
                subtitle="Testimonials"
            />
            <div className="testimonials-carousel">
                <Carousel items={testimonialCards} autoPlay={true} interval={5000} />
            </div>
        </section>
    );
};

export default Testimonials;
