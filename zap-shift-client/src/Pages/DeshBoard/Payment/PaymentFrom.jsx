import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../Shared/Loading';
import useAuth from '../../../Hook/useAuth';
import Swal from 'sweetalert2';

const PaymentFrom = () => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const [error, setError] = useState('')
    console.log(parcelId)
    // Use tanstac quary
    const { isPanding, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/${parcelId}`);
            return res.data
        }
    })
    if (isPanding) {
        return <Loading></Loading>
    }
    console.log(parcelInfo)

    const amount = parcelInfo.deliveryCost
    // to send server covert to cent 
    const amountInCent = amount * 100
    console.log(amountInCent)
    const handleSubmite = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (!card) {
            return
        }
        //step: 1 validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
        }
        else {
            setError('')
            console.log('paymnent', paymentMethod)
            // step 2 : create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCent,
                parcelId
            })
            //Step : 3 Confirm payment
            const clientSecret = res.data.clientSecret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,

                    },
                },
            });
            // validation
            if (result.error) {
                setError(result.error.message);
                alert('Payment failed');
            } else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    alert('Payment successful!');
                    console.log(result)
                 const  transactionId=result.paymentIntent.id
                    // step: 4 mark parcel paid and save payment history
                    //  Save payment data to MongoDB here (if needed)
                    const paymentData =
                    {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    //   post payment data
                    const paymentRes = await axiosSecure.post('/payments', paymentData)
                    console.log(paymentRes.data)

                    if (paymentRes.data.insertedId) {
                        console.log('payment successfull')
                        Swal.fire({
                            title: "Payment Successful!",
                            html: `<p>Your transaction ID is:</p><strong>${transactionId}</strong>`,
                            icon: "success",
                            confirmButtonText: "Go to My Parcels",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/dashboard/myparcels"); // Update route if needed
                            }
                        })
                    }
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmite} className="p-6 bg-gray-200 rounded shadow space-y-4 max-w-md mx-auto">
                <CardElement className="p-3 border rounded text-black">
                </CardElement>
                <button type="submit"
                    disabled={!stripe}
                    className="btn btn-primary w-full bg-amber-600 text-white"
                >
                    Pay ${amount}
                </button>
                {error && <p className='text-red-500 text-center font-bold'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentFrom;