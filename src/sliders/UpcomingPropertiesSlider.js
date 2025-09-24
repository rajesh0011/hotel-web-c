'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const properties = [
  {
    id: 1,
    title: 'Clarks Inn, Satna',
    image: '/images/brand-association/upcoming/satna-city-image.webp',
    label: 'Opening Soon in Satna',
  },
  {
    id: 2,
    title: 'aôtel, Purulia',
    image: '/images/brand-association/upcoming/purulia.webp',
    label: 'Opening Soon in Purulia, West Benga1111l',
  },
  {
    id: 3,
    title: 'Clarks Inn, Datia',
    image: '/images/brand-association/upcoming/datia-city-image.webp',
    label: 'Opening Soon in Datia',
  },
  {
    id: 4,
    title: 'Clarks Inn, Sahore',
    image: '/images/brand-association/upcoming/sahore-city-image.webp',
    label: 'Opening Soon in Sahore',
  },
  {
    id: 5,
    title: 'Clarks Inn Suites, Gadchiroli',
    image: '/images/brand-association/upcoming/gadchiroli-city-image.webp',
    label: 'Opening Soon in Gadchiroli',
  },
  {
    id: 6,
    title: 'Clarks Inn, Bokaro',
    image: '/images/brand-association/upcoming/bokaro-city-image.webp',
    label: 'Opening Soon in Bokaro',
  },
  {
    id: 7,
    title: 'aôtel, Dehradun',
    image: '/images/brand-association/upcoming/dehradun-city-image.webp',
    label: 'Opening Soon in Dehradun',
  },
  {
    id: 8,
    title: 'Clarks Inn, Siwan',
    image: '/images/brand-association/upcoming/siwan-city-image.webp',
    label: 'Opening Soon in Siwan',
  },
  {
    id: 9,
    title: 'Clarks Inn Suites, Indore',
    image: '/images/brand-association/upcoming/indore-city-image.webp',
    label: 'Opening Soon in Indore',
  },
  {
    id: 10,
    title: 'Clarks Inn Express, Dwarka',
    image: '/images/brand-association/upcoming/dwarka-city-image.webp',
    label: 'Opening Soon in Dwarka',
  },
  {
    id: 11,
    title: 'Clarks Exotica, Rishikesh',
    image: '/images/brand-association/upcoming/rishikesh-city-image.webp',
    label: 'Opening Soon in Rishikesh',
  },
  {
    id: 12,
    title: 'Clarks Exotica, Sakleshpura',
    image: '/images/brand-association/upcoming/sakleshpura-city-image.webp',
    label: 'Opening Soon in Sakleshpura',
  },
];

export default function UpcomingPropertiesSlider() {
  return (
    <section className='bg-lght pysp5 mb-5 brand-association-upcoming-slider'>
    <div className="container my-5">
      <h2 className="text-center mb-4">Upcoming Properties</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
      >
        {properties.map((prop, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-4 overflow-hidden shadow-sm position-relative">
              {/* Image */}
              <Image height={250} width={400} src={prop.image} className="img-fluid w-100 brand-new-hotels-image" alt={prop.title} />

              {/* Overlay Text */}
              <div className="position-absolute text-white p-2" style={{ top: 10, left: 10 }}>
                {/* <small className="fw-medium">{prop.label}</small> */}
              </div>

              {/* Footer */}
              <div className="bg-btm text-center py-2">
                <strong>{prop.title}</strong>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
  );
}
