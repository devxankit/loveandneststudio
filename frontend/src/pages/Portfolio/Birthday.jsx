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
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                <img
                    src={data?.hero?.backgroundImage || floatingImages[0]}
                    alt="Birthday Backdrop"
                    className="w-full h-full object-cover opacity-60 grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]"></div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 w-32 h-32 md:w-64 md:h-64 rounded-full border border-white/10 overflow-hidden backdrop-blur-sm p-2"
                >
                    <img src={floatingImages[1]} className="w-full h-full object-cover rounded-full" alt="" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-10 w-40 h-56 md:w-80 md:h-[500px] rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm p-2"
                >
                    <img src={floatingImages[2]} className="w-full h-full object-cover rounded-2xl" alt="" />
                </motion.div>
            </div>

            {/* Typography */}
            <div className="relative z-20 text-center space-y-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block font-outfit text-xs md:text-sm uppercase tracking-[0.6em] text-white/60 mb-6 px-4 py-2 border border-white/10 rounded-full backdrop-blur-md">
                        {data?.hero?.tagline || "Magic in every candle"}
                    </span>
                    <h1 className="font-display text-7xl md:text-[12vw] leading-[0.9] text-white tracking-tighter uppercase mb-6">
                        {(data?.hero?.title || "Birthday Dreams").split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'italic font-light text-[#B77A8C]' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <p className="font-outfit text-lg md:text-2xl text-white/50 max-w-xl font-light leading-relaxed">
                            {data?.hero?.subtitle || "Capturing the golden essence of celebration."}
                        </p>
                    </div>
                </motion.div>

                {/* Vertical Scroll Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 80 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/40 to-transparent"
                />
            </div>
        </section>
    );
};

const BirthdayGallery = ({ images }) => {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="font-display text-5xl md:text-8xl text-white">THE <span className="italic font-light text-[#B77A8C]">ARCHIVE</span></h2>
                        <p className="font-outfit text-white/40 uppercase tracking-[0.2em] text-xs">A collection of joy, mess, and laughter.</p>
                    </div>
                    <div className="flex gap-4 p-2 bg-white/5 rounded-full border border-white/10">
                        <button className="p-3 rounded-full bg-white text-black"><LayoutGrid size={20} /></button>
                        <button className="p-3 rounded-full hover:bg-white/10 transition-colors text-white"><ImageIcon size={20} /></button>
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
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-display text-4xl md:text-6xl text-white">LIVING <span className="italic font-light text-[#B77A8C]">MEMORIES</span></h2>
                    <p className="font-outfit text-white/40 uppercase tracking-[0.3em] text-[10px]">Short cinematic glimpses of joy</p>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5">
                                    <PartyPopper className="text-white/60 w-6 h-6" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold whitespace-nowrap">Cinematic Clip {i + 1}</span>
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
        <section className="py-24 px-6 md:px-12 bg-white text-black">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="font-display text-5xl md:text-7xl leading-tight">CUSTOM <br /><span className="italic font-light text-[#B77A8C]">THEMES</span></h2>
                        <p className="font-outfit text-black/60 text-lg leading-relaxed max-w-md">
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
                                <h3 className="font-display text-3xl uppercase tracking-tighter">{theme.title}</h3>
                                <p className="font-outfit text-black/50 text-sm leading-relaxed">{theme.description}</p>
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
        <div className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
            <SEO title="Birthday Portfolio | Love & Nest Studio" description="Capturing the magic of growing up." />

            <BirthdayHero data={data} />

            {/* Artistic Intro Section */}
            <section className="py-32 px-6 relative">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 mx-auto rounded-full bg-[#B77A8C]/20 border border-[#B77A8C]/40 flex items-center justify-center text-[#B77A8C]"
                    >
                        <Cake size={32} strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
                        {data?.intro?.title || "Every year is a story worth telling."}
                    </h2>
                    <p className="font-outfit text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        {data?.intro?.description || "From the first candle to every wish thereafter, we capture the magic of childhood birthdays with editorial precision and warmth."}
                    </p>
                    <div className="flex justify-center gap-12 opacity-30">
                        <Sparkles size={24} />
                        <Star size={24} />
                        <Sparkles size={24} />
                    </div>
                </div>
            </section>

            <BirthdayGallery images={data?.gallery} />

            <BirthdayThemes themes={data?.themes} />

            <BirthdayVideos videos={data?.videos} />

            {/* CTA Section */}
            <section className="py-40 px-6 relative bg-white">
                <div className="max-w-[1240px] mx-auto rounded-[4rem] bg-[#0a0a0a] p-12 md:p-24 relative overflow-hidden text-center group">
                    {/* Background Decorative Element */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#B77A8C]/10 rounded-full blur-[100px] group-hover:bg-[#B77A8C]/20 transition-all duration-700"></div>

                    <div className="relative z-10 space-y-10">
                        <h2 className="font-display text-5xl md:text-8xl text-white">READY TO <br /><span className="italic font-light text-[#B77A8C]">CELEBRATE?</span></h2>
                        <p className="font-outfit text-white/50 text-xl max-w-xl mx-auto capitalize">
                            {data?.cta?.text || "Let's capture the magic of their next big milestone."}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = data?.cta?.buttonLink || '/contact'}
                            className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl inline-flex items-center gap-4 hover:bg-[#B77A8C] hover:text-white transition-all"
                        >
                            {data?.cta?.buttonText || "Reserve Your Date"} <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BirthdayPage;
