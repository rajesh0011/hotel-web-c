'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const fallbackMap = '/images/brand/map2.png';
const fallbackLogo = '/images/brand/default-logo.png';
const fallbackTextColor = '#333';

export default function BrandMapSlider() {
  const [brands, setBrands] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
   const [showFullText6, setShowFullText6] = useState(false);

  useEffect(() => {
    const brandColorMap = {
      'CLARKS PREMIER': '#836034',
      'CLARKS EXPRESS': '#27a9e5',
      'CLARKS INN': '#952531',
      'CLARKS EXOTICA': '#3d4681',
      'CLARKS RESIDENCES': '#5b7e42',
      'AB CLARKS INN': '#8d3e3e',
      'CLARKS COLLECTION': '#2c3e50',
    };

    fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`)
      .then(res => res.json())
      .then(data => {
        if (data?.errorCode === '0' && Array.isArray(data.data)) {
          const processed = data.data.map((item) => {
            const brandName = item.hotelBrand?.toUpperCase() || 'UNKNOWN';
            const brandLogoUrl = item.brandLogo?.startsWith('http')
              ? item.brandLogo
              : null;

            return {
              brandSlug:item.brandSlug || 'ourbrands',
              name: item.hotelBrand || 'Unknown Brand',
              desc: item.hotelBrandDesc || 'No description available.',
              logo: brandLogoUrl || fallbackLogo,
              brandImage: item.brandImage || fallbackMap,
              textColor: brandColorMap[brandName] || fallbackTextColor,
              hotelsCount: item.hotelsCount || 0,
              citiesCount: item.citiesCount || 0,
              destinations: item.destinations || 0,
            };
          });
          setBrands(processed);
        }
      })
      .catch(err => console.error('Failed to fetch brand data:', err));
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="bg-white py-12 px-4 md:px-16 brandsec home-brand-section">
      {/* Brand Logos Carousel */}
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="mb-10"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => setSelectedIndex(index)}
              className="h-20 flex items-center justify-center p-2 transition-all duration-200 border-r-1 cursor-pointer"
            >
              <Image
                src={brand.logo || fallbackLogo}
                alt={brand.name}
                width={100}
                height={30}
                className="mx-auto brandlogo"
                onError={(e) => {
                  console.error("Failed to load image:", brand.logo);
                  e.currentTarget.src = fallbackLogo;
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Left Text */}
        <div className="md:w-1/4 text-center md:text-left mb-8 md:mb-0">
        <Link href={`/${brands[selectedIndex].brandSlug || 'ourbrands'}`} className='brandlinkforhome'>
          <h2
            className="text-3xl font-serif mb-2 inner-type-2-heading brand-name-home-page"
            style={{ color: brands[selectedIndex].textColor }}
          >
            {brands[selectedIndex].name}
          </h2>
        </Link>
          {/* <p className="text-gray-600 text-sm leading-relaxed">
            {brands[selectedIndex].desc}
          </p> */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {brands[selectedIndex].desc.length > 80 ? (
                    <>
                      {showFullText6
                        ? brands[selectedIndex].desc
                        : brands[selectedIndex].desc.slice(0, 80) + "..."}
                      <span
                        onClick={() => setShowFullText6(!showFullText6)}
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        {showFullText6 ? " ❮❮" : " ❯❯"}
                      </span>
                    </>
                  ) : (
                    brands[selectedIndex].desc
                  )}
                </p>

                <Link href={`/${brands[selectedIndex].brandSlug || 'ourbrands'}`} className='btn btn-primary ExploreMoreHomeBrand'>Explore <ArrowRight size={14}></ArrowRight> </Link>

        </div>
        <div className="md:w-1/2 mb-8 md:mb-0 flex mt-3 justify-center ">
          <Image
            src={brands[selectedIndex].brandImage}
            alt="Brand Map"
            width={350}
            height={350}
            className="object-contain transition-all duration-300"
          />
        </div>
        <div
          className="md:w-1/4 font-serif text-2xl space-y-4 text-start"
          style={{ color: brands[selectedIndex].textColor }}
        >
          <div className='hotel-key-city-count'><span className="font-bold">  {brands[selectedIndex].hotelsCount}</span> Hotels</div>
          <div className='hotel-key-city-count'><span className="font-bold">{brands[selectedIndex].citiesCount}</span> Cities</div>
          <div className='hotel-key-city-count'><span className="font-bold">{brands[selectedIndex].destinations}</span> Keys</div>
        </div>
      </div>
    </section>
  );
}
