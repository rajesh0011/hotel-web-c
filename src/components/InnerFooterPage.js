"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faGooglePlusG,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin } from "lucide-react";

export default function InnerFooterPage({ propertyData }) {
  useEffect(() => {
    AOS.init();
  }, []);

  if (!propertyData) return null; // if no data, don’t render

  return (
    <footer className="footer dynamic-inner-footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            {/* <Link href="/"> */}
              <h5>{propertyData?.propertyName}</h5>
            {/* </Link> */}

            <p className="text-capitalize">
              <MapPin className="m-1 d-inline-block" size={14} />
              {propertyData?.addressDetails[0]?.address1 ||
                "No address available"}
            </p>

            <div className="contact-info dynamic-contact-info">
              <div className="inline-itemx-box justify-content-center">
                {propertyData?.contactDetails[0]?.emailId1 && (
                  <p className="me-2">
                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                    <a
                      className="text-lowercase"
                      href={`mailto:${propertyData.contactDetails[0].emailId1}`}
                    >
                      {propertyData.contactDetails[0].emailId1}
                    </a>
                  </p>
                )}

                 {propertyData.contactDetails[0]?.tollFreeNumber && (
                  <p className="me-2">
                    <FontAwesomeIcon icon={faPhone} />
                    {propertyData.contactDetails[0].tollFreeNumber} | Toll-Free Number
                  </p>
                )}

                {propertyData.contactDetails[0]?.contactNo1 && (
                  <p className="me-2">
                    <FontAwesomeIcon icon={faPhone} />
                    {propertyData.contactDetails[0].contactNo1} | Hotel Contact Number
                  </p>
                )}

                {propertyData.contactDetails[0]?.contactNo2 && (
                  <p className="me-2">
                    <FontAwesomeIcon icon={faPhone} />
                    {propertyData.contactDetails[0].contactNo2} | Hotel Contact Number
                  </p>
                )}
              </div>
            </div>

            {/* Social icons */}
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <h6 className="mt-4">Get In Touch</h6>
                  <div className="social-icons">
                    <Link
                      href={propertyData?.followUsDetails[0]?.facebook || '#'}
                      className="mr-2"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link
                      href={propertyData?.followUsDetails[0]?.linkedin || '#'}
                      className="mr-2"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                    <Link
                      href={propertyData?.followUsDetails[0]?.instagram || '#'}
                      className="mr-2"
                    >
                      <FontAwesomeIcon icon={faInstagram} color="black" />
                    </Link>
                    {/* <Link
                      href={`https://web.whatsapp.com/send?phone=+91-${propertyData?.followUsDetails[0]?.whatsapp}`}
                      className="mr-3"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </Link> */}
                    <Link
                      href={propertyData?.followUsDetails[0]?.youtubeProfile || '#'}
                      className="mr-2"
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row text-center">
          <div className="footer-links">
            <Link href="/">Home</Link>
                        <Link href="/hotels">Our Hotels</Link>
            {/* <Link href="/about-us">About Us</Link> */}
            <Link href="/ourbrands">Our Brands</Link>
            <Link href="/brand-association">Brand Association</Link>


            {/* <Link href="/awards">Awards</Link> */}
            <Link href="/clarks-offers">Clarks Offers</Link>
            <Link href="/blog">Blogs</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/manage-booking">Manage Booking</Link>
            <Link href="/contact-us">Contact Us</Link>
            {/* <Link href="/gallery">Gallery</Link> */}
           
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p className="text-center text-capitalize">Copyright © 2025, Clarks Hotels & Resorts. All Rights Reserved. Powered by <Link href="https://www.cinuniverse.com/" target="_blank"> CIN Universe.</Link></p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
