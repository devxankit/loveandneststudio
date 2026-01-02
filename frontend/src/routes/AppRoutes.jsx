import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Portfolio = lazy(() => import('../pages/Portfolio/Portfolio'));
const Newborn = lazy(() => import('../pages/Portfolio/Newborn'));
const Maternity = lazy(() => import('../pages/Portfolio/Maternity'));
const Baby = lazy(() => import('../pages/Portfolio/Baby'));
const Family = lazy(() => import('../pages/Portfolio/Family'));
const Services = lazy(() => import('../pages/Services/Services'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'));
const BestTimeMaternityPost = lazy(() => import('../pages/Blog/BestTimeMaternityPost'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading Component
import PageLoader from '../components/common/PageLoader';

const AppRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // High-end Expo Ease Out
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
                        <Route path="/services" element={<Services />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetails />} />
                        <Route path="/best-time-for-maternity-shoot" element={<BestTimeMaternityPost />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </Suspense>
    );
};

export default AppRoutes;
