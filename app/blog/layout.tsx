import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // You can fetch blog-specific data here if needed
  // For example, fetching the latest post or other relevant information
  return {
    title: 'Filip Suska - BLOG',
    description: 'Explore my experiments in Nuke, Pipeline and ML.',
    openGraph: {
      title: 'Filip Suska - BLOG',
      description: 'Explore my experiments in Nuke, Pipeline and ML.',
      url: 'https://filipsuska.com/blog', // Ensure this URL is correct
      images: [
        {
          url: '/images/suska.png', // Default image for the blog section
          alt: 'Blog Section',
          width: 1200,
          height: 630
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - My Awesome Blog',
      description: 'Explore the latest posts and updates on My Awesome Blog.',
      images: '/images/suska.png', // Default image for the blog section
      site: '@yourTwitterHandle', // Replace with your Twitter handle if desired
    }
  };
}

export default function BlogLayout({ children }) {
    return (
        <main>{children}</main>
    );
  }
  