import { useForm } from 'react-hook-form';
import useAuth from '../../../Hook/useAuth';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const BeARider = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure=useAxiosSecure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  // Get unique regions
  useEffect(() => {
    const uniqueRegions = [...new Set(serviceCenters.map(center => center.region))];
    setRegions(uniqueRegions);
  }, [serviceCenters]);

  // Filter districts based on selected region
  useEffect(() => {
    const filtered = serviceCenters
      .filter(center => center.region === selectedRegion)
      .map(center => center.district);
    setDistricts(filtered);
  }, [selectedRegion, serviceCenters]);

  const onSubmit = async (data) => {
  const riderApplication = {
    ...data,
    name: user.displayName,
    email: user.email,
    status: 'pending',
    applied_at: new Date().toISOString(),
  };

  try {
    console.log('🚀 Rider Application:', riderApplication);
    const res= await axiosSecure.post('/riders', riderApplication);
    if(res.data.insertedId){
        Swal.fire({
      icon: 'success',
      title: 'Application Submitted!',
      text: 'Your rider application is under panding approval.',
      confirmButtonColor: '#4CAF50',
    });
    reset();
    }
  } catch (error) {
    console.error("Error submitting rider application:", error);
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed!',
      text: 'Please try again later.',
      confirmButtonColor: '#f44336',
    });
  }
};

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Become a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            defaultValue={user?.displayName}
            readOnly
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            readOnly
            placeholder="Your email address"
          />
        </div>

        {/* Age */}
        <div>
          <label className="label">Age</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("age", { required: "Age is required" })}
            placeholder="e.g., 22"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="e.g., 017XXXXXXXX"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Region */}
        <div>
          <label className="label">Region</label>
          <select
            className="select select-bordered w-full"
            {...register("region", { required: "Region is required" })}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select your region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>{region}</option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            {...register("district", { required: "District is required" })}
          >
            <option value="">Select your district</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
        </div>

        {/* National ID */}
        <div>
          <label className="label">National ID</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("nid", { required: "NID number is required" })}
            placeholder="e.g., 1234567890123"
          />
          {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="label">Bike Brand</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("bike_brand", { required: "Bike brand is required" })}
            placeholder="e.g., Honda, Yamaha"
          />
          {errors.bike_brand && <p className="text-red-500 text-sm">{errors.bike_brand.message}</p>}
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="label">Bike Registration Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("bike_registration", { required: "Registration number is required" })}
            placeholder="e.g., DHA-123456"
          />
          {errors.bike_registration && <p className="text-red-500 text-sm">{errors.bike_registration.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button className="btn btn-primary w-full mt-4" type="submit">
            Submit Rider Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
