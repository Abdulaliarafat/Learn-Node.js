import React from 'react';
import { Link, useLoaderData } from 'react-router';

const CoffeeDetails = () => {
    const coffeeData=useLoaderData();
    const { _id, photo, name, price, details, quantity, supplier, taste } = coffeeData
    return (
        <div className='max-w-2xl mx-auto my-5 shadow-2xl rounded-2xl'>
            <Link className='btn bg-blue-400 text-white mb-5 shadow-2xl hover:rounded-2xl' to='/'>Back to home</Link>
           <div className="flex justify-center items-center">
             <div className=''>
                <img className='block mx-auto w-80'  src={photo} alt="" />
            </div>
            <div>
                <p className='font-bold'>{name}</p>
                <p className='font-semibold'>Price : {price}</p>
                <p className='font-semibold'>Quantity :{quantity}</p>
                <p className='font-semibold'>Supplier : {supplier}</p>
                <p className='font-semibold'>Taste : {taste}</p>
                <p className='font-semibold'>Details : {details}</p>
                <button className='btn mt-2 bg-blue-500 text-white'>Order new</button>
            </div>
           </div>
        </div>
    );
};

export default CoffeeDetails;