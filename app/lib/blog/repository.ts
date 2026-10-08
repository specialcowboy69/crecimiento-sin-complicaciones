import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { filterPublishedPosts } from "./dates";
import { parseBlogDocument } from "./frontmatter";
import type { BlogCategorySlug, BlogPost, BlogReadOptions } from "./types";
import { validateBlogDocuments } from "./validation";

function resolveOptions(options: BlogReadOptions = {}) {
  return {
    contentDirectory:
      options.contentDirectory ??
      path.join(/* turbopackIgnore: true */ process.cwd(), "content", "blog"),
    publicDirectory:
      options.publicDirectory ??
      path.join(/* turbopackIgnore: true */ process.cwd(), "public"),
    now: options.now ?? new Date(),
  };
}

export function getAllBlogPosts(options: BlogReadOptions = {}): BlogPost[] {
  const { contentDirectory, publicDirectory } = resolveOptions(options);
  const usesFixtureContent = options.contentDirectory !== undefined;
  const usesFixturePublic = options.publicDirectory !== undefined;
  const contentExists = usesFixtureContent
    ? existsSync(path.join(/* turbopackIgnore: true */ contentDirectory))
    : existsSync(
        path.join(/* turbopackIgnore: true */ process.cwd(), "content", "blog"),
      );

  if (!contentExists) {
    return [];
  }

  const entries = usesFixtureContent
    ? readdirSync(path.join(/* turbopackIgnore: true */ contentDirectory), {
        withFileTypes: true,
      })
    : readdirSync(path.join(/* turbopackIgnore: true */ process.cwd(), "content", "blog"), {
        withFileTypes: true,
      });

  const documents = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => ({
      fileName: entry.name,
      post: parseBlogDocument({
        fileName: entry.name,
        source: readFileSync(
          usesFixtureContent
            ? path.join(/* turbopackIgnore: true */ contentDirectory, entry.name)
            : path.join(
                /* turbopackIgnore: true */ process.cwd(),
                "content",
                "blog",
                entry.name,
              ),
          "utf8",
        ),
      }),
    }));

  return validateBlogDocuments(documents, (post) =>
    usesFixturePublic
      ? existsSync(
          path.join(
            /* turbopackIgnore: true */ publicDirectory,
            post.coverImage.replace(/^\//, ""),
          ),
        )
      : existsSync(
          path.join(
            /* turbopackIgnore: true */ process.cwd(),
            "public",
            "images",
            "blog",
            post.slug,
            "cover.webp",
          ),
        ),
  );
}

export function getPublishedPosts(options: BlogReadOptions = {}): BlogPost[] {
  const resolved = resolveOptions(options);
  return filterPublishedPosts(getAllBlogPosts(resolved), resolved.now);
}

export function getPostBySlug(
  slug: string,
  options: BlogReadOptions = {},
): BlogPost | null {
  return getAllBlogPosts(options).find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(
  category: BlogCategorySlug,
  options: BlogReadOptions = {},
): BlogPost[] {
  return getPublishedPosts(options).filter((post) => post.category === category);
}

export function getRelatedPosts(
  post: BlogPost,
  options: BlogReadOptions = {},
): BlogPost[] {
  const publishedBySlug = new Map(
    getPublishedPosts(options).map((candidate) => [candidate.slug, candidate]),
  );

  return post.relatedSlugs.flatMap((slug) => {
    const relatedPost = publishedBySlug.get(slug);
    return relatedPost ? [relatedPost] : [];
  });
}
