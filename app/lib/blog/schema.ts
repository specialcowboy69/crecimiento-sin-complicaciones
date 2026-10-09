import { absoluteUrl } from "../site";
import {
  ORGANIZATION_ID,
  SCHEMA_CONTEXT,
  WEBSITE_ID,
  breadcrumbJsonLd,
} from "../structuredData";
import { BLOG_CATEGORIES } from "./categories";
import type { BlogCategorySlug, BlogPost } from "./types";

const BLOG_PATH = "/blog";
const BLOG_NAME = "Blog de Crecimiento sin complicaciones";

export function blogHomeJsonLd(posts: BlogPost[]) {
  const blogUrl = absoluteUrl(BLOG_PATH);

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${blogUrl}#webpage`,
        url: blogUrl,
        name: BLOG_NAME,
        description:
          "Guías prácticas sobre SEO, captación, conversión, contenidos y automatización para empresas.",
        inLanguage: "es-ES",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${blogUrl}#blog` },
      },
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: BLOG_NAME,
        inLanguage: "es-ES",
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: posts.map((post) => ({
          "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${blogUrl}#articles`,
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: BLOG_PATH },
      ]),
    ],
  };
}

export function blogCategoryJsonLd(categorySlug: BlogCategorySlug, posts: BlogPost[]) {
  const category = BLOG_CATEGORIES[categorySlug];
  const categoryPath = `/blog/categoria/${categorySlug}`;
  const categoryUrl = absoluteUrl(categoryPath);

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#webpage`,
        url: categoryUrl,
        name: `${category.name} | ${BLOG_NAME}`,
        description: category.description,
        inLanguage: "es-ES",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${categoryUrl}#articles` },
      },
      {
        "@type": "ItemList",
        "@id": `${categoryUrl}#articles`,
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: BLOG_PATH },
        { name: category.name, path: categoryPath },
      ]),
    ],
  };
}

export function blogArticleJsonLd(post: BlogPost) {
  const articlePath = `/blog/${post.slug}`;
  const articleUrl = absoluteUrl(articlePath);

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        headline: post.title,
        description: post.description,
        image: absoluteUrl(post.coverImage),
        datePublished: post.publishedAt,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        inLanguage: "es-ES",
        keywords: post.tags,
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": `${absoluteUrl(BLOG_PATH)}#blog` },
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: BLOG_PATH },
        { name: BLOG_CATEGORIES[post.category].name, path: `/blog/categoria/${post.category}` },
        { name: post.title, path: articlePath },
      ]),
    ],
  };
}
