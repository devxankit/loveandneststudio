import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import { getToddlerPage } from '../../services/api';
import { Phone, Mail, ArrowRight, Heart } from 'lucide-react';

const ToddlerFallbackImages = [
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t1.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t2.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t3.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t4.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t5.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t6.jpg"
];

const Toddler = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await getToddlerPage();
                setPageData(data);
            } catch (error) {
                console.error("Failed to load toddler page content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="h-screen bg-[#F9F7F2] flex items-center justify-center text-[#5A2A45] font-display text-2xl">Loading Studio...</div>;

    const { hero, gallery, themeColor = '#5A2A45' } = pageData || {};

    return (
        <div className="bg-[#FAF9F6] min-h-screen overflow-x-hidden">
            <SEO
                title={`${hero?.title || 'Toddler Photography'} | Love & Nest Studio`}
                description="Capturing the pure joy and wonder of toddlerhood."
            />

            {/* Arched Hero Section */}
            <ToddlerHero hero={hero} themeColor={themeColor} />

            {/* Artistic Grid Section */}
            <ToddlerGrid images={gallery?.length > 0 ? gallery : ToddlerFallbackImages} themeColor={themeColor} />

            {/* CTA Section */}
            <section className="py-24 px-6 bg-[#F9F7F2] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <h2 className="font-display text-5xl md:text-7xl text-[#5A2A45]">Ready to capture <br /> <span className="italic font-light text-[#B77A8C]">their little steps?</span></h2>
                    <p className="font-outfit text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">Let's create timeless memories of these fleeting years together. Every milestone deserves to be celebrated.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#5A2A45] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-[#4a2238] transition-colors inline-flex items-center gap-3"
                    >
                        Book A Session <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

const ToddlerHero = ({ hero, themeColor }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax values for floating elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const heroImages = hero?.images?.length >= 2 ? hero.images : ToddlerFallbackImages;

    return (
        <section ref={containerRef} className="relative min-h-screen w-full flex items-center bg-[#FAF9F6] overflow-hidden py-12 md:py-24">

            {/* Background Narrative (Large faded text) */}
            <motion.div
                style={{ y: y3, opacity: 0.03 }}
                className="absolute top-10 md:top-20 left-4 md:left-10 select-none pointer-events-none z-0"
            >
                <h2 className="font-display text-[30vw] md:text-[25vw] leading-none text-[#5A2A45] font-bold">LITTLE</h2>
            </motion.div>

            <div className="w-full max-w-[1700px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-12 lg:px-20 relative z-10 pt-16 lg:pt-0">

                {/* Left Side: Editorial Typography */}
                <div className="space-y-8 md:space-y-12 text-center lg:text-left order-2 lg:order-1">
                    <div className="space-y-4 md:space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="font-outfit text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#B77A8C] mb-2 md:mb-4 block">
                                Collection No. 04 / Toddlerhood
                            </span>
                            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#5A2A45] leading-[0.85] tracking-tighter">
                                {hero?.title || 'Pure'} <br />
                                <span className="italic font-light text-[#B77A8C]">Wonder</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-[#5A2A45] mx-auto lg:ml-0"
                        />

                        <p className="font-outfit text-[#6E5A52]/70 text-base md:text-lg lg:text-xl max-w-md lg:max-w-md mx-auto lg:mx-0 leading-relaxed pt-2 md:pt-4">
                            {hero?.tagline || 'Capturing the raw essence of growing up, one tiny discovery at a time.'}
                        </p>
                    </div>

                    {/* Contact Pills */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                        <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-white border border-[#5A2A45]/5 shadow-sm flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-outfit text-xs md:text-sm font-medium text-[#5A2A45]">{hero?.phoneNumber || '+91 9876543210'}</span>
                        </div>
                        <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#5A2A45] text-white shadow-lg flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform">
                            <Mail size={14} />
                            <span className="font-outfit text-xs md:text-sm font-bold uppercase tracking-widest">Connect</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Organic Floating Gallery */}
                <div className="relative h-[450px] sm:h-[600px] md:h-[800px] flex items-center justify-center order-1 lg:order-2">

                    {/* Main Arched Frame */}
                    <motion.div
                        style={{ y: y1, scale }}
                        className="relative w-[240px] sm:w-[320px] md:w-[450px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl z-20 border-[6px] md:border-[8px] border-white"
                    >
                        <LazyImage
                            src={heroImages[0]}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5A2A45]/20 to-transparent" />
                    </motion.div>

                    {/* Floating Moments (The "acha ui" parts) */}
                    <motion.div
                        style={{ y: y2, x: -80, rotate: -5 }}
                        className="absolute bottom-4 sm:bottom-10 left-[10%] sm:left-[5%] lg:left-0 w-24 sm:w-36 md:w-48 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-30 border-2 sm:border-4 border-white backdrop-blur-md hidden sm:block"
                    >
                        <LazyImage src={heroImages[1]} className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-700" />
                    </motion.div>

                    {/* Glassmorphic Decor Element */}
                    <motion.div
                        style={{ y: y3, rotate }}
                        className="absolute top-10 lg:top-0 -left-6 sm:-left-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 -z-10 flex items-center justify-center"
                    >
                        <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full border border-dashed border-[#5A2A45]/20" />
                    </motion.div>

                    {/* Floating Signature Tag */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -bottom-2 md:-bottom-5 right-10 sm:right-16 md:right-20 bg-[#E8CBB6] text-[#5A2A45] p-3 md:p-6 rounded-full shadow-2xl z-40 rotate-12 scale-75 md:scale-100"
                    >
                        <Heart size={20} className="md:w-6 md:h-6" fill="currentColor" />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Side Arch */}
            <div className="absolute bottom-0 right-0 w-[40%] h-[70%] bg-white rounded-tl-[150px] md:rounded-tl-[300px] -z-20 shadow-[-50px_0_100px_rgba(0,0,0,0.02)]" />
        </section>
    );
};

const ToddlerGrid = ({ images, themeColor }) => {
    return (
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-16 gap-6 md:gap-8 text-center lg:text-left">
                <div className="space-y-3 md:space-y-4">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-[#5A2A45]">The Little <span className="italic font-light">Moments</span></h2>
                    <div className="h-1 w-20 md:w-24 bg-[#B77A8C] mx-auto lg:ml-0" style={{ backgroundColor: themeColor }} />
                </div>
                <p className="font-outfit text-sm md:text-base text-gray-500 max-w-md mx-auto lg:mx-0 lg:text-right leading-relaxed">
                    Explore a curated collection of toddlers in their natural element—joyful, curious, and full of life.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 rounded-3xl md:rounded-[2.5rem] overflow-hidden">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`relative aspect-[4/5] overflow-hidden group rounded-2xl md:rounded-3xl ${i % 2 === 1 ? 'lg:grayscale lg:contrast-125' : ''} hover:grayscale-0 transition-all duration-700`}
                    >
                        <LazyImage
                            src={img}
                            alt={`Toddler ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 lg:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-md">
                                <ArrowRight size={18} className="md:w-5 md:h-5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Toddler;
