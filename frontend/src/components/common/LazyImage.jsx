import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

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
                            // When image is in viewport, load the actual image
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
                // Fallback for browsers that don't support IntersectionObserver
                setImageSrc(src);
            }
        }
        return () => {
            didCancel = true;
            // on component unmount, disconnect the observer
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
            className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'} ${isInView ? 'in-view' : ''}`}
            onLoad={handleImageLoad}
            style={style}
        />
    );
};

export default LazyImage;
