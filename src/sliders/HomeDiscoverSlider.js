"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";
import "swiper/css/autoplay";

export default function HomeDiscoverSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetSeasonalCategoryList`);
                const json = await res.json();
                if (json.errorCode === "0" && Array.isArray(json.data)) {
                    setSlides(json.data);
                }
            } catch (err) {
                console.error("Error fetching seasonal categories:", err);
            }
        };

        fetchSlides();
    }, []);

    return (
        <div className="discover-slider">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                navigation={true}
                pagination={false}
                centeredSlides={true}
                spaceBetween={15}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                   
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={600}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.seasonalCategoryId}>
                        <div className={`winter-box ${index === activeIndex ? "active" : "inactive"}`}>
                            <div className="image-overlay">
                                <Image
                                    src={slide.categoryImage || "/no_image1.jpg"}
                                    alt={slide.seasonalCategory || "image"}
                                    width={500}
                                    height={500}
                                    className="img-slide"
                                />
                                <div className="overlay-heading">
                                    <h5>{slide.seasonalCategory}</h5>
                                </div>
                                <div className="discover-hoverable-content">
                                    <Link
                                        href={{
                                            pathname: `/summer/${slide.seasonalCategory.toLowerCase().replace(/\s+/g, "-")}`,
                                            query: { id: slide.seasonalCategoryId }
                                        }}
                                        className="text-sm text-center text-sky-400 link-explore"
                                    >
                                        explore &nbsp;<span className="transform transition-transform bluelght">→</span>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
