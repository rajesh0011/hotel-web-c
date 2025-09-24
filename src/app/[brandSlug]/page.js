"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "next/navigation";
import * as ReactDOM from "react-dom";
import Header from "@/components/Header";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import FooterPage from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getUserInfo } from "../../utilities/userInfo";

export default function BrandPage() {
  const { brandSlug } = useParams();
  const [brandData, setBrandData] = useState(null);
  const [properties, setProperties] = useState([]);
  const filterBarRef = useRef(null);
  const [propertyId, setPropertyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);

   
      async function postBookingWidged(rooms,mapping, isClose,ctaName,selectedPropertyId) {
       const resp = await getUserInfo();
         const sessionId = sessionStorage?.getItem("sessionId");
         const payload = {
         ctaName: ctaName,
         urls: window.location.href,
         cityId: 0,
         propertyId: selectedPropertyId ? parseInt(selectedPropertyId) :0,
         checkIn: "",
         checkOut: "",
         adults: 0,
         children: 0,
         rooms: 0,
         promoCode: "",
         ip: resp?.ip,
         sessionId: sessionId,
         deviceName: resp?.deviceInfo?.deviceName,
         deviceType: resp?.deviceInfo?.deviceOS == "Unknown" ? resp?.deviceInfo?.platform : resp?.deviceInfo?.deviceOS,
         roomsName: rooms?.RoomName,
         packageName: mapping?.MappingName,
         isCartOpen: mapping?.MappingName ? "Y": "N",
         isCartEdit: "N",
         isCartClick: "N",
         isClose: isClose ? "Y" : "N",
        }
           const response = await fetch(
             `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/tracker/BookingWidged`,
             {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify( payload ),
             }
           );
           const res = await response?.json();
     
         //console.log("res BookingWidged",res);
       }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch all brands
        const resBrand = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`,
          { cache: "no-store" }
        );
        const brandJson = await resBrand.json();
        const brand = brandJson?.data?.find((b) => b.brandSlug === brandSlug);
        setBrandData(brand || null);

        if (brand) {
          // 2️⃣ Fetch all properties
          const resProp = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`,
            { cache: "no-store" }
          );
          const propJson = await resProp.json();

          // 3️⃣ Filter properties for this brand
          if (propJson?.data) {
            const brandProperties = propJson.data.filter(
              (p) => p.hotelBrandId === brand.hotelBrandId
            );
            setProperties(brandProperties);
          }
        }
      } catch (err) {
        console.error("Error fetching brand/properties:", err);
      } finally {
        setLoading(false);
      }
    };

    if (brandSlug) fetchData();
  }, [brandSlug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!brandData) return <p className="text-center py-10">Brand not found</p>;

  const handleBookNowClick = async () => {
    if(isOpen){
      postBookingWidged("","", true,"Widget Closed");
    }else{
      postBookingWidged("","", false,"Widget Open");
    }
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      const firstInput = filterBarRef.current.querySelector(
        "input, select, button"
      );
      if (firstInput) firstInput.focus();
    }
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
  };

  const handleBookNowClick2 = async () => {
    {
      postBookingWidged("","", false,"Widget Open");
    }
    setOpen(false);
    openFilterBar(false);
  };

  const handleBookNow = (propertyId, cityName, cityId) => {
    // alert("propertyID: " + propertyId);
    // alert("cityName: " + cityName);
    // alert("cityId: " + cityId);
    const label = cityName;
    const value = cityId;
    const property_Id = propertyId;
    setCityDetails({ label, value, property_Id });
    setShowFilterBar(!showFilterBar);
    setPropertyId(propertyId);
  };

  return (
    <>
      <Header onSubmit={handleBookNowClick}  onClick={handleBookNowClick2}/>

      {/* Filter Bar */}
      <section className="position-relative" ref={filterBarRef}>
        <div className="position-absolute top-100 start-0 w-100 bg-white shadow">
          {showFilterBar &&
            ReactDOM.createPortal(
              <section className="filter-bar-hotels-cin">
                <BookingEngineProvider>
                  <FilterBar
                selectedProperty={parseInt(propertyId)}
                cityDetails={cityDetails}
                openBookingBar={showFilterBar}
                onClose={() => {
                  setShowFilterBar(false);
                }}
                  />
                </BookingEngineProvider>
              </section>,
              document.body
            )}
             {isOpenFilterBar && ReactDOM.createPortal(
            <section className="filter-bar-hotels-cin">
              <BookingEngineProvider>
              <FilterBar
                selectedProperty={0}
                openBookingBar={isOpenFilterBar}
                onClose={() => {
                  openFilterBar(false);
                  setOpen(false);
                }}
              />
            </BookingEngineProvider>
            </section>,
              document.body
          )}
        </div>
      </section>

      {/* Brand Details */}
      <section className="brand-detail-page-data">
        <div className="container mx-auto my-10 px-4">
          <div className="text-center mb-4">
            <Image
              src={brandData.brandLogo}
              alt={brandData.hotelBrand}
              width={200}
              height={80}
              className="mx-auto mb-5 object-contain"
            />
            {/* <h1 className="text-2xl font-bold mb-2 brand-page-main-heading">
              {brandData.brandHeading}
            </h1>
            <p className="max-w-4xl mx-auto text-lg text-gray-700">
              {brandData.hotelBrandDesc}
            </p> */}
          </div>

          <div className="new-type-dine-sec py-4">
                      <div className="container pushed-wrapper">
                        <div className="row">
                          <div
                            className="pushed-image"
                            style={{ backgroundImage: `url(${brandData.brandImgForLP})` }}
                          ></div>
                          <div className="pushed-box">
                            <div className="pushed-header">
                              <span className="header-1 mb-3"> 
              {brandData.brandHeading}
            </span>
                              <span className="header-3">
                               {brandData.hotelBrandDesc}
                              </span>
                              
                            </div>
                            
                        </div>
                      </div>
                      </div>
                    </div>

           
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center mt-4">
            <div className="brand-item-box-for-count shadow rounded-lg bg-white">
              <h3 className="brand-items-count">{brandData.hotelsCount}</h3>
              <p>Hotels</p>
            </div>
            <div className="brand-item-box-for-count shadow rounded-lg bg-white">
              <h3 className="brand-items-count">{brandData.citiesCount}</h3>
              <p>Cities</p>
            </div>
            <div className="brand-item-box-for-count shadow rounded-lg bg-white">
              <h3 className="brand-items-count">{brandData.destinations}</h3>
              <p>Keys</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <section className="brand-related-properties-here py-10 mt-4">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center brand-page-main-heading">
            Discover Our Properties
          </h2>

          {properties.length === 0 ? (
            <p>No properties found for this brand.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
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
              {properties.map((property, index) => {
                const imageUrl =
                  property.images &&
                  property.images.length > 0 &&
                  property.images[0].propertyImage
                    ? property.images[0].propertyImage
                    : "/images/hotels/hotel-img1.png";

                return (
                  <SwiperSlide key={index}>
                    <div className="winter-box shadow hotel-box no-image-bg">
                      {/* Hotel Image */}
                      <Image
                        src={imageUrl}
                        alt={property.propertyName || "Property image"}
                        className="w-100 primary-radius"
                        width={500}
                        height={300}
                        quality={100}
                      />

                      {/* Hotel Name */}
                      <Link href={`/${brandData.brandSlug}/${property.propertySlug}/hotel-overview`} className="text-decoration-none winter-box-heading text-dark mt-2 ms-2">
                       <strong>{property.propertyName}</strong>
                      </Link>

                      {/* Content */}
                      <div className="winter-box-content main-new-hotel-box">
                        <div className="hotel-box-content hotel-left-side-box">
                          <div className="winter-box-btn">
                            {/* Book Now Button (customize logic if needed) */}
                            <button
                              className="box-btn book-now"
                              onClick={() =>
                                handleBookNow(
                                  property.staahPropertyId,
                                  property.cityName,
                                  property.cityId
                                )
                              }
                            >
                              Book Now
                            </button>

                            {/* Visit Hotel */}
                            <Link
                              href={`/${brandData.brandSlug}/${property.propertySlug}/hotel-overview`}
                              className="box-btn know-more"
                            >
                              Visit Hotel
                            </Link>
                          </div>
                        </div>

                        {/* Price or Sold Out */}
                        {!property.staahPropertyPrice ||
                        property.staahPropertyPrice === 0 ? (
                          <div className="hotel-box-content hotel-right-side-box">
                            <p className="font-semibold text-lg text-red-600 text-end sold-out-text mt-0 mb-0">
                              Sold Out
                              <span className="small-text-for-today">
                                (for today)
                              </span>
                            </p>
                          </div>
                        ) : (
                          property.staahPropertyPrice !== 297 && (
                            <div className="hotel-box-content hotel-right-side-box">
                              <p className="text-xs text-gray-600 price-show f-new-10 text-end">
                                Starting from
                              </p>
                              <p className="font-semibold text-lg price-show">
                                INR {property.staahPropertyPrice}
                                <small className="f-new-10">/Night</small>
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>

      <FooterPage />

      <style jsx>{`
        .brand-detail-page-data {
          background-color: #f9f9f9;
          padding: 3rem 0;
          padding-top: 200px !important;
        }
        .brand-page-main-heading {
          font-size: 23px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .brand-items-count {
          font-size: 20px;
          font-weight: 600;
        }
        .brand-item-box-for-count {
          padding: 1rem;
        }
        .brand-item-box-for-count p {
          font-size: 14px;
          color: #666;
          margin-bottom: 0;
        }
         
      `}</style>
    </>
  );
}
