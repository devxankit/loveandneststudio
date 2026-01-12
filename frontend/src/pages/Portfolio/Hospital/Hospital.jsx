import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';
import LazyImage from '../../../components/common/LazyImage';
import api from '../../../services/api';

// Fallbacks
const heroFallback = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937541/loveandnest/assets/hero/Screenshot%202025-12-30%20141652.png";
const catFallback1 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937585/loveandnest/assets/portfolio/maternity/Screenshot%202026-01-01%20230114.png";
const catFallback2 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937541/loveandnest/assets/hero/Screenshot%202025-12-30%20141652.png";
const catFallback3 = "https://res.cloudinary.com/djuyp9lut/image/upload/v1767937567/loveandnest/assets/portfolio/family/Screenshot%202025-12-31%20111323.png";

const Hospital = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await api.get('/hospital/page');
                setPageData(res.data);
            } catch (error) {
                console.error("Failed to load hospital content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#5A2A45] font-display text-2xl">
            Loading...
        </div>
    );

    const hero = pageData?.hero || {};
    const categoriesSection = pageData?.categoriesSection || {};
    const categories = pageData?.categories || [];

    return (
        <>
            <SEO
                title="Hospital Sessions | Love & Nest Studio"
                description="Capturing the raw and real moments of your baby's first hours."
            />

            <div className="min-h-screen bg-[#fffcf8] py-28 md:py-40 px-6 md:px-12 lg:px-24">

                {/* --- Hero Section matching "Modern Mania" style --- */}
                <div className="relative max-w-[1400px] mx-auto mb-32 md:mb-48">
                    <div className="flex flex-col lg:flex-row items-center relative">
                        {/* Large Left Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-[65%] h-[50vh] md:h-[70vh] relative z-0"
                        >
                            <LazyImage
                                src={hero.image || heroFallback}
                                className="w-full h-full object-cover shadow-sm"
                            />
                        </motion.div>

                        {/* Overlapping Text Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="w-[90%] lg:w-[45%] bg-[#5A2A45] p-8 md:p-12 lg:p-16 absolute -bottom-20 lg:bottom-12 right-0 lg:-right-4 z-10 shadow-xl"
                        >
                            <h1 className="font-display text-3xl md:text-5xl text-white mb-6 uppercase tracking-wider">
                                {hero.title || "Hospital Sessions"}
                            </h1>
                            <p className="font-outfit text-white/90 text-sm md:text-base leading-relaxed mb-8">
                                {hero.description || "Love & Nest is the home of all things joy, capturing simple beauty and raw emotion. Join us as we document the first breaths, the tiny fingers, and the overwhelming love of the first 48 hours."}
                            </p>
                            <button className="border border-white text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#5A2A45] transition-colors duration-300">
                                {hero.buttonText || "Read More"}
                            </button>
                        </motion.div>
                    </div>
                </div>


                {/* --- Categories Grid matching "Current Obsessions" style --- */}
                <div className="max-w-[1400px] mx-auto pt-20">
                    <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-[#E8CBB6] uppercase leading-none">
                            {categoriesSection.title?.split(' ')[0] || "Current"} <br />
                            <span className="text-[#E8CBB6]/60">{categoriesSection.title?.split(' ').slice(1).join(' ') || "Obsessions"}</span>
                        </h2>
                        <div className="h-[1px] bg-[#E8CBB6] flex-grow opacity-30 hidden md:block ml-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {categories.map((cat, index) => {
                            const fallbackImg = index === 0 ? catFallback1 : index === 1 ? catFallback2 : catFallback3;

                            return (
                                <Link to={cat.link} key={index} className="group cursor-pointer">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        className="relative"
                                    >
                                        {/* Image */}
                                        <div className="w-full aspect-[4/5] overflow-hidden mb-12">
                                            <LazyImage
                                                src={cat.image || fallbackImg}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Overlapping Bottom Box */}
                                        <div className="absolute bottom-0 left-6 right-0 bg-[#5A2A45] p-6 shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                                            <h3 className="font-display text-xl text-white uppercase mb-2">
                                                {cat.title}
                                            </h3>
                                            <p className="font-outfit text-white/80 text-[10px] md:text-xs uppercase tracking-widest">
                                                {cat.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Hospital;
