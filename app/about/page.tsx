"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#1a202c] text-[#333333] dark:text-[#e2e8f0] font-sans transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative mt-16 flex items-center justify-center bg-gradient-to-b from-[#3182ce]/10 to-[#f0f4f8] dark:from-[#63b3ed]/20 dark:to-[#1a202c] overflow-hidden py-16">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3182ce]/10 via-[#f0f4f8] to-[#3182ce]/10 dark:from-[#63b3ed]/20 dark:via-[#1a202c] dark:to-[#63b3ed]/20 animate-gradient-x"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#3182ce] dark:text-[#63b3ed] group-hover:scale-105 transition-transform duration-300">
            About Me
          </h1>
          <p className="mt-4 text-xl text-[#666666] dark:text-[#a0aec0] max-w-2xl mx-auto">
            A computer science student crafting innovative web solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-16">
        {/* Personal Story */}
        <section className="space-y-6 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] group-hover:scale-105 transition-transform duration-300">
            My Journey
          </h2>
          <p className="text-[#666666] dark:text-[#a0aec0] leading-relaxed text-base md:text-lg">
            I&apos;m a Computer Science student with a burning passion for web development. Over the past year, I&apos;ve been building websites that blend creativity with functionality, turning ideas into digital realities. From tinkering with code in my dorm room to delivering projects for real clients, I&apos;m hooked on creating seamless online experiences that make an impact.
          </p>
        </section>

        {/* Skills and Values */}
        <section className="space-y-6 text-center animate-fade-in-up delay-200">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] group-hover:scale-105 transition-transform duration-300">
            What I Offer
          </h2>
          <ul className="list-none text-[#666666] dark:text-[#a0aec0] space-y-4 text-base md:text-lg">
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
              Cutting-edge skills in Next.js, React, and Tailwind CSS
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
              Backend proficiency with Python, Java, and Node.js
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
              Sleek, responsive designs that shine on any device
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
              A fresh perspective and relentless drive to innovate
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 animate-fade-in-up delay-400">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3182ce] dark:text-[#63b3ed] group-hover:scale-105 transition-transform duration-300">
            Let&apos;s Build Together
          </h2>
          <p className="text-[#666666] dark:text-[#a0aec0] text-base md:text-lg">
            Got a project in mind? I&apos;m ready to bring your vision to life with clean code and cool designs. Let&apos;s chat about how I can help!
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
