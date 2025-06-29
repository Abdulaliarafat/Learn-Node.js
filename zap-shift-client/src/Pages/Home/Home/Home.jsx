import React from 'react';
import Banner from '../Banner/Banner';
import ServiceSection from '../Serveces/ServiceSection';
import LogoSlider from '../LogoSlider/LogoSlider';
import BenefitSection from '../Benefit/BenefitSection';
import BeMercent from '../BeMercent/BeMercent';
import CustomerReview from '../Customer/CustomerReview';
import FaqSection from '../FAQ/FaqSection';

const Home = () => {
    return (
        <div className='my-5'>
            <Banner></Banner>
            <ServiceSection></ServiceSection>
            <LogoSlider></LogoSlider>
            <BenefitSection></BenefitSection>
            <BeMercent></BeMercent>
            <CustomerReview></CustomerReview>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;