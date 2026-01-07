import React from 'react';
import { useState, useEffect } from 'react';
import { getAboutPage } from '../../services/api';
import SEO from '../../components/seo/SEO';
import LazyImage from '../../components/common/LazyImage';

// Import all about images (fallback)
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

const defaultAboutImages = [
    { src: aboutImg1, className: "w-[90px] h-[130px] top-[12%] left-[7%] animate-float1" },
    { src: aboutImg2, className: "w-[85px] h-[120px] top-[68%] left-[23%] animate-float2 [animation-delay:1s]" },
    { src: aboutImg3, className: "w-[95px] h-[135px] top-[28%] left-[82%] animate-float3 [animation-delay:2s]" },
    { src: aboutImg4, className: "w-[80px] h-[115px] top-[75%] left-[51%] animate-float4 [animation-delay:0.5s]" },
    { src: aboutImg5, className: "w-[100px] h-[140px] top-[18%] left-[38%] animate-float5 [animation-delay:1.5s]" },
    { src: aboutImg6, className: "w-[90px] h-[125px] top-[55%] left-[89%] animate-float6 [animation-delay:2.5s]" },
    { src: aboutImg7, className: "w-[85px] h-[120px] top-[8%] left-[63%] animate-float1 [animation-delay:3s]" },
    { src: aboutImg8, className: "w-[95px] h-[130px] top-[42%] left-[14%] animate-float2 [animation-delay:1.8s]" },
    { src: aboutImg9, className: "w-[88px] h-[125px] top-[82%] left-[70%] animate-float3 [animation-delay:2.2s]" },
    { src: aboutImg10, className: "w-[92px] h-[132px] top-[35%] left-[48%] animate-float4 [animation-delay:0.8s]" },
    { src: aboutImg11, className: "w-[85px] h-[118px] top-[15%] left-[91%] animate-float5 [animation-delay:1.2s]" },
    { src: aboutImg12, className: "w-[98px] h-[138px] top-[62%] left-[6%] animate-float6 [animation-delay:2.8s]" },
    { src: aboutImg13, className: "w-[90px] h-[128px] top-[48%] left-[76%] animate-float1 [animation-delay:3.5s]" },
    { src: aboutImg14, className: "w-[95px] h-[135px] top-[25%] left-[19%] animate-float2 [animation-delay:1.5s]" },
    { src: aboutImg15, className: "w-[87px] h-[122px] top-[71%] left-[43%] animate-float3 [animation-delay:2.5s]" },
    { src: aboutImg16, className: "w-[93px] h-[130px] top-[9%] left-[29%] animate-float4 [animation-delay:0.7s]" },
    { src: aboutImg17, className: "w-[90px] h-[127px] top-[58%] left-[62%] animate-float5 [animation-delay:1.8s]" },
    { src: aboutImg18, className: "w-[88px] h-[124px] top-[38%] left-[8%] animate-float6 [animation-delay:3.2s]" },
    { src: aboutImg19, className: "w-[96px] h-[136px] top-[78%] left-[86%] animate-float1 [animation-delay:1.2s]" },
    { src: aboutImg20, className: "w-[85px] h-[120px] top-[22%] left-[52%] animate-float2 [animation-delay:2.8s]" },
    { src: aboutImg21, className: "w-[92px] h-[130px] top-[65%] left-[31%] animate-float3 [animation-delay:0.9s]" }
];

// Import portfolio category images
import newbornImg from '../../assets/images/hero/Screenshot 2025-12-30 141652.png';
import maternityImg from '../../assets/images/hero/Screenshot 2025-12-30 141700.png';
import babyImg from '../../assets/images/hero/Screenshot 2025-12-30 141711.png';
import familyImg from '../../assets/images/hero/Screenshot 2025-12-30 141721.png';

