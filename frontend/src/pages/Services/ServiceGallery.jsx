import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Images
import mat1 from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import nb1 from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import nb2 from '../../assets/images/hero/Screenshot 2025-12-30 141756.png';
import baby1 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import baby2 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import baby3 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153353.png';
import fam1 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';
import fam2 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import celebration1 from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import lifestyle1 from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153353.png';
import cs1 from '../../assets/images/hero/Screenshot 2025-12-30 141842.png';
import cs2 from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';

// --- ANIMATIONS ---
const elegantFade = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(5px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
};
const cozySlide = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "circOut" } }
};
const playfulPop = {
    hidden: { opacity: 0, scale: 0.8, rotate: -2 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 10 } }
};
const warmStagger = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const getContainerVariant = (type) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: type === 'playful' ? { staggerChildren: 0.1, delayChildren: 0.2 } : { staggerChildren: 0.25, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.4 } }
});


// --- COMPACT & PROPER GRIDS ---

// 1. Balanced Grid (Maternity/Family)
// Responsive: Stack on mobile (Main top, 2 subs bottom), 5-col split on desktop.
const BalancedGrid = ({ images, animVariant }) => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 max-w-3xl mx-auto h-auto md:h-[350px]">
        {/* Main Featured Image */}
        <motion.div variants={animVariant} className="col-span-2 md:col-span-3 h-[200px] md:h-full rounded-xl overflow-hidden shadow-sm relative group">
            <div className="w-full h-full relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}
                    src={images[0]} alt="Gallery Main" className="w-full h-full object-cover object-top"
                />
            </div>
        </motion.div>

        {/* Side Stack */}
        <div className="col-span-2 md:col-span-2 flex flex-row md:flex-col gap-2 md:gap-3 h-[120px] md:h-full">
            <motion.div variants={animVariant} className="flex-1 rounded-xl overflow-hidden shadow-sm group relative">
                <motion.img
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}
                    src={images[1] || images[0]} alt="Gallery Side 1" className="w-full h-full object-cover center"
                />
            </motion.div>
            <motion.div variants={animVariant} className="flex-1 rounded-xl overflow-hidden shadow-sm group relative">
                <motion.img
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}
                    src={images[2] || images[0]} alt="Gallery Side 2" className="w-full h-full object-cover center"
                />
            </motion.div>
        </div>
    </div>
);

// 2. Compact Mosaic (Newborn)
// Responsive: 2x2 grid on mobile, 1x4 on desktop.
const CompactMosaic = ({ images, animVariant }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto h-auto md:h-[280px]">
        {images.slice(0, 4).map((img, i) => (
            <motion.div key={i} variants={animVariant} className="col-span-1 h-[140px] md:h-full rounded-xl overflow-hidden shadow-sm group">
                <motion.img
                    whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}
                    src={img || images[0]} alt={`Detail ${i}`} className="w-full h-full object-cover object-center"
                />
            </motion.div>
        ))}
    </div>
);

// 3. CompactStrip (Baby)
// Responsive: 3-col grid on mobile (wraps), Flex row on desktop.
const CompactStrip = ({ images, animVariant }) => (
    <div className="grid grid-cols-3 md:flex gap-2 md:gap-3 justify-center items-center max-w-4xl mx-auto px-2">
        {images.slice(0, 5).map((img, i) => (
            <motion.div
                key={i}
                variants={animVariant}
                className="col-span-1 md:flex-1 h-[100px] md:h-[180px] rounded-xl overflow-hidden shadow-sm cursor-pointer group relative border-2 border-white bg-white"
            >
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply pointer-events-none"></div>
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={img || images[0]} alt="Wave" className="w-full h-full object-cover"
                />
            </motion.div>
        ))}
    </div>
);

// 4. Photo Wall (Cake Smash / Lifestyle)
// Responsive: 2 cols on mobile, 3 on desktop.
const PhotoWall = ({ images, animVariant }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-4xl mx-auto">
        {images.slice(0, 6).map((img, i) => (
            <motion.div key={i} variants={animVariant} className="col-span-1 aspect-[3/4] rounded-xl overflow-hidden shadow-sm group">
                <div className="relative h-full w-full">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={img} alt={`Wall ${i}`} className="w-full h-full object-cover"
                    />
                    {i === 1 && (
                        <div className="absolute top-2 right-2 text-white/80">
                            <Sparkles size={16} />
                        </div>
                    )}
                </div>
            </motion.div>
        ))}
    </div>
);


