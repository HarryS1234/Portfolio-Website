"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface AboutMe {
  name: string;
  bio: string;
  skills: string[];
  interests: string[];
  location: string;
  projects: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  const aboutMe: AboutMe = {
    name: "Hargobind",
    bio: "I'm a passionate web developer with a love for coding, cooking, and connecting with people.",
    skills: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Node.js"],
    interests: ["Web development", "Cooking", "Tech trends", "Helping others"],
    location: "Somewhere awesome",
    projects: "Check out my portfolio at https://portfolio-website-eta-six-23.vercel.app/!",
  };

  const context = `
    Name: ${aboutMe.name}
    Bio: ${aboutMe.bio}
    Skills: ${aboutMe.skills.join(", ")}
    Interests: ${aboutMe.interests.join(", ")}
    Location: ${aboutMe.location}
    Projects: ${aboutMe.projects}
  `;

  // Prevent hydration errors by initializing state after mount
  useEffect(() => {
    setMounted(true);
    setMessages([
      { sender: "bot", text: "Hi! I'm your AI assistant. Ask me anything about Hargobind!" },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          inputs: `Context: ${context}\n\n${input}\n\nAnswer as Hargobind:`,
          parameters: { max_new_tokens: 70, temperature: 0.7 },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data[0]?.generated_text.split("Answer as Hargobind:")[1]?.trim() || "I'm not sure how to answer that!";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops, something went wrong!" }]);
    }
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([{ sender: "bot", text: "Hi! I'm your AI assistant. Ask me anything about Hargobind!" }]);
  };

  // Return null or placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#3182ce] hover:bg-[#63b3ed] dark:bg-[#63b3ed] dark:hover:bg-[#3182ce]  text-white font-bold px-6 py-5 rounded-full shadow-lg  transition-colors"
        >
          AI Chat
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col">
          <div className="bg-[#3182ce] hover:bg-[#63b3ed] dark:bg-[#63b3ed] dark:hover:bg-[#3182ce]  text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <div>
              <button onClick={handleNewChat} className="mr-2 bg-white text-[#7ea9ff] dark:bg-gray-700 dark:text-white px-2 py-1 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                New Chat
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 max-h-64 overflow-y-auto dark:bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" 
                      ? "bg-[#3182ce] dark:bg-[#63b3ed] text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-300 dark:border-gray-600 dark:bg-gray-800">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-[#3182ce] hover:bg-[#63b3ed] dark:bg-[#63b3ed] dark:hover:bg-[#3182ce] text-white p-2 rounded-r-lg "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;