// /app/blog/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Card from './components/Card';
import Summary from './components/Summary';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import BlogHeader from './components/BlogHeader';
import MarkdownIt from 'markdown-it';
import { Metadata } from 'next';

// Set up the posts directory path
const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

// Define metadata function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - My Awesome Blog',
    description: 'Read the latest posts and articles from My Awesome Blog.',
  };
}

// Blog Landing Page Component
export default async function BlogLandingPage() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    const excerpt = content.split('<!-- end -->')[0].trim();
    const md = new MarkdownIt();
    const excerptHtml = md.render(excerpt);
    const slug = fileName.replace(/\.md$/, '');
    
    return {
      slug,
      title: data.title,
      date: data.date,
      thumbnail: data.thumbnail,
      excerptHtml
    };
  });

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#121212] flex-col bg-no-repeat overflow-hidden relative">
      <Navbar />
      <section className='container mx-auto max-w-[870px] py-24 px-4'>
        <BlogHeader></BlogHeader>
        {posts.map(post => (
          <Card key={post.slug}>
            <Summary
              date={post.date}
              title={post.title}
              image={post.thumbnail}
              excerpt={post.excerptHtml}
              slug={post.slug}
            />
          </Card>
        ))}
      </section>
      <Footer></Footer>      
    </main>
  );
}
