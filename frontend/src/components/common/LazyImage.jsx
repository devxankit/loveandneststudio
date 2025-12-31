import React, { useState, useEffect, useRef } from 'react';
const LazyImage = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
    threshold = 0.1,
    rootMargin = '50px',
    onLoad,
    style = {}
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [imageRef, setImageRef] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        let observer;
        let didCancel = false;

        if (imageRef && imageSrc === placeholder) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 || entry.isIntersecting)
                            ) {
                                setIsInView(true);
                                setImageSrc(src);
                                observer.unobserve(imageRef);
                            }
                        });
                    },
                    {
                        threshold: threshold,
                        rootMargin: rootMargin
                    }
                );
                observer.observe(imageRef);
            } else {
                setImageSrc(src);
            }
        }
        return () => {
            didCancel = true;
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [src, imageSrc, imageRef, threshold, rootMargin, placeholder]);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad();
        }
    };

    return (
        <img
            ref={setImageRef}
            src={imageSrc}
            alt={alt}
            className={`
                transition-all duration-500 ease-in-out will-change-[opacity,filter]
                ${isLoaded ? 'opacity-100 blur-0' : 'opacity-60 blur-lg'}
                ${isInView ? 'animate-fadeIn' : ''}
                block w-full h-auto ${className}
            `}
            onLoad={handleImageLoad}
            style={style}
        />
    );
};

export default LazyImage;
