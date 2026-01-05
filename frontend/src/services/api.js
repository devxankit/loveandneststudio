import axios from 'axios';

// Create Axios Instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Hardcoded for now, or use import.meta.env.VITE_API_URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor (if we add Auth later)
api.interceptors.request.use(config => {
    // const token = localStorage.getItem('adminToken');
    // if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

// Pages API
export const getPages = () => api.get('/pages');
export const getPage = (slug) => api.get(`/pages/${slug}`);
export const createPage = (data) => api.post('/pages', data);
export const updatePageSection = (slug, sectionId, formData) => {
    return api.put(`/pages/${slug}/sections/${sectionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Needed for files
    });
};
export const updatePageSectionJSON = (slug, sectionId, content) => {
    return api.put(`/pages/${slug}/sections/${sectionId}`, { content }, {
        headers: { 'Content-Type': 'application/json' }
    });
};
export const uploadImage = (formData) => {
    return api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

// Blog API
export const getPosts = (params) => api.get('/posts', { params });
export const getPost = (slug) => api.get(`/posts/${slug}`);
export const createPost = (formData) => api.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updatePost = (id, formData) => api.put(`/posts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Testimonials API
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (formData) => api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateTestimonial = (id, formData) => api.put(`/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

export default api;
