import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Article from '../components/Article';
import Footer from '../../components/Footer';
import Header from '../components/Header';
import BlogHeader from '../components/BlogHeader';
import 'highlight.js/styles/github-dark.css';
import { Metadata } from 'next';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

// Function to get the post data
async function getPostData(slug: string) {
  function getAllPostSlugs(): string[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, '')); // Remove extension
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const allSlugs = getAllPostSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = currentIndex !== -1 && currentIndex < allSlugs.length - 1
    ? allSlugs[currentIndex + 1]
    : null;

  // Remove HTML comments from the content
  const sanitizedContent = content.replace(/<!--[\s\S]*?-->/g, '');

  // Initialize MarkdownIt with Highlight.js support
  const md = new MarkdownIt().use(highlightjs);

  // Render content as HTML with syntax highlighting
  const contentHtml = md.render(sanitizedContent);

  return {
    title: data.title,
    date: data.date,
    content: contentHtml,
    thumbnail: data.thumbnail,
    github: data.github,
    nukepedia: data.nukepedia,
    nextPostSlug: nextSlug,
    url: `https://filipsuska.com/blog/${slug}`, // Update with your website's base URL
  };
}

// Function to generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getPostData(params.slug);

  return {
    title: postData.title,
    description: postData.content.slice(0, 150), // Take the first 150 characters for description
    openGraph: {
      title: postData.title,
      description: postData.content.slice(0, 150),
      url: postData.url, // URL for the page
      images: [
        {
          url: postData.thumbnail,
          alt: `Thumbnail for ${postData.title}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image', // Or 'summary' for smaller image
      title: postData.title,
      description: postData.content.slice(0, 150),
      images: postData.thumbnail,
      site: '@yourTwitterHandle', // Replace with your Twitter handle if desired
    }
  };
}

// Blog Post Page Component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#121212]">
      <Navbar />
      <section className='container mx-auto max-w-[870px] py-24'>
        <BlogHeader />
        <Header links={{ github: postData.github, nukepedia: postData.nukepedia }} nextPostSlug={postData.nextPostSlug} />
        <div className="container relative py-12 px-4">
          <img 
            src={postData.thumbnail}
            alt={`Thumbnail for ${postData.title}`} 
            className="relative w-full object-cover py-12"
          />
          <h1 className="text-3xl mb-4 relative z-10">{postData.title}</h1>
          <p className="text-gray-600 mb-4 relative z-10">{postData.date}</p>
          <Article content={postData.content} />
        </div>
        <Footer />
      </section>
    </main>
  );
}
