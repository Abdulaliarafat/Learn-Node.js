import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import CoffeeCard from './CoffeeCard';


const Home = () => {
    const initailData = useLoaderData();
    const [coffees,setCoffees]=useState(initailData)
    return (
        <div className='max-w-4xl mx-auto my-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
            coffees.map(coffee => <CoffeeCard coffee={coffee} setCoffees={setCoffees} key={coffee._id} coffee={coffee}></CoffeeCard>)}
            </div>
        </div>
    );
};

export default Home;