'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const isHome = pathname === "/";
  const brand_slug = "citypage/";

  // Handle scroll for background effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (isHome && desktop) {
        setMenuOpen(true); // Always open on homepage desktop
      } else {
        setMenuOpen(false); // Collapsed elsewhere
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [pathname]);

  const toggleMenu = () => {
    if (!(isHome && isDesktop)) {
      setMenuOpen(prev => !prev);
    }
  };

  return (
    <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isScrolled ? 'navbar-scroll bg-white shadow-sm' : ''}`}>
      <div className="container-fluid">

        {/* Toggler (hidden on homepage desktop) */}
        {!(isHome && isDesktop) && (
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

        )}

        <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <div className="mx-auto d-flex flex-column flex-md-row align-items-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href={`/${brand_slug}`}>Our Hotels</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">Our Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">Brand Association</Link>
              </li>
              <li className="nav-item">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={305}
                    height={50}
                    priority
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#contact">Clarks Offers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#blog">Contact Us</Link>
              </li>
              <li className="nav-item mt-3 ms-5">
                <a href="#" className="box-btn know-more">Book Now</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
