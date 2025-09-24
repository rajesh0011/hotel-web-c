"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hotelpageslider({ onSubmit }) {
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
          const allHotels = [];
          await Promise.all(
            cityList.map(async (city) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty?CityId=${city.cityId}`
              );
              const cityData = await res.json();
              if (
                cityData.errorCode === "0" &&
                cityData.data?.[0]?.propertyData
              ) {
                allHotels.push(...cityData.data[0].propertyData);
              }
            })
          );
          setHotels(
            allHotels.sort((a, b) =>
              a.propertyName.localeCompare(b.propertyName)
            )
          );
          setVisibleCount(4);
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

  // Filter hotels by category
  const filteredHotels = hotels.filter((hotel) => {
    if (!selectedCategory) return true;
    return hotel.propertyTypeId?.toString() === selectedCategory;
  });

  // Sort filtered hotels alphabetically
  const sortedFilteredHotels = [...filteredHotels].sort((a, b) =>
    a.propertyName.localeCompare(b.propertyName)
  );

  const handleBookNow = (prop, hotel, url) => {
    setShowFilterBar(prop);
    onSubmit(hotel, url);
  };

  const SkeletonCard = () => (
    <div className="col-md-6 mb-4">
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
      <div className="winter-sec main-hotel-page-filter">
          <div className="row justify-content-center">
            <div className="relative col-md-8">
              <div className="hotel-filter-box-data">
                <input
                  type="text"
                  className="search-input-hotel w-full"
                  placeholder="Search City..."
                  value={cityInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCityInput(val);
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

          <div className="roomacomo hotellist new-hotel-lists corporate-dine-events">
            {loading && hotels.length === 0 && (
              <div className="text-center text-gray-500 mb-4">
                Loading data...
              </div>
            )}
            <div className="row">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : sortedFilteredHotels
                    .slice(0, visibleCount)
                    .map((hotel, index) => {
                      const brandSlug = brandMap[hotel.hotelBrandId] || "brand";
                      const propertySlug = hotel.propertySlug || "property";
                      const url = `/${brandSlug}/${propertySlug}/hotel-overview`;
                      return (
                        <div
                          key={hotel.propertyId || index}
                          className="col-md-6 mb-4"
                        >
                          <div className="winter-box hotel-box no-image-bg">
                            <Image
                              src={
                                hotel?.images?.[0]?.propertyImage ||
                                "/images/placeholder.png"
                              }
                              alt={hotel.propertyName}
                              className="w-100"
                              width={350}
                              height={220}
                              quality={75}
                            />
                            <div className="winter-box-content shadow-sm pt-1 text-start">
                              <Link
                                href={`/${brandSlug}/${propertySlug}/hotel-overview`}
                                className={`winter-box-heading text-start ${
    hotel.propertyId === 263 ? "special-style-aotel" : ""}`}
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
                                      onClick={() =>
                                        setShowFullText(!showFullText)
                                      }
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

                              {/* <div className="hotel-slider-box-content">
                                <div className="hotel-box-content">
                                  <p className="text-xs text-gray-600 price-show f-new-10 text-start">
                                    Starting from
                                  </p>
                                  <p className="font-semibold text-lg price-show">
                                    INR {hotel.staahPropertyPrice || "N/A"}
                                    <small className="f-new-10">/Night</small>
                                  </p>
                                </div>
                                <div className="winter-box-btn">
                                  <Link
                                    href={`/${brandSlug}/${propertySlug}/hotel-overview`}
                                    className="explore-more-btn mt-0"
                                  >
                                    Visit Hotel
                                  </Link>
                                  <Link
                                    href="#"
                                    className="box-btn book-now me-0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleBookNow(!showFilterBar, hotel, url);
                                    }}
                                  >
                                    Book Now
                                  </Link>
                                </div>
                              </div> */}

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
                                        <p className="text-xs text-gray-600 price-show f-new-10 text-start">
                                          Starting from
                                        </p>
                                        <p className="font-semibold text-lg price-show">
                                          INR {hotel.staahPropertyPrice}
                                          <small className="f-new-10">
                                            /Night
                                          </small>
                                        </p>
                                      </>
                                    )
                                  )}
                                </div>

                                <div className="winter-box-btn d-flex flex-column gap-2">
                                  {/* Visit Hotel Button - now on top */}
                                  <Link
                                    href={`/${brandSlug}/${propertySlug}/hotel-overview`}
                                    className="explore-more-btn mt-0"
                                  >
                                    Visit Hotel
                                  </Link>

                                  {/* Book Now Button - now below */}
                                  {!hotel.staahPropertyPrice ||
                                  hotel.staahPropertyPrice === 0 ? (
                                    <button
                                      className="box-btn book-now me-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleBookNow(
                                          !showFilterBar,
                                          hotel,
                                          url
                                        );
                                      }}
                                    >
                                      Book Now
                                    </button>
                                  ) : hotel.staahPropertyPrice === 297 ? (
                                    <button
                                      className="box-btn book-now me-0"
                                      disabled
                                    >
                                      Not Available
                                    </button>
                                  ) : (
                                    <Link
                                      href="#"
                                      className="box-btn book-now me-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleBookNow(
                                          !showFilterBar,
                                          hotel,
                                          url
                                        );
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
                    })}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                No hotels available for this filter.
              </div>
            )}

            {filteredHotels.length > 4 && (
              <div className="text-center mt-1">
                {visibleCount < filteredHotels.length ? (
                  <button
                    className="explore-more-btn pro-view-morre"
                    onClick={() => setVisibleCount(filteredHotels.length)}
                  >
                    Show More
                  </button>
                ) : (
                  <button
                    className="explore-more-btn pro-view-morre"
                    onClick={() => setVisibleCount(4)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
      </div>
    </>
  );
}
