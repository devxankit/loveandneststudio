import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Images
import heroImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import bumpImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225753.png';
import stylingImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225901.png';
import signatureImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 230114.png';

// Grain Texture for Film Look
const GrainOverlay = () => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
    </div>
);

const SectionFade = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const BestTimeMaternityPost = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

    return (
        <>
            <SEO
                title="Best Time for Maternity Shoot (28–32 Weeks) | Love & Nest Studio"
                description="Wondering when to plan your maternity photoshoot? Discover why 28–32 weeks is the safest and most beautiful time for a relaxed, magazine-style maternity experience."
                keywords="maternity photoshoot timing, best time for maternity photos, 28-32 weeks pregnancy photos, maternity photography guide"
            />

            <GrainOverlay />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#B77A8C] origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Immersive Cinematic Hero */}
            <div className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10"></div>
                    <LazyImage
                        src={heroImg}
                        alt="Maternity Portrait"
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>

                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 md:pb-24 px-6 md:px-20 max-w-[1600px] mx-auto w-full">
                    <motion.div style={{ y: textY }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >


                            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8 max-w-5xl">
                                When Is the<br />
                                <span className="italic font-light text-[#E8CBB6]">Best Time?</span>
                            </h1>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-white/20 pt-8 max-w-4xl">
                                <p className="text-white/80 font-outfit text-sm md:text-base leading-relaxed max-w-md font-light">
                                    Pregnancy is one of the most profound and beautiful journeys of a woman’s life.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Written By</p>
                                        <p className="text-[#E8CBB6] font-display text-xl">Love & Nest Studio</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>


            <article className="bg-[#FAF9F6] relative z-10 px-6 md:px-12 py-24 md:py-32 overflow-hidden">
                {/* Decorative Big Background Letter */}
                <div className="absolute top-[5%] right-[-5%] text-[40vw] font-display text-[#5A2A45]/5 leading-none pointer-events-none select-none">
                    M
                </div>

                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

                    {/* Left Column: Sticky Navigation & Key Info */}
                    <div className="hidden lg:block lg:col-span-3 relative">
                        <div className="sticky top-32">
                            <span className="block w-8 h-[2px] bg-[#B77A8C] mb-6"></span>
                            <span className="block font-outfit text-xs font-bold uppercase tracking-widest text-[#5A2A45] mb-8">In This Article</span>

                            <nav className="space-y-6 font-outfit text-sm text-[#8F8A86]">
                                {['Ideal Timing', 'Defined Bump', 'Comfort & Energy', 'Posing & Safety', 'Joyful Experience', 'Styling'].map((item, i) => (
                                    <div key={i} className="group flex items-center gap-3 cursor-pointer hover:text-[#B77A8C] transition-colors">
                                        <span className="text-[10px] opacity-40">0{i + 1}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </div>
                                ))}
                            </nav>

                            <div className="mt-20 p-6 bg-white border border-[#E8CBB6]/40 rounded-sm">
                                <p className="font-serif italic text-[#5A2A45] text-lg mb-4">"Some journeys are meant to be remembered gently."</p>
                                <Link to="/contact" className="text-xs font-outfit font-bold uppercase tracking-widest text-[#B77A8C] hover:text-[#5A2A45] transition-colors border-b border-[#B77A8C]">Book Now</Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 lg:col-start-5 space-y-16">

                        {/* Intro */}
                        <SectionFade>
                            <p className="font-outfit text-xl md:text-2xl text-[#5A2A45]/80 leading-relaxed md:leading-loose">
                                <span className="float-left text-7xl md:text-8xl font-display text-[#B77A8C] mr-4 mt-[-20px] leading-[0.8]">P</span>
                                regnancy is one of the most profound and beautiful journeys of a woman’s life — a time filled with anticipation, transformation, and quiet strength. A maternity photoshoot is not just about photographs; it is about preserving this fleeting chapter with elegance, emotion, and grace. One of the most common questions expectant mothers ask is:
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl text-[#5A2A45] mt-12 mb-6 text-center italic">
                                "When is the best time for a maternity shoot?"
                            </h2>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed text-center max-w-2xl mx-auto">
                                Based on professional experience and maternal comfort, <strong className="text-[#5A2A45]">28 to 32 weeks</strong> of pregnancy is considered the most ideal window for a maternity photoshoot. Here’s why this phase offers the perfect balance of beauty, safety, and comfort.
                            </p>
                        </SectionFade>

                        <div className="w-full h-[1px] bg-[#E8CBB6]/30"></div>

                        {/* Point 1 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">1. A Beautifully Defined Baby Bump</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                    Between 28 and 32 weeks, the baby bump is perfectly visible and gracefully rounded. At this stage, the bump has a well-defined shape that photographs beautifully, creating timeless and elegant portraits without appearing overly heavy or uncomfortable.
                                </p>
                                <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-lg">
                                    <LazyImage src={bumpImg} alt="Defined baby bump" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </SectionFade>

                        {/* Point 2 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">2. Energy, Comfort & Confidence</h3>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                During this phase, most expecting mothers still feel energetic and emotionally balanced. You can stand, walk, and move comfortably, which allows for a relaxed and enjoyable shoot experience. Natural smiles, calm expressions, and confident poses come effortlessly when the body feels supported.
                            </p>
                        </SectionFade>

                        {/* Point 3 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">3. Lower Risk & Peace of Mind</h3>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                As pregnancy progresses, there is always a possibility of early delivery or sudden medical concerns, which may result in missing a planned shoot. Scheduling your maternity session between 28 and 32 weeks significantly reduces these risks and allows you to plan your shoot with peace of mind and assurance.
                            </p>
                        </SectionFade>

                        {/* Point 4 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">4. More Posing Options, Gracefully</h3>
                            <div className="relative mb-8">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#B77A8C]/20"></div>
                                <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed pl-6">
                                    This period allows you to explore a wide range of poses with ease:
                                </p>
                                <ul className="pl-6 mt-4 space-y-2 font-outfit text-[#5A2A45]">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B77A8C]"></span> Elegant standing poses
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B77A8C]"></span> Comfortable sitting poses
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B77A8C]"></span> Safe and relaxed lying-down poses
                                    </li>
                                </ul>
                            </div>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                Sitting and reclining poses are especially safe and strain-free, making them ideal for longer sessions. This flexibility enables the photographer to create a rich variety of artistic and luxurious images.
                            </p>
                        </SectionFade>


                        {/* Parallax Break */}
                        <div className="py-12">
                            <div className="w-full aspect-[21/9] overflow-hidden rounded-sm relative shadow-2xl">
                                <LazyImage src={stylingImg} alt="Artistic Styling" className="w-full h-full object-cover" />
                            </div>
                        </div>


                        {/* Point 5 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">5. A Joyful Experience — Not a Struggle</h3>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed mb-4">
                                In the later weeks of pregnancy (after 33–34 weeks), fatigue, back pain, swelling, and breathlessness often increase. At that point, many mothers feel the need to “just finish the shoot somehow.”
                            </p>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                However, when planned at the right time, your maternity shoot becomes an experience to cherish — unhurried, calm, and truly enjoyable.
                            </p>
                        </SectionFade>

                        {/* Point 6 */}
                        <SectionFade>
                            <h3 className="font-display text-3xl text-[#5A2A45] mb-4">6. Styling Looks More Elegant & Effortless</h3>
                            <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed">
                                From flowing gowns to draped silhouettes, outfits sit beautifully on the body during this stage. Styling feels effortless, fittings are more comfortable, and experimenting with premium fabrics and silhouettes becomes easier — adding a refined, editorial touch to your photographs.
                            </p>
                        </SectionFade>

                        <div className="w-full h-[1px] bg-[#E8CBB6]/30 my-8"></div>


                        {/* Author Note */}
                        <SectionFade>
                            <div className="bg-white p-10 md:p-12 shadow-xl border border-[#E8CBB6]/20 relative overflow-hidden rounded-sm">
                                <div className="relative z-10">
                                    <h4 className="font-display text-2xl text-[#5A2A45] mb-4">A Note from Love & Nest Studio by Anamika</h4>
                                    <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed italic">
                                        At Love & Nest Studio by Anamika, we believe maternity photography is an art — one that honours motherhood with softness, strength, and refined elegance. Every session is thoughtfully designed to ensure comfort, safety, and a calm, luxurious experience, allowing you to simply be present in this beautiful phase of life.
                                    </p>
                                </div>
                            </div>
                        </SectionFade>

                        {/* Final Note */}
                        <SectionFade>
                            <div className="my-12">
                                <p className="font-outfit text-[#5A2A45] text-xl leading-relaxed text-center font-light">
                                    A maternity photoshoot is a quiet celebration of motherhood — of grace, resilience, and the miracle of new life. Choosing the right time ensures this celebration is captured effortlessly, without haste or discomfort.
                                </p>
                                <p className="font-outfit text-[#8F8A86] text-lg leading-relaxed text-center mt-6">
                                    For mothers who seek a serene, safe, and truly magazine-worthy maternity photography experience, 28 to 32 weeks remains the most exquisite time — when you feel radiant, confident, and free to enjoy every moment.
                                </p>
                                <p className="text-center mt-8 font-serif text-[#B77A8C] text-xl italic">
                                    ✨ At Love & Nest Studio by Anamika, we capture not just photographs — we preserve emotions, beautifully and forever.
                                </p>
                            </div>
                        </SectionFade>


                        {/* Call to Action */}
                        <SectionFade>
                            <div className="bg-[#5A2A45] text-white p-12 md:p-16 text-center rounded-sm shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="relative z-10">
                                    <h3 className="font-display text-3xl md:text-5xl mb-6">For mothers who value grace over haste.</h3>
                                    <p className="font-outfit text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                                        If this season of motherhood speaks to you, we would love to preserve it with care and intention. Each session begins not with a booking form, but with a quiet conversation.
                                    </p>
                                    <p className="font-outfit text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                                        If you feel drawn to preserving this chapter in a refined, unhurried way, you’re welcome to connect with us and explore what feels right for you.
                                    </p>

                                    <h4 className="font-display text-2xl text-[#E8CBB6] mb-10 italic">
                                        ✨ Some journeys are meant to be remembered gently.
                                    </h4>

                                    <Link to="/contact">
                                        <button className="px-10 py-5 bg-white text-[#5A2A45] font-outfit uppercase tracking-widest text-sm hover:bg-[#E8CBB6] transition-colors rounded-full shadow-lg">
                                            Start a Conversation
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SectionFade>




                    </div>
                </div>
            </article>
        </>
    );
};

export default BestTimeMaternityPost;
