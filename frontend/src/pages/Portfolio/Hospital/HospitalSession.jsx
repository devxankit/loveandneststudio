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

    // --- EXACT Baby.jsx Layout Structure ---
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
    ].map((slot, i) => ({
        ...slot,
        img: puzzleImages[i % puzzleImages.length] || defaultImg
    }));

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

                {/* Swapping Grid (Exactly matching Baby.jsx) */}
                <div className="max-w-5xl mx-auto grid grid-cols-4 md:grid-cols-8 gap-2 pb-20 w-full">
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
