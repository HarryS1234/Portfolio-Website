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
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        //     (prev) => ...: The functional update part. It takes prev (the current formData) and returns a new object.
        // { ...prev, [name]: value }: The new object being created:
        // ...prev: Spreads all properties of prev (e.g., { name: "", email: "", message: "" }) into a new object.
        // [name]: value: Adds or updates one property (e.g., name: "Hargobind") in that new object.



    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true); // Start loading
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
                setStatus("An error occurred. Please try again.");
            } finally {
                setIsLoading(false); // Stop loading
            }
        },
        [formData]
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow mt-16 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-center text-[#7ea9ff] mb-10">
                    Contact Me
                </h1>
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-gray-700">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                required
                                rows={4}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-[#7ea9ff] h-2.5 rounded-full animate-pulse"
                                    style={{ width: "75%" }} // Could animate width dynamically
                                ></div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#7ea9ff] hover:bg-blue-600 text-white font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send Message"}
                        </Button>

                        {/* Success/Error Message with Animation */}
                        {status && (
                            <p
                                className={`text-center ${status.includes("success")
                                        ? "text-green-600 animate-bounce-in"
                                        : "text-red-600"
                                    }`}
                            >
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </main>

            {/* Custom CSS for Animation */}
            <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Contact;