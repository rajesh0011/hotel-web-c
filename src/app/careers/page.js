"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import CareerForm from "./CareerForm";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import FooterPage from "@/components/Footer";
import * as ReactDOM from "react-dom";
import CareerSlider from "@/sliders/CareerSlider";

export default function ContactUsPage() {
  const filterBarRef = useRef(null);
  const [isOpenFilterBar, openFilterBar] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleBookNowClick = async () => {
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
      <Header onSubmit={handleBookNowClick} onClick={handleBookNowClick2}></Header>

      <section className="position-relative" ref={filterBarRef}>
        <div className="position-absolute top-100 start-0 w-100 bg-white shadow">
          {/* <BookNowForm /> */}

          {/* {isOpenFilterBar && ( */}

          {isOpenFilterBar &&
            ReactDOM.createPortal(
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

          {/* )} */}
        </div>
      </section>

      <section className="contact-us-corporate-page contact-us-page-data">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-0">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Careers</h2>
              </div>
            </div>
          </div>

          <div className="new-career-section-page">
            <div className="new-type-dine-sec pt-4">
              <div className="container pushed-wrapper">
                <div className="row">
                  <div
                    className="pushed-image"
                    style={{
                      backgroundImage: `url(/career/Images-13_joshh3.jpg)`,
                    }}
                  ></div>
                  <div className="pushed-box">
                    <div className="pushed-header">
                      <span className="header-1">
                        Check Inn to a New Journey in Hospitality with The
                        Clarks
                      </span>
                      <span className="header-3">
                        The Clarks Hotels & Resorts, our greatest asset is our
                        highly skilled, motivated, and dedicated team. They
                        ensure we provide warm and seamless service to our
                        guests every day. From hospitality management to
                        innovative guest experiences, The Clarks Hotels &
                        Resorts offers a wealth of opportunities for talented
                        individuals eager to become part of our distinguished
                        family.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         

          <div className="winter-sec">
            <div className="row mt-4">
              <CareerSlider />
            </div>
          </div>

           <div className="new-career-section-page">
            <div className="new-type-dine-sec pt-4">
              <div className="container pushed-wrapper">
                <div className="row">
                  <div
                    className="pushed-image"
                    style={{
                      backgroundImage: `url(/career/1-01_ey6vyw.jpg)`,
                    }}
                  ></div>
                  <div className="pushed-box">
                    <div className="pushed-header">
                      <span className="header-1">
                       Spirit of The Makers
                      </span>
                      <span className="header-3">
                      We believe in the power of individual opinions and advice to shape our brand's future. The "Spirit of the Makers" initiative encourages team members to share their insights and innovative ideas, fostering a culture of collaboration and continuous improvement. Join us and contribute to a brand that values and implements the unique perspectives of its people.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CareerForm />
        </div>
      </section>

      <style jsx>
        {`
          .contact-us-page-data h3 {
            font-size: 19px !important;
          }
          .contact-us-page-data h4 {
            font-size: 17px !important;
            margin-bottom: 10px;
          }
          .contact-us-page-data .grid.grid-cols {
            padding: 1rem;
          }
          .contact-us-page-data a {
            color: #000;
            text-decoration: none;
          }
        `}
      </style>

      <FooterPage />
    </>
  );
}
