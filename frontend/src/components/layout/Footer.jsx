import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [footerLogo, setFooterLogo] = useState('');
    const [siteTitle, setSiteTitle] = useState('Love & Nest');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data.footerLogo) setFooterLogo(res.data.footerLogo);
                if (res.data.siteTitle) setSiteTitle(res.data.siteTitle);
            } catch (error) {
                console.error("Error fetching footer settings:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="relative bg-[#0d0d0d] text-[#FAF9F6] overflow-hidden pt-20 pb-12 px-6 sm:px-10 border-t border-white/5">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-[-50%] right-[-10%] w-[80vw] sm:w-[50vw] h-[80vw] sm:h-[50vw] bg-[#5A2A45] rounded-full blur-[100px] sm:blur-[150px] opacity-10 pointer-events-none animate-pulse"></div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-x-12 sm:gap-y-16 text-center mb-16 sm:mb-20">

                    {/* 1. Brand / Logo */}
                    <div className="col-span-1 space-y-6 flex flex-col items-center">
                        <Link to="/" className="inline-block">
                            {footerLogo ? (
                                <img
                                    src={footerLogo}
                                    alt={siteTitle}
                                    className="max-h-20 sm:max-h-24 mx-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                />
                            ) : (
                                <h3 className="font-display text-4xl italic text-[#FAF9F6]">{siteTitle}</h3>
                            )}
                        </Link>
                        <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mx-auto font-outfit font-light">
                            Capturing the poetry of your life,<br className="hidden sm:block" /> one frame at a time.
                        </p>
                        <div className="pt-2">
                            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[#B77A8C]">
                                Dehradun, India
                            </span>
                        </div>
                    </div>

                    {/* 2. Explore Links */}
                    <div className="col-span-1 flex flex-col items-center">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-8 font-light tracking-wide">Explore</h4>
                        <ul className="space-y-4 text-sm font-outfit text-white/50 flex flex-col items-center">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Anamika', path: '/about' },
                                { name: 'Portfolio', path: '/portfolio' },
                                { name: 'Journal', path: '/blog' }
                            ].map((item, i) => (
                                <li key={i} className="group flex items-center justify-center min-w-[140px]">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1 h-1 rounded-full bg-[#B77A8C] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shrink-0"></span>
                                        <Link to={item.path} className="group-hover:text-white transition-all uppercase tracking-widest text-[11px]">
                                            {item.name}
                                        </Link>
                                        <span className="w-1 h-1 rounded-full bg-transparent opacity-0 shrink-0"></span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Services Links */}
                    <div className="col-span-1 flex flex-col items-center">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-8 font-light tracking-wide">Services</h4>
                        <ul className="space-y-4 text-sm font-outfit text-white/50 flex flex-col items-center">
                            {[
                                { name: 'Maternity', path: '/portfolio/maternity' },
                                { name: 'Birth', path: '/portfolio/birth' },
                                { name: 'Newborn', path: '/portfolio/newborn' },
                                { name: 'Family', path: '/portfolio/family' }
                            ].map((item, i) => (
                                <li key={i} className="group flex items-center justify-center min-w-[140px]">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1 h-1 rounded-full bg-[#B77A8C] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shrink-0"></span>
                                        <Link to={item.path} className="group-hover:text-white transition-all uppercase tracking-widest text-[11px]">
                                            {item.name}
                                        </Link>
                                        <span className="w-1 h-1 rounded-full bg-transparent opacity-0 shrink-0"></span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Connect / Newsletter */}
                    <div className="col-span-1 flex flex-col items-center">
                        <h4 className="font-display italic text-2xl text-[#E8CBB6] mb-6 sm:mb-8">Connect</h4>

                        {/* Newsletter Input */}
                        <div className="mb-8 sm:mb-10 group max-w-xs mx-auto w-full">
                            <div className="relative border-b border-white/10 pb-3 flex transition-colors group-hover:border-white/30 justify-center">
                                <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/20 font-light text-center" />
                                <button className="absolute right-0 text-[10px] uppercase tracking-widest text-[#B77A8C] hover:text-white transition-colors">Join</button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-3">
                            {[
                                { icon: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>, href: "https://youtube.com/@loveandnest?si=O7DUvepeflrB2_p5", color: "hover:bg-[#FF0000]" },
                                { icon: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>, href: "https://instagram.com", color: "hover:bg-[#E1306C]" },
                                { icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, href: "https://facebook.com", color: "hover:bg-[#1877F2]" },
                                { icon: <path d="M14.188 10.156c-1.334-.73-2.618-.46-3.262.247-.365.399-.544 1.054-.544 1.972 0 .869.195 1.488.583 1.839.615.556 1.7.532 2.827-.066.079-.395.179-.861.272-1.401.127-.723.167-1.745.124-2.591zm0 5.483l-1.921 1.02a6.3 6.3 0 01-4.832 0 6.273 6.273 0 01-3.14-5.32c0-3.414 2.8-6.195 6.242-6.195 2.222 0 4.204 1.154 5.289 2.956.124.204.062.47-.142.595l-1.637 1.002a.426.426 0 01-.58-.124 3.766 3.766 0 00-2.93-1.874 3.82 3.82 0 00-3.717 3.64c0 1.996 1.554 3.633 3.616 3.633.923 0 1.758-.328 2.378-.885-.018-.621-.054-1.282-.124-1.961-.157-1.524-.49-2.937-1.025-3.882-.782-1.383-2.316-2.091-4.48-1.564-2.827.688-4.436 3.327-4.436 6.368 0 4.167 2.65 6.645 6.009 6.645 2.366 0 4.29-1.233 5.45-3.327l.182-.328a.424.424 0 01.521-.17l1.782.723a.422.422 0 01.242.535 9.176 9.176 0 01-8.177 5.093c-5.18 0-9.282-3.8-9.282-9.175 0-5.717 4.606-10.428 10.38-10.428 5.766 0 9.8 4.237 9.8 9.38 0 1.706-.554 3.917-2.089 6.012a.426.426 0 01-.628.069l-1.625-1.233a.425.425 0 01-.064-.593c1.06-1.396 1.487-2.915 1.487-4.255 0-2.321-.868-4.15-2.617-4.15-1.127 0-1.897.669-2.203 1.834z" />, href: "https://www.threads.net/@love.neststudio", color: "hover:bg-[#000000]" },
                                { icon: <path d="M9.04 21.54c.24-1.17.47-2.64.55-3.03.04-.19 1.05-4.47 1.05-4.47s-.26-.53-.26-1.32c0-1.24.72-2.17 1.61-2.17.76 0 1.12.57 1.12 1.25 0 .76-.48 1.91-.73 2.97-.21.89.45 1.61 1.33 1.61 1.6 0 2.83-1.68 2.83-4.11 0-2.16-1.55-3.66-3.77-3.66-2.74 0-4.35 2.05-4.35 4.18 0 .83.32 1.71.72 2.2.08.1.09.18.07.28-.08.31-.25 1.02-.28 1.17-.05.19-.19.23-.44.11-1.65-.77-2.68-3.18-2.68-5.12 0-4.17 3.03-8 8.74-8 4.59 0 8.16 3.27 8.16 7.63 0 4.55-2.87 8.22-6.85 8.22-1.34 0-2.6-.7-3.03-1.53 0 0-.66 2.52-.82 3.14-.3 1.14-1.1 2.58-1.64 3.45" />, href: "https://in.pinterest.com/", color: "hover:bg-[#E60023]" },
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
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-outfit text-center">
                    <span className="mb-4 md:mb-0">© {currentYear} Love & Nest Studio. All rights reserved.</span>
                    <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <Link to="/terms-and-conditions" className="hover:text-white cursor-pointer transition-colors">Terms</Link>
                        <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
