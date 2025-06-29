import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, photo, name, price,quantity, supplier } = coffee
    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                // start deleted coffee..
                fetch(`http://localhost:3000/coffees/${_id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                   if(data.deletedCount){
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your coffee has been deleted.",
                    icon: "success"
                });
                const remainingCoffees=coffees.filter(cof=>cof._id !==id);
                setCoffees(remainingCoffees)
                   }
                })
            }
        });
    }
    return (
        <div className="card card-side bg-base-100 shadow-md p-4 ">
            <figure>
                <img
                    className=''
                    src={photo}
                    alt="Movie" />
            </figure>
            <div className="flex w-full justify-around items-center">
                <div className='space-y-2'>
                    <h2 className=" font-bold">{name}</h2>
                    <p className='font-medium'>Price : {price}</p>
                    <p className='font-medium'>Quantity : {quantity}</p>
                    <p className='font-medium'>Supplier : {supplier}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="join join-vertical space-y-2">
                        <Link to={`/coffee/${_id}`} className="btn hover:rounded-2xl rounded-md join-item bg-[#D2B48C] text-white">View</Link>
                        <Link to={`updateCoffee/${_id}`} className="btn hover:rounded-2xl rounded-md join-item bg-black text-white">Edit</Link>
                        <button onClick={() => handleDelete(_id)} className="btn hover:rounded-2xl rounded-md join-item bg-red-600 text-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;