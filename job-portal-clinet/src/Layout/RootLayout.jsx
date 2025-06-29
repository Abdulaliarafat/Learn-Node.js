import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import Navber from '../pages/Shared/Navber';

const RootLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;