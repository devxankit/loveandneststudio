import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIntroPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // 2 seconds delay

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
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 pointer-events-none">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="pointer-events-auto bg-[#F1EBDD] border border-[#B77A8C]/20 shadow-2xl rounded-2xl p-6 md:p-8 max-w-sm md:max-w-md w-[90%] mx-auto relative overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#E6D1CB] rounded-full blur-[40px] opacity-50 -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#C9D0C3] rounded-full blur-[30px] opacity-40 -ml-8 -mb-8"></div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-[#6E5A52]/60 hover:text-[#5A2A45] transition-colors p-1"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="text-center relative z-10">
                            <div className="w-12 h-12 bg-[#5A2A45] rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </div>

                            <h3 className="font-display italic text-2xl text-[#5A2A45] mb-2">Welcome to Love & Nest</h3>
                            <p className="text-[#6E5A52] text-sm leading-relaxed mb-6 font-light">
                                Capturing the poetry of your life. Let's create something beautiful together.
                            </p>

                            <button
                                onClick={handleConnect}
                                className="w-full py-3 bg-[#5A2A45] text-[#F1EBDD] font-bold uppercase tracking-widest text-xs rounded-full shadow-lg hover:bg-[#B77A8C] transition-colors duration-300 flex items-center justify-center gap-2 group"
                            >
                                <span>Connect via WhatsApp</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppIntroPopup;
