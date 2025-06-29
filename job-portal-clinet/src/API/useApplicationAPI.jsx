import React from 'react';
import useAxiousSecure from '../Hooks/useAxiousSecure';

const useApplicationAPI = () => {
    const axiosSecure = useAxiousSecure()
    const myApplicationPromise = (email) => {
        return axiosSecure.get(`/applications?email=${email}`).then(res=>res.data)
    }
    return {myApplicationPromise}
};

export default useApplicationAPI;