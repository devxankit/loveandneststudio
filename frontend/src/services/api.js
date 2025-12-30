// API Base URL Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// GET request
export const get = (endpoint) => apiCall(endpoint, { method: 'GET' });

// POST request
export const post = (endpoint, body) =>
    apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });

// PUT request
export const put = (endpoint, body) =>
    apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    });

// DELETE request
export const del = (endpoint) =>
    apiCall(endpoint, { method: 'DELETE' });

export default {
    get,
    post,
    put,
    del,
};
