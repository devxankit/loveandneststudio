import React from 'react';
import SEO from '../../components/seo/SEO';

// Importing images
import img1 from '../../assets/images/contract/Screenshot 2025-12-30 104112.png';
import img2 from '../../assets/images/contract/Screenshot 2025-12-30 104125.png';
import img3 from '../../assets/images/contract/Screenshot 2025-12-30 104143.png';
import verticalImg from '../../assets/images/contract/_FOR BA .jpg';

const SidebarIcon = ({ children }) => (
    <div className="w-6 h-6 md:w-8 md:h-8 text-white/60 hover:text-white transition-colors duration-300">
        {children}
    </div>
);

const ContactRow = ({ icon, text, href }) => (
    <div className="flex items-center gap-4 group">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FA9BAE] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        {href ? (
            <a href={href} className="font-outfit text-[#4A4A4A] text-sm md:text-base italic hover:text-[#FA9BAE] transition-colors">
                {text}
            </a>
        ) : (
            <span className="font-outfit text-[#4A4A4A] text-sm md:text-base italic">
                {text}
            </span>
        )}
    </div>
);

const Contact = () => {
    return (
        <>
            <SEO
                title="Contact | Love & Nest Studio"
                description="Contact Love & Nest Studio by Anamika for Maternity, Newborn, and Family Photography in Dehradun."
                keywords="contact photographer, dehradun photography, maternity shoot contact"
            />

            <div className="w-full bg-[#FAF9F6] pt-24 pb-12 px-4 md:px-8 lg:px-12 flex justify-center">
                <div className="w-full max-w-[1500px] rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl bg-white">

                    {/* --- Top Hero Section --- */}
                    <div className="flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

                        {/* Left Content Area (Green) */}
                        <div className="w-full lg:w-[65%] bg-[#BCCBC4] relative p-6 md:p-12 flex flex-row">

                            {/* Icon Sidebar */}
                            <div className="flex flex-col gap-6 md:gap-10 items-center border-r border-white/20 pr-4 md:pr-8 py-4">
                                <SidebarIcon>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </SidebarIcon>
                                <SidebarIcon>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                </SidebarIcon>
                                <SidebarIcon>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                </SidebarIcon>
                                <SidebarIcon>
                                    {/* Teddy Bear abstract */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="7" /><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M9 14h6" /><path d="M12 11v2" /></svg>
                                </SidebarIcon>
                                <SidebarIcon>
                                    {/* Bottle abstract */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6v4H9z" /><path d="M6 6h12v16H6z" /></svg>
                                </SidebarIcon>
                            </div>

                            {/* Main Content Details */}
                            <div className="flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-14 pl-6 md:pl-12 pt-4">
                                {/* Portrait Image */}
                                <div className="w-full max-w-[280px] aspect-[4/5] md:aspect-square shrink-0 rounded-2xl md:rounded-[30px] overflow-hidden border-[6px] border-white/40 shadow-lg relative -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img src={img1} alt="Baby" className="w-full h-full object-cover" />
                                </div>

                                {/* Text Info */}
                                <div className="flex flex-col items-start text-left pt-4 md:pt-0">
                                    <span className="font-outfit text-xs md:text-sm tracking-[0.3em] text-[#5A5A5A]/70 uppercase mb-3 ml-1">Hii Welcome To</span>
                                    <h1 className="font-display text-[2.5rem] md:text-[3.5rem] leading-[1.1] text-[#3D3D3D] mb-1">
                                        Love & Nest Studio
                                    </h1>
                                    <span className="font-secondary text-2xl md:text-3xl text-[#5A5A5A]/60 italic mb-6 ml-2 font-normal">by Anamika</span>

                                    <p className="font-outfit text-[#5A5A5A] text-sm leading-relaxed max-w-md italic mb-10 pl-4 border-l-2 border-white/50">
                                        "From womb to wonder. As a mother and photographer, I understand the immense joy and love that comes with watching your child grow. It's an honor to be a part of these special moments."
                                    </p>

                                    {/* Contact Icons */}
                                    <div className="space-y-4 ml-1">
                                        <ContactRow
                                            icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                                            text="loveandnest@gmail.com"
                                            href="mailto:loveandnest@gmail.com"
                                        />
                                        <ContactRow
                                            icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                                            text="+91 86790 76776"
                                            href="tel:+918679076776"
                                        />
                                        <ContactRow
                                            icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                            text="Dehradun, Uttarakhand, India"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Area (Family Photo) */}
                        <div className="w-full lg:w-[35%] relative min-h-[300px] lg:min-h-full">
                            <img src={verticalImg} alt="Family" className="absolute inset-0 w-full h-full object-cover extract-grayscale grayscale-[100%] contrast-125 brightness-110 hover:grayscale-0 transition-all duration-1000" />
                            {/* Gradient Overlay to blend with green */}
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#BCCBC4] via-[#BCCBC4]/40 to-transparent lg:w-3/4"></div>
                        </div>
                    </div>


                    {/* --- Bottom Pink Strip --- */}
                    <div className="bg-[#D6A2AD] px-6 py-12 md:px-14 md:py-16 flex flex-col xl:flex-row items-center justify-between gap-12 relative overflow-hidden">

                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Image Trio */}
                        <div className="flex items-center justify-center gap-4 md:gap-8">
                            <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-white/30 rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                                <img src={img2} alt="Baby 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="start-0 w-32 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 scale-110 hover:scale-[1.15] transition-transform duration-500">
                                <img src={img3} alt="Baby 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-white/30 rotate-[6deg] hover:rotate-0 transition-transform duration-500">
                                <img src={img1} alt="Baby 3" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Social Follow */}
                        <div className="flex flex-col items-center xl:items-start gap-6 z-10 relative pr-0 xl:pr-12">
                            <div className="text-center xl:text-left">
                                <h3 className="font-display text-4xl text-[#4A4A4A] mb-2 leading-none">Follow Us</h3>
                                <p className="font-secondary text-white/90 text-xl italic tracking-wide pl-1">on our socials</p>
                            </div>

                            <div className="flex gap-4">
                                {[
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, url: "https://instagram.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, url: "https://facebook.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>, url: "https://youtube.com" },
                                    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>, url: "https://whatsapp.com" },
                                ].map((item, i) => (
                                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#D6A2AD] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                        <div className="w-5 h-5">{item.icon}</div>
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;
