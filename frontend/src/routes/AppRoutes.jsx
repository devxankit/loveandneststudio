import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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
const Offers = lazy(() => import('../pages/Offers/Offers'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Testimonials = lazy(() => import('../pages/Testimonials/Testimonials'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading Component
import PageLoader from '../components/common/PageLoader';

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
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
                <Route path="/offers" element={<Offers />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
