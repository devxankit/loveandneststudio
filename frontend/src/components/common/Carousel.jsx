import React, { useState } from 'react';
const Carousel = ({ items, autoPlay = true, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    React.useEffect(() => {
        if (autoPlay) {
            const timer = setInterval(goToNext, interval);
            return () => clearInterval(timer);
        }
    }, [currentIndex, autoPlay, interval]);

    return (
        <div className="relative w-full overflow-hidden group">
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-md text-3xl text-gray-800 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                onClick={goToPrevious}
            >
                &#8249;
            </button>
            <div className="w-full transition-all duration-500 ease-in-out">
                {items[currentIndex]}
            </div>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-md text-3xl text-gray-800 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                onClick={goToNext}
            >
                &#8250;
            </button>
            <div className="flex justify-center gap-2 mt-6">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
