import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

// Import Images
import img1 from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import img2 from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';
import img3 from '../../assets/images/hero/Screenshot 2025-12-30 141711.png';
import img4 from '../../assets/images/hero/Screenshot 2025-12-30 141721.png';
import img5 from '../../assets/images/hero/Screenshot 2025-12-30 141756.png';
import img6 from '../../assets/images/hero/Screenshot 2025-12-30 141833.png';
import img7 from '../../assets/images/hero/Screenshot 2025-12-30 141842.png';

const heroImages = [img1, img2, img3, img4, img5, img6, img7];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <section className="hero-wrapper full-screen-hero">
            {/* Background Image Slider */}
            <div className="hero-slider-bg">
                <div
                    className="hero-slider-track-css"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {heroImages.map((img, index) => (
                        <div key={index} className="hero-slide-item-bg">
                            <img src={img} alt={`Hero Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                {/* Overlay for text readability */}
                <div className="hero-overlay-dark"></div>
            </div>

            {/* Centered Content Overlay */}
            <div className="hero-content-overlay">
                <div className="hero-content-inner">
                    <h1 className="hero-title-light">
                        <span className="hero-title-main">Capturing Life's</span>
                        <span className="hero-title-accent">Precious Moments</span>
                    </h1>
                    <p className="hero-subtitle-light">
                        Professional newborn, maternity, baby, and family photography
                    </p>
                    <div className="hero-buttons">
                        <Link to="/portfolio">
                            <Button variant="primary" size="large">View Portfolio</Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline-light" size="large">Book Session</Button>
                        </Link>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
