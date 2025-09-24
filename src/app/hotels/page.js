"use client";
import React, { useState, useRef, useEffect } from "react";
import BookNowForm from "@/components/BookNowForm";
import Hotelpageslider from "@/sliders/Hotelpageslider";
import Link from "next/link";
import Header from "@/components/Header";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import FooterPage from "@/components/Footer";
import * as ReactDOM from "react-dom";
import { getUserInfo } from "../../utilities/userInfo";

export default function Page({ params }) {
  const brand_slug = "citypage";
    const filterBarRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
  const [isFilterBarWithPropertyId, openFilterBarWithPropertyId] =
    useState(false);
  const [isOpen, setOpen] = useState(false);
  const [propertyPageUrl, setPropertyPageUrl] = useState("");

  
   
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
      filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start", top: "200px" });
      const firstInput = filterBarRef.current.querySelector("input, select, button");
      if (firstInput) firstInput.focus();
    }
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
  };
  const handleBookNowSlider = async (dataBookNow, url) => {
    if(isOpen){
      postBookingWidged("","", false,"Widget Open");
    }else{
      postBookingWidged("","", true,"Widget Closed");
    }
    setOpen(!isOpen);
    setPropertyPageUrl(url);
    const label = dataBookNow?.cityName;
    const value = dataBookNow?.cityId;
    const property_Id = dataBookNow?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setStaahPropertyId(dataBookNow?.staahPropertyId);
    openFilterBarWithPropertyId(!isFilterBarWithPropertyId);
  };
  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
      <Header onSubmit={handleBookNowClick} onClick={handleBookNowClick2}></Header>
     <section className="position-relative" ref={filterBarRef}>
       <div className="position-absolute top-100 start-0 w-100 bg-white shadow" >
          {/* <BookNowForm /> */}

          {/* {isOpenFilterBar && ( */}

          {isFilterBarWithPropertyId && ReactDOM.createPortal(
            <section className="filter-bar-hotels-cin">
              <BookingEngineProvider>
              <FilterBar
                selectedProperty={parseInt(staahPropertyId)}
                cityDetails={cityDetails}
                openBookingBar={isFilterBarWithPropertyId}
                //propertyPageUrl={propertyPageUrl}
                onClose={() => {
                  openFilterBarWithPropertyId(false);
                  setOpen(false);
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
          {/* )} */}
        </div>
        </section>
      {/* Discover slider */}
      <section className="our-hotel-corporate-page our-hotel-section">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-9 md-offset-1">
              <div className="global-heading-sec text-center">
                <div className="row justify-content-center mb-0">
                  <div className="col-md-9 md-offset-1">
                  <h2 className="global-heading">Explore The Brand</h2>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        
              <Hotelpageslider onSubmit={handleBookNowSlider} />
     </div>
      </section>

      <FooterPage />
    </>
  );
}
