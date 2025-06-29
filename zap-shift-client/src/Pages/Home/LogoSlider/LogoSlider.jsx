import React from 'react';
import Marquee from 'react-fast-marquee';
import logo1 from '../../../assets/brands/amazon.png'
import logo2 from '../../../assets/brands/amazon_vector.png'
import logo3 from '../../../assets/brands/casio.png'
import logo4 from '../../../assets/brands/moonstar.png'
import logo5 from '../../../assets/brands/randstad.png'
import logo6 from '../../../assets/brands/start-people 1.png'
import logo7 from '../../../assets/brands/start.png'

const logos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];

const LogoSlider = () => {
  return (
    <section className="py-4 bg-gray-100 dark:bg-gray-200 my-5 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-black">
       We've helped thousands of sales teams
      </h2>

      <Marquee speed={60} gradient={false}>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`logo-${index}`}
            className="mx-10 my-5 h-6 w-auto object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default LogoSlider;
