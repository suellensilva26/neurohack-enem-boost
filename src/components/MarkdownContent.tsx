import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MarkdownContentProps = {
  content: string;
  inline?: boolean;
  className?: string;
};

function normalizeImageSyntax(text: string) {
  // Converte padrões como ![http://url] em ![](http://url) para imagens renderizarem
  return text.replace(/!\[(https?:\/\/[^\]\s]+)\]/g, "![]($1)");
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, inline = false, className }) => {
  const normalized = normalizeImageSyntax(content);
  const wrapperClass = className ?? (inline ? "" : "prose prose-sm max-w-none");

  return (
    <div className={wrapperClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={
          inline
            ? {
                p: ({ node, ...props }) => <span {...props} />,
              }
            : {
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" />
                ),
                img: ({ node, ...props }) => (
                  // Garantir que as imagens não estourem o layout
                  <img {...props} alt={props.alt || "imagem"} className="max-w-full rounded-md" />
                ),
              }
        }
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;