import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import axios from 'axios';

// Animation Variations
const elegantFade = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(5px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
};

const getContainerVariant = () => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 0.4 } }
});

const DynamicGalleryGrid = ({ images }) => {
    if (!images || images.length === 0) return <div className="text-center text-gray-400 py-20">No images in this gallery yet.</div>;

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mx-auto max-w-6xl">
            {images.map((img, i) => (
                <motion.div
                    key={i}
                    variants={elegantFade}
                    className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group relative mb-4"
                >
                    <img
                        src={img}
                        alt={`Gallery ${i}`}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </motion.div>
            ))}
        </div>
    );
};

const ServiceGallery = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/services');
                const allServices = res.data.serviceList || [];
                const found = allServices.find(s => s.id === id);
                setService(found);
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[#5A2A45]">Loading Gallery...</div>;

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-[#5A2A45]">
                <h2 className="text-2xl font-display mb-4">Service Not Found</h2>
                <Link to="/services" className="text-[#B77A8C] hover:underline">Return to Services</Link>
            </div>
        );
    }

    const { title, subtitle, details, description, galleryImages, coverImage } = service;

    // Fallback: If no gallery images, use cover image repeated or nothing.
    const displayImages = galleryImages && galleryImages.length > 0 ? galleryImages : (coverImage ? [coverImage] : []);

    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            key={id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={getContainerVariant()}
            className="min-h-screen bg-[#FDFBF7] pt-20 md:pt-28 pb-10 md:pb-16 overflow-x-hidden"
        >
            {/* Subtle Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B77A8C]/5 to-transparent opacity-50"></div>
            </div>

            {/* Header Text */}
            <div className="max-w-4xl mx-auto px-6 mb-12 md:mb-16 relative z-10 flex flex-col items-center text-center">
                <motion.div variants={textVariant}>
                    <Link to="/services" className="inline-flex items-center gap-2 text-[#6E5A52] hover:text-[#5A2A45] font-medium text-[9px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 transition-colors border-b border-transparent hover:border-[#5A2A45] pb-1">
                        <ArrowLeft size={10} className="md:w-3 md:h-3" /> Back to Services
                    </Link>
                </motion.div>

                <motion.h1 variants={textVariant} className="font-display text-4xl md:text-6xl text-[#5A2A45] mb-3 leading-tight">
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p variants={textVariant} className="text-[#B77A8C] font-display italic text-lg md:text-2xl mb-6">
                        {subtitle}
                    </motion.p>
                )}
                <motion.div variants={textVariant} className="w-16 h-0.5 bg-[#5A2A45]/20 rounded-full mb-6"></motion.div>

                <motion.p variants={textVariant} className="max-w-2xl text-[#6E5A52] font-outfit font-light text-base md:text-lg leading-relaxed px-4 md:px-0">
                    {description}
                </motion.p>
            </div>

            {/* Dynamic Gallery Grid */}
            <div className="relative z-10 px-4 md:px-8 mb-16">
                <DynamicGalleryGrid images={displayImages} />
            </div>

            {/* Detailed Description */}
            {(details) && (
                <motion.div variants={textVariant} className="max-w-3xl mx-auto px-6 mt-12 mb-12 text-center relative z-10 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#5A2A45]/5 shadow-sm">
                    <Sparkles size={24} className="text-[#B77A8C] mx-auto mb-4 opacity-50" />
                    <p className="font-outfit text-[#5A2A45]/80 leading-loose text-sm md:text-base whitespace-pre-line">
                        {details}
                    </p>
                </motion.div>
            )}

        </motion.div>
    );
};

export default ServiceGallery;
