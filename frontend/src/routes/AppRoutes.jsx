import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Portfolio from '../pages/Portfolio/Portfolio';
import Newborn from '../pages/Portfolio/Newborn';
import Maternity from '../pages/Portfolio/Maternity';
import Baby from '../pages/Portfolio/Baby';
import Family from '../pages/Portfolio/Family';
import Services from '../pages/Services/Services';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/Blog/BlogDetails';
import Offers from '../pages/Offers/Offers';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    return (
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
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
