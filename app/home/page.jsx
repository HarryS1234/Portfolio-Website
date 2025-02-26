"use client"; // Required for client-side rendering in Next.js

import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image"; // Only used for the background

import Link from "next/link";

const Page = () => {
  const typedRef = useRef(null);

  // Local GIFs stored in /public/assets/
  const giphys = ["/assets/giphy2.gif", "/assets/giphy6.gif", "/assets/giphy1.gif", "/assets/giphy4.gif", "/assets/giphy5.gif", "/assets/giphy3.gif"];

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
      setFade(false); // Fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % giphys.length); // Next GIF
        setFade(true); // Fade in
      }, 500); // Wait for fade-out (0.5s)
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, [giphys.length]);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/background.jpeg" // Update with your image path
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={100}
          className="opacity-50"
        />
      </div>

      {/* Content Wrapper */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-8 text-white">

        {/* Left Side: Text Content */}
        <div className="md:w-1/2 text-center">
          <h1 className="text-4xl font-bold text-black">
            Hi, I am <span className="text-[#3676f7]">Hargobind</span> and I am a
          </h1>
          <span className="mt-6 text-4xl font-semibold text-[#3676f7]" ref={typedRef}></span>

        </div>
        
        {/* <div className="mt-6 flex flex-col items-center space-y-4">
    <Link
      href="/contact"
      className="inline-block md:inline-flex px-8 py-3 bg-[#7ea9ff] text-white rounded-full hover:bg-[#659bff] transition-colors duration-300 shadow-lg hover:shadow-xl"
    >
      Visit Github
    </Link>

    <Link
      href="/contact"
      className="inline-block px-8 py-3 bg-[#7ea9ff] text-white rounded-full hover:bg-[#659bff] transition-colors duration-300 shadow-lg hover:shadow-xl"
    >
      Download Resume
    </Link>
  </div> */}
        {/* Right Side: GIF Slideshow */}
        <div className="w-full mt-6 md:w-1/2 md:mt-0 flex justify-center">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square">
            <img
              src={giphys[currentIndex]}
              alt="Animated GIF"
              className={`w-full h-full rounded-lg shadow-lg transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>
    \

      </main>
    </div>
  );
};

export default Page;