const ServiceGallery = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Data Configuration
    const galleryData = {
        'maternity': {
            title: "Maternity",
            subtitle: "Embracing Motherhood",
            description: "Timeless portraits celebrating the beauty of expectance.",
            component: BalancedGrid,
            animation: elegantFade,
            animType: 'elegant',
            images: [mat1, mat1, mat1, mat1, mat1]
        },
        'newborn': {
            title: "Newborn",
            subtitle: "The First Days",
            description: "Pure, safe, and sleepy moments of your brand new addition.",
            component: CompactMosaic,
            animation: cozySlide,
            animType: 'cozy',
            images: [nb1, nb2, nb1, nb2, nb1]
        },
        'baby': {
            title: "Baby Milestones",
            subtitle: "Growing So Fast",
            description: "Capturing the magic of sitters, crawlers, and first steps.",
            component: CompactStrip,
            animation: playfulPop,
            animType: 'playful',
            images: [baby1, baby2, baby3, baby1, baby2]
        },
        'cakesmash': {
            title: "Cake Smash",
            subtitle: "Smash & Splash",
            description: "Messy, joyful, and colorful first birthday celebrations.",
            component: PhotoWall,
            animation: playfulPop,
            animType: 'playful',
            images: [baby2, cs1, baby3, baby2, cs2, baby1]
        },
        'family': {
            title: "Family",
            subtitle: "Bond & Connection",
            description: "Genuine moments of love shared between generations.",
            component: BalancedGrid,
            animation: warmStagger,
            animType: 'warm',
            images: [fam1, fam2, fam1, fam2, fam1]
        },
        'lifestyle': {
            title: "Lifestyle",
            subtitle: "At Home",
            description: "Unposed, authentic storytelling in your natural element.",
            component: PhotoWall,
            animation: cozySlide,
            animType: 'cozy',
            images: [lifestyle1, baby3, nb2, baby2, lifestyle1, lifestyle1]
        },
        'babyshower': {
            title: "Baby Shower",
            subtitle: "Celebration",
            description: "Event coverage for your special welcoming day.",
            component: PhotoWall,
            animation: warmStagger,
            animType: 'warm',
            images: [celebration1, fam1, mat1, fam2, celebration1, fam1]
        }
    };

    const data = galleryData[id] || galleryData['maternity'];
    const GridComponent = data.component;
    const selectedAnimation = data.animation;

    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            key={id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={getContainerVariant(data.animType)}
            className="min-h-screen bg-[#FDFBF7] pt-20 md:pt-28 pb-10 md:pb-16 overflow-x-hidden"
        >
            {/* Background elements (Very subtle) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {data.animType === 'playful' && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-20 right-20 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl"
                    />
                )}
                {data.animType === 'elegant' && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B77A8C]/5 to-transparent opacity-50"></div>
                )}
            </div>

            <div className="max-w-4xl mx-auto px-6 mb-8 md:mb-10 relative z-10 flex flex-col items-center text-center">
                <motion.div variants={textVariant}>
                    <Link to="/services" className="inline-flex items-center gap-2 text-[#6E5A52] hover:text-[#5A2A45] font-medium text-[9px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 transition-colors border-b border-transparent hover:border-[#5A2A45] pb-1">
                        <ArrowLeft size={10} className="md:w-3 md:h-3" /> Back to Services
                    </Link>
                </motion.div>

                <motion.h1 variants={textVariant} className="font-display text-2xl md:text-5xl text-[#5A2A45] mb-2 leading-tight">
                    {data.title}
                </motion.h1>
                <motion.p variants={textVariant} className="text-[#B77A8C] font-display italic text-base md:text-xl mb-3 md:mb-4">
                    {data.subtitle}
                </motion.p>
                <motion.p variants={textVariant} className="max-w-lg text-[#6E5A52] font-outfit font-light text-xs md:text-base leading-relaxed px-4 md:px-0">
                    {data.description}
                </motion.p>
            </div>

            {/* Gallery Grid Section */}
            <div className="relative z-10 px-4 mb-16">
                <GridComponent images={data.images} animVariant={selectedAnimation} />
            </div>

            <motion.div variants={textVariant} className="text-center relative z-10">
                <div className="inline-block p-1 rounded-full border border-[#5A2A45]/10 bg-white shadow-sm">
                    <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2 bg-[#5A2A45] text-[#F1EBDD] rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#411f32] transition-colors group">
                        Book Session
                        <Sparkles size={12} className="group-hover:text-yellow-200 transition-colors" />
                    </Link>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default ServiceGallery;
