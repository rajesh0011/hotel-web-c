"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
export default function CareerSlider() {
  const slides = [
  { src: "/career/IMG_3562.jpg", title: "Diversity & Inclusion", description: "We value diversity and inclusion as key to our success. We foster an environment where all employees feel respected and appreciated. By celebrating differences and embracing unique perspectives, we create a culture where everyone can thrive and contribute to our success. Join us in this commitment to inclusion." },
  { src: "/career/She_is_the_Clarks-10_wdrtbi.jpg", title: "Celebrating People", description: "With over 4,000 team members, The Clarks Hotels & Resorts is a vibrant community where each individual is valued and celebrated. Our success is driven by the dedication and passion of our people. We honor their achievements and contributions, creating a workplace where everyone feels appreciated and inspired." },
  { src: "/career/Images-03_zvgpxo.jpg", title: "Spirit of The Makers", description: "We believe in the power of individual opinions and advice to shape our brand's future. The 'Spirit of the Makers' initiative encourages team members to share their insights and innovative ideas, fostering a culture of collaboration and continuous improvement. Join us and contribute to a brand that values and implements the unique perspectives of its people." },
];

  return (
    <div className="career-page-slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        navigation={true}
        pagination={false}
        spaceBetween={15}
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
                className="w-100 h-100 object-cover"
              />
              <div className="career-page-slider-info p-2">
                <h4 className="h6 fw-semibold text-dark">{slide.title}</h4>
                <p className="small text-justify">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
