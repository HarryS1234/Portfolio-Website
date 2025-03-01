"use client";

import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const typedRef = useRef(null);

  // Local GIFs stored in /public/assets/
  const giphys = [
    "/assets/giphy2.gif",
    "/assets/giphy6.gif",
    "/assets/giphy1.gif",
    "/assets/giphy4.gif",
    "/assets/giphy5.gif",
    "/assets/giphy3.gif",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Typed.js effect
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Web Developer", "Penguin Lover", "Techie", "People's Person", "Cooking Enthusiast"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  // GIF Slideshow Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % giphys.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [giphys.length]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#f0f4f8] dark:bg-[#1a202c] transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/background.jpeg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={100}
          className="opacity-30 dark:opacity-20"
        />
      </div>

      {/* Content Wrapper */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#333333] dark:text-[#e2e8f0] mb-4">
            Hi, I’m{" "}
            <span className="text-[#3182ce] dark:text-[#63b3ed]">
              Hargobind
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#666666] dark:text-[#a0aec0] mb-6">
            I’m a <span ref={typedRef} className="text-[#3182ce] dark:text-[#63b3ed]"></span>
          </p>
          <p className="text-[#666666] dark:text-[#a0aec0] text-lg max-w-md mx-auto md:mx-0 mb-8">
            Crafting modern websites with a passion for code and creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              href="https://github.com/HarryS1234" // Replace with your GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-[#3182ce] dark:bg-[#63b3ed] text-[#ffffff] rounded-full hover:bg-[#63b3ed] dark:hover:bg-[#3182ce] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center font-semibold"
            >
              Visit GitHub
            </Link>
            <Link
              href="/resume" // Replace with your resume path
              download
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-[#3182ce] dark:border-[#63b3ed] text-[#3182ce] dark:text-[#63b3ed] rounded-full hover:bg-[#3182ce] dark:hover:bg-[#63b3ed] hover:text-[#ffffff] dark:hover:text-[#ffffff] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center font-semibold"
            >
              Check My Resume
            </Link>
          </div>
        </div>

        {/* Right Side: GIF Slideshow */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center animate-fade-in-up delay-200">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square">
            <img
              src={giphys[currentIndex]}
              alt="Animated GIF"
              className={`w-full h-full rounded-xl shadow-xl border border-[#cccccc] dark:border-[#4a5568] transition-opacity duration-500 object-cover ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </main>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Page;