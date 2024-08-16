// /app/blog/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Card from './components/Card';
import Summary from './components/Summary';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import BlogHeader from './components/BlogHeader';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

export default async function BlogLandingPage() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the frontmatter data
    const { data, content } = matter(fileContents);

    // Extract the excerpt by splitting the content before the `<!-- end -->`
    const excerpt = content.split('<!-- end -->')[0].trim();

    const slug = fileName.replace(/\.md$/, '');
    return {
      slug,
      title: data.title,
      date: data.date,
      thumbnail: data.thumbnail,
      excerpt
    };
  });

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#121212] flex-col bg-no-repeat overflow-hidden relative">
      <Navbar />
      <section className='container mx-auto max-w-[870px] py-24'>
        <BlogHeader></BlogHeader>
        {posts.map(post => (
          <Card key={post.slug}>
            <Summary
              date={post.date}
              title={post.title}
              image={post.thumbnail}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          </Card>
        ))}
      </section>
      <Footer></Footer>      
    </main>
  );
}
