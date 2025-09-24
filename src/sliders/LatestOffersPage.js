"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as ReactDOM from "react-dom";

export default function LatestOffersPage({ onSubmit }) {
  const [offers, setOffers] = useState([]);
  const [brands, setBrands] = useState({}); // Map hotelBrandId -> brandSlug
  const [modalContent, setModalContent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openOfferId, setOpenOfferId] = useState(null); // NEW: track expanded offer

  // Handle opening the modal and setting its content
  const handleKnowMore = (offer) => {
    setModalContent({
      title: offer.offerTitle || offer.offerName,
      description: offer.offerDesc || "No description available.",
    });
    setIsModalOpen(true); // Open the modal by setting the state to true
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal by setting the state to false
  };

  // Fetch brands
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.errorCode === "0" && Array.isArray(data.data)) {
          const brandMap = {};
          data.data.forEach((brand) => {
            brandMap[brand.hotelBrandId] = brand.brandSlug;
          });
          setBrands(brandMap);
        }
      });
  }, []);

  // Fetch corporate offers
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/offers/GetCorporateOffers`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.errorCode === "0" && Array.isArray(data.data)) {
          setOffers(data.data);
        }
      });
  }, []);

  const handleToggleHotels = (offerId) => {
    setOpenOfferId((prev) => (prev === offerId ? null : offerId));
  };

  // Hide the hotel list when clicking outside the expanded offer box
  useEffect(() => {
    if (!openOfferId) return;

    const handleClickOutside = (event) => {
      // Find the expanded offer box
      const expandedBox = document.querySelector(
        `.hotel-box .offers-hotel-hotel-list`
      );
      if (expandedBox && !expandedBox.contains(event.target)) {
        setOpenOfferId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOfferId]);

  function handleBookNow(property) {
    onSubmit(property);
  }
  return (
    <>
      <div className="container">
        <div className="hotellist">
          <div className="row">
            {offers.map((offer, index) => {
              const imageUrl =
                offer.offersImages?.[0]?.offerImages ||
                "/images/event/event-img1.png";

              // Extract first property details
              const firstProperty = offer.propertyData?.[0];
              const brandSlug = brands[firstProperty?.hotelBrandId] || "brand";
              const propertySlug = firstProperty?.propertySlug || "property";

              return (
                <div
                  className="col-12 col-md-6 col-lg-6 mb-4"
                  key={offer.propertyOfferId || index}
                >
                  <div className="winter-box shadow hotel-box mt-2 no-image-bg">
                    <Image
                      src={imageUrl}
                      alt={offer.offerTitle || "Offer"}
                      className="w-100 primary-radius"
                      width={264}
                      height={220}
                      quality={75}
                    />
                    <div className="winter-box-content">
                      <div className="hotel-box-content">
                        <h3 className="winter-box-heading">
                          {offer.offerTitle || offer.offerName}
                        </h3>
                      </div>
                      <p className="display-block offer-description">
                        <span>
                          {offer.offerDesc || "No description available."}
                        </span>
                      </p>
                      <div className="winter-box-btn">
                        <button
                          className="box-btn know-more"
                          onClick={() => handleKnowMore(offer)}
                        >
                          Know More
                        </button>

                        <button
                          className="box-btn book-now"
                          onClick={() =>
                            handleToggleHotels(offer.propertyOfferId)
                          }
                        >
                          Book Now
                        </button>

                        {openOfferId === offer.propertyOfferId && (
                          <div className="offers-hotel-hotel-list mt-3">
                            {offer.propertyData?.length > 0 ? (
                              <ul className="list-unstyled mb-0">
                                {offer.propertyData.map((hotel) => (
                                  <li key={hotel.propertyId} className="mb-2">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleBookNow(hotel);
                                      }}
                                    >
                                      {/* {hotel.propertyName}, {hotel.cityName} */}

                                      <small>
                                        {hotel.propertyName}, {hotel.cityName}
                                      </small>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No hotels available for this offer.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}

      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            className="modal fade show new-type-popup"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            aria-labelledby="offerModalLabel"
            aria-hidden="false"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h6 className="modal-title" id="offerModalLabel">
                    {modalContent.title}
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  >
                    x
                  </button>
                  <p className="mt-3">{modalContent.description}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <style jsx>
        {`
          .new-type-popup {
            backdrop-filter: blur(10px);
          }
          .new-type-popup.btn-close {
            background: 000;
            border: none;
            color: white;
            font-size: 1rem!important;
            color: #fff;
            height: 25px!important;
            width: 25px!important;
            border-radius: 0%;
            position: absolute;
            top: 10px !important;
            opacity: 1;
            right: 10px !important;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
