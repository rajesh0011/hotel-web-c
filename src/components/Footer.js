"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faGooglePlusG, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin } from "lucide-react";
import Script from "next/script";

export default function FooterPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          {/* <div className="col-md-3 d-flex justify-content-end">
            <Image
              src="/images/footer-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="ftr_logo"
              style={{ width: "auto", height: "auto" }} // Ensures aspect ratio remains intact
            />
          </div> */}

          <div className="col-md-12 text-center">
            <Link href="/">
              <h5>The Clarks Hotel & Resorts</h5>
            </Link>
            <p className="text-capitalize">
              {/* <FontAwesomeIcon icon={faLocationDot} className="me-0" /> */}
              <MapPin className="m-1 d-inline-block" size={14}></MapPin>
              
              707, Emaar Capital Tower -1, Mehrauli - Gurgaon Road, Gurugram - Haryana 122002
            </p>
            <div className="contact-info">
              <div className="inline-itemx-box justify-content-center">
                <p className="me-4">
                  <FontAwesomeIcon icon={faEnvelope} className="me-0 ms-0 ps-0" /> 
                  <a className="text-lowercase" href="mailto:bookmystay@theclarkshotels.com">bookmystay@theclarkshotels.com</a>
                </p>
                <p className="me-4">
                  <FontAwesomeIcon icon={faPhone} className="me-0 ms-0 ps-0 text-capitalize" />
                 1800 202 7707 | Toll Free Number
                  {/* <a className="text-lowercase" href="mailto:Sales.uk@clarkshotels.com">Sales.uk@clarkshotels.com</a> */}
                </p>
                <p className="me-4">
                  <FontAwesomeIcon icon={faPhone} className="me-0 ms-0 ps-0 text-capitalize" />
                  +91 97171 70578 | Central Reservation
                  {/* <a className="text-lowercase" href="mailto:Sales.uk@clarkshotels.com">Sales.uk@clarkshotels.com</a> */}
                </p>
                {/* <p>
                  <FontAwesomeIcon icon={faPhone} className="me-0 ms-3" /> +91 11 4766 1200
                </p> */}
              </div>
              <div className="inline-itemx-box justify-content-center">
                <p className="me-4">
                  <FontAwesomeIcon icon={faPhone} className="me-0 ms-0 ps-0" />
                  +91 80012 14050 | Reservations - Clarks Collection | Clarks Safari | Clarks Resort
                </p>

              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <h6 className="mt-4">Get In Touch</h6>
                  <div className="social-icons">
                    <Link href="https://www.facebook.com/theclarkshotelsandresorts" className="mr-3">
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link href="https://www.linkedin.com/company/theclarkshotelsresorts" className="mr-3">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                    <Link href="https://www.instagram.com/theclarkshotelsandresorts/?utm_medium=copy_link" className="mr-3">
                      <FontAwesomeIcon icon={faInstagram} color="black" />
                    </Link>
                    <Link href="https://web.whatsapp.com/send?phone=+91-92058 67733" className="mr-3">
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </Link>

                    {/* <Link href="https://www.youtube.com/@theclarkshotelsandresorts" className="mr-3">
                      <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                    <Link href="https://www.google.com/search?q=the+clarks+hotels+and+resorts&amp;oq=the&amp;gs_lcrp=EgZjaHJvbWUqDggDEEUYJxg7GIAEGIoFMgYIABBFGDwyBggBEEUYOTIMCAIQLhhDGIAEGIoFMg4IAxBFGCcYOxiABBiKBTIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMzU0MWowajeoAgCwAgA&amp;sourceid=chrome&amp;ie=UTF-8" className="me-3">
                      <FontAwesomeIcon icon={faGooglePlusG} />
                    </Link> */}
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

        {/* <hr /> */}
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p className="text-center text-capitalize">Copyright © 2025, The Clarks Hotels & Resorts. All Rights Reserved @ ANK Hotels PVT LTD. Powered by <Link href="https://www.cinuniverse.com/" target="_blank"> CIN Universe.</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
