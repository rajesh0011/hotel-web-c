"use client";
import React, { useState, useRef, useEffect } from "react";
import UpcomingPropertiesSlider from "@/sliders/UpcomingPropertiesSlider";
import Image from "next/image";
import ServicesGrid from "@/sliders/ServicesGrid";
import ContactFormBrand from "@/components/ContactFormBrand";
import Header from "@/components/Header";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import * as ReactDOM from "react-dom";
import FooterPage from "@/components/Footer";
import { getUserInfo } from "../../utilities/userInfo";

export default function ClarksHotelsPage() {
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
  };
  
  const handleBookNowClick2 = async () => {
    {
      postBookingWidged("","", false,"Widget Open");
    }
    setOpen(false);
    openFilterBar(false);
  };
  return (
    <>
      <Header onSubmit={handleBookNowClick}  onClick={handleBookNowClick2}></Header>
      
     <section className="position-relative">
<div className="position-absolute top-100 start-0 w-100 bg-white shadow" ref={filterBarRef}>
          
          {isOpenFilterBar &&
            ReactDOM.createPortal(
              <section className="filter-bar-hotels-cin" >
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
      <div className="font-sans association text-gray-800" >
        {/* Hero Section */}
        <div
          className="relative h-screen w-full bg-cover bg-center brandassobanner"
          style={{
            backgroundImage: "url('/images/brand-association/banner.webp')",
          }}
        >
          {/* <div className="absolute inset-0 flex justify-between items-end px-6 md:px-24 pb-10 text-white">  

    <div className="max-w-xl">
      <h1 className="text-[20px] md:text-[32px] font-bold leading-snug md:leading-snug">
        “Bringing a personality to modern<br />
        hospitality in whatever we do”
      </h1>
      <p className="mt-2 text-sm md:text-base font-medium">
        - Anoop Kumar, Chairman
      </p>
    </div>


    <div className="text-right text-sm md:text-base font-semibold leading-tight">
      Start your <br />
      Hotel <br />
      journey <br />
      with us.
    </div>
  </div> */}
        </div>

       
        {/* Management Section */}
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Column: Text */}
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">
                The Clarks - Hotels & Resorts Management
              </h5>
              <p>
                Starting with our first owned hotel in 1947, followed by our
                first managed property in 2006, we've proudly surged ahead to
                oversee a portfolio of 133+ hotels today. Our growth trajectory
                has established a tradition of unparalleled hospitality
                excellence.
              </p>
              <ul className="list-unstyled fw-semibold mt-4">
                <li>12 Brands</li>
                <li>133+ Hotels</li>
                <li>110+ Destinations</li>
                <li>6000+ Keys</li>
              </ul>
            </div>

            {/* Right Column: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/images/brand-association/management-img.webp"
                alt="The Clarks Logo"
                className="img-fluid"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="container-fluid">
          {/* Banner Image at Top */}
          <div className="row mb-5">
            <div className="col">
              <img
                src="/images/brand-association/Development-04_aca60a2d.webp"
                alt="Banner"
                className="img-fluid w-100 rounded"
              />
            </div>
          </div>
        </div>

        <UpcomingPropertiesSlider />

        <div className="container">
          {/* Banner Image at Top */}
          <div className="row mb-5">
            <div className="col">
              <div className="container">
                {/* Banner Image at Top */}
                <div className="row mb-5">
                  <div className="col">
                    <img
                      src="/images/brand-association/Unique_Destinations_Banner_-_Development_Page-07_1_y2g98d.webp"
                      alt="Banner"
                      className="img-fluid w-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactFormBrand />

        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text */}
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Let us set up your property</h5>
              <p className="!text-[14px]">
                We assist our partners in developing successful hotels by
                providing our brand standards and the support of our highly
                qualified technical and development team. Our teams take care of
                every minute detail necessary to ensure a smooth and successful
                hotel launch as part of the pre-opening process. Everything is
                taken care of, from creating a thorough pre-opening budget to
                setting up numerous processes for recruiting, training,
                marketing, advertising, and promotion activities.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/images/brand-association/Web-03_c610ge.webp"
                alt="The Clarks Logo"
                className="img-fluid"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="container py-5 text-start brand-association-team-sec">
          <p className="text-muted mb-1">
            How do our partners and proprietors perceive us?
          </p>
          <p className="mb-5">
            In our ongoing commitment to enhance value for our owners and
            guests, we continually channel resources into refining our systems,
            empowering our workforce, and elevating our brands, thereby
            unveiling fresh prospects at every twist and turn.
          </p>

          <div className="row text-start d-none">
            {/* Card 1 */}
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <Image
                  src="/images/brand-association/anuj.webp"
                  alt="Anuj Agarwal"
                  width={300}
                  height={220}
                  className="mb-3"
                />
                <h6 className="fw-bold mb-1">Anuj Agarwal</h6>
                <p className="text-muted small mb-2">
                  Managing Director
                  <br />
                  MB Greens Hotels Pvt Ltd
                </p>
              </div>
              <p className="small">
                I've known The Clark family for more than 10 years. I have seen
                the transition in the brand's position in Indian hospitality:
                the team's operational judgements, attention to property care,
                and commitment to staff satisfaction and training have given me
                immense confidence, leading me to renew my contract.
              </p>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <Image
                  src="/images/brand-association/nilesh.webp"
                  alt="Nilesh Pandurang Tarawade"
                  width={300}
                  height={220}
                  className="mb-3"
                />
                <h6 className="fw-bold mb-1">Nilesh Pandurang Tarawade</h6>
                <p className="text-muted small mb-2">
                  Director
                  <br />
                  Tarawade Group & Tarawade Hotels Pvt Ltd
                </p>
              </div>
              <p className="small">
                The relationship with The Clarks Hotels & Resorts has been over
                a decade. We have always been impressed by The Clarks management
                as well as the corporate team and their understanding of an
                owner's, investor's, or developer's requirements, as well as
                their ability to put themselves in their position and aim for a
                situation that will always bring us the possibility of a
                mutually beneficial relationship.
              </p>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <Image
                  src="/images/brand-association/dheeraj.webp"
                  alt="Deeraj Agarwal"
                  width={300}
                  height={220}
                  className="mb-3"
                />
                <h6 className="fw-bold mb-1">Deeraj Agarwal</h6>
                <p className="text-muted small mb-2">
                  Managing Director
                  <br />
                  Surajban & Sons Pvt Ltd
                </p>
              </div>
              <p className="small">
                We highly appreciate and express our gratitude towards the
                corporate office team; their approach and attention to detail
                have genuinely set us apart throughout our pre-opening process.
                The Clarks Hotels & Resorts has provided us with strategic
                insights, comprehensive planning and all other practical
                solutions. Their commitment to excellence in this crucial stage
                has instilled confidence in me and set the foundation for a
                promising future.
              </p>
            </div>
          </div>

          <div className="mt-2 text-end">
            <button className="btn btn-dark px-4 py-2 text-uppercase rounded-0">
              Reach out to us
            </button>
          </div>
        </div>

        <ServicesGrid />

        <div className="container-fluid m-0 p-0 py-2">
          {/* Banner Image at Top */}
          <div className="row mt-5">
            <div className="col">
              {/* Banner Image at Top */}
              <div className="row mb-5">
                <div className="col">
                  <img
                    src="/images/brand-association/Brand_Association-01-min_mt9mdx.webp"
                    alt="Banner"
                    className="img-fluid w-100"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterPage />
    </>
  );
}
