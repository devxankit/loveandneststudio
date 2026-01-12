import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Portfolio = lazy(() => import('../pages/Portfolio/Portfolio'));
const Newborn = lazy(() => import('../pages/Portfolio/Newborn'));
const Maternity = lazy(() => import('../pages/Portfolio/Maternity'));
const Baby = lazy(() => import('../pages/Portfolio/Baby'));
const Family = lazy(() => import('../pages/Portfolio/Family'));
const Hospital = lazy(() => import('../pages/Portfolio/Hospital/Hospital'));
const HospitalSession = lazy(() => import('../pages/Portfolio/Hospital/HospitalSession'));
const CakeSmash = lazy(() => import('../pages/Portfolio/CakeSmash'));
const Birthday = lazy(() => import('../pages/Portfolio/Birthday'));
const Toddler = lazy(() => import('../pages/Portfolio/Toddler'));
const PreBirthday = lazy(() => import('../pages/Portfolio/PreBirthday'));
const Services = lazy(() => import('../pages/Services/Services'));
const ServiceGallery = lazy(() => import('../pages/Services/ServiceGallery'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'));
const BestTimeMaternityPost = lazy(() => import('../pages/Blog/BestTimeMaternityPost'));
// Admin Pages
const AdminLogin = lazy(() => import('../pages/Admin/Login'));
const AdminLayout = lazy(() => import('../pages/Admin/Layout/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard/AdminDashboard'));
const ManagePortfolio = lazy(() => import('../pages/Admin/Portfolio/ManagePortfolio'));
const ManageCategory = lazy(() => import('../pages/Admin/Portfolio/ManageCategory'));
const ManageHome = lazy(() => import('../pages/Admin/Home/ManageHome'));
const ManageAbout = lazy(() => import('../pages/Admin/About/ManageAbout'));
const ManageContact = lazy(() => import('../pages/Admin/Contact/ManageContact'));
const ManagePages = lazy(() => import('../pages/Admin/Pages/ManagePages'));
const PageEditor = lazy(() => import('../pages/Admin/Pages/PageEditor'));
const ManageBlog = lazy(() => import('../pages/Admin/Blog/ManageBlog'));
const ManageTestimonials = lazy(() => import('../pages/Admin/Testimonials/ManageTestimonials'));
const ManageServices = lazy(() => import('../pages/Admin/Services/ManageServices'));
const ManageInquiries = lazy(() => import('../pages/Admin/Inquiries/ManageInquiries'));
const AdminSettings = lazy(() => import('../pages/Admin/Settings/AdminSettings'));
const GlobalBrandingPage = lazy(() => import('../pages/Admin/Settings/GlobalBrandingPage'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading Component
import PageLoader from '../components/common/PageLoader';

const AppRoutes = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isAdmin ? "admin-portal" : location.pathname}
                    initial={isAdmin ? { opacity: 1 } : { opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={isAdmin ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
                    transition={{
                        duration: isAdmin ? 0 : 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/newborn" element={<Newborn />} />
                        <Route path="/portfolio/maternity" element={<Maternity />} />
                        <Route path="/portfolio/baby" element={<Baby />} />
                        <Route path="/portfolio/family" element={<Family />} />
                        <Route path="/portfolio/hospital" element={<Hospital />} />
                        <Route path="/portfolio/hospital/:type" element={<HospitalSession />} />
                        <Route path="/portfolio/cakesmash" element={<CakeSmash />} />
                        <Route path="/portfolio/birthday" element={<Birthday />} />
                        <Route path="/portfolio/toddler" element={<Toddler />} />
                        <Route path="/portfolio/pre-birthday" element={<PreBirthday />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:id" element={<ServiceGallery />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetails />} />
                        <Route path="/best-time-for-maternity-shoot" element={<BestTimeMaternityPost />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="pages" element={<ManagePages />} />
                            <Route path="pages/home" element={<ManageHome />} />
                            <Route path="pages/about" element={<ManageAbout />} />
                            <Route path="pages/contact" element={<ManageContact />} />
                            <Route path="pages/:pageId" element={<PageEditor />} />
                            <Route path="portfolio" element={<ManagePortfolio />} />
                            <Route path="portfolio/:category" element={<ManageCategory />} />
                            <Route path="blog" element={<ManageBlog />} />
                            <Route path="testimonials" element={<ManageTestimonials />} />
                            <Route path="services" element={<ManageServices />} />
                            <Route path="inquiries" element={<ManageInquiries />} />
                            <Route path="settings" element={<AdminSettings />} />
                            <Route path="branding" element={<GlobalBrandingPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </Suspense>
    );
};

export default AppRoutes;
