import type { BlogPost } from "./types";

export type ParsedBlogDocument = {
  fileName: string;
  post: BlogPost;
};

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      right.publishedAt.localeCompare(left.publishedAt) ||
      left.slug.localeCompare(right.slug),
  );
}

export function validateBlogDocuments(
  documents: ParsedBlogDocument[],
  coverExists: (post: BlogPost) => boolean,
) {
  const fileBySlug = new Map<string, string>();
  for (const document of documents) {
    const duplicateFile = fileBySlug.get(document.post.slug);
    if (duplicateFile) {
      throw new Error(
        `Invalid blog document ${document.fileName}: duplicate slug also used by ${duplicateFile}`,
      );
    }
    fileBySlug.set(document.post.slug, document.fileName);
  }

  for (const document of documents) {
    for (const relatedSlug of document.post.relatedSlugs) {
      if (!fileBySlug.has(relatedSlug)) {
        throw new Error(
          `Invalid blog document ${document.fileName}: related slug ${relatedSlug} does not exist`,
        );
      }
    }

    if (!document.post.draft && !coverExists(document.post)) {
      throw new Error(
        `Invalid blog document ${document.fileName}: cover image does not exist at ${document.post.coverImage}`,
      );
    }
  }

  return sortPosts(documents.map((document) => document.post));
}
