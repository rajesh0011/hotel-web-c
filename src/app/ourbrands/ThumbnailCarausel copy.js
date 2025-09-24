'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slider.css';
import Image from 'next/image';

const ThumbnailCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(); // Properly type the state

  // Images and logos data
  const data = [
    
    {
    id: 1,
    image: "/images/brands/clarks-premier-img.jpg",
    logo: "/images/brands/clarks-premier-logo.png",
    description:
      "Clarks Premiers are upscale business hotels in India, we provide all the services that a guest can expect, from premium high-quality rooms to a choice of different dining outlets, fitness rooms and wellness. At Clarks Premier we aim to provide top quality service.",
    hotels: 50,
    cities: 1,
    keys: "7,100+",
  },
  {
    id: 2,
    image: "/images/brands/clarks-exotica-img.jpg",
    logo: "/images/brands/clarks-exotica-logo.png",
    description:
      "Experience the perfect blend of luxury and exploration with Clarks Exotica. Each destination offers a unique escape, featuring beautifully crafted rooms and personalized travel experiences designed for the discerning traveller.",
    hotels: 45,
    cities: 1,
    keys: "6,800+",
  },
  {
    id: 3,
    image: "/images/brands/clarks-inn-img.jpg",
    logo: "/images/brands/clarks-inn-logo.png",
    description:
      "Discover thoughtfully designed accommodations that blend modern amenities with warm hospitality. Every Clarks Inn destination offers a unique experience, ensuring a seamless and delightful stay, where every moment becomes a cherished memory.",
    hotels: 60,
    cities: 1,
    keys: "8,500+",
  },
  {
    id: 4,
    image: "/images/brands/clarks-inn-suites-img.jpg",
    logo: "/images/brands/clarks-inn-suites-logo.png",
    description:
      "Step into a world of refined comfort with Clarks Inn Suites, where each property is designed for travellers seeking style, convenience, and exceptional service. ",
    hotels: 50,
    cities: 1,
    keys: "7,100+",
  },
  {
    id: 5,
    image: "/images/brands/clarks-inn-express-img.jpg",
    logo: "/images/brands/clarks-inn-express-logo.png",
    description:
      "Discover Clarks Inn Express, where necessary amenities and efficiency create a seamless and enjoyable stay for each guest.",
    hotels: 45,
    cities: 1,
    keys: "6,800+",
  },
    
  ];

  return (
    <>
    <section className="our-brands sec-padding bg-grey mt-5">
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="global-heading-sec mt-5">
                <h2 className="global-heading text-center mt-5">our brands</h2>
            </div>
        </div>
        <div className="container-fluid p-0">
            <div className="brands-sliderr">
                <div className="brand-outer-div">
                    <div id="big" >
                        {/* Main Swiper */}
                        <Swiper
                            spaceBetween={10}
                            loop={true}
                            navigation={false}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mb-4 main-carousel">
                            {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="aspect-video relative w-full">
                                    <div className="brand-slider-item">
                                        <div className="brand-item-description">
                                            <Image src={item.logo} alt={`Thumbnail ${index + 1}`} height={100}
                                            width={150} className="object-contain hote-brand-name-logo"/>
                                            <p className="brand-description">{item.description} </p>
                                        </div>
                                        <Image src={item.image} height={400} width={1000} alt={`Slide ${index + 1}`}
                                        className="object-cover brand-image" />
                                    </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div id="thumbs">
                        {/* Thumbnails Swiper */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            loop={true}
                            slidesPerView={2}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 6,
                                },
                            }}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="thumbs-swiper thumb-carousel">
                            {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="aspect-square relative w-full cursor-pointer">
                                    <div className="brand-logo-item">
                                        <Image src={item.logo}
                                            alt={`Thumbnail ${index + 1}`}
                                            height={100}
                                            width={100}
                                            className="object-contain"/>
                                        </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};

export default ThumbnailCarousel;
