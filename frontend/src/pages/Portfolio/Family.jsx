import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import { getFamilyPage } from '../../services/api';

// Fallback images from assets
import heroImgDefault from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';
import portraitImg1Default from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111330.png';
import wideImgDefault from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import portraitImg2Default from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120811.png';
import storyImgDefault from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120820.png';
import detailImg1Default from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120831.png';
import detailImg2Default from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120844.png';
import lineArtImgDefault from '../../assets/images/portfolio/family/line art/Screenshot_2025-12-31_145813-removebg-preview.png';

const Family = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getFamilyPage();
                // Handle the { success: true, data: ... } wrapper
                setData(res.data.data || res.data);
            } catch (error) {
                console.error("Failed to fetch family page data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#5A2A45] font-display text-2xl">
            Loading...
        </div>
    );

    const hero = data?.hero || {};
    const philosophy = data?.philosophy || {};
    const banner = data?.banner || {};
    const selectedWorks = data?.selectedWorks || [];
    const mosaic = data?.mosaic || {};
    const archGrid = data?.archGrid || { images: [] };

    return (
        <>
            <SEO
                title={`${hero.titleLine1 || 'Family Photography'} | Love & Nest Studio`}
                description={philosophy.text1?.substring(0, 160) || "Capturing the timeless bonds of family with grace and warmth."}
                keywords="family photography, luxury family portraits, dehradun photographer"
            />

            {/* --- FIXED BACKGROUND IMAGE (Watermark style) --- */}
            <div className="fixed inset-0 w-full h-full -z-50 bg-[#FAF9F6]">
                <img
                    src={hero.fixedBgImage || heroImgDefault}
                    alt="Background"
                    className="w-full h-full object-cover opacity-[0.15] pointer-events-none saturate-0"
                />
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-100/30 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-100/20 rounded-full blur-[120px] opacity-60" />
            </div>

            {/* Premium Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="w-full font-outfit text-[#4A4A4A] relative z-10 pt-40 md:pt-48">

                {/* 1. REPURPOSED HEADER (Transparent) */}
                <section className="flex flex-col justify-center items-center text-center px-6 mb-32 md:mb-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="font-outfit text-xs md:text-sm tracking-[0.3em] uppercase mb-6 text-[#8F8A86] inline-block">
                            {hero.experienceText || '13 Years of Experience • Love & Nest Studio'}
                        </span>
                    </motion.div>

                    <div className="relative mb-8 mt-2">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%", rotate: 2 }}
                                animate={{ y: 0, rotate: 0 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="font-display text-5xl md:text-7xl lg:text-[6.5rem] tracking-tight leading-[0.9] uppercase font-medium text-[#1a1a1a]"
                            >
                                {hero.titleLine1 || 'Preserving Your'}
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%", rotate: -2 }}
                                animate={{ y: 0, rotate: 0 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                                className="font-display text-5xl md:text-7xl lg:text-[6.5rem] tracking-tight leading-[1] uppercase font-light text-[#1a1a1a]"
                            >
                                <span className="italic normal-case opacity-70">{hero.titleLine2 || 'Family Legacy'}</span>
                            </motion.h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                        className="w-[1px] h-16 bg-gradient-to-b from-[#1a1a1a]/40 to-transparent mb-10 mx-auto origin-top"
                    ></motion.div>

                </section>

                {/* 2. GREETINGS / INTRO SECTION */}
                <section className="py-20 md:py-32 px-8 md:px-16 max-w-[1500px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative lg:col-span-5"
                        >
                            <div className="aspect-[4/5] overflow-hidden shadow-xl rounded-sm">
                                <LazyImage src={philosophy.image || portraitImg1Default} alt="Portrait Intro" className="w-full h-full object-cover grayscale-[10%]" />
                            </div>
                            <div className="absolute -top-6 -left-6 w-full h-full border-[0.5px] border-[#2a2a2a]/30 -z-10 hidden md:block"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-left lg:col-span-7 lg:pl-12"
                        >
                            <span className="font-outfit text-[10px] uppercase tracking-[5px] text-[#8F8A86] mb-6 block border-l-2 border-[#8F8A86] pl-4">The Philosophy</span>
                            <h2 className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-10 leading-[1.15]">
                                {philosophy.titleLine1} <br /><span className="italic font-light text-[#8F8A86]">{philosophy.titleLine2}</span>
                            </h2>
                            <div className="space-y-8 text-[#555] font-light leading-loose text-lg text-justify md:columns-1 lg:columns-2 gap-10 whitespace-pre-wrap">
                                <p>{philosophy.text1}</p>
                                <p>{philosophy.text2}</p>
                            </div>
                            <div className="mt-16 flex items-center gap-6">
                                <div className="h-[1px] w-20 bg-[#2a2a2a]/30"></div>
                                <div>
                                    <p className="font-display text-lg italic text-[#1a1a1a]">{philosophy.author}</p>
                                    <p className="font-outfit text-[10px] tracking-widest text-gray-500 uppercase mt-0.5">{philosophy.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. WIDE CINEMATIC BANNER */}
                <section className="w-full relative py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
                    <div className="w-full h-[50vh] md:h-[75vh] overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 p-4 md:p-8 border border-white/20 z-10 pointer-events-none">
                            <div className="w-full h-full border border-white/40"></div>
                        </div>
                        <motion.div
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8 }}
                            className="w-full h-full"
                        >
                            <LazyImage src={banner.image || wideImgDefault} alt="Wide Landscape Family" className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]" />
                        </motion.div>
                        <div className="absolute bottom-12 left-12 md:left-24 text-white z-20">
                            <p className="font-display italic text-2xl md:text-3xl">{banner.quote}</p>
                        </div>
                    </div>
                </section>

                {/* 4. SELECTED WORKS (Editorial Grid) */}
                <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1300px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#2a2a2a]/10 pb-10">
                        <div>
                            <span className="font-outfit text-xs tracking-[3px] text-gray-500 uppercase mb-2 block">Portfolio</span>
                            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a]">Selected Stories</h2>
                        </div>
                        <div className="hidden md:block">
                            <a href="/contact" className="font-outfit text-xs uppercase tracking-[2px] border border-[#2a2a2a]/30 rounded-full px-6 py-3 hover:bg-[#1a1a1a] hover:text-white transition-all">View All Archives</a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-32 md:gap-y-24">
                        {selectedWorks.map((work, i) => (
                            <div key={i} className={`flex flex-col group cursor-pointer ${i % 2 !== 0 ? 'md:pt-32' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i % 2 * 0.2 }}
                                    className="w-full aspect-[4/5] overflow-hidden mb-8 relative shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
                                    <LazyImage src={work.image || (i === 0 ? portraitImg2Default : i === 1 ? storyImgDefault : '')} alt={work.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                                </motion.div>
                                <span className="font-outfit text-[10px] tracking-[3px] text-gray-500 uppercase mb-2">{work.subtitle}</span>
                                <h3 className="font-display text-3xl text-[#1a1a1a] group-hover:italic transition-all duration-300">{work.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. BOTTOM GRID / MOSAIC */}
                <section className="pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="aspect-square overflow-hidden shadow-md">
                            <LazyImage src={mosaic.image1 || detailImg1Default} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                        </div>
                        <div className="aspect-square overflow-hidden bg-white/50 backdrop-blur-sm border border-white/40 flex items-center justify-center p-8 text-center shadow-md">
                            <div>
                                <h4 className="font-display text-2xl text-[#2a2a2a] mb-2">{mosaic.title || 'Ready to tell your story?'}</h4>
                                <a href="/contact" className="text-xs font-outfit uppercase tracking-[2px] border-b border-[#2a2a2a] pb-1 hover:text-[#88B8AF] hover:border-[#88B8AF] transition-colors">Get in Touch</a>
                            </div>
                        </div>
                        <div className="aspect-square overflow-hidden shadow-md">
                            <LazyImage src={mosaic.image2 || detailImg2Default} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                        </div>
                    </div>
                </section>

                {/* 6. ANIMATED ARCH GRID */}
                <section className="py-20 md:py-32 px-4 overflow-hidden relative">
                    <div className="flex justify-center items-end gap-2 md:gap-6 max-w-[1400px] mx-auto h-[250px] md:h-[500px]">

                        {/* 1. Left Outer (Small) */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-[12%] h-[45%] md:h-[50%] rounded-lg md:rounded-xl overflow-hidden shadow-lg relative z-0"
                        >
                            <LazyImage src={archGrid.images[0] || detailImg2Default} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* 2. Left Inner (Medium) */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-[18%] h-[65%] md:h-[70%] rounded-lg md:rounded-xl overflow-hidden shadow-xl relative z-10"
                        >
                            <LazyImage src={archGrid.images[1] || portraitImg1Default} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* 3. Center (Full Family - The Reference) */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-[30%] md:w-[25%] h-full rounded-lg md:rounded-2xl overflow-visible shadow-2xl relative z-20"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-[88%] left-1/2 -translate-x-1/2 w-[80%] md:w-[80%] z-20 pointer-events-none"
                            >
                                <LazyImage src={archGrid.lineArtImage || lineArtImgDefault} className="w-full h-auto object-contain opacity-90 drop-shadow-sm" />
                            </motion.div>

                            <div className="w-full h-full overflow-hidden rounded-lg md:rounded-2xl">
                                <LazyImage src={archGrid.images[2] || storyImgDefault} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <span className="font-display text-white text-xl md:text-3xl tracking-widest mt-12">Family</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 4. Right Inner (Medium) */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-[18%] h-[65%] md:h-[70%] rounded-lg md:rounded-xl overflow-hidden shadow-xl relative z-10"
                        >
                            <LazyImage src={archGrid.images[3] || portraitImg2Default} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* 5. Right Outer (Small) */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-[12%] h-[45%] md:h-[50%] rounded-lg md:rounded-xl overflow-hidden shadow-lg relative z-0"
                        >
                            <LazyImage src={archGrid.images[4] || detailImg1Default} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>

                    <div className="text-center mt-16 md:mt-24">
                        <h4 className="font-display text-2xl md:text-4xl text-[#1a1a1a] mb-6">{archGrid.title}</h4>
                        <a href="/contact" className="inline-block border-b border-[#1a1a1a] pb-1 text-sm md:text-base font-outfit uppercase tracking-widest hover:text-[#88B8AF] hover:border-[#88B8AF] transition-colors">
                            Get in Touch
                        </a>
                    </div>
                </section>
                {/* Footer simple link */}
                <div className="py-8 text-center bg-transparent mt-10">
                    <p className="text-[10px] uppercase text-gray-400 tracking-[0.2em]">Crafted with love for your legacy</p>
                </div>
            </div>
        </>
    );
};

export default Family;
