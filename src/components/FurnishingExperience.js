"use client";
import React, { useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    number: "1",
    title: "Design Consultation",
    desc: "Our design team works with you to visualize the space, creating the best layout, furniture and decor alignment.",
    image: "/images/offers/offer-img.png",
  },
  {
    id: 2,
    number: "2",
    title: "Material Selection",
    desc: "Choose from our premium range of materials, textures and colors curated by top designers.",
    image: "/images/offers/offer-img.png",
  },
  {
    id: 3,
    number: "3",
    title: "Installation Support",
    desc: "Professionally managed installation with timely updates and quality control for a smooth experience.",
    image: "/images/offers/offer-img.png",
  },
  {
    id: 4,
    number: "4",
    title: "Quality Check",
    desc: "We ensure every detail is perfect before handover. Our QA team reviews your setup end-to-end.",
    image: "/images/offers/offer-img.png",
  },
  {
    id: 5,
    number: "5",
    title: "After-Sales Support and Maintenance",
    desc: "Comprehensive support for warranty, claims, maintenance, and care after installation.",
    image: "/images/offers/offer-img.png",
  },
];

export default function FurnishingExperience() {
  const [activeIndex, setActiveIndex] = useState(4);

  return (
    <section className="px-6 py-10 bg-[#fdfaf5]">
     

      <div className="row justify-content-center mb-4">
        
        <div className="col-md-9 md-offset-1">
        <h2 className="text-3xl font-semibold mb-8 text-[#2d2a26]">
        How We <span className="text-[#c2a26e]">Simplify</span> Your
        <br />
        Furnishing Experience
      </h2>
        {/* Container for stack effect */}
        <div className="relative flex flex-col gap-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              className={`group border shadow cursor-pointer overflow-hidden transition-all duration-500 ease-in-out
                ${
                  index === activeIndex
                    ? "h-64 z-20 bg-white shadow-xl"
                    : "h-20 z-10 bg-[#ffffff]"
                }
                rounded-xl flex items-center relative`}
              style={{
                marginTop: index !== 0 ? -30 : 0,
              }}
            >
              {/* Left side content */}
             {/* Left side content */}
<div className="px-6 py-4 w-1/2 items-center gap-4 p-5 z-30 relative">
  {index === activeIndex && (
    <>
  
  <h2 className="text-gray-400">{slide.number}</h2>

    
      <div className="flex flex-col">
        <h4 className="text-gray">
          {slide.title}
        </h4>
        <p className="text-sm text-gray-600 mt-2">{slide.desc}</p>
      </div>
    </>
  )}
</div>


              {/* Right side image (always visible) */}
              <div
                className={`absolute right-0 top-0 h-full transition-all duration-500 ease-in-out ${
                  index === activeIndex ? "w-1/2" : "w-1/2 imghide"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
               fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
