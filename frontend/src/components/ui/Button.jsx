import React from 'react';

export function Button({ children, type = "button", variant = "primary", className = "", ...props }) {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };
    return (
        <button type={type} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}