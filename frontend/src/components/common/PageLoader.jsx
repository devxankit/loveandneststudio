import React from 'react';

/**
 * Loading spinner component for page transitions.
 * @component
 */
const PageLoader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-bold text-xs uppercase tracking-widest animate-pulse">
                    Loading
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
