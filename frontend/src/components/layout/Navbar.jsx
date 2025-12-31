import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo/Gemini_Generated_Image_adt2l4adt2l4adt2-removebg-preview.png';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinkClasses = ({ isActive }) =>
        `relative py-2 font-medium transition-colors duration-300 hover:text-primary ${isActive ? 'text-primary' : 'text-gray-700'
        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`;

    return (
        <nav className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sticky top-0 z-[100]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex justify-between items-center h-20">
                <Link to="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
                    <img src={logo} alt="Love & Nest Studio" className="h-[45px] md:h-[50px] lg:h-[60px] w-auto object-contain max-w-[140px] md:max-w-[160px] lg:max-w-[200px]" />
                </Link>

                <button
                    className="md:hidden bg-none border-none text-3xl text-gray-700 cursor-pointer"
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
                    transition-[right] duration-300 list-none z-[100]
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
                    <li className="relative group w-full md:w-auto">
                        <span className="text-gray-700 font-medium cursor-pointer py-2 md:group-hover:text-primary transition-colors block">
                            Portfolio
                        </span>
                        <ul className={`
                            md:absolute md:top-full md:left-0 md:bg-white md:min-w-[200px] 
                            md:shadow-[0_4px_16px_rgba(0,0,0,0.1)] md:rounded-lg 
                            md:opacity-0 md:invisible md:translate-y-[-10px] 
                            md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0 
                            md:transition-all md:duration-300 md:py-2 list-none
                            w-full mt-2 md:mt-0 bg-gray-50 md:bg-white rounded p-2 md:p-0
                        `}>
                            <li>
                                <NavLink to="/portfolio/newborn" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    Newborn
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/maternity" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    Maternity
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/baby" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    Baby
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/family" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    Family
                                </NavLink>
                            </li>
                        </ul>
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
                        <NavLink to="/offers" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            Offers
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
        </nav>
    );
};

export default Navbar;
