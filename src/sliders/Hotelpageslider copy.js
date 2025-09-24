'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Hotelpageslider() {
  const allHotels = [
    {
      img: '/images/room/premium_room.png',
      title: 'The Taj Mahal Palace, Mumbai',
      text: 'Marvel at the seamless blend of historical opulence...',
      city: 'Mumbai',
      category: 'Palaces',
    },
    {
      img: '/images/room/premium_room.png',
      title: 'Taj Lake Palace, Udaipur',
      text: 'Float into a dream on Udaipur\'s Lake Pichola...',
      city: 'Udaipur',
      category: 'Palaces',
    },
    {
      img: '/images/room/premium_room.png',
      title: 'Luxury Beach Resort, Goa',
      text: 'Experience beachfront luxury in vibrant Goa...',
      city: 'Goa',
      category: 'Resorts',
    },
    // Add more hotel data with `city` and `category`
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredHotels = allHotels.filter(hotel => {
    const matchCity = hotel.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory ? hotel.category === selectedCategory : true;
    return matchCity && matchCategory;
  });

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Destination / City"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-400 py-2 text-lg focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border-b border-gray-400 py-2 text-lg bg-transparent focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Palaces">Palaces</option>
            <option value="Resorts">Resorts</option>
            <option value="Heritage">Heritage</option>
          </select>
        </div>
      </div>

      {/* Filtered Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 roomacomo hotellist gap-6">
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="winter-box hotel-box">
            <Image
              src={hotel.img}
              alt={hotel.title}
              className="w-100"
              width={350}
              height={220}
              quality={75}
            />

            <div className="winter-box-content shadow-sm pt-1">
              <div className="hotel-box-content">
                <h3 className="winter-box-heading">{hotel.title}</h3>
              </div>
              <p className="display-block">{hotel.text}</p>
              <div className="winter-box-btn flex justify-between items-center">
                <div className="flex">
                  <a href="#" className="box-btn know-more">
                    Know More
                  </a>
                  <a href="#" className="box-btn book-now">
                    Enquire Now
                  </a>
                </div>
                <a href="#" className="text-black text-[10px] underline">MORE</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No hotels match your filters.</div>
      )}
    </div>
  );
}
