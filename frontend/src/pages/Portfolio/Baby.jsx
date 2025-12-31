import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Hero Image
import heroImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153410.png';

// Grid Images (Re-importing for the grid)
import img1 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import img2 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153305.png';
import img3 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153316.png';
import img4 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import img5 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153332.png';
import img6 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153401.png';

const Baby = () => {

    const images = [img1, img2, img3, img4, img5, img6, img1, img3, img5]; // Duplicated for scroll length

    // Unique Puzzle Grid Layout Configuration
    // span represents the size (1x1 or 2x2 blocks) to mimic the reference cloud shape
    const puzzleLayout = [
        { img: img1, span: 1, rounded: 'rounded-tl-2xl' },
        { img: img2, span: 2, rounded: 'rounded-tr-lg' },
        { img: img3, span: 1, rounded: '' },
        { img: img4, span: 1, rounded: '' },
        { img: img5, span: 2, rounded: '' },
        { img: img6, span: 1, rounded: 'rounded-tr-3xl' },

        { img: img2, span: 1, rounded: 'rounded-bl-lg' },
        { img: img1, span: 2, rounded: '' },
        { img: img6, span: 2, rounded: '' },
        { img: img5, span: 1, rounded: '' },
        { img: img4, span: 1, rounded: 'rounded-br-xl' },

        { img: img3, span: 2, rounded: 'rounded-bl-3xl' },
        { img: img5, span: 1, rounded: '' },
        { img: img1, span: 2, rounded: 'rounded-br-2xl' },
        { img: img2, span: 1, rounded: '' },
    ];

    // Infinite Scroll Column Component
    const InfiniteColumn = ({ speed, offset }) => {
        return (
            <div className="relative overflow-hidden h-[150vh] flex flex-col gap-6 w-full -mt-20 opacity-80 mix-blend-multiply">
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ y: 0 }}
                    animate={{ y: "-50%" }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {[...images, ...images, ...images].map((img, i) => (
                        <div key={i} className="relative group w-full p-2">
                            {/* Backing Card with Color */}
                            <div
                                className="absolute inset-0 transform rotate-2 rounded-xl"
                                style={{ backgroundColor: i % 2 === 0 ? '#F3EFE0' : '#E8E4D9' }} // Subtle contrast for backing
                            ></div>

                            {/* Image Container */}
                            <div className="relative overflow-hidden rounded-lg shadow-sm transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                <LazyImage
                                    src={img}
                                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        );
    };

    return (
        <>
            <SEO
                title="Baby Photography | Love & Nest Studio"
                description="Adorable baby photography capturing growing milestones and precious moments of your little one."
                keywords="baby photography, infant photos, baby photoshoot, milestone photos"
            />

            <div className="relative min-h-screen bg-[#FDFBF7] font-outfit text-[#4A4A4A] overflow-x-hidden pb-32">


                {/* Animated Grain Overlay */}
                <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.05] mix-blend-multiply"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* 1. SCROLLING BACKGROUND LAYER */}
                <div className="absolute top-0 left-0 right-0 h-[75vh] overflow-hidden flex gap-4 md:gap-8 justify-center px-2 md:px-0 z-0">
                    <div className="hidden md:block w-1/4 pt-10">
                        <InfiniteColumn speed={35} offset={0} />
                    </div>
                    <div className="w-1/2 md:w-1/4 pt-0">
                        <InfiniteColumn speed={45} offset={-20} />
                    </div>
                    <div className="w-1/2 md:w-1/4 pt-20">
                        <InfiniteColumn speed={30} offset={20} />
                    </div>
                    <div className="hidden md:block w-1/4 pt-5">
                        <InfiniteColumn speed={40} offset={-10} />
                    </div>

                    {/* Strong Gradient Fade at the Bottom to Blend images 'up to here' */}
                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10" />
                </div>

                {/* 1. COMING SOON SECTION */}
                <section className="relative z-10 min-h-[60vh] flex items-center justify-center pt-10 md:pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-2xl mx-6 text-center"
                    >
                        {/* Text Content - No Container */}
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="block text-sm md:text-base uppercase tracking-[0.4em] mb-4 text-[#B77A8C] font-medium">
                                Something Beautiful
                            </span>
                        </motion.div>

                        <h1 className="font-display text-5xl md:text-7xl text-[#4A4A4A] mb-6 leading-tight">
                            Coming <br /> <span className="italic text-[#B77A8C]">Soon</span>
                        </h1>

                        <p className="font-outfit font-light text-gray-600 tracking-wide max-w-md mx-auto">
                            We are curating a gallery of tiny miracles and sweet moments.
                        </p>
                    </motion.div>
                </section>

                {/* 2. WELCOME / ICE BREAKER SECTION */}
                <section className="relative z-10 w-full bg-[#FAFAFA] py-20 overflow-hidden">
                    {/* Background Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fcece9] rounded-l-[50%] opacity-40 pointer-events-none" />

                    <div className="max-w-6xl mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">

                        {/* LEFT COLUMN: Polaroid Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                            <div className="relative">
                                {/* Yellow Backing Rectangle */}
                                <div className="absolute top-4 -right-4 w-full h-full bg-[#E8C547] rounded-sm transform rotate-6 z-0" />

                                {/* Photo Frame */}
                                <div className="relative bg-white p-3 pb-12 shadow-xl transform -rotate-3 z-10 w-[280px] md:w-[350px]">
                                    <LazyImage
                                        src={img4}
                                        alt="Baby Profile"
                                        className="w-full aspect-[4/5] object-cover grayscale-[20%]"
                                    />
                                    {/* Tape / Sticker decoration could go here */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E5E5E5]/50 backdrop-blur-sm border border-white/40" />
                                </div>

                                {/* Floating Star Icon (Decorative) */}
                                <svg className="absolute -bottom-8 -left-8 w-8 h-8 text-[#D4AF37] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Text Content */}
                        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="font-handwriting text-3xl md:text-5xl text-[#4A4A4A] block mb-2 rotate-[-2deg]">
                                    welcome!
                                </span>

                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight">
                                    Let's break the ice
                                </h2>
                            </motion.div>

                            <p className="font-outfit text-gray-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                I'm the photographer behind Love & Nest. A storyteller of tiny toes, sleepy yawns, and the quiet, fierce love of new parenthood.
                                <br /><br />
                                I'm that friend who will coo over your baby for hours and probably cry a little behind the lens when capturing that perfect family hug.
                            </p>

                            <div className="pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#E8C547] text-[#1a1a1a] font-bold text-sm uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto md:mx-0"
                                >
                                    My Full Adventure
                                    <span className="text-lg">→</span>
                                </motion.button>
                            </div>

                            {/* Logos / Social Proof placeholders */}
                            <div className="flex gap-6 justify-center md:justify-start pt-8 opacity-50 grayscale">
                                <div className="h-6 w-20 bg-gray-400/20 rounded"></div>
                                <div className="h-6 w-20 bg-gray-400/20 rounded"></div>
                                <div className="h-6 w-20 bg-gray-400/20 rounded"></div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* 2. SNEAK PEEK PUZZLE GRID */}
                <section className="relative z-10 px-4 md:px-8 mt-12 md:mt-24">
                    <div className="text-center mb-12">
                        <p className="uppercase tracking-[0.3em] text-xs text-[#B77A8C]">Sneak Peek</p>
                    </div>

                    <div className="max-w-5xl mx-auto grid grid-cols-4 md:grid-cols-8 gap-2 pb-20">
                        {puzzleLayout.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    relative group perspective-1000 cursor-pointer aspect-square
                                    ${item.span === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
                                `}
                            >
                                {/* FLIP CONTAINER */}
                                <div className="w-full h-full duration-700 preserve-3d group-hover:[transform:rotateX(180deg)] relative">

                                    {/* FRONT SIDE (Image) */}
                                    <div className={`
                                        absolute inset-0 backface-hidden w-full h-full overflow-hidden bg-white shadow-sm
                                        ${item.rounded}
                                    `}>
                                        <LazyImage src={item.img} className="w-full h-full object-cover" />
                                        {/* Optional Overlay to hint interaction */}
                                        <div className="absolute inset-0 bg-[#B77A8C]/0 group-hover:bg-[#B77A8C]/10 transition-colors" />
                                    </div>

                                    {/* BACK SIDE (Logo/Text) */}
                                    <div className={`
                                        absolute inset-0 backface-hidden w-full h-full [transform:rotateX(180deg)]
                                        bg-[#B77A8C] flex items-center justify-center text-white
                                        ${item.rounded}
                                    `}>
                                        <div className="text-center p-2">
                                            {item.span === 2 ? (
                                                <>
                                                    <span className="font-display text-2xl md:text-3xl block">Love</span>
                                                    <span className="font-display text-2xl md:text-3xl block">& Nest</span>
                                                </>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inline Styles for Tailwind Flip config if needed, though [transform:rotateX] is used */}
                <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .backface-hidden { backface-visibility: hidden; }
                `}</style>
            </div>
        </>
    );
};

export default Baby;
