"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as ReactDOM from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import BookNowForm from "@/components/BookNowForm";
import Eventspagesslider from "@/sliders/Eventspageslider";
import PropertyHeader from "@/components/PropertyHeader";
import Image from "next/image";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import InnerFooterPage from "@/components/InnerFooterPage";
import { getUserInfo } from "../../../../utilities/userInfo";

export default function EventHotelClient({ propertySlug }) {
  const [propertyData, setPropertyData] = useState(null);
  const [venueData, setVenueData] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [propertyId, setPropertyId] = useState(null);
  const [propertyName, setPropertyName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [bannerImages, setBannerImages] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
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
  useEffect(() => {
    if (!propertySlug) return;

    const fetchPropertyDetailsFromSlug = async (slug) => {
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
        if (found) {
          setPropertyId(found.propertyId);
          setStaahPropertyId(found?.staahPropertyId);
          setPropertyName(found.propertyName);
          setCityName(found.cityName);
          setCityId(found.cityId);
          return found.propertyId;
        }
        return null;
      } catch (error) {
        console.error("Error fetching property list:", error);
        return null;
      }
    };
    const fetchData = async () => {
      setLoading(true);
      try {
        const propertyIdFetched = await fetchPropertyDetailsFromSlug(
          propertySlug
        );

        if (!propertyIdFetched) {
          setVenueData([]);
          return;
        }

        setPropertyId(propertyIdFetched);

        // ✅ Step 1: Get venue data from YOUR API
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/Venue/GetVenueByProperty?propertyId=${propertyIdFetched}`
        );
        const result = await res.json();

        const banners = result?.data || [];
        const firstBanner = banners[0] || null;

        setBanner(firstBanner);

        const allVenueDetails = banners.flatMap((v) => v.roomsInfo || []) || [];
        setVenueData(allVenueDetails);

        // ✅ Step 2: Get banner images from GetPropertyByFilter
        const bannerRes = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${propertyIdFetched}`
        );
        const bannerJson = await bannerRes.json();
        const propertyData = bannerJson?.data?.[0];
        setPropertyData(propertyData);
        const images = propertyData?.images || [];

        const bannerImgs = images
          .map((img) => img.propertyImage)
          .filter(Boolean);
        setBannerImages(bannerImgs);
      } catch (error) {
        console.error("Error fetching venue or banner data:", error);
        setVenueData([]);
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
                    src={imgUrl || ""}
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

      <section className="inner-no-banner-sec">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">
                  {banner?.venueBannerTitle || "Our Venues"}
                </h2>
                <p className="mb-0">
                  {/* {banner?.venueBannerDesc} */}
                  {banner?.venueBannerDesc.length > 150 ? (
                    <>
                      {showFullText
                        ? banner?.venueBannerDesc
                        : banner?.venueBannerDesc.slice(0, 150) + "..."}
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
                    banner?.venueBannerDesc
                  )}
                  
                </p>
              </div>
            </div>
          </div>

          {venueData.length > 0 ? (
            <div className="winter-sec">
              <div className="row">
                <Eventspagesslider
                  venueData={venueData}
                  propertyId={propertyId}
                  propertyName={propertyName}
                  cityName={cityName}
                  cityId={cityId}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No venue data found for this property.
            </p>
          )}
        </div>
      </section>

       <InnerFooterPage propertyData={propertyData} />
    </>
  );
}
