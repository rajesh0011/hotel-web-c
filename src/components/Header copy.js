'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
 import "@/styles/header.css"; 
 import "@/styles/globals.css"; 
  import "@/styles/style.css"; 

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const brand_slug = "citypage/";

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  if (!hasMounted) return null; // Prevent mismatch during hydration

  return (
    <header>
      <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isScrolled ? 'navbar-scroll bg-white shadow-sm' : ''}`}>
        <div className="container-fluid">

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`} id="navbarNav">
  <div className="mx-auto d-flex flex-column flex-md-row align-items-center">
    <ul className="navbar-nav">

              <li className="nav-item"><Link className="nav-link" href={`/${brand_slug}`}>Our Hotels</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#">Our Brands</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#">Brand Association</Link></li>
              <li>          <Link href="/">
           <Image
    src="/images/logo.png" // Replace with your logo path
    alt="Logo"
    width={305}      // Adjust as needed
    height={50}
    priority
  />
  </Link></li>
              <li className="nav-item"><Link className="nav-link" href="#contact">Clarks Offers</Link></li>
              <li className="nav-item"><Link className="nav-link" href="#blog">Contact Us</Link></li>
            <li className="nav-item mt-3 ms-5"><a href="#" className="box-btn know-more">Book Now</a></li>
            </ul>
          </div>
         </div>
        </div>
      </nav>
    </header>
  );
}
