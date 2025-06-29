import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';
const ProFirstLogo = () => {
    return (
       <Link to='/'>
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <h1 className='font-extrabold text-3xl -ml-3.5'>ProFast</h1>
        </div>
       </Link>
    );
};

export default ProFirstLogo;