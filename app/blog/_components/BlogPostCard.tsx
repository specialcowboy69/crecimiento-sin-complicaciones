import Image from "next/image";
import Link from "next/link";

import { BLOG_CATEGORIES } from "../../lib/blog/categories";
import type { BlogPost } from "../../lib/blog/types";
import styles from "../blog.module.css";

type BlogPostCardProps = {
  post: BlogPost;
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className={styles.card}>
      <Link className={styles.cardImage} href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <Image
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 380px"
          src={post.coverImage}
        />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span>{BLOG_CATEGORIES[post.category].name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>
            {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00.000Z`))}
          </time>
        </div>
        <h2 className={styles.cardTitle}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.description}</p>
        <div className={styles.cardFooter}>
          <span>{post.readingTimeMinutes} min de lectura</span>
          <Link href={`/blog/${post.slug}`}>Leer artículo</Link>
        </div>
      </div>
    </article>
  );
}
