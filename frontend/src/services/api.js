import axios from 'axios';

// Create Axios Instance
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    console.error('⚠️ VITE_API_URL is not defined! API calls may fail. Please check your .env or deployment configuration.');
} else {
    console.log('API Base URL:', baseURL);
}

const api = axios.create({
    baseURL: baseURL,
});

// Request Interceptor (if we add Auth later)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // changed 'adminToken' to 'token' to be safe, standard practice usually uses 'token'
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

// --- NEWBORN API ---
export const getNewbornPage = () => api.get('/newborn');
export const updateNewbornPage = (data) => api.put('/newborn', data);

// --- MATERNITY API ---
export const getMaternityPage = () => api.get('/maternity');
export const updateMaternityPage = (data) => api.put('/maternity', data);

export const getBabyPage = () => api.get('/baby');
export const updateBabyPage = (data) => api.put('/baby', data);

// --- FAMILY API ---
export const getFamilyPage = () => api.get('/family');
export const updateFamilyPage = (data) => api.put('/family', data);

// --- CAKE SMASH API ---
export const getCakeSmashPage = () => api.get('/cakesmash');
export const updateCakeSmashPage = (data) => api.put('/cakesmash', data);

// --- TODDLER API ---
export const getToddlerPage = () => api.get('/toddler');
export const updateToddlerPage = (data) => api.put('/toddler', data);

// --- PRE BIRTHDAY API ---
export const getPreBirthdayPage = () => api.get('/pre-birthday');
export const updatePreBirthdayPage = (data) => api.put('/pre-birthday', data);

export const getBirthdayPage = () => api.get('/birthday');
export const updateBirthdayPage = (data) => api.put('/birthday', data);

// --- HOSPITAL API ---
export const getHospitalPage = () => api.get('/hospital/page');
export const updateHospitalPage = (data) => api.put('/hospital/page', data);
export const getHospitalSession = (type) => api.get(`/hospital/session/${type}`);
export const updateHospitalSession = (type, data) => api.put(`/hospital/session/${type}`, data);

// --- PORTFOLIO LANDING PAGE API ---
export const getPortfolioPage = () => api.get('/portfolio-page');
export const updatePortfolioPage = (data) => api.put('/portfolio-page', data);

// --- HOME PAGE API ---
export const getHomePage = () => api.get('/home-page');
export const updateHomePage = (data) => api.put('/home-page', data);

// --- ABOUT PAGE API ---
export const getAboutPage = () => api.get('/about-page');
export const updateAboutPage = (data) => api.put('/about-page', data);

// --- CONTACT PAGE API ---
export const getContactPage = () => api.get('/contact-page');
export const updateContactPage = (data) => api.put('/contact-page', data);

// Pages API
export const getPages = () => api.get('/pages');
export const getPage = (slug) => api.get(`/pages/${slug}`);
export const createPage = (data) => api.post('/pages', data);
export const updatePageSection = (slug, sectionId, formData) => {
    return api.put(`/pages/${slug}/sections/${sectionId}`, formData);
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
export const createPost = (formData) => api.post('/posts', formData);
export const updatePost = (id, formData) => api.put(`/posts/${id}`, formData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Testimonials API
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (formData) => api.post('/testimonials', formData);
export const updateTestimonial = (id, formData) => api.put(`/testimonials/${id}`, formData);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

export default api;
