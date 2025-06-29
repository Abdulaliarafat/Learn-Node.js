import React, { use } from 'react';
import JobsCard from '../Shared/JobsCard';

const HotJobs = ({ jobsPromise }) => {
    const jobs = use(jobsPromise)
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <h1 className="text-2xl font-bold text-center mb-5">Hot jobs of the day</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    jobs.map(job => <JobsCard key={job._id} job={job}></JobsCard>)
                }
            </div>
        </div>
    );
};

export default HotJobs;