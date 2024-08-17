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
  <div className="flex items-center space-x-4">
    <Link href={'/blog'} className="flex items-center text-blue-400 hover:opacity-100 opacity-50">
      <FaArrowLeft className="mr-2" />
      <span className="hidden md:inline">Go Back</span> {/* Hide on mobile */}
    </Link>
  </div>
  <div className="flex items-center space-x-4">
    <span className='text-orange-400 opacity-75 hidden md:inline'>Available on:</span> {/* Hide on mobile */}
    <a href={links.github} target="_blank" rel="noopener noreferrer">
      <FaGithub className="w-6 h-6 hover:opacity-50" />
    </a>
    <a href={links.nukepedia} target="_blank" rel="noopener noreferrer">
      <img src="/images/nukepedia.png" alt="Nukepedia" className="w-6 h-6 hover:opacity-50" />
    </a>
  </div>
  <Link href={nextPostPath} className="flex items-center text-blue-400 hover:opacity-100 opacity-50">
    <span className="hidden md:inline">Go to Next Post</span> {/* Hide on mobile */}
    <FaArrowRight className="ml-2" />
  </Link>
</header>

  );
};

export default Header;
