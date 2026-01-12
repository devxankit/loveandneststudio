import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import { getPortfolioPage } from '../../services/api';

// Representative Fallback Images
import newbornImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import maternityImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import babyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import familyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

const PortfolioContent = ({ data }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const { hero = {}, categories = [], experience = {} } = data || {};

    // Helper to ensure strips are long enough for the parallax journey
    // We repeat the images until we have a substantial number
    const buildStrip = (providedImages, fallbackImages) => {
        const base = (providedImages && providedImages.length > 0) ? providedImages : fallbackImages;
        // Repeat the set to ensure we have at least 12 items for a long scroll
        let result = [...base];
        while (result.length < 12 && base.length > 0) {
            result = [...result, ...base];
        }
        return result;
    };

    const strip1 = buildStrip(hero.strip1, [newbornImg, babyImg, familyImg, newbornImg, babyImg, familyImg]);
    const strip2 = buildStrip(hero.strip2, [maternityImg, newbornImg, maternityImg, newbornImg]);
    const strip3 = buildStrip(hero.strip3, [familyImg, babyImg, familyImg, babyImg]);

    // Parallax ranges - slightly adjusted for cinematic feel
    const column1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const column2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const column3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    // Helper for auto-scrolling marquee effect
    const MarqueeStrip = ({ images, speed, reverse, yProgress, parallaxOffset }) => {
        const parallaxY = useTransform(yProgress, [0, 1], [0, parallaxOffset]);
        const continuousImages = [...images, ...images]; // Double for seamless loop

        return (
            <motion.div style={{ y: parallaxY }} className="w-1/3 md:w-1/4 flex flex-col gap-4">
                <motion.div
                    animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col gap-4"
                >
                    {continuousImages.map((img, i) => (
                        <div key={i} className="w-full aspect-[3/5] rounded-sm overflow-hidden grayscale contrast-125">
                            <LazyImage src={img} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        );
    };

    return (
        <>
            <SEO
                title={`${hero.titleLine1 || 'Portfolio'} | Love & Nest Studio`}
                description="Explore our curated collections of newborn, maternity, baby, and family photography."
            />

            {/* Cinema Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* 1. Vertical Archive Hero */}
            <section ref={containerRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">

                {/* Auto-scrolling Parallax Canvas */}
                <div className="absolute inset-0 flex justify-center gap-1 md:gap-4 px-2 md:px-0 opacity-60">
                    <MarqueeStrip images={strip1} speed={60} reverse={false} yProgress={scrollYProgress} parallaxOffset={-400} />
                    <MarqueeStrip images={strip2} speed={45} reverse={true} yProgress={scrollYProgress} parallaxOffset={200} />
                    <MarqueeStrip images={strip3} speed={70} reverse={false} yProgress={scrollYProgress} parallaxOffset={-600} />
                </div>

                {/* Typography */}
                <div className="relative z-10 w-full text-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="font-display text-[12vw] md:text-[15vw] leading-[0.85] text-white mix-blend-difference tracking-tighter uppercase select-none flex flex-col items-center">
                            <motion.span
                                initial={{ x: "-100vw", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            >
                                {hero.titleLine1 || 'Port'}
                            </motion.span>
                            <motion.span
                                initial={{ x: "100vw", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="md:ml-[10vw]"
                            >
                                {hero.titleLine2 || 'folio'}
                            </motion.span>
                        </h1>

                        <div className="mt-8 flex justify-center items-center gap-12 overflow-hidden">
                            <motion.span
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.8 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="font-outfit text-white text-[10px] md:text-sm tracking-[0.5em] uppercase"
                            >
                                {hero.subtext1 || '/ Est. 2012 /'}
                            </motion.span>
                            <motion.span
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.8 }}
                                transition={{ duration: 1, delay: 1.2 }}
                                className="font-outfit text-white text-[10px] md:text-sm tracking-[0.5em] uppercase"
                            >
                                {hero.subtext2 || '/ Dehradun /'}
                            </motion.span>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Prompt */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-3">
                        <span className="font-outfit text-white/40 text-[9px] uppercase tracking-[0.3em]">Vertical Archive</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* 2. CATEGORIES GRID */}
            <section className="py-20 px-4 sm:px-8 md:px-12 max-w-[1700px] mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap justify-center gap-6 sm:gap-10"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            className="group relative w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.875rem)] h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden rounded-[3rem] shadow-2xl bg-white"
                        >
                            <Link to={category.link} className="block w-full h-full">
                                <div className="absolute inset-0 z-0">
                                    <LazyImage
                                        src={category.image || (category.id === 'newborn' ? newbornImg : category.id === 'maternity' ? maternityImg : category.id === 'baby' ? babyImg : familyImg)}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 opacity-80" />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-10 z-10">
                                    <div className="space-y-3">
                                        <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-bold block">
                                            {category.subtitle}
                                        </span>
                                        <h3 className="font-display text-4xl sm:text-5xl text-white mb-2 tracking-tight">
                                            {category.title}
                                        </h3>
                                        <div className={`w-10 h-0.5 ${category.accent || 'bg-[#E8CBB6]'} transform origin-left transition-all duration-700 group-hover:w-20`} />
                                        <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 3. EXPERIENCE CTA */}
            <section className="py-40 px-6 text-center relative z-10 bg-[#FCFBF8]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex justify-center gap-3 mb-8 opacity-40">
                        <div className="w-1 h-1 rounded-full bg-[#5A2A45]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#5A2A45]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#5A2A45]"></div>
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-[#5A2A45] mb-12 leading-[1.1] tracking-tight">
                        {experience.titleLine1 || 'Every moment'} <br />
                        <span className="italic font-light text-[#B77A8C]">{experience.titleLine2 || 'is a masterpiece.'}</span>
                    </h2>

                </motion.div>
            </section>
        </>
    );
};

const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await getPortfolioPage();
                // Handle optional success/data wrapper
                setData(res.data.data || res.data);
            } catch (error) {
                console.error("Failed to fetch portfolio content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#5A2A45] font-display text-2xl">
            Loading Studio Archives...
        </div>
    );

    return (
        <div className="bg-[#FAF9F6] min-h-screen overflow-hidden">
            <PortfolioContent data={data} />
        </div>
    );
};

export default Portfolio;
