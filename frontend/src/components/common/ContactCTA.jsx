import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
const ContactCTA = ({ title = 'Ready to Capture Your Precious Moments?', subtitle = 'Book your session today!' }) => {
    return (
        <section className="bg-gradient-to-br from-primary to-secondary py-20 px-8 my-16">
            <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">{title}</h2>
                <p className="text-[clamp(1.1rem,2vw,1.3rem)] mb-8 opacity-95">{subtitle}</p>
                <Link to="/contact" className="inline-block">
                    <Button variant="secondary" size="large">Book Now</Button>
                </Link>
            </div>
        </section>
    );
};

export default ContactCTA;
