// /app/blog/BlogCard.tsx
"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MarkdownIt from 'markdown-it';
interface SummaryProps {
  date: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

const Summary: React.FC<SummaryProps> = ({ date, title, excerpt, image, slug }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/blog/${slug}`);
  };
  const mobileExcerpt = excerpt.slice(0, excerpt.length / 2) + '...';

  return (
<div onClick={handleReadMore} className="cursor-pointer text-center hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-[1.01]">
  <div className="rounded-t-lg relative h-32 sm:h-32 md:h-64 lgh-64">
    <Image
      src={image}
      alt={title}
      layout="fill"
      objectFit="contain"
      className="rounded-t-lg"
    />
  </div>
  <div className="rounded-b-lg mb-4 px-4 md:px-2 md:py-4">
      <h2 className="text-3xl font-semibold mt-6 text-gray-100">{title}</h2>
      <p className="text-gray-400 text-sm mt-2">{date}</p>
      <div className="text-gray-300 mt-4 text-justify px-4 leading-relaxed">
        <div className="block md:hidden" dangerouslySetInnerHTML={{ __html: mobileExcerpt }} />
        <div className="hidden md:block" dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
      <button className="text-orange-200 mt-6 hover:text-orange-400 font-semibold">Read More</button>
    </div>
</div>

  );
  
};

export default Summary;
