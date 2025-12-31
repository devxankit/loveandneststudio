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
        <form className="max-w-[600px] mx-auto bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100" onSubmit={handleSubmit}>
            <h3 className="font-display text-3xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wider">Send Us a Message</h3>

            <div className="space-y-6">
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="name" className="font-outfit text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none py-4 px-6 rounded-2xl transition-all duration-300 font-outfit text-gray-700"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="email" className="font-outfit text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none py-4 px-6 rounded-2xl transition-all duration-300 font-outfit text-gray-700"
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="phone" className="font-outfit text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">Phone *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none py-4 px-6 rounded-2xl transition-all duration-300 font-outfit text-gray-700"
                        placeholder="+91 00000 00000"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="service" className="font-outfit text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">Service Interested In *</label>
                    <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none py-4 px-6 rounded-2xl transition-all duration-300 font-outfit text-gray-700 appearance-none cursor-pointer"
                        required
                    >
                        <option value="">Select a service</option>
                        <option value="newborn">Newborn Photography</option>
                        <option value="maternity">Maternity Photography</option>
                        <option value="baby">Baby Milestone</option>
                        <option value="family">Family Portrait</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="message" className="font-outfit text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none py-4 px-6 rounded-2xl transition-all duration-300 font-outfit text-gray-700 resize-none"
                        placeholder="Tell us about your requirements..."
                    ></textarea>
                </div>
            </div>

            {status === 'success' && (
                <div className="mt-8 p-4 bg-green-50 text-green-600 rounded-xl text-center font-outfit font-medium border border-green-100 animate-fadeInUp">
                    Thank you! We'll get back to you soon.
                </div>
            )}

            {status === 'error' && (
                <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl text-center font-outfit font-medium border border-red-100 animate-fadeInUp">
                    Something went wrong. Please try again.
                </div>
            )}

            <div className="mt-10">
                <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={status === 'sending'}
                    className="w-full py-5 rounded-2xl text-lg tracking-[2px]"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
