import React, { Suspense } from 'react';
import useAuth from '../../Hooks/UseAuth';
import JobLists from './JobLists';
import useJobAPI from '../../API/useJobAPI';


const MyPostedJobs = () => {
     const {user}=useAuth()
     const {JobsCreatedByPromise}=useJobAPI()
    //  console.log(user.accessToken)
    return (
        <div>
           <Suspense fallback={'loading......'}>
             <JobLists JobsCreatedByPromise={JobsCreatedByPromise(user.email)}></JobLists>
           </Suspense>
        </div>
    );
};

export default MyPostedJobs;