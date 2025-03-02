// app/resume/page.tsx
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function ResumePage() {
  const filepath = "content/resume.md";

  if (!fs.existsSync(filepath)) {
    console.error(`File not found: ${filepath}`);
    notFound();
    return;
  }

  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(fileContent);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "Hargobind Singh - Resume" })
    .use(rehypeFormat)
    .use(rehypeStringify);

  const htmlContent = (await processor.process(content)).toString();

  // Convert the resume content to a downloadable data URL
  const resumeText = `Name: ${data.name || "Your Name"}\nTitle: ${data.title || "Your Title"}\nEmail: ${data.email || "your.email@example.com"}\nGitHub: ${data.github || "https://github.com/yourusername"}\n\n${content}`;
  const resumeDataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(resumeText)}`;

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#1a202c] flex flex-col transition-colors duration-300">
      <main className="flex-grow mt-16 container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#3182ce] dark:text-[#63b3ed] tracking-tight">
            {data.name || "Hargobind Singh"}
          </h1>
          <p className="mt-2 text-xl text-[#666666] dark:text-[#a0aec0] font-semibold">
            {data.title || "Computer Science Student & Web Developer"}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-sm text-[#666666] dark:text-[#a0aec0]">
            {data.email && (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
                <a
                  href={`mailto:${data.email}`}
                  className="hover:text-[#3182ce] dark:hover:text-[#63b3ed] transition-colors"
                >
                  {data.email}
                </a>
              </span>
            )}
            {data.github && (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#3182ce] dark:bg-[#63b3ed] rounded-full"></span>
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3182ce] dark:hover:text-[#63b3ed] transition-colors"
                >
                  GitHub
                </a>
              </span>
            )}
          </div>
        </header>
        <section className="bg-[#ffffff] dark:bg-[#2d3748] rounded-xl shadow-lg p-6 md:p-8 border border-[#cccccc] dark:border-[#4a5568] fade-in-up">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose dark:prose-invert prose-lg text-[#333333] dark:text-[#e2e8f0] max-w-none
              prose-headings:font-bold prose-h1:text-3xl prose-h1:mt-6 prose-h1:mb-4 prose-h1:text-[#3182ce] dark:prose-h1:text-[#63b3ed]
              prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-[#333333] dark:prose-h2:text-[#e2e8f0]
              prose-p:mb-4 prose-p:leading-relaxed
              prose-a:text-[#3182ce] prose-a:hover:text-[#63b3ed] prose-a:transition-colors
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#3182ce] prose-blockquote:bg-[#f0f4f8] dark:prose-blockquote:bg-[#4a5568] prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
          />
        </section>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-center">
          {/* Download Button */}
          <a
            href={resumeDataUrl}
            download={`${data.name ? data.name.replace(" ", "_") : "Resume"}_Resume.txt`}
            className="px-6 py-3 bg-[#3182ce] dark:bg-[#63b3ed] text-white rounded-full hover:bg-[#63b3ed] dark:hover:bg-[#3182ce] transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            Download Resume (TXT)
          </a>
        </div>
      </main>
    </div>
  );
}