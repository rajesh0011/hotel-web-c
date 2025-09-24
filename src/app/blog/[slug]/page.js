// "use client";
// import React, { useState, useRef, useEffect } from "react";
import {
  fetchBlogDetail,
  fetchCategoryBlogs,
  fetchBlogList,
} from "@/app/api/blogs";
import BlogDetail from "@/components/BlogDetail";
import BlogCategory from "@/components/BlogCategory";
import Header from "@/components/Header";
import FooterPage from "@/components/Footer";
//import { getUserInfo } from "../../../utilities/userInfo";

export const dynamicParams = true; // Enable SSR for dynamic paths

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  
  // const { slug } = params;
  const rawSlug = params.slug; // e.g., "my-blog.html"
  const slug = rawSlug.replace(/\.html$/, ""); // Remove .html

  try {
    const blog = await fetchBlogDetail(slug);
    if (blog) {
      return {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.short_description,
        alternates: {
          canonical: `${rawSlug}`,
        },
      };
    }

    const categoryBlogs = await fetchCategoryBlogs(slug);
    if (categoryBlogs && categoryBlogs.length > 0) {
      const categoryName = categoryBlogs[0].category_name || slug;
      return {
        title: `${categoryName} Blogs`,
        description: `Explore blogs under the ${categoryName} category.`,
        alternates: {
          canonical: `${rawSlug}`,
        },
      };
    }
  } catch {}
    return {
    title: "Clarks Hotels and Resorts",
    description: "Clarks Hotels and Resorts",
  };
}

 

// Page rendering
export default async function SlugPage({ params }) {
  
      // const filterBarRef = useRef(null);
      // const [isOpenFilterBar, openFilterBar] = useState(false);
      // const [isOpen, setOpen] = useState(false);
      
      //  async function postBookingWidged(rooms,mapping, isClose,ctaName,selectedPropertyId) {
      //   const resp = await getUserInfo();
      //     const sessionId = sessionStorage?.getItem("sessionId");
      //     const payload = {
      //     ctaName: ctaName,
      //     urls: window.location.href,
      //     cityId: 0,
      //     propertyId: selectedPropertyId ? parseInt(selectedPropertyId) :0,
      //        checkIn: "",
      //        checkOut: "",
      //     adults: 0,
      //     children: 0,
      //     rooms: 0,
      //     promoCode: "",
      //     ip: resp?.ip,
      //     sessionId: sessionId,
      //     deviceName: resp?.deviceInfo?.deviceName,
      //     deviceType: resp?.deviceInfo?.deviceOS == "Unknown" ? resp?.deviceInfo?.platform : resp?.deviceInfo?.deviceOS,
      //     roomsName: rooms?.RoomName,
      //     packageName: mapping?.MappingName,
      //     isCartOpen: mapping?.MappingName ? "Y": "N",
      //     isCartEdit: "N",
      //     isCartClick: "N",
      //     isClose: isClose ? "Y" : "N",
      //    }
      //       const response = await fetch(
      //         `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/Api/tracker/BookingWidged`,
      //         {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify( payload ),
      //         }
      //       );
      //       const res = await response?.json();
      
      //     //console.log("res BookingWidged",res);
      //   }
  const rawSlug = params.slug;
  const slug = rawSlug.replace(/\.html$/, "");

  let blog = null;
  try {
    blog = await fetchBlogDetail(slug);
  } catch {}

  if (blog) {
    const allBlogs = await fetchBlogList();
    const relatedBlogs = allBlogs.filter(
      (item) => item.category_id === blog.category_id && item.id !== blog.id
    );

    
  // const handleBookNowClick = async () => {
  //   if(isOpen){
  //     postBookingWidged("","", true,"Widget Closed");
  //   }else{
  //     postBookingWidged("","", false,"Widget Open");
  //   }
  //   if (filterBarRef.current) {
  //     filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //     const firstInput = filterBarRef.current.querySelector("input, select, button");
  //     if (firstInput) firstInput.focus();
  //   }
  //   setOpen(!isOpen);
  //   openFilterBar(!isOpenFilterBar);
  // };

    return (
      <>
       {/* <Header  onSubmit={handleBookNowClick}></Header> */}
       <Header></Header>
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
        <FooterPage></FooterPage>
      </>
    );
  }

  let categoryBlogs = [];
  try {
    categoryBlogs = await fetchCategoryBlogs(slug);
  } catch {}

  if (categoryBlogs && categoryBlogs.length > 0) {
    return (
      <>
        <Header></Header>
        <BlogCategory slug={slug} blogs={categoryBlogs} />
        <FooterPage></FooterPage>
      </>
    );
  }

  return <div>Not Found</div>;
}