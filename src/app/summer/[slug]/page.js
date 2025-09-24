
// app/summer/[slug]/page.js
import Header from "@/components/Header";
import PropertyListClient from "./PropertyListClient";
import { notFound } from "next/navigation";
import FooterPage from "@/components/Footer";
import ClientHeader from "./ClientHeader";
// import { useState } from "react";
// import { BookingEngineProvider } from "@/app/cin_context/BookingEngineContext";
// import FilterBar from "@/app/cin_booking_engine/Filterbar";

async function getPropertiesBySeasonalCategoryId(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetPropertyByFilter?SeasonalCategoryId=${id}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return json.errorCode === "0" ? json.data : [];
  } catch (err) {
    console.error("Error fetching property data:", err);
    return [];
  }
}

export default async function SummerPage({ params, searchParams }) {
  const { slug } = params;
  const seasonalCategoryId = searchParams?.id;
  // const [showFilterBar, setShowFilterBar] = useState(false);
  // const [propertyId, setPropertyId] = useState(null);
  // const [cityDetails, setCityDetails] = useState(null);
  // const [isOpenFilterBar, openFilterBar] = useState(false);

  if (!seasonalCategoryId) return notFound();

  const properties = await getPropertiesBySeasonalCategoryId(
    seasonalCategoryId
  );

  // const handleRoomBookNow = async (property) => {
  //   setOpen(!isOpen);
  //   setPropertyId(property.staahPropertyId);
  //   setCityDetails({
  //     label: property.cityName || "",
  //     value: property.cityId || "",
  //     property_Id: property.staahPropertyId || null,
  //   });
  //   openFilterBar(!isOpenFilterBar);
  //   setShowFilterBar(!showFilterBar);
  // };

  // const handleBookNowClick = async () => {
  //   const data = "";
  //   console.log("data", data);
  // };
  return (
    <>
      {/* <Header /> */}
      <ClientHeader />
      <div className="banner-beta-one banner hide-in-mob-new-summer">
        <img
          className="w-100"
          src="/images/banner_img.png"
          alt="Summer Banner"
          width={1920}
          height={350}
        />
      </div>

      <section className="py-5 margin-in-mob-new-summer">
        <div className="container">
          <h2 className="text-center mb-4 text-capitalize">
            {slug.replace(/-/g, " ")} Hotels
          </h2>

          {/* ✅ Pass data to client */}
          <PropertyListClient properties={properties} />
        </div>
        {/* {showFilterBar && (
          <BookingEngineProvider>
            <FilterBar
              selectedProperty={parseInt(cityDetails.property_Id)}
              cityDetails={cityDetails}
              openBookingBar={isOpenFilterBar}
              onClose={() => {
                openFilterBar(false);
                //setOpen(false);
                setShowFilterBar(false);
              }}
            />
          </BookingEngineProvider>
        )} */}
      </section>

      <FooterPage />
    </>
  );
}
