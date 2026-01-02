import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../../assets/logo/Gemini_Generated_Image_adt2l4adt2l4adt2-removebg-preview.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const togglePortfolio = () => {
        setIsPortfolioOpen(!isPortfolioOpen);
    };

    const navLinkClasses = ({ isActive }) =>
        `relative py-2 font-medium transition-all duration-500 hover:text-primary ${isActive ? 'text-primary' : (isScrolled ? 'text-gray-700' : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]')
        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        } ${!isScrolled ? 'hover:brightness-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : ''}`;

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                staggerChildren: 0.05,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-[1000] border-b border-transparent transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-2xl py-2 border-[#5A2A45]/5 shadow-sm' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center h-16 md:h-20">
                <Link to="/" className="flex items-center transition-all duration-500 hover:scale-105 active:scale-95 group">
                    <img
                        src={logo}
                        alt="Love & Nest Studio"
                        className={`transition-all duration-700 ${isScrolled ? 'h-12 md:h-14 lg:h-16' : 'h-16 md:h-20 lg:h-24'} w-auto object-contain filter group-hover:drop-shadow-sm`}
                    />
                </Link>

                <button
                    className={`md:hidden bg-none border-none text-3xl transition-colors duration-500 cursor-pointer ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span>{isMenuOpen ? '✕' : '☰'}</span>
                </button>

                <ul className={`
                    fixed md:static top-20 ${isMenuOpen ? 'right-0' : '-right-full'} 
                    w-full max-w-[300px] md:max-w-none h-[calc(100vh-80px)] md:h-auto 
                    bg-white md:bg-transparent flex flex-col md:flex-row 
                    items-start md:items-center p-8 md:p-0 gap-6 md:gap-10 
                    shadow-[-4px_0_16px_rgba(0,0,0,0.1)] md:shadow-none 
                    transition-[right] duration-300 list-none z-[100] overflow-y-auto md:overflow-visible
                `}>
                    <li>
                        <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            About
                        </NavLink>
                    </li>
                    <li
                        className="relative group w-full md:w-auto md:h-full flex flex-col md:flex-row md:items-center"
                        onMouseEnter={() => setIsPortfolioHovered(true)}
                        onMouseLeave={() => setIsPortfolioHovered(false)}
                    >
                        <div
                            className="flex items-center justify-between w-full md:w-auto cursor-pointer"
                            onClick={togglePortfolio} // Mobile Click
                        >
                            <span className={`font-medium py-2 transition-all duration-500 block ${isPortfolioHovered || isPortfolioOpen ? 'text-primary' : (isScrolled ? 'text-gray-700' : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]')
                                }`}>
                                Portfolio
                            </span>
                            <svg
                                className={`w-4 h-4 ml-1 transition-all duration-500 ${isPortfolioHovered || isPortfolioOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-gray-700' : 'text-white'} md:hidden`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                            <svg
                                className={`w-4 h-4 ml-1 transition-all duration-500 ${isPortfolioHovered ? 'rotate-180' : ''} ${isScrolled ? 'text-gray-700' : 'text-white'} hidden md:block`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {/* Desktop Dropdown - Integrated Look */}
                        <AnimatePresence>
                            {isPortfolioHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scaleY: 0.8, y: 0 }}
                                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                                    exit={{ opacity: 0, scaleY: 0.8, y: -5 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{ transformOrigin: "top center" }}
                                    className="hidden md:block absolute top-[100%] left-1/2 -translate-x-1/2 min-w-full w-auto bg-white shadow-lg rounded-b-xl border-t-2 border-primary pt-2 pb-2 z-50"
                                >
                                    {/* Invisible bridge to prevent mouse gap issues */}
                                    <div className="absolute top-[-10px] left-0 w-full h-[10px] bg-transparent" />

                                    <ul className="flex flex-col">
                                        {[
                                            { name: 'Newborn', path: '/portfolio/newborn' },
                                            { name: 'Maternity', path: '/portfolio/maternity' },
                                            { name: 'Baby', path: '/portfolio/baby' },
                                            { name: 'Family', path: '/portfolio/family' }
                                        ].map((item, index) => (
                                            <motion.li
                                                key={item.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <NavLink
                                                    to={item.path}
                                                    className="block px-6 py-3 text-gray-600 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_theme('colors.primary')] hover:brightness-110 hover:tracking-wide transition-all duration-300 text-sm font-medium flex items-center justify-between group/item whitespace-nowrap"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile Dropdown (Smooth Accordion Height) */}
                        <AnimatePresence>
                            {isPortfolioOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="md:hidden w-full overflow-hidden"
                                >
                                    <ul className="w-full mt-2 bg-gray-50 rounded-lg p-2 pl-4 border-l-2 border-primary/20">
                                        {[
                                            { name: 'Newborn', path: '/portfolio/newborn' },
                                            { name: 'Maternity', path: '/portfolio/maternity' },
                                            { name: 'Baby', path: '/portfolio/baby' },
                                            { name: 'Family', path: '/portfolio/family' }
                                        ].map((item) => (
                                            <li key={item.name}>
                                                <NavLink to={item.path} className="block px-4 py-3 text-gray-700 hover:text-primary transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    <li>
                        <NavLink to="/services" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/testimonials" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Testimonials
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
