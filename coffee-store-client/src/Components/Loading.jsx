import React from 'react';

const Loading = () => {
    return (
        <div className='text-center mt-70'>
            <span className="loading loading-bars loading-xs bg-blue-500"></span>
            <span className="loading loading-bars loading-sm bg-blue-500"></span>
            <span className="loading loading-bars loading-md bg-blue-500"></span>
            <span className="loading loading-bars loading-lg bg-blue-500"></span>
            <span className="loading loading-bars loading-xl bg-blue-500"></span>
        </div>
    );
};

export default Loading;