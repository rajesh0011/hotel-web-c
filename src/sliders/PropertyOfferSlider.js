'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const restaurents = [
  {
    img: '/images/room/premium_room.png',
    title: 'DELUXE ROOM',
    text: 'A well-appointed deluxe room offering a blend of comfort and style for travelers.',
  },
  {
    img: '/images/room/premium_room.png',
    title: 'PREMIUM ROOM',
    text: 'Spacious premium rooms with elegant interiors and modern amenities.',
  },
  {
    img: '/images/room/premium_room.png',
    title: 'SUITE ROOM',
    text: 'Luxurious suite rooms designed for a regal and cozy experience.',
  },
  {
    img: '/images/room/premium_room.png',
    title: 'ROYAL SUITE',
    text: 'An opulent room that offers top-tier comfort and service.',
  },
  {
    img: '/images/room/family-room.png',
    title: 'FAMILY ROOM',
    text: 'Perfect for a relaxing stay with your loved ones, offering both space and comfort.',
  },
];

export default function PropertyOfferSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative px-4 md:px-16 py-12 overflow-hidden roombtn">
      {/* Swiper Navigation Buttons */}
     <div
        ref={prevRef}
        className="absolute top-1/2 left-0 z-20 leftarrow -translate-y-1/2 text-3xl text-black cursor-pointer"
      >
        ‹
      </div>
      <div
        ref={nextRef}
        className="absolute top-1/2 right-0 rightarrow z-20 -translate-y-1/2 text-3xl text-black cursor-pointer"
      >
        ›
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        spaceBetween={10}
        centeredSlides={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: false, // Centering is not useful on mobile
          },
          768: {
            slidesPerView: 2.5,
            centeredSlides: true,
          },
        }}
        className="relative"
      >
        {restaurents.map((room, index) => (
          <SwiperSlide key={index} className="transition-all duration-300 roomacomo">
            <div className="bg-white overflow-hidden max-w-[640px] mx-auto">
              <Image
                src={room.img}
                alt={room.title}
                width={500}
                height={350}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-3 shadow-md winter-box-content">
                <h3 className="text-xl font-bold text-[#851d29] text-start">{room.title}</h3>

                {index === activeIndex && (
                  <>
                    <p className="text-sm text-gray-700">{room.text}</p>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <a href="#" className="box-btn know-more">Book Now</a>
                        <a href="#" className="box-btn book-now">Book Now</a>
                      </div>
                      <a href="#" className="text-[10px] underline text-black ml-auto">MORE</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Faded edge overlays */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
}
