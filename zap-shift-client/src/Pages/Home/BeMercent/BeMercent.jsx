import React from 'react';
import img from '../../../assets/location-merchant.png'

const BeMercent = () => {
    return (
        <div className=" bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#10373b] py-10 px-7 my-10 rounded-3xl gap-5 ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={img}
                    className='w-95'
                />
                <div className=''>
                    <h1 className="text-5xl font-bold text-balance">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                   <div className='flex'>
                     <button className="hover:bg-amber-400 bg-[#0d2a2d] hover:text-white btn btn-primary rounded-3xl">Become a Merchant</button>
                     <button className="hover:bg-amber-400 md:ml-10 hover:text-white btn btn-primary bg-[#0c272a] rounded-3xl">Earn with Profast Courier</button>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default BeMercent;