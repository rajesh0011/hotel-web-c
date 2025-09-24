// "use client";
// import React, { useState, useRef, useEffect } from "react";
import { fetchBlogList } from "../api/blogs";
import ContactForm from "@/components/ContactForm";
import "@/styles/styleblog.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import FooterPage from "@/components/Footer";
//import { getUserInfo } from "../../utilities/userInfo";

const dummyImage = "/alivaa-dummy-image.png";

function stripHtml(html) {
  if (!html) return "";

  // Decode a limited set of common HTML entities
  const entityMap = {
    '&nbsp;': ' ',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '—',
    '&ndash;': '–',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&lt;': '<',
    '&gt;': '>'
  };

  // Replace HTML entities with their character equivalents
  let decoded = html.replace(/&[a-zA-Z0-9#]+;/g, (match) => entityMap[match] || '');

  // Remove all HTML tags
  decoded = decoded.replace(/<[^>]+>/g, '');

  // Collapse multiple spaces, newlines, tabs, etc. into a single space
  return decoded.replace(/\s+/g, ' ').trim();
}

export async function generateMetadata() {

  return {
    title: "Blogs | The Clarks Hotels &amp; Resorts",
    description: "The Clarks Hotels &amp; Resorts -",
    openGraph: {
      title: "Blogs | The Clarks Hotels &amp; Resorts",
      description: "Read the latest articles from The Clarks Hotels &amp; Resorts",
    },
    alternates: {
      canonical: "/blog",
    },
  };
}

export default async function BlogPage() {
  
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
  try {
    const blogs = await fetchBlogList();

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
       <Header></Header>

        <section className="banner-section main-blog-page-banner">
          <img
            src="/images/banner_img.png"
            alt="Hotels"
            className="banner-img pt-0"
          />
        </section>

        <section className="blog-global-things">
          <div className="container">
            <div className="blog-list">
              <h1 className="m-3 inner-hd text-center">Clarks Hotels Blog</h1>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="col-md-6 mb-3">
                        <div className="blog-card-list no-image-bg">
                          <Image
                            src={blog.image_url || dummyImage}
                            height={350}
                            width={500}
                            alt={blog.title}
                            className="blog-list-image"
                          />
                          <div className="blog-list-content-box">
                            <Link
                              href={`/blog/${blog.urlslug}`}
                              className="blog-list-title-link"
                            >
                              <h5 className="blog-list-title">{blog.title}</h5>
                            </Link>
                            {/* <p className="blog-category-and-date">{blog.post_date} - <i>{blog.category_name}</i></p> */}
                            <p className="blog-category-and-date">
                              {blog.post_date} -{" "}
                              <i>
                                <Link
                                  href={`/blog/${blog.category_slug}`}
                                  className="blog-category-link"
                                >
                                  {blog.category_name}
                                </Link>
                              </i>
                            </p>

                            {/* <p dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 150) + '...' }} className="blog-list-desc" /> */}

                            <p className="blog-list-desc">
                              <span>{stripHtml(blog.description)}</span>
                            </p>
                            <Link
                              href={`/blog/${blog.urlslug}`}
                              className="blog-list-link"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="blog-list-sidebar-box-fixed">
                      <ContactForm />
                      <div className="blog-list-sidebar">
                        <ul className="blog-list-sidebar-ul">
                          {blogs.map((blog) => (
                          <li key={blog.id} className="blog-list-sidebar-li"> 
                            <FontAwesomeIcon icon={faDotCircle} />
                            <Link href={`/blog/${blog.urlslug}`} className="blog-list-link">{blog.title}</Link>
                          </li>
                          ))}
                        </ul>
                      </div>
                    </div>
				  
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterPage></FooterPage>
      </>
    );
  } catch (error) {
    return <div>Error fetching blogs: {error.message}</div>;
  }
}