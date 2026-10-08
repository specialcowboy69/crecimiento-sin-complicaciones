import matter from "@11ty/gray-matter";
import { z } from "zod";

import {
  APPROVED_RELATED_SERVICES,
  BLOG_CATEGORY_SLUGS,
} from "./categories";
import type { BlogPost } from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function isRealIsoDate(value: string) {
  if (!datePattern.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const isoDate = z.string().refine(isRealIsoDate, "must be a real YYYY-MM-DD date");
const nonEmptyString = z.string().trim().min(1, "must not be empty");
const relatedSlug = z.string().regex(slugPattern, "must be a lowercase hyphenated slug");

const frontmatterSchema = z
  .object({
    title: nonEmptyString,
    description: nonEmptyString,
    publishedAt: isoDate,
    updatedAt: isoDate.optional(),
    category: z.enum(BLOG_CATEGORY_SLUGS),
    draft: z.boolean(),
    authorId: z.literal("equipo"),
    coverImage: nonEmptyString,
    coverImageAlt: nonEmptyString,
    primaryKeyword: nonEmptyString,
    relatedService: z.enum(APPROVED_RELATED_SERVICES),
    relatedSlugs: z.array(relatedSlug),
    tags: z.array(nonEmptyString),
  })
  .strict();

function formatZodError(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
    .join("; ");
}

export function parseBlogDocument(input: {
  fileName: string;
  source: string;
}): BlogPost {
  const fileMatch = input.fileName.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/);

  if (!fileMatch) {
    throw new Error(
      `Invalid blog document ${input.fileName}: filename must be a lowercase hyphenated slug ending in .md`,
    );
  }

  const slug = fileMatch[1];
  let parsedMatter: matter.GrayMatterFile<string>;

  try {
    parsedMatter = matter(input.source);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid blog document ${input.fileName}: ${reason}`);
  }

  const parsed = frontmatterSchema.safeParse(parsedMatter.data);
  if (!parsed.success) {
    throw new Error(
      `Invalid blog document ${input.fileName}: ${formatZodError(parsed.error)}`,
    );
  }

  const body = parsedMatter.content.trim();
  if (!body) {
    throw new Error(`Invalid blog document ${input.fileName}: Markdown body must not be empty`);
  }

  if (parsed.data.updatedAt && parsed.data.updatedAt < parsed.data.publishedAt) {
    throw new Error(
      `Invalid blog document ${input.fileName}: updatedAt cannot be earlier than publishedAt`,
    );
  }

  const expectedCoverImage = `/images/blog/${slug}/cover.webp`;
  if (parsed.data.coverImage !== expectedCoverImage) {
    throw new Error(
      `Invalid blog document ${input.fileName}: coverImage must be ${expectedCoverImage}`,
    );
  }

  if (parsed.data.relatedSlugs.includes(slug)) {
    throw new Error(
      `Invalid blog document ${input.fileName}: relatedSlugs cannot include its own slug`,
    );
  }

  if (new Set(parsed.data.relatedSlugs).size !== parsed.data.relatedSlugs.length) {
    throw new Error(
      `Invalid blog document ${input.fileName}: relatedSlugs cannot contain duplicates`,
    );
  }

  const wordCount = body.split(/\s+/u).filter(Boolean).length;

  return {
    slug,
    ...parsed.data,
    body,
    readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
  };
}
