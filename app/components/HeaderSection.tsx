"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeaderSection = () => {
  const handleClick = (e, href) => {
    const url = window.location.href
    console.log(url)
    if (url.includes('#') || !url.includes('/blog')) {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); // remove '/#'
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop -100,
          behavior: 'smooth',
        });
      }
    }}    
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center lg:text-left justify-self-start z-10 py-12"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500"
>
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Filip",
                2000,
                "Nuke Compositor",
                1000,
                "Pipeline TD",
                1000,
                "AI/ML Developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            from Slovakia. Based in UK/Europe.
          </p>
     <div>
            <Link
              href="/#showreel"
              onClick={(e) => handleClick(e, '/#showreel')}
              className="px-6 inline-block py-3 w-fit sm:w-fit rounded-full mr-4 bg-gradient-to-br from-green-600 to-blue-500 hover:bg-slate-200 text-white"
            >
              Watch Latest Showreel
            </Link>
            <Link
              href="/#contact"              
              className="px-1 inline-block py-1 w-fit sm:w-fit rounded-full bg-gradient-to-br from-green-600 to-blue-500 hover:bg-slate-800 text-white mt-3"
              onClick={(e) => handleClick(e, '/#contact')}
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Connect!
              </span>
            </Link>        
          </div>
      <div>
      </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="place-self-center mt-4 lg:mt-20">
          <div className="rounded-full md:bg-[#0385ff23] lg:bg-[#0385ff23] sm:bg-[#0385ff23] w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] md:h-[500px] md:w-[500px] relative translate-x-14">
            <img
              src={"/images/profile.png"}
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
              width={2000}
              height={2000}
            />
          </div>
        </motion.div>
    </div>
    <div className="flex justify-center items-center mt-4 py-4"><img src={"/images/scroll.gif"} alt="My Gif" className="w-16 h-16 sm:w-16 sm:h-16 lg:w-24 lg:h-24 md:w-20 md:h-20 justify-end relative bg-no-repeat" /></div>     
    <div className="flex justify-center">        
    <p className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6 py-24 max-w-5xl mx-auto text-justify leading-relaxed">
            I have <span className="font-bold text-gray-200">4+ years</span> of professional experience in the <span className="font-bold text-gray-200">VFX industry</span>, working extensively in high-end film, TV, commercial post-production, and indie films.
            I specialize in <span className="font-bold text-gray-200">digital Nuke compositing</span> and pipeline development using <span className="font-bold text-gray-200">Python</span>. I have a deep understanding of data flow in a VFX studio, from initial ingest to final delivery, and can provide
            custom solutions to streamline and automate workflows for both production and artists. I am passionate about using <span className="font-bold text-gray-200">machine learning</span> in VFX to eliminate mundane tasks and enhance creativity.
        </p>
    </div>
    </section>
  );
};

export default HeaderSection
