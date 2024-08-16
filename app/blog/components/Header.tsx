// components/Header.tsx
"use client"
import { FaGithub, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface HeaderProps {
    links: { github?: string; nukepedia?: string };
    nextPostSlug?: string | null; // Add nextPostSlug prop
  }

const Header: React.FC<HeaderProps> = ({ links, nextPostSlug }) => {
    const nextPostPath = nextPostSlug ? `/blog/${nextPostSlug}` : '#';
  return (
    <header className="flex justify-between items-center p-4 py-8 border-b-4 border-orange-400 border-opacity-40">
      <div className="flex items-center space-x-4 ">
        <Link href={'/blog'} className="flex items-center text-blue-400 hover:opacity-100 opacity-50">
            <FaArrowLeft className="mr-2" /> Go Back
        </Link >
      </div>
      <div className="flex items-center space-x-4 ">
        <span className='text-orange-400 opacity-75'>Available on:</span>
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-6 h-6 hover:opacity-50" />
        </a>
        <a href={links.nukepedia} target="_blank" rel="noopener noreferrer">
          <img src="/images/nukepedia.png" alt="Nukepedia" className="w-6 h-6 hover:opacity-50" />
        </a>
      </div>
      <Link href={nextPostPath} className="flex items-center text-blue-400 hover:opacity-100 opacity-50">
            Go to Next Post <FaArrowRight className="ml-2" />
        </Link>
    </header>
  );
};

export default Header;
