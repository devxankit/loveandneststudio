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

    return (
        <>
            <SEO
                title="Baby Photography | Love & Nest Studio"
                description="Adorable baby photography capturing growing milestones and precious moments of your little one."
                keywords="baby photography, infant photos, baby photoshoot, milestone photos"
            />

            <div className="relative min-h-screen bg-[#FDFBF7] font-outfit text-[#4A4A4A] overflow-x-hidden pb-32">

                {/* Background Image with Blur */}
                <div className="absolute inset-0 z-0 h-screen">
                    <LazyImage
                        src={heroImg}
                        className="w-full h-full object-cover opacity-10 blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-white/60" />
                </div>

                {/* Animated Grain Overlay */}
                <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.05] mix-blend-multiply"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* 1. COMING SOON SECTION */}
                <section className="relative z-10 min-h-[80vh] flex items-center justify-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-2xl mx-6"
                    >
                        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-12 md:p-20 rounded-full md:rounded-[4rem] text-center shadow-xl relative overflow-hidden group">

                            {/* Decorative Shine */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

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

                            {/* Floating Dots */}
                            <motion.div
                                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-10 right-14 w-3 h-3 rounded-full bg-[#B77A8C]/30"
                            />
                        </div>
                    </motion.div>
                </section>


                {/* 2. SNEAK PEEK PUZZLE GRID */}
                <section className="relative z-10 px-4 md:px-8 -mt-20">
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
