"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center sm:text-center lg:text-left justify-self-start z-10"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 "
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
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-green-600 to-blue-500 hover:bg-slate-200 text-white"
            >
              Watch Latest Showreel
            </Link>
            <Link
              href="/#contact"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-green-600 to-blue-500 hover:bg-slate-800 text-white mt-3"
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
          className="place-self-center mt-4 lg:mt-20 top-24"
        >
          <div className="rounded-full bg-[#0385ff23] w-[400px] h-[400px] lg:w-[1000px] lg:h-[1000px] md:h-[500px] md:w-[500px] relative">
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
    <div className="flex justify-center items-center mt-4 py-4"><img src={"/images/scroll.gif"} alt="My Gif" className="w-24 h-24 justify-end relative bg-no-repeat" /></div>     
    <div className="flex justify-center">        
              <p className="text-[#c5d0d8] text-base sm:text-lg mb-6 py-24 max-w-5xl lg:text-xl text-justify">
  With over 4+ years of experience in the VFX industry, I strive to blend artistic creativity with technical expertise. Beginning my career as a Digital VFX Compositor,
   I&apos;ve worked extensively in high-end Film & TV as well as commercial post-production. 
   On the technical front, my focus lies in Pipeline Development and custom 2D tool creation, 
   supporting both artists and production teams while streamlining the overall workflow. I possess a comprehensive understanding of the workflow from initial client data ingestion through to final delivery.
    Fascinated by the integration of AI and Machine Learning in VFX, I pursued a Master&apos;s degree to explore these technologies further in my personal projects with the aspiration to apply the knowledge in real production scenarios.
</p></div>
    </section>
  );
};

export default HeaderSection
