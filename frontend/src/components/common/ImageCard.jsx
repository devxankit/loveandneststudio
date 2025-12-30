import React from 'react';
import LazyImage from './LazyImage';
import './ImageCard.css';

const ImageCard = ({ image, title, description, onClick }) => {
    return (
        <div className="image-card" onClick={onClick}>
            <div className="image-card-img">
                <LazyImage src={image} alt={title} />
            </div>
            <div className="image-card-content">
                <h3>{title}</h3>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};

export default ImageCard;
