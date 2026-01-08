import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIntroPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 3 seconds delay for a more balanced entry

        return () => clearTimeout(timer);
    }, []);

    const handleConnect = () => {
        window.open('https://wa.me/918679076776', '_blank');
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-[#5A2A45]/30 backdrop-blur-sm pointer-events-auto"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        className="pointer-events-auto bg-[#F1EBDD] border border-white/60 shadow-[0_30px_60px_-15px_rgba(90,42,69,0.25)] rounded-[24px] p-8 max-w-[340px] w-full relative overflow-hidden text-center"
                    >
                        {/* High-End Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B77A8C]/10 rounded-full blur-[50px] -mr-12 -mt-12"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C9D0C3]/20 rounded-full blur-[50px] -ml-12 -mb-12"></div>

                        {/* Minimal Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-[#5A2A45]/40 hover:text-[#5A2A45] transition-all hover:rotate-90 duration-500 p-2"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="w-12 h-12 bg-[#5A2A45] rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-[#5A2A45]/15"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </motion.div>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 0.2 }}
                                className="block text-[8px] uppercase tracking-[0.3em] text-[#5A2A45] mb-4 opacity-60"
                            >
                                Love & Nest Studio
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: 0.4 }}
                                className="block text-[9px] uppercase tracking-[0.5em] text-[#5A2A45] mb-3 font-bold"
                            >
                                Message From Artist
                            </motion.span>

                            <h3 className="font-display text-3xl text-[#5A2A45] mb-3 leading-tight">
                                Hello, I'm <br /> <span className="italic font-light font-serif text-[#B77A8C]">Anamika</span>
                            </h3>

                            <p className="text-[#6E5A52]/80 text-sm leading-relaxed mb-8 font-outfit font-light max-w-[260px] mx-auto">
                                "I'd love to hear your story and help you preserve your most fleeting moments forever."
                            </p>

                            <button
                                onClick={handleConnect}
                                className="w-full group relative overflow-hidden px-6 py-4 bg-[#5A2A45] text-[#F1EBDD] font-bold uppercase tracking-[0.25em] text-[9px] rounded-full shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Chat with Anamika
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#B77A8C]" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l10-10M7 7h10v10" /></svg>
                                </span>
                                <div className="absolute inset-0 bg-[#B77A8C] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>

                            <p className="mt-5 text-[8px] uppercase tracking-widest text-[#5A2A45]/30">Direct Line to Studio</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppIntroPopup;
