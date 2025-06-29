import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';

// tracing id ganetated function
function generateTrackingId(region = "", district = "") {
    const regionCode = region.slice(0, 3).toUpperCase(); // e.g., "DHA" for Dhaka
    const districtCode = district.slice(0, 3).toUpperCase(); // e.g., "NAR" for Narayanganj

    const date = new Date();
    const datePart = date.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., "20250626"

    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "K3L9"

    return `BD-${regionCode}${districtCode}-${datePart}-${randomPart}`;
}

const SendPercel = () => {
    const { user } = useAuth()
    const serviceCenters = useLoaderData()

    // States to hold selected region for Sender and Receiver
    const [senderRegion, setSenderRegion] = useState("");
    const [receiverRegion, setReceiverRegion] = useState("");

    // Extract unique regions (divisions)
    const regions = [...new Set(serviceCenters.map(item => item.region))];

    // Filter districts by selected region for Sender and Receiver
    const senderDistricts = serviceCenters
        .filter(item => item.region === senderRegion)
        .map(item => item.district);

    const receiverDistricts = serviceCenters
        .filter(item => item.region === receiverRegion)
        .map(item => item.district);
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const parcelType = watch("type");
    
    const onSubmit = (data) => {
        const isSameDistrict = data.senderDistrict === data.receiverDistric;
        const weight = parseFloat(data.weight) || 0;

        let baseCost = 0;
        let extraCost = 0;
        let totalCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
            breakdown = `📄 Parcel Type: Document<br>
                 📦 Base Cost: ৳${baseCost}<br>
                 🚛 Route: ${isSameDistrict ? "Within City" : "Outside City/District"}`;
            totalCost = baseCost;
        } else if (data.type === "non-document") {
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `📄 Parcel Type: Non-Document (≤ 3kg)<br>
                   📦 Base Cost: ৳${baseCost}<br>
                   🚛 Route: ${isSameDistrict ? "Within City" : "Outside City/District"}`;
                totalCost = baseCost;
            } else {
                const extraKg = weight - 3;
                baseCost = isSameDistrict ? 110 : 150;
                extraCost = extraKg * 40 + (!isSameDistrict ? 40 : 0);
                totalCost = baseCost + extraCost;
                breakdown = `📄 Parcel Type: Non-Document (> 3kg)<br>
                   📦 Base Cost: ৳${baseCost}<br>
                   ➕ Extra Weight (${extraKg}kg × ৳40): ৳${extraKg * 40}<br>
                   ${!isSameDistrict ? "➕ Outside City Surcharge: ৳40<br>" : ""}
                   🚛 Route: ${isSameDistrict ? "Within City" : "Outside City/District"}`;
            }
        }

        // Show SweetAlert
        Swal.fire({
            title: `Delivery Cost Breakdown`,
            html: `
      <div class="text-left text-sm leading-relaxed">
        ${breakdown}
        <hr class="my-2">
        <p class="text-lg font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "✅ Proceed to Payment",
            cancelButtonText: "✏️ Edit Info",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d97706",
        }).then((result) => {
            if (result.isConfirmed) {
                const parcel = {
                    ...data,
                    deliveryCost: totalCost,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_by: user?.email,
                    creation_date: new Date().toISOString(),
                    tracking_Id: generateTrackingId()
                };
                console.log("Saving to DB:", parcel);

                Swal.fire("Saved!", "Parcel info saved successfully.", "success");
                reset(); // clear form
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* <Toaster /> */}
            <h1 className="text-2xl font-bold mb-1">Send a Parcel</h1>
            <p className="text-gray-600 mb-6">Fill in the required fields to schedule your delivery</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Parcel Info */}
                <section className="border p-4 rounded-md shadow">
                    <h2 className="text-lg font-semibold mb-3">Parcel Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Type</label>
                            <select {...register("type", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Type</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-Document</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
                        </div>

                        <div>
                            <label className="label">Parcel name</label>
                            <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                        </div>

                        {parcelType === "non-document" && (
                            <div>
                                <label className="label">Weight (kg)</label>
                                <input type="number" {...register("weight")} className="input input-bordered w-full" />
                            </div>
                        )}
                    </div>
                </section>

                {/* Sender Info */}

                <section className="border p-4 rounded-md shadow">
                    <h2 className="text-lg font-semibold mb-3">Sender Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("senderName", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">Contact</label>
                            <input type="tel" {...register("senderContact", { required: true })} className="input input-bordered w-full" />
                        </div>

                        {/* select divition */}

                        <div>
                            <label className="block mb-1">Select Region (Division)</label>
                            <select
                                {...register("senderRegion", { required: true })}
                                onChange={e => setSenderRegion(e.target.value)}
                                className="select select-bordered w-full"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.senderRegion && <p className="text-red-500 text-sm">Please select a region</p>}
                        </div>

                        {/* select service center as district */}

                        <div>
                            <label className="block mb-1">Select Service Center (District)</label>
                            <select
                                {...register("senderDistrict", { required: true })}
                                className="select select-bordered w-full"
                                defaultValue=""
                                disabled={!senderRegion}
                            >
                                <option value="" disabled>Select District</option>
                                {senderDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.senderDistrict && <p className="text-red-500 text-sm">Please select a district</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Address</label>
                            <input type="text" {...register("senderAddress", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Pick-up Instruction</label>
                            <textarea {...register("pickupInstruction", { required: true })} className="textarea textarea-bordered w-full" />
                        </div>
                    </div>
                </section>

                {/* Receiver Info */}

                <section className="border p-4 rounded-md shadow">
                    <h2 className="text-lg font-semibold mb-3">Receiver Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" {...register("receiverName", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">Contact</label>
                            <input type="tel" {...register("receiverContact", { required: true })} className="input input-bordered w-full" />
                        </div>

                        {/* select divition  */}

                        <div>
                            <label className="block mb-1">Select Region (Division)</label>
                            <select
                                {...register("receiverRegion", { required: true })}
                                onChange={e => setReceiverRegion(e.target.value)}
                                className="select select-bordered w-full"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.receiverRegion && <p className="text-red-500 text-sm">Please select a region</p>}
                        </div>

                        <div>
                            <label className="block mb-1">Select Service Center (District)</label>
                            <select
                                {...register("receiverDistrict", { required: true })}
                                className="select select-bordered w-full"
                                defaultValue=""
                                disabled={!receiverRegion}
                            >
                                <option value="" disabled>Select District</option>
                                {receiverDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.receiverDistrict && <p className="text-red-500 text-sm">Please select a district</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Address</label>
                            <input type="text" {...register("receiverAddress", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Delivery Instruction</label>
                            <textarea {...register("deliveryInstruction", { required: true })} className="textarea textarea-bordered w-full" />
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit Parcel</button>
                </div>
            </form>
        </div>
    );
};

export default SendPercel;