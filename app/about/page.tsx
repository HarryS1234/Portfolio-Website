"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#1a202c] text-[#333333] dark:text-[#e2e8f0] font-sans transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative mt-16 flex items-center justify-center bg-gradient-to-b from-[#3182ce]/10 to-[#f0f4f8] dark:from-[#63b3ed]/20 dark:to-[#1a202c] overflow-hidden py-16">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#3182ce] dark:text-[#63b3ed] transition-transform duration-300">
            About Me
          </h1>
          <p className="mt-4 text-xl text-[#666666] dark:text-[#a0aec0] max-w-2xl mx-auto">
            A developer who builds fast, reliable, and easy-to-use web applications.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-16">
        {/* Background */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] transition-transform duration-300">
            My Work
          </h2>
          <p className="text-[#666666] dark:text-[#a0aec0] leading-relaxed text-base md:text-lg">
            I create web applications with a focus on performance, accessibility, and maintainability. 
            My background includes frontend and backend development, working with tools like **React, Next.js, Node.js, and databases like Supabase**. 
            I enjoy writing clean, well-structured code that makes applications easy to scale and improve.
          </p>
        </section>

        {/* Skills */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] transition-transform duration-300">
            Skills & Tools
          </h2>
          <ul className="list-none text-[#666666] dark:text-[#a0aec0] space-y-4 text-base md:text-lg">
            <li>React, Next.js, and Tailwind CSS for responsive interfaces</li>
            <li>Node.js and Express for backend development</li>
            <li>Database management with Supabase and PostgreSQL</li>
            <li>Authentication and security with OAuth and Clerk</li>
            <li>Email and notification handling with Nodemailer</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] transition-transform duration-300">
            Let's Connect
          </h2>
          <p className="text-[#666666] dark:text-[#a0aec0] text-base md:text-lg">
            If you're looking for a developer who values clean code, efficiency, and user-friendly design, let's talk.  
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#3182ce] dark:bg-[#63b3ed] text-[#ffffff] rounded-full hover:bg-[#63b3ed] dark:hover:bg-[#3182ce] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact Me
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
