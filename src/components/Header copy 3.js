"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import * as ReactDOM from "react-dom";

import "@/styles/header.css";
import "@/styles/globals.css";
import "@/styles/style.css";
import OurHotelSearch from "@/sliders/OurHotelSearch";
import { X } from "lucide-react";

export default function Header({ onSubmit,onClick}) {
//export default function Header({ onSubmit}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [ourHotelPopup, setOurHotelPopup] = useState(false);

  // Refs for popup and toggle button
  const popupRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ourHotelPopup) return;

    // const handleClickOutside = (e) => {
    //   if (
    //     popupRef.current &&
    //     !popupRef.current.contains(e.target) &&
    //     toggleBtnRef.current &&
    //     !toggleBtnRef.current.contains(e.target)
    //   ) {
    //     setOurHotelPopup(false);
    //   }
    // };

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ourHotelPopup]);

  if (!hasMounted) return null;

  const handleBookNow = (prop) => {
   // setOurHotelPopup(false);
    setShowFilterBar(prop);
    onSubmit();
  };
  
  // const handleBookNow2 = (prop) => {
  //   onClick();
  // };
  const handleBookNow2 = (prop) => {
  if (typeof onClick === "function") {
    onClick();
  } else {
    console.warn("onClick is not a function!", onClick);
  }
};

  return (
    <>
      <header className="corporate-header corporate-main-headrr" id="corporate-header">
        <Sidebar
          isOpen={menuOpen || pathname === "/"}
          setIsOpen={setMenuOpen}
          forceOpen={pathname === "/"}
        />

        <nav
          className={`navbar navbar-expand-lg fixed-top ${
            isScrolled ? "navbar-scroll bg-white shadow-sm" : ""
          }`}
        >
          <div className="container-fluid">
            {/* Logo */}
            <Link href="/" className="logoimg logo-for-mobile">
              <Image
                src="/images/clarks-logo-black.png"
                alt="Logo"
                width={180}
                height={30}
                fetchPriority="high"
              />
            </Link>

            {/* Mobile toggle */}
            <button
              className="navbar-toggler d-md-none"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
              id="navbarNav"
            >
              {/* Mobile close */}
              <div className="d-md-none w-100 text-end pe-3 mt-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="btn-close"
                  aria-label="Close"
                  style={{
                    fontSize: "1.5rem",
                    background: "none",
                    border: "none",
                    color: "#000",
                  }}
                >
                  ✕
                </button>
              </div>

              <ul className="navbar-nav mx-auto dropdown">
                {/* Our Hotels Dropdown */}
                <li className="nav-item dropdown dropdown-toggle position-static our-hotel-dropdown">
                  <Link
                    href="#"
                    className="nav-link"
                    ref={toggleBtnRef}
                    onClick={(e) => {
                      e.preventDefault();
                      setOurHotelPopup((prev) => !prev);
                      handleBookNow2();
                    }}
                  >
                    Our Hotels
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ms-2 ${ourHotelPopup ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {ourHotelPopup &&
                    ReactDOM.createPortal(
                      <div
                        ref={popupRef}
                        className="our-hotels-popup-for-data dropdown-menu show p-3 pt-0"
                        style={{ maxHeight: "85vh", overflowY: "auto" }}
                      >
                        <OurHotelSearch onClick={() => setOurHotelPopup(false)}/>
                        <button className="closebtnfor-our-hotel-popup"
                        onClick={() => setOurHotelPopup(false)}
                        ><X /></button>
                      </div>,
                      document.body
                    )}
                </li>

                {/* Other menu items */}
                <li className="nav-item">
                  <Link className="nav-link" href="/ourbrands">
                    Our Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/clarks-offers">
                    Clarks Offers
                  </Link>
                </li>
                <Link href="/" className="logoimg logo-for-desktop">
                  <Image
                    src="/images/clarks-logo-black.png"
                    alt="Logo"
                    width={180}
                    height={30}
                    fetchPriority="high"
                  />
                </Link>
                <li className="nav-item">
                  <Link className="nav-link" href="/brand-association">
                    Brand Association
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/contact-us">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item last-nav-item">
                  <a
                    href="#"
                    className="box-btn know-more p-2 desktop-book-now-header"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookNow(!showFilterBar);
                    }}
                  >
                    Book Now
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Book Now */}
            <button
              className="box-btn know-more p-2 mobile-book-now-header"
              onClick={(e) => {
                e.preventDefault();
                handleBookNow(!showFilterBar);
              }}
            >
              Book Now
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
