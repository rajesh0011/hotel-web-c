'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import Image from 'next/image';
import Link from 'next/link';

export default function MediaSlider() {
  const [slides, setSlides] = useState([]);
    const [showFullText6, setShowFullText6] = useState(false);
  const baseUrl = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/`;
  const no_image ="/no_image1.jpg";

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${baseUrl}Api/property/GetMediaDetails`);
        const data = await res.json();
        if (data.errorCode === '0' && Array.isArray(data.data)) {
          setSlides(data.data.filter(item => item.isActive));
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);
  const MediaText="Stay updated with the latest happenings at The Clarks Hotels & Resorts — from brand announcements and leadership insights to media mentions and awards. This is where we share our journey, milestones, and industry recognitions.";

  return (
    <section className="media-news global-section-margin mb-5 mobile-section-border-home desk-margin-top">
      <div className="container">
        <div className="global-heading-sec text-center">
          <h2 className="global-heading">Media & news</h2>
          <p className="mb-2 home-page-paragraph text-center">
                  {MediaText.length > 100 ? (
                    <>
                      {showFullText6
                        ? MediaText
                        : MediaText.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText6(!showFullText6)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText6 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    MediaText
                  )}
                </p>
        </div>

        <div className="media-box mt-4">
          {slides.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              pagination={false}
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
              className="media-slider"
            >
              {slides.map((item, index) => {
                const imageSrc = item.thumbnailUrl
                  ? `${baseUrl}${item.thumbnailUrl}`
                  : '/no_image1.jpg'; // fallback image in /public

                return (
                  <SwiperSlide key={item.id || index}>
                    <Link href={item.mediaUrl} className='media-box-item'>
                      <div className="media-item no-image-bg mb-2">
                        <Image
                          src={item.thumbnailUrl || no_image}
                          alt={item.title}
                          className="w-100"
                          width={500}
                          height={500}
                        />
                      </div>
                      {/* <p className='media-date'>{item.publishedDate}</p> */}
                      <h6 className='media-title'>{item.title}</h6>
                      
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p className="text-center">Loading media...</p>
          )}
        </div>
      </div>
    </section>
  );
}
