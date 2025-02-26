import { NextResponse } from "next/server";

// In-memory storage (replace with database in production)
let posts = [
  { id: 1, title: "My First Blog Post", excerpt: "A quick intro...", content: "Full content...", date: "2025-02-20" },
  { id: 2, title: "Building with Next.js", excerpt: "How I learned...", content: "Full content...", date: "2025-02-15" },
  { id: 3, title: "Tailwind CSS Tips", excerpt: "Top tricks...", content: "Full content...", date: "2025-02-10" },
  { id: 4, title: "Why I Love Coding", excerpt: "A personal take...", content: "Full content...", date: "2025-01-30" },
];

export async function GET() {
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(request) {
  try {
    const { title, excerpt, content } = await request.json();
    const newPost = {
      id: posts.length + 1,
      title,
      excerpt,
      content,
      date: new Date().toISOString().split("T")[0],
    };
    posts.push(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    posts = posts.filter((post) => post.id !== Number(id));
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}