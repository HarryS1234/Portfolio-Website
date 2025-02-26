"use client";

import React, { useState, useEffect } from "react";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [sortByLatest, setSortByLatest] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "" });

    // Fetch posts on mount
    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Failed to fetch posts:", err));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSort = () => {
        const sortedPosts = [...posts].sort((a, b) =>
            sortByLatest
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );
        setPosts(sortedPosts);
        setSortByLatest(!sortByLatest);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            if (response.ok) {
                const addedPost = await response.json();
                setPosts((prev) => [...prev, addedPost]);
                setNewPost({ title: "", excerpt: "", content: "" });
                setShowForm(false);
            }
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            const response = await fetch("/api/blog", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                setPosts((prev) => prev.filter((post) => post.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow mt-16 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-[#7ea9ff]">My Blog</h1>
                    <div className="space-x-4">
                        <button
                            onClick={handleSort}
                            className="bg-[#7ea9ff] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {sortByLatest ? "Show Oldest First" : "Show Latest First"}
                        </button>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-[#7ea9ff] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {showForm ? "Cancel" : "+"}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="mb-10 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-[#7ea9ff] mb-4">
                            Create New Blog Post
                        </h2>
                        <form onSubmit={handleAddPost} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={newPost.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter blog title"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="excerpt" className="block text-gray-700">Excerpt</label>
                                <input
                                    id="excerpt"
                                    name="excerpt"
                                    type="text"
                                    value={newPost.excerpt}
                                    onChange={handleInputChange}
                                    placeholder="Short summary"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={newPost.content}
                                    onChange={handleInputChange}
                                    placeholder="Write your blog post here"
                                    className="w-full p-2 border rounded h-32"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#7ea9ff] text-white p-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                Add Post
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-[#7ea9ff] mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <p className="text-sm text-gray-500 mb-4">
                                Posted on: {formatDate(post.date)}
                            </p>
                            <button
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-600 font-semibold hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Blog;