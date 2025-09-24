"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Calendar, Search, X } from "lucide-react";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

const Select = dynamic(() => import("react-select"), { ssr: false });

import useBook from "./useBook";
import useSelect from "./useSelect";
import { useForm } from "@/components/FormContext";

export default function BookNowForm({ onSubmit }) {
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);
  const { isFormOpen, setIsFormOpen } = useForm();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    rangeStart,
    setRangeStart,
    selectEndDate,
    rangeEnd,
    setRangeEnd,
    today1,
    formRows,
    setFormRows,
    children,
    adult,
    countroom,
    handleIncrement,
    handleDecrement,
    addNewRow,
    handleRemove,
  } = useBook();

  const {
    options,
    selectedHotelUrl,
    hotelCode,
    handleSelectChange,
    defaultHotel,
  } = useSelect();

  const pathname = usePathname();
  const checkInDatePickerRef = useRef(null);
  const checkOutDatePickerRef = useRef(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleBookNow = (prop) => {
    // const label = cityName;
    // const value = cityId;
    // const property_Id = propertyId;
    //setCityDetails({ label, value, property_Id });
    setIsFormOpen(prop);
    onSubmit(prop);
    //setPropertyId(propertyId);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isHomePage = pathname === "/";

  const openCheckInCalendar = (e) => {
    e.stopPropagation();
    checkInDatePickerRef.current.setOpen(true);
  };

  const openCheckOutCalendar = (e) => {
    e.stopPropagation();
    checkOutDatePickerRef.current.setOpen(true);
  };

  const handleCheckAvailability = () => {
    if (!selectedHotel) {
      toast.error("Please select a city or hotel first");
      return;
    }
    const checkInDate = rangeStart
      ? rangeStart.toISOString().split("T")[0]
      : "";
    const checkOutDate = rangeEnd ? rangeEnd.toISOString().split("T")[0] : "";
    const bookingUrl = `#`;
    window.open(bookingUrl, "_blank");
    toast.success("Redirecting to booking page");
  };

  const handleHotelSelect = (option) => {
    setSelectedHotel(option);
    handleSelectChange(option);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <div className={`absolute z-[1] bottom-0 left-1/2 transform -translate-x-1/2 w-full shadow-lg transition-all duration-500 ${isFormOpen ? "translate-y-0 opacity-100 visible" : "translate-y-full opacity-0 invisible"} ${isHomePage ? 'home-page-class' : 'home-page-class'}`}>
        <div className="header_booking_engine">
    <div className="row justify-content-center align-items-center">

            <div className="header-search-select-option col-md-2">
              <label htmlFor="hotel-select">Hotel/City</label>
              {options.length > 0 && (
                <Select
                  className="form-control p-0 border-0"
                  id="hotel-select"
                  options={options}
                  onChange={handleHotelSelect}
                  defaultValue={{
                    value: defaultHotel?.synxis_id || "",
                    label: defaultHotel ? `${defaultHotel.hotel_name} (${defaultHotel.city_name})` : "Select/Type a hotel or city"
                  }}
                />
              )}
            </div>

            <div className="datepicker-outer col-md-2">
              <label htmlFor="check-in">Check-in</label>
              <div className="datepicker-container">
                <DatePicker
                  selectsStart
                  selected={rangeStart}
                  onCalendarOpen={() => setIsCalendarOpen(true)}
                  onCalendarClose={() => setIsCalendarOpen(false)}
                  minDate={today1}
                  startDate={rangeStart}
                  endDate={rangeEnd}
                  className="form-control"
                  id="check-in"
                  onChange={(date) => setRangeStart(date)}
                  monthsShown={2}
                  shouldCloseOnSelect={true}
                  ref={checkInDatePickerRef}
                />
                <span className="calendar-icon" onClick={openCheckInCalendar}>
                  <Calendar size={20} />
                </span>
              </div>
            </div>

            <div className="datepicker-outer col-md-2">
              <label htmlFor="check-out">Check-out</label>
              <div className="datepicker-container">
                <DatePicker
                  selectsEnd
                  selected={rangeEnd}
                  onCalendarOpen={() => setIsCalendarOpen(true)}
                  onCalendarClose={() => setIsCalendarOpen(false)}
                  id="check-out"
                  endDate={rangeEnd}
                  className="form-control"
                  onChange={selectEndDate}
                  monthsShown={2}
                  shouldCloseOnSelect={true}
                  minDate={rangeStart}
                  ref={checkOutDatePickerRef}
                />
                <span className="calendar-icon" onClick={openCheckOutCalendar}>
                  <Calendar size={20} />
                </span>
              </div>
            </div>

            <div className="rooms-child-outer-block col-md-2" style={{ position: "relative" }}>
              <label htmlFor="rooms-childs-input">Please Select</label>
              <input
                type="text"
                id="rooms-childs-input"
                className="rooms-childs-input form-control"
                value={`Rooms: ${countroom} - Adults: ${adult()} - Children: ${children()}`}
                readOnly
                onClick={() => setIsRoomMenuOpen(!isRoomMenuOpen)}
              />
              {isRoomMenuOpen && (
                <div className="showmoreT add-rooms-block" style={{ position: "absolute", top: "100%", left: 0, width: "100%" }} onClick={(e) => e.stopPropagation()}>
                  <div>
                    {formRows.map((row, index) => (
                      <div key={row.id} className="row add-rooms-div">
                        <span>Room {index + 1}</span>
                        <div style={{ display: "flex", gap: "15%" }}>
                          <div className="form-group plus-min-style" style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
                            <p>Adult(s):</p>
                            <button onClick={() => handleDecrement(row.id, "count1")} disabled={row.count1 <= 1}>-</button>
                            <span style={{ margin: "0 10px" }}>{row.count1}</span>
                            <button onClick={() => handleIncrement(row.id, "count1")} disabled={row.count1 >= 2}>+</button>
                          </div>
                          <div className="form-group plus-min-style" style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
                            <p>Child(ren):</p>
                            <button onClick={() => handleDecrement(row.id, "count2")} disabled={row.count2 <= 0}>-</button>
                            <span style={{ margin: "0 10px" }}>{row.count2}</span>
                            <button onClick={() => handleIncrement(row.id, "count2")} disabled={row.count2 >= 2}>+</button>
                          </div>
                        </div>
                        <button className="yellow-btn btn rmv" onClick={() => handleRemove(row.id)} style={{ color: 'white', marginTop: "4em", display: "block" }}>
                          Remove Room
                        </button>
                      </div>
                    ))}
                    <button onClick={addNewRow} className="yellow-btn btn">
                      Add Room
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-2">
          <label htmlFor="rooms-childs-input"></label>

              <a className="yellow-btn btn mt-4" onClick={handleCheckAvailability}>Check Availability</a>
            </div>

          </div>
        </div>
      </div> */}

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 ${
          isHomePage ? "home-page-class" : "home-page-class"
        }`}
        style={{ zIndex: isCalendarOpen ? 0 : 10 }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            handleBookNow(!isFormOpen);
          }}
          className="p-2 bg-white flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        >
          {isFormOpen ? <X size={18} color="black" /> : "Book Now"}
        </button>
      </div>
    </>
  );
}
