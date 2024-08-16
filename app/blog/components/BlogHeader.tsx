// components/Card.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogHeader: React.FC = () => {
  return (
    <Link  href={"/blog"}>
    <div className="text-center ">
           <Link href={"/blog"}><img src={"/images/suska.png"} width={150} height={150} alt='Image' className="mx-auto hover:scale-[1.05] opacity-50" /></Link>
           <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 mb-12">
          BLOG
          </span>
            <h3 className="text-[#6b7175] text-base sm:text-lg mb-6 lg:text-xl">Nuke | Pipeline | ML</h3>
    </div>
    </Link>
  );
};

export default BlogHeader;