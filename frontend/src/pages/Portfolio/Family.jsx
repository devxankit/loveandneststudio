import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Importing images from the family portfolio folder
import heroImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';
import portraitImg1 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111330.png';
import wideImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import portraitImg2 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120811.png';
import storyImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120820.png';
import detailImg1 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120831.png';
import detailImg2 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120844.png';

const Family = () => {
    return (
        <>
            <SEO
                title="Family Photography | Love & Nest Studio"
                description="Capturing the timeless bonds of family with grace and warmth. Professional family portraits in Dehradun."
                keywords="family photography, luxury family portraits, dehradun photographer"
            />

            <div className="w-full bg-white font-outfit text-[#4A4A4A]">

                {/* 1. HERO SECTION */}
                <section className="relative h-[100vh] w-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <LazyImage
                            src={heroImg}
                            alt="Family Hero"
                            className="w-full h-full object-cover object-top opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>
                    </motion.div>

                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="font-outfit text-xs md:text-sm tracking-[0.3em] uppercase mb-6 opacity-80"
                        >
                            Est. 2019 • Love & Nest Studio
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] tracking-wide leading-[1.1] uppercase mb-6 font-medium drop-shadow-lg"
                        >
                            Our Journey <br /><span className="italic font-light normal-case tracking-normal opacity-90">Together</span>
                        </motion.h1>
                        <div className="w-[1px] h-16 bg-white/50 mb-8 mt-4"></div>
                        <motion.a
                            href="/contact"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="inline-block text-white border border-white/30 bg-white/10 backdrop-blur-md py-4 px-12 text-xs md:text-sm uppercase tracking-[3px] hover:bg-white hover:text-black transition-all duration-500"
                        >
                            Book A Session
                        </motion.a>
                    </div>
                </section>

                {/* 2. GREETINGS / INTRO SECTION */}
                <section className="py-28 md:py-40 px-8 md:px-16 max-w-[1500px] mx-auto bg-white relative">
                    {/* Watermark Background */}
                    <div className="absolute top-20 right-0 font-display text-[15rem] leading-none text-gray-50 opacity-[0.03] select-none pointer-events-none hidden lg:block overflow-hidden">
                        Family
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative lg:col-span-5"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <LazyImage src={portraitImg1} alt="Portrait Intro" className="w-full h-full object-cover grayscale-[10%]" />
                            </div>
                            {/* Refined Decorative Lines */}
                            <div className="absolute -top-6 -left-6 w-full h-full border-[0.5px] border-[#2a2a2a] -z-10 hidden md:block"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-left lg:col-span-7 lg:pl-12"
                        >
                            <span className="font-outfit text-[10px] uppercase tracking-[5px] text-[#8F8A86] mb-6 block border-l-2 border-[#8F8A86] pl-4">The Philosophy</span>
                            <h2 className="font-display text-4xl md:text-6xl text-[#1a1a1a] mb-10 leading-[1.15]">
                                Cherishing Every <br /><span className="italic font-light text-[#8F8A86]">Fleeting Moment</span>
                            </h2>
                            <div className="space-y-8 text-[#555] font-light leading-loose text-lg text-justify md:columns-1 lg:columns-2 gap-10">
                                <p>
                                    Family is the anchor during rough waters and the wind in our sails during calm seas. It is our everything. In the relentless rush of our modern lives, the quiet, profound beauty of simply <span className="italic">being together</span> is often overlooked.
                                </p>
                                <p>
                                    Our mission is deeper than photography. We aim to freeze time—preserving the laughter that fills a room, the gentle touch of a hand, and the unspoken bond that ties you together. We craft visual heirlooms, authentic and unspooled, for you to hold onto forever.
                                </p>
                            </div>
                            <div className="mt-16 flex items-center gap-6">
                                <div className="h-[1px] w-20 bg-[#2a2a2a]"></div>
                                <div>
                                    <p className="font-display text-lg italic text-[#1a1a1a]">Anamika</p>
                                    <p className="font-outfit text-[10px] tracking-widest text-gray-400 uppercase mt-0.5">Lead Photographer</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. WIDE CINEMATIC BANNER */}
                <section className="w-full relative py-12 px-4 md:px-8">
                    <div className="w-full h-[50vh] md:h-[75vh] overflow-hidden relative">
                        <div className="absolute inset-0 p-4 md:p-8 border border-white/20 z-10 pointer-events-none">
                            <div className="w-full h-full border border-white/40"></div>
                        </div>
                        <motion.div
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8 }}
                            className="w-full h-full"
                        >
                            <LazyImage src={wideImg} alt="Wide Landscape Family" className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]" />
                        </motion.div>
                        <div className="absolute bottom-12 left-12 md:left-24 text-white z-20">
                            <p className="font-display italic text-2xl md:text-3xl">"Where life happens"</p>
                        </div>
                    </div>
                </section>

                {/* 4. SELECTED WORKS (Editorial Grid) */}
                <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1300px] mx-auto bg-white">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-10">
                        <div>
                            <span className="font-outfit text-xs tracking-[3px] text-gray-400 uppercase mb-2 block">Portfolio</span>
                            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a]">Selected Stories</h2>
                        </div>
                        <div className="hidden md:block">
                            <a href="/contact" className="font-outfit text-xs uppercase tracking-[2px] border rounded-full px-6 py-3 hover:bg-[#1a1a1a] hover:text-white transition-all">View All Archives</a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-32 md:gap-y-24">
                        {/* Portrait 1 */}
                        <div className="flex flex-col group cursor-pointer">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full aspect-[4/5] overflow-hidden mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
                                <LazyImage src={portraitImg2} alt="The Mehta Family" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                            </motion.div>
                            <span className="font-outfit text-[10px] tracking-[3px] text-gray-400 uppercase mb-2">01 — Outdoor</span>
                            <h3 className="font-display text-3xl text-[#1a1a1a] group-hover:italic transition-all duration-300">The Mehta Family</h3>
                        </div>

                        {/* Portrait 2 - Offset */}
                        <div className="flex flex-col group cursor-pointer md:pt-32">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full aspect-[4/5] overflow-hidden mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
                                <LazyImage src={storyImg} alt="The Kapoor Family" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                            </motion.div>
                            <span className="font-outfit text-[10px] tracking-[3px] text-gray-400 uppercase mb-2">02 — Studio</span>
                            <h3 className="font-display text-3xl text-[#1a1a1a] group-hover:italic transition-all duration-300">The Kapoor Family</h3>
                        </div>
                    </div>
                </section>

                {/* 5. BOTTOM GRID / MOSAIC */}
                <section className="pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="aspect-square overflow-hidden">
                            <LazyImage src={detailImg1} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                        </div>
                        <div className="aspect-square overflow-hidden bg-[#FAF7F2] flex items-center justify-center p-8 text-center">
                            <div>
                                <h4 className="font-display text-2xl text-[#2a2a2a] mb-2">Ready to tell your story?</h4>
                                <a href="/contact" className="text-xs font-outfit uppercase tracking-[2px] border-b border-[#2a2a2a] pb-1 hover:text-[#88B8AF] hover:border-[#88B8AF] transition-colors">Get in Touch</a>
                            </div>
                        </div>
                        <div className="aspect-square overflow-hidden">
                            <LazyImage src={detailImg2} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default Family;
