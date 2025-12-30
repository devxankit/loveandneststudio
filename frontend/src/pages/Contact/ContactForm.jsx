import React, { useState } from 'react';
import Button from '../../components/common/Button';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // TODO: Implement actual form submission
        setTimeout(() => {
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            });

            setTimeout(() => setStatus(''), 3000);
        }, 1000);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send Us a Message</h3>

            <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="service">Service Interested In *</label>
                <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a service</option>
                    <option value="newborn">Newborn Photography</option>
                    <option value="maternity">Maternity Photography</option>
                    <option value="baby">Baby Milestone</option>
                    <option value="family">Family Portrait</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                ></textarea>
            </div>

            {status === 'success' && (
                <div className="form-message success">
                    Thank you! We'll get back to you soon.
                </div>
            )}

            {status === 'error' && (
                <div className="form-message error">
                    Something went wrong. Please try again.
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    );
};

export default ContactForm;
