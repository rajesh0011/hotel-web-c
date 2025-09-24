'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
export default function AccommodationSlider() {
  return (
    <>  
  <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={30}
  slidesPerView={1}
  navigation={false}
  pagination={false} // 👈 disables dots
  breakpoints={{
    600: { slidesPerView: 1 },
    1000: { slidesPerView: 3 },
  }}
  className="n-hotel-slider"
>
      {[
        
        {
          img: '/images/room/premium_room.png',
          title: 'Premium Room',
       text: 'Lorem Ipsum'
                 },
     
            {
          img: '/images/room/premium_room.png',
            title: 'Premium Room',
       text: 'Lorem Ipsum'
                 },
           {
          img: '/images/room/premium_room.png',
            title: 'Premium Room',
       text: 'Lorem Ipsum'
                 },
            {
          img: '/images/room/premium_room.png',
         title: 'Premium Room',
       text: 'Lorem Ipsum'
                 },
                   {
          img: '/images/room/premium_room.png',
           title: 'Premium Room',
       text: 'Lorem Ipsum'
                 },
     
       
      
      ].map((hotel, index) => (
        <SwiperSlide key={index} className='roomacomo'>
          <div className="winter-box hotel-box">
<Image src={hotel.img} alt={hotel.title} className="w-100" width={264}
  height={220}
  quality={75}  
/>
           
            <div className="winter-box-content shadow-sm pt-1">
              <div className="hotel-box-content">
                <h3 className="winter-box-heading">{hotel.title}</h3>
               
              </div>
               <p className='display-block'>{hotel.text}</p>
<div className="winter-box-btn flex justify-between items-center">
  <div className="flex">
    <a href="#" className="box-btn know-more">Know More</a>
    <a href="#" target="_blank" className="box-btn book-now">Enquire Now</a>
  </div>

<a href="#" target="_blank" className="text-black text-[10px] underline">
  MORE
</a>



</div>

            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
    </>
  );
}


