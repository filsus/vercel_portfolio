import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";

interface CardProps {
  image: string;
  imagelink: string;  
}

const Card: React.FC<CardProps> = ({ image, imagelink }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden w-[135px] h-[199px] lg:h-[397px] lg:w-[270px] sm:w-[135px] sm:h-[199px] md:h-[300px] md:w-[200px] bg-slate-400 rounded-3xl flex justify-center items-center border-collapse"
      key={image}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* Hover overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-90 h-full w-full" />
            <motion.h1
              className="font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch]"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <Link href={imagelink}><span>See on IMDb</span></Link>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <img src={image} alt={image} style={{ objectFit: "cover" }}/>
    </motion.div>
  );
};

export default Card;