import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
    return (
        <div className={`section-title section-title-${align}`}>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            <h2 className="section-heading">{title}</h2>
        </div>
    );
};

export default SectionTitle;
