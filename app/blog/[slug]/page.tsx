import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Logo } from "../../components/Logo";
import { BLOG_CATEGORIES } from "../../lib/blog/categories";
import { hasPublishedBlog as isBlogPublished } from "../../lib/blog/gates";
import {
  getProductionPublishedPosts,
  getProductionRelatedPosts,
} from "../../lib/blog/production";
import { blogArticleJsonLd } from "../../lib/blog/schema";
import {
  getBlogArticleOutline,
  hasClosingServiceInvitation,
} from "../../lib/blog/articleStructure";
import { ArticleContents } from "../_components/ArticleContents";
import { BlogMarkdown } from "../_components/BlogMarkdown";
import { BlogPostCard } from "../_components/BlogPostCard";
import styles from "../blog.module.css";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function generateStaticParams() {
  const posts = getProductionPublishedPosts();

  if (!isBlogPublished(posts)) {
    return [];
  }

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getProductionPublishedPosts();
  const post = posts.find((candidate) => candidate.slug === slug);

  if (!isBlogPublished(posts) || !post) {
    notFound();
  }

  const articlePath = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: articlePath },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      url: articlePath,
      type: "article",
      locale: "es_ES",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const posts = getProductionPublishedPosts();
  const post = posts.find((candidate) => candidate.slug === slug);

  if (!isBlogPublished(posts) || !post) {
    notFound();
  }

  const relatedPosts = getProductionRelatedPosts(post);
  const jsonLd = blogArticleJsonLd(post);
  const headings = getBlogArticleOutline(post.body);
  const showClosingCta = !hasClosingServiceInvitation(post.body, post.relatedService);

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
        <article>
          <header className={styles.articleHeader}>
            <div className={styles.articleHeaderInner}>
              <nav className={styles.breadcrumb} aria-label="Migas de pan">
                <Link href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{post.title}</span>
              </nav>
              <p className={styles.eyebrow}>{BLOG_CATEGORIES[post.category].name}</p>
              <h1>{post.title}</h1>
              <p className={styles.articleDescription}>{post.description}</p>
              <div className={styles.articleMeta}>
                <span>Equipo de Crecimiento sin complicaciones</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>
                  {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00.000Z`))}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTimeMinutes} min de lectura</span>
              </div>
            </div>
          </header>

          <div className={styles.cover}>
            <Image
              alt={post.coverImageAlt}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 960px"
              src={post.coverImage}
            />
          </div>

          <div className={styles.articleLayout}>
            <div className={styles.articleBody}>
              <ArticleContents headings={headings} mode="mobile" />
              <BlogMarkdown body={post.body} />
              {showClosingCta ? (
                <footer className={styles.articleCta}>
                  <p className={styles.eyebrow}>Siguiente paso</p>
                  <h2>Aplica estas ideas a tu proyecto</h2>
                  <p>Revisamos tu situación y te ayudamos a priorizar las acciones útiles.</p>
                  <div className={styles.articleCtaActions}>
                    <Link className={styles.asideCta} href="/#auditoria">
                      Solicitar auditoría gratuita
                    </Link>
                    <Link className={styles.asideLink} href={post.relatedService}>
                      Ver servicio relacionado
                    </Link>
                  </div>
                </footer>
              ) : null}
            </div>
            {headings.length > 0 ? (
              <aside className={styles.articleAside}>
                <ArticleContents headings={headings} />
              </aside>
            ) : null}
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className={styles.relatedBand} aria-labelledby="related-articles">
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.eyebrow}>Continúa explorando</p>
                <h2 id="related-articles">Artículos relacionados</h2>
              </div>
              <div className={styles.grid}>
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
