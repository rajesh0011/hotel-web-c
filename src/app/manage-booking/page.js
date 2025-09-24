"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import FooterPage from "@/components/Footer";
import ManageBookingPageComponent from "@/sliders/ManageBookingPageComponent.js";

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
  const handleBookNowClick = async () => {
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start", top: "200px" });
      const firstInput = filterBarRef.current.querySelector("input, select, button");
      if (firstInput) firstInput.focus();
    }
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
  };
  const handleBookNowSlider = async (dataBookNow, url) => {
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
    
      <section className="our-hotel-corporate-page our-hotel-section">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-9 md-offset-1">
              <div className="global-heading-sec text-center">
                <div className="row justify-content-center mb-0">
                  <div className="col-md-9 md-offset-1">
                  <h2 className="global-heading">Manage Booking</h2>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        
              <ManageBookingPageComponent onSubmit={handleBookNowSlider} />
     </div>
      </section>

      <FooterPage />
    </>
  );
}
