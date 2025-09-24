"use client";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/styleblog.css";
import Header from "./Header";

// Define dummy image fallback here as well for consistency
const dummyImage = "/alivaa-dummy-image.png"; // Make sure this path is correct

function stripHtml(html) {
  if (!html) return "";

  // Basic HTML entity decoding
  const entityMap = {
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '—',
    '&ndash;': '–',
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };

  // Replace known entities
  let decoded = html.replace(/&[a-zA-Z0-9#]+;/g, (match) => entityMap[match] || '');

  // Remove HTML tags
  decoded = decoded.replace(/<[^>]+>/g, "");

  // Replace special punctuation with space
  decoded = decoded.replace(/['’“”—]/g, " ");

  // Normalize spaces
  return decoded.replace(/\s+/g, " ").trim();
}

export default function BlogCategory({ slug, blogs }) {
  // It's good practice to add a defensive check here as well,
  // although your SlugPage should prevent `blogs` from being empty.
  if (!blogs || blogs.length === 0) {
    return <div>No blogs found for this category.</div>;
  }

  return (
    <>
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
            <h1 className="m-3 inner-hd text-center">Blog Category</h1>
            {/* You might want a title for the category here, e.g., <h1 className="m-3 inner-hd text-center">Category: {slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1> */}
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="col-md-6 mb-3">
                      <div className="blog-card-list no-image-bg">
                        <Image
                          // *** FIX HERE: Add fallback for image_url ***
                          src={blog.image_url || dummyImage}
                          height={350}
                          width={500}
                          alt={blog.title || 'Blog Post Image'} // Add fallback for alt text too
                          className="blog-list-image"
                        />
                        <div className="blog-list-content-box">
                          <Link href={`/${blog.urlslug}`} className="blog-list-title-link">
                            <h5 className="blog-list-title">{blog.title || 'Untitled Blog'}</h5> {/* Add fallback for title */}
                          </Link>
                          <p className="blog-category-and-date">
                            {blog.post_date || 'Unknown Date'} - <i>{blog.category_name || 'Uncategorized'}</i> {/* Add fallbacks */}
                          </p>
                          <p className="blog-list-desc">
                            {stripHtml(blog.description || '').slice(0, 120)}... {/* Add fallback for description */}
                          </p>
                          <Link href={`/${blog.urlslug}`} className="blog-list-link">Read more</Link>
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
                          <Link href={`/${blog.urlslug}`} className="blog-list-link">
                            {blog.title || 'Untitled Blog'} {/* Add fallback for title */}
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