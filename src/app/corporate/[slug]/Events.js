"use client";
import React, { useState, useEffect,useRef } from "react";
import Image from "next/image";
import * as ReactDOM from "react-dom";
import Header from "@/components/Header";
import EventsBookingFormModal from "@/components/EventsBookingFormModal";
import FooterPage from "@/components/Footer";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { getUserInfo } from "../../../utilities/userInfo";

export default function EventsPage({ cities }) {
  const [selectedCityId, setSelectedCityId] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [modalContent, setModalContent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
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
  const handleKnowMore = (venue) => {
    setModalContent({
      title: venue.venueName || "No title available.",
      description: venue.venueDesc || "No description available.",
    });
    setIsModalOpen(true);
  };

  const openBookingModal = (venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedVenue(null);
  };

  // 🔹 Set default city/property
  useEffect(() => {
    if (cities.length > 0) {
      const defaultCity = cities[0];
      const defaultProperty = defaultCity.propertyData?.[0];
      setSelectedCityId(defaultCity.cityId.toString());
      setCitySearch(defaultCity.cityName);
      setFilteredProperties(defaultCity.propertyData || []);
      if (defaultProperty) {
        setSelectedPropertyId(defaultProperty.propertyId.toString());
      }
    }
  }, [cities]);

  // 🔹 Fetch venue data whenever property changes
  useEffect(() => {
    if (selectedPropertyId) {
      fetch(
        `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/Venue/GetVenueByProperty?propertyId=${selectedPropertyId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.errorCode === "0") {
            setVenueData(data.data?.[0]?.roomsInfo || []);
          } else {
            setVenueData([]);
          }
        });
    }
  }, [selectedPropertyId]);

  // 🔹 Update property list when city changes
  useEffect(() => {
    if (selectedCityId) {
      const city = cities.find((c) => c.cityId.toString() === selectedCityId);
      const properties = city?.propertyData || [];
      setFilteredProperties(properties);
      // Auto-select first property
      const firstProperty = properties[0];
      if (firstProperty) {
        setSelectedPropertyId(firstProperty.propertyId.toString());
      } else {
        setSelectedPropertyId("");
        setVenueData([]);
      }
    }
  }, [selectedCityId]);

  const handleBookNowClick = async () => {
    
    if(isOpen){
      postBookingWidged("","", true,"Widget Closed");
    }else{
      postBookingWidged("","", false,"Widget Open");
    }
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      const firstInput = filterBarRef.current.querySelector(
        "input, select, button"
      );
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
              <Header onSubmit={handleBookNowClick} onClick={handleBookNowClick2} />
      <section className="position-relative banner-section h-60vh-important">
        <div className="w-100 overflow-hidden rounded-0 mtspace5">
          <video
            className="w-100 h-55vh-important object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/img/banner-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        {isOpenFilterBar && ReactDOM.createPortal(
                                <BookingEngineProvider>
                                <FilterBar
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
      </section>

      <section className="cor-dining-event-mice">
        <div className="container">
          {/* Heading */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-10">
              <div className="global-heading-sec text-center">
                <div className="row justify-content-center mb-4">
                  <div className="col-md-12">
                    <h2 className="global-heading">Events</h2>
                    {/* <p className="mb-2">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City + Property Select */}
          <div className="winter-sec">
            <div className="row">
                {/* Searchable City */}
                <div className="relative col-md-6">
                  <label className="form-label">Select City</label>
                  <input
                    list="cityOptions"
                    className="form-control search-input-hotel rounded-0"
                    placeholder="Search City..."
                    value={citySearch}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      const selected = cities.find(
                        (c) =>
                          c.cityName.toLowerCase() ===
                          e.target.value.toLowerCase()
                      );
                      if (selected) {
                        setSelectedCityId(selected.cityId.toString());
                      }
                    }}
                  />
                  <datalist id="cityOptions">
                    {cities.map((city) => (
                      <option
                        key={city.cityId}
                        value={city.cityName}
                      />
                    ))}
                  </datalist>
                </div>

                {/* Property Dropdown */}
                <div className="relative col-md-6">
                  {filteredProperties.length > 0 && (
                    <div className="mb-4">
                      <label className="form-label">Select Property</label>
                      <select
                        className="form-select search-input-hotel rounded-0"
                        value={selectedPropertyId}
                        onChange={(e) => setSelectedPropertyId(e.target.value)}
                      >
                        <option value="" disabled>
                          -- Select Property --
                        </option>
                        {filteredProperties.map((prop) => (
                          <option
                            key={prop.propertyId}
                            value={prop.propertyId}
                          >
                            {prop.propertyName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
            </div>
          </div>

          {/* Venue List */}
          <div className="roomacomo hotellist new-hotel-lists">
            {venueData.length > 0 ? (
              <div className="row">
                {venueData.map((venue) => (
                  <div className="col-md-6" key={venue.propertyVenueId}>
                    <div className="winter-box hotel-box no-image-bg">
                      {venue.venuesImages?.[0]?.images && (
                        <Image
                          src={venue.venuesImages[0].images}
                          alt={venue.venueName}
                          className="card-img-top"
                          width={600}
                          height={400}
                          style={{ objectFit: "cover", height: "250px" }}
                        />
                      )}
                      <div className="winter-box-content shadow-sm pt-1 text-start">
                        <h5 className="winter-box-heading text-start">
                          {venue.venueName}
                        </h5>
                        <p className="display-block mt-2 two-line-text">
                          <span>{venue.venueDesc}</span>
                        </p>
                        <div className="hotel-slider-box-content">
                          <div className="winter-box-btn">
                            <button
                              className="box-btn know-more me-2"
                              onClick={() => handleKnowMore(venue)}
                            >
                              Know More
                            </button>
                            <button
                              className="box-btn book-now me-0"
                              onClick={() => openBookingModal(venue)}
                            >
                              Book Venue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">
                No event venues found for this property.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <EventsBookingFormModal
        show={showBookingModal}
        venue={selectedVenue}
        onClose={closeBookingModal}
        propertyId={selectedPropertyId}
        propertyName={
          filteredProperties.find(
            (p) => p.propertyId.toString() === selectedPropertyId
          )?.propertyName || ""
        }
        cityId={selectedCityId}
        cityName={
          cities.find((c) => c.cityId.toString() === selectedCityId)?.cityName ||
          ""
        }
      />

      {/* Know More Modal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            className="modal fade show new-type-popup"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            tabIndex="-1"
            aria-labelledby="offerModalLabel"
            aria-hidden="false"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h6 className="modal-title" id="offerModalLabel">
                    {modalContent.title}
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  >
                    x
                  </button>
                  <p>{modalContent.description}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style jsx>{`
        .new-type-popup {
          backdrop-filter: blur(10px);
        }
        .new-type-popup.btn-close {
          background: 000;
          border: none;
          color: white;
          font-size: 1.5rem;
          color: #fff;
          height: 30px;
          width: 30px;
          border-radius: 0%;
          position: absolute;
          top: 10px !important;
          opacity: 1;
          right: 10px !important;
          cursor: pointer;
        }
      `}</style>
      <FooterPage />
    </>
  );
}
