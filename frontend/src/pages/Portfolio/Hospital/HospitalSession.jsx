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
    // Combine both image arrays to ensure nothing is missed. 
    // If hero.images is undefined, empty array. If puzzleImages is undefined, empty array.
    const allImages = [...(hero.images || []), ...(data?.puzzleImages || [])];

    return (
        <>
            <SEO
                title={`${hero.title || type} | Love & Nest Studio`}
                description={hero.text || `Professional ${type} photography session.`}
            />

            <div className="bg-white min-h-screen font-outfit text-[#4A4A4A] relative">

                {/* 1. HERO HEADER */}
                <section className="pt-32 md:pt-48 pb-16 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs text-[#B77A8C] font-bold block mb-4">Hospital Collection</span>
                        <h1 className="font-display text-5xl md:text-7xl text-[#5A2A45] capitalize mb-6">
                            {hero.title || type}
                        </h1>
                        <div className="w-12 h-[1px] bg-[#B77A8C] mx-auto mb-8"></div>
                        <p className="text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
                            {hero.text || "Capturing the raw, authentic beauty of your family's newest beginning in its purest form."}
                        </p>
                    </motion.div>
                </section>

                {/* 2. GALLERY GRID (Newborn Style - Same to Same) */}
                <section className="py-20 px-4 md:px-8 bg-[#FAF9F6]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 max-w-6xl mx-auto">
                        {allImages.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-400 font-light italic">
                                Gallery is being curated. Please check back soon.
                            </div>
                        )}
                        {allImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.8 }}
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
                        ))}
                    </div>
                </section>

                {/* 3. EXPERIENCE LINK */}
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
