import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';
import LazyImage from '../../../components/common/LazyImage';
import api from '../../../services/api';

// Fallback images
import defaultImg from '../../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';

const HospitalSession = () => {
    const { type } = useParams(); // 'birth', 'newborn', 'family'
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/hospital/session/${type}`);
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch hospital session data", error);
            } finally {
                setLoading(false);
            }
        };
        if (type) fetchData();
    }, [type]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-[#B77A8C] font-display text-2xl">Loading Session...</div>;
    // Render even if data is null to show layout
    if (!data && !loading) return <div className="min-h-screen flex items-center justify-center bg-white text-[#B77A8C]">Session not found.</div>;

    const hero = data?.hero || {};
    const puzzleImages = data?.puzzleImages || [];
    // If hero.images exists, use it for gallery, otherwise fallback to puzzleImages so gallery isn't empty
    const allImages = (hero.images && hero.images.length > 0) ? hero.images : puzzleImages;

    // Map uploaded images to the puzzle layout (same as Newborn/Baby page)
    const puzzleLayout = [
        { span: 1, rounded: 'rounded-tl-2xl' },
        { span: 2, rounded: 'rounded-tr-lg' },
        { span: 1, rounded: '' },
        { span: 1, rounded: '' },
        { span: 2, rounded: '' },
        { span: 1, rounded: 'rounded-tr-3xl' },
        { span: 1, rounded: 'rounded-bl-lg' },
        { span: 2, rounded: '' },
        { span: 2, rounded: '' },
        { span: 1, rounded: '' },
        { span: 1, rounded: 'rounded-br-xl' },
        { span: 2, rounded: 'rounded-bl-3xl' },
        { span: 1, rounded: '' },
        { span: 2, rounded: 'rounded-br-2xl' },
        { span: 1, rounded: '' },
    ].map((slot, i) => {
        let img = defaultImg;
        if (puzzleImages && puzzleImages.length > 0) {
            img = puzzleImages[i % puzzleImages.length];
        } else if (allImages && allImages.length > 0) {
            img = allImages[i % allImages.length];
        }
        return { ...slot, img };
    });

    return (
        <>
            <SEO
                title={`${hero.title || type} | Love & Nest Studio`}
                description={hero.text || `Professional ${type} photography session.`}
            />

            <div className="bg-white min-h-screen font-outfit text-[#4A4A4A] relative">

                {/* 1. HERO HEADER */}
                {/* 1. HERO HEADER - Cinematic Center Reveal */}
                <section className="relative pt-40 md:pt-52 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">

                    {/* Ambient Background Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#B77A8C]/10 to-[#FDE2E4]/30 rounded-full blur-[100px] pointer-events-none z-0"
                    />

                    {/* Floating Images - Left & Right */}
                    {(allImages.length > 0 || hero.floatingImages?.length > 0) && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, x: -100, rotate: -10 }}
                                animate={{
                                    opacity: 0.8,
                                    x: 0,
                                    y: [0, -20, 0],
                                    rotate: [-6, -10, -6]
                                }}
                                transition={{
                                    opacity: { duration: 1 },
                                    x: { duration: 1, ease: "easeOut" },
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="hidden md:block absolute top-20 left-[5%] lg:left-[10%] w-56 h-56 md:w-64 md:h-64 bg-white p-2 rounded-full shadow-xl z-0 transform -rotate-6"
                            >
                                <LazyImage src={hero.floatingImages?.[0] || allImages[0] || defaultImg} className="w-full h-full object-cover rounded-full filter sepia-[0.2]" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 100, rotate: 10 }}
                                animate={{
                                    opacity: 0.8,
                                    x: 0,
                                    y: [0, 20, 0],
                                    rotate: [6, 10, 6]
                                }}
                                transition={{
                                    opacity: { duration: 1, delay: 0.3 },
                                    x: { duration: 1, ease: "easeOut", delay: 0.3 },
                                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                                    rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="hidden md:block absolute bottom-10 right-[5%] lg:right-[10%] w-48 h-48 md:w-56 md:h-56 bg-white p-2 rounded-full shadow-xl z-0 transform rotate-6"
                            >
                                <LazyImage src={hero.floatingImages?.[1] || allImages[1] || allImages[0] || defaultImg} className="w-full h-full object-cover rounded-full filter sepia-[0.2]" />
                            </motion.div>
                        </>
                    )}

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="inline-block py-1.5 px-4 bg-white/50 backdrop-blur-md border border-[#B77A8C]/20 rounded-full text-[10px] md:text-xs text-[#B77A8C] font-bold uppercase tracking-[0.25em] mb-8 shadow-sm">
                                Hospital Collection
                            </span>
                        </motion.div>

                        <div className="overflow-hidden mb-8 px-2">
                            <motion.h1
                                initial={{ y: "120%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="font-display text-6xl md:text-8xl lg:text-9xl text-[#5A2A45] capitalize tracking-tight leading-none"
                            >
                                {hero.title || type}
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B77A8C] to-transparent mx-auto mb-10"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-[#6E5A52] font-outfit font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                        >
                            {hero.text || "Capturing the raw, authentic beauty of your family's newest beginning in its purest form."}
                        </motion.p>
                    </div>
                </section>

                {/* 1.5 WELCOME SECTION */}
                {data?.welcome && (
                    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                            {/* Text Side */}
                            <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <span className="font-handwriting text-4xl md:text-5xl text-[#B77A8C] block mb-2">
                                        {data.welcome.handwriting || "The Beginning"}
                                    </span>
                                    <h2 className="font-display text-5xl md:text-7xl text-[#5A2A45] leading-tight capitalize">
                                        {data.welcome.title || "First Breaths"}
                                    </h2>
                                    <div className="w-20 h-1 bg-[#B77A8C]/20 rounded-full" />
                                    <p className="text-[#6E5A52] font-outfit text-lg md:text-xl leading-relaxed font-light">
                                        {data.welcome.text || "There is nothing quite like those first few hours of life. The tiny details, the overwhelming love, and the magic of a new beginning."}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-[#5A2A45] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-[#B77A8C] transition-colors"
                                    >
                                        {data.welcome.buttonText || "Book Your Session"}
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Image Side */}
                            <div className="lg:w-1/2 order-1 lg:order-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-4 border border-[#B77A8C]/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10" />
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                                        <LazyImage
                                            src={data.welcome.image || allImages[0] || defaultImg}
                                            className="w-full h-full object-cover"
                                            alt="Featured Hospital Moment"
                                        />
                                    </div>
                                    {/* Decorative badge */}
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-[#FDFBF7] rounded-full shadow-lg border border-[#B77A8C]/10 flex items-center justify-center p-4">
                                        <div className="text-center">
                                            <span className="block font-display text-4xl text-[#B77A8C] leading-none italic">13</span>
                                            <span className="block text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-[#5A2A45] mt-1">Years experience</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. GALLERY GRID (Newborn Style - Same to Same) */}
                <section className="py-20 px-4 md:px-8 bg-[#FAF9F6]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
                        {allImages.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-400 font-light italic">
                                Gallery is being curated. Please check back soon.
                            </div>
                        )}
                        {allImages.map((img, idx) => {
                            // 0 = Left, 1 = Middle, 2 = Right
                            const col = idx % 3;
                            const initialX = col === 0 ? -50 : col === 2 ? 50 : 0;
                            const initialY = col === 1 ? 30 : 0; // Middle fades up slightly

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: initialX, y: initialY }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ margin: "-50px" }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.215, 0.61, 0.355, 1],
                                        delay: (idx % 3) * 0.1 // Stagger based on column position
                                    }}
                                    className="aspect-square relative group overflow-hidden bg-gray-100 cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <LazyImage src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                    {/* Hover Overlay - Same to Newborn */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#B77A8C]/90 via-[#B77A8C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#B77A8C] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                                                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. PUZZLE GRID (Same as Newborn Page) */}
                {puzzleImages.length > 0 && (
                    <section className="relative z-10 px-4 md:px-8 mt-12 md:mt-24">
                        <div className="text-center mb-12">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="uppercase tracking-[0.3em] text-xs text-[#B77A8C]"
                            >
                                Swapping Memories
                            </motion.p>
                        </div>
                        <div className="max-w-5xl mx-auto grid grid-cols-4 md:grid-cols-8 gap-2 pb-20">
                            {puzzleLayout.map((item, index) => (
                                <div key={index} className={`relative group perspective-1000 cursor-pointer aspect-square ${item.span === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}>
                                    <div className="w-full h-full duration-700 preserve-3d group-hover:[transform:rotateX(180deg)] relative">
                                        <div className={`absolute inset-0 backface-hidden w-full h-full overflow-hidden bg-white shadow-sm ${item.rounded}`}>
                                            <LazyImage src={item.img} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-[#B77A8C]/0 group-hover:bg-[#B77A8C]/10 transition-colors" />
                                        </div>
                                        <div className={`absolute inset-0 backface-hidden w-full h-full [transform:rotateX(180deg)] bg-[#B77A8C] flex items-center justify-center text-white ${item.rounded}`}>
                                            <div className="text-center p-2">
                                                {item.span === 2 ? (
                                                    <><span className="font-display text-2xl md:text-3xl block">Love</span><span className="font-display text-2xl md:text-3xl block">& Nest</span></>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. EXPERIENCE LINK */}
                <div className="py-24 text-center">
                    <Link
                        to="/portfolio/hospital"
                        className="inline-flex items-center gap-6 group"
                    >
                        <span className="w-10 h-[1px] bg-[#B77A8C] group-hover:w-16 transition-all duration-500"></span>
                        <span className="text-xs uppercase tracking-[0.4em] text-[#5A2A45] font-bold">Back to Hospital</span>
                        <span className="w-10 h-[1px] bg-[#B77A8C] group-hover:w-16 transition-all duration-500"></span>
                    </Link>
                </div>

                <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .backface-hidden { backface-visibility: hidden; }
                `}</style>

                {/* Modal for Full-screen view */}
                <ImageModal
                    selectedImage={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            </div>
        </>
    );
};

// Modal Component (Ported from Newborn.jsx for consistency)
const ImageModal = ({ selectedImage, onClose }) => {
    if (!selectedImage) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-8 cursor-zoom-out bg-[#333]/90 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 max-w-[95vw] max-h-[95vh] rounded-sm shadow-2xl flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-full max-h-[90vh] object-contain block select-none"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white hover:text-[#5A2A45] transition-colors p-2 bg-black/10 hover:bg-white rounded-full backdrop-blur-sm"
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

export default HospitalSession;
