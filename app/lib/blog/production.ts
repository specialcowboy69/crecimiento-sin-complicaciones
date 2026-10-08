import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { filterPublishedPosts } from "./dates";
import { parseBlogDocument } from "./frontmatter";
import type { BlogPost } from "./types";
import { validateBlogDocuments } from "./validation";

export function getProductionBlogPosts() {
  const entries = readdirSync(path.join(process.cwd(), "content", "blog"), {
    withFileTypes: true,
  });
  const documents = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => ({
      fileName: entry.name,
      post: parseBlogDocument({
        fileName: entry.name,
        source: readFileSync(
          path.join(process.cwd(), "content", "blog", entry.name),
          "utf8",
        ),
      }),
    }));

  return validateBlogDocuments(documents, (post) =>
    existsSync(
      path.join(
        process.cwd(),
        "public",
        "images",
        "blog",
        post.slug,
        "cover.webp",
      ),
    ),
  );
}

export function getProductionPublishedPosts() {
  return filterPublishedPosts(getProductionBlogPosts(), new Date());
}

export function getProductionRelatedPosts(post: BlogPost) {
  const publishedBySlug = new Map(
    getProductionPublishedPosts().map((candidate) => [candidate.slug, candidate]),
  );

  return post.relatedSlugs.flatMap((slug) => {
    const relatedPost = publishedBySlug.get(slug);
    return relatedPost ? [relatedPost] : [];
  });
}
