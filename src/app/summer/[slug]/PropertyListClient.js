"use client";

import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as ReactDOM from "react-dom";
export default function PropertyListClient({ properties }) {
  const [expandedText, setExpandedText] = useState({});

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);
  const toggleText = (id) => {
    setExpandedText((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  function handleViewRates(hotel) {
    setOpen(!isOpen);
    setPropertyId(hotel.staahPropertyId);
    //setCityDetails(property);
    const label = hotel.cityName;
    const value = hotel.cityId;
    const property_Id = hotel.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    openFilterBar(!isOpenFilterBar);
    setShowFilterBar(!showFilterBar);
  }
    const handleBookNow = (propertyId, cityName, cityId) => {
    // alert("propertyID: " + propertyId);
    // alert("cityName: " + cityName);
    // alert("cityId: " + cityId);
    const label = cityName;
    const value = cityId;
    const property_Id = propertyId;
    setCityDetails({ label, value, property_Id });
    setShowFilterBar(!showFilterBar);
    setPropertyId(propertyId);
  };
  
  
  const handleBookNowClick = async () => {
    setOpen(!isOpen);
    openFilterBar(!isOpenFilterBar);
  };
  return (
    <>
      {/* <Header onSubmit={handleBookNowClick} /> */}
      <div className="roomacomo hotellist new-hotel-lists">
        {showFilterBar && ReactDOM.createPortal(
          <BookingEngineProvider>
            <FilterBar
              selectedProperty={parseInt(cityDetails?.property_Id)}
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
        
        <div className="row">
          {properties.length > 0 ? (
            properties.map((hotel) => {
              const brandSlug = hotel.brandSlug || "brand";
              const propertySlug = hotel.propertySlug || "property";
              const isExpanded = expandedText[hotel.propertyId];

              return (
                <div className="col-md-6 mb-1" key={hotel.propertyId}>
                  <div className="winter-box hotel-box no-image-bg">
                    <Image
                      src={hotel.images?.[0]?.propertyImage || "/no_image1.jpg"}
                      className="card-img-top w-100"
                      alt={hotel.propertyName}
                      height={200}
                      width={500}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="winter-box-content shadow-sm pt-1 text-start">
                      <Link href={`/${brandSlug}/${propertySlug}/hotel-overview`} className="text-decoration-none winter-box-heading text-start">
                        {hotel.propertyName}
                      </Link>
                      <p className="display-block mt-2 mb-1">
                        {hotel.description.length > 100 ? (
                          <>
                            {isExpanded
                              ? hotel.description
                              : hotel.description.slice(0, 100) + "..."}
                            <span
                              onClick={() => toggleText(hotel.propertyId)}
                              style={{
                                cursor: "pointer",
                                color: "#000",
                                fontWeight: "600",
                              }}
                            >
                              {isExpanded ? " ❮❮" : " ❯❯"}
                            </span>
                          </>
                        ) : (
                          hotel.description
                        )}
                      </p>

                      <div className="hotel-slider-box-content">
  <div className="hotel-box-content">
    {/* Price Section */}
    {!hotel.staahPropertyPrice || hotel.staahPropertyPrice === 0 ? (
      // Case 1: Price missing or 0 → Sold Out
      <p className="font-semibold text-lg text-red-600 text-start sold-out-text mt-0 mb-0">
        Sold Out <span className="small-text-for-today">(for today)</span>
      </p>
    ) : hotel.staahPropertyPrice === 297 ? (
      // Case 2: Price = 297 → Don't show any price
      null
    ) : (
      // Case 3: Normal price (not 0, not 297)
      <>
        <p className="text-xs text-gray-600 price-show f-new-10 text-start">
          Starting from
        </p>
        <p className="font-semibold text-lg price-show">
          INR {hotel.staahPropertyPrice}
          <small className="f-new-10">/Night</small>
        </p>
      </>
    )}
  </div>

  <div className="winter-box-btn d-flex flex-column gap-2">
    {/* Visit Hotel Button */}
    <Link
      href={`/${brandSlug}/${propertySlug}/hotel-overview`}
      className="explore-more-btn mt-0"
    >
      Visit Hotel
    </Link>

    {/* Book Now Button */}
    {!hotel.staahPropertyPrice || hotel.staahPropertyPrice === 0 ? (
      // Case 1: Not bookable
      <button className="box-btn book-now me-0"
     onClick={() =>
                                handleBookNow(
                                  hotel?.staahPropertyId,
                                  hotel?.cityName,
                                  hotel?.cityId
                                )
                              }
        >
       Book Now
      </button>
    ) : hotel.staahPropertyPrice === 297 ? (
      // Case 2: Price = 297 → Not available
      <button className="box-btn book-now me-0" disabled>
        Not Available
      </button>
    ) : (
      // Case 3: Bookable
      <Link
        href="#"
        className="box-btn book-now me-0 mt-0"
        onClick={() =>
                                handleBookNow(
                                  hotel?.staahPropertyId,
                                  hotel?.cityName,
                                  hotel?.cityId
                                )
                              }
      >
        Book Now
      </Link>
    )}
  </div>
</div>



                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted">
              No properties found for this category.
            </p>
          )}
        </div>
      </div>

      <div className="text-center mt-3">
        <Link href="/hotels" className="btn btn-primary text-white">
          Explore more destinations
        </Link>
      </div>
    </>
  );
}
