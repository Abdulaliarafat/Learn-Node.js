import React from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../Shared/Loading';
import dayjs from 'dayjs';

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    if (isPending) {
        return <Loading></Loading>
    }
    return (
        <div className="mt-6 px-2 md:px-6">
            <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Payment History</h2>

            <div className="overflow-x-auto rounded-xl shadow-sm">
                <table className="table table-zebra w-full text-sm md:text-base">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Email</th>
                            <th>Amount (৳)</th>
                            <th>Method</th>
                            <th>Transaction ID</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment.transactionId}>
                                    <td>{index + 1}</td>
                                    <td className="break-all max-w-[120px] md:max-w-none">{payment.parcelId}</td>
                                    <td className="break-all max-w-[140px]">{payment.email}</td>
                                    <td>৳{payment.amount}</td>
                                    <td className="capitalize">{payment.paymentMethod}</td>
                                    <td className="break-all max-w-[160px]">{payment.transactionId}</td>
                                    <td className="whitespace-nowrap">
                                        {dayjs(payment.paid_At).format('DD MMM YYYY, h:mm A')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500 py-6">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;