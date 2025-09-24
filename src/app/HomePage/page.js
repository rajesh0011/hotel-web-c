"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X } from "lucide-react";
import { getUserInfo } from "../../utilities/userInfo";

const BookNowForm = dynamic(() => import("@/components/BookNowForm"), { ssr: false });
const HotelSlider = dynamic(() => import("@/sliders/HotelSlider"), { ssr: false });
const EventSlider = dynamic(() => import("@/sliders/Eventsliders"), { ssr: false });
const LatestOffers = dynamic(() => import("@/sliders/LatestOffers"), { ssr: false });
const ExperienceFilterPage = dynamic(() => import("@/sliders/ExperienceFilterPage"), { ssr: false });
const BrandMapSwitcher = dynamic(() => import("@/sliders/BrandMapSwitcher"), { ssr: false });
const HomeDiscoverSlider = dynamic(() => import("@/sliders/HomeDiscoverSlider"), { ssr: false });
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const MediaSlider = dynamic(() => import("@/sliders/mediaSlider"), { ssr: false });
const FooterPage = dynamic(() => import("@/components/Footer"), { ssr: false });
const BookingEngineProvider = dynamic(() => import("../cin_context/BookingEngineContext").then(mod => mod.BookingEngineProvider), { ssr: false });
const FilterBar = dynamic(() => import("../cin_booking_engine/Filterbar"), { ssr: false });
import * as ReactDOM from "react-dom";
import ComingSoonHome from "@/sliders/ComingSoonHome";

export default function Page({ contentData, tokenKey, status }) {
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showFullText1, setShowFullText1] = useState(false);
  const [showFullText2, setShowFullText2] = useState(false);
  const [showFullText3, setShowFullText3] = useState(false);
  const [showFullText4, setShowFullText4] = useState(false);
  const [showFullText5, setShowFullText5] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const filterBarRef = useRef(null);
  
   
      async function postBookingWidged(rooms,mapping, isClose,ctaName,selectedPropertyId) {
       const resp = await getUserInfo();
         const sessionId = sessionStorage?.getItem("sessionId");
         const payload = {
         ctaName: ctaName,
         urls: window.location.href,
         cityId: "0",
         propertyId: selectedPropertyId?.toString() || "0",
         checkIn: "",
         checkOut: "",
         adults: "0",
         children: "0",
         rooms: "0",
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
    //setShowFilterBar(!showFilterBar);
    
  };
  useEffect(() => {
    if (tokenKey) {
      openFilterBar(!isOpenFilterBar);
    }
  }, [tokenKey]);

  const StayStory =
    "Explore stays not by location, but by intention. From business to bliss, nature to nostalgia — your perfect escape awaits.";

  const NewHotelsText =
    " As the temperatures dip, the urge to escape rises. Whether you’re dreaming of mountain fog, crisp desert air, or quiet forest trails — we’ve curated the perfect winter hideouts across India just for you.";
  const ExpericenceText =
    "Whether you’re drawn to soulful Ganga Aartis, thrilling jeep safaris, or peaceful beach walks — we’ve curated stays around experiences that move you. Pick what you love, and let your stay become a story worth sharing.";
  const OffersText =
    "Discover exclusive offers across our portfolio of hotels and resorts. Whether you’re planning a business trip, a romantic getaway, or a family retreat — now’s the perfect time to book and save.";
  const OurBrandsText =
    "No two journeys are the same — and neither are our brands. From iconic heritage stays to contemporary city escapes, each The Clarks Hotels and Resorts brand is crafted to meet a different travel mood, mindset, and moment. Explore them all and find the one that speaks to you.";
  const HostDine =
    "At The Clarks Hotels & Resorts, hospitality goes beyond just rooms. Whether you’re planning a grand celebration, an intimate dinner, or a high-powered conference, our facilities are designed to make every moment seamless, stylish, and unforgettable.";

  const handlePropertyBookNow = async (prperty) => {
    
    setOpen(!isOpen);
    setShowFilterBar(!showFilterBar);
    const label = prperty?.cityName;
    const value = prperty?.cityId;
    const property_Id = prperty?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setStaahPropertyId(prperty?.staahPropertyId);
    
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = filterBarRef.current.querySelector("input, select, button");
      if (firstInput) firstInput.focus();
    }
  };
