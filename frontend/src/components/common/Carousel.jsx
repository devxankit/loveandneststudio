import React, { useState } from 'react';
import './Carousel.css';

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
        <div className="carousel">
            <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
                &#8249;
            </button>
            <div className="carousel-content">
                {items[currentIndex]}
            </div>
            <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
                &#8250;
            </button>
            <div className="carousel-indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
