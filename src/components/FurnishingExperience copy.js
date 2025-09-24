"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FurnishingExperience() {
  const slides = [
    {
      id: 5,
      title: "After-Sales Support and Maintenance",
      description:
        "Our commitment to your satisfaction extends beyond the final installation. We conduct a thorough final walkthrough to ensure your satisfaction, and also offer comprehensive after-sales support for warranty claims, maintenance, and care instructions.",
      image: "/images/offerss/offer-img.png",
    },
    {
      id: 4,
      title: "Furniture Assembly & Installation",
      description:
        "Our expert teams ensure seamless delivery, unpacking, and installation of your furniture on-site, tailored to your timeline.",
      image: "/images/offerds/offer-img.png",
    },
    {
      id: 3,
      title: "Customized Fit-Out Planning",
      description:
        "We collaborate closely with your interior designer or architect to ensure each piece fits precisely within your vision and space.",
      image: "/images/offers/offer-img.png",
    },
    {
      id: 2,
      title: "Procurement & Logistics",
      description:
        "From supplier coordination to international shipping and warehousing, we manage the entire supply chain efficiently.",
      image: "/images/offers/offer-img.png",
    },
    {
      id: 1,
      title: "Design Consultation",
      description:
        "Our expert consultants work with you to define furnishing needs, suggest materials, and align aesthetics with functionality.",
      image: "/images/offers/offer-img.png",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(slides[0]);

  return (
    <main className="bg-[#f9f6f2] text-[#2d2a26] font-sans">
      <section className="px-6 md:px-20 py-16 min-h-[400px]    ">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How We <span className="text-[#9a7c59]">Simplify</span> Your Furnishing Experience
        </h2>

        <div className="relative flex flex-col md:flex-row w-full gap-6">
          {/* Stacked Cards */}
   
            {slides.map((slide, index) => {
              const isActive = activeSlide.id === slide.id;
              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlide(slide)}
                  style={{ top: `${index * 40}px` }}
                  className={`absolute left-0 right-0 z-[${100 - index}] transition-all duration-300 cursor-pointer rounded-xl bg-white shadow-md px-6 py-6 ${
                    isActive ? "ring-2 ring-[#9a7c59] bg-[#fdfaf5]" : "hover:shadow-lg"
                  }`}
                >
                    <div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/2">
    <p className="text-2xl font-bold text-gray-300">{slide.id}</p>
    <h3 className="text-lg font-semibold text-[#9a7c59]">{slide.title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed mt-2">{slide.description}</p>
  </div>

  <div className="relative w-full md:w-1/2 h-[200px] rounded-md overflow-hidden">
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      className="object-cover"
    />
    <div className="absolute bottom-0 left-0 bg-black/50 text-white px-4 py-2 text-sm">
      iStock — credit: alvarez
    </div>
  </div>
</div>

                
                </div>
              );
            })}
        

          {/* Empty right section since image is inside card now */}
          <div className="w-full md:w-[40%]" />
        </div>
      </section>
    </main>
  );
}
