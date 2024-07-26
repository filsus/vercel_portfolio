"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./Navlink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "About",
    path: "/#about",
  },
  {
    title: "Showreel",
    path: "/#showreel",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageAnimate, setImageAnimate] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (scrollY > 200) {
      setImageAnimate(true);
      setTextVisible(true); // Delay text visibility after image animation
    } else {
      setImageAnimate(false);
      setTextVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<nav className={`fixed mx-auto border border-[#ffffff0e] top-0 left-0 right-0 z-50 transition-all
      ${navbarOpen ? 'bg-[#1a2b3fef] opacity-100 duration-0' : scrolled ? 'bg-[#1a2b3fef] opacity-100 duration-500' : 'bg-transparent opacity-75 duration-500'}`}>
      <div className="flex container lg:py-6 flex-wrap items-center justify-between mx-auto px-10 py-2">
        <Link href="/" className={`relative text-white font-thin h-6 ${imageAnimate ? 'animate-from-left' : ''}`}>
          <span className={`transition-opacity duration-500 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>[&apos;ʃuːʃkə]</span>
          <img src="/images/suska.png" width={75} height={75} alt="Image" className={`relative left-12 -top-12 transition-transform duration-500 ${imageAnimate ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`} />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button onClick={() => setNavbarOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <Bars3Icon className="h-5 w-5 " />
            </button>
          ) : (
            <button onClick={() => setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar" >
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0" >
            {navLinks.map((link, index) => (
              <li key={index} >
                  <NavLink
                  href={link.path}
                  title={link.title}
                  onClick={() => setNavbarOpen(false)} // Close navbar on link click
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} onClick={() => setNavbarOpen(false)}/> : null}
    </nav>
  );
};

export default Navbar;