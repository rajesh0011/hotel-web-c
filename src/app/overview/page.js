"use client";
import React from "react";
import BookNowForm from "@/components/BookNowForm";
import LatestOffers from "@/sliders/LatestOffers";
import DiningSlider from "@/sliders/DiningSlider";
import EventWedding from "@/sliders/EventWedding";
import AccordionItem from "@/components/AccordionComponent/page";
import Nearbycity from "@/sliders/Nearbycity";
import OverExp from "@/sliders/OverExp";
import { useState } from "react";
import AccommodationSlider from "@/sliders/AccommodationSlider";
import PropertyHeader from "@/components/PropertyHeader";
import GalleryModal from "@/components/GalleryModal";
import FooterPage from "@/components/Footer";
export default function Page({ params }) {
  const brand_slug = "citypage";
  const [showModal, setShowModal] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqsList = [
    {
      title: "What time is check-in and check-out?",
      description: "Check-in time is from <strong>2:00 PM</strong> and check-out is until <strong>12:00 PM</strong>."
    },
    {
      title: "Is parking available at the hotel?",
      description: "Yes, <em>complimentary parking</em> is available for all our guests."
    },
    {
      title: "Do you offer airport transfers?",
      description: "Yes, we offer <u>airport pick-up and drop services</u> at an additional charge. Please contact the front desk for details."
    },
    {
      title: "Are pets allowed in the hotel?",
      description: "Unfortunately, <strong>pets are not allowed</strong> except for service animals."
    },
    {
      title: "Is there free Wi-Fi available?",
      description: "Yes, <strong>high-speed Wi-Fi</strong> is available throughout the property at no extra cost."
    }
  ];
  return (
    <>
    <PropertyHeader></PropertyHeader>
      <section className="position-relative banner-section">
        {/* Banner Image */}
        <div className="w-100 overflow-hidden rounded-0 mtspace5">
          <video
            className="w-100 h-[102vh] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/img/banner-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Fixed Book Now Form at Bottom of Section */}
        <div className="position-absolute bottom-0 start-0 w-100 bg-white shadow">
          <BookNowForm />
        </div>
      </section>
      {/* Discover slider */}
      <section data-aos="fade-up" className="mt-4 d-none">
        <div className="container-fluid p-0">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-0">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">About Hotel</h2>
                
                <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Accomodation slider */}
      <section className="mt-3 d-none" data-aos="fade-up">
        <div className="container p-0">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading pt-4">Accomodation</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <Link href={`/${brand_slug}/rooms`} className="btn book-now rounded-0">
                  Know More
                </Link> */}
              </div>
            </div>
          </div>
          
        </div>
        <div className="container-fluid">
          <div className="winter-sec">
              {/* <OverAccomo /> */}
              <AccommodationSlider setShowModal={setShowModal} ></AccommodationSlider>
              <GalleryModal showModal={showModal} setShowModal={setShowModal} />
          </div>
        </div>
      </section>
      {/* dining */}
      <section className="d-none" data-aos="fade-up">
        <div className="container-fluid p-0">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading pt-4">Dining</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <Link href={`/${brand_slug}/dining`} className="btn book-now rounded-0">
                  Know More
                </Link> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <DiningSlider />
            </div>
          </div>
        </div>
      </section>
      {/* facilities */}
      <section className="sec-padding d-none" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">Facilities</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <button className="btn book-now rounded-0">Know More</button> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <LatestOffers />
              {/* <Hotelslider />
              <NearByHridwar/> */}
            </div>
          </div>
        </div>
      </section>
      <section className="d-none" data-aos="fade-up">
        <div className="container-fluid p-0">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading pt-4">Events & Weddings</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <button className="btn book-now rounded-0">Know More</button> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <EventWedding />
            </div>
          </div>
        </div>
      </section>
      {/* Discover slider */}
      <section className="sec-padding d-none" data-aos="fade-up">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading pt-4">Experiences</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <button className="btn book-now rounded-0">Know More</button> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <OverExp />
            </div>
          </div>
        </div>
      </section>
      {/* nearby slider */}
      <section className="d-none">
        <div className="container">
          <div className="global-heading-sec text-center">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9 md-offset-1">
                <h2 className="global-heading">NEAR BY ATTRACTIONS</h2>
                {/* <p className="global-heading2">
                Each stay, a story waiting to be lived.
                </p> */}
                <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                {/* <button className="btn book-now rounded-0">Know More</button> */}
              </div>
            </div>
          </div>
          <div className="winter-sec">
            <div className="row">
              <Nearbycity />
            </div>
          </div>
        </div>
      </section>
      {/* faqs*/}
      <section id="seccityfaq" className="faq-cs-sc cs-sc-padding location-cs-sc mt-5 d-none">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="global-heading-sec text-center">
                <div className="row justify-content-center">
                  <div className="col-md-9 md-offset-1">
                    <h2 className="global-heading mb-0">Frequently Asked Questions</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-none">
            <div className="col-md-12">
              <div id="faq">
                {faqsList?.length > 0 && faqsList.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    content={
                      <span dangerouslySetInnerHTML={{ __html: item.description }} />
                    }
                    isOpen={openIndex === index}
                    onClick={() => handleAccordionClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterPage />
    </>
  );
}
