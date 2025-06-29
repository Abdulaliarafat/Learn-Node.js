import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetails = () => {
    const {title,_id,company_logo,company}=useLoaderData()
    return (
        <div className='max-w-4xl mx-auto flex justify-center'>
            <div className=''>
                <img className='w-40' src={company_logo} alt="" />
            </div>
           <div className='space-y-1 py-3'>
            <h1 className="text-lg font-bold">{company}</h1>
           <p className='font-light text-md'>{title}</p>
           <Link to={`/jobApplay/${_id}`} className="btn btn-primary mt-6">Applay now</Link>
           </div>
           
        </div>
    );
};

export default JobDetails;