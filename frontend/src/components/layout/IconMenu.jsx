import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const IconMenu = () => {
    const icons = [
        {
            id: 1,
            label: "ABOUT",
            path: "/about",
            // Icon: Baby in a flower/wreath (line art sytle)
            svgPath: (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            ),
            // Replacing simplistic path with a more artistic approximation in specific implementation below if needed, 
            // but for "unique" look I will use a set of custom refined paths in the render.
            customSvg: (
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                    {/* Abstract Baby in Wreath */}
                    <path d="M50 20C35 20 25 35 25 50C25 70 40 85 60 85C75 85 85 70 85 55" className="opacity-50" />
                    <path d="M40 35C35 40 35 50 40 55C45 60 55 60 60 55" />
                    <path d="M60 30C70 35 75 45 70 60" />
                    <circle cx="50" cy="45" r="8" />
                    <path d="M45 55Q50 65 65 60" />
                    {/* Leaves */}
                    <path d="M25 50 Q15 40 20 30 M85 55 Q95 45 90 35" className="opacity-40" />
                </svg>
            )
        },
        {
            id: 2,
            label: "GALLERY",
            path: "/portfolio",
            // Icon: Hands holding feet
            customSvg: (
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                    {/* Hands */}
                    <path d="M20 60 C20 60 30 75 50 75 C70 75 80 60 80 60" />
                    <path d="M20 60 C15 50 25 40 35 50" />
                    <path d="M80 60 C85 50 75 40 65 50" />
                    {/* Baby Feet inside */}
                    <path d="M40 55 C35 50 40 40 45 42 C48 43 45 55 45 55" />
                    <path d="M55 55 C60 50 55 40 50 42 C47 43 50 55 50 55" />
                </svg>
            )
        },
        {
            id: 3,
            label: "BLOG",
            path: "/blog",
            // Icon: Sleeping Baby
            customSvg: (
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                    {/* Sleeping Baby Curve */}
                    <path d="M30 60 C30 50 40 40 50 40 C65 40 75 55 75 65" />
                    <path d="M30 60 C25 65 35 75 50 75 C60 75 70 70 75 65" />
                    {/* Head */}
                    <circle cx="45" cy="50" r="10" />
                    {/* Closed Eye */}
                    <path d="M42 50 Q45 52 48 50" />
                    {/* Star details */}
                    <path d="M60 30 L62 35 L67 35 L63 38 L65 43 L60 40 L55 43 L57 38 L53 35 L58 35 Z" className="scale-50 origin-center opacity-60" />
                </svg>
            )
        },
        {
            id: 4,
            label: "CONTACT",
            path: "/contact",
            // Icon: Mom holding baby
            customSvg: (
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                    {/* Mom Hair/Head */}
                    <path d="M60 35 C60 30 55 25 50 25 C45 25 45 35 45 40" />
                    <path d="M60 35 C65 40 65 55 55 60" />
                    {/* Body */}
                    <path d="M45 40 C40 50 35 60 35 80" />
                    <path d="M55 60 C60 65 65 75 65 80" />
                    {/* Baby in arms */}
                    <path d="M45 55 C45 55 50 60 55 55" />
                    <circle cx="50" cy="52" r="5" />
                </svg>
            )
        },
        {
            id: 5,
            label: "FAMILY",
            path: "/portfolio/family",
            // Icon: Abstract Family Line Art
            customSvg: (
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                    {/* Father */}
                    <path d="M35 40 C35 30 45 30 45 40 C45 50 40 60 30 75" />
                    {/* Mother */}
                    <path d="M65 45 C65 35 55 35 55 45 C55 55 60 60 70 75" />
                    {/* Child between */}
                    <path d="M45 60 C45 60 50 55 55 60 C55 65 50 70 45 70" />
                    <circle cx="50" cy="55" r="4" />
                </svg>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="w-full py-20 bg-[#FFFCF8] relative overflow-hidden">
            {/* Noise Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-[1200px] mx-auto px-6"
            >
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-0">
                    {icons.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="flex flex-col items-center gap-6 group cursor-pointer w-[140px]"
                        >
                            <Link to={item.path} className="flex flex-col items-center gap-6 no-underline text-inherit w-full">
                                <div className="w-24 h-24 md:w-32 md:h-32 relative text-[#8F8A86] transition-all duration-500 group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-2">
                                    <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 stroke-[1px]">
                                        {item.customSvg}
                                    </div>
                                </div>
                                <span className="font-outfit text-sm tracking-[0.25em] uppercase text-[#8F8A86] group-hover:text-primary transition-colors duration-300 border-b border-transparent group-hover:border-primary/30 pb-1">
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </section>
    );
};

export default IconMenu;
