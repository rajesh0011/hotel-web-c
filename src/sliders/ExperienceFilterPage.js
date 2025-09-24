"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import Link from "next/link";
import * as ReactDOM from "react-dom";
import { FilterIcon } from "lucide-react";

export default function ExperienceFilterPage({ onSubmit }) {
  const [experienceFilters, setExperienceFilters] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [brandSlug, setBrandSlug] = useState("");
  const [showFilters, setShowFilters] = useState(false); // toggle for mobile

  // Fetch Brand Slug
  useEffect(() => {
    const fetchBrandSlug = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`
        );
        const json = await res.json();
        if (json.errorCode === "0" && json.data.length > 0) {
          setBrandSlug(json.data[0].brandSlug);
        }
      } catch (error) {
        console.error("Error fetching brand slug:", error);
      }
    };

    fetchBrandSlug();
  }, []);

  // Fetch Experience Categories
  useEffect(() => {
    const fetchExperienceFilters = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetDisplayCategoryList`
        );
        const json = await res.json();
        if (json.errorCode === "0") {
          setExperienceFilters(json.data);
          if (json.data.length > 0) {
            setSelectedCategoryId(json.data[0].displayCategoryId);
          }
        }
      } catch (error) {
        console.error("Error fetching experience categories:", error);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchExperienceFilters();
  }, []);

  // Fetch Hotels
  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchHotels = async () => {
      setLoadingHotels(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?CategoryId=${selectedCategoryId}`;
        const res = await fetch(apiUrl);
        const json = await res.json();
        if (json.errorCode === "0") {
          setHotels(json.data || []);
        } else {
          setHotels([]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      } finally {
        setLoadingHotels(false);
      }
    };

    fetchHotels();
  }, [selectedCategoryId]);

  const handleBookNow = (hotel) => {
    const label = hotel.cityName;
    const value = hotel.cityId;
    const property_Id = hotel?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setShowFilterBar(!showFilterBar);
    setPropertyId(hotel?.staahPropertyId);
    onSubmit(hotel);
  };

  return (
    <>
      {/* <section className="new-fixed-filter-bar">
        {showFilterBar &&
          ReactDOM.createPortal(
            <BookingEngineProvider>
              <FilterBar
                selectedProperty={parseInt(propertyId)}
                cityDetails={cityDetails}
                openBookingBar={showFilterBar}
                onClose={() => {
                  setShowFilterBar(false);
                }}
              />
            </BookingEngineProvider>,
            document.body
          )}
      </section> */}

      <div className="flex flex-wrap expsld gap-3 px-6 py-10 home-experience-sec-main">
        {/* Sidebar Filter */}
        <div className="w-full md:w-1/3 border rounded-2xl overflow-y-auto max-h-[500px] mt-2 p-4">
          <h2 className="text-2xl font-semibold mb-2 inner-type-2-heading">
            Experience by{" "}
            <span
              className="exp-filter-icon cursor-pointer"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FilterIcon />
            </span>
          </h2>
          <p className="text-sm font-medium text-gray-700 mb-4">
            Choose category to filter hotels
          </p>
          <hr className="mb-4" />

          {loadingFilters ? (
            <p className="text-sm text-gray-500">Loading filters...</p>
          ) : (
            <>
              {/* Mobile filters (hidden until toggle) */}
              {showFilters && (
                <div className="space-y-3 this-exp-for-mob">
                  {experienceFilters.map((filter) => (
                    <label
                      key={filter.displayCategoryId}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          checked={
                            selectedCategoryId === filter.displayCategoryId
                          }
                          onChange={() => {
                            setSelectedCategoryId(filter.displayCategoryId);
                            setShowFilters(false);
                          }}
                          className="accent-black w-4 h-4"
                        />
                        <span className="text-sm">
                          {filter.displayCategory}
                        </span>
                      </div>
                      <span className="text-sm">{filter.hotelsCount}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Desktop filters (always visible) */}
              <div className="space-y-3 this-exp-for-desk">
                {experienceFilters.map((filter) => (
                  <label
                    key={filter.displayCategoryId}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={
                          selectedCategoryId === filter.displayCategoryId
                        }
                        onChange={() =>
                          setSelectedCategoryId(filter.displayCategoryId)
                        }
                        className="accent-black w-4 h-4"
                      />
                      <span className="text-sm">{filter.displayCategory}</span>
                    </div>
                    <span className="text-sm">{filter.hotelsCount}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Hotels List */}
        <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 experience-item-list-box">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {loadingHotels ? (
              <p className="text-gray-500">Loading hotels...</p>
            ) : hotels.length === 0 ? (
              <p className="text-gray-500">
                No hotels found for this category.
              </p>
            ) : (
              hotels.map((hotel, index) => (
                <div key={index} className="expm10">
                  <div className="overflow-hidden rounded-2xl no-image-bg">
                    <Image
                      src={
                        hotel?.images[0]?.propertyImage || "/images/no-img.jpg"
                      }
                      alt={hotel.name || "image"}
                      width={500}
                      height={100}
                      className="w-full h-[120px] object-cover experience-card-image"
                    />
                  </div>
                  <div className="experience-box-items-text">
                    <div className="left-side-box">
                      <Link href={`/${brandSlug}/${hotel.propertySlug}/hotel-overview`} className="font-bold text-capitalize text-lg exp-city-name">
                        <small className="f-new-10 font-bold">
                          {hotel.propertyName}
                        </small>
                      </Link>

                      {brandSlug && (
                        <Link
                          href={`/${brandSlug}/${hotel.propertySlug}/hotel-overview`}
                          className="box-btn know-more"
                        >
                          Visit Hotel
                        </Link>
                      )}

                      {/* Conditional Button */}
                      {!hotel.staahPropertyPrice ||
                      hotel.staahPropertyPrice === 0 ? (
                        <button
                          className="box-btn not-bookable book-now"
                          onClick={() =>
                            handleBookNow(
                              hotel
                            )
                          }
                        >
                         Book Now
                        </button>
                      ) : hotel.staahPropertyPrice === 297 ? (
                        <button
                          className="box-btn not-available book-now"
                          disabled
                        >
                          Not Available
                        </button>
                      ) : (
                        <button
                          className="box-btn book-now"
                          onClick={() =>
                            handleBookNow(
                              hotel
                            )
                          }
                        >
                          Book Now
                        </button>
                      )}
                    </div>

                    {/* Conditional Right Side Box */}
                    {!hotel.staahPropertyPrice ||
                    hotel.staahPropertyPrice === 0 ? (
                      <div className="hotel-box-content hotel-right-side-box">
                        <p className="font-semibold text-lg text-red-600 text-end sold-out-text mt-0 mb-0">
                          Sold Out
                          <span className="small-text-for-today">
                            (for today)
                          </span>
                        </p>
                      </div>
                    ) : (
                      hotel.staahPropertyPrice !== 297 && (
                        <div className="right-side-box">
                          <p className="text-xs text-gray-600 price-show f-new-10 text-end">
                            Starting from
                          </p>
                          <p className="font-semibold text-lg price-show mb-0">
                            INR {hotel.staahPropertyPrice || "N/A"}
                            <small className="f-new-10">/Night</small>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
