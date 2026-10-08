import { activeCategorySlugs, hasPublishedBlog } from "./gates";
import { getPublishedPosts } from "./repository";
import type { BlogCategorySlug, BlogPost } from "./types";

export function isBlogPublished(posts: BlogPost[] = getPublishedPosts()) {
  return hasPublishedBlog(posts);
}

export function getActiveCategories(
  posts: BlogPost[] = getPublishedPosts(),
): BlogCategorySlug[] {
  return activeCategorySlugs(posts);
}

export function isCategoryActive(
  category: BlogCategorySlug,
  posts: BlogPost[] = getPublishedPosts(),
) {
  return getActiveCategories(posts).includes(category);
}
