import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import api from '../../services/api';
import defaultLogo from '../../assets/logo/Gemini_Generated_Image_adt2l4adt2l4adt2-removebg-preview.png';

const Navbar = React.memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [navbarLogo, setNavbarLogo] = useState(null);
    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Fetch dynamic logo
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data.navbarLogo) {
                    setNavbarLogo(res.data.navbarLogo);
                }
            } catch (error) {
                console.error("Error fetching navbar logo:", error);
            }
        };
        fetchSettings();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isDarkPage = ['/services', '/blog', '/testimonials', '/contact', '/portfolio', '/about'].some(path => location.pathname.startsWith(path));

    const navLinkClasses = ({ isActive }) =>
        `relative py-2 font-medium transition-all duration-500 hover:text-primary ${isActive ? 'text-primary' : ((isScrolled || isDarkPage) ? 'text-gray-700' : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]')
        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        } ${(!isScrolled && !isDarkPage) ? 'hover:brightness-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : ''}`;

    const displayLogo = navbarLogo || defaultLogo;

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-[1000] border-b border-transparent transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-2 border-[#5A2A45]/5 shadow-sm' : 'bg-transparent py-4'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center h-16 md:h-20">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center z-[1001] relative transition-transform duration-500 hover:scale-105 active:scale-95">
                        <img
                            src={displayLogo}
                            alt="Love & Nest Studio"
                            className={`transition-all duration-500 w-auto object-contain ${(isScrolled || isDarkPage) ? 'h-10 md:h-12 lg:h-14' : 'h-12 md:h-16 lg:h-20'}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8 lg:gap-12">
                        <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                        <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>

                        <li><NavLink to="/portfolio" className={navLinkClasses}>Portfolio</NavLink></li>
                        <li><NavLink to="/services" className={navLinkClasses}>Services</NavLink></li>
                        <li><NavLink to="/blog" className={navLinkClasses}>Blog</NavLink></li>
                        <li><NavLink to="/testimonials" className={navLinkClasses}>Testimonials</NavLink></li>
                        <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
                    </ul>

                    {/* Mobile Toggle Button */}
                    <button
                        className={`md:hidden relative z-[1001] p-2 -mr-2 transition-colors duration-300 ${(isScrolled || isDarkPage) ? 'text-gray-800' : 'text-white drop-shadow-md'}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Drawer & Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1002] md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl z-[1003] md:hidden flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <span className="font-display italic text-2xl text-[#5A2A45]">Menu</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 -mr-2 text-gray-400 hover:text-[#5A2A45] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <div className="flex-1 overflow-y-auto py-6 px-6">
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            About
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Portfolio
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/services" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Services
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/testimonials" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Testimonials
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block text-lg font-medium ${isActive ? 'text-[#e9cbb6]' : 'text-gray-900'}`}>
                                            Contact
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            {/* Drawer Footer (Optional) */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <p className="text-xs text-center text-gray-400 uppercase tracking-widest">© Love & Nest Studio</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});

export default Navbar;
