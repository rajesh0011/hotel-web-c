"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import * as ReactDOM from "react-dom";
import Sidebar from "./Sidebar";
import "@/styles/header.css";
import "@/styles/globals.css";
import "@/styles/style.css";
import { ChevronDown } from "lucide-react";

export default function PropertyHeader({ onSubmit }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { brandSlug, propertySlug } = useParams();
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Our Hotels popup state
  const [hotelPopupOpen, setHotelPopupOpen] = useState(false);
  const [cityWithHotels, setCityWithHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Brand slug lookups
  const [brandSlugById, setBrandSlugById] = useState({});
  const [brandSlugByName, setBrandSlugByName] = useState({});

  const popupRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prefetch brand list
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

  // Fetch hotels when popup opens
  useEffect(() => {
    if (!hotelPopupOpen) return;

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty`)
      .then((res) => res.json())
      .then((data) => setCityWithHotels(data?.data || []))
      .catch((err) => console.error("Hotels fetch error:", err))
      .finally(() => setLoading(false));

    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setHotelPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hotelPopupOpen]);

  if (!hasMounted) return null;

  const handleBookNow = (prop) => {
    setShowFilterBar(prop);
    if (onSubmit) onSubmit();
  };

  const slugify = (str = "") =>
    str
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const filteredCities = cityWithHotels
    .map((city) => ({
      ...city,
      propertyData: (city.propertyData || []).filter((hotel) =>
        (hotel?.propertyName || "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((city) => (city.propertyData || []).length > 0);

  const HotelsPopup = () =>
    ReactDOM.createPortal(
      <div className="fixed-our-hotel-popup-form-inner fixed inset-0 z-50 flex items-start justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
        <div
          ref={popupRef}
          className="bg-white w-full max-w-md h-[95vh] mt-10 rounded-2xl shadow-xl flex flex-col overflow-hidden"
        >
          <div className="sticky top-0 bg-white border-b">
            <div className="flex items-center justify-between px-4 py-3">
              <h5 className="m-0 fw-semibold">Our Hotels</h5>
              <button onClick={() => setHotelPopupOpen(false)} className="text-2xl leading-none">
                ✕
              </button>
            </div>
            <div className="px-4 pb-3">
              <input
                type="text"
                placeholder="Find Your Hotel"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <p className="text-center py-5 m-0">Loading hotels…</p>
            ) : filteredCities.length ? (
              filteredCities.map((city, idx) => (
                <div key={idx} className="mb-3">
                  <h6 className="fw-semibold text-dark">{city.cityName}</h6>
                  <ul className="list-unstyled m-0">
                    {city.propertyData.map((hotel, i) => {
                      const propSlug = hotel?.propertySlug || slugify(hotel?.propertyName || "");
                      const brandId = hotel?.hotelBrandId ?? hotel?.brandId ?? hotel?.HotelBrandId;
                      const brandSlugFromId = brandId != null ? brandSlugById[brandId] : undefined;

                      const brandNameKey = (
                        hotel?.brandName ||
                        hotel?.hotelBrand ||
                        hotel?.BrandName ||
                        ""
                      ).toLowerCase();

                      const brandSlugFromName = brandNameKey ? brandSlugByName[brandNameKey] : undefined;

                      const bSlug =
                        brandSlugFromId ||
                        brandSlugFromName ||
                        (brandNameKey ? brandNameKey.replace(/\s+/g, "-") : "");

                      const href =
                        bSlug && propSlug
                          ? `/${bSlug}/${propSlug}/hotel-overview`
                          : bSlug
                          ? `/brand/${bSlug}`
                          : propSlug
                          ? `/hotels/${propSlug}`
                          : "/our-hotels";

                      return (
                        <li key={i} className="border-bottom py-2">
                          <Link
                            href={href}
                            className="text-decoration-none text-dark d-flex justify-content-between align-items-center"
                            onClick={() => setHotelPopupOpen(false)}
                          >
                            <span>{hotel.propertyName}</span>
                            <span className="text-secondary">›</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-center text-muted py-5 m-0">No hotels available for this filter.</p>
            )}
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <header className="property-header-main">
        <Sidebar isOpen={menuOpen || pathname === "/"} setIsOpen={setMenuOpen} forceOpen={pathname === "/"} />
        <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isScrolled ? "navbar-scroll bg-white shadow-sm" : ""}`}>
          <div className="container-fluid">
            <Link href="/" className="logoimg logo-for-mobile">
              <Image src="/images/clarks-logo-black.png" alt="Logo" width={180} height={30} fetchPriority="high" />
            </Link>

            <button className="navbar-toggler d-md-none" type="button" onClick={() => setMenuOpen(true)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <button className="box-btn know-more p-2 property-header-book-now-mob" onClick={(e) => { e.preventDefault(); handleBookNow(!showFilterBar); }}>
              Book Now
            </button>

            <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? "show" : ""}`} id="navbarNav">
              <div className="d-md-none w-100 text-end pe-3 mt-2">
                <button onClick={() => setMenuOpen(false)} className="btn-close" aria-label="Close" style={{ fontSize: "1.5rem", background: "none", border: "none", color: "#000" }}>
                  ✕
                </button>
              </div>

              <div className="mx-auto d-flex flex-column flex-md-row align-items-center">
                <ul className="navbar-nav ml5">
                  <li className="nav-item only-for-mob-menu-item">
                    <Link className="nav-link" href="/">Home</Link>
                  </li>

                  {/* Our Hotels */}
                  <li className="nav-item only-for-mob-menu-item">
                    <a href="#" className="nav-link" ref={toggleBtnRef} onClick={(e) => { e.preventDefault(); setHotelPopupOpen(true);setMenuOpen(false); }}>
                      Hotels <ChevronDown size={12} className="d-inline-block ms-2" />
                    </a>
                  </li>

                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/hotel-overview`}>Overview</Link></li>
                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/hotel-rooms`}>Rooms</Link></li>
                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/restaurants`}>Dining</Link></li>
                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/meeting-events`}>Meetings & Events</Link></li>

                  <li className="nav-item mx-4 property-logo-desktop">
                    <Link href="/" className="logoimg">
                      <Image src="/images/clarks-logo-black.png" alt="Logo" width={180} height={30} fetchPriority="high" />
                    </Link>
                  </li>

                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/hotel-offers`}>Offers</Link></li>
                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/hotel-gallery`}>Gallery</Link></li>
                  <li className="nav-item"><Link className="nav-link" href={`/${brandSlug}/${propertySlug}/hotel-contact`}>Contact Us</Link></li>

                  <li className="nav-item ms-5 property-book-now-header">
                    <a href="#" className="box-btn know-more p-2" onClick={(e) => { e.preventDefault(); handleBookNow(!showFilterBar); }}>Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {hotelPopupOpen && <HotelsPopup />}
    </>
  );
}
