'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

export default function OverAccomo() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={false}
        pagination={false}
        breakpoints={{
          600: { slidesPerView: 1 },
          1000: { slidesPerView: 3 },
        }}
        className="n-hotel-slider"
      >
        {[

          {
            img: '/images/4.jpg',
            title: 'Executive Room',
            text: 'Unwind in a serene British retreat, bathed in warm...',
            price:'2,500'

          },

          {
            img: '/images/8.jpg',
            title: 'Superior Room',
            text: 'Unwind in a serene British retreat, bathed in warm...',
            price:'3,500'
          },
          {
            img: '/images/4.jpg',
            title: 'Deluxe Room',
            text: 'Unwind in a serene British retreat, bathed in warm...',
            price:'4,500'
          },
          {
             img: '/images/8.jpg',
            title: 'Luxury Suite',
            text: 'Unwind in a serene British retreat, bathed in warm...',
            price:'4,500'
          },
         


        ].map((hotel, index) => (
          <SwiperSlide key={index} className='cityexpr'>
            <div className="winter-box hotel-box">
              <Image src={hotel.img} alt={hotel.title} className="w-100" width={600}
                height={500}
                quality={100}
              />

              <div className="accommodation-box-content">
             <div className="flex justify-between items-start">
  {/* LEFT SIDE - Title and Description */}
  <div className="flex-1 hotel-box-content pr-4">

      
    <h3 className="text-xl ps-0 font-light uppercase tracking-wide winter-box-heading mb-1">{hotel.title}</h3>
    <p className="text-sm text-gray-600 font10">
      {hotel.text.slice(0, 60)}...
    </p>

  </div>

  {/* RIGHT SIDE - Price and Book Now */}
  <div className="text-right">
    <p className="font10 uppercase">INR / Night</p>
    <p className="f-20-new acc-price">{hotel.price}</p>
    
  </div>
  
</div>
  
     <div className="winter-box-btn">
      <a href="#" className="box-btn know-more">Explore More</a><a href="#" target="_blank" className="box-btn book-now float-end me-0">Book Now</a></div>

                             
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  );
}
