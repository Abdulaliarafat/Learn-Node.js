import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { loading, user } = useAuth()
    const location=useLocation()

    if (loading) {
        return <div className='text-center mt-40 mb-60'>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children
};

export default PrivateRoutes;