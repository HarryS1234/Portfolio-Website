import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import fs from "fs";
import matter from 'gray-matter';
import Image from 'next/image';
import path from 'path';


// Read blog posts from content directory
const contentDirectory = path.join(process.cwd(), 'content');
const blogFiles = fs.readdirSync(contentDirectory);

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image: string;
}

const getBlogPosts = (): BlogPost[] => {
  return blogFiles
    .filter(file => file !== "resume.md" && file.endsWith(".md"))
    .map(file => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      
      return {
        title: data.title,
        description: data.description,
        slug: data.slug,
        date: data.date,
        author: data.author,
        image: data.image
      } as BlogPost;
    });
};

const Blog = () => {
  const blogs = getBlogPosts();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 mt-12 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] dark:text-[#e2e8f0] tracking-tight">
          Blog
        </h1>
        <p className="mt-2 text-lg text-[#666666] dark:text-[#a0aec0]">
          Explore our latest insights and stories
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <article 
            key={index} 
            className="group bg-white dark:bg-[#2d3748] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-[#4a5568]"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image 
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                priority={index < 3} // Prioritize first 3 images
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
 {/* Content Container */}
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm md:text-base">
                {blog.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {new Date(blog.date).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>

              <Link 
                href={`/blogpost/${blog.slug}`} 
                className={buttonVariants({ 
                  variant: "outline",
                  className:" bg-[#3183ce] hover:bg-[#63b2ed] dark:bg-[#63b3ed] dark:hover:bg-[#3182ce] "
                })}
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;