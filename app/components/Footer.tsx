import React from "react";

const Footer = () => {
  return (
<footer className="footer bg-[#1a2b3f00] py-6 text-center font-thin">
  <h1 className="opacity-50">Copyright © 2024 Filip Suska.</h1>
  <h1 className=" opacity-25"> All rights reserved.  </h1>
  <div className="mt">
    <img src={"/images/suska.png"} width={100} height={100} alt='Image' className="mx-auto" />
  </div>
  {/* <h2 className="">
    ['ʃuːʃkə]
  </h2> */}
</footer>
  );
};

export default Footer;