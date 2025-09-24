'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';

const BrandTabs = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState(null);

  // Fetch API data
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetBrandList`,
          { cache: 'no-store' }
        );
        const json = await res.json();
        if (json?.data) {
          setBrands(json.data);
          setActiveBrand(json.data[0]); // set first brand as default active
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading brands...</p>;
  }

  return (
    <section className="our-brands sec-padding bg-grey mt-5">
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="global-heading-sec mt-5">
          <h2 className="global-heading text-center mt-5">Our Brands</h2>
        </div>
      </div>

      <div className="container">
        {/* Tabs (logos) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-1 mb-6">
          {brands.map((item) => (
            <button
              key={item.hotelBrandId}
              onClick={() => setActiveBrand(item)}
              className={`p-1 rounded-1 border-0 transition ${
                activeBrand?.hotelBrandId === item.hotelBrandId
                  ? 'border-blue-600 bg-white active-brand-logo-tab'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Image
                src={item.brandLogo}
                alt={item.hotelBrand}
                height={45}
                width={90}
                className="object-contain"
              />
            </button>
          ))}
        </div>

        {/* Active brand details */}
        {activeBrand && (
          <div className="brand-slider-item relative mt-3">
            <div className="brand-item-description text-white">
              <Image
                src={activeBrand.brandLogo}
                alt={activeBrand.hotelBrand}
                height={70}
                width={130}
                className="object-contain mb-3 active-brand-logo-bottom"
              />
              <p className="brand-description mb-4 text-white">{activeBrand.hotelBrandDesc}</p>
              <Link
                href={`/${activeBrand.brandSlug}`}
                className="btn btn-primary brand-explore-btn-page inline-flex items-center gap-2"
              >
                <span>Explore</span>
                <MoveRightIcon size={14} />
              </Link>
            </div>
            <Image
              src={activeBrand.brandLogoBg || '/images/fallback.jpg'}
              height={400}
              width={1000}
              alt={activeBrand.hotelBrand}
              className="object-cover brand-image-bg w-full rounded-md w-100"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandTabs;
