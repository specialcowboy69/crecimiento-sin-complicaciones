import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Logo } from "../components/Logo";
import { hasPublishedBlog as isBlogPublished } from "../lib/blog/gates";
import { getProductionPublishedPosts } from "../lib/blog/production";
import { blogHomeJsonLd } from "../lib/blog/schema";
import { BlogPostCard } from "./_components/BlogPostCard";
import styles from "./blog.module.css";

const BLOG_PATH = "/blog";
const BLOG_TITLE = "Ideas para crecer con más claridad";
const BLOG_DESCRIPTION =
  "Guías prácticas sobre SEO, captación, conversión, contenidos y automatización para tomar mejores decisiones digitales.";

export function generateMetadata(): Metadata {
  const posts = getProductionPublishedPosts();

  if (!isBlogPublished(posts)) {
    return {
      title: "Blog",
      alternates: { canonical: null },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    alternates: {
      canonical: BLOG_PATH,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${BLOG_TITLE} | Crecimiento sin complicaciones`,
      description: BLOG_DESCRIPTION,
      url: BLOG_PATH,
      type: "website",
      locale: "es_ES",
    },
  };
}

export default function BlogPage() {
  const posts = getProductionPublishedPosts();

  if (!isBlogPublished(posts)) {
    notFound();
  }

  const jsonLd = blogHomeJsonLd(posts);

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
            <Link href="/agencia-marketing-digital">Servicios</Link>
            <Link className={styles.headerCta} href="/#auditoria">
              Auditoría gratuita
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="blog-title">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span>Blog</span>
            </nav>
            <p className={styles.eyebrow}>Blog de Crecimiento sin complicaciones</p>
            <h1 id="blog-title">{BLOG_TITLE}</h1>
            <p className={styles.heroDescription}>{BLOG_DESCRIPTION}</p>
          </div>
        </section>

        <section className={styles.articleBand} aria-labelledby="latest-articles">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Biblioteca práctica</p>
              <h2 id="latest-articles">Últimos artículos</h2>
            </div>
            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
