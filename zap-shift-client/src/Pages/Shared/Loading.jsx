import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-xs text-blue-700"></span>
            <span className="loading loading-bars loading-sm text-blue-700"></span>
            <span className="loading loading-bars loading-md text-blue-700"></span>
            <span className="loading loading-bars loading-lg text-blue-700"></span>
            <span className="loading loading-bars loading-xl text-blue-700"></span>
        </div>
    );
};

export default Loading;