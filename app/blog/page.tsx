import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogHeader from './components/BlogHeader';
import Card from './components/Card';
import Summary from './components/Summary';
import 'highlight.js/styles/github-dark.css';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

// Function to get all posts data
async function getAllPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const excerpt = content.split('<!-- end -->')[0].trim();
    const md = new MarkdownIt().use(highlightjs);
    const excerptHtml = md.render(excerpt);

    const slug = fileName.replace(/\.md$/, '');
    return {
      slug,
      title: data.title,
      date: data.date,
      thumbnail: data.thumbnail,
      preview: data.preview,
      excerptHtml
    };
  });

  return posts;
}

// Blog Landing Page Component
export default async function BlogLandingPage() {
  const posts = await getAllPostsData();

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#121212] flex-col bg-no-repeat overflow-hidden relative">
      <Navbar />
      <section className='container mx-auto max-w-[870px] py-24 px-4'>
        <BlogHeader />
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
      <Footer />
    </main>
  );
}
