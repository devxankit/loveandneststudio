import React from 'react';
import SEO from '../../components/seo/SEO';
import './Contact.css';

// Importing images
import img1 from '../../assets/images/contract/Screenshot 2025-12-30 104112.png';
import img2 from '../../assets/images/contract/Screenshot 2025-12-30 104125.png';
import img3 from '../../assets/images/contract/Screenshot 2025-12-30 104143.png';
import verticalImg from '../../assets/images/contract/_FOR BA .jpg';

const BabyIconStrip = () => (
    <div className="baby-icon-strip">
        {/* Star */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        {/* Heart */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {/* Moon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        {/* Teddy Bear Head */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="7"></circle>
            <circle cx="7" cy="7" r="3"></circle>
            <circle cx="17" cy="7" r="3"></circle>
            <path d="M10 14a2 2 0 0 0 4 0"></path> {/* Smile */}
            <circle cx="10" cy="11" r="0.5" fill="currentColor"></circle>
            <circle cx="14" cy="11" r="0.5" fill="currentColor"></circle>
        </svg>
        {/* Baby Bottle */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2h6v5H9z"></path>
            <path d="M7 7h10v10a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V7z"></path>
            <path d="M9 11h6"></path>
        </svg>
        {/* Repeated Star */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        {/* Stroller */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="19" r="2"></circle>
            <circle cx="6" cy="19" r="2"></circle>
            <path d="M14 17V7a3 3 0 0 0-6 0v5"></path>
            <path d="M13.6 12H6a3 3 0 0 0-3 3"></path>
            <path d="M16.9 11.6L19 5"></path>
        </svg>
        {/* Duck */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v6h10v-6"></path>
            <path d="M12 9V5a3 3 0 0 1 3-3h.5a3 3 0 0 1 3 3v4"></path>
            <path d="M7 16h6"></path>
            <circle cx="16.5" cy="4.5" r=".5" fill="currentColor"></circle>
        </svg>
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
            <div className="contact-page">
                <div className="top-section-mint">
                    <BabyIconStrip />
                    <img src={verticalImg} alt="" className="mint-vertical-decoration" />
                    <div className="hero-layout">
                        <div className="hero-image-container">
                            <img src={img1} alt="Anamika - Photographer" className="hero-main-img" />
                        </div>

                        <div className="hero-details-container">
                            <span className="hero-subtitle">Hi! Welcome to</span>
                            <div className="title-group">
                                <h1 className="hero-title">Love & Nest Studio</h1>
                                <span className="hero-author">by Anamika</span>
                            </div>
                            <p className="hero-description">
                                "From womb to wonder. As a mother and photographer, I understand the immense joy and love that comes with watching your child grow. It's an honor to be a part of these special moments."
                            </p>

                            <div className="contact-info-block">
                                <div className="contact-item">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                        </svg>
                                    </span>
                                    <a href="mailto:loveandnest@gmail.com">loveandnest@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <a href="tel:+918679076776">+91 86790 76776</a>
                                </div>
                                <div className="contact-item">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span>Dehradun, Uttarakhand, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Cream Background */}
                <div className="bottom-section-cream">
                    {/* Wrapper to align Gallery and Socials side-by-side */}
                    <div className="gallery-social-wrapper">
                        <div className="static-gallery">
                            <img src={img2} alt="Baby Portrait Left" className="gallery-item side-img" />
                            <img src={img3} alt="Baby Portrait Center" className="gallery-item center-img" />
                            <img src={img1} alt="Baby Portrait Right" className="gallery-item side-img" />
                        </div>

                        {/* Social Media Connect */}
                        <div className="social-connect">
                            <h3 className="follow-heading">Follow Us</h3>
                            <div className="social-icons-row">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                </a>
                                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="since-badge">
                        <p>Since 2019</p>
                    </div>



                    {/* Decorative Background Image on Right */}

                </div>
            </div>
        </>
    );
};

export default Contact;
