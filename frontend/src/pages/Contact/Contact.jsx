import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { getContactPage } from '../../services/api';

// Importing images (Fallbacks)
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
                <a href={href} className="font-outfit text-[#6E5A42] text-sm md:text-base font-medium hover:text-[#5A2A45] transition-colors tracking-wide">
                    {text}
                </a>
            ) : (
                <span className="font-outfit text-[#6E5A42] text-sm md:text-base font-medium tracking-wide">
                    {text}
                </span>
            )}
            <div className="h-[1px] w-0 bg-[#B77A8C] group-hover:w-full transition-all duration-500 opacity-30"></div>
        </div>
    </motion.div>
);

const Contact = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await getContactPage();
                setPageData(res.data.data || res.data);
            } catch (error) {
                console.error("Failed to load contact content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return null;

    // Mapping new dynamic data
    const hero = pageData?.hero || {};
    const info = pageData?.info || {};
    const visuals = pageData?.visuals || {};
    const socials = pageData?.socials || {};
    const collage = pageData?.collage || { images: [] };

    // Fallbacks
    const entranceImage = visuals.entranceImage || img1;
    const verticalImage = visuals.verticalImage || verticalImg;
    const collageImages = collage.images?.length > 0 ? collage.images : [img2, img3];

    return (
        <>
            <SEO
                title={pageData?.meta?.title || "Connect | Love & Nest Studio"}
                description={pageData?.meta?.description || "Reach out to Love & Nest Studio..."}
                keywords={pageData?.meta?.keywords || "contact photographer, love and nest studio, maternity photography pune"}
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
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.6em] text-[#B77A8C] mb-6">{hero.subheading || "Inquire with Us"}</span>
                                    <h1 className="font-display text-[10vw] lg:text-[6rem] leading-[0.85] text-[#5A2A45] mb-4">
                                        {hero.heading ? (
                                            <span dangerouslySetInnerHTML={{ __html: hero.heading.replace('Connect', '<span class="italic font-light opacity-40 font-serif">Connect</span>') }} />
                                        ) : (
                                            <>Let's<br /> <span className="italic font-light opacity-40 font-serif">Connect</span></>
                                        )}
                                    </h1>
                                    <p className="font-outfit text-[#6E5A42] text-base md:text-lg leading-relaxed max-w-sm mt-8 opacity-80">
                                        "{hero.text || "Because every breath, every giggle, and every tiny finger deserves to be remembered exactly as it felt."}"
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full max-w-2xl">
                                    <ContactRow
                                        delay={0.4}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6L12 13L2 6" /></svg>}
                                        text={info.email || "loveandnest@gmail.com"}
                                        href={`mailto:${info.email || "loveandnest@gmail.com"}`}
                                    />
                                    <ContactRow
                                        delay={0.5}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2c-3.1-.2-6.1-1.1-8.6-2.6a20 20 0 0 1-6-6c-1.5-2.5-2.4-5.5-2.6-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.2 1 .5 1.9.9 2.8a2 2 0 0 1-.5 2.1l-1.2 1.2a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.7 2.8.9a2 2 0 0 1 1.7 2v.1z" /></svg>}
                                        text={info.phone || "+91 86790 76776"}
                                        href={`tel:${info.phone ? info.phone.replace(/ /g, '') : "+918679076776"}`}
                                    />
                                    <ContactRow
                                        delay={0.6}
                                        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                        text={info.location || "Dehradun, Uttarakhand"}
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2 }}
                                    className="mt-16 w-full md:w-auto"
                                >
                                    <div className="w-full md:w-64 aspect-[4/5] rounded-[24px] overflow-hidden border-[8px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                                        <img src={entranceImage} alt="Studio Details" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
                                    </div>
                                    <span className="block mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#5A2A45]/30">{visuals.entranceLabel || "Studio Entrance — Dehradun"}</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Area (Cinematic Visual) */}
                        <div className="w-full lg:w-[35%] relative min-h-[500px] lg:min-h-full overflow-hidden group">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                src={verticalImage}
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
                                    Join Our <br /> <span className="italic font-light text-[#B77A8C]">Family</span>
                                </h3>
                                <p className="font-outfit text-[#6E5A42] text-lg max-w-md opacity-70">
                                    Follow the journey on socials for daily inspiration, behind-the-scenes magic, and first access to seasonal sessions.
                                </p>
                            </motion.div>

                            <div className="flex justify-center lg:justify-start gap-4">
                                {[
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, url: socials.instagram || "https://instagram.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, url: socials.facebook || "https://facebook.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.188 10.156c-1.334-.73-2.618-.46-3.262.247-.365.399-.544 1.054-.544 1.972 0 .869.195 1.488.583 1.839.615.556 1.7.532 2.827-.066.079-.395.179-.861.272-1.401.127-.723.167-1.745.124-2.591zm0 5.483l-1.921 1.02a6.3 6.3 0 01-4.832 0 6.273 6.273 0 01-3.14-5.32c0-3.414 2.8-6.195 6.242-6.195 2.222 0 4.204 1.154 5.289 2.956.124.204.062.47-.142.595l-1.637 1.002a.426.426 0 01-.58-.124 3.766 3.766 0 00-2.93-1.874 3.82 3.82 0 00-3.717 3.64c0 1.996 1.554 3.633 3.616 3.633.923 0 1.758-.328 2.378-.885-.018-.621-.054-1.282-.124-1.961-.157-1.524-.49-2.937-1.025-3.882-.782-1.383-2.316-2.091-4.48-1.564-2.827.688-4.436 3.327-4.436 6.368 0 4.167 2.65 6.645 6.009 6.645 2.366 0 4.29-1.233 5.45-3.327l.182-.328a.424.424 0 01.521-.17l1.782.723a.422.422 0 01.242.535 9.176 9.176 0 01-8.177 5.093c-5.18 0-9.282-3.8-9.282-9.175 0-5.717 4.606-10.428 10.38-10.428 5.766 0 9.8 4.237 9.8 9.38 0 1.706-.554 3.917-2.089 6.012a.426.426 0 01-.628.069l-1.625-1.233a.425.425 0 01-.064-.593c1.06-1.396 1.487-2.915 1.487-4.255 0-2.321-.868-4.15-2.617-4.15-1.127 0-1.897.669-2.203 1.834z" /></svg>, url: socials.threads || "https://www.threads.net/@love.neststudio" },
                                    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 21.54c.24-1.17.47-2.64.55-3.03.04-.19 1.05-4.47 1.05-4.47s-.26-.53-.26-1.32c0-1.24.72-2.17 1.61-2.17.76 0 1.12.57 1.12 1.25 0 .76-.48 1.91-.73 2.97-.21.89.45 1.61 1.33 1.61 1.6 0 2.83-1.68 2.83-4.11 0-2.16-1.55-3.66-3.77-3.66-2.74 0-4.35 2.05-4.35 4.18 0 .83.32 1.71.72 2.2.08.1.09.18.07.28-.08.31-.25 1.02-.28 1.17-.05.19-.19.23-.44.11-1.65-.77-2.68-3.18-2.68-5.12 0-4.17 3.03-8 8.74-8 4.59 0 8.16 3.27 8.16 7.63 0 4.55-2.87 8.22-6.85 8.22-1.34 0-2.6-.7-3.03-1.53 0 0-.66 2.52-.82 3.14-.3 1.14-1.1 2.58-1.64 3.45" /></svg>, url: socials.pinterest || "https://in.pinterest.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>, url: socials.youtube || "https://youtube.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.5 11l-9 5l-9-5V6l9 5l9-5v5z" /></svg>, url: `mailto:${info.email || "loveandnest@gmail.com"}` },
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
                                <img src={collageImages[0]} className="w-full h-full object-cover rounded-xl" alt="Preview 1" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute top-10 right-0 w-56 aspect-[3/4] bg-white p-3 shadow-2xl rounded-2xl z-10"
                            >
                                <img src={collageImages[1] || collageImages[0]} className="w-full h-full object-cover rounded-xl" alt="Preview 2" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Contact;
