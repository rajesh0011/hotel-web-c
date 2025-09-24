"use client";
import React, { useState, useRef, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Header from "@/components/Header";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
// import ThumbnailCarousel from "./ThumbnailCarausel";
import FooterPage from "@/components/Footer";
import BrandTabs from "./BrandTabs";
import { getUserInfo } from "../../utilities/userInfo";

export default function ourbrandsPage() {
  const filterBarRef = useRef(null);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  
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
      <Header onSubmit={handleBookNowClick} onClick={handleBookNowClick2}></Header>
     <section className="position-relative" ref={filterBarRef}>
        <div className="position-absolute top-100 start-0 w-100 bg-white shadow">
          {isOpenFilterBar &&
            ReactDOM.createPortal(
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
 
    <BrandTabs></BrandTabs>
  

      <FooterPage />
    </>
  );
}
