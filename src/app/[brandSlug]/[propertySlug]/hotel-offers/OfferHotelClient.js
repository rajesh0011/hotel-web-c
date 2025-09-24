"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as ReactDOM from "react-dom";
import BookNowForm from "@/components/BookNowForm";
import Offerpagesslider from "@/sliders/Offerpageslider";
import PropertyHeader from "@/components/PropertyHeader";
import Image from "next/image";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import InnerFooterPage from "@/components/InnerFooterPage";
import { getUserInfo } from "../../../../utilities/userInfo";

export default function OfferHotelClient({ propertySlug }) {
    const [propertyData, setPropertyData] = useState(null);
  const [offers, setOffers] = useState([]);
  const [propertyId, setPropertyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
      const filterBarRef = useRef(null);

   
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
  const handleBookNowClick = async () => {
    if(isOpen){
      postBookingWidged("","", true,"Widget Closed");
    }else{
      postBookingWidged("","", false,"Widget Open");
    }
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = filterBarRef.current.querySelector("input, select, button");
      if (firstInput) firstInput.focus();
    }
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
    setShowFilterBar(!showFilterBar);
  };
  
  // const handleViewRates = async (offer) => {
  //   setOpen(!isOpen);
  //   setRoomDetails(offer);
  //   openFilterBar(!isOpenFilterBar);
  //   setShowFilterBar(!showFilterBar);
  // };
  useEffect(() => {
    if (!propertySlug) return;

    async function fetchData() {
      setLoading(true);
      try {
        // Step 1: Get propertyId
        const propRes = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`
        );
        const propJson = await propRes.json();
        const property = propJson.data.find(
          (p) => p.propertySlug?.toLowerCase() === propertySlug.toLowerCase()
        );
        const id = property?.propertyId || null;

        const label = property?.cityName;
        const value = property?.cityId;
        const property_Id = property?.staahPropertyId;
        setCityDetails({ label, value, property_Id });
        setStaahPropertyId(property?.staahPropertyId);

        setPropertyId(id);

        if (!id) {
          setOffers([]);
          setLoading(false);
          return;
        }

        // ✅ Step 2: Fetch banner images from GetPropertyByFilter
        const bannerRes = await fetch(
  `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${id}`
);
const bannerJson = await bannerRes.json();
const fetchedPropertyData = bannerJson?.data?.[0];
setPropertyData(fetchedPropertyData);

const images = fetchedPropertyData?.images || [];
const bannerImgs = images
  .map((img) => img.propertyImage)
  .filter(Boolean);
setBannerImages(bannerImgs);

        // Step 3: Fetch offers (optional)
        const offerRes = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/offers/GetOffersByProperty?propertyId=${id}`
        );
        const offerJson = await offerRes.json();
        const offerData = offerJson?.data?.[0]?.offersInfo || [];
        setOffers(offerData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertySlug]);

  // if (loading) return <div>Loading offers...</div>;

  return (
    <>
      <PropertyHeader
        brand_slug={propertySlug}
        id={propertyId}
        onSubmit={handleBookNowClick}
      />

      <section className="position-relative banner-section" ref={filterBarRef}>
      {/* <section className="position-relative banner-section d-none">
        <div className="w-100 overflow-hidden rounded-0 mtspace5">
          {bannerImages?.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              autoplay={{ delay: 4000 }}
              loop
              className="w-100 h-[100vh]"
            >
              {bannerImages?.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={imgUrl}
                    alt={`Banner ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-100 h-[100vh] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              src="/images/banner_img.png"
              alt="Default Banner"
              width={1920}
              height={1080}
              className="w-100 h-[100vh] object-cover"
            />
          )}
        </div> */}

        <div className="position-absolute bottom-0 start-0 w-100 bg-white shadow">
          {/* <BookNowForm /> */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 home-page-class`}
            style={{ zIndex: 10 }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                handleBookNowClick();
              }}
              className="p-2 bg-white flex items-center justify-center rounded-full"
            >
              {isOpen ? <X size={18} color="black" /> : "Book Now"}
            </button>
          </div>
          {showFilterBar && ReactDOM.createPortal (
            <BookingEngineProvider>
              <FilterBar
                selectedProperty={parseInt(staahPropertyId)}
                cityDetails={cityDetails}
                roomDetails={roomDetails}
                openBookingBar={isOpenFilterBar}
                onClose={() => {
                  openFilterBar(false);
                  setOpen(false);
                  setShowFilterBar(false);
                }}
              />
            </BookingEngineProvider>,
          document.body
          )}
        </div>
      </section>

      {/* {offers.length > 0 ? ( */}
      {offers.length > 0 &&
        <section className="inner-no-banner-sec">
          <div className="container">
            <div className="global-heading-sec text-center">
              <div className="row justify-content-center mb-2">
                <div className="col-md-9 md-offset-1">
                  <h2 className="global-heading">OFFERS</h2>
                  <p className="mb-2">
                    Discover exclusive offers tailored just for your perfect
                    stay.
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="winter-sec">
                <div className="row">
                  <Offerpagesslider offers={offers} 
                   onSubmit={handleBookNowClick}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      // ) : (
      //   <section className="text-center" style={{marginTop: "300px"}}>
      //     <p>No offers available for this property at the moment.</p>
      //   </section>
      // )
      }

      <InnerFooterPage propertyData={propertyData} />
    </>
  );
}
