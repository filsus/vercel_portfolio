import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Filip Suska - VFX",
  description: "Welcome to my portfolio website. Learn more about the stuff I do!",
  image: "/images/main.png", // Replace with the actual path to your image
  url: "https://www.filipsuska.com", // Replace with your actual website URL
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="title" content={metadata.title} />
        <meta property="escription" content={metadata.description} />
        <meta property="image" content={metadata.image} />
        <meta property="url" content={metadata.url} />
        <meta property="type" content="website" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="msapplication-TileImage" content={metadata.image} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta itemProp="name" content={metadata.title} />
        <meta itemProp="description" content={metadata.description} />
        <meta itemProp="image" content={metadata.image} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
