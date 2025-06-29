import axios from 'axios';
import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Swal from 'sweetalert2';

const ViewApplication = () => {
    const { job_id } = useParams()
    const applications = useLoaderData()
    const handleStatusChange = (e, app_id) => {
        console.log(e.target.value, app_id)
        // patch
        axios.patch(`https://job-portal-server-seven-omega.vercel.app/applications/${app_id}`, { status: e.target.value })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Application status updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <h1>{applications.length} Application for:{job_id}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            applications.map((application, index) =>
                                <tr key={application._id}>
                                    <th>{index + 1}</th>
                                    <td>{application.applicant}</td>
                                    <td></td>
                                    <td><select onChange={e => handleStatusChange(e, application._id)} defaultValue={application.status} className="select">
                                        <option disabled={false}>Update status</option>
                                        <option>Pending</option>
                                        <option>Call for interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplication;