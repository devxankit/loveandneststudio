import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/Gemini_Generated_Image_adt2l4adt2l4adt2-removebg-preview.png';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1a1a] text-gray-400 py-16 px-6 md:px-8">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="flex flex-col gap-4">
                    <img src={logo} alt="Love & Nest Studio" className="h-[60px] md:h-[70px] lg:h-[80px] w-auto object-contain max-w-[160px] md:max-w-[180px] lg:max-w-[200px] brightness-0 invert" />
                    <p className="leading-[1.8] text-gray-500">Capturing precious moments that last a lifetime.</p>
                </div>

                <div className="flex flex-col">
                    <h4 className="text-white text-[1.1rem] font-semibold mb-4 text-left">Quick Links</h4>
                    <ul className="list-none p-0 flex flex-col gap-3">
                        <li><Link to="/about" className="text-gray-500 hover:text-primary transition-colors duration-300">About Us</Link></li>
                        <li><Link to="/services" className="text-gray-500 hover:text-primary transition-colors duration-300">Services</Link></li>
                        <li><Link to="/portfolio" className="text-gray-500 hover:text-primary transition-colors duration-300">Portfolio</Link></li>
                        <li><Link to="/contact" className="text-gray-500 hover:text-primary transition-colors duration-300">Contact</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col">
                    <h4 className="text-white text-[1.1rem] font-semibold mb-4 text-left">Contact Info</h4>
                    <ul className="list-none p-0 flex flex-col gap-3">
                        <li className="text-gray-500">Email: info@loveandneststudio.com</li>
                        <li className="text-gray-500">Phone: +91 1234567890</li>
                        <li className="text-gray-500">Location: Your City, India</li>
                    </ul>
                </div>

                <div className="flex flex-col">
                    <h4 className="text-white text-[1.1rem] font-semibold mb-4 text-left">Follow Us</h4>
                    <div className="flex gap-4 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-[3px] transition-all duration-300">
                            FB
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-[3px] transition-all duration-300">
                            IG
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-white hover:bg-primary hover:-translate-y-[3px] transition-all duration-300">
                            TW
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#333] text-center text-gray-600">
                <p>&copy; {currentYear} Love & Nest Studio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
