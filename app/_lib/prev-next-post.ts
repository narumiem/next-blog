import type { Post } from '@/app/_lib/apollo-client';

// Interface representing the slug of a post
interface Slug {
  id: string; // Unique identifier of the post
  slug: string; // Slug of the post
  title: string; // Title of the post
}

// Type representing the previous and next posts
type PrevNextPosts = [previousPost: Slug | null, nextPost: Slug | null];

/**
 * Retrieves the previous and next posts based on the current post slug.
 * @param allPosts - Array of all posts
 * @param currentPostSlug - Slug of the current post
 * @returns An array containing the previous and next posts
 */
export function getPrevAndNextPosts(allPosts: Post[], currentPostSlug: string): PrevNextPosts {
  if (allPosts.length === 0) return [null, null];

  const currentIndex = allPosts.findIndex((post) => post.slug === currentPostSlug);
  if (currentIndex === -1) return [null, null];

  const previousPost = allPosts[currentIndex + 1] ?? null;
  const nextPost = allPosts[currentIndex - 1] ?? null;

  return [previousPost, nextPost];
}
