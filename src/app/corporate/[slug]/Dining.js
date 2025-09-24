"use client";
import React, { useState, useEffect ,useRef} from "react";
import Image from "next/image";
import * as ReactDOM from "react-dom";
import Header from "@/components/Header";
import BookingFormModal from "@/components/BookingFormModal";
import FooterPage from "@/components/Footer";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import { getUserInfo } from "../../../utilities/userInfo";

export default function DiningPage({ cities }) {
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [diningData, setDiningData] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [modalContent, setModalContent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
   const filterBarRef = useRef(null);
   const [showFilterBar, setShowFilterBar] = useState(false);
   const [isOpenFilterBar, openFilterBar] = useState(false);
   const [isOpen, setOpen] = useState(false);
   const [cityDetails, setCityDetails] = useState(null);

  // 🔹 For typing search in city
  const [citySearch, setCitySearch] = useState("");

   
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
  const openBookingModal = (venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
  };
const handleFormSubmit = (formData) => {
  console.log("Form submitted:", formData);
};
  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedVenue(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKnowMore = (detail) => {
    setModalContent({
      title: detail.dineName || "No title available.",
      description: detail.dineDesc || "No description available.",
    });
    setIsModalOpen(true);
  };

  // 🔹 Set default city and property on first render
  useEffect(() => {
    if (cities.length > 0) {
      const defaultCity = cities[0];
      const defaultProperty = defaultCity.propertyData?.[0];
      setSelectedCityId(defaultCity.cityId.toString());
      setFilteredProperties(defaultCity.propertyData || []);
      if (defaultProperty) {
        setSelectedPropertyId(defaultProperty.propertyId.toString());
      }
    }
  }, [cities]);

  // 🔹 Fetch dining data whenever a valid property is selected
  useEffect(() => {
    if (selectedPropertyId) {
      fetch(
        `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/dine/GetDineByProperty?propertyId=${selectedPropertyId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.errorCode === "0") {
            setDiningData(data.data || []);
          } else {
            setDiningData([]);
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

      const firstProperty = properties[0];
      if (firstProperty) {
        setSelectedPropertyId(firstProperty.propertyId.toString());
      } else {
        setSelectedPropertyId("");
        setDiningData([]);
      }
    }
  }, [selectedCityId]);

  // 🔹 Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(citySearch.toLowerCase())
  );

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
          <Header onSubmit={handleBookNowClick}  onClick={handleBookNowClick2}/>
          
               {/* <section className="position-relative  banner-section" ref={filterBarRef}>
                 <div className="position-absolute top-100 start-0 w-100 bg-white shadow" >
                             
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
                  </div>
                  </section> */}
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
          {/* --- Heading --- */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-9 md-offset-1">
              <div className="global-heading-sec text-center">
                <h2 className="global-heading">Dining</h2>
                {/* <p className="mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry...
                </p> */}
              </div>
            </div>
          </div>

          {/* --- City & Property Selectors --- */}
          <div className="winter-sec">
            <div className="row">
             {/* 🔹 City Search with datalist */}
<div className="col-md-6">
  <label className="form-label">Select City</label>
  <input
    list="city-options"
    className="form-control search-input-hotel rounded-0"
    value={citySearch}
    onChange={(e) => {
      const value = e.target.value;
      setCitySearch(value);

      // if input matches any city (even partially from datalist selection), update selectedCityId
      const matchedCity = cities.find(
        (c) => c.cityName.toLowerCase() === value.toLowerCase()
      );
      if (matchedCity) {
        setSelectedCityId(matchedCity.cityId.toString());
      }
    }}
    placeholder="Type to search city..."
  />
  <datalist id="city-options">
    {filteredCities.map((city) => (
      <option
        key={city.cityId}
        value={city.cityName}
        onClick={() => {
          setSelectedCityId(city.cityId.toString());
          setCitySearch(city.cityName); // sync back to input
        }}
      />
    ))}
  </datalist>
</div>


              {/* 🔹 Property dropdown (normal select) */}
              <div className="col-md-6">
                {filteredProperties.length > 0 && (
                  <div>
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
                        <option key={prop.propertyId} value={prop.propertyId}>
                          {prop.propertyName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Dining Cards --- */}
          <div className="roomacomo hotellist new-hotel-lists corporate-dine-events">
            {diningData.length > 0 ? (
              <div className="row">
                {diningData.map((venue) =>
                  venue.dineDetails.map((detail) => (
                    <div className="col-md-6" key={detail.propertyDineId}>
                      <div className="winter-box hotel-box no-image-bg">
                        {detail.dineImages?.[0]?.dineImage && (
                          <Image
                            src={detail.dineImages[0].dineImage}
                            alt={detail.dineName}
                            className="card-img-top"
                            width={600}
                            height={400}
                            style={{ objectFit: "cover", height: "250px" }}
                          />
                        )}
                        <div className="winter-box-content shadow-sm pt-1 text-start">
                          <h5 className="winter-box-heading text-start">
                            {detail.dineName}
                          </h5>
                          <p className="display-block mt-2 two-line-text">
                            <span>{detail.dineDesc}</span>
                          </p>
                          <div className="hotel-slider-box-content">
                            <div className="winter-box-btn">
                              <button
                                className="box-btn know-more me-2"
                                onClick={() => handleKnowMore(detail)}
                              >
                                Know More
                              </button>
                              <button
                                className="box-btn book-now me-0"
                                onClick={() => openBookingModal(detail)}
                              >
                                Book a Table
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-muted">
                No dining venues found for this property.
              </p>
            )}
          </div>
        </div>
      </section>

      <BookingFormModal
  show={showBookingModal}
  venue={selectedVenue}
  onClose={() => closeBookingModal(false)}
  selectedPropertyId={selectedPropertyId}
  selectedCityId={selectedCityId}
  // 🔹 Add these props
  propertyId={selectedPropertyId}
  propertyName={
    filteredProperties.find((p) => p.propertyId.toString() === selectedPropertyId)
      ?.propertyName || ""
  }
  cityId={selectedCityId}
  cityName={
    cities.find((c) => c.cityId.toString() === selectedCityId)?.cityName || ""
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
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h6 className="modal-title">{modalContent.title}</h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
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
            <style jsx>
                {`
                      .new-type-popup {
                        backdrop-filter: blur(10px);
                      }
                      .new-type-popup.btn-close {
                        background: 000;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        color:#fff;
                        height: 30px;
                        width: 30px;
                        border-radius: 0%;
                        position: absolute;
                        top: 10px!important;
                        opacity:1;
                        right: 10px!important;
                        cursor: pointer;
                      }
                    `}
            </style>

            <FooterPage />

        </>
    );
}
