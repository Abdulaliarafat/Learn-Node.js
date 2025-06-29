import React, { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from './Context/AuthProvider';

const Users = () => {
    const { userDelete } = use(AuthContext)
    const initialUsers = useLoaderData()
    const [users, serUsers] = useState(initialUsers)
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const remainnigUser = users.filter(user => user._id !== id)
                            serUsers(remainnigUser)
                            // delete from firebase..
                            userDelete()
                                .then(() => {
                                })
                                .catch((error) => {
                                    console.log(error)
                                });
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div className='max-w-4xl mx-auto my-5'>
            <div className="overflow-x-auto">
                <h1 className='font-bold text-2xl text-center mb-5'>All users</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                No
                            </th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Detais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm  opacity-70">{user.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.phone}
                                </td>
                                <td>{user.email}</td>
                                <th>
                                    <button className="btn btn-xs bg-purple-500 text-white mr-1 hover:rounded-2xl">Details</button>
                                    <button className="btn btn-xs bg-blue-500 text-white mr-1 hover:rounded-2xl">Edit</button>
                                    <button onClick={() => { handleDeleteUser(user._id) }} className="btn btn-xs bg-red-600 text-white mr-1 hover:rounded-2xl">Delete</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;