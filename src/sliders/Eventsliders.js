"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
export default function EventSlider() {
  const slides = [
  { category: "Dining", src: "/images/img-5.jpg", title: "Dining", slug: "dining" },
  { category: "Events", src: "/images/img-3.jpg", title: "Events", slug: "events" },
  { category: "MICE", src: "/images/img-1.jpg", title: "MICE", slug: "mice" },
];

  return (
    <div className="offer-slider facilities-slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        navigation={true}
        pagination={false}
        spaceBetween={35}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={600}
        breakpoints={{
                    640: {
                        slidesPerView: 1,
                        
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="winter-box overflow-hidden position-relative">
              <Image
                src={slide.src}
                alt={slide.title}
                width={500}
                height={500}
                className="w-100 h-100 object-cover facility-img"
              />
              <div className="position-absolute bottom-0 start-0 p-3 text-white z-10">
                <h4 className="h6 fw-semibold">{slide.title}</h4>
                <Link href={`/corporate/${slide.slug}`} className="small text-info">
                  Explore →
                </Link>
              </div>
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient bg-dark bg-opacity-50 z-0"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
