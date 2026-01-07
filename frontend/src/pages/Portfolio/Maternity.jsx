import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import LazyImage from '../../components/common/LazyImage';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { getMaternityPage } from '../../services/api';

// Fallback images
import img1 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import img2 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225745.png';
import img3 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import img4 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225801.png';
import img5 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225807.png';
import img6 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225812.png';
import img7 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225901.png';
import img8 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225916.png';
import img9 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225924.png';
import img10 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230059.png';
import img11 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230114.png';
import img12 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230124.png';

const Maternity = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await getMaternityPage();
                setPageData(data);
            } catch (error) {
                console.error("Failed to load maternity page content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="h-screen bg-[#FAF9F6] flex items-center justify-center text-[#5A2A45] font-display text-2xl">Loading...</div>;

    const { hero, editorial, silhouette, journey, poses, gallery, cta } = pageData || {};

    return (
        <>
            <SEO
                title={`${hero?.title || 'Maternity Photography'} | Love & Nest Studio`}
                description={editorial?.text?.substring(0, 160) || "Reflecting the beauty of motherhood."}
                keywords="maternity photoshoot, pregnancy photography, artistic maternity, studio maternity"
            />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#B77A8C] origin-left z-50"
                style={{ scaleX }}
            />

            <div className="bg-[#FAF9F6] min-h-screen overflow-hidden">

                {/* 1. Cinematic Hero Section */}
                <HeroSection data={hero} />

                {/* 2. Editorial Text Section */}
                <EditorialSection data={editorial} />

                {/* 3. Artistic Silhouette Feature (New) */}
                <ArtisticSilhouetteSection data={silhouette} />

                {/* 4. The Journey - Polaroid Style */}
                <JourneySection data={journey} />

                {/* 5. Studio Poses Grid (New) */}
                <PosesGridSection data={poses} />

                {/* 6. Masonry Gallery with Parallax */}
                <GallerySection items={gallery} />

                {/* 5. CTA Section */}
                <CTASection data={cta} />
            </div>
        </>
    );
};

// --- Sub-Components ---

const HeroSection = ({ data }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const title = data?.title || 'Motherhood';
    const subtitle = data?.subtitle || 'The beauty of';
    const image = data?.image || img1;

    return (
        <section ref={ref} className="relative min-h-[85vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-[#E8CBB6]/20">
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <LazyImage
                        src={image}
                        alt="Maternity Hero"
                        className="w-full h-full object-cover object-top opacity-95"
                    />
                </motion.div>
                {/* Soft gradient overlay for text protection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#E8CBB6]/60"></div>
            </motion.div>

            <motion.div
                style={{ y: textY }}
                className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center pt-20 md:pt-0"
            >
                <div className="overflow-hidden mb-2">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <span className="font-display italic text-3xl md:text-5xl text-[#8F8A86] block mb-2">{subtitle}</span>
                    </motion.div>
                </div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="font-display font-medium text-[clamp(4.5rem,14vw,11rem)] leading-[0.9] text-[#5A2A45] tracking-tight uppercase"
                    >
                        {title}
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-10 flex flex-col items-center gap-4"
                >
                    <div className="h-16 w-[1px] bg-[#5A2A45]/30"></div>
                    <p className="font-outfit text-sm md:text-base tracking-[0.4em] uppercase text-[#5A2A45]/80">
                        Love & Nest Studio
                    </p>
                </motion.div>
            </motion.div>

            {/* Floating Scroll Indicator */}
            <motion.div
                style={{ opacity: logoOpacity }}
                className="absolute bottom-10 right-10 hidden md:flex items-center gap-4 z-20"
            >
                <span className="font-outfit text-xs tracking-widest uppercase writing-vertical-lr text-[#8F8A86]">Scroll Down</span>
                <div className="w-[1px] h-20 bg-[#E8CBB6] relative overflow-hidden bg-opacity-50">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#5A2A45]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

const EditorialSection = ({ data }) => {
    const title = data?.title || 'A Moment <br /> <span class="italic text-[#B77A8C] font-light">Suspended</span> <br /> in Time.';
    const text = data?.text || 'Pregnancy is a powerful, fleeting journey. Our editorial-style sessions are designed to empower you, highlighting the strength and beauty of your changing form.';
    const image1 = data?.image1 || img3;
    const image2 = data?.image2 || img5;

    return (
        <section className="py-16 md:py-24 px-6 md:px-20 relative bg-[#B7C1B8]/30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="relative order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight text-[#5A2A45]" dangerouslySetInnerHTML={{ __html: title }} />
                        <p className="font-outfit text-lg text-[#8F8A86] leading-relaxed max-w-md">
                            {text}
                        </p>
                    </motion.div>
                </div>

                <div className="relative h-[400px] md:h-[600px] w-full flex justify-center items-center order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, rotate: -5 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="absolute w-[80%] md:w-[70%] h-[80%] z-10 shadow-2xl"
                    >
                        <LazyImage src={image1} alt="Editorial 1" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, rotate: 5 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute w-[80%] md:w-[70%] h-[80%] z-0 translate-x-8 md:translate-x-10 translate-y-8 md:translate-y-10 opacity-70 grayscale sepia-[.2]"
                    >
                        <LazyImage src={image2} alt="Editorial 2" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ArtisticSilhouetteSection = ({ data }) => {
    const title = data?.title || 'The Art of <br /> <span class="italic text-[#8F8A86] font-serif">Silhouette</span>';
    const text = data?.text || 'We specialize in creating dramatic, timeless black and white portraits that focus on form, shadow, and profound connection. A minimal approach where light paints the miracle of life.';
    const image = data?.image || img2;

    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
            {/* Background "Shadow" Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none overflow-hidden">
                <img src={image} alt="Shadow Background" className="h-[150%] w-auto max-w-none grayscale blur-sm" />
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
                {/* Image Composition */}
                <div className="md:w-1/2 relative flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-[85%] md:w-[80%] aspect-[3/4] relative z-10"
                    >
                        <div className="absolute -inset-4 border border-[#E8CBB6] rotate-6 z-0"></div>
                        <div className="w-full h-full overflow-hidden shadow-2xl z-10 relative bg-gray-100">
                            <LazyImage src={image} alt="Silhouette Art" className="w-full h-full object-cover grayscale brightness-110 contrast-125 hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    </motion.div>

                    {/* Decorative background circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#B77A8C]/10 rounded-full -z-10 blur-3xl opacity-60"></div>
                </div>

                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="font-display text-5xl md:text-7xl text-[#5A2A45] mb-8 leading-[0.9]" dangerouslySetInnerHTML={{ __html: title }} />
                        <div className="w-20 h-[1px] bg-[#B77A8C] mb-8 mx-auto md:mx-0"></div>
                        <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
                            {text}
                        </p>
                        <Link to="/contact">
                            <button className="group relative px-8 py-4 overflow-hidden rounded-full bg-white border border-[#5A2A45] text-[#5A2A45] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <span className="relative z-10 font-outfit tracking-widest text-sm uppercase group-hover:text-white transition-colors duration-300">View Gallery</span>
                                <div className="absolute inset-0 bg-[#5A2A45] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const JourneySection = ({ data }) => {
    const title = data?.title || 'The Journey';
    const subtitle = data?.subtitle || 'Growing with love';
    const images = data?.images?.length > 0 ? data.images : [img2, img4, img6, img8];
    // Duplicate items for seamless infinite scroll
    const marqueeItems = [...images, ...images, ...images];

    return (
        <section className="py-20 md:py-32 bg-[#FAF5F0] overflow-hidden relative border-t border-[#E8CBB6]/30">
            <div className="text-center mb-16 px-4">
                <h2 className="font-display text-4xl md:text-5xl mb-4 text-[#5A2A45]">{title}</h2>
                <p className="font-outfit text-[#B77A8C] uppercase tracking-widest">{subtitle}</p>
            </div>

            <div className="flex w-full overflow-hidden">
                <motion.div
                    animate={{ x: "-33.33%" }}
                    initial={{ x: "0%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    className="flex gap-6 md:gap-12 pl-6 md:pl-12 w-max"
                >
                    {marqueeItems.map((img, index) => (
                        <div
                            key={`journey - ${index} `}
                            className="relative group w-[250px] md:w-[400px] flex-shrink-0"
                        >
                            <div className="bg-white p-6 pb-20 shadow-lg rotate-1 group-hover:rotate-0 transition-transform duration-500 transform origin-top border border-[#E8CBB6]/40">
                                <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <LazyImage src={img} alt={`Journey ${index} `} className="w-full h-full object-cover" />
                                </div>
                                <div className="font-handwriting text-3xl text-center text-[#5A2A45] absolute bottom-6 left-0 right-0 font-display italic">
                                    Month {(index % (images.length || 1)) * 2 + 3}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const PosesGridSection = ({ data }) => {
    const title = data?.title || 'Studio Maternity Poses';
    const subtitle = data?.subtitle || "You'll Love";
    // Selection of 8 images for the grid
    const gridImages = data?.images?.length > 0 ? data.images : [img1, img3, img5, img7, img8, img9, img10, img12];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-2 md:px-4">
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                    {/* First 4 images */}
                    {gridImages.slice(0, 4).map((img, idx) => (
                        <motion.div
                            key={`grid - 1 - ${idx} `}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="aspect-[3/4] overflow-hidden bg-[#FAF9F6] shadow-sm hover:shadow-md transition-shadow rounded-sm"
                        >
                            <LazyImage src={img} alt="Pose" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    ))}

                    {/* Center Text Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="aspect-[3/4] flex flex-col items-center justify-center bg-[#E8CBB6]/10 p-1 md:p-10 text-center border border-[#E8CBB6]/40 shadow-sm"
                    >
                        <h4 className="font-display text-sm xs:text-base md:text-4xl tracking-wide text-[#5A2A45] uppercase leading-relaxed font-light">
                            {title.split(' ').map((w, i) => <React.Fragment key={i}>{w}<br /></React.Fragment>)}
                        </h4>
                        <div className="w-6 md:w-12 h-[1px] bg-[#B77A8C] my-2 md:my-6"></div>
                        <span className="font-outfit text-[0.5rem] xs:text-[0.6rem] md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase text-[#8F8A86]">
                            {subtitle}
                        </span>
                    </motion.div>

                    {/* Remaining 4 images */}
                    {gridImages.slice(4, 8).map((img, idx) => (
                        <motion.div
                            key={`grid - 2 - ${idx} `}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (idx + 4) * 0.1 }}
                            className="aspect-[3/4] overflow-hidden bg-[#FAF9F6] shadow-sm hover:shadow-md transition-shadow rounded-sm"
                        >
                            <LazyImage src={img} alt="Pose" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GallerySection = ({ items }) => {
    const galleryItems = items?.length > 0 ? items.map((src, i) => ({ id: i, src })) : [
        { id: 1, src: img1 }, { id: 2, src: img2 }, { id: 3, src: img3 }, { id: 4, src: img4 },
        { id: 5, src: img5 }, { id: 6, src: img6 }, { id: 7, src: img7 }, { id: 8, src: img8 }
    ];

    return (
        <section className="py-16 md:py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <SectionTitle title="Portfolio Gallery" subtitle="Curated Moments" />

                <div className="mt-10 md:mt-16 columns-2 md:columns-3 gap-4 space-y-4">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="break-inside-avoid mb-4">
                            <GalleryItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GalleryItem = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative group overflow-hidden cursor-pointer w-full"
        >
            <div className="w-full h-auto overflow-hidden">
                <LazyImage
                    src={item.src}
                    alt={`Maternity Portrait ${item.id} `}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#5A2A45]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    +
                </div>
            </div>
        </motion.div>
    );
};

const CTASection = ({ data }) => {
    const title = data?.title || 'Ready to capture your glow?';
    const text = data?.text || "Let's create timeless art that celebrates this beautiful chapter of your life. Book your session today.";

    return (
        <section className="py-20 md:py-32 px-6 bg-[#5A2A45] text-white text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#B77A8C]/30 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E8CBB6]/20 blur-[120px] rounded-full"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">{title}</h2>
                <p className="font-outfit text-[#E8CBB6] text-lg mb-12 max-w-xl mx-auto">
                    {text}
                </p>
                <Link to="/contact" className="inline-block">
                    <button className="group relative px-10 py-5 overflow-hidden rounded-full bg-white text-[#5A2A45] shadow-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(232,203,182,0.4)] hover:-translate-y-1">
                        <span className="relative z-10 font-outfit text-lg tracking-widest uppercase font-medium flex items-center gap-3">
                            Book Your Session
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>

                        {/* Cloud hover effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-gradient-to-r from-[#B77A8C]/30 via-[#E8CBB6]/30 to-[#B77A8C]/30 animate-[spin_4s_linear_infinite] rounded-full blur-xl"></div>
                        </div>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Maternity;
