import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import { getNewbornPage } from '../../services/api';

// --- FALLBACK IMAGES ---
import heroImgDefault from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import welcomeImgDefault from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153341.png';

// Line Art Icons (Static)
import icon1 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_145813-removebg-preview.png';
import icon2 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_152813-removebg-preview.png';
import icon3 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153004-removebg-preview.png';
import icon4 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153041-removebg-preview.png';
import icon5 from '../../assets/images/portfolio/baby/line art/Screenshot_2025-12-31_153051-removebg-preview.png';

const Newborn = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await getNewbornPage();
                setPageData(data);
            } catch (error) {
                console.error("Failed to load page content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    // Line Art Data (Static)
    const features = [
        { icon: icon5, label: "About" },
        { icon: icon2, label: "Gallery" },
        { icon: icon3, label: "Blog" },
        { icon: icon4, label: "Contact" },
        { icon: icon1, label: "Family" },
    ];

    // Helper to extract content safely (Simplified for new structure)
    const hero = pageData?.hero || {
        title: 'Sweet Newborn',
        subtitle: 'Helping Your Littles Shine',
        image: heroImgDefault
    };

    const welcome = pageData?.welcome || {
        title: 'Welcome',
        text: `Welcome to Love & Nest Studio's Newborn Portfolio. We believe that every coo, every yawn, and every tiny finger grasp is a story waiting to be told.\n\nOur minimalist, airy approach ensures that your newborn remains the star of every frame. We serve families across Dehradun with a gentle touch and a heart full of love.`,
        image: welcomeImgDefault
    };

    const gallery = pageData?.gallery || [];

    // Parse Welcome Text lines
    const welcomeLines = welcome.text ? welcome.text.split('\n\n') : [];

    if (loading) return <div className="h-screen bg-white flex items-center justify-center text-[#B77A8C]">Loading...</div>;

    return (
        <>
            <SEO
                title={`${hero.title.replace(/<\/?[^>]+(>|$)/g, "")} | Love & Nest Studio`}
                description={welcome.text?.substring(0, 150) || "Capturing the innocent charm of your newborn."}
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
                            src={hero.image || heroImgDefault}
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
                            {/* Render HTML for color/styling if user put spans in admin, else just text */}
                            <span dangerouslySetInnerHTML={{ __html: hero.title.replace('Newborn', '<span class="text-[#B77A8C]">Newborn</span>') }} />
                            {/* Note: The replace above is a hack to preserve the pink color if using default text. better way is to rely on admin inputs. 
                                 For now, let's just display text. User can use title for "Sweet" and we hardcode "Newborn"? 
                                 No, user wants to edit text. Let's just output text. If they want color, we might need rich text or separate fields. 
                                 Let's keep it simple: Render Title. 
                             */}
                        </motion.h1>
                        {/* Re-rendering title cleanly without hack since we want full dynamic */}
                        <div className="font-display text-5xl md:text-8xl text-white drop-shadow-md tracking-wider">
                            {hero.title}
                        </div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-white/90 text-sm md:text-base tracking-[0.4em] uppercase mt-4"
                        >
                            {hero.subtitle}
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
                                {welcome.title}
                            </h2>
                            <div className="w-12 h-1 bg-[#B77A8C] mb-8" />

                            {welcomeLines.length > 0 ? welcomeLines.map((line, idx) => (
                                <p key={idx} className="font-outfit text-lg font-light leading-relaxed text-gray-600 mb-6">
                                    {line}
                                </p>
                            )) : (
                                <p className="font-outfit text-lg font-light leading-relaxed text-gray-600 mb-6">
                                    {welcome.text}
                                </p>
                            )}


                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            {/* Visual Element */}
                            <div className="aspect-[4/5] opacity-80">
                                <LazyImage src={welcome.image || welcomeImgDefault} className="w-full h-full object-contain mix-blend-multiply" />
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


                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
                        {gallery.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-400 font-light">
                                Gallery is empty. Add images from Admin Panel.
                            </div>
                        )}
                        {gallery.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="aspect-square relative group overflow-hidden bg-gray-200 cursor-pointer"
                                onClick={() => setSelectedImage(img)}
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

                {/* Image Modal */}
                <ImageModal
                    selectedImage={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            </div>
        </>
    );
};

const ImageModal = ({ selectedImage, onClose }) => {
    if (!selectedImage) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 md:p-8 cursor-zoom-out h-screen w-screen overflow-hidden left-0 top-0"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[#333]/40 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 max-w-[95vw] max-h-[95vh] rounded-sm shadow-2xl group flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-full max-h-[90vh] object-contain block select-none"
                        />

                        <button
                            onClick={onClose}
                            className="absolute z-20 top-4 right-4 md:-right-16 md:top-0 text-white hover:text-[#5A2A45] transition-colors p-2 bg-black/10 hover:bg-white rounded-full backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Newborn;
