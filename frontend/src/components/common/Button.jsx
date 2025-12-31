import React from 'react';
const Button = ({ children, variant = 'primary', size = 'medium', onClick, type = 'button', className = '', disabled = false }) => {
    const baseStyles = "inline-block font-semibold text-center rounded-lg cursor-pointer transition-all duration-300 border-2 border-transparent no-underline disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-br from-[#ff3377] to-[#9933cc] text-white shadow-[0_4px_12px_rgba(200,50,120,0.3)] hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_6px_16px_rgba(200,50,120,0.4)] active:not-disabled:translate-y-0",
        secondary: "bg-white text-primary border-white hover:not-disabled:bg-gray-50 hover:not-disabled:-translate-y-0.5",
        outline: "bg-transparent text-primary border-primary hover:not-disabled:bg-primary hover:not-disabled:text-white",
        'outline-light': "bg-transparent text-white border-white hover:not-disabled:bg-white hover:not-disabled:text-gray-900"
    };

    const sizes = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg md:px-10 md:py-4 md:text-xl"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.medium} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
