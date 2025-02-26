"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section with Smooth Gradient Animation */}
      <section className="relative mt-16 flex items-center justify-center bg-gradient-to-b from-[#7ea9ff]/10 to-white overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7ea9ff]/10 via-white to-[#7ea9ff]/10 animate-gradient-x"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[#7ea9ff] hover:scale-105 transition-transform duration-500">
            About Me
          </h1>
          <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
            Discover my journey as a web developer and AI enthusiast.
          </p>
        </div>
      </section>

      {/* Main Content with Smooth Animations */}
      <main className="max-w-4xl mx-auto p-6 md:p-8 space-y-16">
        {/* Personal Story */}
        <section className="space-y-8  text-center animate-fade-in-up">
          <h2 className="text-3xl  font-semibold text-[#7ea9ff] hover:scale-105 transition-transform duration-500">My Story</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            I started coding at 16, driven by a passion for creating intuitive digital experiences. Over the years, I’ve built websites for clients worldwide, specializing in Next.js, Tailwind CSS, and AI integrations. My mission is to blend technology with creativity to solve real-world problems.
          </p>
        </section>

        {/* Skills and Values */}
        <section className="space-y-8  text-center  animate-fade-in-up delay-200">
          <h2 className="text-3xl  font-semibold text-[#7ea9ff] hover:scale-105 transition-transform duration-500">What I Bring</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li>Expertise in Next.js, React, and TypeScript</li>
            <li>AI-driven solutions using free API integrations</li>
            <li>Commitment to user-friendly, responsive designs</li>
            <li>Passion for innovation and good vibes in tech</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 animate-fade-in-up delay-400">
          <h2  className="text-3xl  font-semibold text-[#7ea9ff] hover:scale-105 transition-transform duration-500">Let’s Connect</h2>
          <p className="text-gray-700 text-lg">
            Ready to build something amazing? Contact me to discuss your project or explore my work further.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#7ea9ff] text-white rounded-full hover:bg-[#659bff] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </section>
      </main>


    </div>
  );
};

export default About;