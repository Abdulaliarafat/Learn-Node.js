import React, { Suspense } from 'react';
import ApplicationStac from './ApplicationStac';
import ApplicationList from './ApplicationList';
import useAuth from '../../Hooks/UseAuth';
import useApplicationAPI from '../../API/useApplicationAPI';


const MyApplication = () => {
    const {user}=useAuth()
    const {myApplicationPromise}=useApplicationAPI()
    return (
        <div>
            <ApplicationStac></ApplicationStac>
           <Suspense fallback={'loading........'}>
             <ApplicationList myApplicationPromise={myApplicationPromise(user?.email)}></ApplicationList>
           </Suspense>
        </div>
    );
};

export default MyApplication;