import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './ContactCTA.css';

const ContactCTA = ({ title = 'Ready to Capture Your Precious Moments?', subtitle = 'Book your session today!' }) => {
    return (
        <section className="contact-cta">
            <div className="contact-cta-content">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <Link to="/contact">
                    <Button variant="primary" size="large">Book Now</Button>
                </Link>
            </div>
        </section>
    );
};

export default ContactCTA;
