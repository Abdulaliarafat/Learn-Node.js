import React from 'react';

const BenefitCard = ({benefit}) => {
    const {img, title, description}=benefit
  return (
    <div className="card lg:card-side bg-base-100 shadow-md">
      {/* Left Image */}
      <figure className="p-5 lg:h-50">
        <img src={img} alt={title} className="w-full dark:bg-white md:p-5 lg:p-3 h-40 object-contain" />
      </figure>

      {/* Vertical Divider (only for large screens) */}
      <div className="hidden lg:flex items-center px-2">
        <div className="w-px h-24 bg-base-300"></div>
      </div>

      {/* Right Content */}
      <div className="card-body lg:w-2/3 my-8 gap-4">
        <h2 className="card-title text-base-content">{title}</h2>
        <p className="text-sm text-base-content/80">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
