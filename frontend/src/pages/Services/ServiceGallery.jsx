import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import api from '../../services/api';

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
                const res = await api.get('/services');
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
            className="min-h-screen bg-[#FDFBF7] pt-24 md:pt-32 pb-20 md:pb-24 overflow-x-hidden"
        >
            {/* Subtle Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B77A8C]/5 to-transparent opacity-50"></div>
            </div>

            {/* Header Text */}
            <div className="max-w-4xl mx-auto px-5 md:px-8 mb-12 md:mb-20 relative z-10 flex flex-col items-center text-center">


                <motion.h1 variants={textVariant} className="font-display text-3xl sm:text-4xl md:text-6xl text-[#5A2A45] mb-4 leading-tight px-2">
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p variants={textVariant} className="text-[#B77A8C] font-display italic text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
                        {subtitle}
                    </motion.p>
                )}
                <motion.div variants={textVariant} className="w-12 md:w-20 h-0.5 bg-[#5A2A45]/20 rounded-full mb-8"></motion.div>

                <motion.p variants={textVariant} className="max-w-prose text-[#6E5A52] font-outfit font-light text-base md:text-lg leading-relaxed px-2 md:px-0">
                    {description}
                </motion.p>
            </div>

            {/* Dynamic Gallery Grid */}
            <div className="relative z-10 px-4 md:px-10 max-w-7xl mx-auto mb-16 md:mb-24">
                <DynamicGalleryGrid images={displayImages} />
            </div>

            {/* Detailed Description */}
            {(details) && (
                <motion.div variants={textVariant} className="max-w-3xl mx-auto px-6 md:px-0 mt-8 mb-12 relative z-10">
                    <div className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-[#5A2A45]/5 shadow-[0_10px_40px_-10px_rgba(90,42,69,0.05)] text-center">
                        <Sparkles size={24} className="text-[#B77A8C] mx-auto mb-6 opacity-60" />
                        <h3 className="font-display text-xl text-[#5A2A45] mb-4">Service Details</h3>
                        <p className="font-outfit text-[#5A2A45]/80 leading-loose text-sm md:text-base whitespace-pre-line">
                            {details}
                        </p>
                    </div>
                </motion.div>
            )}

        </motion.div>
    );
};

export default ServiceGallery;
