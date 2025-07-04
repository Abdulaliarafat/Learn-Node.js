import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
// import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Loading from '../../Shared/Loading';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate()
// get use tanstac qurey
  const {isPending, data: parcels = [],refetch } = useQuery({
    queryKey: ['my-parcel', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  if(isPending){
    return <Loading></Loading>
  }
// handel view
  const handleView = (parcel) => {
    console.log('View:', parcel);
    // Navigate to details or show modal
  };
// handle pay
  const handlePay = (id) => {
    console.log('Pay:', id);
    // Redirect to payment page
    navigate(`/dashboard/payment/${id}`)
  };
// delete parcel
  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This parcel will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);
      console.log(res.data)
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'The parcel has been deleted.', 'success');
        // ✅ Automatically refetch updated data     
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to delete the parcel.', 'error');
    }
    refetch()
  }
};


  return (
    <div className="mt-6 px-4">
      <h2 className="text-xl font-semibold mb-4">📦 My Parcels</h2>
      <div className="w-full overflow-x-auto">
        <table className="table table-zebra min-w-[800px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Cost (৳)</th>
              <th>Created At</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-mono text-xs whitespace-nowrap max-w-[120px] truncate">
                  {parcel.tracking_Id}
                </td>
                <td className="capitalize text-sm">{parcel.type.replace('-', ' ')}</td>
                <td className="text-sm max-w-[160px] truncate">{parcel.title}</td>
                <td className="text-sm whitespace-nowrap">৳{parcel.deliveryCost}</td>
                <td className="text-xs whitespace-nowrap">
                  {new Date(parcel.creation_date).toLocaleString()}
                </td>
                <td>
                  <span
                    className={`badge text-xs ${
                      parcel.payment_status === 'paid'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}
                  >
                    {parcel.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td className="flex flex-col  gap-2 flex-wrap">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>
                  {parcel.payment_status === 'unpaid' && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-xs btn-success"
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
