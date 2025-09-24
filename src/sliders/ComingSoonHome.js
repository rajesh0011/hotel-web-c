'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const properties = [
  {
    id: 1,
    // title: 'Clarks Inn Express, Rajnagar Ext., Ghaziabad',
    title: 'Clarks Inn Express, Ghaziabad',
    image: '/coming-soon/ghaziabad.webp',
    label: 'Coming Soon in Ghaziabad',
  },
  {
    id: 2,
    title: 'Clarks Inn, Kharar, Mohali',
    image: '/coming-soon/mohali.webp',
    label: 'Coming Soon in Mohali',
  },
  {
    id: 3,
    title: 'aôtel, Pangot, Uttarakhand',
    image: '/coming-soon/pangot.webp',
    label: 'Coming Soon in Pangot',
  },
  {
    id: 4,
    title: 'Clarks Inn Suites, Dhanbad',
    image: '/coming-soon/dhanbad.webp',
    label: 'Coming Soon in Dhanbad',
  },
  {
    id: 5,
    title: 'Clark Exotica, Mandav',
    image: '/coming-soon/mandav.webp',
    label: 'Coming Soon in Mandav',
  },
  {
    id: 6,
    title: 'Clarks Inn, Sri Ganganagar',
    image: '/coming-soon/ganganagar.webp',
    label: 'Coming Soon in Sri Ganganagar',
  },
  {
    id: 7,
    title: 'aôtel, Kota',
    image: '/coming-soon/kota.webp',
    label: 'Coming Soon in Kota',
  },
  {
    id: 8,
    title: 'Clarks Inn Express,  Firozabad',
    image: '/coming-soon/firozabad.webp',
    label: 'Coming Soon in Firozabad',
  },

];

export default function ComingSoonHome() {
  return (
    <>
    <section className='mb-3 brand-association-upcoming-slider home-coming-soon'>
   
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
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
    </section>



    </>
  );
}
