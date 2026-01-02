import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';

// Importing images
import img1 from '../../assets/images/contract/Screenshot 2025-12-30 104112.png';
import img2 from '../../assets/images/contract/Screenshot 2025-12-30 104125.png';
import img3 from '../../assets/images/contract/Screenshot 2025-12-30 104143.png';
import verticalImg from '../../assets/images/contract/_FOR BA .jpg';

const SidebarIcon = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        className="w-6 h-6 md:w-8 md:h-8 text-[#5A2A45]/40 hover:text-[#5A2A45] transition-colors duration-300 cursor-help"
    >
        {children}
    </motion.div>
);

const ContactRow = ({ icon, text, href, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="flex items-center gap-5 group py-2"
    >
        <div className="w-10 h-10 rounded-full bg-[#B77A8C] flex items-center justify-center text-[#F1EBDD] shrink-0 shadow-lg shadow-[#B77A8C]/20 group-hover:scale-110 group-hover:bg-[#5A2A45] transition-all duration-500">
            {icon}
        </div>
        <div className="flex flex-col">
            {href ? (
                <a href={href} className="font-outfit text-[#6E5A52] text-sm md:text-base font-medium hover:text-[#5A2A45] transition-colors tracking-wide">
                    {text}
                </a>
            ) : (
                <span className="font-outfit text-[#6E5A52] text-sm md:text-base font-medium tracking-wide">
                    {text}
                </span>
            )}
            <div className="h-[1px] w-0 bg-[#B77A8C] group-hover:w-full transition-all duration-500 opacity-30"></div>
        </div>
    </motion.div>
);

const Contact = () => {
    return (
        <>
            <SEO
                title="Connect | Love & Nest Studio"
                description="Reach out to Love & Nest Studio. Let's capture your family's most beautiful story together."
                keywords="contact photographer, love and nest studio, maternity photography pune"
            />

            <div className="w-full bg-[#F1EBDD] pt-32 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#E6D1CB]/30 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C9D0C3]/20 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="w-full max-w-[1400px] mx-auto">
                    {/* --- Top Hero Section --- */}
                    <div className="flex flex-col lg:flex-row rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(90,42,69,0.12)] bg-white/70 backdrop-blur-xl border border-white/40">

                        {/* Left Content Area (Sage/Pastel) */}
                        <div className="w-full lg:w-[65%] bg-[#C9D0C3]/40 relative p-8 md:p-16 flex flex-row">

                            {/* Icon Sidebar (Editorial Style) */}
                            <div className="flex flex-col gap-12 items-center border-r border-[#5A2A45]/10 pr-6 md:pr-10 py-6">
                                <SidebarIcon delay={0.1}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" /></svg>
                                </SidebarIcon>
                                <SidebarIcon delay={0.2}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6A5.5 5.5 0 0 0 13 4.6L12 5.6L11 4.6A5.5 5.5 0 0 0 3.2 12.4L4.2 13.4L12 21.2L19.8 13.4L20.8 12.4A5.5 5.5 0 0 0 20.8 4.6Z" /></svg>
                                </SidebarIcon>
                                <SidebarIcon delay={0.3}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3V5M12 19V21M4.2 4.2L5.6 5.6M18.4 18.4L19.8 19.8M3 12H5M19 12H21M4.2 19.8L5.6 18.4M18.4 5.6L19.8 4.2" /></svg>
                                </SidebarIcon>
                                <div className="h-24 w-[1px] bg-[#5A2A45]/10"></div>
                            </div>

                            {/* Main Content Details */}
                            <div className="flex-1 flex flex-col items-start pl-8 md:pl-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-14 relative"
                                >
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.6em] text-[#B77A8C] mb-6">Inquire with Us</span>
                                    <h1 className="font-display text-[10vw] lg:text-[6rem] leading-[0.85] text-[#5A2A45] mb-4">
                                        Let's<br /> <span className="italic font-light opacity-40 font-serif">Connect</span>
                                    </h1>
                                    <p className="font-outfit text-[#6E5A52] text-base md:text-lg leading-relaxed max-w-sm mt-8 opacity-80">
                                        "Because every breath, every giggle, and every tiny finger deserves to be remembered exactly as it felt."
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full max-w-2xl">
                                    <ContactRow
                                        delay={0.4}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6L12 13L2 6" /></svg>}
                                        text="loveandnest@gmail.com"
                                        href="mailto:loveandnest@gmail.com"
                                    />
                                    <ContactRow
                                        delay={0.5}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2c-3.1-.2-6.1-1.1-8.6-2.6a20 20 0 0 1-6-6c-1.5-2.5-2.4-5.5-2.6-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.2 1 .5 1.9.9 2.8a2 2 0 0 1-.5 2.1l-1.2 1.2a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.7 2.8.9a2 2 0 0 1 1.7 2v.1z" /></svg>}
                                        text="+91 86790 76776"
                                        href="tel:+918679076776"
                                    />
                                    <ContactRow
                                        delay={0.6}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                        text="Dehradun, Uttarakhand"
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2 }}
                                    className="mt-16 w-full md:w-auto"
                                >
                                    <div className="w-full md:w-64 aspect-[4/5] rounded-[24px] overflow-hidden border-[8px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                                        <img src={img1} alt="Studio Details" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
                                    </div>
                                    <span className="block mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#5A2A45]/30">Studio Entrance — Pune</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Area (Cinematic Visual) */}
                        <div className="w-full lg:w-[35%] relative min-h-[500px] lg:min-h-full overflow-hidden group">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                src={verticalImg}
                                alt="Artistry"
                                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            {/* Gradient Mash */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#5A2A45]/40 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-[#C9D0C3]/20 mix-blend-overlay"></div>
                        </div>
                    </div>


                    {/* --- Bottom Social Strip (Reimagined) --- */}
                    <div className="mt-20 py-20 px-8 border-t border-[#5A2A45]/5 flex flex-col lg:flex-row items-center justify-between gap-16">

                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="font-display text-6xl md:text-8xl text-[#5A2A45] leading-none mb-6">
                                    Join Our <br /> <span className="italic font-light text-[#B77A8C]">Universe</span>
                                </h3>
                                <p className="font-outfit text-[#6E5A42] text-lg max-w-md opacity-70">
                                    Follow the journey on socials for daily inspiration, behind-the-scenes magic, and first access to seasonal sessions.
                                </p>
                            </motion.div>

                            <div className="flex justify-center lg:justify-start gap-4">
                                {[
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, url: "https://instagram.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, url: "https://facebook.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.5 11l-9 5l-9-5V6l9 5l9-5v5z" /></svg>, url: "mailto:loveandnest@gmail.com" },
                                ].map((item, i) => (
                                    <motion.a
                                        key={i}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -8, backgroundColor: "#5A2A45", color: "#F1EBDD" }}
                                        className="w-16 h-16 rounded-full border border-[#5A2A45]/10 flex items-center justify-center text-[#5A2A45] transition-all duration-500 shadow-xl shadow-[#5A2A45]/5"
                                    >
                                        <div className="w-6 h-6">{item.icon}</div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Collage */}
                        <div className="flex-1 relative h-[400px] w-full max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                                transition={{ duration: 1 }}
                                className="absolute top-0 left-0 w-48 aspect-[3/4] bg-white p-3 shadow-2xl rounded-2xl z-20"
                            >
                                <img src={img2} className="w-full h-full object-cover rounded-xl" alt="Preview 1" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute top-10 right-0 w-56 aspect-[3/4] bg-white p-3 shadow-2xl rounded-2xl z-10"
                            >
                                <img src={img3} className="w-full h-full object-cover rounded-xl" alt="Preview 2" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 aspect-square bg-[#B77A8C] p-4 shadow-2xl rounded-full flex items-center justify-center text-center z-30"
                            >
                                <span className="font-display text-white text-xl leading-tight">Book <br /> Today</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
