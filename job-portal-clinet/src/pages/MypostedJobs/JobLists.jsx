import React, { use } from 'react';
import { Link } from 'react-router';

const JobLists = ({ JobsCreatedByPromise }) => {
    const jobs = use(JobsCreatedByPromise)
    return (
        <div>
            <h2 className='text-xl'>Jobs created by you : {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Job title</th>
                            <th>Deadline</th>
                            <th>Count</th>
                            <th>View applications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                      {
                        jobs.map((job,index)=>
                              <tr key={job._id}>
                            <th>{index+1}</th>
                            <td>{job.title}</td>
                            <td>{job.deadline}</td>
                            <td>{job.application_count}</td>
                            <td><Link to={`/ViewApplications/${job._id}`}>View applications</Link></td>
                        </tr>
                        )
                      }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobLists;