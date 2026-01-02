import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Import Representative Images for each category
import newbornImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';
import maternityImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import babyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import familyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

// Extra images for the archive strips to prevent black space
import m1 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225745.png';
import m2 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import m3 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225807.png';
import b1 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153305.png';
import b2 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153316.png';
import b3 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import f1 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111330.png';
import f2 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import f3 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120811.png';

const Portfolio = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax ranges adjusted to accommodate longer strips and prevent revealing bottom gaps
    const column1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
    const column2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const column3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    // Archive strips data
    const strip1 = [newbornImg, b1, babyImg, b2, familyImg, b3, newbornImg, newbornImg, b1, babyImg];
    const strip2 = [maternityImg, m1, m2, newbornImg, m3, babyImg, maternityImg, m1, m2, newbornImg];
    const strip3 = [familyImg, f1, f2, maternityImg, f3, babyImg, familyImg, familyImg, f1, f2];
    const categories = [
        {
            id: 'newborn',
            title: 'Newborn',
            subtitle: 'The First Breath',
            description: 'Pure, innocent moments that fly by so quickly.',
            image: newbornImg,
            link: '/portfolio/newborn',
            accent: 'bg-[#B77A8C]'
        },
        {
            id: 'maternity',
            title: 'Maternity',
            subtitle: 'The Radiance of Life',
            description: 'Celebrating the strength and beauty of your journey.',
            image: maternityImg,
            link: '/portfolio/maternity',
            accent: 'bg-[#E8CBB6]'
        },
        {
            id: 'baby',
            title: 'Baby',
            subtitle: 'Tiny Milestones',
            description: 'Capturing the wonder and growth of your little one.',
            image: babyImg,
            link: '/portfolio/baby',
            accent: 'bg-[#8F8A86]'
        },
        {
            id: 'family',
            title: 'Family',
            subtitle: 'Heart & Home',
            description: 'The connections that mean the absolute world.',
            image: familyImg,
            link: '/portfolio/family',
            accent: 'bg-[#5A2A45]'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1]
            }
        }
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen overflow-hidden">
            <SEO
                title="The Portfolio"
                description="Explore our curated collections of newborn, maternity, baby, and family photography."
            />

            {/* Cinema Grain & Dust Overlay (Authentic Texture) */}
            <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Vertical Modular Archive Hero */}
            <section ref={containerRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">

                {/* 1. The Parallax Multi-Strip Canvas */}
                <div className="absolute inset-0 flex justify-center gap-1 md:gap-4 px-2 md:px-0 opacity-60">

                    {/* Column 1: Newborn (Fast Scroller) */}
                    <motion.div
                        style={{ y: column1Y }}
                        className="w-1/3 md:w-1/4 h-[350vh] flex flex-col gap-4"
                    >
                        {strip1.map((img, i) => (
                            <div key={i} className="w-full aspect-[3/5] rounded-sm overflow-hidden grayscale contrast-125">
                                <LazyImage src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Column 2: Maternity (Center - Static/Slow) */}
                    <motion.div
                        style={{ y: column2Y }}
                        className="w-1/3 md:w-1/4 h-[350vh] flex flex-col gap-4 mt-[-50vh]"
                    >
                        {strip2.map((img, i) => (
                            <div key={i} className="w-full aspect-[3/5] rounded-sm overflow-hidden grayscale contrast-125">
                                <LazyImage src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Column 3: Baby/Family (Opposite Scroller) */}
                    <motion.div
                        style={{ y: column3Y }}
                        className="w-1/3 md:w-1/4 h-[350vh] flex flex-col gap-4 mt-[-100vh]"
                    >
                        {strip3.map((img, i) => (
                            <div key={i} className="w-full aspect-[3/5] rounded-sm overflow-hidden grayscale contrast-125">
                                <LazyImage src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* 2. Massive Editorial Typography (Mix Blend) */}
                <div className="relative z-10 w-full text-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <h1 className="font-display text-[12vw] md:text-[15vw] leading-[0.85] text-white mix-blend-difference tracking-tighter uppercase select-none flex flex-col items-center">
                            <motion.span
                                initial={{ x: "-100vw", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="block"
                            >
                                Port
                            </motion.span>
                            <motion.span
                                initial={{ x: "100vw", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="block md:ml-[10vw]"
                            >
                                folio
                            </motion.span>
                        </h1>

                        {/* Sub-text Reveal */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 hidden md:block"
                        />

                        <div className="mt-8 flex justify-center items-center gap-12 overflow-hidden">
                            <motion.span
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.8 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="font-outfit text-white text-[10px] md:text-sm tracking-[0.5em] uppercase"
                            >
                                / Est. 2012 /
                            </motion.span>
                            <motion.span
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.8 }}
                                transition={{ duration: 1, delay: 1.2 }}
                                className="font-outfit text-white text-[10px] md:text-sm tracking-[0.5em] uppercase"
                            >
                                / Dehradun /
                            </motion.span>
                        </div>
                    </motion.div>
                </div>

                {/* 3. Floating "Lens" Decorative Elements */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none opacity-20"
                >
                    <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full border border-white/10 blur-sm" />
                    <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full border border-white/5 blur-md" />
                </motion.div>

                {/* Scroll Prompt */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span className="font-outfit text-white/40 text-[9px] uppercase tracking-[0.3em]">Vertical Archive</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* 2. CATEGORIES GRID */}
            <section className="py-20 px-4 sm:px-8 md:px-12 max-w-[1600px] mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap justify-center gap-6 sm:gap-8"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-[2rem] shadow-xl bg-white"
                        >
                            <Link to={category.link} className="block w-full h-full">
                                {/* Image Background */}
                                <div className="absolute inset-0 z-0">
                                    <LazyImage
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                </div>

                                {/* Text Content */}
                                <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-2"
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-medium">
                                            {category.subtitle}
                                        </span>
                                        <h3 className="font-display text-3xl sm:text-4xl text-white mb-2">
                                            {category.title}
                                        </h3>
                                        <div className="w-8 h-0.5 bg-primary transform origin-left transition-all duration-500 group-hover:w-16" />
                                        <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 overflow-hidden line-clamp-2">
                                            {category.description}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Floating Action Icon */}
                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>

                                {/* Decorative Border Accent */}
                                <div className={`absolute inset-4 border border-white/20 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 3. EXPERIENCE CTA */}
            <section className="py-32 px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="font-display text-4xl md:text-6xl text-primary-dark mb-8 leading-tight">
                        Every moment <br />
                        <span className="italic text-primary font-light">is a masterpiece.</span>
                    </h2>
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-primary-dark text-white rounded-full font-display text-lg tracking-widest shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Book Your Story
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Portfolio;
