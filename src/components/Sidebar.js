"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as ReactDOM from "react-dom";
import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
import FilterBar from "@/app/cin_booking_engine/Filterbar";
import OurHotelSearch from "@/sliders/OurHotelSearch";
import { X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hotels Popup
  const [hotelPopupOpen, setHotelPopupOpen] = useState(false);
  const [cityWithHotels, setCityWithHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpenItem, setOpenItem] = useState(false);
  const [propertyPageUrl, setPropertyPageUrl] = useState("");
  const [cityDetails, setCityDetails] = useState(null);
  const [staahPropertyId, setStaahPropertyId] = useState(null);
  const [isFilterBarWithPropertyId, openFilterBarWithPropertyId] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);

  // NEW: brand slug lookups
  const [brandSlugById, setBrandSlugById] = useState({});
  const [brandSlugByName, setBrandSlugByName] = useState({});
  const [ourHotelPopup, setOurHotelPopup] = useState(false);
  

  const filterBarRef = useRef(null);
  // Sidebar open/close
  const toggleSidebar = () => setOpen((o) => !o);
  const closeSidebar = () => setOpen(false);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch BRAND LIST once (build maps by id and name)
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`);
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];

        const byId = {};
        const byName = {};
        for (const b of list) {
          if (b?.hotelBrandId != null && b?.brandSlug) byId[b.hotelBrandId] = b.brandSlug;
          if (b?.hotelBrand && b?.brandSlug) byName[b.hotelBrand.toLowerCase()] = b.brandSlug;
        }
        setBrandSlugById(byId);
        setBrandSlugByName(byName);
      } catch (e) {
        console.error("Brand list fetch error:", e);
      }
    };
    fetchBrands();
  }, []);

  // Fetch City+Hotel data
  useEffect(() => {
    if (!hotelPopupOpen) return;
    
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty`)
      .then((res) => res.json())
      .then((data) => {
        setCityWithHotels(data.data || []);
      })
      .catch((err) => console.error("Hotels fetch error:", err))
      .finally(() => setLoading(false));

      const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setOurHotelPopup(false);
      }
      setOurHotelPopup(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [hotelPopupOpen]);

  

  // Filter hotels by search
  const filteredCities = cityWithHotels
    .map((city) => ({
      ...city,
      propertyData: (city.propertyData || []).filter((hotel) =>
        (hotel?.propertyName || "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((city) => (city.propertyData || []).length > 0);

  const handleBookNow = (prop, hotel) => {
    setShowFilterBar(prop);
    setOpenItem(!isOpenItem);
    const label = hotel?.cityName;
    const value = hotel?.cityId;
    const property_Id = hotel?.staahPropertyId;
    setCityDetails({ label, value, property_Id });
    setStaahPropertyId(hotel?.staahPropertyId);
    openFilterBarWithPropertyId(!isFilterBarWithPropertyId);
  };
  const popupRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // helper: fallback slugify (used only if propertySlug missing)
  const slugify = (str = "") =>
    str
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <>
      <section className="position-relative" ref={filterBarRef}>
        <div className="position-absolute top-100 start-0 w-100 bg-white shadow">
          {isFilterBarWithPropertyId &&
            ReactDOM.createPortal(
              <section className="filter-bar-hotels-cin">
                <BookingEngineProvider>
                  <FilterBar
                    selectedProperty={parseInt(staahPropertyId)}
                    cityDetails={cityDetails}
                    openBookingBar={isFilterBarWithPropertyId}
                    onClose={() => {
                      openFilterBarWithPropertyId(false);
                      setOpenItem(false);
                    }}
                  />
                </BookingEngineProvider>
              </section>,
              document.body
            )}
        </div>
      </section>

      {/* Mobile Sidebar Toggler */}
      <button className="clarks-sidebar-toggler" onClick={toggleSidebar}>
        <span />
        <span />
        <span />
      </button>

      {open && <div className="clarks-sidebar-overlay" onClick={closeSidebar}></div>}

      <div className={clsx("clarks-sidebar", { open, "clarks-sidebar-scrolled": isScrolled })}>
        <div className="clarks-sidebar-header">
          <button onClick={closeSidebar} className="clarks-sidebar-close" aria-label="Close">
            ✕
          </button>
        </div>

        <ul className="clarks-sidebar-menu">
         <li className="our-hotel-tab-for-mobile-inner">
            <button
              ref={toggleBtnRef}
                    onClick={(e) => {
                      e.preventDefault();
                      setOurHotelPopup((prev) => !prev);
                      closeSidebar();
                    }}
              className="w-full text-left"
            >
              Our Hotels
            </button>
            {ourHotelPopup &&
              ReactDOM.createPortal(
                <div
                  ref={popupRef}
                  className="our-hotels-popup-for-data dropdown-menu show p-3 pt-0"
                  style={{ maxHeight: "85vh", overflowY: "auto" }}
                >
                  <OurHotelSearch />
                  <button className="closebtnfor-our-hotel-popup"
                        onClick={() => setOurHotelPopup(false)}
                        ><X /></button>
                </div>,
                document.body
              )}
          </li>

           <li className="our-hotel-tab-for-desktop-inner">
            <button
              onClick={() => {
                setHotelPopupOpen(true);
                closeSidebar();
              }}
              className="w-full text-left"
            >
              Our Hotels
            </button>
          </li>

          <li>
            <Link href="/ourbrands" onClick={closeSidebar}>
              Our Brands
            </Link>
          </li>
          <li>
            <Link href="/brand-association" onClick={closeSidebar}>
              Brand Association
            </Link>
          </li>
          <li>
            <Link href="/clarks-offers" onClick={closeSidebar}>
              Clarks Offers
            </Link>
          </li>
          <li>
            <Link href="/contact-us" onClick={closeSidebar}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Hotels Popup */}
      {hotelPopupOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col shadow-lg max-w-md mx-auto mobile-city-search">
          {/* Header + Search (sticky) */}
          <div className="sticky top-0 bg-white z-10 border-b shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <h5 className="font-semibold text-lg">Our Hotels</h5>
              <button onClick={() => setHotelPopupOpen(false)} className="text-xl">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="px-3 pb-3">
              <input
                type="text"
                placeholder="Find Your Hotel"
                className="w-full border rounded px-3 py-2 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Scrollable Hotel List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <p className="text-center py-10">Loading hotels…</p>
            ) : filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <div key={idx} className="space-y-2">
                  <h6 className="font-semibold text-gray-700 mt-2">{city.cityName}</h6>
                  <ul className="space-y-1 ps-0">
                    {city.propertyData.map((hotel, i) => {
                      // Resolve propertySlug (already in your API)
                      const propertySlug =
                        hotel?.propertySlug || slugify(hotel?.propertyName || "");

                      // Resolve brandSlug (prefer id; fallback to name; final fallback slugify)
                      const brandId =
                        hotel?.hotelBrandId ??
                        hotel?.brandId ??
                        hotel?.HotelBrandId; // in case of casing variations

                      const brandSlugFromId =
                        brandId != null ? brandSlugById[brandId] : undefined;

                      const brandNameKey =
                        (hotel?.brandName ||
                          hotel?.hotelBrand ||
                          hotel?.BrandName ||
                          "").toLowerCase();

                      const brandSlugFromName =
                        brandNameKey ? brandSlugByName[brandNameKey] : undefined;

                      const brandSlug =
                        brandSlugFromId ||
                        brandSlugFromName ||
                        (brandNameKey ? brandNameKey.replace(/\s+/g, "-") : ""); // simple fallback

                      const href =
                        brandSlug && propertySlug
                          ? `/${brandSlug}/${propertySlug}/hotel-overview`
                          : brandSlug
                          ? `/brand/${brandSlug}`
                          : propertySlug
                          ? `/hotels/${propertySlug}`
                          : "/our-hotels";

                      return (
                        <li
                          key={i}
                          className="flex justify-between items-center border-b py-2 cursor-pointer hover:text-black-600"
                        >
                          <Link href={href} className="text-dark text-decoration-none">
                            <span>{hotel.propertyName} </span>
                            <span className="text-gray-400"> ›</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No hotels available for this filter.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
