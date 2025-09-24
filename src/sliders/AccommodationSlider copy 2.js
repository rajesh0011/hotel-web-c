"use client";

import React, { useEffect, useState } from "react";

export default function AccommodationSlider({ propertyId }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/rooms/GetRoomsByProperty?propertyId=${propertyId}`);
        const json = await res.json();

        if (json?.errorCode === "0" && Array.isArray(json.data)) {
          const allRooms = json.data
            .flatMap((item) => item.roomsInfo || [])
            .filter((room) => room.enabled === "E");
          setRooms(allRooms);
        } else {
          console.error("API error or no data");
          setRooms([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [propertyId]);

  if (loading) return <p>Loading rooms...</p>;

  if (!rooms.length) return <p>No rooms available.</p>;

  return (
    <div className="accommodation-slider">
      {rooms.map((room, index) => (
        <div key={index} className="room-card">
          <h3>{room.roomName}</h3>
          <p>{room.description}</p>
          {/* Show image if available */}
          {room.roomImages && room.roomImages[0] && (
            <img
              src={room.roomImages[0].imageUrl}
              alt={room.roomName}
              width={300}
            />
          )}
        </div>
      ))}
    </div>
  );
}
