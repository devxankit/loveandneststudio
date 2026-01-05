import React from 'react';
import { Link } from 'react-router-dom';
import useCarousel from '../../hooks/useCarousel';
import Button from '../../components/common/Button';
import LazyImage from '../../components/common/LazyImage';

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
    const { currentIndex: currentSlide } = useCarousel(heroImages.length, true, 4000);

    return (
        <section className="w-full h-screen min-h-[600px] relative overflow-hidden flex items-center justify-center">
            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="flex h-full w-full transition-transform duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) will-change-transform"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {heroImages.map((img, index) => (
                        <div key={index} className="h-full w-full min-w-full shrink-0 relative">
                            {/* Load first image immediately, rest lazily */}
                            {index === 0 ? (
                                <img src={img} alt={`Hero Slide ${index + 1}`} className="w-full h-full object-cover block rounded-none" />
                            ) : (
                                <LazyImage
                                    src={img}
                                    alt={`Hero Slide ${index + 1}`}
                                    threshold={0.01}
                                    rootMargin="100px"
                                    className="w-full h-full object-cover block rounded-none"
                                />
                            )}
                        </div>
                    ))}
                </div>
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/55 z-[1] backdrop-blur-[3px]"></div>
            </div>

            {/* Centered Content Overlay */}
            <div className="relative z-10 text-center text-white max-w-[1000px] w-[90%] p-0 animate-fadeInUp [animation-delay:500ms] opacity-0">
                <div className="bg-white/10 backdrop-blur-xl -webkit-backdrop-blur-xl px-8 py-14 md:px-14 md:py-14 rounded-[30px] border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] hover:border-white/25 hover:bg-white/15">
                    <h1 className="flex flex-col items-center gap-2 mb-8 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        <span className="font-outfit text-[clamp(1.5rem,3vw,2.5rem)] font-normal tracking-[4px] uppercase text-[#F8F5F1] animate-slideInLeft [animation-delay:700ms] opacity-0">
                            Capturing Life's
                        </span>
                        <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold italic leading-[1.1] bg-gradient-to-r from-white via-[#F5E6CA] to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-slideInRight [animation-delay:900ms] opacity-0 animate-shine">
                            Precious Moments
                        </span>
                    </h1>
                    <p className="font-outfit text-[clamp(1rem,1.8vw,1.3rem)] mb-12 text-white/90 font-light tracking-[1px] max-w-[600px] mx-auto animate-fadeInUp [animation-delay:1100ms] opacity-0">
                        Professional newborn, maternity, baby, and family photography
                    </p>
                    <div className="flex gap-6 justify-center flex-wrap mt-4 animate-fadeInUp [animation-delay:1300ms] opacity-0">
                        <Link to="/portfolio">
                            <Button variant="primary" size="large">View Portfolio</Button>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 md:flex flex-col items-center gap-2 hidden">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

