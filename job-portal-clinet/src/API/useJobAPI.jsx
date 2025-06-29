import React from 'react';
import useAxiousSecure from '../Hooks/useAxiousSecure';

const useJobAPI = () => {
    const axiosSecure=useAxiousSecure();
    const JobsCreatedByPromise=(email)=>{
        return axiosSecure.get(`/jobs/applications?email=${email}`).then(res=>res.data)
    }
    return {JobsCreatedByPromise}
};

export default useJobAPI;