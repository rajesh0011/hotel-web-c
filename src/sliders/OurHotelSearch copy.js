"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import * as ReactDOM from "react-dom";

export default function OurHotelSearch({onClick}) {
  const [showFullText, setShowFullText] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandMap, setBrandMap] = useState({});
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [cityNameShow, setCityNameShow] = useState(false);
  const [popupBackButton, setPopupBackButton] = useState(false);
  const filterBarRef = useRef(null);

  
  const [isOpen, setOpen] = useState(false);
  const [propertyPageUrl, setPropertyPageUrl] = useState("");
  const [cityDetails, setCityDetails] = useState(null);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
  const [isFilterBarWithPropertyId, openFilterBarWithPropertyId] =
    useState(false);

  const [cityDropDown, setCityDropDown] = useState([]);

  // Fetch Brand Slugs
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`)
      .then((res) => res.json())
      .then((data) => {
        if (data.errorCode === "0") {
          const map = {};
          data.data.forEach((brand) => {
            map[brand.hotelBrandId] = brand.hotelBrand
              .toLowerCase()
              .replace(/\s+/g, "-");
          });
          setBrandMap(map);
        }
      })
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  // Fetch City & Property Types
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityAndPropertyTypeList`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.errorCode === "0") {
          const [response] = data.data;
          setCityList(response.cityList || []);
          setPropertyTypeList(response.propertyTypeData || []);
        }
      })
      .catch((error) =>
        console.error("Error fetching city/property types:", error)
      );
  }, []);

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        if (selectedCityId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty?CityId=${selectedCityId}`
          );
          const data = await response.json();
          if (data.errorCode === "0") {
            const hotelList = data.data[0]?.propertyData || [];
            setHotels(
              hotelList.sort((a, b) =>
                a.propertyName.localeCompare(b.propertyName)
              )
            );
            setVisibleCount(4);
          } else {
            setHotels([]);
          }
        } else {
          setHotels([]);
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setHotels([]);
      }
      setLoading(false);
    };

    if (cityList.length > 0) {
      fetchHotels();
    }
  }, [selectedCityId, cityList]);

  // Fetch city list for dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityList`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();

        const cityDropDown = [];

        res?.data?.forEach((property) => {
          const label = property.cityName;
          const value = property.cityId;
          cityDropDown.push({ label, value });
        });

        setCityDropDown(cityDropDown);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter hotels by category
  const filteredHotels = hotels.filter((hotel) => {
    if (!selectedCategory) return true;
    return hotel.propertyTypeId?.toString() === selectedCategory;
  });

  // Sort filtered hotels alphabetically
  const sortedFilteredHotels = [...filteredHotels].sort((a, b) =>
    a.propertyName.localeCompare(b.propertyName)
  );

  const handleBookNow = (prop, hotel) => {
      setShowFilterBar(prop);
      setOpen(!isOpen);
      const label = hotel?.cityName;
      const value = hotel?.cityId;
      const property_Id = hotel?.staahPropertyId;
      setCityDetails({ label, value, property_Id });
      setStaahPropertyId(hotel?.staahPropertyId);
      openFilterBarWithPropertyId(!isFilterBarWithPropertyId);
      onClick();
  };


  const router = useRouter();

  const SkeletonCard = () => (
    <div className="col-md-4 mb-4">
      <div className="winter-box hotel-box no-image-bg animate-pulse">
        <div className="bg-gray-300 w-100" style={{ height: "220px" }} />
        <div className="winter-box-content pt-2">
          <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-full mb-1 rounded"></div>
          <div className="bg-gray-200 h-4 w-5/6 mb-2 rounded"></div>
          <div className="d-flex justify-content-between">
            <div className="bg-gray-300 h-6 w-24 rounded"></div>
            <div className="bg-gray-300 h-6 w-24 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>

      <section className="position-relative" ref={filterBarRef}>
            <div className="position-absolute top-100 start-0 w-100 bg-white shadow" >
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
                {/* )} */}
              </div>
              </section>


      <div className="winter-sec main-hotel-page-filter">
        <div className="d-flex justify-content-center sticky-top pb-3">
          <div className="col-md-1 pt-3 text-left">
             {/* Back Button */}
              {popupBackButton && (
                <button
                  onClick={() => {
                    setPopupBackButton(false);
                    setCityNameShow(false);
                    setCityInput(""); // reset input
                    setSelectedCityId("");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-black hover:text-black"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700 text-black" />
                  <span>Back</span>
                </button>
              )}
          </div>
          <div className="relative col-md-6">
            <div className="hotel-filter-box-data">
              {/* Search Input */}
              <input
                type="text"
                className="search-input-hotel w-full"
                placeholder="Search City..."
                value={cityInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setCityInput(val);

                  if (val.trim() === "") {
                    setPopupBackButton(false);
                    setCityNameShow(false);
                    setSelectedCityId("");
                    return;
                  }

                  setCityNameShow(false);
                  const match = cityList.find(
                    (c) => c.cityName.toLowerCase() === val.toLowerCase()
                  );
                  setSelectedCityId(match ? match.cityId.toString() : "");
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  setIsInputFocused(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowDropdown(false);
                    setIsInputFocused(false);
                  }, 150);
                }}
                autoComplete="off"
              />

              {/* ✅ Dropdown List */}
              {showDropdown && (
                <div className="hotel-filter-dropdownn bg-white border rounded-md shadow-md max-h-60 overflow-y-auto z-10">
                  {(cityInput.trim() === ""
                    ? [...cityList].sort((a, b) =>
                        a.cityName.localeCompare(b.cityName)
                      )
                    : cityList
                        .filter((city) =>
                          city.cityName
                            .toLowerCase()
                            .includes(cityInput.toLowerCase())
                        )
                        .sort((a, b) => a.cityName.localeCompare(b.cityName))
                  ).map((city) => (
                    <div
                      key={city.cityId}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setCityNameShow(true);
                        setPopupBackButton(true); // ✅ show Back on search selection
                        setCityInput(city.cityName);
                        setSelectedCityId(city.cityId.toString());
                        setShowDropdown(false);
                      }}
                    >
                      {city.cityName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Show Hotels if city selected */}
        {cityNameShow ? (
          <div className="roomacomo hotellist new-hotel-lists corporate-dine-events">
            <div className="row">
              {loading ? (
                Array.from({ length: 0 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : sortedFilteredHotels.length > 0 ? (
                sortedFilteredHotels.slice(0, visibleCount).map((hotel, index) => {
                  const brandSlug = brandMap[hotel.hotelBrandId] || "brand";
                  const propertySlug = hotel.propertySlug || "property";
                  const url = `/${brandSlug}/${propertySlug}/hotel-overview`;
                  return (
                    <div key={hotel.propertyId || index} className="col-md-4 mb-2 popup-card">
                      <div className="winter-box hotel-box no-image-bg">
                        <Image
                          src={
                            hotel?.images?.[0]?.propertyImage ||
                            "/images/placeholder.png"
                          }
                          alt={hotel.propertyName}
                          className="w-100"
                          width={350}
                          height={200}
                          quality={100}
                        />
                        <div className="winter-box-content shadow-sm pt-1 text-start">
                          <Link
                            href={`/${brandSlug}/${propertySlug}/hotel-overview`}
                            className={`winter-box-heading text-start ${
                              hotel.propertyId === 263 ? "special-style-aotel" : ""
                            }`}
                          >
                            {hotel.propertyName}
                          </Link>

                          <p className="display-block mt-2">
                            {hotel.description.length > 100 ? (
                              <>
                                {showFullText
                                  ? hotel.description
                                  : hotel.description.slice(0, 100) + "..."}
                                <span
                                  onClick={() => setShowFullText(!showFullText)}
                                  style={{
                                    cursor: "pointer",
                                    color: "#000",
                                    fontWeight: "600",
                                  }}
                                >
                                  {showFullText ? " ❮❮" : " ❯❯"}
                                </span>
                              </>
                            ) : (
                              hotel.description
                            )}
                          </p>

                          <div className="hotel-slider-box-content">
                            <div className="hotel-box-content">
                              {/* Price Section */}
                              {!hotel.staahPropertyPrice ||
                              hotel.staahPropertyPrice === 0 ? (
                                <p className="font-semibold text-lg text-red-600 text-start sold-out-text mt-0 mb-0">
                                  Sold Out
                                  <span className="small-text-for-today">
                                    (for today)
                                  </span>
                                </p>
                              ) : (
                                hotel.staahPropertyPrice !== 297 && (
                                  <>
                                    <p className="text-xs text-gray-600 price-show mb-0 f-new-10 text-start">
                                      Starting from
                                    </p>
                                    <p className="font-semibold text-lg price-show">
                                      INR {hotel.staahPropertyPrice}
                                      <small className="f-new-10">/Night</small>
                                    </p>
                                  </>
                                )
                              )}
                            </div>

                            <div className="winter-box-btn d-flex flex-column gap-0">
                              {/* Visit Hotel Button */}
                              <Link
                                href={`/${brandSlug}/${propertySlug}/hotel-overview`}
                                className="explore-more-btn mt-0 mb-1"
                              >
                                Visit Hotel
                              </Link>

                              {/* Book Now Button */}
                              {!hotel.staahPropertyPrice ||
                              hotel.staahPropertyPrice === 0 ? (
                                <button
                                  className="box-btn book-now me-0 mt-0"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBookNow(!showFilterBar, hotel, url);
                                  }}
                                >
                                  Book Now
                                </button>
                              ) : hotel.staahPropertyPrice === 297 ? (
                                <button
                                  className="box-btn book-now me-0 mt-0"
                                  disabled
                                >
                                  Not Available
                                </button>
                              ) : (
                                <Link
                                  href="#"
                                  className="box-btn book-now me-0 mt-0"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBookNow(!showFilterBar, hotel, url);
                                  }}
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
                <div className="text-center text-gray-500 mt-10">
                  No hotels available for this city.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ✅ City List */
          <div className="row">
            {cityDropDown.map((col, idx) => (
              <div className="col-md-3" key={idx}>
                <ul className="list-unstyled">
                  <li key={idx} className="mb-2">
                    <button
                      onClick={() => {
                        setPopupBackButton(true);
                        setCityNameShow(true);
                        setCityInput(col.label);
                        setSelectedCityId(col.value.toString());
                        setShowDropdown(false);
                      }}
                      className="text-decoration-none text-primary text-dark"
                    >
                      {col.label}
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
