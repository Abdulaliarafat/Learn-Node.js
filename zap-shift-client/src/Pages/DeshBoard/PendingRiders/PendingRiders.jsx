import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch all pending riders
  const {isPending, data: riders = [], refetch } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending?status=pending');
      return res.data;
    },
  });
  if(isPending){
    return <Loading></Loading>
  }

  const handleView = (rider) => {
    setSelectedRider(rider);
    document.getElementById('rider_details_modal').showModal();
  };

  const handleAction = async (status) => {
    const res = await axiosSecure.patch(`/riders/${selectedRider._id}`, { status });
    if (res.data.modifiedCount > 0) {
      document.getElementById('rider_details_modal').close();
      refetch();
      Swal.fire({
        icon: 'success',
        title: `Rider ${status === 'approved' ? 'active' : 'rejected'} successfully!`,
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Pending Rider Applications</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Region</th>
            <th>District</th>
            <th>Bike Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.phone}</td>
              <td>{rider.region}</td>
              <td>{rider.district}</td>
              <td>{rider.bike_brand}</td>
              <td>
                <button
                  onClick={() => handleView(rider)}
                  className="btn btn-xs btn-info"
                >
                Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rider Details Modal */}
      <dialog id="rider_details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          {selectedRider && (
            <>
              <h3 className="font-bold text-lg mb-2">{selectedRider.name}'s Application</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><strong>Email:</strong> {selectedRider.email}</p>
                <p><strong>Phone:</strong> {selectedRider.phone}</p>
                <p><strong>Age:</strong> {selectedRider.age}</p>
                <p><strong>Region:</strong> {selectedRider.region}</p>
                <p><strong>District:</strong> {selectedRider.district}</p>
                <p><strong>National ID:</strong> {selectedRider.nid}</p>
                <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                <p><strong>Registration No:</strong> {selectedRider.registrationNumber}</p>
                {selectedRider.otherInfo && <p className="col-span-2"><strong>Other Info:</strong> {selectedRider.otherInfo}</p>}
              </div>

              <div className="modal-action mt-4">
                <form method="dialog" className="flex gap-3">
                  <button className="btn">Close</button>
                  <button
                    onClick={() => handleAction('approved')}
                    type="button"
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction('rejected')}
                    type="button"
                    className="btn btn-error"
                  >
                   Rejected
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default PendingRiders;
