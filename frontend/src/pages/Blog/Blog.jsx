import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Images
import maternityHero from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import decoImg1 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import decoImg2 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225901.png';
import decoImg3 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230114.png';

const Blog = () => {
    // Ideally this will come from backend/admin context later
    const blogPosts = [
        {
            id: 1,
            title: 'When Is the Best Time to Plan Your Maternity Photoshoot?',
            excerpt: 'Discover why 28–32 weeks is the safest and most beautiful time for a relaxed, magazine-style maternity shoot experience.',
            date: 'Jan 2, 2026',
            category: 'Maternity Guide',
            image: maternityHero,
            link: '/best-time-for-maternity-shoot'
        }
        // Future posts will be added here
    ];


    const containerRef = useRef(null);
    const { scrollY } = useScroll(); // Use global scroll instead of target-based to avoid layout warnings

    const yMove = useTransform(scrollY, [0, 800], [0, 100]);
    const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

    // Staggered Text Animation
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Faster stagger
                delayChildren: 0.3
            }
        }
    };

    // Premium Blur Reveal Animation
    const letterVariants = {
        hidden: { y: 40, opacity: 0, filter: "blur(12px)", scale: 1.1 },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const floatingImageVariants = {
        animate: (i) => ({
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
            transition: {
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
            }
        })
    };

    return (
        <>
            <SEO
                title="Journal | Love & Nest Studio"
                description="Photography tips, parenting advice, and behind-the-scenes insights from Love & Nest Studio."
                keywords="photography blog, newborn tips, maternity advice, photo session tips"
            />

            <div className="bg-[#FAF9F6] min-h-screen">

                {/* 1. Impressive Moodboard Hero Section REVISED RESPONSIVE */}
                <section ref={containerRef} className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 min-h-[60vh] md:min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">

                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Floating Deco 1 (Top Left) - Proportional on Mobile */}
                        <motion.div
                            custom={1}
                            variants={floatingImageVariants}
                            animate="animate"
                            className="absolute top-[12%] left-[4%] md:top-[10%] md:left-[15%] w-[28vw] md:w-48 aspect-[3/4] p-1 md:p-2 bg-white shadow-xl rotate-[-6deg] z-0 opacity-80"
                        >
                            <div className="w-full h-full bg-gray-100 overflow-hidden">
                                <LazyImage src={decoImg1} alt="" className="w-full h-full object-cover grayscale opacity-80" />
                            </div>
                        </motion.div>

                        {/* Floating Deco 2 (Bottom Right) - Proportional on Mobile */}
                        <motion.div
                            custom={2}
                            variants={floatingImageVariants}
                            animate="animate"
                            className="absolute bottom-[15%] right-[4%] md:bottom-[20%] md:right-[15%] w-[35vw] md:w-56 aspect-[4/5] p-1 md:p-2 bg-white shadow-xl rotate-[6deg] z-0 opacity-80"
                        >
                            <div className="w-full h-full bg-gray-100 overflow-hidden">
                                <LazyImage src={decoImg2} alt="" className="w-full h-full object-cover grayscale opacity-80" />
                            </div>
                        </motion.div>

                        {/* Floating Deco 3 (Top Right - Blurred) - Proportional on Mobile */}
                        <motion.div
                            custom={3}
                            variants={floatingImageVariants}
                            animate="animate"
                            className="absolute top-[8%] right-[6%] md:top-[15%] md:right-[10%] w-[22vw] md:w-36 aspect-square p-1 md:p-2 bg-white shadow-lg rotate-[12deg] z-0 opacity-50 md:opacity-60 blur-[1px]"
                        >
                            <div className="w-full h-full bg-gray-100 overflow-hidden">
                                <LazyImage src={decoImg3} alt="" className="w-full h-full object-cover grayscale opacity-80" />
                            </div>
                        </motion.div>

                        {/* Soft Gradient Orbs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[#E8CBB6]/20 rounded-full blur-[80px] md:blur-[120px] -z-10 mix-blend-multiply"></div>
                    </div>

                    <motion.div style={{ y: yMove, opacity: opacityFade }} className="relative z-10 text-center w-full max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: "0.2em" }}
                            animate={{ opacity: 1, letterSpacing: "0.4em" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="block font-outfit text-[10px] md:text-sm text-[#B77A8C] font-semibold uppercase mb-4 md:mb-8"
                        >
                            Love & Nest Studio
                        </motion.span>

                        <motion.h1
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-display text-[15vw] md:text-[7rem] leading-[0.9] text-[#5A2A45] tracking-tight flex justify-center px-4 w-full"
                        >
                            {Array.from("JOURNAL").map((letter, i) => (
                                <motion.span key={i} variants={letterVariants} className="inline-block transform">
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-6 md:mt-12 max-w-lg mx-auto px-4"
                        >
                            <p className="font-outfit text-[#8F8A86] text-base md:text-xl font-light">
                                Stories of love, life, and the <span className="italic font-serif text-[#5A2A45]">beautiful in-between.</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator - Hidden on very short screens if necessary, but good for hinting scroll */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 60 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#E8CBB6] hidden md:block" // Hidden on mobile to avoid overlapping content
                    >
                        <motion.div
                            animate={{ y: [0, 60] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-[#5A2A45]"
                        ></motion.div>
                    </motion.div>
                </section>


                {/* 2. Compact Grid Section */}
                <section className="px-6 pb-20 md:pb-32 max-w-[1400px] mx-auto">
                    {/* Grid Layout - even for one item, this structure ensures future items fit perfectly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">

                        {blogPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link to={post.link} className="group block">
                                    {/* Card Container */}
                                    <div className="flex flex-col h-full">

                                        {/* Image Container - Compact Aspect Ratio */}
                                        <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gray-100 relative mb-6">
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-[#5A2A45]/0 group-hover:bg-[#5A2A45]/10 transition-colors duration-500 z-10"></div>

                                            {/* Tag */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#5A2A45] text-[10px] font-bold tracking-widest px-3 py-1 uppercase rounded-sm shadow-sm">
                                                    {post.category}
                                                </span>
                                            </div>

                                            <LazyImage
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-3 text-[10px] md:text-xs font-outfit uppercase tracking-widest text-[#B77A8C]">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-[#E8CBB6] rounded-full"></span>
                                                <span>4 min read</span>
                                            </div>

                                            <h3 className="font-display text-xl md:text-2xl text-[#5A2A45] leading-tight mb-3 group-hover:text-[#B77A8C] transition-colors duration-300 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="font-outfit text-[#8F8A86] text-sm leading-relaxed mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-[#E8CBB6]/20 flex items-center justify-between group/link">
                                                <span className="font-outfit text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#5A2A45] group-hover/link:text-[#B77A8C] transition-colors">
                                                    Read Story
                                                </span>
                                                <span className="transform group-hover/link:translate-x-1 transition-transform duration-300 text-[#5A2A45]">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                    </div>
                </section>
            </div>
        </>
    );
};

export default Blog;
