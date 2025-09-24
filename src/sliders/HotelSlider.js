"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import * as ReactDOM from "react-dom";

export default function HotelSlider({ onSubmit }) {
  const [hotels, setHotels] = useState([]);
  const [brandMap, setBrandMap] = useState({});
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [hotelRes, brandRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`
          ),
          fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`),
        ]);

        const hotelJson = await hotelRes.json();
        const brandJson = await brandRes.json();

        // Create map: { hotelBrandId: brandSlug }
        const brandMapping = {};
        if (brandJson?.data?.length > 0) {
          brandJson.data.forEach((brand) => {
            brandMapping[brand.hotelBrandId] = brand.brandSlug;
          });
          setBrandMap(brandMapping);
        }

        // Filter new properties only
        if (hotelJson?.data?.length > 0) {
          const newHotels = hotelJson.data.filter(
            (hotel) => hotel.newProperty === true
          );
          setHotels(newHotels);
        }
      } catch (error) {
        console.error("Error fetching hotels or brands:", error);
      }
    }

    fetchData();
  }, []);

  const handleBookNow = (hotel) => {
    const label = hotel.cityName;
    const value = hotel.cityId;
    const property_Id = hotel?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setShowFilterBar(!showFilterBar);
    setPropertyId(hotel?.staahPropertyId);
    onSubmit(hotel);
  };
  return (
    <>
      {/* <section className="new-fixed-filter-bar">
        {showFilterBar &&
          ReactDOM.createPortal(
            <BookingEngineProvider>
              <FilterBar
                selectedProperty={parseInt(propertyId)}
                cityDetails={cityDetails}
                openBookingBar={showFilterBar}
                onClose={() => {
                  setShowFilterBar(false);
                }}
              />
            </BookingEngineProvider>,
            document.body
          )}
      </section> */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        margin={2}
        navigation={true}
        pagination={false}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1180: { slidesPerView: 3 },
        }}
        className="hotel-slider"
      >
        {hotels.map((hotel, index) => {
          const imageUrl =
            hotel.images &&
            hotel.images.length > 0 &&
            hotel.images[0].propertyImage
              ? hotel.images[0].propertyImage
              : "/images/hotels/hotel-img1.png";

          const brandSlug = brandMap[hotel.hotelBrandId] || "";

          return (
            <SwiperSlide key={index}>
              <div className="winter-box shadow hotel-box no-image-bg">
                <Image
                  src={imageUrl || "/no_img1.jpg"}
                  alt={hotel.propertyName || "image"}
                  className="w-100 primary-radius"
                  width={500}
                  height={300}
                  quality={100}
                />
                <Link href={`/${brandSlug}/${hotel.propertySlug}/hotel-overview`} className="text-decoration-none text-dark winter-box-heading">{hotel.propertyName}</Link>

                  <div className="winter-box-content main-new-hotel-box">
                    <div className="hotel-box-content hotel-left-side-box">
                      <div className="winter-box-btn">
                        {(!hotel.staahPropertyPrice || hotel.staahPropertyPrice === 0) ? (
                          <button className="box-btn book-now"
                          onClick={() =>
                              handleBookNow(
                                hotel
                              )
                            }
                            >
                           Book Now 
                          </button>
                        ) : hotel.staahPropertyPrice === 297 ? (
                          <button className="box-btn book-now" disabled>
                            Not Available
                          </button>
                        ) : (
                          <button
                            className="box-btn book-now"
                            onClick={() => {
                              handleBookNow(
                                hotel
                              )
                            

                              }
                            }
                          >
                            Book Now
                          </button>
                        )}

                        <Link
                          href={`/${brandSlug}/${hotel.propertySlug}/hotel-overview`}
                          className="box-btn know-more"
                        >
                          Visit Hotel
                        </Link>
                      </div>
                    </div>

                    {/* Price div */}
                    {(!hotel.staahPropertyPrice || hotel.staahPropertyPrice === 0) ? (
                      <div className="hotel-box-content hotel-right-side-box">
                        <p className="font-semibold text-lg text-red-600 text-end sold-out-text mt-0 mb-0">
                          Sold Out<span className="small-text-for-today">(for today)</span>
                        </p>
                      </div>
                    ) : hotel.staahPropertyPrice !== 297 && (
                      <div className="hotel-box-content hotel-right-side-box">
                        <p className="text-xs text-gray-600 price-show f-new-10 text-end">
                          Starting from
                        </p>
                        <p className="font-semibold text-lg price-show">
                          INR {hotel.staahPropertyPrice}
                          <small className="f-new-10">/Night</small>
                        </p>
                      </div>
                    )}
                  </div>
               

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
