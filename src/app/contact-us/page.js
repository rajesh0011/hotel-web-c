"use client";
import React, { useState, useRef, useEffect } from "react";
import BookNowForm from "@/components/BookNowForm";
import Header from "@/components/Header";
import DirectoryAccordion from "./DirectoryAccordion";
import ContactUsForm from "./ContactUsForm";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import FilterBar from "../cin_booking_engine/Filterbar";
import { X } from "lucide-react";
import FooterPage from "@/components/Footer";
import * as ReactDOM from "react-dom";

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

      {/* <section className="position-relative banner-section">
        <div
          className="w-100 overflow-hidden rounded-0 mtspace5"
          ref={filterBarRef}
        ></div>

        <div className="position-absolute bottom-0 start-0 w-100 bg-white shadow">
          {isOpenFilterBar && (
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
          )}
        </div>
      </section> */}

      <section className="contact-us-corporate-page contact-us-page-data">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Contact Us</h2>
              </div>
            </div>
          </div>

          <div className="winter-sec">
            <div className="row">
              <div className="col-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Corporate Office Address */}
                  <div className="bg-gray-50 p-4 shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      Corporate Office Address
                    </h3>
                    <p>The Clarks Hotels and Resorts</p>
                    <p>707 Emaar Capital Tower</p>
                    <p>Mehrauli - Gurgaon Road, Gurugram - Haryana 122002</p>
                    <p>
                      <strong>Toll-Free:</strong> 1800 202 7707
                    </p>
                  </div>

                  {/* Hotel Reservations */}
                  <div className="bg-gray-50 p-4 shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      Hotel Reservations
                    </h3>
                    <p>
                      Get in contact with our reservations team for simple
                      one-step reservations.
                    </p>
                    <p>
                      <strong>Contact Number:</strong> +91 97171 70578
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:centralreservations@theclarkshotels.com"
                        className="text-blue-600"
                      >
                        centralreservations@theclarkshotels.com
                      </a>
                    </p>
                  </div>

                  {/* Hotel Sales & Revenue - Offices */}
                  <div className="bg-gray-50 p-4 shadow col-span-1 md:col-span-2">
                    <h3 className="text-xl font-semibold mb-2">
                      Hotel Sales & Revenue
                    </h3>
                    <p>
                      If you wish to find out more about RFPs, group discounts,
                      or contractual pricing, contact the corporate or regional
                      offices.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {/* Each office */}
                      {[
                        {
                          title: "Sales Office Delhi NCR",
                          email: "rsm.gurgaon@theclarkshotels.com",
                          phone: "+91 97175 78222",
                        },
                        // {
                        //   title: "Sales Office Delhi NCR",
                        //   email: "rsm@theclarkshotels.com",
                        //   phone: "+91 97175 78222",
                        // },
                        {
                          title: "Sales Office Punjab",
                          email: "rso.punjab@theclarkshotels.com",
                          phone: "+91 84488 70721",
                        },
                        {
                          title: "Sales Office Kolkata",
                          email: "rm.east@theclarkshotels.com",
                          phone: "+91 98101 31034",
                        },
                        
                        {
                          title: "Sales Office Bangalore",
                          email: "rso.bangalore@theclarkshotels.com",
                          phone: "+91 81301 09022",
                        },
                        {
                          title: "Sales Office Ahmedabad",
                          email: "rso.ahmedabad@theclarkshotels.com",
                          phone: "+91 98101 31026",
                        },
                        {
                          title: "Sales Office Jaipur",
                          email: "sales@theclarkscollection.com",
                          phone: "+91 89059 89309",
                        },
                        {
                          title: "Sales Office Mumbai",
                          email: "rso.mumbai@theclarkshotels.com",
                          phone: "+91 74281 98767",
                        },
                        {
                          title: "Marketing Department",
                          email: "marcom@theclarkshotels.com",
                          phone: "+91 81301 21333",
                        },
                        {
                          title: "Sales Office Lucknow",
                          email: "rso.lucknow@theclarkshotels.com",
                          phone: "+91 92058 67766",
                        },
                      ].map((office, index) => (
                        <div key={index} className="bg-white p-4 border">
                          <h4 className="font-semibold">{office.title}</h4>
                          <p className="text-sm">
                            <strong>Email:</strong>{" "}
                            <a
                              href={`mailto:${office.email}`}
                              className="text-blue-600"
                            >
                              {office.email}
                            </a>
                          </p>
                          <p className="text-sm">
                            <strong>Contact Number:</strong> {office.phone}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hotel Acquisition & Development */}
                  <div className="bg-gray-50 p-4 shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      Hotel Acquisition & Development
                    </h3>
                    <p className="mb-2">
                      If you like to know more about our new development
                      approach and partnerships, connect with our Business
                      Development team on
                    </p>
                    <p>
                      <strong>Contact Number:</strong> +91 95990 83785, +91
                      95870 57777
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:association@theclarkshotels.com"
                        className="text-blue-600"
                      >
                        association@theclarkshotels.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <DirectoryAccordion></DirectoryAccordion>
            </div>
          </div>

          <ContactUsForm></ContactUsForm>
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
