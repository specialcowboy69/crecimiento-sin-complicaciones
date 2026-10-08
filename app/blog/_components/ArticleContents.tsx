import type { ArticleHeading } from "../../lib/blog/articleStructure";

type ArticleContentsProps = {
  headings: ArticleHeading[];
  mode?: "desktop" | "mobile";
};

export function ArticleContents({ headings, mode = "desktop" }: ArticleContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  const sections: { heading: ArticleHeading; children: ArticleHeading[] }[] = [];
  let currentH2: (typeof sections)[number] | null = null;

  for (const heading of headings) {
    if (heading.depth === 2) {
      currentH2 = { heading, children: [] };
      sections.push(currentH2);
    } else if (currentH2) {
      currentH2.children.push(heading);
    } else {
      sections.push({ heading, children: [] });
    }
  }

  const links = (
    <ol>
      {sections.map(({ heading, children }) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.text}</a>
          {children.length > 0 ? (
            <ol>
              {children.map((child) => (
                <li key={child.id}>
                  <a href={`#${child.id}`}>{child.text}</a>
                </li>
              ))}
            </ol>
          ) : null}
        </li>
      ))}
    </ol>
  );

  if (mode === "mobile") {
    return (
      <details className="blog-contents blog-contents-mobile">
        <summary>En este artículo</summary>
        <nav aria-label="Índice del artículo">{links}</nav>
      </details>
    );
  }

  return (
    <nav className="blog-contents blog-contents-desktop" aria-label="Índice del artículo">
      <p>En este artículo</p>
      {links}
    </nav>
  );
}
