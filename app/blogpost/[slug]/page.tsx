import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import OnThisPage from "@/components/ui/onthispage";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const filepath = `content/${params.slug}.md`;

  if (!fs.existsSync(filepath)) {
    notFound();
    return;
  }

  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(fileContent);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000,
        }),
      ],
    });

  const htmlContent = (await processor.process(content)).toString();

  return (
    <article className="max-w-6xl mx-auto mt-24 mb-10 px-6 py-12 bg-[#f0f4f8] dark:bg-[#1a202c] rounded-xl shadow-lg transition-colors duration-300">
      {/* Header Section */}
      <header className="mb-10 border-b border-[#cccccc] dark:border-[#4a5568] pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#333333] dark:text-[#e2e8f0] tracking-tight leading-tight">
          {data.title}
        </h1>
        <blockquote className="text-base mb-6 border-l-4 border-[#3182ce] pl-4 italic text-[#666666] dark:text-[#a0aec0] bg-[#ffffff] dark:bg-[#2d3748] py-2 rounded-r-lg">
          &quot;{data.description}&quot;
        </blockquote>
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#666666] dark:text-[#a0aec0]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3182ce] rounded-full"></span>
            By {data.author}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3182ce] rounded-full"></span>
            {data.date}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose dark:prose-invert prose-lg text-[#333333] dark:text-[#e2e8f0] max-w-none
              prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
              prose-p:mb-4
              prose-a:text-[#3182ce] prose-a:hover:text-[#63b3ed] prose-a:transition-colors
              prose-code:bg-[#ffffff] dark:prose-code:bg-[#2d3748] prose-code:p-1 prose-code:rounded
              prose-pre:rounded-lg prose-pre:shadow-md
              prose-blockquote:border-[#3182ce] prose-blockquote:bg-[#ffffff] dark:prose-blockquote:bg-[#2d3748]
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-6"
          />
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <OnThisPage htmlContent={htmlContent} />
          </div>
        </aside>
      </div>
    </article>
  );
}
