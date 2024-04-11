import type { Post } from '@/app/_lib/apollo-client';

interface Slug {
  id: string;
  slug: string;
  title: string;
}

type PrevNextPosts = [previousPost: Slug | null, nextPost: Slug | null];

// Finds and returns the previous and next posts relative to the current post.
export function getPrevAndNextPosts(allPosts: Post[], currentPostSlug: string): PrevNextPosts {
  if (allPosts.length === 0) return [null, null]; // Handle empty array case
  const currentIndex = allPosts.findIndex((post) => post.slug === currentPostSlug);
  if (currentIndex === -1) return [null, null]; // Handle post not found
  const previousPost = allPosts[currentIndex + 1] ?? null; // Use null for out-of-bounds
  const nextPost = allPosts[currentIndex - 1] ?? null; // Use null for out-of-bounds

  return [previousPost, nextPost];
}
