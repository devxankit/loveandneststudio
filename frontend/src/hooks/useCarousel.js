import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for Carousel logic.
 * @param {number} itemsLength - The number of items in the carousel.
 * @param {boolean} autoPlay - Whether to automatically cycle through items.
 * @param {number} interval - The interval in milliseconds for autoPlay.
 * @returns {object} - Contains currentIndex, goToNext, goToPrevious, goToSlide.
 */
const useCarousel = (itemsLength, autoPlay = true, interval = 3000) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsLength);
    }, [itemsLength]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsLength) % itemsLength);
    }, [itemsLength]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (autoPlay) {
            const timer = setInterval(goToNext, interval);
            return () => clearInterval(timer);
        }
    }, [autoPlay, interval, goToNext]);

    return {
        currentIndex,
        goToNext,
        goToPrevious,
        goToSlide
    };
};

export default useCarousel;
