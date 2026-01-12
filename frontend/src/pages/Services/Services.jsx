import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import SEO from '../../components/seo/SEO';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Services = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/services');
                setPageData(res.data);
            } catch (error) {
                console.error("Error fetching services page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-[#5A2A45]">Loading...</div>;
    }

    if (!pageData) return null;

    const { hero, serviceList } = pageData;
    const activeServices = serviceList?.filter(s => s.isActive) || [];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={pageData.meta?.title || "Our Services | Love & Nest"}
                description={pageData.meta?.description || "Professional photography services including newborn, maternity, baby milestone, cake smash, and family portraits."}
            />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden bg-[#FDFBF7]">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -left-[10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] -right-[10%] w-[60vh] h-[60vh] bg-[#E8CBB6]/30 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-[20%] left-[20%] w-[40vh] h-[40vh] bg-primary-light/30 rounded-full blur-[80px]"
                    />
                </div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center gap-4">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-primary-dark tracking-[0.3em] font-medium uppercase text-sm">{hero?.subtitle || 'Timeless Memories'}</span>
                            <span className="h-[1px] w-12 bg-primary"></span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 text-primary-dark leading-[1.1]"
                        >
                            {hero?.title?.split(' ').slice(0, -1).join(' ')} <br className="hidden sm:block" />
                            <span className="italic text-primary font-light">{hero?.title?.split(' ').slice(-1)}</span>
                        </motion.h1>

                        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto space-y-6 md:space-y-8">
                            <p className="font-outfit text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0">
                                We craft visual stories of your family's journey. From the first heartbeat to the first steps, we are there to capture it all with <span className="text-primary-dark font-normal">love, grace, and artistry.</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-dark/50"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary-dark/0 via-primary-dark/50 to-primary-dark/0 mx-auto"></div>
                    <span className="text-[10px] uppercase tracking-widest mt-2 block">Scroll</span>
                </motion.div>
            </section>

            {/* Main Services List - Grid Layout */}
            <section className="py-20 px-4 md:px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
                    {activeServices.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col group w-[calc(50%-8px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-20px)]"
                        >
                            {/* Image Container */}
                            <div className="relative mb-4 overflow-hidden rounded-xl shadow-md aspect-[4/5] w-full bg-gray-100">
                                {service.coverImage ? (
                                    <img
                                        src={service.coverImage}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Hover Overlay Context */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                    <Link
                                        to={
                                            {
                                                'maternity': '/portfolio/maternity',
                                                'birth': '/portfolio/birth',
                                                'newborn': '/portfolio/newborn',
                                                'pre-bday': '/portfolio/pre-birthday',
                                                'cakesmash': '/portfolio/cakesmash',
                                                'toddler': '/portfolio/toddler',
                                                'family': '/portfolio/family',
                                                'birthday': '/portfolio/birthday',
                                                'hospital': '/portfolio/hospital'
                                            }[service.id] || `/portfolio`
                                        }
                                        className="px-6 py-2 bg-white/90 text-primary-dark rounded-full text-sm font-medium tracking-wide shadow-lg hover:bg-white hover:scale-105 transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center space-y-2 md:space-y-3 px-1 md:px-2">
                                <h2 className="font-display text-sm md:text-lg font-bold text-primary-dark group-hover:text-primary transition-colors duration-300 leading-tight">
                                    {service.title}
                                </h2>
                                <div className="w-12 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                                <p className="font-outfit text-gray-500 text-xs leading-relaxed font-light line-clamp-2 mix-blend-multiply group-hover:line-clamp-none transition-all duration-300">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {activeServices.length === 0 && (
                        <div className="text-center py-20 text-gray-400 font-outfit">
                            Services are being curated. Coming soon!
                        </div>
                    )}
                </div>
            </section>

            {/* Premium Add-Ons Section */}
            <section className="py-28 px-6 lg:px-12 relative overflow-hidden bg-[#FEFDFB]">
                {/* Dynamic Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,203,182,0.15)_0%,rgba(255,255,255,0)_70%)] translate-x-1/3 -translate-y-1/3"
                    ></motion.div>
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(183,122,140,0.1)_0%,rgba(255,255,255,0)_70%)] -translate-x-1/3 translate-y-1/3"
                    ></motion.div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24 px-4 sm:px-0"
                    >
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-primary-dark mb-4 tracking-tight">
                            The <span className="italic font-light text-primary">Luxury</span> Experience
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-lg font-light tracking-wide uppercase text-[0.7rem] sm:text-[0.8rem]">
                            Exquisite Additions • Heirloom Quality • Timeless
                        </p>
                    </motion.div>

                    <div className="text-center text-[#B77A8C] italic text-sm">
                        Scroll down or visit our contact page for further details.
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
