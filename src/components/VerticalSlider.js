import React, { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: 1,
    image: "/images/brand/clarks-premier-banner.webp",
    logo: "/images/brand/clarks-premier.png",
    description:
      "Clarks Premiers are upscale business hotels in India, we provide all the services that a guest can expect, from premium high-quality rooms to a choice of different dining outlets, fitness rooms and wellness. At Clarks Premier we aim to provide top quality service.",
    hotels: 50,
    keys: "7,100+",
  },
  {
    id: 2,
    image: "/images/brand/clarks-exotica-banner.webp",
    logo: "/images/brand/clarks-exotica.png",
    description:
      "Experience the perfect blend of luxury and exploration with Clarks Exotica. Each destination offers a unique escape, featuring beautifully crafted rooms and personalized travel experiences designed for the discerning traveller.",
    hotels: 45,
    keys: "6,800+",
  },
  {
    id: 3,
    image: "/images/brand/clarksInnbanner.webp",
    logo: "/images/brand/clarks-inn.png",
    description:
      "Discover thoughtfully designed accommodations that blend modern amenities with warm hospitality. Every Clarks Inn destination offers a unique experience, ensuring a seamless and delightful stay, where every moment becomes a cherished memory.",
    hotels: 60,
    keys: "8,500+",
  },
  {
    id: 4,
    image: "/images/brand/clarks-inn-suites-banner.webp",
    logo: "/images/brand/clarks-inn-suites.png",
    description:
      "Step into a world of refined comfort with Clarks Inn Suites, where each property is designed for travellers seeking style, convenience, and exceptional service. ",
    hotels: 50,
    keys: "7,100+",
  },
  {
    id: 5,
    image: "/images/brand/clarks-express-banner.webp",
    logo: "/images/brand/clarks-express.png",
    description:
      "Discover Clarks Inn Express, where necessary amenities and efficiency create a seamless and enjoyable stay for each guest.",
    hotels: 45,
    keys: "6,800+",
  },
];

export default function VerticalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const sliderRef = useRef(null);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slides.length - 1;

  const handleWheel = useCallback(
    (e) => {
      if (!isInView || isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0 && currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 1000);
    },
    [isScrolling, isInView, currentIndex]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.8 }
    );

    if (sliderRef.current) observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const shouldLock =
      isInView &&
      !(isFirstSlide && !isLastSlide) &&
      !(isLastSlide && currentIndex === slides.length - 1);
    document.body.style.overflow = shouldLock ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isInView, currentIndex, isFirstSlide, isLastSlide]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <>
      <div className="slider-container mb-5 mt-5" ref={sliderRef}>
        <div
          className="slides-wrapper"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {slides.map((slide) => (
            <div
              className="slide"
              key={slide.id}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="slide-front-content">
                      <img
                        src={slide.logo}
                        alt="logo"
                        className="h-10 logo-white"
                      />
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="slide-back-content max-w-[100%] md:max-w-[80%]">
                      <p className="text-white text-sm md:text-base py-3">
                        {slide.description}
                      </p>
                      <button className="cta-button">Know More</button>
                    </div>
                    <div className="stats">
                      <div className="pr6 border-r border-white">
                        <h2 className="text-white">{slide.hotels}</h2>
                        <p className="text-white">Hotels</p>
                      </div>
                      <div>
                        <h2 className="text-white">{slide.keys}</h2>
                        <p className="text-white">Keys</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
