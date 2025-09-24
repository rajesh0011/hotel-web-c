import { useState, useEffect, useRef } from "react";

export default function useSelect() {
  // Static hotels list for Shirdi and Amritsar
  const hotels = [
    {
   hotel_name: "Clarks Hotel 1",
      city_name: "Delhi",
      synxis_id: "1234",
      reserve_pegsbe_url: "#",
      hotel_code: "SHD123",
    },
    {
      hotel_name: "Clarks Hotel 2",
      city_name: "Haridwar",
      synxis_id: "5678",
      reserve_pegsbe_url: "#",
      hotel_code: "AMR567",
    },
  ];

  const [options, setOptions] = useState([]);
  const [selectedHotelUrl, setSelectedHotelUrl] = useState("");
  const [hotelCode, setHotelCode] = useState("");
  const [defaultHotel, setDefaultHotel] = useState(null);

  // Set the options for dropdown based on the static hotel data
  useEffect(() => {
    const allOptions = [
      { label: "Select/Type a hotel or city", value: "" }, // Default option
      ...hotels.map((hotel) => ({
        label: `${hotel.hotel_name} (${hotel.city_name})`, // Hotel + City
        value: hotel.synxis_id, // Hotel ID as value
        type: "hotel", // Identify as hotel
      })),
      ...Array.from(new Set(hotels.map((hotel) => hotel.city_name))).map((city) => ({
        label: city, // City name
        value: city, // City value
        type: "city", // Identify as city
      })),
    ];

    setOptions(allOptions);

    // Set default hotel if provided
    if (defaultHotel) {
      setSelectedHotelUrl(defaultHotel.reserve_pegsbe_url || "");
      setHotelCode(defaultHotel.hotel_code || "");
    }
  }, [defaultHotel]);

  // Function to handle selection change
  const handleSelectChange = (selectedOption) => {
    const value = selectedOption?.value || "";
    const type = selectedOption?.type || "";
    if (type === "hotel") {
      // Find the selected hotel by its synxis_id
      const selectedHotel = hotels.find((hotel) => hotel.synxis_id === value);
      setSelectedHotelUrl(selectedHotel?.reserve_pegsbe_url || "");
      setHotelCode(selectedHotel?.hotel_code || "");
    } else if (type === "city") {
      // Find the first hotel in the selected city
      const selectedCityHotel = hotels.find((hotel) => hotel.city_name === value);
      if (selectedCityHotel) {
        setSelectedHotelUrl(selectedCityHotel?.reserve_pegsbe_url || "");
        setHotelCode(selectedCityHotel?.hotel_code || "");
      } else {
        // If no hotel in city is found, reset URL and code
        setSelectedHotelUrl("");
        setHotelCode("");
      }
    }
  };

  return {
    options,             // List of dropdown options
    selectedHotelUrl,    // URL of the selected hotel
    hotelCode,           // Selected hotel’s code
    handleSelectChange,  // Function to handle dropdown selection
    defaultHotel,
  };
}
