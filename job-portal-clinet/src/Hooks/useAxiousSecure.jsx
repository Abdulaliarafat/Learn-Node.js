import axios from 'axios';
import React from 'react';
import useAuth from './UseAuth';
const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-seven-omega.vercel.app'
})
const useAxiousSecure = () => {
    const { user,signOutUser } = useAuth()
    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config
    })
    // response interseptor
    axiosInstance.interceptors.response.use((response) => {
        return response
    }, (error) => {
        console.log(error)
        if(error.status === 401 || error.status === 403){
          signOutUser()
          .then(
            ()=>{
            console.log('signOut from 401 status code')
          })
          .catch(err=>{
            console.log(err)
          })
        }
        console.log('error in interseptor',error)
        return Promise.reject(error)
    })
    return axiosInstance
};

export default useAxiousSecure;