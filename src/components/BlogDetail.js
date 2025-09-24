"use client";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/styleblog.css";

export default function BlogDetail({ blog, relatedBlogs }) {
  return (
    <>
      <section className="banner-section-blog mb-5 no-image-bg">
          <Image src={blog.image_url || "/images/banner_img.jpg"} alt={blog.title} width={2000} height={600} className="h-50 blog-banner-img w-100" />
      </section>

      <section className="blog-global-things">
        <div className="container">
          <h1 className="m-3 inner-hd text-center text-capitalize">{blog.title}</h1>
          <div className="blog-detail-page">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-detail">
                  <Image src={blog.image_url} alt={blog.title} width={800} height={400} className="w-100" />
                  <h2 className="blog-detail-main-title">{blog.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} className="blog-detail-description" />
                </div>

                {relatedBlogs && relatedBlogs.length > 0 && (
                  <div className="blog-related-post mt-5">
                    <h3 className="blog-related-post-title inner-hd text-center text-uppercase">Related Posts</h3>
                    <div className="row blog-related-post-list mt-4">
                      {relatedBlogs.map((item) => (
                        <div key={item.id} className="col-md-4">
                          <div className="blog-related-post-list-item">
                            <Link href={`/blog/${item.urlslug}`} className="blog-related-post-list-item-link no-image-bg">
                              <Image src={item.image_url} alt={item.title} width={500} height={300} className="w-100" />
                              <h6>{item.title}</h6>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-4">
                  <div className="blog-list-sidebar-box-fixed">
                    <ContactForm />
                    <div className="blog-list-sidebar">
                      <ul className="blog-list-sidebar-ul">
                        {relatedBlogs?.map((item) => (
                          <li key={item.id} className="blog-list-sidebar-li">
                            <FontAwesomeIcon icon={faDotCircle} />
                            <Link href={`/blog/${item.urlslug}`} className="blog-list-link">
                              {item.title}
                            </Link>
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
    </>
  );
}
