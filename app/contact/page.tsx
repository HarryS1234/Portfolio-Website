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

    // ✅ Correctly Typed handleChange Function
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    // ✅ Fixed TypeScript Error in handleSubmit
    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
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
                console.error(error);
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
                <h1 className="text-4xl font-bold text-center text-blue-500 mb-10">
                    Contact Me
                </h1>
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
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

                        {/* Email Input */}
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

                        {/* Message Textarea */}
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

                        {/* ✅ Smooth Progress Bar Animation */}
                        {isLoading && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-700 ease-in-out"
                                    style={{ width: isLoading ? "100%" : "0%" }}
                                ></div>
                            </div>
                        )}

                        {/* ✅ Improved Button Styling for Dark Mode */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send Message"}
                        </Button>

                        {/* ✅ Success/Error Message Animation */}
                        {status && (
                            <p
                                className={`text-center ${
                                    status.includes("success")
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

            {/* ✅ Custom CSS for Animation */}
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
