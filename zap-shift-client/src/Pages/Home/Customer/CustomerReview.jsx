import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img from '../../../assets/customer-top.png'
import avatar1 from '../../../assets/avater/Avatar1.png'
import avatar2 from '../../../assets/avater/images (1).jpg'
import avatar3 from '../../../assets/avater/images.jpg'
import avatar4 from '../../../assets/avater/images.png'
import avatar5 from '../../../assets/avater/images2.png'


// Sample customer data
const reviews = [
  {
    id: 1,
    review: "Past Track is incredibly reliable. My parcels always arrive on time, no stress!",
    name: "Imran Hossain",
    profession: "Online Seller",
    avatar: avatar3
  },
  {
    id: 2,
    review: "Their tracking system gives me peace of mind. I can monitor every delivery step.",
    name: "Shahriar Alam",
    profession: "Logistics Manager",
    avatar: avatar1
  },
  {
    id: 3,
    review: "Smooth experience every time. My customers are always happy with delivery speed.",
    name: "Hasib Rahman",
    profession: "E-commerce Entrepreneur",
    avatar: avatar3
  },
  {
    id: 4,
    review: "I use Past Track for all my business shipments. Fast, safe, and professional.",
    name: "Moin Uddin",
    profession: "Retail Store Owner",
    avatar: avatar4
  },
  {
    id: 5,
    review: "Their 24/7 support team is excellent. Always ready to help with quick answers.",
    name: "Tareq Mahmood",
    profession: "Corporate Officer",
    avatar: avatar5
  },
  {
    id: 6,
    review: "Past Track has streamlined our delivery operations. Very dependable partner.",
    name: "Adnan Chowdhury",
    profession: "Warehouse Supervisor",
    avatar:avatar1
  },
  {
    id: 7,
    review: "Never had a lost or delayed parcel. Past Track delivers what it promises.",
    name: "Fahim Kabir",
    profession: "Dropshipper",
    avatar:avatar2
  },
  {
    id: 8,
    review: "Great for urgent packages. The express service saved me multiple times.",
    name: "Rezaul Karim",
    profession: "Freelance Designer",
    avatar:avatar3
  },
  {
    id: 9,
    review: "Highly efficient and professional. I’ve switched all my courier needs to Past Track.",
    name: "Naimur Rahman",
    profession: "Small Business Owner",
    avatar:avatar4
  },
  {
    id: 10,
    review: "Affordable pricing with premium service. What more could you ask for?",
    name: "Sajid Islam",
    profession: "Bookstore Manager",
    avatar: avatar2
  }
];



const CustomerReview = () => {
  return (
    <div className="py-10 px-4 bg-base-200 text-center">
      {/* Header Content */}
      <img src={img} alt="Review" className="mx-auto w-60 mb-4" />
      <h2 className="text-3xl font-bold text-base-content mb-2">What our customers are saying</h2>
      <p className="max-w-xl mx-auto mb-10 text-base-content/70">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Swiper Section */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id} className="transition-all duration-300">
            <div className="card bg-white dark:bg-gray-800 shadow-xl p-6 relative mx-4 opacity-50 scale-95 swiper-slide-active:scale-100 swiper-slide-active:opacity-100">
              {/* Quote Icon */}
              <FaQuoteLeft className="text-3xl text-primary absolute top-4 left-4" />

              {/* Review Text */}
              <p className="text-base-content/80 text-sm mt-10 mb-6">{item.review}</p>

              {/* Avatar and Name */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={item.avatar} alt={item.name} />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-base-content">{item.name}</p>
                  <p className="text-xs text-base-content/60">{item.profession}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReview;
