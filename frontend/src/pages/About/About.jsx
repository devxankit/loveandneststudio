import React from 'react';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';
import './About.css';

// Import all about images
import aboutImg1 from '../../assets/images/about/01-1.jpg';
import aboutImg2 from '../../assets/images/about/02-01.jpg';
import aboutImg3 from '../../assets/images/about/0385.jpg';
import aboutImg4 from '../../assets/images/about/0390.jpg';
import aboutImg5 from '../../assets/images/about/0398.jpg';
import aboutImg6 from '../../assets/images/about/0414.jpg';
import aboutImg7 from '../../assets/images/about/0418.jpg';
import aboutImg8 from '../../assets/images/about/0424.jpg';
import aboutImg9 from '../../assets/images/about/0426.jpg';
import aboutImg10 from '../../assets/images/about/0434.jpg';
import aboutImg11 from '../../assets/images/about/0444.jpg';
import aboutImg12 from '../../assets/images/about/0464.jpg';
import aboutImg13 from '../../assets/images/about/DSC_0374 ad on jpeg.jpg';
import aboutImg14 from '../../assets/images/about/DSC_0393.jpg';
import aboutImg15 from '../../assets/images/about/DSC_0410.jpg';
import aboutImg16 from '../../assets/images/about/DSC_0414.jpg';
import aboutImg17 from '../../assets/images/about/DSC_0424.jpg';
import aboutImg18 from '../../assets/images/about/DSC_0428.jpg';
import aboutImg19 from '../../assets/images/about/DSC_0444.jpg';
import aboutImg20 from '../../assets/images/about/DSC_0445.jpg';
import aboutImg21 from '../../assets/images/about/_FOR BA .jpg';

// Import portfolio category images
import newbornImg from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import maternityImg from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';
import babyImg from '../../assets/images/hero/Screenshot 2025-12-30 141711.png';
import familyImg from '../../assets/images/hero/Screenshot 2025-12-30 141721.png';

const About = () => {
    const portfolioCategories = [
        {
            id: 1,
            name: 'Newborn',
            image: newbornImg
        },
        {
            id: 2,
            name: 'Maternity',
            image: maternityImg
        },
        {
            id: 3,
            name: 'Baby',
            image: babyImg
        },
        {
            id: 4,
            name: 'Family',
            image: familyImg
        }
    ];

    return (
        <>
            <SEO
                title="About Us - Love & Nest Studio"
                description="Meet Anamika, the founder of Love & Nest Studio, specializing in newborn, maternity, and family photography with grace and refinement."
                keywords="about anamika, photography studio founder, newborn photographer, refined photography, family heirlooms"
            />
            <div className="about-page">
                <section className="about-hero">
                    {/* Floating Animated Images - All 21 images */}
                    <div className="hero-images-container">
                        <div className="floating-image float-1">
                            <LazyImage src={aboutImg1} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-2">
                            <LazyImage src={aboutImg2} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-3">
                            <LazyImage src={aboutImg3} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-4">
                            <LazyImage src={aboutImg4} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-5">
                            <LazyImage src={aboutImg5} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-6">
                            <LazyImage src={aboutImg6} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-7">
                            <LazyImage src={aboutImg7} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-8">
                            <LazyImage src={aboutImg8} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-9">
                            <LazyImage src={aboutImg9} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-10">
                            <LazyImage src={aboutImg10} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-11">
                            <LazyImage src={aboutImg11} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-12">
                            <LazyImage src={aboutImg12} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-13">
                            <LazyImage src={aboutImg13} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-14">
                            <LazyImage src={aboutImg14} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-15">
                            <LazyImage src={aboutImg15} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-16">
                            <LazyImage src={aboutImg16} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-17">
                            <LazyImage src={aboutImg17} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-18">
                            <LazyImage src={aboutImg18} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-19">
                            <LazyImage src={aboutImg19} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-20">
                            <LazyImage src={aboutImg20} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                        <div className="floating-image float-21">
                            <LazyImage src={aboutImg21} alt="Photography" threshold={0.1} rootMargin="100px" />
                        </div>
                    </div>
                </section>

                <section className="about-content">
                    {/* Main Content Wrapper - Left content + Right categories */}
                    <div className="about-main-wrapper">
                        {/* Left Side - All About Content */}
                        <div className="about-left-content">
                            {/* All About Content in One Pink Card */}
                            <div className="intro-photographer-card-text-only">
                                {/* Intro Section */}
                                <div className="about-intro">
                                    <p className="lead-text">
                                        Welcome to Love & Nest Studio, a photography studio dedicated to capturing life's most precious beginnings with grace and refinement.
                                    </p>
                                </div>

                                {/* Photographer Section */}
                                <div className="photographer-section">
                                    <h2>The Photographer</h2>
                                    <p>
                                        I'm Anamika, the founder and photographer behind Love & Nest, with over 13 years of professional experience and 8 years of specialized expertise in newborn and baby photography.
                                    </p>
                                </div>

                                {/* Philosophy Section */}
                                <div className="content-section">
                                    <h2>Philosophy</h2>
                                    <p>
                                        My work is inspired by the belief that true luxury lies in moments that are quiet, meaningful, and deeply personal—the gentle glow of motherhood, the first days of a newborn's life, and the intimate bonds shared within a family. These moments pass quickly, yet their significance lasts forever. My purpose is to preserve them with elegance, sensitivity, and timeless artistry.
                                    </p>
                                </div>

                                {/* Our Approach Section */}
                                <div className="content-section">
                                    <h2>Our Approach</h2>
                                    <p>
                                        At Love & Nest, I offer maternity, newborn, baby, and family portraiture, thoughtfully crafted in a calm, refined environment. Newborn sessions are always baby-led and safety-focused, guided by years of experience, patience, and a deep understanding of infant comfort. Maternity and family sessions are approached with the same intentional care, allowing natural emotion, connection, and authenticity to unfold effortlessly.
                                    </p>
                                </div>

                                {/* Style & Experience Section */}
                                <div className="content-section">
                                    <h2>Style & Experience</h2>
                                    <p>
                                        My photographic style is soft, refined, and enduring—designed to transcend trends and remain relevant across generations. Every detail of the experience, from lighting and styling to the overall flow of the session, is carefully curated to ensure families feel relaxed, valued, and impeccably cared for.
                                    </p>
                                    <p className="mission-highlight-white">
                                        Love & Nest Studio is more than a photography studio—it is a space where trust is honored, stories are preserved, and memories are transformed into heirlooms.
                                    </p>
                                </div>

                                {/* Signature Section */}
                                <div className="signature-section-white">
                                    <p className="signature-text-white">
                                        Timeless portraits of love, crafted with care, meant to be cherished for generations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Portfolio Categories with Ribbon Style */}
                        <div className="about-right-categories">
                            <div className="categories-ribbon-container">
                                {portfolioCategories.map((category) => (
                                    <div key={category.id} className="category-ribbon-item">
                                        {/* Ribbon Banner - Outside the image */}
                                        <div className="ribbon-banner-outside">
                                            <div className="ribbon-dots-left"></div>
                                            <span className="ribbon-text">{category.name}</span>
                                            <div className="ribbon-dots-right"></div>
                                        </div>
                                        {/* Image Frame */}
                                        <div className="category-image-frame">
                                            <LazyImage
                                                src={category.image}
                                                alt={category.name}
                                                threshold={0.1}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;

