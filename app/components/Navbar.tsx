"use client";
import Link from "next/link";
import React, { useState } from "react";
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
  {
    title: "Contact",
    path: "/#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#ffffff0e] top-0 left-0 right-0 z-50 bg-[#1a2b3fef] ">
      <div className="flex container lg:py-6 flex-wrap items-center justify-between mx-auto px-10 py-2">
        <Link
          href={"/"}
          className="relative text-white font-thin h-6">
            [&apos;ʃuːʃkə]
          <img src={"/images/suska.png"} width={75} height={75} alt="Image" className="relative left-12 -top-12"></img>
        </Link>
        <div className="mobile-menu block md:hidden">
            {
                !navbarOpen ? (
                    <button onClick={() => setNavbarOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <Bars3Icon className="h-5 w-5 "></Bars3Icon>
                    </button>
                ) : (
                    <button onClick={() => setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <XMarkIcon className="h-5 w-5"></XMarkIcon>
                    </button>
                )
            }

        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {
                navLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink href={link.path} title={link.title} />
                    </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks}/> :null}
    </nav>
  );
};

export default Navbar;