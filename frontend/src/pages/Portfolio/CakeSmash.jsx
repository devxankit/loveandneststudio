import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, PartyPopper, Star, Sparkles, Heart, Music, Smile, Camera } from 'lucide-react';
import api from '../../services/api';
import PageLoader from '../../components/common/PageLoader';

const CakeSmash = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { scrollY } = useScroll();

    // Parallax Effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const rotate1 = useTransform(scrollY, [0, 500], [0, 45]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/cakesmash');
                setData(res.data);
            } catch (error) {
                console.error("Error fetching Cake Smash data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <PageLoader />;

    const heroBg = data?.hero?.backgroundImage || "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=2670&auto=format&fit=crop";

    // Animated Decorative Icons
    const FloatingIcon = ({ children, x, y, delay, color, size = 32, rotate = 0 }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.6, 0.4],
                scale: [0, 1.2, 1],
                y: [0, -20, 0],
                x: [0, 10, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="absolute z-10 pointer-events-none"
            style={{ left: x, top: y, color, rotate }}
        >
            {React.cloneElement(children, { size })}
        </motion.div>
    );

    return (
        <div className="bg-[#FFFDF5] min-h-screen font-outfit text-[#4A4A4A] overflow-hidden">
            {/* 1. HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0">
                    <img src={heroBg} alt="Birthday Hero" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#FFFDF5]/40 to-[#FFFDF5]"></div>
                </motion.div>

                {/* Rich Decorative Icons Array */}
                <FloatingIcon x="10%" y="15%" delay={0} color="#B77A8C" size={48} rotate={-15}><Star fill="currentColor" /></FloatingIcon>
                <FloatingIcon x="85%" y="20%" delay={1} color="#E8CBB6" size={56} rotate={12}><PartyPopper /></FloatingIcon>
                <FloatingIcon x="5%" y="60%" delay={2} color="#5A2A45" size={40} rotate={-10}><Sparkles /></FloatingIcon>
                <FloatingIcon x="90%" y="70%" delay={1.5} color="#B77A8C" size={36} rotate={5}><Heart fill="currentColor" /></FloatingIcon>
                <FloatingIcon x="20%" y="80%" delay={2.5} color="#E8CBB6" size={44} rotate={20}><Music /></FloatingIcon>
                <FloatingIcon x="75%" y="10%" delay={0.5} color="#5A2A45" size={32} rotate={-5}><Smile /></FloatingIcon>
                <FloatingIcon x="40%" y="5%" delay={3} color="#B77A8C" size={24} rotate={15}><Sparkles /></FloatingIcon>
                <FloatingIcon x="60%" y="85%" delay={2} color="#E8CBB6" size={28} rotate={-20}><Camera /></FloatingIcon>

                {/* Content */}
                <div className="relative z-20 text-center px-4">
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="block font-outfit text-xs md:text-sm uppercase tracking-[0.5em] text-[#B77A8C] mb-6 font-bold"
                        >
                            {data?.hero?.tagline || "The Birthday Collection"}
                        </motion.span>
                        <h1 className="font-display text-7xl md:text-9xl text-[#5A2A45] mb-6 drop-shadow-sm leading-tight">
                            {data?.hero?.title || "Cake Smash"}
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-[1px] bg-[#E8CBB6]"></div>
                            <p className="font-display italic text-2xl md:text-4xl text-[#8F8A86] tracking-wide">
                                {data?.hero?.subtitle || "Celebrating First Milestones"}
                            </p>
                            <div className="w-12 h-[1px] bg-[#E8CBB6]"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#8F8A86]">Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-[1px] h-10 bg-gradient-to-b from-[#B77A8C] to-transparent"
                    />
                </motion.div>
            </section>

            {/* 2. INTRO / CELEBRATION TEXT */}
            <section className="py-20 md:pt-32 md:pb-16 px-6 max-w-4xl mx-auto text-center space-y-8">
                <Gift className="mx-auto text-[#B77A8C] w-12 h-12 mb-6" />
                <h2 className="font-display text-4xl md:text-5xl text-[#5A2A45]">{data?.celebrationText?.title || "A Sweet Celebration"}</h2>
                <p className="font-outfit text-lg md:text-xl text-[#8F8A86] leading-relaxed">
                    {data?.celebrationText?.description || "Capturing the joy of your little one's special day."}
                </p>
                <div className="w-24 h-[1px] bg-[#E8CBB6] mx-auto"></div>
            </section>


            {/* 3. THE SWEET CELEBRATION - Compact & Creative Portfolio Tray */}
            <section className="py-20 px-6 max-w-[1000px] mx-auto mb-20 relative">
                {/* Minimalist Artistic Title */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 px-4">
                    <div className="h-[1px] w-12 bg-[#B77A8C]"></div>
                    <h2 className="font-display text-3xl md:text-5xl text-[#5A2A45] text-center italic">{data?.giftGrid?.title || "A Sweet Celebration"}</h2>
                    <div className="h-[1px] w-12 bg-[#B77A8C]"></div>
                </div>

                <div className="relative max-w-[850px] mx-auto">
                    {/* The Background "Tray" / Album Base */}
                    <div className="relative bg-white p-4 md:p-10 rounded-[2rem] shadow-[0_30px_70px_rgba(90,42,69,0.06)] border border-[#E8CBB6]/30 overflow-hidden">

                        {/* Silk Ribbon Pattern - More Delicate */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 opacity-20">
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#B77A8C]"></div>
                            <div className="absolute left-[30%] top-0 h-full w-[2px] bg-[#B77A8C]"></div>
                        </div>

                        {/* Staggered Overlapping Image Grid */}
                        <div className="relative z-20 grid grid-cols-2 md:grid-cols-12 gap-4 items-center">

                            {/* Image 1: Large & Heroic */}
                            <motion.div
                                whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
                                initial={{ rotate: -2 }}
                                className="md:col-span-7 aspect-[4/5] bg-[#FFFDF5] p-2 rounded-xl shadow-lg border border-[#E8CBB6]/20 cursor-zoom-in"
                            >
                                <img src={data?.giftGrid?.images?.[0] || data?.gallery?.[0]?.url || heroBg} className="w-full h-full object-cover rounded-lg" />
                            </motion.div>

                            {/* Image 2: Small & Elevated */}
                            <motion.div
                                whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                                initial={{ rotate: 3, y: -20 }}
                                className="md:col-span-5 aspect-square bg-[#FFFDF5] p-2 rounded-xl shadow-lg border border-[#E8CBB6]/20 -ml-8 md:-ml-12 cursor-zoom-in"
                            >
                                <img src={data?.giftGrid?.images?.[1] || data?.gallery?.[1]?.url || heroBg} className="w-full h-full object-cover rounded-lg" />
                            </motion.div>

                            {/* Image 3: Wide & Tucked */}
                            <motion.div
                                whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
                                initial={{ rotate: -1, x: 20 }}
                                className="md:col-span-5 aspect-video bg-[#FFFDF5] p-2 rounded-xl shadow-lg border border-[#E8CBB6]/20 mt-[-40px] md:mt-[-80px] cursor-zoom-in"
                            >
                                <img src={data?.giftGrid?.images?.[2] || data?.gallery?.[2]?.url || heroBg} className="w-full h-full object-cover rounded-lg" />
                            </motion.div>

                            {/* Image 4: Tall & Artistic */}
                            <motion.div
                                whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
                                initial={{ rotate: 2 }}
                                className="md:col-span-7 aspect-[3/2] bg-[#FFFDF5] p-2 rounded-xl shadow-lg border border-[#E8CBB6]/20 mt-4 cursor-zoom-in"
                            >
                                <img src={data?.giftGrid?.images?.[3] || data?.gallery?.[3]?.url || heroBg} className="w-full h-full object-cover rounded-lg" />
                            </motion.div>
                        </div>

                        {/* Wax Seal Decorative Element */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-40 w-16 h-16 md:w-20 md:h-20 bg-[#B77A8C] rounded-full shadow-xl flex items-center justify-center border-4 border-[#FFFDF5] overflow-hidden"
                            style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}
                        >
                            <div className="text-[#FFFDF5] font-display text-2xl md:text-3xl select-none">L&N</div>
                            <div className="absolute inset-0 border border-white/20 rounded-full"></div>
                        </motion.div>

                        {/* Hand-written Style Tag */}
                        <div className="absolute top-10 right-10 z-30 opacity-60 pointer-events-none text-right">
                            <span className="font-display italic text-[#5A2A45] text-xl md:text-2xl drop-shadow-sm whitespace-pre-line">
                                {data?.giftGrid?.tagline || "Hand-crafted moments"}
                            </span>
                        </div>
                    </div>

                    {/* Decorative Sparkles */}
                    <div className="absolute -top-4 -left-4 text-[#E8CBB6] opacity-40"><Sparkles size={32} /></div>
                    <div className="absolute -bottom-4 -right-4 text-[#E8CBB6] opacity-40 translate-x-1/2"><Star size={24} fill="currentColor" /></div>
                </div>
            </section>

            {/* 4. HANGING ORNAMENTS / BALLOONS GRID - Redesigned for Premium Beauty */}
            <section className="py-24 md:py-40 bg-[#FAF5F0] overflow-hidden relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[5%]"
                    >
                        <Star size={40} className="text-[#B77A8C]" fill="currentColor" />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -10, 0]
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[10%] right-[10%]"
                    >
                        <Sparkles size={60} className="text-[#E8CBB6]" />
                    </motion.div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 md:mb-32">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-outfit text-xs md:text-sm uppercase tracking-[0.5em] text-[#B77A8C] mb-4 block font-bold"
                        >
                            {data?.hangingGrid?.tagline || "The Gallery"}
                        </motion.span>
                        <h3 className="font-display text-5xl md:text-7xl text-[#5A2A45] drop-shadow-sm">
                            {data?.hangingGrid?.title || "Capturing Every Giggle"}
                        </h3>
                        <div className="w-24 h-[2px] bg-[#E8CBB6] mx-auto mt-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 items-start">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center">
                            {/* Decorative String with Knot/Bow */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-[1.5px] h-24 bg-gradient-to-b from-transparent via-[#8F8A86] to-[#8F8A86]"></div>
                                <div className="z-20 -mt-2 mb-[-8px]">
                                    <div className="w-8 h-4 bg-[#B77A8C] rounded-full shadow-sm relative flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#5A2A45] rounded-full"></div>
                                        <div className="absolute -left-2 top-0 w-4 h-4 border-2 border-[#B77A8C] rounded-full rotate-45"></div>
                                        <div className="absolute -right-2 top-0 w-4 h-4 border-2 border-[#B77A8C] rounded-full -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: [-2, 2, -2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05, rotate: 0 }}
                                className="w-72 h-72 lg:w-80 lg:h-80 rounded-full border-[6px] border-white overflow-hidden shadow-[0_20px_50px_rgba(90,42,69,0.15)] bg-white p-2 relative group cursor-pointer"
                            >
                                <img
                                    src={data?.hangingGrid?.images?.[0] || data?.gallery?.[0]?.url || heroBg}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#5A2A45]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full flex items-center justify-center">
                                    <Heart size={40} className="text-white fill-white" />
                                </div>
                                {/* Outer Glow Effect */}
                                <div className="absolute -inset-1 border border-[#E8CBB6]/30 rounded-full animate-pulse"></div>
                            </motion.div>
                        </div>

                        {/* Item 2 (Lower + Larger) */}
                        <div className="flex flex-col items-center mt-0 md:mt-24">
                            <div className="relative flex flex-col items-center">
                                <div className="w-[1.5px] h-32 bg-gradient-to-b from-transparent via-[#8F8A86] to-[#8F8A86]"></div>
                                <div className="z-20 -mt-2 mb-[-8px]">
                                    <div className="w-10 h-5 bg-[#E8CBB6] rounded-full shadow-sm relative flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-[#5A2A45] rounded-full"></div>
                                        <div className="absolute -left-2.5 top-0 w-5 h-5 border-2 border-[#E8CBB6] rounded-full rotate-45"></div>
                                        <div className="absolute -right-2.5 top-0 w-5 h-5 border-2 border-[#E8CBB6] rounded-full -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: [3, -3, 3] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05, rotate: 0 }}
                                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-[8px] border-white overflow-hidden shadow-[0_25px_60px_rgba(90,42,69,0.2)] bg-white p-2 relative group cursor-pointer"
                            >
                                <img
                                    src={data?.hangingGrid?.images?.[1] || data?.gallery?.[1]?.url || heroBg}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#5A2A45]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full flex items-center justify-center">
                                    <Heart size={48} className="text-white fill-white" />
                                </div>
                                <div className="absolute -inset-1 border border-[#E8CBB6]/40 rounded-full animate-pulse"></div>
                            </motion.div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col items-center">
                            <div className="relative flex flex-col items-center">
                                <div className="w-[1.5px] h-16 bg-gradient-to-b from-transparent via-[#8F8A86] to-[#8F8A86]"></div>
                                <div className="z-20 -mt-2 mb-[-8px]">
                                    <div className="w-8 h-4 bg-[#B77A8C] rounded-full shadow-sm relative flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#5A2A45] rounded-full"></div>
                                        <div className="absolute -left-2 top-0 w-4 h-4 border-2 border-[#B77A8C] rounded-full rotate-45"></div>
                                        <div className="absolute -right-2 top-0 w-4 h-4 border-2 border-[#B77A8C] rounded-full -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: [-1.5, 1.5, -1.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05, rotate: 0 }}
                                className="w-64 h-64 lg:w-72 lg:h-72 rounded-full border-[6px] border-white overflow-hidden shadow-[0_20px_50px_rgba(90,42,69,0.15)] bg-white p-1.5 relative group cursor-pointer"
                            >
                                <img
                                    src={data?.hangingGrid?.images?.[2] || data?.gallery?.[2]?.url || heroBg}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#5A2A45]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full flex items-center justify-center">
                                    <Heart size={36} className="text-white fill-white" />
                                </div>
                                <div className="absolute -inset-1 border border-[#E8CBB6]/30 rounded-full animate-pulse"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <div className="text-center py-20 bg-[#FFFDF5]">
                <h2 className="font-display text-4xl mb-6 text-[#5A2A45]">{data?.cta?.title || "Let's Plan the Party!"}</h2>
                <a href={data?.cta?.buttonLink || "/contact"} className="bg-[#B77A8C] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#5A2A45] transition-all shadow-lg inline-block">
                    {data?.cta?.buttonText || "Book A Session"}
                </a>
            </div>
        </div>
    );
};

export default CakeSmash;
