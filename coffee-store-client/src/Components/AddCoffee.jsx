import React from 'react';
import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleAddCoffee = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const newFormData = Object.fromEntries(formData.entries())
        console.log(newFormData)
        // setData to server
        fetch('http://localhost:3000/coffees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFormData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after data DB', data)
                Swal.fire({
                    title: "Coffee added successfully",
                    icon: "success",
                    draggable: true
                });
                // form.reset()
            })
    }
    return (
        <div className='max-w-5xl mx-auto px-24 py-5 bg-yellow-50 rounded-2xl shadow-xl my-5'>
            <div className=' px-12 py-5  text-center space-y-4'>
                <h1 className='font-normal text-4xl '>Add New Coffee</h1>
                <p className='text-lg '>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout.  The point of using Lorem Ipsum is that it has a more-or-less normal  distribution of letters, as opposed to using Content here.</p>
            </div>
            <form onSubmit={handleAddCoffee}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Name</label>
                        <input type="text" name='name' className="input w-full " placeholder="Enter coffee name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Quantity</label>
                        <input type="text" name='quantity' className="input w-full " placeholder="Enter quantity" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label  font-bold">Supplier</label>
                        <input type="text" name='supplier' className="input w-full " placeholder="Enter coffee supplier" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Taste</label>
                        <input type="text" name='taste' className="input w-full " placeholder="Enter coffee taste" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Price</label>
                        <input type="text" name='price' className="input w-full " placeholder="Enter coffee price" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label font-bold">Details</label>
                        <input type="text" name='details' className="input w-full " placeholder="Enter coffee details" />
                    </fieldset>
                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 my-6">
                    <label className="label font-bold">Photo</label>
                    <input type="text" name='photo' className="input w-full " placeholder="Enter photo URL" />
                </fieldset>
                <input type="submit" className='btn w-full font-bold' value="Add Coffee" />
            </form>
        </div>
    );
};

export default AddCoffee;