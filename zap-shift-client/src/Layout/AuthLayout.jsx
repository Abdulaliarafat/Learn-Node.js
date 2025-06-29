import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../../src/assets/authImage.png'
import ProFirstLogo from '../Pages/Shared/Profirst/ProFirstLogo';

const AuthLayout = () => {
    return (
        <div className="p-10 bg-base-200 my-5">
            <ProFirstLogo></ProFirstLogo>
        <div className="flex flex-col md:flex-row-reverse">
               <div className='flex-1 mt-10'>
                 <img
                    src={authImg}
                    className="md:max-w-lg rounded-lg shadow-2xl"
                />
               </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;