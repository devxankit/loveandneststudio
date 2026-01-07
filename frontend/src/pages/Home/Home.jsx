import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import WhatsAppIntroPopup from '../../components/popups/WhatsAppIntroPopup';

// Global Styles for Premium Feel
const GrainOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] animate-grain"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
    </div>
);

const SpecimenTag = ({ text, className = "" }) => (
    <div className={`absolute z-30 font-outfit text-[8px] uppercase tracking-[0.4em] bg-white/80 backdrop-blur-md px-3 py-1.5 border border-black/5 rounded-full shadow-sm text-black/40 ${className}`}>
        {text}
    </div>
);

// Images (Hero)
import hero1 from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import hero2 from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';
import hero3 from '../../assets/images/hero/Screenshot 2025-12-30 141711.png';
import hero4 from '../../assets/images/hero/Screenshot 2025-12-30 141721.png';
import hero5 from '../../assets/images/hero/Screenshot 2025-12-30 141756.png';
import hero6 from '../../assets/images/hero/Screenshot 2025-12-30 141833.png';
import hero7 from '../../assets/images/hero/Screenshot 2025-12-30 141842.png';

const HorizontalCollage = ({ images = [] }) => {
    // If no images passed (default handling upstream but safety check here)
    if (!images || images.length === 0) return null;

    const row1 = [...images, ...images, images[0], images[1]];
    // Ensure we have enough length for row2 even if input is small
    const row2 = [...images, ...images, ...images];

    return (
        <section className="relative pt-24 pb-48 bg-[#F1EBDD] overflow-hidden flex flex-col gap-6">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-10 left-10 z-0 select-none">
                <span className="font-display text-[18vw] leading-none opacity-[0.05] text-[#5A2A45] pointer-events-none font-bold italic uppercase tracking-tighter">Editorial</span>
            </div>
            <div className="flex gap-4 overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1500] }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="flex gap-2 md:gap-4 shrink-0"
                >
                    {row1.map((img, i) => (
                        <div key={i} className="group relative w-[180px] md:w-[260px] h-[120px] md:h-[160px] bg-white p-1 md:p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-700">
                            <LazyImage src={img} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex gap-4 md:gap-8 overflow-hidden">
                <motion.div
                    animate={{ x: [-1500, 0] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="flex gap-4 md:gap-8 shrink-0 items-center"
                >
                    {row2.map((img, i) => (
                        <div key={i} className="flex items-center gap-4 md:gap-8">
                            <div className="w-[280px] md:w-[380px] h-[180px] md:h-[240px] bg-white p-1.5 md:p-2.5 shadow-[0_15px_45px_rgba(90,42,69,0.08)]">
                                <LazyImage src={img} className="w-full h-full object-cover" />
                            </div>
                            {i % 3 === 0 && (
                                <span className="font-display text-3xl md:text-5xl text-[#5A2A45]/5 italic select-none">Visual Poetry</span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex justify-center z-30 pointer-events-none px-6">
                <Link to="/portfolio" className="pointer-events-auto group">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 md:px-12 md:py-5 bg-[#5A2A45] text-[#F1EBDD] rounded-full shadow-[0_25px_60px_-15px_rgba(90,42,69,0.4)] flex items-center gap-3 md:gap-8 border border-white/5 overflow-hidden relative max-w-full"
                    >
                        <span className="font-outfit text-[9px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] relative z-10 transition-colors group-hover:text-white whitespace-nowrap">Open The Archive</span>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-700 group-hover:bg-[#B77A8C] relative z-10 shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 md:w-4 md:h-4 text-white group-hover:rotate-45 transition-transform duration-500" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l10-10M7 7h10v10" /></svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
};

// Other Section Images
import aboutImg from '../../assets/images/about/01-1.jpg';
import familyImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';

const HomeSection = ({ children, className = "", index = 0, style = {}, isSticky = true, fullHeight = true }) => {
    return (
        <motion.div
            className={`${isSticky ? 'sticky top-0' : 'relative'} ${fullHeight ? 'min-h-[100dvh]' : ''} w-full flex flex-col justify-center overflow-hidden border-none ${className}`}
            style={{ zIndex: index, ...style }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                initial={{ scale: 1.05, filter: "blur(10px)" }}
                whileInView={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full flex items-center justify-center will-change-transform transform-gpu"
            >
                {children}
            </motion.div>
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
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 2.5,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
                    <LazyImage src={images[currentIndex]} alt="Hero Slide" className="w-full h-full object-cover will-change-transform" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-10 right-10 z-20 flex gap-2">
                {images.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`} />
                ))}
            </div>
        </div>
    );
};

import { getHomePage } from '../../services/api';

const Home = () => {
    const scrollRef = useRef(null);
    const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Frame motion hooks must be at top level
    const { scrollYProgress } = useScroll();

    const introRef = useRef(null);
    const artistRef = useRef(null);
    const philosophyRef = useRef(null);
    const contactRef = useRef(null);
    const [activeSection, setActiveSection] = useState("01");
    const [expandedGalleryIndex, setExpandedGalleryIndex] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await getHomePage();
                setPageData(res.data.data || res.data);
            } catch (error) {
                console.error("Failed to load home content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    // Other hooks
    React.useEffect(() => {
        let animationFrameId;
        const speed = 0.8;
        const autoScroll = () => {
            if (isAutoScrolling) {
                window.scrollBy(0, speed);
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
                    setIsAutoScrolling(false);
                } else {
                    animationFrameId = requestAnimationFrame(autoScroll);
                }
            }
        };

        if (isAutoScrolling) {
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isAutoScrolling]);

    // Conditional return MUST be after all hook calls
    if (loading) return null;

    // Mapping new dynamic data
    const hero = pageData?.hero || { slides: [] };
    const expertise = pageData?.expertise || {};
    const checklist = pageData?.checklist || { items: [] };
    const gallery = pageData?.gallery || { images: [] };
    const split = pageData?.splitScreen || {
        intro: {},
        artist: {},
        philosophy: {},
        contact: {}
    };
    const collage = pageData?.collage || { images: [] };

    // Fallbacks
    const heroSlides = hero.slides?.length > 0 ? hero.slides : [hero1, hero2, hero3, hero4];
    const expertiseImg1 = expertise.image1 || aboutImg;
    const expertiseImg2 = expertise.image2 || hero3;
    const checklistImg = checklist.image || hero6;
    const galleryImages = gallery.images?.length > 0 ? gallery.images : [hero1, hero2, hero3, hero4, hero5, hero6, hero1, hero2];
    const collageImages = collage.images?.length > 0 ? collage.images : [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

    const scrollToRef = (ref, id) => {
        setIsAutoScrolling(false);
        setActiveSection(id);
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const stopScroll = () => setIsAutoScrolling(false);

    return (
        <div onMouseEnter={stopScroll} onTouchStart={stopScroll} onWheel={stopScroll} onClick={stopScroll}>
            <GrainOverlay />
            <SEO title="Love & Nest Studio | Timeless Photography" description="Capturing the beautiful in-between moments of motherhood, newborn, and family life." keywords="photography, maternity, newborn, family, pune, studio" />
            <WhatsAppIntroPopup />

            <div className="bg-[#F1EBDD] min-h-screen font-outfit text-[#6E5A52]">

                {/* 01. HERO SLIDER */}
                <HomeSection id="hero-section" index={10} fullHeight={true} className="h-screen bg-[#F1EBDD] text-white relative p-0 border-none" isSticky={false}>
                    <HeroImageSlider images={heroSlides} />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white pointer-events-none px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="relative">
                            <div className="overflow-hidden py-2 md:py-4 px-2 md:px-10">
                                <motion.h1 initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} className="font-display text-[18vw] md:text-[15vw] lg:text-[11rem] leading-[0.85] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                    {hero.heading || "Love &"}
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden py-2 -mt-2 md:-mt-6 lg:-mt-10">
                                <motion.h1 initial={{ y: "-110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.1 }} className="font-display text-[18vw] md:text-[15vw] lg:text-[11rem] leading-[0.85] tracking-tighter italic font-light opacity-90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                    {hero.subheading || "Nest"}
                                </motion.h1>
                            </div>
                            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }} className="h-[1px] md:h-[2px] bg-white/60 mx-auto my-6 md:my-12" />
                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.6, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="text-[8px] md:text-sm font-light tracking-[0.6em] md:tracking-[0.8em] uppercase">
                                {hero.overlay_text || "Maternity • Newborn • Kids"}
                            </motion.p>
                        </motion.div>
                        <div className="absolute top-[10%] right-[10%] opacity-20 hidden md:block">
                            <span className="text-[10px] tracking-[0.5em] font-light">Dehradun, India</span>
                        </div>
                    </div>
                </HomeSection>

                {/* 02a. THE EXPERTISE SECTION */}
                <section id="expertise-section" className="bg-[#5A2A45] text-[#F1EBDD] py-16 md:py-24 lg:py-40 border-none relative">
                    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="relative group/exp mx-auto w-full max-w-md lg:max-w-none">
                            <motion.div
                                initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', scale: 1.1, filter: 'blur(10px)' }}
                                whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                                className="w-full aspect-[4/5] overflow-hidden shadow-2xl relative z-10"
                            >
                                <SpecimenTag text="Artist Choice // 01" className="top-4 left-4 md:top-8 md:left-8" />
                                <LazyImage src={expertiseImg1} className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover/exp:brightness-100 group-hover/exp:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#5A2A45]/40 to-transparent pointer-events-none"></div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                                className="absolute -bottom-8 -right-4 md:-bottom-10 md:-left-10 w-2/3 aspect-square overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-20 border-[6px] md:border-[15px] border-[#5A2A45]"
                            >
                                <motion.div className="w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.8 }}>
                                    <LazyImage src={expertiseImg2} className="w-full h-full object-cover rounded-none" />
                                </motion.div>
                                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                            </motion.div>
                        </div>
                        <div className="space-y-6 md:space-y-10 lg:pl-12 text-center lg:text-left">
                            <div className="space-y-2 md:space-y-4">
                                <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="block text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-[#B77A8C]">{expertise.subheading || "Our Mission"}</motion.span>
                                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-4xl md:text-5xl lg:text-8xl text-white leading-[0.9]">
                                    {expertise.heading || "Creating A Legacy."}
                                </motion.h2>
                            </div>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-outfit text-[#E8CBB6] text-sm md:text-lg leading-relaxed max-w-md font-light opacity-80 border-l-[1px] border-white/20 pl-4 md:pl-8 mx-auto lg:mx-0">
                                {expertise.text || "We specialize in elevating your most precious memories into a visual narrative..."}
                            </motion.p>
                            <div className="pt-4 md:pt-6">
                                <Link id="inquire-now-button" to="/contact" className="px-8 md:px-12 py-4 md:py-5 border border-white/20 text-white text-[9px] md:text-[11px] uppercase font-bold tracking-[0.3em] hover:bg-[#F1EBDD] hover:text-[#5A2A45] transition-all rounded-sm relative group overflow-hidden inline-block">
                                    <span className="relative z-10">Inquire Now</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 02b. CHECKLIST SECTION */}
                <section id="experience-checklist-section" className="bg-[#B77A8C] text-white py-16 md:py-24 lg:py-40 border-none">
                    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        <div className="lg:col-span-7 space-y-8 md:space-y-12">
                            <h2 className="font-display text-4xl lg:text-6xl leading-tight">
                                {checklist.heading || "Your Experience with us includes"}
                            </h2>
                            <div className="space-y-4 md:space-y-8">
                                {checklist.items.map((item, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="flex items-center gap-4 md:gap-6 group">
                                        <div className="w-5 h-5 md:w-6 md:h-6 border border-[#5A2A45]/30 rounded-full flex items-center justify-center group-hover:border-[#5A2A45] transition-colors">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#5A2A45] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                                        </div>
                                        <p className="text-[10px] md:text-[11px] font-medium text-white opacity-70 uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:text-white transition-opacity">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="lg:col-span-5 h-[300px] md:h-[70vh] w-full overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 mt-8 lg:mt-0">
                            <LazyImage src={checklistImg} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </section>

                {/* 02c. MODERN GALLERY UI */}
                <section id="curated-gallery-section" className="bg-[#E6D1CB] py-20 px-4 md:py-32 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto text-center mb-10 md:mb-16 space-y-6 md:space-y-8 flex flex-col items-center">
                        <div className="space-y-2 md:space-y-4">
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#5A2A45]">{gallery.subheading || "The Digital Lens"}</span>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-8xl text-[#5A2A45] leading-none">{gallery.heading || "Curated Gallery"}</h2>
                        </div>
                        <Link to="/portfolio" className="group px-4 md:px-6">
                            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }} className="px-6 md:px-10 py-3 md:py-5 bg-white/95 backdrop-blur-2xl border border-[#5A2A45]/10 rounded-full text-[#5A2A45] shadow-[0_20px_40px_-10px_rgba(90,42,69,0.1)] flex items-center gap-4 md:gap-6 transition-all duration-500 cursor-pointer">
                                <span className="font-display text-lg md:text-xl lg:text-2xl tracking-wide">Explore Collection</span>
                                <span className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full bg-[#5A2A45] text-[#F1EBDD] flex items-center justify-center text-[5px] md:text-[7px] group-hover:rotate-[360deg] transition-transform duration-1000 italic font-bold shrink-0">NEST</span>
                            </motion.div>
                        </Link>
                    </div>
                    <div className="flex gap-4 overflow-hidden py-10 md:py-16 relative z-10 px-2 md:px-4">
                        <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="flex gap-2 md:gap-4 shrink-0">
                            {galleryImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => setExpandedGalleryIndex(expandedGalleryIndex === i ? null : i)}
                                    animate={{
                                        scale: expandedGalleryIndex === i ? 1.25 : 1,
                                        zIndex: expandedGalleryIndex === i ? 50 : 1
                                    }}
                                    whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative w-[140px] md:w-[220px] h-[200px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-xl group cursor-pointer bg-black/5"
                                >
                                    <div className="absolute inset-0 bg-[#5A2A45]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                                    <LazyImage src={img} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 05. THE SPLIT SCREEN EXPERIENCE */}
                <div className="flex flex-col lg:flex-row bg-[#F1EBDD] relative z-20">
                    <div className="flex w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky top-0 items-center justify-center p-10 lg:p-20 z-0 bg-[#F1EBDD] relative lg:border-r border-[#5A2A45]/5">
                        <div className="absolute top-0 left-0 w-full h-[5px] p-[1px]">
                            <motion.div className="h-full bg-[#5A2A45]/10" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
                            <motion.div className="absolute top-[1px] left-0 h-[3px] bg-[#B77A8C]" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
                        </div>
                        <div className="text-center space-y-12 lg:space-y-24 relative">
                            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] opacity-40 whitespace-nowrap">L+N // ARCHIVE 2025</div>
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="space-y-6">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.6em] text-[#B77A8C]/60">The Portfolio</span>
                                <h2 className="font-display text-[7vw] text-[#5A2A45] leading-[0.9] tracking-tighter">Curated<br /> <span className="italic font-light font-serif opacity-30">Moments</span></h2>
                            </motion.div>
                            <div className="relative py-10">
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-[#6E5A52]/10"></div>
                                <div className="space-y-12 relative z-10">
                                    {[{ id: "01", label: "Info", ref: introRef }, { id: "02", label: "Artist", ref: artistRef }, { id: "03", label: "Philosophy", ref: philosophyRef }, { id: "04", label: "Contact", ref: contactRef }].map((item, i) => (
                                        <motion.div key={i} onClick={() => scrollToRef(item.ref, item.id)} whileHover={{ x: 10 }} className="flex items-center justify-center gap-6 cursor-pointer group">
                                            <span className={`text-[9px] font-bold transition-opacity uppercase tracking-[0.3em] ${activeSection === item.id ? 'opacity-100 text-[#B77A8C]' : 'opacity-20'}`}>{item.id}</span>
                                            <div className={`h-[1px] transition-all duration-500 ${activeSection === item.id ? 'w-20 bg-[#B77A8C]' : 'w-12 bg-[#6E5A52]/10 group-hover:bg-[#B77A8C] group-hover:w-20'}`}></div>
                                            <span className={`text-[11px] font-bold uppercase tracking-[0.4em] transition-colors ${activeSection === item.id ? 'text-[#5A2A45]' : 'text-[#6E5A52] group-hover:text-[#5A2A45]'}`}>{item.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 z-10 relative bg-[#F9F7F2]">
                        <div ref={introRef} onMouseEnter={() => setActiveSection("01")}>
                            <HomeSection index={20} className="bg-[#F1EBDD] text-[#5A2A45] p-6 lg:p-24 min-h-[50vh] lg:min-h-screen border-none shadow-none" isSticky={true}>
                                <motion.div initial={{ opacity: 0, scale: 1.15, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.8, ease: [0.165, 0.84, 0.44, 1] }} className="w-full aspect-[4/5] relative group perspective-1000 mb-8 lg:mb-0">
                                    <div className="absolute -inset-2 md:-inset-4 border border-[#5A2A45]/5 z-0 transition-transform duration-1000 group-hover:scale-110"></div>
                                    <div className="relative z-10 w-full h-full overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                                        <LazyImage src={split.intro.image || hero1} alt="Excellence" className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:scale-110 group-hover:grayscale-0" />
                                    </div>
                                </motion.div>
                            </HomeSection>
                        </div>

                        <HomeSection index={21} className="bg-[#F1EBDD] text-[#5A2A45] p-6 lg:p-16 min-h-[70vh] lg:min-h-screen border-t border-black/5">
                            <div className="w-full h-full flex flex-col justify-center">
                                <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-black/10 pb-4 md:pb-6">
                                    <h2 className="font-display text-3xl md:text-5xl uppercase" dangerouslySetInnerHTML={{ __html: split.intro.heading || "Hello and <br /> Welcome" }} />
                                    <span className="text-2xl md:text-4xl font-display opacity-30">0.1</span>
                                </div>
                                <div className="flex flex-col gap-6 md:gap-10">
                                    <div className="aspect-[4/5] bg-white/5 p-2 md:p-4 relative grayscale hover:grayscale-0 transition-all duration-700 w-full md:w-2/3 mx-auto">
                                        <LazyImage src={split.intro.image || familyImg} alt="Welcome" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div className="space-y-4 md:space-y-6 text-center md:text-left">
                                        <p className="text-lg md:text-2xl font-light leading-relaxed text-[#6E5A52]">
                                            "{split.intro.text || "Love you can feel forever."}"
                                        </p>
                                        <Link to="/about">
                                            <button className="mt-4 px-6 py-2 border border-black/30 hover:bg-[#5A2A45] hover:text-[#FAF9F6] transition-all duration-300 text-[10px] uppercase tracking-widest cursor-pointer">
                                                More About Us
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </HomeSection>

                        <div ref={artistRef} onMouseEnter={() => setActiveSection("02")}>
                            <HomeSection index={30} className="bg-[#C9D0C3] text-[#1a1a1a] p-6 lg:p-16 min-h-[70vh] lg:min-h-screen">
                                <div className="w-full h-full flex flex-col justify-center">
                                    <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-black/10 pb-4 md:pb-6">
                                        <h2 className="font-display text-3xl md:text-5xl uppercase text-[#1a1a1a]">{split.artist.title || "The Artist"}</h2>
                                        <span className="text-2xl md:text-4xl font-display opacity-30">0.2</span>
                                    </div>
                                    <div className="flex flex-col gap-6 md:gap-8 h-full">
                                        <div className="h-[30vh] md:h-[40vh] w-full overflow-hidden relative">
                                            <LazyImage src={split.artist.portrait || aboutImg} alt="Anamika" className="w-full h-full object-cover grayscale contrast-125" />
                                            <div className="absolute bottom-0 left-0 bg-[#5A2A45] text-[#FAF9F6] px-4 py-2 text-[10px] uppercase tracking-widest">Dehradun, India</div>
                                        </div>
                                        <div className="space-y-4 md:space-y-6">
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-widest mb-1 opacity-50">{split.artist.role || "Lead Photographer"}</h4>
                                                <p className="font-display text-xl md:text-2xl">{split.artist.name || "Anamika"}</p>
                                            </div>
                                            <p className="text-sm leading-relaxed text-gray-600">{split.artist.bio || "A photographer with a passion..."}</p>
                                        </div>
                                    </div>
                                </div>
                            </HomeSection>
                        </div>

                        <div ref={philosophyRef} onMouseEnter={() => setActiveSection("03")}>
                            <HomeSection index={40} className="bg-[#E6D1CB] text-[#5A2A45] p-6 lg:p-16 min-h-[70vh] lg:min-h-screen">
                                <div className="w-full h-full flex flex-col justify-center">
                                    <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-[#5A2A45]/20 pb-4 md:pb-6">
                                        <h2 className="font-display text-3xl md:text-5xl uppercase">{split.philosophy.heading || "Our Philosophy"}</h2>
                                        <span className="text-2xl md:text-4xl font-display opacity-30">0.3</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                        <div className="space-y-4 md:space-y-6">
                                            <h3 className="font-display text-2xl md:text-3xl italic">"{split.philosophy.quote || "We preserve feelings."}"</h3>
                                            <p className="text-[#6E5A52] leading-relaxed font-light text-sm md:text-base">
                                                {split.philosophy.text || "We believe that every photograph should evoke emotion..."}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-end">
                                            <ul className="space-y-3 md:space-y-4">
                                                {(split.philosophy.points || ["Maternity", "Newborn", "Family"]).map((item, i) => (
                                                    <li key={i} className="flex items-center gap-4 border-b border-[#5A2A45]/10 pb-2">
                                                        <span className="text-[#B77A8C]">0{i + 1}</span>
                                                        <span className="uppercase tracking-widest text-xs">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </HomeSection>
                        </div>

                        <div ref={contactRef} onMouseEnter={() => setActiveSection("04")}>
                            <HomeSection index={50} className="bg-[#5A2A45] text-[#F1EBDD] p-6 lg:p-16 relative overflow-hidden min-h-[70vh] lg:min-h-screen flex flex-col justify-between">
                                <div className="flex-grow flex flex-col justify-center items-center text-center relative z-10 w-full">
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="space-y-6 md:space-y-8">
                                        <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs font-outfit uppercase tracking-widest text-[#E8CBB6]">
                                            {split.contact.subheading || "Start Your Journey"}
                                        </span>
                                        <h2 className="font-display text-[15vw] md:text-[9rem] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-[#F1EBDD] to-[#B77A8C] drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: split.contact.heading || "Let's <br /> Create" }} />
                                    </motion.div>
                                </div>
                            </HomeSection>
                        </div>
                    </div>
                </div>

                <HorizontalCollage images={collageImages} />
            </div>
        </div>
    );
};

export default Home;
