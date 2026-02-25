import React from 'react';

const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full bg-[#F4F1EA]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E0DDD5] rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[#15803d] rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
};

export default PageLoader;
