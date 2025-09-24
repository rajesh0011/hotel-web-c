"use client";

import { useEffect, useState,useRef } from "react";

import "@/styles/header.css";
import "@/styles/globals.css";
import "@/styles/style.css";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import Header from "@/components/Header";
import { X } from "lucide-react";

export default function ClientHeader() {
  
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const filterBarRef = useRef(null);
  
  const handleBookNowClick = async () => {
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = filterBarRef.current.querySelector("input, select, button");
      if (firstInput) firstInput.focus();
    }
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
    // setShowFilterBar(!showFilterBar);
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
    <Header onSubmit={handleBookNowClick} onClick={handleBookNowClick2} />
    
        <div ref={filterBarRef}>
    <button
            onClick={(e) => {
              e.preventDefault();
              handleBookNowClick();
            }}
            
          >
            {isOpen ? <X size={18} color="black" /> : "Book Now"}
          </button>
          
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
                      
        </div>
    </>
  );
}
