export type BlogCategorySlug =
  | "seo"
  | "google-ads"
  | "web-y-conversion"
  | "contenidos-y-redes"
  | "ia-y-automatizacion";

export type BlogCategory = {
  slug: BlogCategorySlug;
  name: string;
  description: string;
  relatedService: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategorySlug;
  draft: boolean;
  authorId: "equipo";
  coverImage: string;
  coverImageAlt: string;
  primaryKeyword: string;
  relatedService: string;
  relatedSlugs: string[];
  tags: string[];
  body: string;
  readingTimeMinutes: number;
};

export type BlogReadOptions = {
  contentDirectory?: string;
  publicDirectory?: string;
  now?: Date;
};
