"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function HRDiningslider() {
const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Roads" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Roads" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Roads" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Roads" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Roads" }
  ];

  return (
    <div className="discover-slider">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        centeredSlides={true}
        spaceBetween={25}
        slidesPerView={3}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={600}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`winter-box ${index === activeIndex ? "active" : "inactive"}`}>
              <div className="image-overlay">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  width={500}
                  height={500}
                  className="img-slide"
                />
                <div className="overlay-heading">
                  <h5>{slide.title}</h5>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-2 gap-2 group cursor-pointer">
  <span className="text-lg font-semibold tracking-wide">EXPLORE</span>
  <span className="transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transform-none">
    →
  </span>
</div>

    </div>
  );
}
