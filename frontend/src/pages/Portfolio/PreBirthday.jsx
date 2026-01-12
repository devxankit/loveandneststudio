import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import { getPreBirthdayPage } from '../../services/api';
import { Phone, Mail, ArrowRight, Star, Cake, Sparkles, Heart } from 'lucide-react';

const PreBirthdayFallbackImages = [
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t1.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t2.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t3.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t4.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t5.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t6.jpg",
    "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t1.jpg"
];

const PreBirthday = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await getPreBirthdayPage();
                setPageData(data);
            } catch (error) {
                console.error("Failed to load pre-birthday page content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="h-screen bg-[#FFFBF0] flex items-center justify-center text-[#B77A8C] font-display text-2xl">Preparing Magic...</div>;

    const { hero, cakeGrid, gallery, themeColor = '#FDE2E4' } = pageData || {};

    return (
        <div className="bg-[#FFFCF9] min-h-screen overflow-x-hidden">
            <SEO
                title={`${hero?.title || 'Pre-Birthday'} | Love & Nest Studio`}
                description="Magical pre-birthday photography capturing the wonder of anticipation."
            />

            {/* Premium Animated Hero */}
            <PreBirthdayHero hero={hero} themeColor={themeColor} />

            {/* The "Cake Shape" Grid Section */}
            <CakeShapeGrid data={cakeGrid} themeColor={themeColor} />

            {/* Main Portfolio Grid */}
            <PortfolioGrid images={gallery?.length > 0 ? gallery : PreBirthdayFallbackImages} themeColor={themeColor} />

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FDE2E4] to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center space-y-10 relative z-10"
                >
                    <div className="flex justify-center gap-4 text-[#B77A8C] opacity-50">
                        <Star size={24} className="animate-spin-slow" />
                        <Sparkles size={32} className="animate-pulse" />
                        <Star size={24} className="animate-spin-slow" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#5A2A45] leading-tight">
                        {pageData?.cta?.title?.split('<br />').map((line, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <br />}
                                <span dangerouslySetInnerHTML={{ __html: line }} />
                            </React.Fragment>
                        )) || (
                                <>Let's Make Their <br /> <span className="italic font-light text-[#B77A8C]">First Wish</span> Come True</>
                            )}
                    </h2>
                    <p className="font-outfit text-gray-500 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">
                        {pageData?.cta?.description || "Every big milestone starts with a tiny moment of wonder. Let's capture the magic before the candles are lit."}
                    </p>
                    <motion.button
                        onClick={() => window.location.href = pageData?.cta?.buttonLink || '/contact'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#5A2A45] text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm shadow-2xl hover:shadow-[#FDE2E4]/20 transition-all inline-flex items-center gap-4"
                    >
                        {pageData?.cta?.buttonText || "Reserve Your Date"} <ArrowRight size={20} />
                    </motion.button>
                </motion.div>

                {/* Decorative background shapes */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FDE2E4] rounded-full blur-[100px] opacity-30" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#B77A8C] rounded-full blur-[100px] opacity-10" />
            </section>
        </div>
    );
};

const PreBirthdayHero = ({ hero, themeColor }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const heroImages = hero?.images || [];
    const mainImg = heroImages[0] || PreBirthdayFallbackImages[0];
    const bowImg = heroImages[1] || "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/bow.png";

    return (
        <section ref={containerRef} className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-white">

            {/* Animated Main Image Circle (Like Screenshot 1 with bow) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <motion.div
                    style={{ y, scale, opacity }}
                    className="relative w-[300px] sm:w-[500px] lg:w-[700px] aspect-square"
                >
                    {/* The Bow (Screenshot 1 Influence) */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 w-40 md:w-64 z-20 pointer-events-none"
                    >
                        <img src={bowImg} alt="" className="w-full drop-shadow-2xl"
                            onError={(e) => e.target.style.display = 'none'} />
                        {/* Fallback Bow Icon if image fails */}
                        <div className="w-full h-full flex items-center justify-center text-[#B77A8C]">
                            <Sparkles size={80} className="animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Circular Image Frame */}
                    <div className="w-full h-full rounded-full overflow-hidden border-[15px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                        <LazyImage
                            src={mainImg}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Glows */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDE2E4]/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
            </div>

            {/* Typography Overlay */}
            <div className="relative z-10 text-center space-y-8 max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="font-outfit text-xs md:text-sm font-bold uppercase tracking-[0.8em] text-[#B77A8C] mb-6 block drop-shadow-sm">
                        {hero?.tagline || 'A MAGICAL JOURNEY'}
                    </span>
                    <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#5A2A45] leading-[0.8] mb-8 tracking-tighter">
                        {hero?.title?.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <br />}
                                <span className={i === 1 ? "italic font-light text-[#B77A8C]" : ""}>{word}</span>
                            </React.Fragment>
                        )) || (
                                <>Pre <br /><span className="italic font-light text-[#B77A8C]">Birthday</span></>
                            )}
                    </h1>
                    <p className="font-outfit text-[#5A2A45]/60 text-lg md:text-xl font-medium tracking-widest uppercase">
                        {hero?.subtitle || 'CAPTURING THE ANTICIPATION'}
                    </p>
                </motion.div>

                {/* Floating Icons */}
                <div className="absolute -top-20 -left-20 animate-bounce duration-[3000ms]">
                    <Sparkles size={40} className="text-[#B77A8C] opacity-40" />
                </div>
                <div className="absolute top-40 -right-20 animate-pulse">
                    <Star size={30} className="text-[#B77A8C] opacity-30" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#B77A8C]/50"
            >
                <div className="h-20 w-[1px] bg-gradient-to-b from-[#B77A8C]/50 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Explore Magic</span>
            </motion.div>
        </section>
    );
};

