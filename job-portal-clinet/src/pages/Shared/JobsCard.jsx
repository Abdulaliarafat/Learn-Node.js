import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router';

const JobsCard = ({ job }) => {
    const { title, location,requirements,_id,category, salaryRange, description, company, company_logo } = job;
    return (
        <div className="card bg-base-100 w-96 shadow-sm border p-5">
            <div className='flex gap-5'>
                <figure>
                    <img className='w-25'
                        src={company_logo} />
                </figure>
                <div className=''>
                    <h1 className='font-bold text-3xl'>{company}</h1>
                    <p className='font-light text-sm flex items-center gap-2'><CiLocationOn />{location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                   {title}
                    <div className="badge badge-secondary">{category}</div>
                </h2>
                <p className='font-semibold'>Salary : {salaryRange.min}-{salaryRange.max} {salaryRange.currency}</p>
                <p>{description}</p>
                <div className="card-actions ">
                   {
                    requirements.map((skill,index)=><div key={index} className="badge badge-outline">{skill}</div>)
                   }  
                </div>
               <div className='card-actions justify-end'>
                 <Link to={`/jobDetails/${_id}`} className='btn mt-2 btn-primary'>Show details</Link>
               </div>
            </div>
        </div>
    );
};

export default JobsCard;