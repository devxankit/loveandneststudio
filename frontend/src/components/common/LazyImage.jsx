import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f7f4f0" width="400" height="300"/%3E%3C/svg%3E',
    threshold = 0.05,
    rootMargin = '200px', // Pre-load earlier for smoothness
    onLoad,
    style = {},
    aspectRatio = 'auto' // Added aspect ratio to prevent layout shifts
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);

                    let optimizedSrc = src;
                    // Auto-optimize Cloudinary Images
                    if (src && src.includes('cloudinary.com') && !src.includes('f_auto,q_auto')) {
                        optimizedSrc = src.replace('/upload/', '/upload/f_auto,q_auto/');
                    }

                    setImageSrc(optimizedSrc);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [src, threshold, rootMargin]);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    return (
        <div
            className={`relative overflow-hidden bg-[#F1EBDD]/20 ${className}`}
            style={{ aspectRatio, ...style }}
        >
            {/* Smooth Blur-Up Layer */}
            <img
                ref={imgRef}
                src={imageSrc}
                alt={alt}
                onLoad={handleImageLoad}
                className={`
                    w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.2, 0, 0.2, 1)]
                    ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'}
                `}
                loading="lazy"
                decoding="async"
            />

            {/* Loading Indicator / Ghost Layer */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
            )}
        </div>
    );
};

export default LazyImage;
