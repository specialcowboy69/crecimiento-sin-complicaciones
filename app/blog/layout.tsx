import type { Metadata } from "next";

import { hasPublishedBlog as isBlogPublished } from "../lib/blog/gates";
import { getProductionPublishedPosts } from "../lib/blog/production";

export function generateMetadata(): Metadata {
  const posts = getProductionPublishedPosts();

  if (!isBlogPublished(posts)) {
    return {
      alternates: { canonical: null },
      robots: { index: false, follow: false },
    };
  }

  return {};
}

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
