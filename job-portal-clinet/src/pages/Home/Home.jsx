import React, { Suspense } from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';
const jobsPromise=fetch('https://job-portal-server-seven-omega.vercel.app/jobs').then(res=>res.json())
const Home = () => {
    return (
        <div>
           <Banner></Banner>
          <Suspense fallback={'loading'}>
             <HotJobs jobsPromise={jobsPromise}></HotJobs>
          </Suspense>
        </div>
    );
};

export default Home;