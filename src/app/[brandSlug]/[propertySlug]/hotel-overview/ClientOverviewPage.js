"use client";

import React, { useEffect, useState,useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BookNowForm from "@/components/BookNowForm";
import LatestOffers from "@/sliders/LatestOffers";
import DiningSlider from "@/sliders/DiningSlider";
import EventWedding from "@/sliders/EventWedding";
import Nearbycity from "@/sliders/Nearbycity";
import OverExp from "@/sliders/OverExp";
import AccommodationSlider from "@/sliders/AccommodationSlider";
import PropertyHeader from "@/components/PropertyHeader";
import GalleryModal from "@/components/GalleryModal";
import { useParams } from "next/navigation";
import PropertyFaq from "./PropertyFaq";
import Image from "next/image";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import * as ReactDOM from "react-dom";
import FooterPage from "@/components/Footer";
import InnerFooterPage from "@/components/InnerFooterPage";
import { getUserInfo } from "../../../../utilities/userInfo";

export default function ClientOverviewPage() {
  const [showModal, setShowModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalRoomData, setModalRoomData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const { brandSlug, propertySlug } = useParams();
const [showFullText, setShowFullText] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
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
  const handleRoomBookNow = async (room) => {
    
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
    setRoomDetails(room);
    openFilterBar(!isOpenFilterBar);
    setShowFilterBar(!showFilterBar);
  };

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // useEffect(() => {
  //   if (!propertySlug) return;

  //   const fetchPropertyIdFromSlug = async (slug) => {
  //     try {
  //       const res = await fetch(
  //         "${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList"
  //       );
  //       const json = await res.json();
  //       if (json.errorMessage !== "success") {
  //         console.error("Property list fetch error:", json);
  //         return null;
  //       }
  //       const found = json.data.find((p) => p.propertySlug === slug);

  //       const label = found?.cityName;
  //       const value = found?.cityId;
  //       const property_Id = found?.staahPropertyId;
  //       setCityDetails({ label, value, property_Id });
  //       return found?.propertyId || null;
  //     } catch (error) {
  //       console.error("Error fetching property list:", error);
  //       return null;
  //     }
  //   };

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const propertyId = await fetchPropertyIdFromSlug(propertySlug);
  //       if (!propertyId) {
  //         setPropertyData(null);
  //         setLoading(false);
  //         return;
  //       }

  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${propertyId}`
  //       );
  //       const result = await res.json();
  //       setPropertyData(result?.data?.[0] || null);
  //     } catch (error) {
  //       console.error("Error fetching property data:", error);
  //       setPropertyData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [propertySlug]);
  useEffect(() => {
    if (!propertySlug) return;

    const fetchCityDetails = async () => {
      try {
        const resList = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`
        );
        const listData = await resList.json();

        if (
          listData?.errorMessage !== "success" ||
          !Array.isArray(listData?.data)
        ) {
          console.error("Property list fetch error:", listData);
          return;
        }

        const found = listData.data.find(
          (p) => p.propertySlug === propertySlug
        );

        if (!found) {
          console.warn(`No property found for slug: ${propertySlug}`);
          return;
        }

        // Set city details ASAP
        setCityDetails({
          label: found.cityName || "",
          value: found.cityId || "",
          property_Id: found.staahPropertyId || null,
        });

        // Also store propertyId for later use
        setPropertyId(found.propertyId);
      } catch (error) {
        console.error("Error fetching property list:", error);
      }
    };

    fetchCityDetails();
  }, [propertySlug]);

  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const resDetails = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${propertyId}`
        );
        const detailsData = await resDetails.json();

        setPropertyData(detailsData?.data?.[0] || null);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setPropertyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  // if (loading) return <div>Loading hotel details...</div>;
  // if (!propertyData) return <div>No property data found.</div>;

  return (
    <>
      {/* <PropertyHeader brand_slug={brandSlug} id={propertyData.propertyId} /> */}
      <PropertyHeader
        brand_slug={brandSlug}
        id={propertyData?.propertyId}
        onSubmit={handleBookNowClick}
      />
      <section className="position-relative banner-section overview-wrapper" ref={filterBarRef}>
        {/* Swiper Banner */}
        {/* {propertyData?.images && propertyData?.images?.length > 0 ? ( */}
        {propertyData?.images && propertyData?.images?.length > 0 &&
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-100"
          >
            {propertyData.images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.propertyImage || "/images/banner_img.png"}
                  alt={`Banner Image`}
                  width={1920}
                  height={1080}
                  className="w-full h-[100vh] object-cover object-top overview-hotelimg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        // ) : (
        //   <div>No images available</div>
        // )
        }

        {/* Book Now Form at Bottom */}
        {/* <BookNowForm onSubmit={handleBookNowClick} />  */}
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
              selectedProperty={parseInt(cityDetails?.property_Id)}
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
      </section>

      {/* Discover slider */}
      <section className="mt-5">
        <div className="global-heading-sec text-center">
        <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <h2 className="global-heading">
                  {propertyData?.propertyTitle || "Clarks Hotel"}
                </h2>
                {/* <p className="mb-0">{propertyData?.description}</p> */}
                <p className="mb-0">
                  {propertyData?.description?.length > 200 ? (
                    <>
                      {showFullText
                        ? propertyData?.description
                        : propertyData?.description.slice(0, 200) + "..."}
                      <span
                        onClick={() => setShowFullText(!showFullText)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    propertyData?.description
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation slider */}
      <AccommodationSlider
        propertyId={propertyData?.propertyId}
        setShowModal={setShowModal}
        setSelectedRoom={setSelectedRoom}
        onSubmit={handleRoomBookNow}
      />

      <GalleryModal
        showModal={showModal}
        setShowModal={setShowModal}
        roomData={selectedRoom}
      />

      {/* // Dining slider (show only if dining data exists) */}
        <DiningSlider propertyId={propertyData?.propertyId} />
     

   
      <section className="sec-padding d-none" data-aos="fade-up">
        <div className="container">
          <div className="winter-sec">
            <div className="row">
              <LatestOffers />
            </div>
          </div>
        </div>
      </section>

      {/* Events & Weddings */}

      <EventWedding propertyId={propertyData?.propertyId} />

      {/* Experiences (hidden) */}
      <section className="sec-padding d-none" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading pt-4">Experiences</h2>
                <p className="mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <OverExp />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions (hidden) */}
      <section className="d-none">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">NEAR BY ATTRACTIONS</h2>
                <p className="mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <Nearbycity />
            </div>
          </div>
        </div>
      </section>
      <PropertyFaq></PropertyFaq>

      <InnerFooterPage propertyData={propertyData} />
    </>
  );
}
