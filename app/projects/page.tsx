"use client";

import Link from "next/link";
import React from "react";

const Projects = () => {
  const projects = [
    {
      title: "VeerJi Mechanical",
      description:
        "A business website built for VeerJi Mechanical, an authorized service center for commercial refrigeration, air conditioning, and heating in Ontario.",
      tech: ["Node.js", "Tailwind CSS", "React"],
      link: "https://www.veerjimechanical.ca/",
      developerNotes:
        "I developed this site to create a professional online presence for VeerJi Mechanical. The website showcases their services, expertise, and contact details while ensuring a smooth, mobile-friendly experience. I used Next.js for fast performance, Tailwind CSS for styling, and integrated dynamic elements for a modern UI.",
    },
    {
      title: "Doggy Delights",
      description:
        "An interactive platform for dog lovers to upload their favorite dog images, fetch random photos, and view them in a live-updating gallery.",
      tech: ["React", "Node.js", "Express", "Cloudinary"],
      link: "https://doggy-delights-iota.vercel.app/",
      developerNotes:
        "This project was built to experiment with full-stack development and file uploads. Users can upload images, fetch random dog pictures, and see their gallery update in real-time. I implemented Cloudinary for media storage, Express for the backend, and MongoDB to store user-submitted images. The gallery updates every few seconds, creating a dynamic and engaging experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#1a202c] flex flex-col transition-colors duration-300">
      {/* Main Content */}
      <main className="flex-grow mt-16 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#333333] dark:text-[#e2e8f0] tracking-tight mb-4">
            My Projects
          </h1>
          <p className="text-lg text-[#666666] dark:text-[#a0aec0] max-w-2xl mx-auto">
            A showcase of my recent work and technical explorations
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group bg-[#ffffff] dark:bg-[#2d3748] rounded-xl shadow-md hover:shadow-xl border border-[#cccccc] dark:border-[#4a5568] transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[#333333] dark:text-[#e2e8f0] mb-3 group-hover:text-[#3182ce] dark:group-hover:text-[#63b3ed] transition-colors line-clamp-1">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-[#666666] dark:text-[#a0aec0] mb-4 text-sm md:text-base line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[#3182ce] dark:bg-[#63b3ed] text-[#ffffff] text-xs font-medium px-2.5 py-1 rounded-full transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Developer Notes (Expandable) */}
                <details className="mb-4 text-sm text-[#666666] dark:text-[#a0aec0]">
                  <summary className="cursor-pointer font-medium text-[#3182ce] dark:text-[#63b3ed] hover:underline">
                    Developer Notes
                  </summary>
                  <p className="mt-2 pr-2">{project.developerNotes}</p>
                </details>

                {/* Link */}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#3182ce] dark:text-[#63b3ed] font-semibold hover:text-[#63b3ed] dark:hover:text-[#3182ce] transition-colors"
                >
                  View Project
                  <svg
                    className="w-4 h-4"
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
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;