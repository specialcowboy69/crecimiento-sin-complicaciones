import type { BlogPost } from "./types";

export function madridCalendarDate(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${value.year}-${value.month}-${value.day}`;
}

export function filterPublishedPosts(posts: BlogPost[], now: Date) {
  const today = madridCalendarDate(now);
  return posts.filter((post) => !post.draft && post.publishedAt <= today);
}
