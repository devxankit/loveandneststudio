import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// --- IMAGES ---
// Hero
import heroImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';

// Line Art Icons
import icon1 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_145813-removebg-preview.png';
import icon2 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_152813-removebg-preview.png';
import icon3 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153004-removebg-preview.png';
import icon4 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153041-removebg-preview.png';
import icon5 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153051-removebg-preview.png';

// Content & Grid
import welcomeImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153341.png';
// import storyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153418 - Copy.png'; // Unused
import img1 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import img2 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153305.png';
import img3 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153316.png';
import img4 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import img5 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153332.png';
import img6 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

const Newborn = () => {

    // Line Art Data
    const features = [
        { icon: icon5, label: "About" },
        { icon: icon2, label: "Gallery" },
        { icon: icon3, label: "Blog" },
        { icon: icon4, label: "Contact" },
        { icon: icon1, label: "Family" },
    ];

    // Grid Images
    const galleryImages = [img1, img2, img3, img4, img5, img6];

    return (
        <>
            <SEO
                title="Newborn Portfolio | Love & Nest Studio"
                description="Capturing the innocent charm and tiny milestones of your newborn. Professional Newborn photography by Love & Nest Studio."
                keywords="newborn photography, infant photos, baby photoshoot, dehradun"
            />

            <div className="bg-white min-h-screen font-outfit text-[#4A4A4A] overflow-hidden relative">

                {/* Premium Grain Overlay */}
                <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-multiply"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* 1. HERO SECTION */}
                <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <LazyImage
                            src={heroImg}
                            alt="Newborn Hero"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-white/10" />
                    </motion.div>

                    {/* Floating Title Overlay */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full z-10 px-4">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="font-display text-5xl md:text-8xl text-white drop-shadow-md tracking-wider"
                        >
                            Sweet <span className="text-[#B77A8C]">Newborn</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-white/90 text-sm md:text-base tracking-[0.4em] uppercase mt-4"
                        >
                            Helping Your Littles Shine
                        </motion.p>
                    </div>
                </section>

                {/* 2. HORIZONTAL PARALLEL LINE ART (The Unique Feature) */}
                <section className="py-16 md:py-24 px-6 relative z-10 -mt-10 md:-mt-20 bg-transparent pointer-events-none">
                    <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-end gap-8 md:gap-12 pointer-events-auto">
                        {features.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8, ease: "backOut" }}
                                className="flex flex-col items-center gap-4 group cursor-pointer"
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }} // Staggered float
                                    className="w-16 h-16 md:w-24 md:h-24 relative"
                                >
                                    <LazyImage
                                        src={item.icon}
                                        className="w-full h-full object-contain drop-shadow-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                    />
                                </motion.div>
                                <span className="text-xs md:text-sm uppercase tracking-widest text-[#B77A8C] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. WELCOME SECTION (Text + Visual) */}
                <section className="py-20 md:py-32 px-8 max-w-7xl mx-auto relative">
                    {/* Decorative Background Element */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-50/50 rounded-full blur-3xl -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="font-display text-4xl md:text-6xl text-[#4A4A4A] mb-8">
                                Welcome
                            </h2>
                            <div className="w-12 h-1 bg-[#B77A8C] mb-8" />
                            <p className="font-outfit text-lg font-light leading-relaxed text-gray-600 mb-6">
                                Welcome to Love & Nest Studio's Newborn Portfolio. We believe that every coo, every yawn, and every tiny finger grasp is a story waiting to be told.
                            </p>
                            <p className="font-outfit text-lg font-light leading-relaxed text-gray-600">
                                Our minimalist, airy approach ensures that your newborn remains the star of every frame. We serve families across Dehradun with a gentle touch and a heart full of love.
                            </p>

                            <div className="mt-12 flex gap-4">
                                <span className="w-8 h-8 flex items-center justify-center border border-[#B77A8C] text-[#B77A8C] rounded-full hover:bg-[#B77A8C] hover:text-white transition-colors cursor-pointer"><i className="fab fa-instagram"></i></span>
                                <span className="w-8 h-8 flex items-center justify-center border border-[#B77A8C] text-[#B77A8C] rounded-full hover:bg-[#B77A8C] hover:text-white transition-colors cursor-pointer"><i className="fab fa-pinterest"></i></span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            {/* Visual Element (Using one of the images as a 'map' or 'graphic' placeholder since we don't have a map) */}
                            <div className="aspect-[4/5] opacity-80">
                                <LazyImage src={welcomeImg} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="absolute bottom-4 right-4 text-right">
                                <p className="font-display text-2xl text-[#B77A8C]">Based In</p>
                                <p className="uppercase tracking-[0.2em] text-gray-500">Dehradun, India</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 4. GALLERY GRID (Instagram Style) */}
                <section className="py-20 px-4 md:px-8 bg-[#FAF9F6]">
                    <div className="text-center mb-16">
                        <h3 className="font-display text-3xl md:text-4xl text-[#4A4A4A] mb-4">Instagram</h3>
                        <p className="uppercase tracking-widest text-[#B77A8C] text-xs">@loveandnest_newborn</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
                        {galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="aspect-square relative group overflow-hidden bg-gray-200"
                            >
                                <LazyImage src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                {/* Hover Overlay - Soft Pink Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#B77A8C]/90 via-[#B77A8C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#B77A8C] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer simple link */}
                <div className="py-8 text-center bg-white">
                    <p className="text-[10px] uppercase text-gray-400 tracking-[0.2em]">Designed with love for little ones</p>
                </div>
            </div>
        </>
    );
};

export default Newborn;
