"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createSignature } from "../../utilities/signature";
import { BookingEngineProvider } from "../cin_context/BookingEngineContext";
import { useRouter } from "next/navigation";

const HomePage = dynamic(() => import("../HomePage/page"), { ssr: false });

export default function ClientWrapper() {
  const searchParams = useSearchParams();
  const [tokenKey, setTokenKey] = useState(null);
  const [status, setStatus] = useState(null);
  const [contentData, setContentData] = useState([]);
   //   const [sessionData, setSessionData] = useState(null);

  const router = useRouter();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       //const selectedPropertyId = "51757";
  //       const hotelIds = [
  //         // 24072, 51330, 23372, 54985, 52855, 22324, 22992, 23219, 22741, 24728,
  //         // 23022, 22202, 22142, 22222, 22991, 23344, 22172, 22194, 23343, 22162,
  //         // 22178, 22386, 23064, 22134, 22122, 22911,
  //         22165,
  //         22651, 22095, 24058, 26979, 51496, 22114, 22314, 22821,
  //       ];
  //       // const selectedPropertyId = "25950";
  //       const selectedPropertyId = hotelIds.join(",");
  //       const timestamp = Date.now().toString();
  //       const secret = "ABDEFGHJKLMOPQRSTUVWXYZ123456789";
  //       const signature = await createSignature(
  //         JSON.stringify(selectedPropertyId),
  //         timestamp,
  //         secret
  //       );

  //       const response = await fetch(
  //         "https://cinbe.cinuniverse.com/api/cin-api/content",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "x-timestamp": timestamp,
  //             "x-signature": signature,
  //           },
  //           body: JSON.stringify({ selectedPropertyId }),
  //         }
  //       );
  //       const res = await response.json();
  //       sessionStorage.setItem("contentData", JSON.stringify(res));
  //       setContentData(res || []);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    if (window.location.hash) {
      router.replace(window.location.pathname); 
    }
  }, [router]);
  // useEffect(() => {
  //   const sesData = sessionStorage?.getItem("cityDropDown");
  //  // setSessionData(sesData);
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/property/GetCityList`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const res = await response.json();

  //       const cityDropDown = [];

  //       res?.data?.forEach((property) => {
  //         const label = property.cityName;
  //         const value = property.cityId;

  //         cityDropDown.push({ label, value });
  //       });

  //       //  setPropertyDropDown(propDropDown);
  //       //  setDestination(selectedLabel);
  //       //  setSelectedHotelName(selectedHotel);
  //       sessionStorage.setItem("cityDropDown", JSON.stringify(cityDropDown));
  //       // setContentData(res || []);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   debugger;
  //   if(!sesData){
  //   fetchData();
  //   }
  // }, []);
  useEffect(() => {
    const token = searchParams.get("tokenKey");
    const stat = searchParams.get("status");
    setTokenKey(token);
    setStatus(stat);
  }, [searchParams]);
  // return (
  //   <BookingEngineProvider>
  //     <HomePage contentData={contentData} tokenKey={tokenKey} status={status} />
  //   </BookingEngineProvider>
  // );

  return (
    <HomePage contentData={contentData} tokenKey={tokenKey} status={status} />
  );
}
