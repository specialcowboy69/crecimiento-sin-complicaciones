import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Logo } from "../../../components/Logo";
import { BLOG_CATEGORIES } from "../../../lib/blog/categories";
import { activeCategorySlugs, hasPublishedBlog as isBlogPublished } from "../../../lib/blog/gates";
import { getProductionPublishedPosts } from "../../../lib/blog/production";
import { blogCategoryJsonLd } from "../../../lib/blog/schema";
import type { BlogCategorySlug } from "../../../lib/blog/types";
import { BlogPostCard } from "../../_components/BlogPostCard";
import styles from "../../blog.module.css";

type BlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getProductionPublishedPosts();

  if (!isBlogPublished(posts)) {
    return [];
  }

  return activeCategorySlugs(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getProductionPublishedPosts();
  const category = BLOG_CATEGORIES[slug as BlogCategorySlug];

  if (!isBlogPublished(posts) || !category || !activeCategorySlugs(posts).includes(category.slug)) {
    notFound();
  }

  const categoryPath = `/blog/categoria/${category.slug}`;
  const title = `${category.name} | Blog`;

  return {
    title,
    description: category.description,
    alternates: { canonical: categoryPath },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} | Crecimiento sin complicaciones`,
      description: category.description,
      url: categoryPath,
      type: "website",
      locale: "es_ES",
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params;
  const posts = getProductionPublishedPosts();
  const category = BLOG_CATEGORIES[slug as BlogCategorySlug];

  if (!isBlogPublished(posts) || !category || !activeCategorySlugs(posts).includes(category.slug)) {
    notFound();
  }

  const categoryPosts = posts.filter((post) => post.category === category.slug);
  const categories = activeCategorySlugs(posts).map((categorySlug) => BLOG_CATEGORIES[categorySlug]);
  const jsonLd = blogCategoryJsonLd(category.slug, categoryPosts);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.header}>
        <nav className={styles.headerInner} aria-label="Navegación del blog">
          <Link className="logo-link" href="/" aria-label="Crecimiento sin complicaciones, inicio">
            <Logo variant="light" />
          </Link>
          <div className={styles.headerActions}>
            <Link href="/blog">Blog</Link>
            <Link className={styles.headerCta} href="/#auditoria">
              Auditoría gratuita
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className={`${styles.hero} ${styles.categoryHero}`} aria-labelledby="category-title">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <p className={styles.eyebrow}>Categoría del blog</p>
            <h1 id="category-title">{category.name}</h1>
            <p className={styles.heroDescription}>{category.description}</p>
          </div>
        </section>

        <section className={styles.articleBand} aria-labelledby="category-articles">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Biblioteca práctica</p>
              <h2 id="category-articles">Artículos de {category.name}</h2>
            </div>
            <nav className={styles.categoryNav} aria-label="Categorías del blog">
              <Link href="/blog">Todos</Link>
              {categories.map((item) =>
                item.slug === category.slug ? (
                  <span key={item.slug} aria-current="page">{item.name}</span>
                ) : (
                  <Link key={item.slug} href={`/blog/categoria/${item.slug}`}>
                    {item.name}
                  </Link>
                ),
              )}
            </nav>
            <div className={styles.grid}>
              {categoryPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
