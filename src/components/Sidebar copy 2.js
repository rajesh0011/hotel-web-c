'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (isHome && desktop) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [pathname]);

  const toggleSidebar = () => {
    if (!(isHome && isDesktop)) {
      setOpen(prev => !prev);
    }
  };

  const closeSidebar = () => {
    if (!(isHome && isDesktop)) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Toggler button (hide on desktop homepage) */}
      {!(isHome && isDesktop) && (
        <button
          className="custom-sidebar-toggler"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Overlay */}
      {open && !(isHome && isDesktop) && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={clsx("custom-sidebar", {
          open,
          fullscreen: isHome && isDesktop,
          "horizontal-desktop": isHome && isDesktop,
        })}
      >
        {/* Close button */}
        {!isHome || !isDesktop ? (
          <div className="sidebar-header" style={{ textAlign: "right" }}>
            <button
              className="btn-close"
              onClick={closeSidebar}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ) : null}

        {/* Menu List - no map, manual items */}
        <ul
          className="menu-list"
          style={{
            listStyle: "none",
            padding: 0,
            display: isHome && isDesktop ? 'flex' : 'block',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          <li><Link href="/" onClick={closeSidebar}>Home</Link></li>
          <li><Link href="/overview" onClick={closeSidebar}>Hotels</Link></li>
          <li><Link href="/about-us" onClick={closeSidebar}>About Us</Link></li>
          <li><Link href="/offers" onClick={closeSidebar}>Offers</Link></li>
          <li><Link href="/gallery" onClick={closeSidebar}>Gallery</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
