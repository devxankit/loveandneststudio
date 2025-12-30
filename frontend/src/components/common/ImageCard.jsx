import React from 'react';
import './ImageCard.css';

const ImageCard = ({ image, title, description, onClick }) => {
    return (
        <div className="image-card" onClick={onClick}>
            <div className="image-card-img">
                <img src={image} alt={title} loading="lazy" />
            </div>
            <div className="image-card-content">
                <h3>{title}</h3>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};

export default ImageCard;
