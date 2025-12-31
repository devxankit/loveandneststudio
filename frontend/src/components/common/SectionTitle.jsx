import React from 'react';
const SectionTitle = ({ title, subtitle, align = 'center' }) => {
    const alignmentClasses = {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right'
    };

    return (
        <div className={`mb-12 ${alignmentClasses[align]}`}>
            {subtitle && (
                <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-3">
                    {subtitle}
                </p>
            )}
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-gray-800 font-bold leading-tight">
                {title}
            </h2>
        </div>
    );
};

export default SectionTitle;
