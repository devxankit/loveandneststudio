import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cake, Gift, PartyPopper, Star, Sparkles, Heart, Camera, ChevronRight, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import SEO from '../../components/seo/SEO';
import { getBirthdayPage } from '../../services/api';
import PageLoader from '../../components/common/PageLoader';

const BirthdayHero = ({ data }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const floatingImages = data?.hero?.floatingImages || [
        "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2670&auto=format&fit=crop"
    ];

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
            <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                <img
                    src={data?.hero?.backgroundImage || floatingImages[0]}
                    alt="Birthday Backdrop"
                    className="w-full h-full object-cover opacity-30 "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF7]/50 to-[#FDFBF7]"></div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 w-32 h-32 md:w-64 md:h-64 rounded-full border border-[#B77A8C]/20 overflow-hidden backdrop-blur-sm p-2 shadow-sm"
                >
                    <img src={floatingImages[1]} className="w-full h-full object-cover rounded-full" alt="" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-10 w-40 h-56 md:w-80 md:h-[500px] rounded-3xl border border-[#B77A8C]/20 overflow-hidden backdrop-blur-sm p-2 shadow-sm"
                >
                    <img src={floatingImages[2]} className="w-full h-full object-cover rounded-2xl" alt="" />
                </motion.div>
            </div>

            {/* Typography */}
            <div className="relative z-20 text-center space-y-6 md:space-y-8 px-4 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block font-outfit text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#6E5A52] mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 border border-[#B77A8C]/20 rounded-full bg-white/50 backdrop-blur-md">
                        {data?.hero?.tagline || "Magic in every candle"}
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[12vw] leading-[1.1] md:leading-[0.9] text-[#5A2A45] tracking-tighter uppercase mb-4 md:mb-6">
                        {(data?.hero?.title || "Birthday Dreams").split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'italic font-light text-[#B77A8C]' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <p className="font-outfit text-base md:text-2xl text-[#6E5A52] max-w-xl font-light leading-relaxed px-4">
                            {data?.hero?.subtitle || "Capturing the golden essence of celebration."}
                        </p>
                    </div>
                </motion.div>

                {/* Vertical Scroll Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 80 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#B77A8C]/40 to-transparent"
                />
            </div>
        </section>
    );
};

const BirthdayGallery = ({ images }) => {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#FDFBF7]">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6 md:gap-8">
                    <div className="space-y-4">
                        <h2 className="font-display text-4xl sm:text-5xl md:text-8xl text-[#5A2A45]">THE <span className="italic font-light text-[#B77A8C]">ARCHIVE</span></h2>
                        <p className="font-outfit text-[#6E5A52]/60 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">A collection of joy, mess, and laughter.</p>
                    </div>
                    <div className="flex gap-4 p-1.5 bg-[#5A2A45]/5 rounded-full border border-[#5A2A45]/10 self-start md:self-auto">
                        <button className="p-2 md:p-3 rounded-full bg-[#5A2A45] text-white shadow-lg scale-90 md:scale-100"><LayoutGrid size={18} /></button>
                        <button className="p-2 md:p-3 rounded-full hover:bg-[#5A2A45]/10 transition-colors text-[#5A2A45] scale-90 md:scale-100"><ImageIcon size={18} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {images?.length > 0 ? images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i % 4 * 0.1 }}
                            className={`relative rounded-[2rem] overflow-hidden group aspect-[3/4] ${i % 3 === 0 ? 'lg:col-span-1' : ''}`}
                        >
                            <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Birthday Moment" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Moment captured</p>
                                    <p className="font-display text-2xl italic">Pure Joy</p>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        // Fallback Skeleton
                        Array(8).fill(null).map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white/5 rounded-[2rem] animate-pulse"></div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

const BirthdayVideos = ({ videos }) => {
    if (!videos || videos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FDFBF7] border-t border-[#B77A8C]/10">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-[#5A2A45]">LIVING <span className="italic font-light text-[#B77A8C]">MEMORIES</span></h2>
                    <p className="font-outfit text-[#6E5A52]/60 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[11px] font-bold">Short cinematic glimpses of joy</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {videos.slice(0, 2).map((vid, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className={`aspect-[9/16] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 relative group shadow-2xl ${i === 1 ? 'md:mt-24' : ''}`}
                        >
                            <video
                                src={vid}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            {/* Decorative Overlay */}
                            <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-full border border-[#B77A8C]/20 flex items-center justify-center backdrop-blur-md bg-white/20">
                                    <PartyPopper className="text-[#5A2A45] w-6 h-6" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#5A2A45] font-bold whitespace-nowrap">Cinematic Clip {i + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BirthdayThemes = ({ themes }) => {
    if (!themes || themes.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white text-[#4A4A4A]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:mb-24">
                    <div className="md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
                        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-[#5A2A45]">CUSTOM <br className="hidden md:block" /><span className="italic font-light text-[#B77A8C]">THEMES</span></h2>
                        <p className="font-outfit text-[#6E5A52] text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                            Each celebration is unique. We offer curated, bespoke themes designed to match your child's personality and dreams.
                        </p>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        {themes.slice(0, 4).map((theme, i) => (
                            <div key={i} className={`aspect-[4/5] rounded-3xl overflow-hidden ${i % 2 === 1 ? 'mt-8' : ''}`}>
                                <img src={theme.image} className="w-full h-full object-cover" alt={theme.title} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {themes.map((theme, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group space-y-6"
                        >
                            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-100 relative shadow-xl">
                                <img src={theme.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={theme.title} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-display text-3xl uppercase tracking-tighter text-[#5A2A45]">{theme.title}</h3>
                                <p className="font-outfit text-[#6E5A52]/70 text-sm leading-relaxed">{theme.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BirthdayPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBirthdayPage();
                setData(res.data);
            } catch (error) {
                console.error("Fetch failed", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <PageLoader />;

    return (
        <div className="bg-[#FDFBF7] min-h-screen text-[#4A4A4A] overflow-hidden">
            <SEO title="Birthday Portfolio | Love & Nest Studio" description="Capturing the magic of growing up." />

            <BirthdayHero data={data} />

            {/* 2.5 CATEGORY EXPLORER */}
            <section className="pb-32 px-6 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {(data?.categories?.length > 0 ? data.categories : [
                        {
                            title: "Pre-Birthday",
                            subtitle: "The Prologue",
                            description: "Capturing the pure wonder and anticipation before the big celebration. A gentle, artistic session.",
                            link: "/portfolio/pre-birthday",
                            image: "https://res.cloudinary.com/djuyp9lut/image/upload/v1736615566/loveandnest/assets/portfolio/toddler/t1.jpg"
                        },
                        {
                            title: "Cake Smash",
                            subtitle: "The Celebration",
                            description: "Joyous laughter, first candles, and the sweet mess of discovery. A milestone captured in its purest form.",
                            link: "/portfolio/cakesmash",
                            image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=2670&auto=format&fit=crop"
                        }
                    ]).map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] sm:h-[500px] md:h-[650px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-white border border-[#B77A8C]/10 shadow-xl transition-all duration-700 hover:border-[#B77A8C]/40 hover:shadow-2xl"
                        >
                            <a href={cat.link || '/contact'} className="block w-full h-full relative">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/30 to-transparent"></div>

                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 space-y-3 md:space-y-5">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 md:w-8 h-[1px] bg-[#B77A8C]"></span>
                                        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.5em] text-[#B77A8C]">{cat.subtitle}</span>
                                    </div>
                                    <h3 className="font-display text-3xl sm:text-4xl md:text-6xl text-[#5A2A45] tracking-tight">{cat.title}</h3>
                                    <p className="text-[#6E5A52] text-sm md:text-base font-outfit leading-relaxed max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        {cat.description}
                                    </p>
                                    <div className="pt-4 md:pt-6 flex items-center gap-4 text-[#5A2A45] text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                        <span className="hover:text-[#B77A8C] transition-colors">Enter Gallery</span>
                                        <ChevronRight size={14} className="text-[#B77A8C]" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            <BirthdayGallery images={data?.gallery} />

            <BirthdayThemes themes={data?.themes} />

            <BirthdayVideos videos={data?.videos} />

            {/* CTA Section */}
            <section className="py-20 md:py-40 px-4 sm:px-6 relative bg-white">
                <div className="max-w-[1240px] mx-auto rounded-[2.5rem] md:rounded-[4rem] bg-[#FDFBF7] p-8 sm:p-12 md:p-24 relative overflow-hidden text-center group border border-[#B77A8C]/10 shadow-2xl">
                    {/* Background Decorative Element */}
                    <div className="absolute -top-12 -right-12 md:-top-24 md:-right-24 w-48 h-48 md:w-96 md:h-96 bg-[#B77A8C]/5 rounded-full blur-[60px] md:blur-[100px] group-hover:bg-[#B77A8C]/10 transition-all duration-700"></div>

                    <div className="relative z-10 space-y-6 md:space-y-10">
                        <h2 className="font-display text-4xl sm:text-5xl md:text-8xl text-[#5A2A45] leading-tight">READY TO <br className="md:hidden" /><span className="italic font-light text-[#B77A8C]">CELEBRATE?</span></h2>
                        <p className="font-outfit text-[#6E5A52] text-base md:text-xl max-w-xl mx-auto capitalize px-4">
                            {data?.cta?.text || "Let's capture the magic of their next big milestone."}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = data?.cta?.buttonLink || '/contact'}
                            className="bg-[#5A2A45] text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm shadow-2xl inline-flex items-center gap-3 md:gap-4 hover:bg-[#B77A8C] transition-all"
                        >
                            {data?.cta?.buttonText || "Reserve Your Date"} <ChevronRight size={18} />
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BirthdayPage;
