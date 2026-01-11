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

    const heroImages = hero?.images?.length >= 4 ? hero.images : ToddlerFallbackImages;

    return (
        <section ref={containerRef} className="relative min-h-screen w-full flex items-center bg-[#FAF9F6] overflow-hidden py-24">

            {/* Background Narrative (Large faded text) */}
            <motion.div
                style={{ y: y3, opacity: 0.03 }}
                className="absolute top-20 left-10 select-none pointer-events-none"
            >
                <h2 className="font-display text-[25vw] leading-none text-[#5A2A45] font-bold">LITTLE</h2>
            </motion.div>

            <div className="w-full max-w-[1700px] mx-auto grid lg:grid-cols-2 gap-16 items-center px-6 md:px-12 lg:px-20 relative z-10">

                {/* Left Side: Editorial Typography */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="font-outfit text-xs font-bold uppercase tracking-[0.5em] text-[#B77A8C] mb-4 block">
                                Collection No. 04 / Toddlerhood
                            </span>
                            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl text-[#5A2A45] leading-[0.85] tracking-tighter">
                                {hero?.title || 'Pure'} <br />
                                <span className="italic font-light text-[#B77A8C]">Wonder</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-[#5A2A45]"
                        />

                        <p className="font-outfit text-[#6E5A52]/70 text-lg md:text-xl max-w-md leading-relaxed pt-4">
                            {hero?.tagline || 'Capturing the raw essence of growing up, one tiny discovery at a time.'}
                        </p>
                    </div>

                    {/* Contact Pills */}
                    <div className="flex flex-wrap gap-4">
                        <div className="px-6 py-3 rounded-full bg-white border border-[#5A2A45]/5 shadow-sm flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-outfit text-sm font-medium text-[#5A2A45]">{hero?.phoneNumber || '+91 9876543210'}</span>
                        </div>
                        <div className="px-6 py-3 rounded-full bg-[#5A2A45] text-white shadow-lg flex items-center gap-3">
                            <Mail size={14} />
                            <span className="font-outfit text-sm font-bold uppercase tracking-widest">Connect</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Organic Floating Gallery */}
                <div className="relative h-[600px] md:h-[800px] flex items-center justify-center">

                    {/* Main Arched Frame */}
                    <motion.div
                        style={{ y: y1, scale }}
                        className="relative w-[300px] md:w-[450px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl z-20 border-[8px] border-white"
                    >
                        <LazyImage
                            src={heroImages[0]}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5A2A45]/20 to-transparent" />
                    </motion.div>

                    {/* Floating Moments (The "acha ui" parts) */}
                    <motion.div
                        style={{ y: y2, x: -150, rotate: -5 }}
                        className="absolute bottom-10 left-0 w-32 md:w-48 aspect-square rounded-3xl overflow-hidden shadow-xl z-30 border-4 border-white backdrop-blur-md"
                    >
                        <LazyImage src={heroImages[1]} className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-700" />
                    </motion.div>



                    {/* Glassmorphic Decor Element */}
                    <motion.div
                        style={{ y: y3, rotate }}
                        className="absolute top-0 -left-10 w-40 h-40 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 -z-10 flex items-center justify-center"
                    >
                        <div className="w-24 h-24 rounded-full border border-dashed border-[#5A2A45]/20" />
                    </motion.div>

                    {/* Floating Signature Tag */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -bottom-5 right-20 bg-[#E8CBB6] text-[#5A2A45] p-6 rounded-full shadow-2xl z-40 rotate-12"
                    >
                        <Heart size={24} fill="currentColor" />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Side Arch */}
            <div className="absolute bottom-0 right-0 w-[40%] h-[70%] bg-white rounded-tl-[300px] -z-20 shadow-[-50px_0_100px_rgba(0,0,0,0.02)]" />
        </section>
    );
};

const ToddlerGrid = ({ images, themeColor }) => {
    return (
        <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="space-y-4">
                    <h2 className="font-display text-5xl md:text-7xl text-[#5A2A45]">The Little <span className="italic font-light">Moments</span></h2>
                    <div className="h-1 w-24 bg-[#B77A8C]" style={{ backgroundColor: themeColor }} />
                </div>
                <p className="font-outfit text-gray-500 max-w-md text-right">
                    Explore a curated collection of toddlers in their natural element—joyful, curious, and full of life.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 md:gap-4 lg:gap-8 rounded-[2rem] overflow-hidden">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`relative aspect-[4/5] overflow-hidden group ${i % 2 === 1 ? 'grayscale contrast-125' : ''} hover:grayscale-0 transition-all duration-700`}
                    >
                        <LazyImage
                            src={img}
                            alt={`Toddler ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-md">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Toddler;
