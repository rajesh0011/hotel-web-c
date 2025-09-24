"use client";
import React, { useState, useRef, useEffect } from "react";
import BookNowForm from "@/components/BookNowForm";
import Header from "@/components/Header";
import LatestOffersPage from "@/sliders/LatestOffersPage";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import FooterPage from "@/components/Footer";
import * as ReactDOM from "react-dom";
import { getUserInfo } from "../../utilities/userInfo";

/* Metadata moved to layout. Remove from here. */

export default function ouroffersPage() {
  const filterBarRef = useRef(null);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
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

  const handlePropertyBookNow = async (prperty) => {
    
    if(isOpen){
      postBookingWidged("","", true,"Widget Closed");
    }else{
      postBookingWidged("","", false,"Widget Open");
    }
    setOpen(!isOpen);
    const label = prperty?.cityName;
    const value = prperty?.cityId;
    const property_Id = prperty?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setStaahPropertyId(prperty?.staahPropertyId);
    setShowFilterBar(!showFilterBar);
    
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

      <section className="position-relative" ref={filterBarRef}>
             <div className="position-absolute top-100 start-0 w-100 bg-white shadow" >
                {/* <BookNowForm /> */}
      
                {/* {isOpenFilterBar && ( */}
      
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
                {showFilterBar && ReactDOM.createPortal(
                  <section className="filter-bar-hotels-cin">
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
            </BookingEngineProvider>
                  </section>,
                    document.body
                )}
                {/* )} */}
              </div>
              </section>

      {/* <section className="position-relative banner-section d-none" ref={filterBarRef}>
        <div className="position-absolute bottom-0 start-0 w-100 bg-white shadow">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 home-page-class`}
            style={{ zIndex: 10 }}
          >
           
          </div>
          {isOpenFilterBar && (
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
          )}

          {showFilterBar && (
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
            </BookingEngineProvider>
          )}
        </div>
      </section>  */}

      <section className="our-offer-corporate-page">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">
                  Offers at The Clarks Hotels & Resorts
                </h2>
                {/* <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <LatestOffersPage onSubmit={handlePropertyBookNow} />
            </div>
          </div>
        </div>
      </section>

      <FooterPage />
    </>
  );
}
