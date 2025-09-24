import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import BookTableModal from "./BookTableModal";

const DiningSlider = ({ propertyId, hotelName }) => {
  const API_URL = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyDineBanner?propertyId=${propertyId}`;

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState({ title: "", desc: "" });
  const [brandSlug, setBrandSlug] = useState("");
  const [propertySlug, setPropertySlug] = useState("");
    const [showFullText, setShowFullText] = useState(false);
    const [showFullText1, setShowFullText1] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch brandSlug
  useEffect(() => {
    const fetchBrandSlug = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`
        );
        const json = await res.json();
        if (json.errorCode === "0" && json.data.length > 0) {
          setBrandSlug(json.data[0].brandSlug);
        }
      } catch (error) {
        console.error("Error fetching brand slug:", error);
      }
    };

    fetchBrandSlug();
  }, []);

  // Fetch propertySlug
  useEffect(() => {
    const fetchPropertySlug = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?PropertyId=${propertyId}`
        );
        const json = await res.json();
        if (json.errorCode === "0" && json.data.length > 0) {
          setPropertySlug(json.data[0].propertySlug);
        }
      } catch (error) {
        console.error("Error fetching property slug:", error);
      }
    };

    if (propertyId) {
      fetchPropertySlug();
    }
  }, [propertyId]);

  // Fetch Dining Data
  useEffect(() => {
    const fetchDining = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (json?.errorCode === "0") {
          const dineItems = [];

          json.data.forEach((entry) => {
            const bg = entry.bannerImages?.[0]?.bannerImage || "/images/img-5.jpg";

            entry.dineDetails?.forEach((dine) => {
              dineItems.push({
                bg,
                thumb: dine.dineImages?.[0]?.dineImage || "/images/img-5.jpg",
                title: dine.dineTitle,
                description: dine.dineDesc,
                timing: `${dine.openingHours} - ${dine.closingHours}`,
              });
            });
          });

          setSlides(dineItems);

          setBannerData({
            title: json.data[0]?.dineBannerTitle || "",
            desc: json.data[0]?.dineBannerDesc || "",
          });
        } 
        // else {
        //   console.error("API error:", json.errorMessage);
        // }
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDining();
  }, [propertyId]);

// if (loading) return <p>Loading...</p>;
// if (!slides.length) return null;

  return (
    <>
      <section data-aos="fade-up">
          <div className="container-fluid">
            <div className="row justify-content-center mb-4">
              <div className="col-md-9">
                <div className="global-heading-sec text-center">
                <h2 className="global-heading pt-4">{bannerData.title || "Dining"}</h2>
                {bannerData.desc && (
                      // <p className="mb-2">{bannerData.desc}</p>
                      <p className="mb-2 whitespace-pre-line">
                            {bannerData?.desc.length > 150 ? (
                              <>
                                {showFullText
                                  ? bannerData?.desc
                                  : bannerData?.desc.slice(0, 150) + "..."}
                                <span
                                  onClick={() => setShowFullText(!showFullText)}
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
                              bannerData?.desc
                            )}
                          </p>
                    )}
              </div>
            </div>
            <div className="winter-sec">
            
                <Swiper
                  navigation
                  modules={[Navigation]}
                  slidesPerView={1}
                  className="overv-dine"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="new-type-dine-sec py-4">
                        <div className="container pushed-wrapper">
                          <div className="row">
                            <div
                              className="pushed-image"
                              style={{ backgroundImage: `url(${slide.thumb})` }}
                            ></div>
                            <div className="pushed-box">
                              <div className="pushed-header">
                                <span className="header-1"> {slide.title}</span>
                                <span className="header-3 d-inline-block">
                                  {/* {slide.description} */}
                                  {slide?.description.length > 150 ? (
                              <>
                                {showFullText1
                                  ? slide?.description
                                  : slide?.description.slice(0, 150) + "..."}
                                <span
                                  onClick={() => setShowFullText1(!showFullText1)}
                                  style={{
                                    cursor: "pointer",
                                    color: "#000",
                                    fontWeight: "600",
                                    display: "inline-block",
                                  }}
                                >
                                  {showFullText1 ? " ❮❮" : " ❯❯"}
                                </span>
                              </>
                            ) : (
                              slide?.description
                            )}
                                </span>
                                {slide.timing && slide.timing.trim() && (
                                  <span className="header-3 mt-2">
                                    <strong>Timings:</strong> {slide.timing}
                                  </span>
                                )}

                                <div className="flex mt-3 gap-2">
                                  {brandSlug && propertySlug && (
                                    <Link
                                      href={`/${brandSlug}/${propertySlug}/restaurants`}
                                      className="box-btn know-more"
                                    >
                                      EXPLORE MORE
                                    </Link>
                                  )}
                                  <button
                                    className="box-btn book-now"
                                    onClick={() => setShowModal(true)}
                                  >
                                    BOOK A TABLE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div
                        className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center"
                        style={{ backgroundImage: `url(${slide.bg})` }}
                      >
                        <div className="absolute inset-0 bg-black/50 z-0" />

                        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
                         
                          <div className="w-full md:w-1/3">
                            {slide.thumb && (
                              <Image
                                src={slide.thumb}
                                alt="Dining Thumbnail"
                                width={400}
                                height={300}
                                className="shadow-lg object-cover"
                              />
                            )}
                          </div>

                          <div className="w-full md:w-2/3 p-3 md:p-10 bg-white bg-opacity-90 text-black">
                            <h4 className="text-2xl md:text-3xl font-serif mb-2 mt-4">
                              {slide.title}
                            </h4>
                            <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                              {slide.description}
                            </p>
                            {slide.timing && slide.timing.trim() && (
                              <p className="text-sm font-semibold mb-6">
                                <strong>Timings:</strong> {slide.timing}
                              </p>
                            )}
                            <div className="flex mt-3 gap-2">
                              {brandSlug && propertySlug && (
                                <Link
                                  href={`/${brandSlug}/${propertySlug}/restaurants`}
                                  className="box-btn know-more"
                                >
                                  EXPLORE MORE
                                </Link>
                              )}
                              <button
                                className="box-btn book-now"
                                onClick={() => setShowModal(true)}
                              >
                                BOOK A TABLE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              
          </div>
          </div>

          
        </div>
      </section>
      <BookTableModal
        show={showModal}
        onClose={() => setShowModal(false)}
        hotelName={hotelName}
      />
    </>
  );
};

export default DiningSlider;
