import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffeeData = useLoaderData();
    const { _id, photo, name, price, details, quantity, supplier, taste } = coffeeData
    const navigate=useNavigate()
    console.log(coffeeData)
    const handleUpdateCoffee = (e) => {
        e.preventDefault()
        const form = e.target;
        const fromData = new FormData(form).entries();
        const updatedCoffee = Object.fromEntries(fromData)
        console.log(updatedCoffee)
        // update coffees
        fetch(`http://localhost:3000/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position:'center-start',
                        icon: "success",
                        title: "Coffee updated successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });
                 navigate('/')
                }
            })
    }
    return (
        <div className='max-w-5xl mx-auto px-24 py-5 bg-yellow-50 rounded-2xl shadow-xl my-5'>
            <Link className='btn bg-blue-400 text-white mb-5 shadow-2xl hover:rounded-2xl' to='/'>Back to home</Link>
            <div className=' px-12 py-5  text-center space-y-4'>
                <h1 className='font-normal text-4xl '>Update Coffee</h1>
            </div>
            <form onSubmit={handleUpdateCoffee}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Name</label>
                        <input type="text" name='name' defaultValue={name} className="input w-full " placeholder="Enter coffee name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Quantity</label>
                        <input type="text" name='quantity' defaultValue={quantity} className="input w-full " placeholder="Enter quantity" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label  font-bold">Supplier</label>
                        <input type="text" name='supplier' defaultValue={supplier} className="input w-full " placeholder="Enter coffee supplier" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Taste</label>
                        <input type="text" name='taste' defaultValue={taste} className="input w-full " placeholder="Enter coffee taste" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Price</label>
                        <input type="text" name='price' defaultValue={price} className="input w-full " placeholder="Enter coffee price" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Details</label>
                        <input type="text" name='details' defaultValue={details} className="input w-full " placeholder="Enter coffee details" />
                    </fieldset>
                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 my-6">
                    <label className="label font-bold">Photo</label>
                    <input type="text" name='photo' defaultValue={photo} className="input w-full " placeholder="Enter photo URL" />
                </fieldset>
                <input type="submit" className='btn w-full font-bold' value="Update Coffee" />
            </form>
        </div>
    );
};

export default UpdateCoffee;