const handleBookNowClick2 = async () => {
    {
      postBookingWidged("","", false,"Widget Open");
    }
    setOpen(false);
    setShowFilterBar(false);
  };
  return (
    <>
      <Header onSubmit={handlePropertyBookNow} onClick={handleBookNowClick2}></Header>
      <section className="position-relative banner-section" ref={filterBarRef}>
        {/* Banner Image */}
        <div className="w-100 overflow-hidden rounded-0 mtspace5">
          <video
            className="w-100 h-[102vh] object-cover for-desktop-video-main"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/img/banner-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
           <video
            className="w-100 h-[102vh] object-cover for-mobile-video-main"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/img/banner-video-for-mobile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Fixed Book Now Form at Bottom of Section */}

        {/* {isOpenFilterBar ? (
          <BookingEngineProvider>
            <FilterBar
              contentData={contentData}
              tokenKey={tokenKey}
              selectedProperty={0}
              openBookingBar={isOpenFilterBar}
              onClose={() => openFilterBar(false)}
            />
          </BookingEngineProvider>
        ) : (
          <BookingEngineProvider>
            <FilterBar
              contentData={contentData}
              tokenKey={tokenKey}
              selectedProperty={0}
              onClose={() => openFilterBar(false)}
            />
          </BookingEngineProvider>
        )} */}

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 home-page-class`}
          style={{ zIndex: 10 }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePropertyBookNow();
            }}
            className="p-2 bg-white flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 hero-banner-book-now-btn"
          >
            {isOpen ? <X size={18} color="black" /> : "Book Now"}
          </button>
        </div>
        {isOpenFilterBar && ReactDOM.createPortal (
          <BookingEngineProvider>
            <FilterBar
              contentData={contentData}
              tokenKey={tokenKey}
              selectedProperty={0}
              openBookingBar={isOpenFilterBar}
              onClose={() => {
                openFilterBar(false);
                setOpen(false);
              }}
            />
          </BookingEngineProvider>,
          document.body
        )}

        {showFilterBar && ReactDOM.createPortal (
          <BookingEngineProvider>
            <FilterBar
              selectedProperty={parseInt(staahPropertyId)}
              cityDetails={cityDetails}
              openBookingBar={showFilterBar}
              onClose={() => {
                setOpen(false);
                setShowFilterBar(false);
              }}
            />
          </BookingEngineProvider>,
          document.body
        )}
      </section>
      {/* Discover slider */}
      <section data-aos="fade-up" className="mobile-section-border-home desk-margin-top">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">
                  Your Stay. Your Story. Your way.
                </h2>

                <p className="mb-2 home-page-paragraph">
                  {StayStory.length > 100 ? (
                    <>
                      {showFullText
                        ? StayStory
                        : StayStory.slice(0, 100) + "..."}
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
                    text
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <HomeDiscoverSlider />
            </div>
          </div>
        </div>
      </section>
      {/* new hotel slider */}
      <section className="mobile-section-border-home desk-margin-top" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Discover Winter Differently</h2>
                <p className="mb-2 home-page-paragraph">
                  {NewHotelsText.length > 100 ? (
                    <>
                      {showFullText1
                        ? NewHotelsText
                        : NewHotelsText.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText1(!showFullText1)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText1 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    NewHotelsText
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec home-hotel-sliderr">
            <div className="row">
              <HotelSlider onSubmit={handlePropertyBookNow}/>
            </div>
          </div>
        </div>
      </section>
      {/* experience slider */}
      <section className="mobile-section-border-home desk-margin-top" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">From Stays to Stories</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2 home-page-paragraph">
                  {ExpericenceText.length > 100 ? (
                    <>
                      {showFullText2
                        ? ExpericenceText
                        : ExpericenceText.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText2(!showFullText2)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText2 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    ExpericenceText
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <ExperienceFilterPage onSubmit={handlePropertyBookNow} />
              {/* <Hotelslider />
              <NearByHridwar/> */}
            </div>
          </div>
        </div>
      </section>
      {/* Latest Offers */}
      <section className=" mobile-section-border-home desk-margin-top" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Unwrap Exclusive Deals</h2>

                <p className="mb-2 home-page-paragraph">
                  {OffersText.length > 100 ? (
                    <>
                      {showFullText3
                        ? OffersText
                        : OffersText.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText3(!showFullText3)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText3 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    OffersText
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec latest-offers-home">
            <div className="row">
              <LatestOffers onSubmit={handlePropertyBookNow} />
              {/* <Hotelslider />
              <NearByHridwar/> */}
            </div>
          </div>
        </div>
      </section>

      
      <section className="mobile-section-border-home desk-margin-top">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Coming Soon</h2>
              </div>
              <div className="col-md-12">
                <ComingSoonHome></ComingSoonHome>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* brand */}
      <section className=" mobile-section-border-home desk-margin-top">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Our Brands</h2>
                <p className="mb-2 home-page-paragraph">
                  {OurBrandsText.length > 100 ? (
                    <>
                      {showFullText4
                        ? OurBrandsText
                        : OurBrandsText.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText4(!showFullText4)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText4 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    OurBrandsText
                  )}
                </p>
                {/* <Link href="/ourbrands" className="box-btn book-now">
                  Know More
                </Link> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <BrandMapSwitcher />
            </div>
          </div>
        </div>
      </section>
      {/* eventslider */}
      <section className=" event-sec mobile-section-border-home desk-margin-top">
        <div className="container">
          <div className="global-heading-sec text-left">
            <div className="row justify-content-start">
              <div className="col-md-12">
                <h2 className="global-heading mb-3 text-center">
                  Host, Dine, Celebrate — Your Way
                </h2>
                <p className="mb-2 home-page-paragraph text-center">
                  {HostDine.length > 100 ? (
                    <>
                      {showFullText5
                        ? HostDine
                        : HostDine.slice(0, 100) + "..."}
                      <span
                        onClick={() => setShowFullText5(!showFullText5)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText5 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    HostDine
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row mt-4">
              <EventSlider />
            </div>
          </div>
        </div>
      </section>

      <MediaSlider />

      <FooterPage />
    </>
  );
}
