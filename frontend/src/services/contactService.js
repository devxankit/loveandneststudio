import { post } from './api';

// Send contact form submission
export const sendContactForm = async (formData) => {
    try {
        const response = await post('/contact', formData);
        return response;
    } catch (error) {
        console.error('Contact form error:', error);
        throw error;
    }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (email) => {
    try {
        const response = await post('/newsletter/subscribe', { email });
        return response;
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
    }
};

export default {
    sendContactForm,
    subscribeNewsletter,
};
