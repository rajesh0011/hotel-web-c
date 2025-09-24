"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function ManageBookingPageComponent({ onSubmit }) {
  const [cityList, setCityList] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [propertyList, setPropertyList] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);

  // --- Helpers ---
  const encodeBase64 = (val) => {
    try {
      if (!val && val !== 0) return "";
      return typeof window !== "undefined" ? window.btoa(String(val)) : "";
    } catch {
      return "";
    }
  };

  const selectedProperty = useMemo(
    () => propertyList.find((p) => String(p.propertyId) === String(selectedPropertyId)),
    [propertyList, selectedPropertyId]
  );

  const manageCode = useMemo(() => {
    if (!selectedProperty) return "";
    return (
      selectedProperty.manageProperyCode ||
      encodeBase64(selectedProperty.staahPropertyId || "")
    );
  }, [selectedProperty]);

  const manageUrl = useMemo(() => {
    if (!manageCode) return "";
    return `https://staahmax.staah.net/be/myaccount.php?propertyId=${encodeURIComponent(
      manageCode
    )}&hidesearch=1`;
  }, [manageCode]);

  // --- Fetch City list (once) ---
  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityAndPropertyTypeList`
        );
        const data = await res.json();
        if (data?.errorCode === "0" && Array.isArray(data.data) && data.data[0]?.cityList) {
          setCityList(data.data[0].cityList);
        } else {
          setCityList([]);
        }
      } catch (e) {
        console.error("Error fetching cities:", e);
        setCityList([]);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, []);

  // --- Fetch properties for selected city (and auto-select first property) ---
  useEffect(() => {
    const fetchProps = async () => {
      if (!selectedCityId) {
        setPropertyList([]);
        setSelectedPropertyId("");
        return;
      }
      setLoadingProps(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityWithProperty?CityId=${selectedCityId}`
        );
        const data = await res.json();
        const list = data?.errorCode === "0" ? data?.data?.[0]?.propertyData || [] : [];
        list.sort((a, b) => (a.propertyName || "").localeCompare(b.propertyName || ""));
        setPropertyList(list);
        // Auto-select first property
        setSelectedPropertyId(list.length ? String(list[0].propertyId) : "");
      } catch (e) {
        console.error("Error fetching properties:", e);
        setPropertyList([]);
        setSelectedPropertyId("");
      } finally {
        setLoadingProps(false);
      }
    };
    fetchProps();
  }, [selectedCityId]);

  // --- Handlers ---
  const handleManageBookingClick = (e) => {
    if (!selectedPropertyId) {
      e.preventDefault();
      return;
    }

    if (!manageUrl) {
      // Prevent navigation and show fallback message
      e.preventDefault();
      setShowFallbackMessage(true);
    } else {
      setShowFallbackMessage(false);
    }
  };

  return (
    <>
    <div className="winter-sec main-hotel-page-filter mb-5">
      <div className="row justify-content-center">
        {/* City selector */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Select City</label>
          <select
            className="form-select rounded-0"
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            disabled={loadingCities || !cityList.length}
          >
            <option value="">-- Choose a city --</option>
            {cityList.map((c) => (
              <option key={c.cityId} value={c.cityId}>
                {c.cityName}
              </option>
            ))}
          </select>
          {loadingCities && <div className="text-muted small mt-1">Loading cities…</div>}
        </div>

        {/* Property selector */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Select Property</label>
          <select
            className="form-select rounded-0"
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            disabled={!selectedCityId || loadingProps || propertyList.length === 0}
          >
            <option value="">
              {selectedCityId ? "-- Choose a property --" : "Select a city first"}
            </option>
            {propertyList.map((p) => (
              <option key={p.propertyId} value={p.propertyId}>
                {p.propertyName}
              </option>
            ))}
          </select>
          {loadingProps && <div className="text-muted small mt-1">Processing</div>}
        </div>
      </div>

      {/* CTA always visible */}
      <div className="d-flex flex-column align-items-center justify-content-center mt-3 text-center">
        <a
          href={manageUrl || "#"}
          onClick={handleManageBookingClick}
          className={`btn btn-primary bg-black manage-booking-btn-page ${!selectedPropertyId ? "disabled" : ""}`}
          target={manageUrl ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          Manage Booking
        </a>

        {/* Fallback message if no manageCode */}
        {showFallbackMessage && (
          <div className="bg-black mt-3 text-start text-white p-4">
            <p className="text-white">
              To cancel your booking for this property, please contact our Central Reservations team directly:
            </p>
            <p className="text-white">
              📞 Contact Number:{" "}
              <a href="tel:+919717170578" className="text-white text-decoration-none">
                +91 97171 70578
              </a>
            </p>
            <p className="text-white">
              📧 Email:{" "}
              <a
                href="mailto:centralreservations@theclarkshotels.com"
                className="text-white text-decoration-none"
              >
                centralreservations@theclarkshotels.com
              </a>
            </p>
            <p className="text-white">We’ll be happy to assist you with your request.</p>
          </div>
        )}
      </div>
    </div>

     <style jsx>{`
      .manage-booking-btn-page,
      .manage-booking-btn-page:hover,
      .manage-booking-btn-page:focus {
        transition: background-color 0.3s ease;
        background-color: black;
        color: white;
        
      }
    `}</style>
    </>
  );
}
