import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import LazyImage from '../../components/common/LazyImage';
import { getTestimonials, getPage } from '../../services/api';

// Fallback images
import testImg1 from '../../assets/images/testimonials/Screenshot 2025-12-31 114249.png';
import testImg2 from '../../assets/images/testimonials/Screenshot 2025-12-31 114257.png';
import testImg3 from '../../assets/images/testimonials/Screenshot 2025-12-31 114307.png';
import testImg4 from '../../assets/images/testimonials/Screenshot 2025-12-31 114317.png';
import testImg5 from '../../assets/images/testimonials/Screenshot 2025-12-31 114335.png';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsRes, pageRes] = await Promise.all([
                    getTestimonials(),
                    getPage('testimonials')
                ]);
                setReviews(reviewsRes.data);
                setPageContent(pageRes.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    // Scroll progress for parallax effect
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Get section content safely
    const getSection = (id) => pageContent?.sections?.find(s => s.id === id)?.content || {};
    const heroSection = getSection('hero');
    const ctaSection = getSection('cta');

    // Data for Hero Grid
    let gridImages = [];

    // 1. Priority: Images explicitly uploaded via Admin Panel for Hero Section
    // We treat this as a sparse array where index matters.
    if (heroSection.images && heroSection.images.length > 0) {
        // Construct a fixed 20-item grid, respecting the specific index from admin
        // If an admin slot (0-14) is empty (null), fall back to a default image.
        // For slots 15-19, we just cycle or repeat.

        const fallbackSource = [testImg1, testImg2, testImg3, testImg4, testImg5];

        gridImages = Array(20).fill(null).map((_, i) => {
            // If we have an admin image at this index, use it
            if (i < heroSection.images.length && heroSection.images[i]) {
                return heroSection.images[i];
            }
            // Otherwise use a fallback
            return fallbackSource[i % fallbackSource.length];
        });
    } else {
        // 2. Fallback: Dynamic images from reviews + static assets
        const dynamicImages = reviews.filter(r => r.image).map(r => r.image);
        const fallbackImages = [testImg1, testImg2, testImg3, testImg4, testImg5];
        let baseImages = [...dynamicImages, ...fallbackImages];

        // Ensure we have enough images for the grid by repeating
        if (baseImages.length > 0) {
            const originalSource = [...baseImages];
            while (baseImages.length < 20) {
                baseImages = [...baseImages, ...originalSource];
            }
        } else {
            // Ultimate fallback if absolutely no images exist anywhere
            baseImages = [testImg1, testImg2, testImg3, testImg4, testImg5, testImg1, testImg2, testImg3, testImg4, testImg5, testImg1, testImg2, testImg3, testImg4, testImg5, testImg1, testImg2, testImg3, testImg4, testImg5];
        }
        gridImages = baseImages;
    }

    // Safety slice
    const heroImages = gridImages.slice(0, 20);

    // Star Rating Component
    const StarRating = ({ rating }) => (
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-[#B77A8C]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <>
            <SEO
                title={pageContent?.meta?.title || "Testimonials - Love & Nest Studio"}
                description={pageContent?.meta?.description || "Read reviews and testimonials from our happy clients."}
            />

            <div className="w-full bg-[#FAF9F6]">

                {/* Hero Section - Wall of Love Layout */}
                <section className="relative min-h-[500px] h-[65vh] flex flex-col justify-center items-center overflow-hidden bg-[#FFFCF8]">
                    {/* Vertical Dashed Lines Background */}
                    <div className="absolute inset-0 flex justify-between px-4 max-w-[1600px] mx-auto pointer-events-none opacity-[0.07]">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-[0.5px] h-full border-l border-dashed border-[#5A2A45]"></div>
                        ))}
                    </div>

                    {/* Hanging Images Grid - Dense & Miniature */}
                    <div className="absolute inset-0 z-10 w-full h-full px-4 pointer-events-none">
                        <div className="grid grid-cols-12 gap-2 md:gap-4 h-full max-w-[1600px] mx-auto content-center">

                            {/* --- Left Side Clusters --- */}
                            <div className="flex flex-col gap-3 md:gap-4 items-center pt-12 md:pt-8">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.1, type: "spring" }} className="w-full aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-500">
                                    <LazyImage src={heroImages[0]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.4, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-80 mt-2 md:mt-12">
                                    <LazyImage src={heroImages[1]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-3 md:gap-8 items-center pt-4 md:pt-24">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.2, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={heroImages[2]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.6, type: "spring" }} className="w-full aspect-[4/5] rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-90">
                                    <LazyImage src={heroImages[3]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="hidden md:flex flex-col gap-5 items-center pt-4">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.3, type: "spring" }} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm mt-8">
                                    <LazyImage src={heroImages[4]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.7, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm opacity-70">
                                    <LazyImage src={heroImages[5]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="hidden lg:flex flex-col gap-8 items-center pt-32">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.25, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={heroImages[6]} className="w-full h-full object-cover grayscale-[30%]" />
                                </motion.div>
                            </div>


                            {/* --- Center Text Content --- */}
                            <div className="col-span-8 md:col-span-4 lg:col-span-4 flex flex-col justify-center items-center text-center z-20 pointer-events-auto px-1 md:px-0 h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    <span className="py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-[#fdf2f8]/90 backdrop-blur-sm text-[#5A2A45] font-outfit text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase border border-[#5A2A45]/10 shadow-sm">
                                        {heroSection.badge || "Testimonials"}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
                                    className="font-display text-[2rem] md:text-[3.5rem] text-[#1a1a1a] leading-[1.1] md:leading-[1] font-medium mt-4 md:mt-5 mb-2 md:mb-3 drop-shadow-sm mix-blend-darken whitespace-pre-line"
                                >
                                    {heroSection.heading || "Trusted by families\nfrom various cities"}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
                                    className="font-outfit text-[#666] text-[11px] md:text-base max-w-[150px] md:max-w-md mx-auto leading-relaxed font-light"
                                >
                                    {heroSection.subheading || "Learn why professionals trust our lens."}
                                </motion.p>
                            </div>


                            {/* --- Right Side Clusters --- */}
                            <div className="hidden lg:flex flex-col gap-6 items-center pt-16">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3, type: "spring" }} className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={heroImages[7]} className="w-full h-full object-cover grayscale-[20%]" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.8, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm opacity-60">
                                    <LazyImage src={heroImages[8]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="hidden md:flex flex-col gap-4 items-center pt-2">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.4, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm mt-12">
                                    <LazyImage src={heroImages[9]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.7, type: "spring" }} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm opacity-90">
                                    <LazyImage src={heroImages[10]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-4 md:gap-10 items-center pt-8 md:pt-28">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.2, type: "spring" }} className="w-full aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={heroImages[11]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.5, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-80">
                                    <LazyImage src={heroImages[12]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-3 md:gap-5 items-center pt-16 md:pt-12">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.6, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={heroImages[13]} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.9, type: "spring" }} className="w-full aspect-[4/5] rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-50">
                                    <LazyImage src={heroImages[14]} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                        </div>
                    </div>



                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-[#5A2A45]/30 animate-bounce"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </motion.div>
                </section>

                {/* Main Testimonials Section */}
                <section className="pt-8 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
                    <div className="columns-1 lg:columns-2 gap-4 space-y-4 lg:space-y-0">

                        {reviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`break-inside-avoid mb-4 ${index % 2 !== 0 ? 'bg-[#5A2A45] text-white' : 'bg-white border border-stone-100/50'} rounded-[24px] p-6 shadow-sm relative overflow-hidden flex flex-col gap-4`}
                            >
                                {index % 2 === 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CBB6]/10 rounded-bl-full -z-0"></div>}

                                <div className={`flex items-center gap-4 relative z-10 ${index % 2 !== 0 ? 'flex-row-reverse justify-end' : ''}`}>
                                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${index % 2 !== 0 ? 'border-[#B77A8C]' : 'border-white'} shadow-md relative shrink-0`}>
                                        <LazyImage src={review.image || testImg1} alt={review.clientName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className={index % 2 !== 0 ? 'text-right flex-1' : ''}>
                                        <h3 className={`font-display text-lg ${index % 2 !== 0 ? 'text-[#E8CBB6]' : 'text-[#5A2A45]'} font-bold leading-tight`}>{review.clientName}</h3>
                                        <p className={`font-outfit ${index % 2 !== 0 ? 'text-white/80' : 'text-[#B77A8C]'} text-[10px] uppercase tracking-wider font-semibold`}>{review.serviceType || 'Client'}</p>
                                        <div className={`scale-75 ${index % 2 !== 0 ? 'flex justify-end mt-0.5 origin-right -mr-0.5' : 'origin-left -ml-0.5 mt-0.5'}`}>
                                            <StarRating rating={review.rating} />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <p className={`font-outfit text-[13px] md:text-sm ${index % 2 !== 0 ? 'text-white/90 text-justify whitespace-pre-line opacity-95' : 'text-[#8F8A86] leading-relaxed italic'}`}>
                                        "{review.content}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </section>

                <div className="pb-24 text-center">
                    <p className="font-outfit text-[#8F8A86] mb-8">{ctaSection.text || "Ready to create your own memories?"}</p>
                </div>

            </div>
        </>
    );
};

export default Testimonials;