const About = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await getAboutPage();
                setPageData(res.data.data || res.data);
            } catch (error) {
                console.error("Failed to load about content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return null;

    const bio = pageData?.bio || {};
    const hero = pageData?.hero || { images: [] };

    const portfolioCategories = [
        { id: 1, name: 'Newborn', image: newbornImg },
        { id: 2, name: 'Maternity', image: maternityImg },
        { id: 3, name: 'Baby', image: babyImg },
        { id: 4, name: 'Family', image: familyImg }
    ];

    // Build the gallery images with their designated float classes
    const displayHeroImages = defaultAboutImages.map((config, index) => ({
        src: hero.images[index] || config.src,
        className: config.className
    }));

    return (
        <>
            <SEO
                title="About Us - Love & Nest Studio"
                description={bio.intro ? bio.intro.substring(0, 150) + "..." : "Meet Anamika, the founder of Love & Nest Studio..."}
                keywords="about anamika, photography studio founder, newborn photographer, refined photography, family heirlooms"
            />
            <div className="w-full">
                <section className="bg-gradient-to-br from-[#D6A9B4] to-[#B7C1B8] text-white text-center py-10 px-8 relative overflow-hidden min-h-[35vh] flex items-center justify-center">
                    {/* Floating Animated Images */}
                    <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
                        {displayHeroImages.map((img, index) => (
                            <div key={index} className={`absolute rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] will-change-transform transition-all duration-600 cursor-pointer hover:opacity-100 hover:brightness-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:z-10 ${img.className}`}>
                                <LazyImage src={img.src} alt="Photography" className="w-full h-full object-cover block" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-full mx-auto px-4 py-24 bg-gradient-to-b from-[#FAFAF7] to-white">
                    <div className="flex flex-col lg:flex-row gap-16 items-start px-2 md:px-4">
                        {/* Left Side Content */}
                        <div className="flex-1 w-full">
                            <div className="bg-gradient-to-br from-[#B77A8C] to-[#D6A9B4] p-8 md:p-10 rounded-[30px] shadow-[0_15px_50px_rgba(0,0,0,0.1)] mb-20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.4)_50%,transparent_70%)] animate-sheen skew-x-[-20deg] pointer-events-none z-0"></div>

                                <div className="relative z-10 text-left mb-8">
                                    <p className="text-white text-[clamp(1.1rem,2vw,1.3rem)] leading-relaxed italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
                                        {bio.intro || "Welcome to Love & Nest Studio, a photography studio dedicated to capturing life's most precious beginnings with grace and refinement."}
                                    </p>
                                </div>

                                <div className="relative z-10 space-y-10 text-white">
                                    <div className="relative">
                                        <h2 className="font-display text-[clamp(1.8rem,2.5vw,2.2rem)] font-semibold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] pb-3">
                                            {bio.photographer?.heading || "The Photographer"}
                                        </h2>
                                        <div className="absolute bottom-0 left-0 w-[60px] h-0.5 bg-white/80 rounded-full"></div>
                                        <p className="font-outfit text-base md:text-lg leading-relaxed text-white/95 whitespace-pre-line">
                                            {bio.photographer?.text || "I'm Anamika, the founder and photographer behind Love & Nest, with over 13 years of professional experience and 8 years of specialized expertise in newborn and baby photography."}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <h2 className="font-display text-[clamp(1.8rem,2.5vw,2.2rem)] font-semibold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] pb-3">
                                            {bio.philosophy?.heading || "Philosophy"}
                                        </h2>
                                        <div className="absolute bottom-0 left-0 w-[60px] h-0.5 bg-white/80 rounded-full"></div>
                                        <p className="font-outfit text-base md:text-lg leading-relaxed text-white/95 whitespace-pre-line">
                                            {bio.philosophy?.text || "My work is inspired by the belief that true luxury lies in moments that are quiet, meaningful, and deeply personal—the gentle glow of motherhood, the first days of a newborn's life, and the intimate bonds shared within a family."}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <h2 className="font-display text-[clamp(1.8rem,2.5vw,2.2rem)] font-semibold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] pb-3">
                                            {bio.approach?.heading || "Our Approach"}
                                        </h2>
                                        <div className="absolute bottom-0 left-0 w-[60px] h-0.5 bg-white/80 rounded-full"></div>
                                        <p className="font-outfit text-base md:text-lg leading-relaxed text-white/95 whitespace-pre-line">
                                            {bio.approach?.text || "At Love & Nest, I offer maternity, newborn, baby, and family portraiture, thoughtfully crafted in a calm, refined environment. Newborn sessions are always baby-led and safety-focused."}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <h2 className="font-display text-[clamp(1.8rem,2.5vw,2.2rem)] font-semibold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] pb-3">
                                            {bio.style?.heading || "Style & Experience"}
                                        </h2>
                                        <div className="absolute bottom-0 left-0 w-[60px] h-0.5 bg-white/80 rounded-full"></div>
                                        <p className="font-outfit text-base md:text-lg leading-relaxed text-white/95 mb-4 whitespace-pre-line">
                                            {bio.style?.text || "My photographic style is soft, refined, and enduring—designed to transcend trends and remain relevant across generations."}
                                        </p>
                                        <div className="bg-white/15 backdrop-blur-md p-6 border-l-4 border-white/80 rounded-r-xl italic font-normal text-white mt-6">
                                            {bio.style?.quote || "Love & Nest Studio is more than a photography studio—it is a space where trust is honored, stories are preserved, and memories are transformed into heirlooms."}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl relative z-10 shadow-inner">
                                    <div className="absolute top-2 left-4 text-6xl text-white/20 font-display">"</div>
                                    <p className="font-display text-[clamp(1.4rem,2.5vw,1.8rem)] leading-tight text-white font-normal italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
                                        {bio.footerQuote || "Timeless portraits of love, crafted with care, meant to be cherished for generations."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Portfolio Categories */}
                        <div className="lg:flex-[0_0_220px] w-full lg:sticky lg:top-24 flex lg:flex-col items-center">
                            <div className="flex flex-col gap-4 w-full max-w-[220px] mx-auto">
                                {portfolioCategories.map((category) => (
                                    <div key={category.id} className="relative w-full group">
                                        {/* Ribbon Banner */}
                                        <div className="relative bg-gradient-to-br from-[#D6A9B4] to-[#C89AA8] py-1.5 px-4 text-center -mb-px z-10 shadow-[0_2px_8px_rgba(214,169,180,0.3)] flex items-center justify-center gap-3 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-[0_4px_12px_rgba(214,169,180,0.5)]">
                                            <div className="flex gap-0.5">
                                                <div className="w-1 h-1 bg-white/60 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.2)]"></div>
                                                <div className="w-1 h-1 bg-white/60 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.2)]"></div>
                                            </div>
                                            <span className="font-display text-[0.9rem] font-semibold text-white uppercase tracking-[1.5px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                                                {category.name}
                                            </span>
                                            <div className="flex gap-0.5">
                                                <div className="w-1 h-1 bg-white/60 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.2)]"></div>
                                                <div className="w-1 h-1 bg-white/60 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.2)]"></div>
                                            </div>
                                        </div>
                                        {/* Image Frame */}
                                        <div className="bg-white p-2 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.1)] relative z-0 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.6)_50%,transparent_70%)] after:skew-x-[-20deg] after:-left-[150%] after:pointer-events-none group-hover:after:animate-[sheen-hover_1.5s_cubic-bezier(0.4,0,0.2,1)_forwards]">
                                            <LazyImage
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full aspect-[4/5] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 mb-12 flex flex-col items-center gap-6 text-center select-none">
                        <span className="font-display text-[clamp(3rem,7vw,5rem)] font-normal italic text-[#B77A8C] tracking-wide opacity-90 drop-shadow-[0_10px_30px_rgba(183,122,140,0.1)]">
                            {bio.thankYouText || "Thank You"}
                        </span>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B77A8C] to-transparent opacity-50"></div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;

