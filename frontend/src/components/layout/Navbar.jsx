import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo/Gemini_Generated_Image_adt2l4adt2l4adt2-removebg-preview.png';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Love & Nest Studio" className="navbar-logo-img" />
                </Link>

                <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                    <span className={isMenuOpen ? 'toggle-icon open' : 'toggle-icon'}>☰</span>
                </button>

                <ul className={isMenuOpen ? 'navbar-menu active' : 'navbar-menu'}>
                    <li>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                            About
                        </NavLink>
                    </li>
                    <li className="navbar-dropdown">
                        <span>Portfolio</span>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink to="/portfolio/newborn" onClick={() => setIsMenuOpen(false)}>
                                    Newborn
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/maternity" onClick={() => setIsMenuOpen(false)}>
                                    Maternity
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/baby" onClick={() => setIsMenuOpen(false)}>
                                    Baby
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/portfolio/family" onClick={() => setIsMenuOpen(false)}>
                                    Family
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to="/services" onClick={() => setIsMenuOpen(false)}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" onClick={() => setIsMenuOpen(false)}>
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/offers" onClick={() => setIsMenuOpen(false)}>
                            Offers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
