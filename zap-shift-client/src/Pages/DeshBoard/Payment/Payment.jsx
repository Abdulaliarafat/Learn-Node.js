import React from 'react';
import PaymentFrom from './PaymentFrom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
    return (
        <div>
           <Elements stripe={stripePromise}>
            <PaymentFrom></PaymentFrom>
           </Elements>
        </div>
    );
};

export default Payment;