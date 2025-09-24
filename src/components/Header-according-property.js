'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

import "@/styles/header.css"; 
import "@/styles/globals.css"; 
import "@/styles/style.css"; 
//import Script from "next/script";

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!hasMounted) return null;

  if (pathname === "/") {
    return <Sidebar isOpen={true} forceOpen={true} />;
  }

  return (
    <>
    {/* <Script
        id="mouseflow"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._mfq = window._mfq || [];
            (function() {
              var mf = document.createElement("script");
              mf.type = "text/javascript"; 
              mf.defer = true;
              mf.src = "//cdn.mouseflow.com/projects/3e544652-5cd1-4b67-b0fb-f35209e0a610.js";
              document.getElementsByTagName("head")[0].appendChild(mf);
            })();
          `,
        }}
      /> */}
    <header>
      <Sidebar
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        forceOpen={pathname === "/"}
      />

      <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isScrolled ? 'navbar-scroll bg-white shadow-sm' : ''}`}>
        <div className="container-fluid">

          <button
            className="navbar-toggler d-md-none"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`} id="navbarNav">
            {/* ✅ Close icon shown at top right in mobile menu */}
            <div className="d-md-none w-100 text-end pe-3 mt-2">
              <button
                onClick={() => setMenuOpen(false)}
                className="btn-close"
                aria-label="Close"
                style={{
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  color: "#000"
                }}
              >
                ✕
              </button>
            </div>

            <div className="mx-auto d-flex flex-column flex-md-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" href="/citypage">City Page</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/overview">overview</Link></li>
               <li className="nav-item"><Link className="nav-link" href="/overview">Gallery</Link></li>
                <li>
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
               <li className="nav-item"><Link className="nav-link" href="/Dine">Dine</Link></li>
               <li className="nav-item"><Link className="nav-link" href="/Room">Room</Link></li>
                <li className="nav-item mt-3 ms-5">
                  <a href="#" className="box-btn know-more">Book Now</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
