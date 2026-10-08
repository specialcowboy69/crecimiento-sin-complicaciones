import type { Blockquote, ListItem, PhrasingContent, Root, RootContent } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

export type ArticleHeading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

function plainText(node: RootContent | PhrasingContent): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value;
  }

  if (node.type === "image") {
    return node.alt ?? "";
  }

  return "children" in node ? node.children.map(plainText).join("") : "";
}

function slug(text: string) {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "") || "seccion";
}

function isSummary(blockquote: Blockquote) {
  const first = blockquote.children[0];
  const lead = first?.type === "paragraph" ? first.children[0] : null;

  return lead?.type === "strong" && plainText(lead).trim().replace(/:$/, "") === "En resumen";
}

function annotateArticle(tree: Root): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const usedIds = new Set<string>();
  let summaryFound = false;

  const visitBlocks = (nodes: readonly (RootContent | ListItem)[]) => {
    for (const node of nodes) {
      if (node.type === "blockquote" && !summaryFound && isSummary(node)) {
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, className: ["blog-summary"] },
        };
        summaryFound = true;
      }

      if (node.type === "heading") {
        if (node.depth === 1) {
          node.depth = 2;
        }

        if (node.depth === 2 || node.depth === 3) {
          const text = plainText(node);
          const base = `articulo-${slug(text)}`;
          let id = base;
          let suffix = 2;

          while (usedIds.has(id)) {
            id = `${base}-${suffix++}`;
          }

          usedIds.add(id);
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          headings.push({ depth: node.depth, text, id });
        }
      }

      if (
        node.type === "blockquote" ||
        node.type === "list" ||
        node.type === "listItem" ||
        node.type === "footnoteDefinition"
      ) {
        visitBlocks(node.children);
      }
    }
  };

  visitBlocks(tree.children);

  return headings;
}

export function remarkArticleStructure() {
  return (tree: Root) => {
    annotateArticle(tree);
  };
}

const parser = unified().use(remarkParse).use(remarkGfm);

function parseArticle(body: string) {
  return parser.parse(body);
}

export function getBlogArticleOutline(body: string): ArticleHeading[] {
  return annotateArticle(parseArticle(body));
}

type ArticleNode = {
  type: string;
  url?: string;
  children?: ArticleNode[];
};

function linksToInvitation(node: ArticleNode, relatedService: string): boolean {
  if (node.type === "link" && (node.url === relatedService || node.url === "/#auditoria")) {
    return true;
  }

  return node.children?.some((child) => linksToInvitation(child, relatedService)) ?? false;
}

export function hasClosingServiceInvitation(body: string, relatedService: string) {
  const last = parseArticle(body).children.at(-1);

  if (last?.type !== "paragraph" && last?.type !== "list") {
    return false;
  }

  return linksToInvitation(last, relatedService);
}
