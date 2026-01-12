import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#5A2A45] font-display text-2xl">Loading Session...</div>;
    // Render even if data is null to show layout
    if (!data && !loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#5A2A45]">Session not found.</div>;

    const hero = data?.hero || {};
    const puzzleImages = data?.puzzleImages || [];

    return (
        <>
            <SEO
                title={`${hero.title || type} | Love & Nest Studio`}
                description={hero.text || `Professional ${type} photography session.`}
            />

            <div className="min-h-screen bg-[#FDFBF7] font-outfit text-[#4A4A4A] pb-20 pt-32 md:pt-40 px-4 md:px-8 flex flex-col items-center">

                {/* Animated Header (Matching Baby Hero Style) */}
                <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 3, -3, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block mb-4"
                        >
                            <p className="uppercase tracking-[0.3em] text-sm text-[#B77A8C] font-medium">Moments Captured</p>
                        </motion.div>

                        <h1 className="font-display text-5xl md:text-7xl text-[#5A2A45] capitalize mb-4 leading-tight">
                            {hero.title || type}
                        </h1>
                    </motion.div>
                </div>

                {/* Simple & Clean Gallery Grid (Replacing Swapping Grid) */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pb-32">
                    {puzzleImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`relative group overflow-hidden bg-white shadow-xl ${index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                        >
                            <div className="aspect-[4/5] w-full h-full">
                                <LazyImage
                                    src={img || defaultImg}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
                                <div className="w-8 h-[1px] bg-white/60 mb-2"></div>
                                <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">L&N Archives</p>
                            </div>
                        </motion.div>
                    ))}
                    {puzzleImages.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-40 italic">
                            No images captured in this session yet.
                        </div>
                    )}
                </div>

                <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .backface-hidden { backface-visibility: hidden; }
                `}</style>
            </div>
        </>
    );
};

export default HospitalSession;
