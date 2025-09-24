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
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Gourmet Cuisine" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Luxury Dining" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Elegant Ambience" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Family Feast" },
    { src: "/images/dining/view-spectacular-nature-landscape.png", title: "Authentic Flavors" }
  ];

  return (
    <div className="aurika-top-hotel-slider">
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
    </div>
  );
}
