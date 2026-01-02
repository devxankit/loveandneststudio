import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';


// Import images
import maternityImg from '../../assets/images/portfolio/maternity/Screenshot 2026-01-01 225737.png';
import newbornImg from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import babyImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153257.png';
import cakeSmashImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153323.png';
import familyImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 111323.png';
import celebrationImg from '../../assets/images/portfolio/family/Screenshot 2025-12-31 120803.png';
import lifestyleImg from '../../assets/images/portfolio/baby/Screenshot 2025-12-31 153353.png';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Services = () => {
    const services = [
        {
            title: "Maternity Photography",
            description: "Soft, soulful portraits that celebrate motherhood, love, and the beautiful bond between parents and baby—before your little one arrives.",
            image: maternityImg,
            alt: "Maternity Photography"
        },
        {
            title: "Newborn Photography (5–25 Days)",
            description: "Gentle, cozy newborn sessions designed with safety and comfort at the heart. Natural poses, minimal props, and timeless imagery you’ll cherish forever.",
            image: newbornImg,
            alt: "Newborn Photography"
        },
        {
            title: "Baby Milestone Photography",
            description: "3 Months • 6 Months • 9 Months • 1 Year. From tiny smiles to first steps, we capture every beautiful milestone as your baby grows—one precious stage at a time.",
            image: babyImg,
            alt: "Baby Milestone Photography"
        },
        {
            title: "Cake Smash Photography",
            description: "Fun, colorful, and joy-filled first birthday shoots. Let your baby explore, play, and celebrate while we capture the magic (and the mess!).",
            image: cakeSmashImg,
            alt: "Cake Smash Photography"
        },
        {
            title: "Family & Parent-Baby Portraits",
            description: "Warm, timeless family portraits that reflect genuine connections, love, and togetherness—perfect for generations to treasure.",
            image: familyImg,
            alt: "Family Portraits"
        },
        {
            title: "Baby Shower & Naming Ceremony",
            description: "A blend of candid emotions and posed moments, beautifully documenting your special celebrations and cultural traditions.",
            image: celebrationImg,
            alt: "Baby Shower Coverage"
        },
        {
            title: "Lifestyle Baby Photography",
            description: "Natural, story-driven sessions focusing on real emotions, tiny details, and everyday moments—captured in a relaxed, organic style.",
            image: lifestyleImg,
            alt: "Lifestyle Baby Photography"
        }
    ];

    const addOns = [
        "Luxury Photo Albums",
        "Fine Art Frames & Wall Prints",
        "High-Resolution Digital Images",
        "Customized Props & Creative Themes",
        "Studio & Outdoor Shoot Options"
    ];

    const features = [
        {
            title: "Calm Environment",
            description: "Baby-friendly studio atmosphere designed for peace and comfort."
        },
        {
            title: "Safety First",
            description: "Strict hygiene protocols and safety-first approach for your little ones."
        },
        {
            title: "Personalized Styling",
            description: "We provide gentle posing guidance and styling to suit your vision."
        },
        {
            title: "Natural Editing",
            description: "Emotion-focused photography with minimal, timeless editing."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Our Services | Love & Nest"
                description="Professional photography services including newborn, maternity, baby milestone, cake smash, and family portraits. Preserving memories that last a lifetime."
            />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden bg-[#FDFBF7]">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -left-[10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] -right-[10%] w-[60vh] h-[60vh] bg-[#E8CBB6]/30 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-[20%] left-[20%] w-[40vh] h-[40vh] bg-primary-light/30 rounded-full blur-[80px]"
                    />
                </div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center gap-4">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-primary-dark tracking-[0.3em] font-medium uppercase text-sm">Timeless Memories</span>
                            <span className="h-[1px] w-12 bg-primary"></span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 text-primary-dark leading-[1.1]"
                        >
                            Our Photography <br className="hidden sm:block" />
                            <span className="italic text-primary font-light">Services</span>
                        </motion.h1>

                        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto space-y-6 md:space-y-8">
                            <p className="font-outfit text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0">
                                We craft visual stories of your family's journey. From the first heartbeat to the first steps, we are there to capture it all with <span className="text-primary-dark font-normal">love, grace, and artistry.</span>
                            </p>

                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-dark/50"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary-dark/0 via-primary-dark/50 to-primary-dark/0 mx-auto"></div>
                    <span className="text-[10px] uppercase tracking-widest mt-2 block">Scroll</span>
                </motion.div>
            </section>

            {/* Main Services List - Grid Layout */}
            <section className="py-20 px-4 md:px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col group w-[calc(50%-8px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-20px)]"
                        >
                            {/* Image Container */}
                            <div className="relative mb-4 overflow-hidden rounded-xl shadow-md aspect-[4/5] w-full">
                                <img
                                    src={service.image}
                                    alt={service.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Hover Overlay Context */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-white/90 text-primary-dark rounded-full text-sm font-medium tracking-wide shadow-lg"
                                    >
                                        View Gallery
                                    </motion.button>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center space-y-2 md:space-y-3 px-1 md:px-2">
                                <h2 className="font-display text-sm md:text-lg font-bold text-primary-dark group-hover:text-primary transition-colors duration-300 leading-tight">
                                    {service.title}
                                </h2>
                                <div className="w-12 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
                                <p className="font-outfit text-gray-500 text-xs leading-relaxed font-light line-clamp-2 mix-blend-multiply group-hover:line-clamp-none transition-all duration-300">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Premium Add-Ons Section - Boutique Style */}
            <section className="py-28 px-6 lg:px-12 relative overflow-hidden bg-[#FEFDFB]">
                {/* Dynamic Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,203,182,0.15)_0%,rgba(255,255,255,0)_70%)] translate-x-1/3 -translate-y-1/3"
                    ></motion.div>
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(183,122,140,0.1)_0%,rgba(255,255,255,0)_70%)] -translate-x-1/3 translate-y-1/3"
                    ></motion.div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24 px-4 sm:px-0"
                    >
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-primary-dark mb-4 tracking-tight">
                            The <span className="italic font-light text-primary">Luxury</span> Experience
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-lg font-light tracking-wide uppercase text-[0.7rem] sm:text-[0.8rem]">
                            Exquisite Additions • Heirloom Quality • Timeless
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0"
                    >
                        {[
                            {
                                title: "Heirloom Albums",
                                subtitle: "Handcrafted in Italy",
                                description: "Thick, museum-grade paper bound in luxury linen or leather. Designed to tell your story for generations.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                )
                            },
                            {
                                title: "Wall Art Gallery",
                                subtitle: "Museum Quality",
                                description: "Turn your home into a gallery. Custom framing with archival mats and non-glare glass.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Digital Reserves",
                                subtitle: "High-Res Films",
                                description: "Full resolution digital negatives on a crystal USB, meticulously retouched and ready for print.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Bespoke Styling",
                                subtitle: "Couture Wardrobe",
                                description: "Access to our curated client closet featuring designer gowns and premium fabrics for that perfect look.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Scenic Locations",
                                subtitle: "Studio & Outdoor",
                                description: "From our sun-drenched sanctuary studio to exclusive private outdoor locations.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Artistic Retouching",
                                subtitle: "Bespoke Finishing",
                                description: "Every selected image undergoes our signature hand-retouching process for a painterly finish.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                )
                            }
                        ].map((addon, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white p-4 sm:p-6 md:p-10 rounded-[1.2rem] md:rounded-[2rem] border border-[#F0EAE6] hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(90,42,69,0.1)] flex flex-col items-center text-center overflow-hidden w-[calc(50%-8px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-24px)]"
                            >
                                {/* Decorative Corner Gradient */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-[#FCECEE] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                {/* Icon Container */}
                                <div className="relative mb-4 sm:mb-6 md:mb-8">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                                    <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border border-primary/20 flex items-center justify-center text-primary-dark group-hover:bg-[#FDFBF7] group-hover:border-primary/50 transition-all duration-500">
                                        <div className="w-[calc(100%-4px)] sm:w-[calc(100%-6px)] md:w-[calc(100%-8px)] h-[calc(100%-4px)] sm:h-[calc(100%-6px)] md:h-[calc(100%-8px)] rounded-full border border-dashed border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                                            {addon.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
                                    <div>
                                        <h3 className="font-display text-sm sm:text-lg md:text-2xl text-primary-dark mb-1">{addon.title}</h3>
                                        <span className="text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-primary font-medium">{addon.subtitle}</span>
                                    </div>
                                    <div className="w-8 h-[1px] bg-gray-200 mx-auto group-hover:bg-primary/50 group-hover:w-16 transition-all duration-500"></div>
                                    <p className="font-outfit text-gray-500 text-xs leading-relaxed font-light">
                                        {addon.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            {/* Why Choose Us - Ultra Premium Aesthetic */}
            <section className="py-32 px-6 lg:px-12 relative overflow-hidden bg-[#FCF9F7]">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#E8CBB6]/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <span className="text-primary text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-semibold mb-4 block">The Love & Nest Difference</span>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-primary-dark mb-6 tracking-tight">
                            Why <span className="italic font-light">Choose</span> Us
                        </h2>
                        <div className="w-12 h-[1px] bg-primary-dark/20 mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-12">
                        {[
                            {
                                title: "Calm Environment",
                                description: "A sun-drenched, temperature-controlled sanctuary studio designed for your baby's comfort.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 115.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
                                    </svg>
                                )
                            },
                            {
                                title: "Safety First",
                                description: "Posing with peace of mind. Trained professional handling with medical-grade hygiene standards.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Artistic Posing",
                                description: "Gentle guidance that feels natural, capturing your family’s unique soul and connection.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                )
                            },
                            {
                                title: "Archival Quality",
                                description: "Advanced hand-retouching and museum-grade prints that stand the test of time.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="relative group"
                            >
                                {/* Decorative Number */}
                                <span className="absolute -top-10 -left-4 text-6xl font-display text-primary/5 select-none transition-colors duration-500 group-hover:text-primary/10">
                                    0{index + 1}
                                </span>

                                <div className="relative">
                                    <div className="mb-8 relative">
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-primary/10 flex items-center justify-center text-primary-dark group-hover:bg-primary transition-all duration-500 group-hover:text-white group-hover:shadow-[0_15px_30px_-10px_rgba(90,42,69,0.2)] group-hover:-translate-y-1">
                                            {feature.icon}
                                        </div>
                                        {/* Corner Accent */}
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-right border-primary/20 transition-all duration-500 group-hover:border-primary group-hover:w-full group-hover:h-full group-hover:-bottom-2 group-hover:-right-2 -z-10 rounded-br-lg"></div>
                                    </div>

                                    <h3 className="font-display text-xl mb-4 text-primary-dark tracking-tight">{feature.title}</h3>
                                    <div className="w-8 h-[1px] bg-primary mb-4 origin-left transition-all duration-500 group-hover:w-16"></div>
                                    <p className="font-outfit text-gray-500 text-sm leading-relaxed font-light">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Slogan Footer */}
            <section className="py-16 md:py-24 px-6 bg-primary-dark text-white text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="font-display text-xl sm:text-2xl md:text-4xl leading-snug italic opacity-90 mb-8 px-4 sm:px-0">
                        "At Love & Nest, we don’t just take photographs—we preserve love, emotions, and memories that last a lifetime."
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            to="/contact"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-primary-dark font-display font-medium text-base md:text-lg rounded-full tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            Book Your Session
                        </Link>
                    </motion.div>

                </motion.div>
            </section>
        </div>
    );
};

export default Services;
