import React from 'react';
import useAuth from '../../Hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJobs = () => {
    const { user } = useAuth()
    const handleAddJobForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        const { min, max, currency, ...newJob } = data;
        // prossces salary range data...
        newJob.salaryRange = { min, max, currency };
        // prossese requarments data..
        newJob.requirements = newJob.requirements.split(',').map(req => req.trim())
        // prosses resposibilitis..
        newJob.responsibilities = newJob.responsibilities.split(',').map(req => req.trim())
        newJob.status = 'active'
        console.log(newJob)
        // save jobs to database
        axios.post('https://job-portal-server-seven-omega.vercel.app/jobs', newJob)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "This new job has been saved and published.",
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
        <div className='max-w-3xl mx-auto my-5'>
            <form onSubmit={handleAddJobForm}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Basic Info</legend>
                    <label className="label ml-30 font-bold text-md">Job title</label>
                    <input type="text" name='title' className="input w-lg mx-auto" placeholder="Job title" />

                    <label className="label ml-30 font-bold text-md">Company</label>
                    <input type="text" name='company' className="input w-lg mx-auto" placeholder="Company name" />

                    <label className="label ml-30 font-bold text-md">Location</label>
                    <input type="text" name='location' className="input w-lg mx-auto" placeholder="Company location" />

                    <label className="label ml-30 font-bold text-md">Company logo</label>
                    <input type="text" name='company_logo' className="input w-lg mx-auto" placeholder="Company logo URL" />
                </fieldset>
                {/* JobType */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Job type</legend>
                    <div className="filter mx-auto">
                        <input className="btn filter-reset " type="radio" name="jobType" aria-label="All" />
                        <input className="btn " type="radio" name="jobType" value='On-site' aria-label="On-site" />
                        <input className="btn " type="radio" name="jobType" value='Remote' aria-label="Remote" />
                        <input className="btn " type="radio" name="jobType" value='Hybrid' aria-label="Hybrid" />
                    </div>
                </fieldset>
                {/* Job category */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Job category</legend>
                    <select defaultValue="Job category" name='category' className="select mx-auto">
                        <option disabled={true}>Job category</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finence</option>
                    </select>
                </fieldset>
                {/* Applocation deadline */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Applocation deadline</legend>
                    <input type="date" name='deadline' className='mx-auto' />
                </fieldset>
                {/* Salary range */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 mx-auto">
                    <legend className="fieldset-legend">Salary range</legend>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                        <div>
                            <label className="label">Minimun salary</label>
                            <input type="text" name='min' className="input" placeholder="Minimun salary" />
                        </div>

                        <div>
                            <label className="label">Maximum salary</label>
                            <input type="text" name='max' className="input" placeholder="Maximum salary" />
                        </div>

                        <div>
                            <label className="label">Currency</label>
                            <select defaultValue="Select a Currency" name='currency' className="select mx-auto">
                                <option disabled={true}>Select a Currency</option>
                                <option>BDT</option>
                                <option>USD</option>
                                <option>EURO</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                {/*Job description*/}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Job description</legend>
                    <textarea name="description" className='textarea w-full' placeholder='Job description'></textarea>
                </fieldset>
                {/*Requirements*/}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Job requirements</legend>
                    <textarea name="requirements" className='textarea w-full' placeholder='Requirements (separete by comma)'></textarea>
                </fieldset>
                {/*Job responsibilities*/}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">Job responsibilities</legend>
                    <textarea name="responsibilities" className='textarea w-full' placeholder='responsibilities (separete by comma)'></textarea>
                </fieldset>
                {/* HR related info */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-3xl border p-4 space-y-2 ">
                    <legend className="fieldset-legend text-center">HR related info </legend>
                    <label className="label ml-30 font-bold text-md">HR name</label>
                    <input type="text" name='hr_name' className="input w-lg mx-auto" placeholder="HR name" />

                    <label className="label ml-30 font-bold text-md">HR email</label>
                    <input type="email" defaultValue={user?.email} readOnly name='hr_email' className="input w-lg mx-auto font-bold" placeholder="HR email" />
                    <input type="submit" className='btn btn-primary' value="Add job" />
                </fieldset>
            </form>
        </div>
    );
};

export default AddJobs;