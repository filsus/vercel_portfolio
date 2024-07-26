import React from 'react';
import Link from 'next/link';


const NavLink = ({ href, title, offset = -50, onClick }) => {
  
  const handleClick = (e) => {
    const url = window.location.href
    console.log(url)
    if (url.includes('#') || !url.includes('/blog')) {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); // remove '/#'
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop + offset,
          behavior: 'smooth',
        });
      }
    }}
    if (onClick) onClick(e);
  };

  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
      onClick={handleClick} // Add onClick here
    >
      {title}
    </Link>
  );
};

export default NavLink;
