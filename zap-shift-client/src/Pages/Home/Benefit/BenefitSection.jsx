import React from 'react';
import BenefitCard from './BenefitCard';
import service from "../../../assets/benefits/live-tracking.png"
import call from "../../../assets/benefits/safe-delivery.png"
import support from "../../../assets/benefits/safe-delivery.png"


const benefitData = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        img: service
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        img: call
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        img:support
    }
];

const BenefitSection = () => {
    return (
        <div className="py-12 px-4 md:px-16 bg-base-200 my-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-base-content">Why Choose Us?</h2>
                <p className="text-base-content/70 mt-2">Here are the benefits you'll enjoy when using our services.</p>
            </div>
            <div className="flex flex-col gap-6">
                {benefitData.map((benefit) => (
                    <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                    />
                ))}
            </div>
        </div>
    );
};

export default BenefitSection;
