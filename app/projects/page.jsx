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
    <div className="min-h-screen  bg-gray-100 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow  mt-16 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-[#7ea9ff] mb-10">
          My Projects
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#7ea9ff] hover:text-3xl mb-2">
                {project.title}
              </h2>
              <p className="text-gray-700 mb-4 hover:font-semibold">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[#7ea9ff] text-white text-sm font-medium px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7ea9ff] font-semibold hover:underline"
              >
                View Project →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;