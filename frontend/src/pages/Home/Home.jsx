import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import WhatsAppIntroPopup from '../../components/popups/WhatsAppIntroPopup';

// Images (Hero)
import heroImg1 from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import heroImg2 from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';
import heroImg3 from '../../assets/images/hero/Screenshot 2025-12-30 141711.png';
import heroImg4 from '../../assets/images/hero/Screenshot 2025-12-30 141721.png';
import heroImg5 from '../../assets/images/hero/Screenshot 2025-12-30 141756.png'; // Added more for grid
import heroImg6 from '../../assets/images/hero/Screenshot 2025-12-30 141833.png'; // Added more for grid

// Other Section Images (Existing)
import aboutImg from '../../assets/images/about/01-1.jpg';
import babyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import familyImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';

// Reusable Sticky Card Component
const HomeSection = ({ children, className = "", index = 0, style = {}, isSticky = true }) => {
    return (
        <motion.div
            className={`${isSticky ? 'sticky top-0' : 'relative'} h-screen w-full flex flex-col justify-center overflow-hidden border-t-[1px] border-white/20 shadow-2xl ${className}`}
            style={{
                zIndex: index,
                ...style
            }}
            initial={isSticky ? { y: 100, opacity: 0 } : { opacity: 1 }} // Only animate entrance if sticky/stacking
            whileInView={isSticky ? { y: 0, opacity: 1 } : { opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const HeroImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0.8, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <LazyImage
                        src={images[currentIndex]}
                        alt="Hero Slide"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const scrollRef = useRef(null);
    const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);

    // Automatic Smooth Scroll
    React.useEffect(() => {
        let animationFrameId;
        const speed = 0.5; // Adjust speed (smaller = slower)

        const autoScroll = () => {
            if (isAutoScrolling) {
                window.scrollBy(0, speed);

                // Stop if reached bottom
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    setIsAutoScrolling(false);
                } else {
                    animationFrameId = requestAnimationFrame(autoScroll);
                }
            }
        };

        if (isAutoScrolling) {
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAutoScrolling]);

    // Cleanup and control handlers
    const stopScroll = () => setIsAutoScrolling(false);

    const scrollToContent = () => {
        setIsAutoScrolling(false);
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div
            onMouseEnter={stopScroll}
            onTouchStart={stopScroll}
            onWheel={stopScroll}
            onClick={stopScroll}
        >
            <SEO
                title="Love & Nest Studio | Timeless Photography"
                description="Capturing the beautiful in-between moments of motherhood, newborn, and family life."
                keywords="photography, maternity, newborn, family, pune, studio"
            />
            <WhatsAppIntroPopup />

            <div className="bg-[#1a1a1a] min-h-screen font-outfit text-[#FAF9F6]">

                {/* 01. NEW HERO SLIDER SECTION - Normal Scroll */}
                <HomeSection index={10} className="bg-[#FAF9F6] text-[#1a1a1a] relative p-0 border-none" isSticky={false}>
                    <HeroImageSlider images={[heroImg1, heroImg2, heroImg3, heroImg4]} />

                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <h1 className="font-display text-[12vw] lg:text-[10rem] leading-[0.8] mix-blend-overlay opacity-90">
                                Love &<br />Nest
                            </h1>
                            <p className="mt-4 text-sm md:text-xl font-light tracking-[0.3em] uppercase opacity-80">
                                Fine Art Photography
                            </p>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto cursor-pointer" onClick={scrollToContent}>
                        <div className="flex flex-col items-center gap-2 text-white animate-bounce-slow">
                            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                                ↓
                            </div>
                        </div>
                    </div>
                </HomeSection>

                {/* SPLIT SCREEN LAYOUT CONTAINER */}
                <div className="flex flex-col lg:flex-row bg-[#1a1a1a] relative z-20">

                    {/* LEFT SIDE - STICKY CONTENT */}
                    <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 items-center justify-center p-20 border-r border-white/10 z-0 bg-[#F9F7F2]">
                        <div className="text-center space-y-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="space-y-4"
                            >
                                <span className="block text-xs font-bold uppercase tracking-[0.4em] text-[#B77A8C]">The Journey</span>
                                <h2 className="font-display text-7xl text-[#5A2A45] leading-tight">
                                    Curated<br />Moments
                                </h2>
                            </motion.div>

                            <div className="w-[1px] h-32 bg-[#6E5A52]/20 mx-auto"></div>

                            <div className="space-y-2 text-[#6E5A52] font-light text-sm tracking-widest uppercase">
                                <p>01 — Introduction</p>
                                <p>02 — The Artist</p>
                                <p>03 — Philosophy</p>
                                <p>04 — Contact</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - SCROLLABLE SECTIONS */}
                    <div className="w-full lg:w-1/2 z-10 relative bg-[#1a1a1a]">

                        {/* 02. HELLO AND WELCOME */}
                        <HomeSection index={20} className="bg-[#F1EBDD] text-[#5A2A45] p-6 lg:p-16 min-h-screen border-t border-white/10">
                            <div className="flex justify-between items-end mb-12 border-b border-black/10 pb-6">
                                <h2 className="font-display text-4xl lg:text-5xl uppercase">Hello and <br /> Welcome</h2>
                                <span className="text-4xl font-display opacity-30">0.1</span>
                            </div>

                            <div className="flex flex-col gap-10">
                                <div className="aspect-[4/5] bg-white/5 p-4 relative grayscale hover:grayscale-0 transition-all duration-700 w-full md:w-2/3 mx-auto">
                                    <div className="absolute top-4 left-4 border border-black/30 text-[10px] px-2 py-1 uppercase tracking-widest">Introduction</div>
                                    <LazyImage src={familyImg} alt="Welcome" className="w-full h-full object-cover opacity-80" />
                                </div>

                                <div className="space-y-6 text-center md:text-left">
                                    <div className="space-y-2">
                                        <span className="text-xs uppercase tracking-[0.3em] text-[#B77A8C]">The Essence</span>
                                        <p className="text-xl lg:text-2xl font-light leading-relaxed text-[#6E5A52]">
                                            "We preserve the <span className="italic font-serif text-[#E8CBB6]">feeling</span> of a moment that will never happen exactly the same way again."
                                        </p>
                                    </div>
                                    <Link to="/about">
                                        <button className="mt-4 px-6 py-2 border border-black/30 hover:bg-[#5A2A45] hover:text-[#FAF9F6] transition-all duration-300 text-[10px] uppercase tracking-widest cursor-pointer">
                                            More About Us
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </HomeSection>


                        {/* 03. ABOUT ME / ARTIST */}
                        <HomeSection index={30} className="bg-[#C9D0C3] text-[#1a1a1a] p-6 lg:p-16 min-h-screen">
                            <div className="flex justify-between items-end mb-12 border-b border-black/10 pb-6">
                                <h2 className="font-display text-4xl lg:text-5xl uppercase text-[#1a1a1a]">The Artist</h2>
                                <span className="text-4xl font-display opacity-30">0.2</span>
                            </div>

                            <div className="flex flex-col gap-8 h-full">
                                <div className="h-[40vh] w-full overflow-hidden relative">
                                    <LazyImage src={aboutImg} alt="Anamika" className="w-full h-full object-cover grayscale contrast-125" />
                                    <div className="absolute bottom-0 left-0 bg-[#5A2A45] text-[#FAF9F6] px-4 py-2 text-[10px] uppercase tracking-widest">
                                        Pune, MH
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest mb-1 opacity-50">Lead Photographer</h4>
                                        <p className="font-display text-2xl">Anamika</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        A photographer with a deep passion for capturing the authentic essence of life's journey.
                                    </p>
                                    <Link to="/about" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                        <span>Read Full Bio</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        </HomeSection>


                        {/* 04. PHILOSOPHY / SERVICES */}
                        <HomeSection index={40} className="bg-[#E6D1CB] text-[#5A2A45] p-6 lg:p-16 min-h-screen">
                            <div className="flex justify-between items-end mb-12 border-b border-[#5A2A45]/20 pb-6">
                                <h2 className="font-display text-4xl lg:text-5xl uppercase">Our <br /> Philosophy</h2>
                                <span className="text-4xl font-display opacity-30">0.3</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="font-display text-3xl italic">"We preserve feelings."</h3>
                                    <p className="text-[#6E5A52] leading-relaxed font-light">
                                        We believe that every photograph should evoke emotion. It’s not just about how it looks, but how it feels when you look back at it years from now.
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4 border-b border-[#5A2A45]/10 pb-2">
                                            <span className="text-[#B77A8C]">01</span>
                                            <span className="uppercase tracking-widest text-xs">Maternity Sessions</span>
                                        </li>
                                        <li className="flex items-center gap-4 border-b border-[#5A2A45]/10 pb-2">
                                            <span className="text-[#B77A8C]">02</span>
                                            <span className="uppercase tracking-widest text-xs">Newborn Art</span>
                                        </li>
                                        <li className="flex items-center gap-4 border-b border-[#5A2A45]/10 pb-2">
                                            <span className="text-[#B77A8C]">03</span>
                                            <span className="uppercase tracking-widest text-xs">Family Tales</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </HomeSection>


                        {/* 05. CONTACT / FOOTER CARD */}
                        <HomeSection index={50} className="bg-[#1a0f16] text-[#FAF9F6] p-6 lg:p-16 relative overflow-hidden min-h-screen flex flex-col justify-between">
                            {/* Premium Background Effects */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                            <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#5A2A45] rounded-full blur-[180px] opacity-20 pointer-events-none animate-pulse"></div>
                            <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#B77A8C] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

                            {/* Main CTA Content (Centered) */}
                            <div className="flex-grow flex flex-col justify-center items-center text-center relative z-10 w-full mt-10 md:mt-0">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-8"
                                >
                                    <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-outfit uppercase tracking-widest text-[#E8CBB6]">
                                        Start Your Journey
                                    </span>

                                    <h2 className="font-display text-[13vw] lg:text-[9rem] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-[#FAF9F6] to-[#B77A8C] drop-shadow-2xl">
                                        Let's<br /> <span className="italic font-light">Create</span>
                                    </h2>

                                    <p className="max-w-md mx-auto text-base md:text-xl text-white/60 leading-relaxed font-outfit font-light tracking-wide">
                                        Capturing the poetry of your life,<br /> one frame at a time.
                                    </p>

                                    <Link to="/contact">
                                        <button className="group relative mt-8 px-14 py-6 bg-[#FAF9F6] text-[#5A2A45] overflow-hidden rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform duration-500 hover:scale-105">
                                            <span className="relative z-10 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                                                Book a Session <span className="text-lg leading-none">↗</span>
                                            </span>
                                            <div className="absolute inset-0 bg-[#B77A8C] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1)"></div>
                                        </button>
                                    </Link>
                                </motion.div>
                            </div>
                        </HomeSection>

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Home;
