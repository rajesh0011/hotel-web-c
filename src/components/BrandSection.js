"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function BrandSection() {
  const [brands, setBrands] = useState([]);

  const brandColors = {
    "AB Clarks Inn": { bgColor: "bg-[#952531]", textColor: "#981c2d" },
    "CLARKS COLLECTION": { bgColor: "bg-[#77caf2]", textColor: "#77caf2" },
    "CLARKS INN": { bgColor: "bg-[#3d4681]", textColor: "#403d8c" },
    "CLARKS INN EXPRESS": { bgColor: "bg-[#813b81]", textColor: "#782a5e" },
  };

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`
        );
        const result = await response.json();

        if (result?.data?.length > 0) {
          const formattedBrands = result.data
            .filter((b) => b.enabled)
            .map((brand, index) => {
              const name = brand.hotelBrand?.toUpperCase();
              const colorData = brandColors[name] || {
                bgColor: "bg-gray-400",
                textColor: "#000000",
              };

              return {
                id: brand.hotelBrandId,
                name: brand.hotelBrand,
                text: brand.hotelBrandDesc,
                logo: brand.logoPath || "/images/brand/default-logo.png",
                color: colorData.bgColor,
                headingClass: colorData.textColor,
              };
            });

          setBrands(formattedBrands);
        }
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    }

    fetchBrands();
  }, []);

  return (
    <div className="bg-[#ffffff] py-10 px-4 md:px-16 pb-2 ourbrnd">
      <div className="space-y-10">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex mb-4 flex-col md:flex-row items-stretch gap-6"
          >
            {/* Left color box */}
            <div
              className={`w-full md:w-1/3 min-h-[180px] rounded-2xl flex items-center justify-center text-white text-2xl font-light capitalize ${brand.color}`}
            >
              <Image
                src={brand.logo}
                alt={brand.text}
                width={140}
                height={35}
                className="object-contain h-auto w-auto filter brightness-0 invert"
              />
            </div>

            {/* Right text section */}
            <div className="w-full md:w-2/3 p-4 bg-[#efebe2] rounded-2xl px-6 py-6 flex flex-col justify-center">
              <h3
                className="text-xl md:text-2xl font-light mb-3"
                style={{ color: brand.headingClass }}
              >
                About {brand.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {brand.text || "Description coming soon..."}
              </p>
              <button className="text-xs box-btn book-now border border-black w-max hover:bg-black hover:text-white transition-all duration-300">
                KNOW MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
