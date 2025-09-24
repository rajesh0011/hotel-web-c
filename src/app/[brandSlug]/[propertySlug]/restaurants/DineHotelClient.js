"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as ReactDOM from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import BookNowForm from "@/components/BookNowForm";
import Diningpageslider from "@/sliders/Diningpageslider";
import PropertyHeader from "@/components/PropertyHeader";
import Image from "next/image";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import InnerFooterPage from "@/components/InnerFooterPage";
import { getUserInfo } from "../../../../utilities/userInfo";

export default function DineHotelClient({ propertySlug }) {
  const [propertyData, setPropertyData] = useState(null);
  const [dineData, setDineData] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bannerImages, setBannerImages] = useState([]);

  const [propertyId, setPropertyId] = useState(null);
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
  const handleRoomBookNow = async (room) => {
    setRoomDetails(room);
    setShowFilterBar(true);
  };
  useEffect(() => {
    if (!propertySlug) return;

    const fetchPropertyIdFromSlug = async (slug) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyList`
        );
        const json = await res.json();
        if (json.errorMessage !== "success") {
          console.error("Property list fetch error:", json);
          return null;
        }
        const found = json.data.find(
          (p) => p.propertySlug.toLowerCase() === slug.toLowerCase()
        );
        const label = found?.cityName;
        const value = found?.cityId;
        const property_Id = found?.staahPropertyId;
        setCityDetails({ label, value, property_Id });
        setPropertyId(found?.staahPropertyId);
        return found?.propertyId || null;
      } catch (error) {
        console.error("Error fetching property list:", error);
        return null;
      }
    };

    const fetchData = async () => {
  setLoading(true);
  try {
    const propertyId = await fetchPropertyIdFromSlug(propertySlug);
    if (!propertyId) {
      setDineData([]);
      setBanner(null);
      setLoading(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/dine/GetDineByProperty?propertyId=${propertyId}`
    );
    const result = await res.json();

    const banners = result?.data || [];
    const firstBanner = banners[0] || null;


   // fetch property details for footer + banner images
   const imageRes = await fetch(
     `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${propertyId}`
   );
   const dataJson = await imageRes.json();
   const propertyObj = dataJson?.data?.[0] || null;

   if (propertyObj) {
     setPropertyData(propertyObj); // ✅ for dynamic footer
     const imagesFromApi = propertyObj.images || [];
     const imageUrls = imagesFromApi
       .map((img) => img.propertyImage)
       .filter(Boolean);
     setBannerImages(imageUrls);
   }

   const allDineDetails =
     banners.flatMap((b) => b.dineDetails || []) || [];
   setDineData(allDineDetails);
  } catch (error) {
    console.error("Error fetching property data:", error);
    setDineData([]);
    setBanner(null);
  } finally {
    setLoading(false);
  }
};


    fetchData();
  }, [propertySlug]);

  // if (loading) return <div>Loading hotel details...</div>;

  return (
    <>
       <PropertyHeader
        brand_slug={propertySlug}
        id={banner?.propertyId}
        onSubmit={handleBookNowClick}
      />

      <section className="position-relative banner-section" ref={filterBarRef}>
      {/* <section className="position-relative banner-section d-none">
        <div className="w-100 overflow-hidden rounded-0 mtspace5">
          {bannerImages.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              autoplay={{ delay: 4000 }}
              loop
              className="w-100 h-[100vh]"
            >
              {bannerImages.map((imgUrl, index) => (
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

        <div className="position-absolute bottom-0 start-0 w-100 bg-white shadow" ref={filterBarRef}>
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
                selectedProperty={parseInt(propertyId)}
                cityDetails={cityDetails}
                roomDetails={roomDetails}
                openBookingBar={showFilterBar}
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

      <section className="inner-no-banner-sec">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-2">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">
                  {banner?.dineBannerTitle || "Dining"}
                </h2>
                {/* <p className="mb-0">
                  {banner?.dineBannerDesc ||
                    "Enjoy our signature dining experiences with local and international flavors."}
                </p> */}
              </div>
            </div>
          </div>

          {/* Show slider only if data exists */}
          {/* {dineData.length > 0 ? ( */}
          {dineData.length > 0 &&
            <div className="winter-sec">
              <div className="row">
                <Diningpageslider dineData={dineData} />
              </div>
            </div>
          // ) : (
          //   <p className="text-center text-gray-500">
          //     No dining data found for this property.
          //   </p>
          // )
          }
        </div>
      </section>

      <InnerFooterPage propertyData={propertyData} />
    </>
  );
}
