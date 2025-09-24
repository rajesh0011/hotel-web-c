'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slider.css';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';

const ThumbnailCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);

  // Fetch API data
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`,
          { cache: 'no-store' } // no caching in Next.js
        );
        const json = await res.json();
        if (json?.data) {
          setBrands(json.data);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading brands...</p>;
  }

  return (
    <>
    <section className="our-brands sec-padding bg-grey mt-5">
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="global-heading-sec mt-5">
          <h2 className="global-heading text-center mt-5">Our Brands</h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="brands-sliderr">
          <div className="brand-outer-div">
            <div id="big">
              {/* Main Swiper */}
              <Swiper
                spaceBetween={10}
                loop={true}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mb-4 main-carousel"
              >
                {brands.map((item) => (
                  <SwiperSlide key={item.hotelBrandId}>
                    <div className="aspect-video relative w-full">
                      <div className="brand-slider-item">
                        <div className="brand-item-description">
                          <Image
                            src={item.brandLogo}
                            alt={item.hotelBrand}
                            height={100}
                            width={150}
                            className="object-contain hote-brand-name-logo"
                          />
                          <p className="brand-description">
                            {item.hotelBrandDesc}
                            {/* {item.hotelBrandDesc.length > 100 ? (
                    <>
                      {showFullText
                        ? item.hotelBrandDesc
                        : item.hotelBrandDesc.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText(!showFullText)}
                        style={{
                          cursor: "pointer",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    item.hotelBrandDesc
                  )} */}
                          </p>
                          <Link href={`/${item.brandSlug}`} className='btn btn-primary brand-explore-btn-page'>
                          <span>Explore</span>
                          <span><MoveRightIcon size={12} /></span>
                          </Link>
                        </div>
                        <Image
                          src={item.brandLogoBg || '/images/fallback.jpg'}
                          height={400}
                          width={1000}
                          alt={item.hotelBrand}
                          className="object-cover brand-image"
                        />
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
                navigation={true}
                slidesPerView={12}
                breakpoints={{
                  640: { slidesPerView: 12 },
                  768: { slidesPerView: 12 },
                  1024: { slidesPerView: 12 },
                }}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-swiper thumb-carousel pt-4"
              >
                {brands.map((item) => (
                  <SwiperSlide key={item.hotelBrandId}>
                    <div className="aspect-square relative w-full cursor-pointer">
                      <div className="brand-logo-item">
                        <Image
                          src={item.brandLogo}
                          alt={item.hotelBrand}
                          height={100}
                          width={100}
                          className="object-contain"
                        />
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

    <style jsx>{`

       .swiper-slide-fully-visible + .swiper-slide {
  background-color: yellow; /* Example */
  border: 2px solid red;
}


    `}</style>
  </>
  );
};

export default ThumbnailCarousel;
