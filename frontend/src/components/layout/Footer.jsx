import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#1a0f16] text-[#FAF9F6] overflow-hidden pt-20 pb-10 px-6 md:px-16 border-t border-white/5">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-[-50%] right-[-10%] w-[50vw] h-[50vw] bg-[#5A2A45] rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-50%] left-[-10%] w-[40vw] h-[40vw] bg-[#B77A8C] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 text-center md:text-left mb-16">

                    {/* 1. Brand / Logo */}
                    <div className="md:col-span-1 space-y-6">
                        <Link to="/">
                            <h3 className="font-display text-4xl italic text-[#FAF9F6]">Love & Nest</h3>
                        </Link>
                        <p className="text-sm text-white/50 leading-relaxed max-w-[250px] mx-auto md:mx-0 font-outfit font-light">
                            Capturing the poetry of your life,<br /> one frame at a time.
                        </p>
                        <div className="pt-2">
                            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[#B77A8C]">
                                Pune, India
                            </span>
                        </div>
                    </div>

                    {/* 2. Explore Links */}
                    <div className="md:col-span-1">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-8">Explore</h4>
                        <ul className="space-y-4 text-sm font-outfit text-white/60">
                            {['Home', 'About Anamika', 'Portfolio', 'Journal'].map((item, i) => (
                                <li key={i} className="group">
                                    <Link to={item === 'Home' ? '/' : item === 'Journal' ? '/blog' : `/${item.split(' ')[0].toLowerCase()}`} className="group-hover:text-white transition-all flex items-center justify-center md:justify-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B77A8C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Services Links */}
                    <div className="md:col-span-1">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-8">Services</h4>
                        <ul className="space-y-4 text-sm font-outfit text-white/60">
                            {['Maternity', 'Newborn', 'Baby', 'Family'].map((item, i) => (
                                <li key={i} className="group">
                                    <Link to="/services" className="group-hover:text-white transition-all flex items-center justify-center md:justify-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B77A8C] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Connect / Newsletter */}
                    <div className="md:col-span-1">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-8">Connect</h4>

                        {/* Newsletter Input */}
                        <div className="mb-10 group max-w-xs mx-auto md:mx-0">
                            <div className="relative border-b border-white/10 pb-3 flex transition-colors group-hover:border-white/30">
                                <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/20 font-light" />
                                <button className="text-[10px] uppercase tracking-widest text-[#B77A8C] hover:text-white transition-colors">Join</button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center md:justify-start gap-3">
                            {[
                                { icon: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>, href: "https://youtube.com/@loveandnest?si=O7DUvepeflrB2_p5", color: "hover:bg-[#FF0000]" },
                                { icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>, href: "https://instagram.com", color: "hover:bg-[#E1306C]" },
                                { icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, href: "https://facebook.com", color: "hover:bg-[#1877F2]" },
                                { icon: <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 19.938l.965-4.638A8.119 8.119 0 0 1 2 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />, href: "https://whatsapp.com", color: "hover:bg-[#25D366]" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 hover:scale-110 hover:text-white hover:border-transparent ${social.color}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{social.icon}</svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-outfit">
                    <span>© {currentYear} Love & Nest Studio. All rights reserved.</span>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
