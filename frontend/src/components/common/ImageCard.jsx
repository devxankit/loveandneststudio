import React from 'react';
import LazyImage from './LazyImage';
const ImageCard = ({ image, title, description, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            onClick={onClick}
        >
            <div className="w-full h-[300px] md:h-[250px] overflow-hidden bg-gray-100">
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                    <LazyImage src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="p-6 md:p-5">
                <h3 className="text-2xl text-gray-800 mb-2 font-semibold">{title}</h3>
                {description && <p className="text-base text-gray-500 leading-relaxed">{description}</p>}
            </div>
        </div>
    );
};

export default ImageCard;
