import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import SectionTitle from '../../components/common/SectionTitle';
import LazyImage from '../../components/common/LazyImage';

// Import all testimonial images
import testImg1 from '../../assets/images/testimonials/Screenshot 2025-12-31 114249.png';
import testImg2 from '../../assets/images/testimonials/Screenshot 2025-12-31 114257.png';
import testImg3 from '../../assets/images/testimonials/Screenshot 2025-12-31 114307.png';
import testImg4 from '../../assets/images/testimonials/Screenshot 2025-12-31 114317.png';
import testImg5 from '../../assets/images/testimonials/Screenshot 2025-12-31 114335.png';

const Testimonials = () => {
    // Scroll progress for parallax effect
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Data for Hero Grid
    const heroImages = [
        testImg1, testImg2, testImg3, testImg4, testImg5,
        testImg2, testImg1, testImg4, testImg3, testImg5 // Duplicate for fuller grid
    ];

    // Detailed Testimonials Data
    const testimonials = [
        {
            id: 1,
            name: "Priya Jha",
            image: testImg1,
            role: "Happy Mother",
            content: "Hello Anamika, Thank you for the beautiful photos. Your work is wonderful and you are a very nice photographer—professional, kind, and talented. Thank you for making my son 1st birthday special.. I loved the colors and how you captured the moments. Again Thank you 😊 ❤️",
            rating: 5,
            color: "bg-[#E8CBB6]" // Peach Nude background
        },
        {
            id: 2,
            name: "Reshu Verma",
            image: testImg2,
            role: "Mentor",
            content: `Anamika is a rare blend of precision, grace, and quiet strength, and collaborating with her has been nothing short of inspiring on both professional and personal fronts. Her presence elevates any project she touches, and her contribution to Love & Nest Studio is truly special.

            Anamika brings an exceptional level of **clarity** and structure to her work, staying calm and composed even when timelines are tight or challenges arise. She takes ownership of her responsibilities, thinks things through, and follows through with consistency, which makes working with her feel effortless and deeply reassuring.

            What stands out most is her ability to balance discipline with warmth. She not only manages tasks and coordinates with people seamlessly, but also creates an environment where everyone feels heard, supported, and motivated to give their best.

            Every interaction with Anamika reflects sincerity, integrity, and genuine care—for the work, the team, and the vision. She is the kind of professional you can depend on completely, and the kind of person you are always grateful to have by your side.

            With her talent, dedication, and heart, Anamika is destined to build something beautiful, and Love & Nest Studio could not have a more capable or compassionate force behind it. I wish her all the success in the world as she continues to shape this journey.`,
            rating: 5,
            color: "bg-[#F5F2F0]" // Light Grey/White background for contrast
        }
    ];

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
                title="Testimonials - Love & Nest Studio"
                description="Read reviews and testimonials from our happy clients. See why families trust Love & Nest Studio for their precious moments."
                keywords="photography reviews, client testimonials, best photographer reviews, dehradun photographer reviews"
            />

            <div className="w-full bg-[#FAF9F6]">

                {/* Hero Section - Wall of Love Layout */}
                {/* Hero Section - Wall of Love Layout (Full Screen - Miniature Grid) */}
                <section className="relative min-h-[500px] h-[65vh] flex flex-col justify-center items-center overflow-hidden bg-[#FFFCF8]">
                    {/* Vertical Dashed Lines Background - Dense for small grid */}
                    <div className="absolute inset-0 flex justify-between px-4 max-w-[1600px] mx-auto pointer-events-none opacity-[0.07]">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-[0.5px] h-full border-l border-dashed border-[#5A2A45]"></div>
                        ))}
                    </div>

                    {/* Hanging Images Grid - Dense & Miniature */}
                    <div className="absolute inset-0 z-10 w-full h-full px-4 pointer-events-none">
                        <div className="grid grid-cols-12 gap-2 md:gap-4 h-full max-w-[1600px] mx-auto content-center">

                            {/* --- Left Side Clusters --- */}

                            {/* Col 1 - Visible Mobile (Waterfall start) */}
                            <div className="flex flex-col gap-3 md:gap-4 items-center pt-12 md:pt-8">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.1, type: "spring" }} className="w-full aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-500">
                                    <LazyImage src={testImg1} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.4, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-80 mt-2 md:mt-12">
                                    <LazyImage src={testImg3} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 2 - Visible Mobile */}
                            <div className="flex flex-col gap-3 md:gap-8 items-center pt-4 md:pt-24">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.2, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={testImg2} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.6, type: "spring" }} className="w-full aspect-[4/5] rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-90">
                                    <LazyImage src={testImg5} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 3 - Hidden Mobile (Space for Text) */}
                            <div className="hidden md:flex flex-col gap-5 items-center pt-4">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.3, type: "spring" }} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm mt-8">
                                    <LazyImage src={testImg4} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.7, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm opacity-70">
                                    <LazyImage src={testImg1} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 4 - Hidden Mobile */}
                            <div className="hidden lg:flex flex-col gap-8 items-center pt-32">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.25, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={testImg3} className="w-full h-full object-cover grayscale-[30%]" />
                                </motion.div>
                            </div>


                            {/* --- Center Text Content --- */}
                            {/* Mobile: Spans 8 cols. Tablet: Spans 4 cols. Desktop: Spans 4 cols. */}
                            <div className="col-span-8 md:col-span-4 lg:col-span-4 flex flex-col justify-center items-center text-center z-20 pointer-events-auto px-1 md:px-0 h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    <span className="py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-[#fdf2f8]/90 backdrop-blur-sm text-[#5A2A45] font-outfit text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase border border-[#5A2A45]/10 shadow-sm">
                                        Testimonials
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
                                    className="font-display text-[2rem] md:text-[3.5rem] text-[#1a1a1a] leading-[1.1] md:leading-[1] font-medium mt-4 md:mt-5 mb-2 md:mb-3 drop-shadow-sm mix-blend-darken"
                                >
                                    Trusted by families<br />
                                    <span className="text-[#8F8A86] font-normal italic text-[0.7em]">from various cities</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
                                    className="font-outfit text-[#666] text-[11px] md:text-base max-w-[150px] md:max-w-md mx-auto leading-relaxed font-light"
                                >
                                    Learn why professionals trust our lens.
                                </motion.p>
                            </div>


                            {/* --- Right Side Clusters --- */}

                            {/* Col 9 - Hidden Mobile */}
                            <div className="hidden lg:flex flex-col gap-6 items-center pt-16">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3, type: "spring" }} className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={testImg5} className="w-full h-full object-cover grayscale-[20%]" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.8, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm opacity-60">
                                    <LazyImage src={testImg2} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 10 - Hidden Mobile (Space for Text) */}
                            <div className="hidden md:flex flex-col gap-4 items-center pt-2">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.4, type: "spring" }} className="w-full aspect-square rounded-xl overflow-hidden shadow-sm mt-12">
                                    <LazyImage src={testImg1} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.7, type: "spring" }} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-sm opacity-90">
                                    <LazyImage src={testImg4} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 11 - Visible Mobile */}
                            <div className="flex flex-col gap-4 md:gap-10 items-center pt-8 md:pt-28">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.2, type: "spring" }} className="w-full aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={testImg2} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.5, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-80">
                                    <LazyImage src={testImg3} className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            {/* Col 12 - Visible Mobile */}
                            <div className="flex flex-col gap-3 md:gap-5 items-center pt-16 md:pt-12">
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.6, type: "spring" }} className="w-full aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-sm">
                                    <LazyImage src={testImg4} className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div initial={{ y: -800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.9, type: "spring" }} className="w-full aspect-[4/5] rounded-lg md:rounded-xl overflow-hidden shadow-sm opacity-50">
                                    <LazyImage src={testImg1} className="w-full h-full object-cover" />
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

                        {/* Testimonial 1 - Priya Jha */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-[24px] p-6 shadow-sm border border-stone-100/50 relative overflow-hidden flex flex-col gap-4"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CBB6]/10 rounded-bl-full -z-0"></div>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md relative shrink-0">
                                    <LazyImage src={testimonials[0].image} alt={testimonials[0].name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-[#5A2A45] font-bold leading-tight">{testimonials[0].name}</h3>
                                    <p className="font-outfit text-[#B77A8C] text-[10px] uppercase tracking-wider font-semibold">{testimonials[0].role}</p>
                                    <div className="scale-75 origin-left -ml-0.5 mt-0.5">
                                        <StarRating rating={testimonials[0].rating} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="font-outfit text-[13px] md:text-sm text-[#8F8A86] leading-relaxed italic">
                                    "{testimonials[0].content}"
                                </p>
                            </div>
                        </motion.div>

                        {/* Testimonial 2 - Reshu Verma (Full Content, Compact) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[#5A2A45] rounded-[24px] p-6 shadow-md relative overflow-hidden text-white flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-4 relative z-10 flex-row-reverse justify-end">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#B77A8C] shadow-md relative shrink-0">
                                    <LazyImage src={testimonials[1].image} alt={testimonials[1].name} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-right flex-1">
                                    <h3 className="font-display text-lg text-[#E8CBB6] font-bold leading-tight">{testimonials[1].name}</h3>
                                    <p className="font-outfit text-white/80 text-[10px] uppercase tracking-wider font-semibold">{testimonials[1].role}</p>
                                    <div className="flex justify-end mt-0.5 scale-75 origin-right -mr-0.5">
                                        <StarRating rating={testimonials[1].rating} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="font-outfit text-[13px] md:text-sm leading-relaxed text-white/90 text-justify whitespace-pre-line opacity-95">
                                    {testimonials[1].content}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>

                <div className="pb-24 text-center">
                    <p className="font-outfit text-[#8F8A86] mb-8">Ready to create your own memories?</p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-[#B77A8C] text-white rounded-full font-outfit uppercase tracking-[2px] text-sm hover:bg-[#5A2A45] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Book a Session
                    </a>
                </div>

            </div>
        </>
    );
};

export default Testimonials;
