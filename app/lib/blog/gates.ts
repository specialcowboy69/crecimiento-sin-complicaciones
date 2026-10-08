import {
  BLOG_CATEGORY_SLUGS,
  MINIMUM_BLOG_POSTS,
  MINIMUM_CATEGORY_POSTS,
} from "./categories";
import { filterPublishedPosts } from "./dates";
import type { BlogCategorySlug, BlogPost } from "./types";

export function hasPublishedBlog(posts: BlogPost[], now = new Date()) {
  return filterPublishedPosts(posts, now).length >= MINIMUM_BLOG_POSTS;
}

export function activeCategorySlugs(posts: BlogPost[], now = new Date()): BlogCategorySlug[] {
  const publishedPosts = filterPublishedPosts(posts, now);
  if (publishedPosts.length < MINIMUM_BLOG_POSTS) {
    return [];
  }

  const qualifyingCategories = BLOG_CATEGORY_SLUGS.filter(
    (category) =>
      publishedPosts.filter((post) => post.category === category).length >=
      MINIMUM_CATEGORY_POSTS,
  );

  return qualifyingCategories.length >= 2 ? qualifyingCategories : [];
}
