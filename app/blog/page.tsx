// app/blog/page.tsx
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";

const dirContent = fs.readdirSync("content", "utf-8");

// Filter out resume.md and only include blog posts
const blogs = dirContent
  .filter((file) => file !== "resume.md" && file.endsWith(".md"))
  .map((file) => {
    const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
    const { data } = matter(fileContent);
    return data;
  });

/**
 * Blog component that renders a list of blog posts with enhanced styling.
 * Features a responsive grid layout with card-based blog previews.
 *
 * @returns {JSX.Element} The rendered blog component
 */
export default function Blog() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] dark:text-[#e2e8f0] tracking-tight">
          Blog
        </h1>
        <p className="mt-2 text-lg text-[#666666] dark:text-[#a0aec0]">
          Explore my latest insights and stories
        </p>
      </header>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: any, index: number) => (
          <article
            key={index}
            className="group bg-[#ffffff] dark:bg-[#2d3748] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#cccccc] dark:border-[#4a5568]"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#333333] dark:text-[#e2e8f0] mb-3 line-clamp-2 group-hover:text-[#3182ce] dark:group-hover:text-[#63b3ed] transition-colors">
                {blog.title}
              </h2>
              <p className="text-[#666666] dark:text-[#a0aec0] mb-4 line-clamp-3 text-sm md:text-base">
                {blog.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#666666] dark:text-[#a0aec0] mb-6">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#3182ce] rounded-full"></span>
                  {blog.author}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#3182ce] rounded-full"></span>
                  {new Date(blog.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Link
                href={`/blogpost/${blog.slug}`}
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "w-full sm:w-auto bg-[#3182ce] text-[#ffffff] hover:bg-[#63b3ed] border-[#3182ce] hover:border-[#63b3ed] transition-colors",
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
}