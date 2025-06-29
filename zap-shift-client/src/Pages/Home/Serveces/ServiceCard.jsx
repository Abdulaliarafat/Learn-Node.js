import React from 'react';
import { IconContext } from 'react-icons';

const ServiceCard = ({ service }) => {
    // console.log(service)
    const {title,description ,icon: Icon}=service
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center transition duration-300 hover:bg-green-500 hover:text-white hover:shadow-xl">
      <div className="flex justify-center mb-4 text-4xl text-primary">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
