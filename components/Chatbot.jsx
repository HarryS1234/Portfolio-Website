"use client";

import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your AI assistant. Ask me anything about Hargobind!" },
  ]);
  const [input, setInput] = useState("");

  const aboutMe = {
    name: "Hargobind",
    bio: "I’m a passionate web developer with a love for coding, cooking, and connecting with people.",
    skills: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Node.js"],
    interests: ["Web development", "Cooking", "Tech trends", "Helping others"],
    location: "Somewhere awesome",
    projects: "Check out my portfolio at /projects!",
  };

  const context = `
    Name: ${aboutMe.name}
    Bio: ${aboutMe.bio}
    Skills: ${aboutMe.skills.join(", ")}
    Interests: ${aboutMe.interests.join(", ")}
    Location: ${aboutMe.location}
    Projects: ${aboutMe.projects}
  `;

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

      const botResponse = response.data[0]?.generated_text.split("Answer as Hargobind:")[1]?.trim() || "I’m not sure how to answer that!";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops, something went wrong!" }]);
    }
    setInput("");
  };

  const handleNewChat = () => {
    setMessages([{ sender: "bot", text: "Hi! I’m your AI assistant. Ask me anything about Hargobind!" }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#7ea9ff] text-white font-bold px-6 py-5  rounded-full shadow-lg hover:bg-[#3676f7] transition-colors"
        >
          AI Chat
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="bg-[#7ea9ff] text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <div>
              <button onClick={handleNewChat} className="mr-2 bg-white text-[#7ea9ff] px-2 py-1 rounded-lg text-sm hover:bg-gray-200">
                New Chat
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-[#7ea9ff] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-[#7ea9ff] text-white p-2 rounded-r-lg hover:bg-blue-600"
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
