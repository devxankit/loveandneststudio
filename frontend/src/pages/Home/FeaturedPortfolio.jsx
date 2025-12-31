import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import ImageCard from '../../components/common/ImageCard';
import LazyImage from '../../components/common/LazyImage';
import decorativeImg from '../../assets/images/hero/Screenshot 2025-12-30 141711.png'; // Using a baby image

const FeaturedPortfolio = () => {
    const portfolioCategories = [
        {
            id: 1,
            title: 'Newborn',
            description: 'Precious first moments',
            image: '/placeholder-newborn.jpg',
            link: '/portfolio/newborn'
        },
        {
            id: 2,
            title: 'Maternity',
            description: 'Beautiful expecting mothers',
            image: '/placeholder-maternity.jpg',
            link: '/portfolio/maternity'
        },
        {
            id: 3,
            title: 'Baby',
            description: 'Growing milestones',
            image: '/placeholder-baby.jpg',
            link: '/portfolio/baby'
        },
        {
            id: 4,
            title: 'Family',
            description: 'Cherished family bonds',
            image: '/placeholder-family.jpg',
            link: '/portfolio/family'
        }
    ];

    return (
        <section className="bg-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row w-full min-h-[80vh]">
                {/* Left Side Decorative Image */}
                <div className="w-full lg:w-[45%] h-[50vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden">
                    <LazyImage src={decorativeImg} alt="Baby" className="w-full h-full object-cover opacity-40 scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/80 to-white z-10 lg:z-[2]"></div>
                </div>

                {/* Right Side Content */}
                <div className="w-full lg:w-[60%] px-6 py-16 md:px-12 lg:py-16 bg-transparent relative z-[5] flex flex-col justify-center -mt-20 lg:mt-0">
                    <SectionTitle
                        title="Our Portfolio"
                        subtitle="Browse our work"
                        align="left"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
                        {portfolioCategories.map((category) => (
                            <Link key={category.id} to={category.link} className="group no-underline text-inherit block">
                                <div className="flex flex-col items-start gap-5 transition-transform duration-400 cursor-pointer h-full">
                                    <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                                        <LazyImage
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <h3 className="font-display text-[1.8rem] font-medium text-[#4A4A4A] m-0 leading-tight group-hover:text-primary transition-colors">{category.title}</h3>
                                        <p className="font-outfit text-[#8A9A95] text-base m-0">{category.description}</p>
                                        <span className="text-2xl text-[#D6A9B4] mt-auto self-end transition-all duration-300 group-hover:translate-x-[10px] group-hover:text-primary">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPortfolio;

