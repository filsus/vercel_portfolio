"use client";
import { motion, animate, useMotionValue } from "framer-motion";
import Card from "./Card";
import useMeasure from "react-use-measure"
import { useEffect, useState } from "react";

export default function FilmSection() {
    const images = [
      '/images/posters/anezka.png',
      '/images/posters/bcs.png',
      "/images/posters/civil_war.png",
      "/images/posters/homo_verum.png",
      "/images/posters/ldr.png",
      "/images/posters/lotr.png",
      "/images/posters/outlander.png",
      "/images/posters/tlm.png",
      "/images/posters/bos.png",
      "/images/posters/nau.png",
    ];
    const FAST_DURATION = 25;
    const SLOW_DURATION = 75;
  
    const [duration, setDuration] = useState(FAST_DURATION);
    let [ref, { width }] = useMeasure();
  
    const xTranslation = useMotionValue(0);
  
    const [mustFinish, setMustFinish] = useState(false);
    const [rerender, setRerender] = useState(false);
  
    useEffect(() => {
      let controls;
      let finalPosition = -width / 2 - 8;
  
      if (mustFinish) {
        controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
          ease: "linear",
          duration: duration * (1 - xTranslation.get() / finalPosition),
          onComplete: () => {
            setMustFinish(false);
            setRerender(!rerender);
          },
        });
      } else {
        controls = animate(xTranslation, [0, finalPosition], {
          ease: "linear",
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
      }
      const stopAnimation = () => {
        if (controls) {
          controls.stop();
        }
      };
    }, [rerender, xTranslation, duration, width]);
  
    return (
      <section 
      className="relative overflow-hidden py-20 bg-no-repeat"
      id= 'filmography'
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% + 48rem)'
      }}>
      <div className="text-center">
        <h1 className="text-2xl sm:text-2xl lg:text-4xl lg:leading-normal font-extrabold" >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
          FEATURE FILMS/SERIES
          </span>
        </h1>
        <h2 className="text-[#ADB7BE] text-base sm:text-lg mb-12 py-4 lg:text-xl">Feature Films and TV Series I&apos;ve Contributed to with Incredible VFX Teams.</h2>
      </div>
      <div className="h-[400px] bg-no-repeat ">  
        <motion.div
          className="absolute left-0 flex gap-8 bg-no-repeat"
          style={{ x: xTranslation }}
          ref={ref}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          {[...images, ...images].map((item, idx) => (
            <Card image={`${item}`} key={idx} />
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial-circle bg-blend-multiply "></div>
    </section>
    );
  }