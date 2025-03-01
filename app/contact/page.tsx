"use client";

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setStatus("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          setStatus("Failed to send message.");
        }
      } catch (error) {
        console.error(error);
        setStatus("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#1a202c] flex flex-col transition-colors duration-300">
      <main className="flex-grow mt-16 container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#3182ce] dark:text-[#63b3ed] tracking-tight">
            Contact Me
          </h1>
          <p className="mt-2 text-lg text-[#666666] dark:text-[#a0aec0]">
            Let’s connect and bring your ideas to life!
          </p>
        </header>

        {/* Form Container */}
        <div className="bg-[#ffffff] dark:bg-[#2d3748] rounded-xl shadow-lg p-6 md:p-8 border border-[#cccccc] dark:border-[#4a5568] animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[#333333] dark:text-[#e2e8f0] font-medium"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={isLoading}
                className="border-[#cccccc] dark:border-[#4a5568] focus:ring-[#3182ce] dark:focus:ring-[#63b3ed] text-[#333333] dark:text-[#e2e8f0] bg-[#f0f4f8] dark:bg-[#1a202c]"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[#333333] dark:text-[#e2e8f0] font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                disabled={isLoading}
                className="border-[#cccccc] dark:border-[#4a5568] focus:ring-[#3182ce] dark:focus:ring-[#63b3ed] text-[#333333] dark:text-[#e2e8f0] bg-[#f0f4f8] dark:bg-[#1a202c]"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-[#333333] dark:text-[#e2e8f0] font-medium"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                disabled={isLoading}
                className="border-[#cccccc] dark:border-[#4a5568] focus:ring-[#3182ce] dark:focus:ring-[#63b3ed] text-[#333333] dark:text-[#e2e8f0] bg-[#f0f4f8] dark:bg-[#1a202c]"
              />
            </div>

            {/* Progress Bar */}
            {isLoading && (
              <div className="w-full bg-[#cccccc] dark:bg-[#4a5568] rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#3182ce] dark:bg-[#63b3ed] h-1 rounded-full animate-progress"
                ></div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#3182ce] hover:bg-[#63b3ed] dark:bg-[#63b3ed] dark:hover:bg-[#3182ce] text-[#ffffff] font-semibold rounded-full py-3 transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>

            {/* Status Message */}
            {status && (
              <p
                className={`text-center text-sm font-medium animate-fade-in ${
                  status.includes("success")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          25% { width: 30%; }
          50% { width: 60%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;