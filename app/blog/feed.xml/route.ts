import { hasPublishedBlog } from "../../lib/blog/gates";
import { getProductionPublishedPosts } from "../../lib/blog/production";
import { escapeXml } from "../../lib/blog/xml";
import { absoluteUrl } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getProductionPublishedPosts();

  if (!hasPublishedBlog(posts)) {
    return new Response(null, { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  }

  const items = posts.map((post) => {
    const url = absoluteUrl(`/blog/${post.slug}`);
    const publicationDate = new Date(`${post.publishedAt}T00:00:00.000Z`).toUTCString();

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${publicationDate}</pubDate>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Crecimiento sin complicaciones - Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Guías prácticas de SEO, captación y crecimiento digital.</description>
    <language>es-ES</language>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