const CakeShapeGrid = ({ data, themeColor }) => {
    const images = data?.images || [];
    const getImg = (i) => images[i] || PreBirthdayFallbackImages[i % PreBirthdayFallbackImages.length];

    return (
        <section className="py-24 px-6 bg-[#FFFCF9] relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <Cake size={40} className="mx-auto text-[#B77A8C] mb-4" />
                        <h2 className="font-display text-4xl md:text-6xl text-[#5A2A45]">{data?.title || 'The Sweetest Moments'}</h2>
                        <div className="h-1 w-20 bg-[#B77A8C] mx-auto mt-6" style={{ backgroundColor: themeColor }} />
                    </motion.div>
                </div>

                {/* THE CAKE SHAPE GRID (Screenshot 0 Architecture) */}
                <div className="relative flex flex-col items-center gap-4 max-w-4xl mx-auto">

                    {/* Level 1: The Candle (Shape of 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-20 md:w-32 aspect-[1/2] rounded-full overflow-hidden shadow-xl border-4 border-white z-40"
                    >
                        <LazyImage src={getImg(0)} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Level 2: Top Tier (2 Arched Segments) */}
                    <div className="grid grid-cols-2 gap-4 w-[60%] md:w-[50%]">
                        {[1, 2].map((idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx === 1 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`aspect-square sm:aspect-video rounded-[2rem] overflow-hidden shadow-lg border-2 border-white ${idx === 1 ? 'rounded-tl-[100px]' : 'rounded-tr-[100px]'}`}
                            >
                                <LazyImage src={getImg(idx)} className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Level 3: Middle Tier (2 Larger Segments) */}
                    <div className="grid grid-cols-2 gap-5 w-[85%] md:w-[75%]">
                        {[3, 4].map((idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx === 3 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`aspect-square sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ${idx === 3 ? 'rounded-tl-[50px] rounded-br-[150px]' : 'rounded-tr-[50px] rounded-bl-[150px]'}`}
                            >
                                <LazyImage src={getImg(idx)} className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Level 4: Bottom Base (2 Wider Segments) */}
                    <div className="grid grid-cols-2 gap-6 w-full">
                        {[5, 6].map((idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white ${idx === 5 ? 'rounded-bl-[150px] rounded-tr-[80px]' : 'rounded-br-[150px] rounded-tl-[80px]'}`}
                            >
                                <LazyImage src={getImg(idx)} className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer text for the grid (like screenshot 0) */}
                <p className="mt-12 text-center font-display text-sm md:text-base text-[#B77A8C]/60 italic tracking-widest">
                    Milestones // Anticipation // The First Wish
                </p>
            </div>
        </section>
    );
};

const PortfolioGrid = ({ images, themeColor }) => {
    return (
        <section className="py-24 px-6 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-lg"
                    >
                        <LazyImage
                            src={img}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white backdrop-blur-md">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PreBirthday;
