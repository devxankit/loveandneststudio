import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from '../common/LazyImage';

const AdventureModal = ({ isOpen, onClose, data }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !data) return null;

    const { topImage, content, sideImage } = data;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#FDFBF7] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#5A2A45] transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-6 md:p-10 space-y-8">
                            {/* 1. Top Horizontal Image */}
                            <div className="w-full h-48 md:h-80 rounded-lg overflow-hidden shadow-sm bg-gray-200">
                                {topImage ? (
                                    <LazyImage
                                        src={topImage}
                                        alt="Adventure Top"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-outfit uppercase tracking-widest text-sm">
                                        Top Image Placeholder
                                    </div>
                                )}
                            </div>

                            {/* 2. Content & Parallel Image Section (Animated) */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center overflow-hidden">
                                {/* Left Content - Animated Fade Up */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-full md:w-2/3"
                                >
                                    <h3 className="font-display text-3xl md:text-4xl text-[#5A2A45] mb-6">Discovery</h3>
                                    <div className="prose prose-lg text-[#4A4A4A] font-outfit whitespace-pre-wrap leading-relaxed">
                                        {content}
                                    </div>
                                </motion.div>

                                {/* Right Side Image - Animated Slide In & Rotate */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, rotate: 5 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="w-full md:w-1/3"
                                >
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:rotate-0 transition-transform duration-500 bg-white p-2">
                                        <div className="w-full h-full rounded overflow-hidden bg-gray-200">
                                            {sideImage ? (
                                                <LazyImage
                                                    src={sideImage}
                                                    alt="Adventure Side"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-outfit uppercase tracking-widest text-sm">
                                                    Side Image Placeholder
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default AdventureModal;
