"use client";
import { motion, animate, useMotionValue } from "framer-motion";
import Card from "./Card";
import useMeasure from "react-use-measure"
import { useEffect, useState } from "react";

export default function FilmSection() {
  const images = [
    { src: '/images/posters/anezka.png', link: 'https://www.imdb.com/title/tt10502770/' },
    { src: '/images/posters/bcs.png', link: 'https://www.imdb.com/title/tt3032476/' },
    { src: '/images/posters/civil_war.png', link: 'https://www.imdb.com/title/tt17279496/' },
    { src: '/images/posters/homo_verum.png', link: 'https://www.imdb.com/title/tt14552246/' },
    { src: '/images/posters/ldr.png', link: 'https://www.imdb.com/title/tt20193098/' },
    { src: '/images/posters/lotr.png', link: 'https://www.imdb.com/title/tt7631058/' },
    { src: '/images/posters/outlander.png', link: 'https://www.imdb.com/title/tt3006802/' },
    { src: '/images/posters/tlm.png', link: 'https://www.imdb.com/title/tt5971474/' },
    { src: '/images/posters/bos.png', link: 'https://www.imdb.com/title/tt15435876/' },
    { src: '/images/posters/nau.png', link: 'https://www.imdb.com/title/tt15286302/' },
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
      className="relative overflow-hidden py-12 bg-no-repeat"
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
      <div className="sm:h-[150px] md:h-[300px] lg:h-[400px]  h-[150px] bg-no-repeat">  
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
            <Card image={`${item.src}`} key={idx} imagelink={item.link}/>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial-circle bg-blend-multiply "></div>
    </section>
    );
  }