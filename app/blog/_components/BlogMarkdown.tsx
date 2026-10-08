import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { remarkArticleStructure } from "../../lib/blog/articleStructure";

type BlogMarkdownProps = {
  body: string;
};

export function BlogMarkdown({ body }: BlogMarkdownProps) {
  return (
    <div className="blog-markdown">
      <Markdown
        remarkPlugins={[remarkGfm, remarkArticleStructure]}
        components={{
          p: ({ node, children }) => {
            const image = node?.children.length === 1 ? node.children[0] : null;

            if (image?.type === "element" && image.tagName === "img") {
              const caption = image.properties.title;

              return (
                <figure>
                  {children}
                  {typeof caption === "string" ? <figcaption>{caption}</figcaption> : null}
                </figure>
              );
            }

            return <p>{children}</p>;
          },
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");

            return (
              <a
                href={href}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}
